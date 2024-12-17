import { getImage, unbox, unwrapComment } from "../utils";
import { AddressedValue } from "./AddressedValue";

import type { CST, ValidG10OffsetGroups } from "../types";
import type { IParsedLineData } from "../types/interfaces";
import type { IToken } from "chevrotain";

export class ParsedLineData implements IParsedLineData {
  N!: number;
  gCodes: IToken[] = [];
  mCodes: IToken[] = [];
  comments: string[] = [];
  addresses: AddressedValue[] = [];
  gCodeMap: Record<string, boolean> = {};
  mCodeMap: Record<string, boolean> = {};
  addressMap: Record<string, number> = {};

  #input: CST.LineCstChildren;

  constructor(input: CST.LineCstChildren) {
    this.#input = input;
  }

  process(callbacks: {
    onVariableAssignment: (children: CST.VariableAssignmentCstChildren) => void;
  }) {
    if (this.#input?.LineNumber) {
      const rawLineNumber = getImage(this.#input.LineNumber);
      this.N = AddressedValue.valueOf(rawLineNumber);
    }

    if (this.#input?.G_Code) {
      this.#input.G_Code.forEach(token => {
        this.gCodes.push(token);
        this.gCodeMap[token.image] = true;
      });
    }

    if (this.#input?.M_Code) {
      this.#input.M_Code.forEach(token => {
        this.mCodes.push(token);
        this.mCodeMap[token.image] = true;
      });
    }

    if (this.#input?.VariableAssignment) {
      const { children } = unbox(this.#input.VariableAssignment);
      this.VariableAssignment(children);
    }

    if (this.#input?.AddressedValue) {
      this.#input.AddressedValue.forEach(({ children }) => {
        const parsedAddr = this.AddressedValue(children, this.gCodeMap);
        // debug(parsedAddr);
        this.addresses.push(parsedAddr);
        this.addressMap[parsedAddr.prefix] = parsedAddr.value;
      });
    }

    if (this.#input?.Comment) {
      for (const comment of this.#input.Comment) {
        const rawComment = getImage(comment);
        // debug(rawComment);
        this.comments.push(unwrapComment(rawComment));
      }
    }

    if ("G10" in this.gCodeMap) {
      const { addressMap } = parsed;

      this.#memory.g10({
        L: addressMap["L"] as ValidG10OffsetGroups,
        P: addressMap["P"],
        R: addressMap["R"],
        X: addressMap["X"],
        Y: addressMap["Y"],
        Z: addressMap["Z"],
        B: addressMap["B"]
      });
    }
  }
}
