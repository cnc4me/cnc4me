import { interpret } from "@xstate/fsm";

import Emittery from "emittery";
import { clone, eq, isEmpty, last } from "lodash/fp";

import { makeDebugger } from "../lib";
import { NcLexer, NcToken } from "../NcLexer";
import { CannedCycle, NcProgram, Tool, Toolpath } from "../NcProgram";
import { NcMachineState, NcServiceType, NcStateMachine } from "../NcService";
import { G_CODE_TABLE, Modals } from "../NcSpec";
import {
  ModalGroups,
  NcParserConfig,
  NcPosition,
  Tokens
} from "../types";
import { MovementEvent } from "../types/machine";
import { Mcode } from "./lib";
import { NcBlock } from "./NcBlock";
import { DataEvents, PlainEvents } from "./NcParserEvents";

const isIdle = eq("IDLE");
const isToolpathing = eq("TOOLPATHING");
const isInCannedCycle = eq("IN_CANNED_CYCLE");

const debug = makeDebugger("parser");

/**
 * NcParser Class
 */
export class NcParser extends Emittery.Typed<DataEvents, PlainEvents> {
  static readonly defaults = {
    debug: false,
    coolantCodes: [8, 88, 50],
    lexerConfig: NcLexer.defaults
  };

  config: NcParserConfig = NcParser.defaults;

  private lexer: NcLexer;
  private program: NcProgram;
  private machine: NcServiceType;
  private state = "IDLE";
  private currToolpath!: Toolpath;

  private currBlock: NcBlock | null = null;
  private prevBlock: NcBlock | null = null;

  private currPosition: NcPosition = { X: 0, Y: 0, Z: 0, B: 0 };
  private prevPosition: NcPosition = { X: 0, Y: 0, Z: 0, B: 0 };

  private modals: ModalGroups = {
    GROUP_01: Modals.RAPID,
    GROUP_02: Modals.XY,
    GROUP_03: Modals.ABSOLUTE,
    GROUP_05: "",
    GROUP_06: "",
    GROUP_07: "",
    GROUP_08: "",
    GROUP_10: "",
    GROUP_12: ""
  };

  static parse(input: string, config?: Partial<NcParserConfig>): NcProgram {
    return (new NcParser(config)).parse(input);
  }

  constructor(config?: Partial<NcParserConfig>) {
    super();
    this.config = { ...this.config, ...config };

    // if (this.config.debug) {
    //   Debug.enable("ncstat:*");
    // }

    this.lexer = new NcLexer(this.config.lexerConfig);
    this.program = new NcProgram();
    this.currToolpath = new Toolpath();
    this.machine = interpret(NcStateMachine);

    // @TODO Bubble this event?
    // this.lexer.on("token", token => this.$emitToken(token));

    this.machine.subscribe(state => {
      this.emit("stateChange", {
        prev: this.state,
        curr: state.value
      });

      debug.extend("state")(`%o => %o`, this.state, state.value);

      this.state = state.value;
    });
  }

  getLexer(): NcLexer {
    return this.lexer;
  }

  parse(source: string): NcProgram {
    this.machine.start();

    for (const block of this.yieldBlocks(source)) {
      this.currBlock = block;

      debug.extend("block")(
        `%o tokens <%s>`,
        this.currBlock.length,
        this.currBlock
      );

      if (!isEmpty(this.currBlock.modals)) {
        this.updateModals();
      }

      //@TODO whats the point of this?
      if (this.currBlock.M) {
        const addr = new Mcode(this.currBlock?.M as number);

        this.emit("mCode", addr);
      }

      // Example: O2134 ( NAME )
      if (this.currBlock.O) {
        this.setProgramNumber(this.currBlock.O);

        if (this.currBlock.comment) {
          this.setProgramName(this.currBlock.comment);
        }
      }

      // Example: ( NAME )
      if (
        this.prevBlock?.O === this.program.number &&
        this.program.name === null &&
        this.currBlock.comment
      ) {
        this.setProgramName(this.currBlock.comment);
      }

      if (this.currBlock.$has("S")) {
        debug("[ ADDR] Spindle speed = %d", this.currBlock.S);
        this.currToolpath.setRpms(this.currBlock.S);
      }

      if (this.currBlock.$has("F")) {
        debug("[ ADDR] Feedrate = %d", this.currBlock.F);
      }

      if (this.currBlock.$has("R")) {
        debug("[ ADDR] Retract Plane: %d", this.currBlock.R);
      }

      if (this.currBlock.hasMovement) {
        this.updatePosition(this.currBlock.position);
      }

      if (
        this.currBlock.isStartOfCannedCycle &&
        isToolpathing(this.state)
      ) {
        this.startCannedCycle();
      }

      if (isInCannedCycle(this.state)) {
        if (this.currBlock.gCodes.includes("G80")) {
          // debug("[ STOP] End of canned cycle");
          this.machine.send("END_CANNED_CYCLE");
        }

        if (this.currBlock.hasMovement) {
          const point = clone(this.currPosition);

          this.currToolpath.cannedCycles[this.currToolpath.cannedCycles.length - 1].addPoint(point);
        }
      }

      // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts
      // I have no idea how to customize this yet...
      if (this.currBlock.toString().startsWith("N")) {
        if (isToolpathing(this.state)) {
          this.machine.send("END_TOOLPATH");
          this.program.toolpaths.push(this.currToolpath);
        }

        if (isIdle(this.state)) {
          this.machine.send("START_TOOLPATH");

          this.currToolpath = new Toolpath();

          const tool = Tool.create({
            number: this.currBlock.N as number,
            desc: this.currBlock.comment as string
          });
          console.log(tool);
          this.currToolpath.setTool(tool);
        }
      }

      if (isToolpathing(this.state) || isInCannedCycle(this.state)) {
        if (this.config.coolantCodes.includes(this.currBlock.M as number)) {
          this.currToolpath.hasCoolant = true;
        }

        /**
         * Override N line tool description with Txx Mxx ()
         * Move the N line desc to this.currToolpath.desc
         */
        if (this.currBlock.hasToolChange) {
          if (this.currToolpath.tool) {
            if (this.currBlock.T) {
              this.currToolpath.tool.number = this.currBlock.T;
            }

            if (this.currBlock.comment) {
              this.currToolpath.description = this.currToolpath?.tool?.desc;
            }
          }

          this.currToolpath.addBlock(this.currBlock);
        }
      }

      this.emit("block", block);
      this.prevBlock = this.currBlock;
      this.program.appendBlock(this.currBlock);
    } // end-of-for

    this.machine.send("END_TOOLPATH");
    this.machine.stop();

    this.prevBlock = null;
    this.currBlock = null;

    this.program.toolpaths.push(this.currToolpath);

    return this.program;
  }

  private *yieldBlocks(input: string): Generator<NcBlock> {
    let lineTokens: NcToken[] = [];

    for (const token of this.lexer.tokenize(input)) {
      lineTokens.push(token);

      if (token.type === Tokens.NEWLINE) {
        yield NcBlock.create(lineTokens);

        lineTokens = [];
      }
    }
  }

  private updateModals(): void {
    this.modals = { ...this.modals, ...this.currBlock?.modals };

    debug.extend("modal")(`%o`, this.currBlock?.modals);
  }

  private setProgramName(name: string): void {
    debug.extend("program")(`Name: %o`, name);

    this.program.name = name;
  }

  private setProgramNumber(number: number): void {
    debug.extend("program")(`Number: %o`, number);

    this.program.number = number;
  }

  private startCannedCycle(): void {
    this.machine.send("START_CANNED_CYCLE");

    const cannedCycle = CannedCycle.fromBlock(
      this.currBlock as NcBlock
    );

    debug.extend("canned-cycle")(
      "%s %o",
      cannedCycle.definition.desc,
      cannedCycle.cycleCommand
    );

    this.currToolpath.addCannedCycle(cannedCycle);
  }

  private updatePosition(newPosition: Partial<NcPosition>): void {
    const motionCode = this.modals.GROUP_03;

    this.prevPosition = clone(this.currPosition);

    // Helper function to use the positioning modes as function names
    // for their operations in updating positions
    const move = {
      [Modals.ABSOLUTE]: (_from: number, to: number) => to,
      [Modals.INCREMENTAL]: (from: number, to: number) => from + to
    };

    /**
     * Iterate over each axis that has a value from the newPosition
     * using the positioning mode to either increment or set the value
     */
    for (const [axis, value] of Object.entries(newPosition)) {
      if (value) {
        this.currPosition[axis] = move[motionCode](
          this.currPosition[axis],
          value
        );
      }
    }

    const movement: MovementEvent = {
      from: this.prevPosition,
      to: this.currPosition
    };

    this.emit("movement", movement);

    const debugMove = debug.extend("move");

    debugMove("%s", G_CODE_TABLE[motionCode].desc);
    debugMove("%o", movement.from);
    debugMove("%o", movement.to);
  }
}
