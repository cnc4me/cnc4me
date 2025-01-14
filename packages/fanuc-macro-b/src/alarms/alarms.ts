// THIS FILE WAS GENERATED @ 2025-01-14T23:11:22.048Z

/**
 * Base error class for {@link MacroRuntime} to throw machine alarms.
 */
export class RuntimeAlarm extends Error {
  number: number | string;
  description: string;
  constructor(alarm: { number: number | string; message: string; description: string }) {
    super(alarm.message);
    this.number = alarm.number;
    this.description = alarm.description;
    this.name = this.constructor.name;
  }
}

/**
 * TH ERROR
 *
 * A TH error was detected during reading from an input device. The read code that caused the TH error and how many statements it is from the block can be verified in the diagnostics screen
 */
export class A0001_ThError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0001",
      message: "TH ERROR",
      description: `A TH error was detected during reading from an input device. The read code that caused the TH error and how many statements it is from the block can be verified in the diagnostics screen`
    });
  }
}

/**
 * TV ERROR
 *
 * An error was detected during the single-block TV error. The TV check can be suppressed by setting TVC parameter No. 0000#0 to “0”
 */
export class A0002_TvError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0002",
      message: "TV ERROR",
      description: `An error was detected during the single-block TV error. The TV check can be suppressed by setting TVC parameter No. 0000#0 to “0”`
    });
  }
}

/**
 * TOO MANY DIGIT
 *
 * Data entered with more digits than permitted in the NC instruction word. The number of permissible digits varies according to the function and the word
 */
export class A0003_TooManyDigit extends RuntimeAlarm {
  constructor() {
    super({
      number: "0003",
      message: "TOO MANY DIGIT",
      description: `Data entered with more digits than permitted in the NC instruction word. The number of permissible digits varies according to the function and the word`
    });
  }
}

/**
 * INVALID BREAK POINT OF WORDS
 *
 * NC word(s) address + numerical value not in word format. This alarm is also generated when a custom macro does not contain a reserved word, or does not conform to the syntax
 */
export class A0004_InvalidBreakPointOfWords extends RuntimeAlarm {
  constructor() {
    super({
      number: "0004",
      message: "INVALID BREAK POINT OF WORDS",
      description: `NC word(s) address + numerical value not in word format. This alarm is also generated when a custom macro does not contain a reserved word, or does not conform to the syntax`
    });
  }
}

/**
 * NO DATA AFTER ADDRESS
 *
 * NC word(s) address + numerical value not in word format. This alarm is also generated when a custom macro does not contain a reserved word, or does not conform to the syntax
 */
export class A0005_NoDataAfterAddress extends RuntimeAlarm {
  constructor() {
    super({
      number: "0005",
      message: "NO DATA AFTER ADDRESS",
      description: `NC word(s) address + numerical value not in word format. This alarm is also generated when a custom macro does not contain a reserved word, or does not conform to the syntax`
    });
  }
}

/**
 * ILLEGAL USE OF MINUS SIGN
 *
 * A minus sign (-) was specified at an NC instruction word or system variable where no minus signal may be specified
 */
export class A0006_IllegalUseOfMinusSign extends RuntimeAlarm {
  constructor() {
    super({
      number: "0006",
      message: "ILLEGAL USE OF MINUS SIGN",
      description: `A minus sign (-) was specified at an NC instruction word or system variable where no minus signal may be specified`
    });
  }
}

/**
 * ILLEGAL USE OF DECIMAL POINT
 *
 * A decimal point (.) was specified at an address where no decimal point may be specified, or two decimal points were specified
 */
export class A0007_IllegalUseOfDecimalPoint extends RuntimeAlarm {
  constructor() {
    super({
      number: "0007",
      message: "ILLEGAL USE OF DECIMAL POINT",
      description: `A decimal point (.) was specified at an address where no decimal point may be specified, or two decimal points were specified`
    });
  }
}

/**
 * IMPROPER NC-ADDRESS
 *
 * An illegal address was specified, or parameter 1020 is not set
 */
export class A0009_ImproperNcAddress extends RuntimeAlarm {
  constructor() {
    super({
      number: "0009",
      message: "IMPROPER NC-ADDRESS",
      description: `An illegal address was specified, or parameter 1020 is not set`
    });
  }
}

/**
 * IMPROPER G-CODE
 *
 * An unusable G code is specified
 */
export class A0010_ImproperGCode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0010",
      message: "IMPROPER G-CODE",
      description: `An unusable G code is specified`
    });
  }
}

/**
 * FEED ZERO ( COMMAND )
 *
 * The cutting feedrate instructed by an F code has been set to 0. This alarm is also generated if the F code instructed for the S code is set extremely small in a rigid tapping instruction as the tool cannot cut at the programmed lead
 */
export class A0011_FeedZeroCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0011",
      message: "FEED ZERO ( COMMAND )",
      description: `The cutting feedrate instructed by an F code has been set to 0. This alarm is also generated if the F code instructed for the S code is set extremely small in a rigid tapping instruction as the tool cannot cut at the programmed lead`
    });
  }
}

/**
 * CAN NOT COMMAND G95
 *
 * A synchronous feed is specified without the option for threading / synchronous feed. Modify the program
 */
export class A0014_CanNotCommandG95 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0014",
      message: "CAN NOT COMMAND G95",
      description: `A synchronous feed is specified without the option for threading / synchronous feed. Modify the program`
    });
  }
}

/**
 * TOO MANY SIMULTANEOUS AXES
 *
 * A move command was specified for more axes than can be controlled by simultaneous axis control. Either add on the simultaneous axis control extension option, or divide the number of programmed move axes into two blocks
 */
export class A0015_TooManySimultaneousAxes extends RuntimeAlarm {
  constructor() {
    super({
      number: "0015",
      message: "TOO MANY SIMULTANEOUS AXES",
      description: `A move command was specified for more axes than can be controlled by simultaneous axis control. Either add on the simultaneous axis control extension option, or divide the number of programmed move axes into two blocks`
    });
  }
}

/**
 * OVER TOLERANCE OF RADIUS
 *
 * An arc was specified for which the difference in the radius at the start and end points exceeds the value set in parameter No. 2410. Check arc center codes I, J and K in the program. The tool path when parameter No. 2410 is set to a large value is spiral
 */
export class A0020_OverToleranceOfRadius extends RuntimeAlarm {
  constructor() {
    super({
      number: "0020",
      message: "OVER TOLERANCE OF RADIUS",
      description: `An arc was specified for which the difference in the radius at the start and end points exceeds the value set in parameter No. 2410. Check arc center codes I, J and K in the program. The tool path when parameter No. 2410 is set to a large value is spiral`
    });
  }
}

/**
 * ILLEGAL PLANE SELECT
 *
 * The plane selection instructions G17 to G19 are in error. Reprogram so that same 3 basic parallel axes are not specified simultaneously. This alarm is also generated when an axis that should not be specified for plane machining is specified, for example, for circular interpolation or involute interpolation. To enable programming of 3 or more axes, the helical interpolation option must be added to each of the relevant axes
 */
export class A0021_IllegalPlaneSelect extends RuntimeAlarm {
  constructor() {
    super({
      number: "0021",
      message: "ILLEGAL PLANE SELECT",
      description: `The plane selection instructions G17 to G19 are in error. Reprogram so that same 3 basic parallel axes are not specified simultaneously. This alarm is also generated when an axis that should not be specified for plane machining is specified, for example, for circular interpolation or involute interpolation. To enable programming of 3 or more axes, the helical interpolation option must be added to each of the relevant axes`
    });
  }
}

/**
 * R OR I,J,K COMMAND NOT FOUND
 *
 * The command for circular interpolation lacks arc radius R or coordinate I, J, or K of the distance between the start point to the center of the arc
 */
export class A0022_ROrIcommajKCommandNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0022",
      message: "R OR I,J,K COMMAND NOT FOUND",
      description: `The command for circular interpolation lacks arc radius R or coordinate I, J, or K of the distance between the start point to the center of the arc`
    });
  }
}

/**
 * CIRCLE CUT IN RAPID (F0)
 *
 * F0 (rapid traverse in inverse feed or feed specified by an F code with 1-digit number) was specified during circular interpolation (G02, G03) or involute interpolation (G02.2, G03.2)
 */
export class A0025_CircleCutInRapidF0 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0025",
      message: "CIRCLE CUT IN RAPID (F0)",
      description: `F0 (rapid traverse in inverse feed or feed specified by an F code with 1-digit number) was specified during circular interpolation (G02, G03) or involute interpolation (G02.2, G03.2)`
    });
  }
}

/**
 * NO AXES COMMANDED IN G43/G44
 *
 * No axis is specified in G43 and G44 blocks for the tool length offset type C. Offset is not canceled but another axis is offset for the tool length offset type C. Multiple axes were specified for the same block when the tool length compensation type is C
 */
export class A0027_NoAxesCommandedInG43G44 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0027",
      message: "NO AXES COMMANDED IN G43/G44",
      description: `No axis is specified in G43 and G44 blocks for the tool length offset type C. Offset is not canceled but another axis is offset for the tool length offset type C. Multiple axes were specified for the same block when the tool length compensation type is C`
    });
  }
}

/**
 * ILLEGAL PLANE SELECT
 *
 * The plane selection instructions G17 to G19 are in error. Reprogram so that same 3 basic parallel axes are not specified simultaneously. This alarm is also generated when an axis that should not be specified for plane machining is specified, for example, for circular interpolation or involute interpolation. To enable programming of 3 or more axes, the helical interpolation option must be added to each of the relevant axes
 */
export class A0028_IllegalPlaneSelect extends RuntimeAlarm {
  constructor() {
    super({
      number: "0028",
      message: "ILLEGAL PLANE SELECT",
      description: `The plane selection instructions G17 to G19 are in error. Reprogram so that same 3 basic parallel axes are not specified simultaneously. This alarm is also generated when an axis that should not be specified for plane machining is specified, for example, for circular interpolation or involute interpolation. To enable programming of 3 or more axes, the helical interpolation option must be added to each of the relevant axes`
    });
  }
}

/**
 * ILLEGAL OFFSET VALUE
 *
 * Illegal offset No
 */
export class A0029_IllegalOffsetValue extends RuntimeAlarm {
  constructor() {
    super({
      number: "0029",
      message: "ILLEGAL OFFSET VALUE",
      description: `Illegal offset No`
    });
  }
}

/**
 * ILLEGAL OFFSET NUMBER
 *
 * An illegal offset No. was specified. This alarm is also generated when the tool shape offset No. exceeds the maximum number of tool offset sets in the case of tool offset memory B
 */
export class A0030_IllegalOffsetNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "0030",
      message: "ILLEGAL OFFSET NUMBER",
      description: `An illegal offset No. was specified. This alarm is also generated when the tool shape offset No. exceeds the maximum number of tool offset sets in the case of tool offset memory B`
    });
  }
}

/**
 * ILLEGAL P COMMAND IN G10
 *
 * The relevant data input or option could not be found for the L No. of G10. No data setting address such as P or R was specified. An address command not concerned with data setting was specified. An address varies with the L No. The sign or decimal point of the specified address is in error, or the specified address is out of range
 */
export class A0031_IllegalPCommandInG10 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0031",
      message: "ILLEGAL P COMMAND IN G10",
      description: `The relevant data input or option could not be found for the L No. of G10. No data setting address such as P or R was specified. An address command not concerned with data setting was specified. An address varies with the L No. The sign or decimal point of the specified address is in error, or the specified address is out of range`
    });
  }
}

/**
 * ILLEGAL OFFSET VALUE IN G10
 *
 * In setting an offset amount by G10 or in writing an offset amount by system variables, the offset amount was excessive
 */
export class A0032_IllegalOffsetValueInG10 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0032",
      message: "ILLEGAL OFFSET VALUE IN G10",
      description: `In setting an offset amount by G10 or in writing an offset amount by system variables, the offset amount was excessive`
    });
  }
}

/**
 * NO INTERSECTION AT CUTTER COMPENSATION
 *
 * The intersection cannot be obtained by the intersection calculation in cutter or tool-nose radius compensation. Modify the program
 */
export class A0033_NoIntersectionAtCutterCompensation extends RuntimeAlarm {
  constructor() {
    super({
      number: "0033",
      message: "NO INTERSECTION AT CUTTER COMPENSATION",
      description: `The intersection cannot be obtained by the intersection calculation in cutter or tool-nose radius compensation. Modify the program`
    });
  }
}

/**
 * NO CIRC ALLOWED IN STUP/EXT BLK
 *
 * In cutter or tool-nose radius compensation, a startup or cancellation is performed in the G02 or G03 mode. Modify the program
 */
export class A0034_NoCircAllowedInStupExtBlk extends RuntimeAlarm {
  constructor() {
    super({
      number: "0034",
      message: "NO CIRC ALLOWED IN STUP/EXT BLK",
      description: `In cutter or tool-nose radius compensation, a startup or cancellation is performed in the G02 or G03 mode. Modify the program`
    });
  }
}

/**
 * CAN NOT COMMANDED G31
 *
 * by address Q
 */
export class A0035_CanNotCommandedG31 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0035",
      message: "CAN NOT COMMANDED G31",
      description: `by address Q`
    });
  }
}

/**
 * CAN NOT CHANGE PLANE IN G41/G42
 *
 * The compensation plane G17/G18/G19 was changed during cutter or tool-nose radius compensation. Modify the program
 */
export class A0037_CanNotChangePlaneInG41G42 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0037",
      message: "CAN NOT CHANGE PLANE IN G41/G42",
      description: `The compensation plane G17/G18/G19 was changed during cutter or tool-nose radius compensation. Modify the program`
    });
  }
}

/**
 * INTERFERENCE IN CIRCULAR BLOCK
 *
 * Overcutting will occur in cutter compensation C because the arc start point or end point coincides with the arc center. Modify the program
 */
export class A0038_InterferenceInCircularBlock extends RuntimeAlarm {
  constructor() {
    super({
      number: "0038",
      message: "INTERFERENCE IN CIRCULAR BLOCK",
      description: `Overcutting will occur in cutter compensation C because the arc start point or end point coincides with the arc center. Modify the program`
    });
  }
}

/**
 * CHF/CNR NOT ALLOWED IN G41,G42
 *
 * Chamfering or corner R was specified with a start-up, a cancel, or switching between G41 and G42 in G41 and G42 commands (cutter compensation or tool nose radius compensation). The program may cause overcutting to occur in chamfering or corner R. Modify the program
 */
export class A0039_ChfCnrNotAllowedInG41commag42 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0039",
      message: "CHF/CNR NOT ALLOWED IN G41,G42",
      description: `Chamfering or corner R was specified with a start-up, a cancel, or switching between G41 and G42 in G41 and G42 commands (cutter compensation or tool nose radius compensation). The program may cause overcutting to occur in chamfering or corner R. Modify the program`
    });
  }
}

/**
 * INTERFERENCE IN CUTTER COMPENSATION
 *
 * In cutter or tool-nose radius compensation, excessive cutting may occur. Modify the program
 */
export class A0041_InterferenceInCutterCompensation extends RuntimeAlarm {
  constructor() {
    super({
      number: "0041",
      message: "INTERFERENCE IN CUTTER COMPENSATION",
      description: `In cutter or tool-nose radius compensation, excessive cutting may occur. Modify the program`
    });
  }
}

/**
 * G45/G48 NOT ALLOWED IN CRC
 *
 * Tool offset (G45 to G48) is commanded in tool compensation or three-dimensional cutter compensation. Modify the program
 */
export class A0042_G45G48NotAllowedInCrc extends RuntimeAlarm {
  constructor() {
    super({
      number: "0042",
      message: "G45/G48 NOT ALLOWED IN CRC",
      description: `Tool offset (G45 to G48) is commanded in tool compensation or three-dimensional cutter compensation. Modify the program`
    });
  }
}

/**
 * ILLEGAL T-CODE COMMAND
 *
 * On a system with a DRILL-MATE ATC installed, M06 is not specified in a block that specifies a T code. Alternatively, a T code beyond the allowable range is specified
 */
export class A0043_IllegalTCodeCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0043",
      message: "ILLEGAL T-CODE COMMAND",
      description: `On a system with a DRILL-MATE ATC installed, M06 is not specified in a block that specifies a T code. Alternatively, a T code beyond the allowable range is specified`
    });
  }
}

/**
 * G27-G30 NOT ALLOWED IN FIXED CYC
 *
 * One of G27 to G30 is commanded in canned cycle mode. Modify the program
 */
export class A0044_G27G30NotAllowedInFixedCyc extends RuntimeAlarm {
  constructor() {
    super({
      number: "0044",
      message: "G27-G30 NOT ALLOWED IN FIXED CYC",
      description: `One of G27 to G30 is commanded in canned cycle mode. Modify the program`
    });
  }
}

/**
 * ADDRESS Q NOT FOUND (G73/G83)
 *
 * In a high-speed peck drilling cycle (G73) or peck drilling cycle (G83), the amount of each-time cutting is not specified by address Q, or Q0 is specified. Modify the program
 */
export class A0045_AddressQNotFoundG73G83 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0045",
      message: "ADDRESS Q NOT FOUND (G73/G83)",
      description: `In a high-speed peck drilling cycle (G73) or peck drilling cycle (G83), the amount of each-time cutting is not specified by address Q, or Q0 is specified. Modify the program`
    });
  }
}

/**
 * ILLEGAL REFERENCE RETURN COMMAND
 *
 * A command for a return to the second, third or fourth reference position is error. (The address P command is in error.) Although an option for a return to the third or fourth reference position was not set, 3 or 4 was specified in address P
 */
export class A0046_IllegalReferenceReturnCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0046",
      message: "ILLEGAL REFERENCE RETURN COMMAND",
      description: `A command for a return to the second, third or fourth reference position is error. (The address P command is in error.) Although an option for a return to the third or fourth reference position was not set, 3 or 4 was specified in address P`
    });
  }
}

/**
 * ILLEGAL AXIS SELECT
 *
 * Two or more parallel axes (in parallel with a basic axis) have been specified upon start-up of three-dimensional tool compensation or three-dimensional coordinate conversion
 */
export class A0047_IllegalAxisSelect extends RuntimeAlarm {
  constructor() {
    super({
      number: "0047",
      message: "ILLEGAL AXIS SELECT",
      description: `Two or more parallel axes (in parallel with a basic axis) have been specified upon start-up of three-dimensional tool compensation or three-dimensional coordinate conversion`
    });
  }
}

/**
 * BASIC 3 AXIS NOT FOUND
 *
 * Start-up of three-dimensional tool compensation or three-dimensional coordinate conversion has been attempted, but the three basic axes used when Xp, Yp, or Zp is omitted are not set in parameter No. 1022
 */
export class A0048_Basic3AxisNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0048",
      message: "BASIC 3 AXIS NOT FOUND",
      description: `Start-up of three-dimensional tool compensation or three-dimensional coordinate conversion has been attempted, but the three basic axes used when Xp, Yp, or Zp is omitted are not set in parameter No. 1022`
    });
  }
}

/**
 * ILLEGAL COMMAND(G68,G69)
 *
 * When three-dimensional coordinate conversion (G68 or G69) was specified, the tool compensation was not canceled. Or, programs of three-dimensional coordinate conversion (G68, G69) and tool compensation (G43, G44 or G49) were not nested. Or, the three-dimensional coordinate conversion was specified during the tool length compensation and another tool length compensation was specified
 */
export class A0049_IllegalCommandG68commag69 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0049",
      message: "ILLEGAL COMMAND(G68,G69)",
      description: `When three-dimensional coordinate conversion (G68 or G69) was specified, the tool compensation was not canceled. Or, programs of three-dimensional coordinate conversion (G68, G69) and tool compensation (G43, G44 or G49) were not nested. Or, the three-dimensional coordinate conversion was specified during the tool length compensation and another tool length compensation was specified`
    });
  }
}

/**
 * CHF/CNR NOT ALLOWED IN THRD BLK
 *
 * Chamfering or corner R is commanded in the thread cutting block. Modify the program
 */
export class A0050_ChfCnrNotAllowedInThrdBlk extends RuntimeAlarm {
  constructor() {
    super({
      number: "0050",
      message: "CHF/CNR NOT ALLOWED IN THRD BLK",
      description: `Chamfering or corner R is commanded in the thread cutting block. Modify the program`
    });
  }
}

/**
 * MISSING MOVE AFTER CNR/CHF
 *
 * Improper movement or the move distance was specified in the block next to the chamfering or corner R block. Modify the program
 */
export class A0051_MissingMoveAfterCnrChf extends RuntimeAlarm {
  constructor() {
    super({
      number: "0051",
      message: "MISSING MOVE AFTER CNR/CHF",
      description: `Improper movement or the move distance was specified in the block next to the chamfering or corner R block. Modify the program`
    });
  }
}

/**
 * CODE IS NOT G01 AFTER CHF/CNR
 *
 * The block next to the chamfering or corner R block is not G01 (or vertical line). Modify the program
 */
export class A0052_CodeIsNotG01AfterChfCnr extends RuntimeAlarm {
  constructor() {
    super({
      number: "0052",
      message: "CODE IS NOT G01 AFTER CHF/CNR",
      description: `The block next to the chamfering or corner R block is not G01 (or vertical line). Modify the program`
    });
  }
}

/**
 * TOO MANY ADDRESS COMMANDS
 *
 * In the chamfering and corner R commands, two or more of I, J, K and R are specified
 */
export class A0053_TooManyAddressCommands extends RuntimeAlarm {
  constructor() {
    super({
      number: "0053",
      message: "TOO MANY ADDRESS COMMANDS",
      description: `In the chamfering and corner R commands, two or more of I, J, K and R are specified`
    });
  }
}

/**
 * NO TAPER ALLOWED AFTER CHF/CNR
 *
 * A block in which chamfering in the specified angle or the corner R was specified includes a taper command. Modify the program
 */
export class A0054_NoTaperAllowedAfterChfCnr extends RuntimeAlarm {
  constructor() {
    super({
      number: "0054",
      message: "NO TAPER ALLOWED AFTER CHF/CNR",
      description: `A block in which chamfering in the specified angle or the corner R was specified includes a taper command. Modify the program`
    });
  }
}

/**
 * MISSING MOVE VALUE IN CHF/CNR
 *
 * In chamfering or corner R block, the move distance is less than chamfer or corner R amount. Modify the program
 */
export class A0055_MissingMoveValueInChfCnr extends RuntimeAlarm {
  constructor() {
    super({
      number: "0055",
      message: "MISSING MOVE VALUE IN CHF/CNR",
      description: `In chamfering or corner R block, the move distance is less than chamfer or corner R amount. Modify the program`
    });
  }
}

/**
 * NO END POINT & ANGLE IN CHF/CNR
 *
 * In direct dimension drawing programming, both an end point and an angle were specified in the block next to the block in which only an angle was specified (Aa). Modify the program
 */
export class A0056_NoEndPointAndAngleInChfCnr extends RuntimeAlarm {
  constructor() {
    super({
      number: "0056",
      message: "NO END POINT & ANGLE IN CHF/CNR",
      description: `In direct dimension drawing programming, both an end point and an angle were specified in the block next to the block in which only an angle was specified (Aa). Modify the program`
    });
  }
}

/**
 * NO SOLUTION OF BLOCK END
 *
 * Block end point is not calculated correctly in direct dimension drawing programming. Modify the program
 */
export class A0057_NoSolutionOfBlockEnd extends RuntimeAlarm {
  constructor() {
    super({
      number: "0057",
      message: "NO SOLUTION OF BLOCK END",
      description: `Block end point is not calculated correctly in direct dimension drawing programming. Modify the program`
    });
  }
}

/**
 * END POINT NOT FOUND
 *
 * Block end point is not found in direct dimension drawing programming. Modify the program
 */
export class A0058_EndPointNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0058",
      message: "END POINT NOT FOUND",
      description: `Block end point is not found in direct dimension drawing programming. Modify the program`
    });
  }
}

/**
 * SEQUENCE NUMBER NOT FOUND
 *
 * [External data input/output] The specified number could not be found for program number and sequence number searches. Although input/output of a pot number of tool data or offset input was requested, no tool number was input after power on. The tool data corresponding to the entered tool number could not be found. [External workpiece number search] The program corresponding to the specified workpiece number could not be found. [Program restart] In the program restart sequence number specification, the specified sequence number could not be found
 */
export class A0060_SequenceNumberNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0060",
      message: "SEQUENCE NUMBER NOT FOUND",
      description: `[External data input/output] The specified number could not be found for program number and sequence number searches. Although input/output of a pot number of tool data or offset input was requested, no tool number was input after power on. The tool data corresponding to the entered tool number could not be found. [External workpiece number search] The program corresponding to the specified workpiece number could not be found. [Program restart] In the program restart sequence number specification, the specified sequence number could not be found`
    });
  }
}

/**
 * P OR Q COMMAND IS NOT IN THE MULTIPLE REPETIVE CYCLES BLOCK
 *
 * Address P or Q is not specified in multiple repetitive cycle (G70, G71, G72, or G73) command
 */
export class A0061_POrQCommandIsNotInTheMultipleRepetiveCyclesBlock extends RuntimeAlarm {
  constructor() {
    super({
      number: "0061",
      message: "P OR Q COMMAND IS NOT IN THE MULTIPLE REPETIVE CYCLES BLOCK",
      description: `Address P or Q is not specified in multiple repetitive cycle (G70, G71, G72, or G73) command`
    });
  }
}

/**
 * THE CUTTING AMOUNT IS ILLEGAL IN THE ROUGH CUTTING CYCLE
 *
 * A zero or a negative value was specified in a multiple repetitive canned rough-cutting cycle (G71 or G72) as the depth of cut
 */
export class A0062_TheCuttingAmountIsIllegalInTheRoughCuttingCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0062",
      message: "THE CUTTING AMOUNT IS ILLEGAL IN THE ROUGH CUTTING CYCLE",
      description: `A zero or a negative value was specified in a multiple repetitive canned rough-cutting cycle (G71 or G72) as the depth of cut`
    });
  }
}

/**
 * THE BLOCK OF A SPECIFIED SEQUENCE NUMBER IS NOT FOUND
 *
 * The sequence number specified by addresses P and Q in multiple repetitive cycle (G70, G71, G72, or G73) command cannot be searched
 */
export class A0063_TheBlockOfASpecifiedSequenceNumberIsNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0063",
      message: "THE BLOCK OF A SPECIFIED SEQUENCE NUMBER IS NOT FOUND",
      description: `The sequence number specified by addresses P and Q in multiple repetitive cycle (G70, G71, G72, or G73) command cannot be searched`
    });
  }
}

/**
 * THE FINISHING SHAPE IS NOT A MONOTONOUS CHANGE(FIRST AXES)
 *
 * In a shape program for the multiple repetitive canned rough-cutting cycle (G71 or G72), the command for the first plane axis was not a monotonous increase or decrease
 */
export class A0064_TheFinishingShapeIsNotAMonotonousChangeFirstAxes extends RuntimeAlarm {
  constructor() {
    super({
      number: "0064",
      message: "THE FINISHING SHAPE IS NOT A MONOTONOUS CHANGE(FIRST AXES)",
      description: `In a shape program for the multiple repetitive canned rough-cutting cycle (G71 or G72), the command for the first plane axis was not a monotonous increase or decrease`
    });
  }
}

/**
 * G00/G01 IS NOT IN THE FIRST BLOCK OF SHAPE PROGRAM
 *
 * In the first block of the shape program specified by P of the multiple repetitive canned cycle (G70, G71, G72, or G73), G00 or G01 was not specified
 */
export class A0065_G00G01IsNotInTheFirstBlockOfShapeProgram extends RuntimeAlarm {
  constructor() {
    super({
      number: "0065",
      message: "G00/G01 IS NOT IN THE FIRST BLOCK OF SHAPE PROGRAM",
      description: `In the first block of the shape program specified by P of the multiple repetitive canned cycle (G70, G71, G72, or G73), G00 or G01 was not specified`
    });
  }
}

/**
 * UNAVAILABLE COMMAND IS IN THE MULTIPLE REPETIVE CYCLES BLOCK
 *
 * An unavailable command was found in a multiple repetitive canned cycle (G70, G71, G72, or G73) command block
 */
export class A0066_UnavailableCommandIsInTheMultipleRepetiveCyclesBlock extends RuntimeAlarm {
  constructor() {
    super({
      number: "0066",
      message: "UNAVAILABLE COMMAND IS IN THE MULTIPLE REPETIVE CYCLES BLOCK",
      description: `An unavailable command was found in a multiple repetitive canned cycle (G70, G71, G72, or G73) command block`
    });
  }
}

/**
 * THE MULTIPLE REPETIVE CYCLES IS NOT IN THE PART PROGRAM STORAGE
 *
 * A multiple repetitive canned cycle (G70, G71, G72, or G73) command is not registered in a tape memory area
 */
export class A0067_TheMultipleRepetiveCyclesIsNotInThePartProgramStorage extends RuntimeAlarm {
  constructor() {
    super({
      number: "0067",
      message: "THE MULTIPLE REPETIVE CYCLES IS NOT IN THE PART PROGRAM STORAGE",
      description: `A multiple repetitive canned cycle (G70, G71, G72, or G73) command is not registered in a tape memory area`
    });
  }
}

/**
 * LAST BLOCK OF SHAPE PROGRAM IS AN ILLEGAL COMMAND
 *
 * In a shape program in the multiple repetitive canned cycle (G70, G71, G72, or G73), a command for the chamfering or corner R in the last block is terminated in the middle
 */
export class A0069_LastBlockOfShapeProgramIsAnIllegalCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0069",
      message: "LAST BLOCK OF SHAPE PROGRAM IS AN ILLEGAL COMMAND",
      description: `In a shape program in the multiple repetitive canned cycle (G70, G71, G72, or G73), a command for the chamfering or corner R in the last block is terminated in the middle`
    });
  }
}

/**
 * NO PROGRAM SPACE IN MEMORY
 *
 * The memory area is insufficient. Delete any unnecessary programs, then retry
 */
export class A0070_NoProgramSpaceInMemory extends RuntimeAlarm {
  constructor() {
    super({
      number: "0070",
      message: "NO PROGRAM SPACE IN MEMORY",
      description: `The memory area is insufficient. Delete any unnecessary programs, then retry`
    });
  }
}

/**
 * DATA NOT FOUND
 *
 * Check the data
 */
export class A0071_DataNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0071",
      message: "DATA NOT FOUND",
      description: `Check the data`
    });
  }
}

/**
 * DATA NOT FOUND
 *
 * The number of programs to be stored exceeded 63 (basic), 125 (option), 200 (option), 400 (option) or 1000 (option). Delete unnecessary programs and execute program registration again
 */
export class A0072_DataNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0072",
      message: "DATA NOT FOUND",
      description: `The number of programs to be stored exceeded 63 (basic), 125 (option), 200 (option), 400 (option) or 1000 (option). Delete unnecessary programs and execute program registration again`
    });
  }
}

/**
 * PROGRAM NUMBER ALREADY IN USE
 *
 * The commanded program number has already been used. Change the program number or delete unnecessary programs and execute program registration again
 */
export class A0073_ProgramNumberAlreadyInUse extends RuntimeAlarm {
  constructor() {
    super({
      number: "0073",
      message: "PROGRAM NUMBER ALREADY IN USE",
      description: `The commanded program number has already been used. Change the program number or delete unnecessary programs and execute program registration again`
    });
  }
}

/**
 * PROGRAM NUMBER ALREADY IN USE
 *
 * The program number is other than 1 to 9999. Modify the program number
 */
export class A0074_ProgramNumberAlreadyInUse extends RuntimeAlarm {
  constructor() {
    super({
      number: "0074",
      message: "PROGRAM NUMBER ALREADY IN USE",
      description: `The program number is other than 1 to 9999. Modify the program number`
    });
  }
}

/**
 * PROTECT
 *
 * An attempt was made to register a program whose number was protected. In program matching, the password for the encoded program was not correct
 */
export class A0075_Protect extends RuntimeAlarm {
  constructor() {
    super({
      number: "0075",
      message: "PROTECT",
      description: `An attempt was made to register a program whose number was protected. In program matching, the password for the encoded program was not correct`
    });
  }
}

/**
 * PROGRAM NOT FOUND
 *
 * The specified program is not found in the subprogram call, macro call or graphic copy. The M, G, T or S codes are called by a P instruction other than that in an M98, G65, G66, G66.1 or interrupt type custom macro, and a program is called by a No. 2 auxiliary function code. This alarm is also generated when a program is not found by these calls
 */
export class A0076_ProgramNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0076",
      message: "PROGRAM NOT FOUND",
      description: `The specified program is not found in the subprogram call, macro call or graphic copy. The M, G, T or S codes are called by a P instruction other than that in an M98, G65, G66, G66.1 or interrupt type custom macro, and a program is called by a No. 2 auxiliary function code. This alarm is also generated when a program is not found by these calls`
    });
  }
}

/**
 * TOO MANY SUB,MACRO NESTING
 *
 * The total number of subprogram and macro calls exceeds the permissible range. Another subprogram call was executed during an external memory subprogram call
 */
export class A0077_TooManySubcommamacroNesting extends RuntimeAlarm {
  constructor() {
    super({
      number: "0077",
      message: "TOO MANY SUB,MACRO NESTING",
      description: `The total number of subprogram and macro calls exceeds the permissible range. Another subprogram call was executed during an external memory subprogram call`
    });
  }
}

/**
 * SEQUENCE NUMBER NOT FOUND
 *
 * The specified sequence No. was not found during sequence number search. The sequence No. specified as the jump destination in GOTO-- and M99P-- was not found
 */
export class A0078_SequenceNumberNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0078",
      message: "SEQUENCE NUMBER NOT FOUND",
      description: `The specified sequence No. was not found during sequence number search. The sequence No. specified as the jump destination in GOTO-- and M99P-- was not found`
    });
  }
}

/**
 * PROGRAM NOT MATCH
 *
 * The program in memory does not match the program stored on tape. Multiple programs cannot be matched continuously when parameter No. 2200#3 is set to “1”. Set parameter No. 2200#3 to “0” before executing a match
 */
export class A0079_ProgramNotMatch extends RuntimeAlarm {
  constructor() {
    super({
      number: "0079",
      message: "PROGRAM NOT MATCH",
      description: `The program in memory does not match the program stored on tape. Multiple programs cannot be matched continuously when parameter No. 2200#3 is set to “1”. Set parameter No. 2200#3 to “0” before executing a match`
    });
  }
}

/**
 * G37 MEASURING POSITION REACHED SIGNAL IS NOT PROPERLY INPUT
 *
 * When the tool length measurement function (G37) is performed, a measuring position reached signal goes 1 in front of the area determined by the ε value specified in parameter No.6254. Alternatively, the signal does not go 1. When the automatic tool compensation function (G36, G37) is used, a measuring position reached signals (XAE1, XAE2) does not go 1 within the range determined by the ε value specified in parameters No.6254 and No.6255
 */
export class A0080_G37MeasuringPositionReachedSignalIsNotProperlyInput extends RuntimeAlarm {
  constructor() {
    super({
      number: "0080",
      message: "G37 MEASURING POSITION REACHED SIGNAL IS NOT PROPERLY INPUT",
      description: `When the tool length measurement function (G37) is performed, a measuring position reached signal goes 1 in front of the area determined by the ε value specified in parameter No.6254. Alternatively, the signal does not go 1. When the automatic tool compensation function (G36, G37) is used, a measuring position reached signals (XAE1, XAE2) does not go 1 within the range determined by the ε value specified in parameters No.6254 and No.6255`
    });
  }
}

/**
 * G37 OFFSET NO. UNASSIGNED
 *
 * The tool length measurement function (G37) is specified without specifying an H code. Correct the program. The automatic tool compensation function (G36, G37) is specified without specifying an T code. Correct the program
 */
export class A0081_G37OffsetNumberUnassigned extends RuntimeAlarm {
  constructor() {
    super({
      number: "0081",
      message: "G37 OFFSET NO. UNASSIGNED",
      description: `The tool length measurement function (G37) is specified without specifying an H code. Correct the program. The automatic tool compensation function (G36, G37) is specified without specifying an T code. Correct the program`
    });
  }
}

/**
 * G37 SPECIFIED WITH H CODE
 *
 * The tool length measurement function (G37) is specified together with an H code in the same block. Correct the program. The automatic tool compensation function (G36, G37) is specified together with an T code in the same block. Correct the program
 */
export class A0082_G37SpecifiedWithHCode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0082",
      message: "G37 SPECIFIED WITH H CODE",
      description: `The tool length measurement function (G37) is specified together with an H code in the same block. Correct the program. The automatic tool compensation function (G36, G37) is specified together with an T code in the same block. Correct the program`
    });
  }
}

/**
 * G37 IMPROPER AXIS COMMAND
 *
 * An error has been found in axis specification of the tool length measurement function (G37). Alternatively, a move command is specified as an incremental command. Correct the program. An error has been found in axis specification of the automatic tool compensation function (G36, G37). Alternatively, a command is specified as an incremental command. Correct the program
 */
export class A0083_G37ImproperAxisCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0083",
      message: "G37 IMPROPER AXIS COMMAND",
      description: `An error has been found in axis specification of the tool length measurement function (G37). Alternatively, a move command is specified as an incremental command. Correct the program. An error has been found in axis specification of the automatic tool compensation function (G36, G37). Alternatively, a command is specified as an incremental command. Correct the program`
    });
  }
}

/**
 * OVERRUN ERROR
 *
 * The next character was received from the I/O device connected to reader/punch interface 1 before it could read a previously received character
 */
export class A0085_OverrunError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0085",
      message: "OVERRUN ERROR",
      description: `The next character was received from the I/O device connected to reader/punch interface 1 before it could read a previously received character`
    });
  }
}

/**
 * DR OFF
 *
 * During I/O process by reader/punch interface 1, the data set ready input signal of the I/O device (DR) was OFF. Possible causes are an I/O device not turn on, a broken cable, and a defective printed circuit board
 */
export class A0086_DrOff extends RuntimeAlarm {
  constructor() {
    super({
      number: "0086",
      message: "DR OFF",
      description: `During I/O process by reader/punch interface 1, the data set ready input signal of the I/O device (DR) was OFF. Possible causes are an I/O device not turn on, a broken cable, and a defective printed circuit board`
    });
  }
}

/**
 * BUFFER OVERFLOW
 *
 * During a read by reader/punch interface 1, although a read stop command was issued, more than 10 characters were input. The I/O device or printed circuit board was defective
 */
export class A0087_BufferOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "0087",
      message: "BUFFER OVERFLOW",
      description: `During a read by reader/punch interface 1, although a read stop command was issued, more than 10 characters were input. The I/O device or printed circuit board was defective`
    });
  }
}

/**
 * REFERENCE RETURN INCOMPLETE
 *
 * Rotate the motor manually at least one turn, and set the zero position of the absolute position detector after turning the CNC and servo amplifier off and then on again
 */
export class A0090_ReferenceReturnIncomplete extends RuntimeAlarm {
  constructor() {
    super({
      number: "0090",
      message: "REFERENCE RETURN INCOMPLETE",
      description: `Rotate the motor manually at least one turn, and set the zero position of the absolute position detector after turning the CNC and servo amplifier off and then on again`
    });
  }
}

/**
 * MANUAL REFERENCE POSITION RETURN IS NOT PERFORMED IN FEED HOLD
 *
 * Manual return to the reference position cannot be performed when automatic operation is halted. Perform the manual return to the reference position when automatic operation is stopped or reset
 */
export class A0091_ManualReferencePositionReturnIsNotPerformedInFeedHold extends RuntimeAlarm {
  constructor() {
    super({
      number: "0091",
      message: "MANUAL REFERENCE POSITION RETURN IS NOT PERFORMED IN FEED HOLD",
      description: `Manual return to the reference position cannot be performed when automatic operation is halted. Perform the manual return to the reference position when automatic operation is stopped or reset`
    });
  }
}

/**
 * ZERO RETURN CHECK (G27) ERROR
 *
 * The axis specified in G27 has not returned to zero. Reprogram so that the axis returns to zero
 */
export class A0092_ZeroReturnCheckG27Error extends RuntimeAlarm {
  constructor() {
    super({
      number: "0092",
      message: "ZERO RETURN CHECK (G27) ERROR",
      description: `The axis specified in G27 has not returned to zero. Reprogram so that the axis returns to zero`
    });
  }
}

/**
 * P TYPE NOT ALLOWED (COORD CHG)
 *
 * P type cannot be specified when the program is restarted. (After the automatic operation was interrupted, the coordinate system setting operation was performed.) Perform the correct operation according to the User's manual
 */
export class A0094_PTypeNotAllowedCoordChg extends RuntimeAlarm {
  constructor() {
    super({
      number: "0094",
      message: "P TYPE NOT ALLOWED (COORD CHG)",
      description: `P type cannot be specified when the program is restarted. (After the automatic operation was interrupted, the coordinate system setting operation was performed.) Perform the correct operation according to the User's manual`
    });
  }
}

/**
 * P TYPE NOT ALLOWED (EXT OFS CHG)
 *
 * P type cannot be specified when the program is restarted. (After the automatic operation was interrupted, the external workpiece offset amount changed.) Perform the correct operation according to the User's manual
 */
export class A0095_PTypeNotAllowedExtOfsChg extends RuntimeAlarm {
  constructor() {
    super({
      number: "0095",
      message: "P TYPE NOT ALLOWED (EXT OFS CHG)",
      description: `P type cannot be specified when the program is restarted. (After the automatic operation was interrupted, the external workpiece offset amount changed.) Perform the correct operation according to the User's manual`
    });
  }
}

/**
 * P TYPE NOT ALLOWED (WRK OFS CHG)
 *
 * P type cannot be specified when the program is restarted. (After the automatic operation was interrupted, the workpiece offset amount changed.) Perform the correct operation according to the User's manual
 */
export class A0096_PTypeNotAllowedWrkOfsChg extends RuntimeAlarm {
  constructor() {
    super({
      number: "0096",
      message: "P TYPE NOT ALLOWED (WRK OFS CHG)",
      description: `P type cannot be specified when the program is restarted. (After the automatic operation was interrupted, the workpiece offset amount changed.) Perform the correct operation according to the User's manual`
    });
  }
}

/**
 * P TYPE NOT ALLOWED (AUTO EXEC)
 *
 * P type cannot be directed when the program is restarted. (After power ON, after emergency stop or alarms 0094 to 0097 reset, no automatic operation is performed.) Perform automatic operation
 */
export class A0097_PTypeNotAllowedAutoExec extends RuntimeAlarm {
  constructor() {
    super({
      number: "0097",
      message: "P TYPE NOT ALLOWED (AUTO EXEC)",
      description: `P type cannot be directed when the program is restarted. (After power ON, after emergency stop or alarms 0094 to 0097 reset, no automatic operation is performed.) Perform automatic operation`
    });
  }
}

/**
 * G28 FOUND IN SEQUENCE RETURN
 *
 * A command of the program restart was specified without the reference position return operation after power ON or emergency stop, and G28 was found during search. Perform the reference position return
 */
export class A0098_G28FoundInSequenceReturn extends RuntimeAlarm {
  constructor() {
    super({
      number: "0098",
      message: "G28 FOUND IN SEQUENCE RETURN",
      description: `A command of the program restart was specified without the reference position return operation after power ON or emergency stop, and G28 was found during search. Perform the reference position return`
    });
  }
}

/**
 * MDI EXEC NOT ALLOWED AFT. SEARCH
 *
 * After completion of search in program restart, a move command is given with MDI
 */
export class A0099_MdiExecNotAllowedAfterSearch extends RuntimeAlarm {
  constructor() {
    super({
      number: "0099",
      message: "MDI EXEC NOT ALLOWED AFT. SEARCH",
      description: `After completion of search in program restart, a move command is given with MDI`
    });
  }
}

/**
 * PLEASE CLEAR MEMORY
 *
 * The power turned off while rewriting the memory by program edit operation. If this alarm has occurred, press <RESET> while pressing <PROG>, and only the program being edited will be deleted. Register the deleted program
 */
export class A0101_PleaseClearMemory extends RuntimeAlarm {
  constructor() {
    super({
      number: "0101",
      message: "PLEASE CLEAR MEMORY",
      description: `The power turned off while rewriting the memory by program edit operation. If this alarm has occurred, press <RESET> while pressing <PROG>, and only the program being edited will be deleted. Register the deleted program`
    });
  }
}

/**
 * FORMAT ERROR IN G08
 *
 * A value other than 0 or 1 was specified after P in the G08 code, or no value was specified
 */
export class A0109_FormatErrorInG08 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0109",
      message: "FORMAT ERROR IN G08",
      description: `A value other than 0 or 1 was specified after P in the G08 code, or no value was specified`
    });
  }
}

/**
 * OVERFLOW :INTEGER
 *
 * An integer went out of range during arithmetic calculations
 */
export class A0110_OverflowInteger extends RuntimeAlarm {
  constructor() {
    super({
      number: "0110",
      message: "OVERFLOW :INTEGER",
      description: `An integer went out of range during arithmetic calculations`
    });
  }
}

/**
 * OVERFLOW :FLOATING
 *
 * A decimal point (floating point number format data) went out of range during arithmetic calculations
 */
export class A0111_OverflowFloating extends RuntimeAlarm {
  constructor() {
    super({
      number: "0111",
      message: "OVERFLOW :FLOATING",
      description: `A decimal point (floating point number format data) went out of range during arithmetic calculations`
    });
  }
}

/**
 * ZERO DIVIDE
 *
 * An attempt was made to divide by zero in a custom macro
 */
export class A0112_ZeroDivide extends RuntimeAlarm {
  constructor() {
    super({
      number: "0112",
      message: "ZERO DIVIDE",
      description: `An attempt was made to divide by zero in a custom macro`
    });
  }
}

/**
 * IMPROPER COMMAND
 *
 * A function which cannot be used in custom macro is commanded. Modify the program
 */
export class A0113_ImproperCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0113",
      message: "IMPROPER COMMAND",
      description: `A function which cannot be used in custom macro is commanded. Modify the program`
    });
  }
}

/**
 * ILLEGAL EXPRESSION FORMAT
 *
 * The format used in an expression in a custom macro statement is in error. The parameter tape format is in error
 */
export class A0114_IllegalExpressionFormat extends RuntimeAlarm {
  constructor() {
    super({
      number: "0114",
      message: "ILLEGAL EXPRESSION FORMAT",
      description: `The format used in an expression in a custom macro statement is in error. The parameter tape format is in error`
    });
  }
}

/**
 * VARIABLE NO. OUT OF RANGE
 *
 * A number that cannot be used for a local variable, common variable, or system variable in a custom macro is specified. In the EGB axis skip function (G31.8), a non-existent custom macro variable number is specified. Or, the number of custom macro variables used to store skip positions is not sufficient
 */
export class A0115_VariableNumberOutOfRange extends RuntimeAlarm {
  constructor() {
    super({
      number: "0115",
      message: "VARIABLE NO. OUT OF RANGE",
      description: `A number that cannot be used for a local variable, common variable, or system variable in a custom macro is specified. In the EGB axis skip function (G31.8), a non-existent custom macro variable number is specified. Or, the number of custom macro variables used to store skip positions is not sufficient`
    });
  }
}

/**
 * WRITE PROTECTED VARIABLE
 *
 * An attempt was made in a custom macro to use on the left side of an expression a variable that can only be used on the right side of an expression
 */
export class A0116_WriteProtectedVariable extends RuntimeAlarm {
  constructor() {
    super({
      number: "0116",
      message: "WRITE PROTECTED VARIABLE",
      description: `An attempt was made in a custom macro to use on the left side of an expression a variable that can only be used on the right side of an expression`
    });
  }
}

/**
 * TOO MANY BRACKET NESTING
 *
 * Too many brackets “[ ]” were nested in a custom macro. The nesting level including function brackets is 5
 */
export class A0118_TooManyBracketNesting extends RuntimeAlarm {
  constructor() {
    super({
      number: "0118",
      message: "TOO MANY BRACKET NESTING",
      description: `Too many brackets “[ ]” were nested in a custom macro. The nesting level including function brackets is 5`
    });
  }
}

/**
 * ARGUMENT VALUE OUT OF RANGE
 *
 * The value of an argument in a custom macro function is out of range
 */
export class A0119_ArgumentValueOutOfRange extends RuntimeAlarm {
  constructor() {
    super({
      number: "0119",
      message: "ARGUMENT VALUE OUT OF RANGE",
      description: `The value of an argument in a custom macro function is out of range`
    });
  }
}

/**
 * TOO MANY MACRO NESTING
 *
 * Too many macro calls were nested in a custom macro
 */
export class A0122_TooManyMacroNesting extends RuntimeAlarm {
  constructor() {
    super({
      number: "0122",
      message: "TOO MANY MACRO NESTING",
      description: `Too many macro calls were nested in a custom macro`
    });
  }
}

/**
 * ILLEGAL MODE FOR GOTO/WHILE/DO
 *
 * A GOTO statement or WHILE-DO statement was found in the main program in the MDI or DNC mode
 */
export class A0123_IllegalModeForGotoWhileDo extends RuntimeAlarm {
  constructor() {
    super({
      number: "0123",
      message: "ILLEGAL MODE FOR GOTO/WHILE/DO",
      description: `A GOTO statement or WHILE-DO statement was found in the main program in the MDI or DNC mode`
    });
  }
}

/**
 * MISSING END STATEMENT
 *
 * The END instruction corresponding to the DO instruction was missing in a custom macro
 */
export class A0124_MissingEndStatement extends RuntimeAlarm {
  constructor() {
    super({
      number: "0124",
      message: "MISSING END STATEMENT",
      description: `The END instruction corresponding to the DO instruction was missing in a custom macro`
    });
  }
}

/**
 * MACRO STATEMENT FORMAT ERROR
 *
 * The format used in a macro statement in a custom macro is in error
 */
export class A0125_MacroStatementFormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0125",
      message: "MACRO STATEMENT FORMAT ERROR",
      description: `The format used in a macro statement in a custom macro is in error`
    });
  }
}

/**
 * ILLEGAL LOOP NUMBER
 *
 * DO and END Nos. in a custom macro are in error, or exceed the permissible range (valid range: 1 to 3)
 */
export class A0126_IllegalLoopNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "0126",
      message: "ILLEGAL LOOP NUMBER",
      description: `DO and END Nos. in a custom macro are in error, or exceed the permissible range (valid range: 1 to 3)`
    });
  }
}

/**
 * DUPLICATE NC,MACRO STATEMENT
 *
 * An NC statement and macro statement were specified in the same block
 */
export class A0127_DuplicateNccommamacroStatement extends RuntimeAlarm {
  constructor() {
    super({
      number: "0127",
      message: "DUPLICATE NC,MACRO STATEMENT",
      description: `An NC statement and macro statement were specified in the same block`
    });
  }
}

/**
 * ILLEGAL MACRO SEQUENCE NUMBER
 *
 * The specified sequence No. could not be found for sequence number search. The sequence No. specified as the jump destination in GOTO-- and M99P-- could not be found
 */
export class A0128_IllegalMacroSequenceNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "0128",
      message: "ILLEGAL MACRO SEQUENCE NUMBER",
      description: `The specified sequence No. could not be found for sequence number search. The sequence No. specified as the jump destination in GOTO-- and M99P-- could not be found`
    });
  }
}

/**
 * USE 'G' AS ARGUMENT
 *
 * G is used as an argument in a custom macro call. G can be specified as an argument only in an every-block call (G66.1)
 */
export class A0129_UseGAsArgument extends RuntimeAlarm {
  constructor() {
    super({
      number: "0129",
      message: "USE 'G' AS ARGUMENT",
      description: `G is used as an argument in a custom macro call. G can be specified as an argument only in an every-block call (G66.1)`
    });
  }
}

/**
 * NC AND PMC AXIS ARE CONFLICTED
 *
 * The NC command and the PMC axis control command were conflicted. Modify the program or ladder
 */
export class A0130_NcAndPmcAxisAreConflicted extends RuntimeAlarm {
  constructor() {
    super({
      number: "0130",
      message: "NC AND PMC AXIS ARE CONFLICTED",
      description: `The NC command and the PMC axis control command were conflicted. Modify the program or ladder`
    });
  }
}

/**
 * SPOS AXIS - OTHER AXIS SAME TIME
 *
 * The spindle positioning axis and another axis are specified in the same block
 */
export class A0136_SposAxisOtherAxisSameTime extends RuntimeAlarm {
  constructor() {
    super({
      number: "0136",
      message: "SPOS AXIS - OTHER AXIS SAME TIME",
      description: `The spindle positioning axis and another axis are specified in the same block`
    });
  }
}

/**
 * M-CODE & MOVE CMD IN SAME BLK
 *
 * The spindle positioning axis and another axis are specified in the same block
 */
export class A0137_MCodeAndMoveCmdInSameBlk extends RuntimeAlarm {
  constructor() {
    super({
      number: "0137",
      message: "M-CODE & MOVE CMD IN SAME BLK",
      description: `The spindle positioning axis and another axis are specified in the same block`
    });
  }
}

/**
 * SUPERIMPOSED DATA OVERFLOW
 *
 * The total distribution amount of the CNC and PMC is too large during superimposed control for PMC axis control
 */
export class A0138_SuperimposedDataOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "0138",
      message: "SUPERIMPOSED DATA OVERFLOW",
      description: `The total distribution amount of the CNC and PMC is too large during superimposed control for PMC axis control`
    });
  }
}

/**
 * CANNOT CHANGE PMC CONTROL AXIS
 *
 * The PMC axis was selected for the axis for which the PMC axis is being controlled
 */
export class A0139_CannotChangePmcControlAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "0139",
      message: "CANNOT CHANGE PMC CONTROL AXIS",
      description: `The PMC axis was selected for the axis for which the PMC axis is being controlled`
    });
  }
}

/**
 * PROGRAM NUMBER ALREADY IN USE
 *
 * In the background, an attempt was made to select or delete the program being selected in the foreground. Perform the correct operation for the background edition
 */
export class A0140_ProgramNumberAlreadyInUse extends RuntimeAlarm {
  constructor() {
    super({
      number: "0140",
      message: "PROGRAM NUMBER ALREADY IN USE",
      description: `In the background, an attempt was made to select or delete the program being selected in the foreground. Perform the correct operation for the background edition`
    });
  }
}

/**
 * CAN NOT COMMAND G51 IN 3-D OFFSET
 *
 * G51 (Scaling ON) is commanded in the three-dimensional tool offset mode. Modify the program
 */
export class A0141_CanNotCommandG51In3DOffset extends RuntimeAlarm {
  constructor() {
    super({
      number: "0141",
      message: "CAN NOT COMMAND G51 IN 3-D OFFSET",
      description: `G51 (Scaling ON) is commanded in the three-dimensional tool offset mode. Modify the program`
    });
  }
}

/**
 * ILLEGAL SCALE RATE
 *
 * The scaling rate is 0 times or 10000 times or more. Modify the setting of the scaling rate. (G51P_ … or G51I_J_K_ … or parameter (No. 5411 or 5421))
 */
export class A0142_IllegalScaleRate extends RuntimeAlarm {
  constructor() {
    super({
      number: "0142",
      message: "ILLEGAL SCALE RATE",
      description: `The scaling rate is 0 times or 10000 times or more. Modify the setting of the scaling rate. (G51P_ … or G51I_J_K_ … or parameter (No. 5411 or 5421))`
    });
  }
}

/**
 * COMMAND DATA OVERFLOW
 *
 * An overflow occurred in the storage length of the CNC internal data. This alarm is also generated when the result of internal calculation of scaling, coordinate rotation and cylindrical interpolation overflows the data storage. It also is generated during input of the manual intervention amount
 */
export class A0143_CommandDataOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "0143",
      message: "COMMAND DATA OVERFLOW",
      description: `An overflow occurred in the storage length of the CNC internal data. This alarm is also generated when the result of internal calculation of scaling, coordinate rotation and cylindrical interpolation overflows the data storage. It also is generated during input of the manual intervention amount`
    });
  }
}

/**
 * ILLEGAL PLANE SELECTED
 *
 * The coordinate rotation plane and arc or cutter compensation C plane must be the same. Modify the program
 */
export class A0144_IllegalPlaneSelected extends RuntimeAlarm {
  constructor() {
    super({
      number: "0144",
      message: "ILLEGAL PLANE SELECTED",
      description: `The coordinate rotation plane and arc or cutter compensation C plane must be the same. Modify the program`
    });
  }
}

/**
 * ILLEGAL USE OF G12.1/G13.1
 *
 * The axis No. of plane selection parameter No. 5460 (linear axis) and No. 5461(axis of rotation) in the polar coordinate interpolation mode is out of range (1 to number of controlled axes)
 */
export class A0145_IllegalUseOfG12_1G13_1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0145",
      message: "ILLEGAL USE OF G12.1/G13.1",
      description: `The axis No. of plane selection parameter No. 5460 (linear axis) and No. 5461(axis of rotation) in the polar coordinate interpolation mode is out of range (1 to number of controlled axes)`
    });
  }
}

/**
 * ILLEGAL USE OF G-CODE
 *
 * The modal G code group contains an illegal G code in the polar coordinate interpolation mode or when a mode was canceled. Only the following G codes are allowed: G40, G50, G69.1 An illegal G code was specified while in the polar coordinate interpolation mode. The following C codes are not allowed: G27, G28, G30, G30.1, G31 to G31.4, G37 to G387.3, G52, G92, G53, G17 to G19, G81 to G89, G68 In the 01 group, G codes other than G01, G02, G03, G02.2 and G03.2 cannot be specified
 */
export class A0146_IllegalUseOfGCode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0146",
      message: "ILLEGAL USE OF G-CODE",
      description: `The modal G code group contains an illegal G code in the polar coordinate interpolation mode or when a mode was canceled. Only the following G codes are allowed: G40, G50, G69.1 An illegal G code was specified while in the polar coordinate interpolation mode. The following C codes are not allowed: G27, G28, G30, G30.1, G31 to G31.4, G37 to G387.3, G52, G92, G53, G17 to G19, G81 to G89, G68 In the 01 group, G codes other than G01, G02, G03, G02.2 and G03.2 cannot be specified`
    });
  }
}

/**
 * SETTING ERROR
 *
 * Automatic corner override deceleration rate is out of the settable range of judgement angle. Modify the parameters (No.1710 to No.1714)
 */
export class A0148_SettingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0148",
      message: "SETTING ERROR",
      description: `Automatic corner override deceleration rate is out of the settable range of judgement angle. Modify the parameters (No.1710 to No.1714)`
    });
  }
}

/**
 * NOT USING TOOL IN LIFE GROUP
 *
 * H99 or D99 is specified when no tool management data number is assigned to the spindle position. Correct the program
 */
export class A0154_NotUsingToolInLifeGroup extends RuntimeAlarm {
  constructor() {
    super({
      number: "0154",
      message: "NOT USING TOOL IN LIFE GROUP",
      description: `H99 or D99 is specified when no tool management data number is assigned to the spindle position. Correct the program`
    });
  }
}

/**
 * MISMATCH WAITING M-CODE
 *
 * A waiting M-code is in error. <1> When different M codes are specified for path 1 and path 2 as waiting M codes without a P command. <2> When the waiting M codes are not identical even though the P commands are identical <3> When the waiting M codes are identical and the P commands are not identical (This occurs when a P command is specified with binary value.) <4> When the number lists in the P commands contain a different number even though the waiting M codes are identical (This occurs when a P command is specified by combining path numbers.) <5> When a waiting M code without a P command (2-path waiting) and a waiting M code with a P command (3-or-more-path waiting) were specified at the same time <6> When a waiting M code without a P command was specified for 3 or more paths
 */
export class A0160_MismatchWaitingMCode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0160",
      message: "MISMATCH WAITING M-CODE",
      description: `A waiting M-code is in error. <1> When different M codes are specified for path 1 and path 2 as waiting M codes without a P command. <2> When the waiting M codes are not identical even though the P commands are identical <3> When the waiting M codes are identical and the P commands are not identical (This occurs when a P command is specified with binary value.) <4> When the number lists in the P commands contain a different number even though the waiting M codes are identical (This occurs when a P command is specified by combining path numbers.) <5> When a waiting M code without a P command (2-path waiting) and a waiting M code with a P command (3-or-more-path waiting) were specified at the same time <6> When a waiting M code without a P command was specified for 3 or more paths`
    });
  }
}

/**
 * ILLEGAL P OF WAITING M-CODE
 *
 * P in a waiting M-code is incorrect. <1> When address P is negative <2> When a P value inappropriate for the system configuration was specified <3> When a waiting M code without a P command (2-path waiting) was specified in the system having 3 or more paths
 */
export class A0161_IllegalPOfWaitingMCode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0161",
      message: "ILLEGAL P OF WAITING M-CODE",
      description: `P in a waiting M-code is incorrect. <1> When address P is negative <2> When a P value inappropriate for the system configuration was specified <3> When a waiting M code without a P command (2-path waiting) was specified in the system having 3 or more paths`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G68/G69
 *
 * G68 and G69 are not independently commanded in balance cut. An illegal value is commanded in a balance cut combination (address P)
 */
export class A0163_IllegalCommandInG68G69 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0163",
      message: "ILLEGAL COMMAND IN G68/G69",
      description: `G68 and G69 are not independently commanded in balance cut. An illegal value is commanded in a balance cut combination (address P)`
    });
  }
}

/**
 * ILLEGAL TOOL GEOMETRY DATA
 *
 * Incorrect tool figure data in interference check. Set correct data, or select correct tool figure data
 */
export class A0169_IllegalToolGeometryData extends RuntimeAlarm {
  constructor() {
    super({
      number: "0169",
      message: "ILLEGAL TOOL GEOMETRY DATA",
      description: `Incorrect tool figure data in interference check. Set correct data, or select correct tool figure data`
    });
  }
}

/**
 * ILLEGAL G07.1 AXIS
 *
 * An axis which cannot perform cylindrical interpolation was specified. More than one axis was specified in a G07.1 block. An attempt was made to cancel cylindrical interpolation for an axis that was not in the cylindrical interpolation mode. For the cylindrical interpolation axis, set not “0” but one of 5, 6 or 7 (parallel axis specification) to parameter No. 1022 to instruct the arc with axis of rotation (ROT parameter No. 1006#1 is set to “1” and parameter No. 1260 is set) ON
 */
export class A0175_IllegalG07_1Axis extends RuntimeAlarm {
  constructor() {
    super({
      number: "0175",
      message: "ILLEGAL G07.1 AXIS",
      description: `An axis which cannot perform cylindrical interpolation was specified. More than one axis was specified in a G07.1 block. An attempt was made to cancel cylindrical interpolation for an axis that was not in the cylindrical interpolation mode. For the cylindrical interpolation axis, set not “0” but one of 5, 6 or 7 (parallel axis specification) to parameter No. 1022 to instruct the arc with axis of rotation (ROT parameter No. 1006#1 is set to “1” and parameter No. 1260 is set) ON`
    });
  }
}

/**
 * ILLEGAL G-CODE USE(G07.1 MODE)
 *
 * A G code was specified that cannot be specified in the cylindrical interpolation mode. This alarm also is generated when an 01 group G code was in the G00 mode or code G00 was instructed. Cancel the cylindrical interpolation mode before instructing code G00
 */
export class A0176_IllegalGCodeUseG07_1Mode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0176",
      message: "ILLEGAL G-CODE USE(G07.1 MODE)",
      description: `A G code was specified that cannot be specified in the cylindrical interpolation mode. This alarm also is generated when an 01 group G code was in the G00 mode or code G00 was instructed. Cancel the cylindrical interpolation mode before instructing code G00`
    });
  }
}

/**
 * PARAM. (NO.7510) SETTING ERROR
 *
 * The number of controlled axes set by the parameter No. 7510 exceeds the maximum number. Modify the parameter setting value
 */
export class A0179_ParameterNumber7510SettingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0179",
      message: "PARAM. (NO.7510) SETTING ERROR",
      description: `The number of controlled axes set by the parameter No. 7510 exceeds the maximum number. Modify the parameter setting value`
    });
  }
}

/**
 * ILLEGAL AXIS SELECTED (G96)
 *
 * An illegal value was specified in P in a G96 block or parameter No. 5844
 */
export class A0190_IllegalAxisSelectedG96 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0190",
      message: "ILLEGAL AXIS SELECTED (G96)",
      description: `An illegal value was specified in P in a G96 block or parameter No. 5844`
    });
  }
}

/**
 * SPINDLE COMMAND IN SYNCHRO-MODE
 *
 * A Cs contour control mode, spindle positioning command, or rigid tapping mode was specified during the spindle synchronous control mode or simple spindle synchronous control mode
 */
export class A0194_SpindleCommandInSynchroMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0194",
      message: "SPINDLE COMMAND IN SYNCHRO-MODE",
      description: `A Cs contour control mode, spindle positioning command, or rigid tapping mode was specified during the spindle synchronous control mode or simple spindle synchronous control mode`
    });
  }
}

/**
 * C-AXIS COMMANDED IN SPINDLE MODE
 *
 * The program specified a movement along the Cs-axis when the Cs contour control switching signal was off
 */
export class A0197_CAxisCommandedInSpindleMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0197",
      message: "C-AXIS COMMANDED IN SPINDLE MODE",
      description: `The program specified a movement along the Cs-axis when the Cs contour control switching signal was off`
    });
  }
}

/**
 * MACRO WORD UNDEFINED
 *
 * Undefined macro word was used. Modify the custom macro
 */
export class A0199_MacroWordUndefined extends RuntimeAlarm {
  constructor() {
    super({
      number: "0199",
      message: "MACRO WORD UNDEFINED",
      description: `Undefined macro word was used. Modify the custom macro`
    });
  }
}

/**
 * ILLEGAL S CODE COMMAND
 *
 * In the rigid tap, an S value was out of range or was not specified. The parameter (Nos. 5241 to 5243) setting is an S value which can be specified for the rigid tap. Correct the parameters or modify the program
 */
export class A0200_IllegalSCodeCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0200",
      message: "ILLEGAL S CODE COMMAND",
      description: `In the rigid tap, an S value was out of range or was not specified. The parameter (Nos. 5241 to 5243) setting is an S value which can be specified for the rigid tap. Correct the parameters or modify the program`
    });
  }
}

/**
 * FEEDRATE NOT FOUND IN RIGID TAP
 *
 * The command F code for a cutting feedrate is a zero. If the value of F command is much smaller than that of the S command, when a rigid tap command is specified, this alarm is generated. This is because cutting is not possible by the lead specified by the program
 */
export class A0201_FeedrateNotFoundInRigidTap extends RuntimeAlarm {
  constructor() {
    super({
      number: "0201",
      message: "FEEDRATE NOT FOUND IN RIGID TAP",
      description: `The command F code for a cutting feedrate is a zero. If the value of F command is much smaller than that of the S command, when a rigid tap command is specified, this alarm is generated. This is because cutting is not possible by the lead specified by the program`
    });
  }
}

/**
 * POSITION LSI OVERFLOW
 *
 * In the rigid tap, spindle distribution value is too large. (System error)
 */
export class A0202_PositionLsiOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "0202",
      message: "POSITION LSI OVERFLOW",
      description: `In the rigid tap, spindle distribution value is too large. (System error)`
    });
  }
}

/**
 * PROGRAM MISS AT RIGID TAPPING
 *
 * In the rigid tap, position for a rigid M code (M29) or an S command is incorrect. Modify the program
 */
export class A0203_ProgramMissAtRigidTapping extends RuntimeAlarm {
  constructor() {
    super({
      number: "0203",
      message: "PROGRAM MISS AT RIGID TAPPING",
      description: `In the rigid tap, position for a rigid M code (M29) or an S command is incorrect. Modify the program`
    });
  }
}

/**
 * ILLEGAL AXIS OPERATION
 *
 * In the rigid tap, an axis movement is specified between the rigid M code (M29) block and G84 (or G74) block. Modify the program
 */
export class A0204_IllegalAxisOperation extends RuntimeAlarm {
  constructor() {
    super({
      number: "0204",
      message: "ILLEGAL AXIS OPERATION",
      description: `In the rigid tap, an axis movement is specified between the rigid M code (M29) block and G84 (or G74) block. Modify the program`
    });
  }
}

/**
 * RIGID MODE DI SIGNAL OFF
 *
 * Although a rigid M code (M29) is specified in rigid tapping, the rigid mode DI signal (DGN G061.0) is not ON during execution of the G84 (or G74) block. Check the PMC ladder diagram to find the reason why the DI signal is not turned on
 */
export class A0205_RigidModeDiSignalOff extends RuntimeAlarm {
  constructor() {
    super({
      number: "0205",
      message: "RIGID MODE DI SIGNAL OFF",
      description: `Although a rigid M code (M29) is specified in rigid tapping, the rigid mode DI signal (DGN G061.0) is not ON during execution of the G84 (or G74) block. Check the PMC ladder diagram to find the reason why the DI signal is not turned on`
    });
  }
}

/**
 * CAN NOT CHANGE PLANE (RIGID TAP)
 *
 * Plane changeover was instructed in the rigid mode. Modify the program
 */
export class A0206_CanNotChangePlaneRigidTap extends RuntimeAlarm {
  constructor() {
    super({
      number: "0206",
      message: "CAN NOT CHANGE PLANE (RIGID TAP)",
      description: `Plane changeover was instructed in the rigid mode. Modify the program`
    });
  }
}

/**
 * RIGID DATA MISMATCH
 *
 * The specified distance was too short or too long in rigid tapping
 */
export class A0207_RigidDataMismatch extends RuntimeAlarm {
  constructor() {
    super({
      number: "0207",
      message: "RIGID DATA MISMATCH",
      description: `The specified distance was too short or too long in rigid tapping`
    });
  }
}

/**
 * CAN NOT COMMAND M198/M99
 *
 * repetitive canned cycle
 */
export class A0210_CanNotCommandM198M99 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0210",
      message: "CAN NOT COMMAND M198/M99",
      description: `repetitive canned cycle`
    });
  }
}

/**
 * ILLEGAL PLANE SELECT
 *
 * The direct drawing dimensions programming is commanded for the plane other than the Z-X plane. Correct the program
 */
export class A0212_IllegalPlaneSelect extends RuntimeAlarm {
  constructor() {
    super({
      number: "0212",
      message: "ILLEGAL PLANE SELECT",
      description: `The direct drawing dimensions programming is commanded for the plane other than the Z-X plane. Correct the program`
    });
  }
}

/**
 * ILLEGAL COMMAND IN SYNCHRO-MODE
 *
 * In feed axis synchronization control, the following errors occurred during the synchronous operation
 */
export class A0213_IllegalCommandInSynchroMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0213",
      message: "ILLEGAL COMMAND IN SYNCHRO-MODE",
      description: `In feed axis synchronization control, the following errors occurred during the synchronous operation`
    });
  }
}

/**
 * ILLEGAL COMMAND IN SYNCHRO-MODE
 *
 * Coordinate system is set or tool compensation of the shift type is executed in the synchronous control. Correct the program
 */
export class A0214_IllegalCommandInSynchroMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0214",
      message: "ILLEGAL COMMAND IN SYNCHRO-MODE",
      description: `Coordinate system is set or tool compensation of the shift type is executed in the synchronous control. Correct the program`
    });
  }
}

/**
 * DUPLICATE G51.2(COMMANDS)
 *
 * G51.2 is further commanded in the G51.2 mode. Modify the program
 */
export class A0217_DuplicateG51_2Commands extends RuntimeAlarm {
  constructor() {
    super({
      number: "0217",
      message: "DUPLICATE G51.2(COMMANDS)",
      description: `G51.2 is further commanded in the G51.2 mode. Modify the program`
    });
  }
}

/**
 * NOT FOUND P/Q COMMAND
 *
 * P or Q is not commanded in the G51.2 block, or the command value is out of the range. Modify the program. For a polygon turning between spindles, more information as to why this alarm occurred is indicated in DGN No. 471
 */
export class A0218_NotFoundPQCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0218",
      message: "NOT FOUND P/Q COMMAND",
      description: `P or Q is not commanded in the G51.2 block, or the command value is out of the range. Modify the program. For a polygon turning between spindles, more information as to why this alarm occurred is indicated in DGN No. 471`
    });
  }
}

/**
 * COMMAND G51.2/G50.2 INDEPENDENTLY
 *
 * G51.2 and 50.2 were specified in the same block for other commands. Modify the program in another block
 */
export class A0219_CommandG51_2G50_2Independently extends RuntimeAlarm {
  constructor() {
    super({
      number: "0219",
      message: "COMMAND G51.2/G50.2 INDEPENDENTLY",
      description: `G51.2 and 50.2 were specified in the same block for other commands. Modify the program in another block`
    });
  }
}

/**
 * ILLEGAL COMMAND IN SYNCHR-MODE
 *
 * In the synchronous operation, movement is commanded by the NC program or PMC axis control interface for the synchronous axis. Modify the program or check the PMC ladder
 */
export class A0220_IllegalCommandInSynchrMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0220",
      message: "ILLEGAL COMMAND IN SYNCHR-MODE",
      description: `In the synchronous operation, movement is commanded by the NC program or PMC axis control interface for the synchronous axis. Modify the program or check the PMC ladder`
    });
  }
}

/**
 * ILLEGAL COMMAND IN SYNCHR-MODE
 *
 * Polygon machining synchronous operation and axis control or balance cutting are executed at a time. Modify the program
 */
export class A0221_IllegalCommandInSynchrMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0221",
      message: "ILLEGAL COMMAND IN SYNCHR-MODE",
      description: `Polygon machining synchronous operation and axis control or balance cutting are executed at a time. Modify the program`
    });
  }
}

/**
 * DNC OP. NOT ALLOWED IN BG-EDIT
 *
 * Input and output are executed at a time in the background edition. Execute a correct operation
 */
export class A0222_DncOperationNotAllowedInBgEdit extends RuntimeAlarm {
  constructor() {
    super({
      number: "0222",
      message: "DNC OP. NOT ALLOWED IN BG-EDIT",
      description: `Input and output are executed at a time in the background edition. Execute a correct operation`
    });
  }
}

/**
 * ZERO RETURN NOT FINISHED
 *
 * Reference position return has not been performed before the automatic operation starts. Perform reference position return only when the parameter ZRNx (No. 1005#0) is set to 0
 */
export class A0224_ZeroReturnNotFinished extends RuntimeAlarm {
  constructor() {
    super({
      number: "0224",
      message: "ZERO RETURN NOT FINISHED",
      description: `Reference position return has not been performed before the automatic operation starts. Perform reference position return only when the parameter ZRNx (No. 1005#0) is set to 0`
    });
  }
}

/**
 * ILLEGAL FORMAT IN G10 L52
 *
 * Errors occurred in the specified format at the programmable-parameter input
 */
export class A0231_IllegalFormatInG10L52 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0231",
      message: "ILLEGAL FORMAT IN G10 L52",
      description: `Errors occurred in the specified format at the programmable-parameter input`
    });
  }
}

/**
 * TOO MANY HELICAL AXIS COMMAND
 *
 * Three or more axes were specified as helical axes in the helical interpolation mode. Five or more axes were specified as helical axes in the helical interpolation B mode
 */
export class A0232_TooManyHelicalAxisCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0232",
      message: "TOO MANY HELICAL AXIS COMMAND",
      description: `Three or more axes were specified as helical axes in the helical interpolation mode. Five or more axes were specified as helical axes in the helical interpolation B mode`
    });
  }
}

/**
 * DEVICE BUSY
 *
 * When an attempt was made to use a unit such as that connected via the RS-232-C interface, other users were using it
 */
export class A0233_DeviceBusy extends RuntimeAlarm {
  constructor() {
    super({
      number: "0233",
      message: "DEVICE BUSY",
      description: `When an attempt was made to use a unit such as that connected via the RS-232-C interface, other users were using it`
    });
  }
}

/**
 * BP/S ALARM
 *
 * While punching was being performed with the function for controlling external I/O units ,background editing was performed
 */
export class A0239_BpSAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "0239",
      message: "BP/S ALARM",
      description: `While punching was being performed with the function for controlling external I/O units ,background editing was performed`
    });
  }
}

/**
 * BP/S ALARM
 *
 * Background editing was performed during MDI operation
 */
export class A0240_BpSAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "0240",
      message: "BP/S ALARM",
      description: `Background editing was performed during MDI operation`
    });
  }
}

/**
 * ILLEGAL FORMAT IN G02.2/G03.2
 *
 * The end point of an involute curve on the currently selected plane, or the center coordinate instruction I, J or K of the corresponding basic circle, or basic circle radius R was not specified
 */
export class A0241_IllegalFormatInG02_2G03_2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0241",
      message: "ILLEGAL FORMAT IN G02.2/G03.2",
      description: `The end point of an involute curve on the currently selected plane, or the center coordinate instruction I, J or K of the corresponding basic circle, or basic circle radius R was not specified`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G02.2/G03.2
 *
 * An illegal value was specified in the involute curve. The coordinate instruction I, J or K of the basic circle on the currently selected plane or the basic circle radius R is “0”, or the start and end points are not inside the basic circle
 */
export class A0242_IllegalCommandInG02_2G03_2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0242",
      message: "ILLEGAL COMMAND IN G02.2/G03.2",
      description: `An illegal value was specified in the involute curve. The coordinate instruction I, J or K of the basic circle on the currently selected plane or the basic circle radius R is “0”, or the start and end points are not inside the basic circle`
    });
  }
}

/**
 * OVER TOLERANCE OF END POINT
 *
 * The end point is not positioned on the involute curve that passes through the start point, and this error exceeds the permissible error limit (parameter No. 2510)
 */
export class A0243_OverToleranceOfEndPoint extends RuntimeAlarm {
  constructor() {
    super({
      number: "0243",
      message: "OVER TOLERANCE OF END POINT",
      description: `The end point is not positioned on the involute curve that passes through the start point, and this error exceeds the permissible error limit (parameter No. 2510)`
    });
  }
}

/**
 * P/S ALARM
 *
 * In torque control, the total permissible move value specified as a parameter is exceeded
 */
export class A0244_PSAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "0244",
      message: "P/S ALARM",
      description: `In torque control, the total permissible move value specified as a parameter is exceeded`
    });
  }
}

/**
 * T-CODE NOT ALLOWED IN THIS BLOCK
 *
 * One of the G codes, G50, G10, and G04, which cannot be specified in the same block as a T code, was specified with a T code
 */
export class A0245_TCodeNotAllowedInThisBlock extends RuntimeAlarm {
  constructor() {
    super({
      number: "0245",
      message: "T-CODE NOT ALLOWED IN THIS BLOCK",
      description: `One of the G codes, G50, G10, and G04, which cannot be specified in the same block as a T code, was specified with a T code`
    });
  }
}

/**
 * THE MISTAKE IS FOUND IN THE OUTPUT CODE OF DATA
 *
 * When an encrypted program is output, EIA is set for the output code. Specify ISO
 */
export class A0247_TheMistakeIsFoundInTheOutputCodeOfData extends RuntimeAlarm {
  constructor() {
    super({
      number: "0247",
      message: "THE MISTAKE IS FOUND IN THE OUTPUT CODE OF DATA",
      description: `When an encrypted program is output, EIA is set for the output code. Specify ISO`
    });
  }
}

/**
 * TOOL CHANGE ILLEGAL Z AXIS COMMAND
 *
 * A Z-axis move command was performed in the same block for M06 command
 */
export class A0250_ToolChangeIllegalZAxisCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0250",
      message: "TOOL CHANGE ILLEGAL Z AXIS COMMAND",
      description: `A Z-axis move command was performed in the same block for M06 command`
    });
  }
}

/**
 * TOOL CHANGE ILLEGAL T COMMAND
 *
 * An unusable T code was specified in M06Txx
 */
export class A0251_ToolChangeIllegalTCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0251",
      message: "TOOL CHANGE ILLEGAL T COMMAND",
      description: `An unusable T code was specified in M06Txx`
    });
  }
}

/**
 * G05 CAN NOT BE COMMANDED
 *
 * A binary operation was specified during advanced preview control mode
 */
export class A0253_G05CanNotBeCommanded extends RuntimeAlarm {
  constructor() {
    super({
      number: "0253",
      message: "G05 CAN NOT BE COMMANDED",
      description: `A binary operation was specified during advanced preview control mode`
    });
  }
}

/**
 * ILLEGAL COMMAND IN SCALING
 *
 * An illegal G code was specified during scaling. Modify the program. For the T system, one of the following functions is specified during scaling, this alarm is generated. (Specify G codes for systems B and C in that order.)
 */
export class A0300_IllegalCommandInScaling extends RuntimeAlarm {
  constructor() {
    super({
      number: "0300",
      message: "ILLEGAL COMMAND IN SCALING",
      description: `An illegal G code was specified during scaling. Modify the program. For the T system, one of the following functions is specified during scaling, this alarm is generated. (Specify G codes for systems B and C in that order.)`
    });
  }
}

/**
 * RESETTING OF REFERENCE RETURN IS INHIBITED
 *
 * Although parameter No. 1012#0 (IDGx) was set to 1 to inhibit the reference position from being set again for a return to the reference position without a dog, an attempt was made to perform a manual return to the reference position
 */
export class A0301_ResettingOfReferenceReturnIsInhibited extends RuntimeAlarm {
  constructor() {
    super({
      number: "0301",
      message: "RESETTING OF REFERENCE RETURN IS INHIBITED",
      description: `Although parameter No. 1012#0 (IDGx) was set to 1 to inhibit the reference position from being set again for a return to the reference position without a dog, an attempt was made to perform a manual return to the reference position`
    });
  }
}

/**
 * SETTING THE REFERENCE POSITION WITHOUT DOG IS NOT PERFORMED
 *
 * The reference position could not be set for a return to the reference position without a dog. Possible causes are: of a manual return to the reference position
 */
export class A0302_SettingTheReferencePositionWithoutDogIsNotPerformed extends RuntimeAlarm {
  constructor() {
    super({
      number: "0302",
      message: "SETTING THE REFERENCE POSITION WITHOUT DOG IS NOT PERFORMED",
      description: `The reference position could not be set for a return to the reference position without a dog. Possible causes are: of a manual return to the reference position`
    });
  }
}

/**
 * REFERENCE POSITION RETURN IS NOT PERFORMED
 *
 * When the setting of a reference position at any position was possible in Cs contour control (parameter CRF (No. 3700#0) = 1), a G00 command was issued for the Cs contour axis without a return to the reference position after the serial spindle was switched to Cs contour control mode. Perform a reference position return with a G28 command before issuing a G00 command
 */
export class A0303_ReferencePositionReturnIsNotPerformed extends RuntimeAlarm {
  constructor() {
    super({
      number: "0303",
      message: "REFERENCE POSITION RETURN IS NOT PERFORMED",
      description: `When the setting of a reference position at any position was possible in Cs contour control (parameter CRF (No. 3700#0) = 1), a G00 command was issued for the Cs contour axis without a return to the reference position after the serial spindle was switched to Cs contour control mode. Perform a reference position return with a G28 command before issuing a G00 command`
    });
  }
}

/**
 * G28 IS COMMANDED WITHOUT ZERO RETURN
 *
 * Although a reference position was not set, an automatic return to the reference position (G28) was commanded
 */
export class A0304_G28IsCommandedWithoutZeroReturn extends RuntimeAlarm {
  constructor() {
    super({
      number: "0304",
      message: "G28 IS COMMANDED WITHOUT ZERO RETURN",
      description: `Although a reference position was not set, an automatic return to the reference position (G28) was commanded`
    });
  }
}

/**
 * INTERMEDIATE POSITION IS NOT ASSIGNED
 *
 * Although a G28 (automatic return to the reference position), G30 (return to the second, third, or fourth reference position), or G30/1 (return to the floating reference position) command was not issued after power-up, G29 (return from the reference position) was commanded
 */
export class A0305_IntermediatePositionIsNotAssigned extends RuntimeAlarm {
  constructor() {
    super({
      number: "0305",
      message: "INTERMEDIATE POSITION IS NOT ASSIGNED",
      description: `Although a G28 (automatic return to the reference position), G30 (return to the second, third, or fourth reference position), or G30/1 (return to the floating reference position) command was not issued after power-up, G29 (return from the reference position) was commanded`
    });
  }
}

/**
 * MISMATCH AXIS WITH CNR/CHF
 *
 * The correspondence between the moving axis and the I, J, or K command is incorrect in a block in which chamfering is specified
 */
export class A0306_MismatchAxisWithCnrChf extends RuntimeAlarm {
  constructor() {
    super({
      number: "0306",
      message: "MISMATCH AXIS WITH CNR/CHF",
      description: `The correspondence between the moving axis and the I, J, or K command is incorrect in a block in which chamfering is specified`
    });
  }
}

/**
 * CAN NOT START REFERENCE RETURN WITH MECHANICAL STOPPER SETTING
 *
 * An attempt was made to set a butt-type reference position for an axis for which to use the function to set a reference position without a dog
 */
export class A0307_CanNotStartReferenceReturnWithMechanicalStopperSetting extends RuntimeAlarm {
  constructor() {
    super({
      number: "0307",
      message: "CAN NOT START REFERENCE RETURN WITH MECHANICAL STOPPER SETTING",
      description: `An attempt was made to set a butt-type reference position for an axis for which to use the function to set a reference position without a dog`
    });
  }
}

/**
 * G72.1 NESTING ERROR
 *
 * G72.1 was specified again during G72.1 rotation copying
 */
export class A0308_G72_1NestingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0308",
      message: "G72.1 NESTING ERROR",
      description: `G72.1 was specified again during G72.1 rotation copying`
    });
  }
}

/**
 * G72.2 NESTING ERROR
 *
 * G72.2 was specified again during G72.2 parallel copying
 */
export class A0309_G72_2NestingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0309",
      message: "G72.2 NESTING ERROR",
      description: `G72.2 was specified again during G72.2 parallel copying`
    });
  }
}

/**
 * FILE NOT FOUND
 *
 * The specified file could not be found during a subprogram or macro call
 */
export class A0310_FileNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "0310",
      message: "FILE NOT FOUND",
      description: `The specified file could not be found during a subprogram or macro call`
    });
  }
}

/**
 * CALLED BY FILE NAME FORMAT ERROR
 *
 * An invalid format was specified to call a subprogram or macro using a file name
 */
export class A0311_CalledByFileNameFormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0311",
      message: "CALLED BY FILE NAME FORMAT ERROR",
      description: `An invalid format was specified to call a subprogram or macro using a file name`
    });
  }
}

/**
 * ILLEGAL COMMAND IN DIRECT DRAWING DIMENSIONS PROGRAMMING
 *
 * Direct input of drawing dimensions was commanded in an invalid format. An attempt was made to specify an invalid G code during direct input of drawing dimensions. Two or more blocks not to be moved exist in consecutive commands that specify direct input of drawing dimensions. Although non-use of commas (,) (parameter No. 3405#4 = 1) was specified for direct input of drawing dimensions, a comma was specified
 */
export class A0312_IllegalCommandInDirectDrawingDimensionsProgramming extends RuntimeAlarm {
  constructor() {
    super({
      number: "0312",
      message: "ILLEGAL COMMAND IN DIRECT DRAWING DIMENSIONS PROGRAMMING",
      description: `Direct input of drawing dimensions was commanded in an invalid format. An attempt was made to specify an invalid G code during direct input of drawing dimensions. Two or more blocks not to be moved exist in consecutive commands that specify direct input of drawing dimensions. Although non-use of commas (,) (parameter No. 3405#4 = 1) was specified for direct input of drawing dimensions, a comma was specified`
    });
  }
}

/**
 * ILLEGAL LEAD COMMAND
 *
 * The variable-lead threading increment specified in address K exceeds the specified maximum value in variable-lead threading. Or, a negative lead value was specified
 */
export class A0313_IllegalLeadCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0313",
      message: "ILLEGAL LEAD COMMAND",
      description: `The variable-lead threading increment specified in address K exceeds the specified maximum value in variable-lead threading. Or, a negative lead value was specified`
    });
  }
}

/**
 * ILLEGAL SETTING OF POLYGONAL AXIS
 *
 * An axis was specified invalidly in polygon turning. For polygon turning: A tool rotation axis is not specified. (Parameter No. 7610) For polygon turning between spindles: Valid spindles are not specified. (Parameter Nos. 7640 to 7643)
 */
export class A0314_IllegalSettingOfPolygonalAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "0314",
      message: "ILLEGAL SETTING OF POLYGONAL AXIS",
      description: `An axis was specified invalidly in polygon turning. For polygon turning: A tool rotation axis is not specified. (Parameter No. 7610) For polygon turning between spindles: Valid spindles are not specified. (Parameter Nos. 7640 to 7643)`
    });
  }
}

/**
 * ILLEGAL NOSE ANGLE COMMAND IS IN THE THREAD CUTTING CYCLE
 *
 * An invalid tool tip angle is specified in a multiple repetitive canned threading cycle (G76)
 */
export class A0315_IllegalNoseAngleCommandIsInTheThreadCuttingCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0315",
      message: "ILLEGAL NOSE ANGLE COMMAND IS IN THE THREAD CUTTING CYCLE",
      description: `An invalid tool tip angle is specified in a multiple repetitive canned threading cycle (G76)`
    });
  }
}

/**
 * ILLEGAL CUTTING AMOUNT IS IN THE THREAD CUTTING CYCLE
 *
 * An minimum depth of cut higher than the thread height is specified in a multiple repetitive canned threading cycle (G76)
 */
export class A0316_IllegalCuttingAmountIsInTheThreadCuttingCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0316",
      message: "ILLEGAL CUTTING AMOUNT IS IN THE THREAD CUTTING CYCLE",
      description: `An minimum depth of cut higher than the thread height is specified in a multiple repetitive canned threading cycle (G76)`
    });
  }
}

/**
 * ILLEGAL THREAD COMMAND IS IN THE THREAD CUTTING CYCLE
 *
 * A zero or a negative value is specified in a multiple repetitive canned threading cycle (G76) as the thread height or the depth of cut
 */
export class A0317_IllegalThreadCommandIsInTheThreadCuttingCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0317",
      message: "ILLEGAL THREAD COMMAND IS IN THE THREAD CUTTING CYCLE",
      description: `A zero or a negative value is specified in a multiple repetitive canned threading cycle (G76) as the thread height or the depth of cut`
    });
  }
}

/**
 * ILLEGAL RELIEF AMOUNT IS IN THE DRILLING CYCLE
 *
 * Although an escape directions is set in a multiple repetitive canned cutting-off cycle (G74 or G75), a negative value is specified for ∆d
 */
export class A0318_IllegalReliefAmountIsInTheDrillingCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0318",
      message: "ILLEGAL RELIEF AMOUNT IS IN THE DRILLING CYCLE",
      description: `Although an escape directions is set in a multiple repetitive canned cutting-off cycle (G74 or G75), a negative value is specified for ∆d`
    });
  }
}

/**
 * THE END POINT COMMAND IS ILLEGAL IN THE DRILLING CYCLE
 *
 * Although the ∆i or ∆k travel distance is set to 0 in a multiple repetitive canned cutting-off cycle (G74 or G75), a value other than 0 us specified for a U or W
 */
export class A0319_TheEndPointCommandIsIllegalInTheDrillingCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0319",
      message: "THE END POINT COMMAND IS ILLEGAL IN THE DRILLING CYCLE",
      description: `Although the ∆i or ∆k travel distance is set to 0 in a multiple repetitive canned cutting-off cycle (G74 or G75), a value other than 0 us specified for a U or W`
    });
  }
}

/**
 * ILLEGAL MOVEMENT AMOUNT/CUTTING AMOUNT IS IN THE DRILLING CYCLE
 *
 * A negative value is specified in a multiple repetitive canned cutting-off cycle (G74 or G75) as ∆i or ∆k (travel distance/the depth of cut)
 */
export class A0320_IllegalMovementAmountCuttingAmountIsInTheDrillingCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0320",
      message: "ILLEGAL MOVEMENT AMOUNT/CUTTING AMOUNT IS IN THE DRILLING CYCLE",
      description: `A negative value is specified in a multiple repetitive canned cutting-off cycle (G74 or G75) as ∆i or ∆k (travel distance/the depth of cut)`
    });
  }
}

/**
 * ILLEGAL REPEATED TIME IS IN THE PATTERN REPEATING CYCLE
 *
 * A zero or a negative value is specified in a multiple repetitive canned closed loop cycle (G73) as a repeated time
 */
export class A0321_IllegalRepeatedTimeIsInThePatternRepeatingCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0321",
      message: "ILLEGAL REPEATED TIME IS IN THE PATTERN REPEATING CYCLE",
      description: `A zero or a negative value is specified in a multiple repetitive canned closed loop cycle (G73) as a repeated time`
    });
  }
}

/**
 * FINISHING SHAPE WHICH OVER OF STARTING POINT
 *
 * An invalid shape which is over the cycle starting point is specified in a shape program for a multiple repetitive canned rough-cutting cycle (G71 or G72)
 */
export class A0322_FinishingShapeWhichOverOfStartingPoint extends RuntimeAlarm {
  constructor() {
    super({
      number: "0322",
      message: "FINISHING SHAPE WHICH OVER OF STARTING POINT",
      description: `An invalid shape which is over the cycle starting point is specified in a shape program for a multiple repetitive canned rough-cutting cycle (G71 or G72)`
    });
  }
}

/**
 * THE FIRST BLOCK OF SHAPE PROGRAM IS A COMMAND OF TYPE II
 *
 * Type II is specified in the first block of the shape program specified by P in a multiple repetitive canned rough-cutting cycle (G71 or G72). Z (W) command is for G71. X (U) command is for G72
 */
export class A0323_TheFirstBlockOfShapeProgramIsACommandOfTypeIi extends RuntimeAlarm {
  constructor() {
    super({
      number: "0323",
      message: "THE FIRST BLOCK OF SHAPE PROGRAM IS A COMMAND OF TYPE II",
      description: `Type II is specified in the first block of the shape program specified by P in a multiple repetitive canned rough-cutting cycle (G71 or G72). Z (W) command is for G71. X (U) command is for G72`
    });
  }
}

/**
 * THE INTERRUPTION TYPE MACRO WAS DONE IN THE MULTIPLE REPETIVE CYCLES
 *
 * An interruption type macro was issued during the multiple repetitive canned cycle (G70, G71, G72, or G73)
 */
export class A0324_TheInterruptionTypeMacroWasDoneInTheMultipleRepetiveCycles extends RuntimeAlarm {
  constructor() {
    super({
      number: "0324",
      message: "THE INTERRUPTION TYPE MACRO WAS DONE IN THE MULTIPLE REPETIVE CYCLES",
      description: `An interruption type macro was issued during the multiple repetitive canned cycle (G70, G71, G72, or G73)`
    });
  }
}

/**
 * UNAVAILABLE COMMAND IS IN SHAPE PROGRAM
 *
 * An usable command was issued in a shape program for a multiple repetitive canned cycle (G70, G71, G72, or G73)
 */
export class A0325_UnavailableCommandIsInShapeProgram extends RuntimeAlarm {
  constructor() {
    super({
      number: "0325",
      message: "UNAVAILABLE COMMAND IS IN SHAPE PROGRAM",
      description: `An usable command was issued in a shape program for a multiple repetitive canned cycle (G70, G71, G72, or G73)`
    });
  }
}

/**
 * LAST BLOCK OF SHAPE PROGRAM IS A DIRECT DRAWING DIMENSIONS
 *
 * In a shape program in the multiple repetitive canned cycle (G70, G71, G72, or G73), a command for direct input of drawing dimensions in the last block is terminated in the middle
 */
export class A0326_LastBlockOfShapeProgramIsADirectDrawingDimensions extends RuntimeAlarm {
  constructor() {
    super({
      number: "0326",
      message: "LAST BLOCK OF SHAPE PROGRAM IS A DIRECT DRAWING DIMENSIONS",
      description: `In a shape program in the multiple repetitive canned cycle (G70, G71, G72, or G73), a command for direct input of drawing dimensions in the last block is terminated in the middle`
    });
  }
}

/**
 * MODAL THAT MULTIPLE REPETIVE CYCLES CANNOT BE DONE
 *
 * A multiple repetitive canned cycle (G70, G71, G72, or G73) was commanded in a modal state in which a multiple repetitive canned cycle could not be commanded
 */
export class A0327_ModalThatMultipleRepetiveCyclesCannotBeDone extends RuntimeAlarm {
  constructor() {
    super({
      number: "0327",
      message: "MODAL THAT MULTIPLE REPETIVE CYCLES CANNOT BE DONE",
      description: `A multiple repetitive canned cycle (G70, G71, G72, or G73) was commanded in a modal state in which a multiple repetitive canned cycle could not be commanded`
    });
  }
}

/**
 * ILLEGAL WORK POSITION IS IN THE TOOL NOSE RADIUS COMPENSATION
 *
 * The specification for the blank side for a tool-nose radius compensation (G41 or G42) is incorrect in a multiple repetitive canned cycle (G71 or G72)
 */
export class A0328_IllegalWorkPositionIsInTheToolNoseRadiusCompensation extends RuntimeAlarm {
  constructor() {
    super({
      number: "0328",
      message: "ILLEGAL WORK POSITION IS IN THE TOOL NOSE RADIUS COMPENSATION",
      description: `The specification for the blank side for a tool-nose radius compensation (G41 or G42) is incorrect in a multiple repetitive canned cycle (G71 or G72)`
    });
  }
}

/**
 * THE FINISHING SHAPE IS NOT A MONOTONOUS CHANGE(SECOND AXES)
 *
 * In a shape program for the multiple repetitive canned rough-cutting cycle (G71 or G72), the command of the second plane axis was not a monotonous increase or decrease
 */
export class A0329_TheFinishingShapeIsNotAMonotonousChangeSecondAxes extends RuntimeAlarm {
  constructor() {
    super({
      number: "0329",
      message: "THE FINISHING SHAPE IS NOT A MONOTONOUS CHANGE(SECOND AXES)",
      description: `In a shape program for the multiple repetitive canned rough-cutting cycle (G71 or G72), the command of the second plane axis was not a monotonous increase or decrease`
    });
  }
}

/**
 * ILLEGAL AXIS COMMAND IS IN THE TURNING CANNED CYCLE
 *
 * An axis other than the plane is specified n a canned cycle(G90, G92, or G94)
 */
export class A0330_IllegalAxisCommandIsInTheTurningCannedCycle extends RuntimeAlarm {
  constructor() {
    super({
      number: "0330",
      message: "ILLEGAL AXIS COMMAND IS IN THE TURNING CANNED CYCLE",
      description: `An axis other than the plane is specified n a canned cycle(G90, G92, or G94)`
    });
  }
}

/**
 * ILLEGAL AXIS NUMBER IN AX[]
 *
 * An illegal value is specified for an AX[] axis number
 */
export class A0331_IllegalAxisNumberInAxArray extends RuntimeAlarm {
  constructor() {
    super({
      number: "0331",
      message: "ILLEGAL AXIS NUMBER IN AX[]",
      description: `An illegal value is specified for an AX[] axis number`
    });
  }
}

/**
 * ILLEGAL AXIS ADDRESS IN AXNUM[]
 *
 * An illegal value is specified for an AXNUM[] axis address
 */
export class A0332_IllegalAxisAddressInAxNumArray extends RuntimeAlarm {
  constructor() {
    super({
      number: "0332",
      message: "ILLEGAL AXIS ADDRESS IN AXNUM[]",
      description: `An illegal value is specified for an AXNUM[] axis address`
    });
  }
}

/**
 * TOO MANY SPINDLE COMMANDS
 *
 * Multiple spindle commands could be found in the same block in using an expansion spindle name. Only one spindle could be commanded in the same block
 */
export class A0333_TooManySpindleCommands extends RuntimeAlarm {
  constructor() {
    super({
      number: "0333",
      message: "TOO MANY SPINDLE COMMANDS",
      description: `Multiple spindle commands could be found in the same block in using an expansion spindle name. Only one spindle could be commanded in the same block`
    });
  }
}

/**
 * OFFSET IS OUT OF EFFECTIVE RANGE
 *
 * An offset data which was out of the effective range was specified. (malfunction prevention function)
 */
export class A0334_OffsetIsOutOfEffectiveRange extends RuntimeAlarm {
  constructor() {
    super({
      number: "0334",
      message: "OFFSET IS OUT OF EFFECTIVE RANGE",
      description: `An offset data which was out of the effective range was specified. (malfunction prevention function)`
    });
  }
}

/**
 * PLURAL M CODE
 *
 * Multiple M codes are commanded simultaneously in a block for a wait function with peripheral devices by an M code
 */
export class A0335_PluralMCode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0335",
      message: "PLURAL M CODE",
      description: `Multiple M codes are commanded simultaneously in a block for a wait function with peripheral devices by an M code`
    });
  }
}

/**
 * TOOL COMPENSATION COMMANDED MORE TWO AXES
 *
 * For a tool length compensation C, an attempt was made to command the offset to other axes without canceling the offset. Or, for a tool length compensation C, multiple axes are specified in G43 or G44 block
 */
export class A0336_ToolCompensationCommandedMoreTwoAxes extends RuntimeAlarm {
  constructor() {
    super({
      number: "0336",
      message: "TOOL COMPENSATION COMMANDED MORE TWO AXES",
      description: `For a tool length compensation C, an attempt was made to command the offset to other axes without canceling the offset. Or, for a tool length compensation C, multiple axes are specified in G43 or G44 block`
    });
  }
}

/**
 * EXCESS MAXIMUM INCREMENTAL VALUE
 *
 * The command value exceeded the maximum amount of incremental. (malfunction prevention function)
 */
export class A0337_ExcessMaximumIncrementalValue extends RuntimeAlarm {
  constructor() {
    super({
      number: "0337",
      message: "EXCESS MAXIMUM INCREMENTAL VALUE",
      description: `The command value exceeded the maximum amount of incremental. (malfunction prevention function)`
    });
  }
}

/**
 * CHECK SUM ERROR
 *
 * An incorrect value was detected in a check sum. (malfunction prevention function)
 */
export class A0338_CheckSumError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0338",
      message: "CHECK SUM ERROR",
      description: `An incorrect value was detected in a check sum. (malfunction prevention function)`
    });
  }
}

/**
 * ILLEGAL RESTART (NANO SMOOTHING)
 *
 * With manual absolute turned on, an attempt was made to restart the operation in nano smoothing mode after performing the manual interaction
 */
export class A0340_IllegalRestartNanoSmoothing extends RuntimeAlarm {
  constructor() {
    super({
      number: "0340",
      message: "ILLEGAL RESTART (NANO SMOOTHING)",
      description: `With manual absolute turned on, an attempt was made to restart the operation in nano smoothing mode after performing the manual interaction`
    });
  }
}

/**
 * TOO MANY COMMAND BLOCK (NANO SMOOTHING)
 *
 * There are more blocks than can be commanded consecutively in nano smoothing mode
 */
export class A0341_TooManyCommandBlockNanoSmoothing extends RuntimeAlarm {
  constructor() {
    super({
      number: "0341",
      message: "TOO MANY COMMAND BLOCK (NANO SMOOTHING)",
      description: `There are more blocks than can be commanded consecutively in nano smoothing mode`
    });
  }
}

/**
 * CUSTOM MACRO INTERRUPT ENABLE IN NANO SMOOTHING
 *
 * A custom macro interrupt was enabled in nano smoothing mode. Or, nano smoothing mode was commanded with a custom macro interrupt enabled
 */
export class A0342_CustomMacroInterruptEnableInNanoSmoothing extends RuntimeAlarm {
  constructor() {
    super({
      number: "0342",
      message: "CUSTOM MACRO INTERRUPT ENABLE IN NANO SMOOTHING",
      description: `A custom macro interrupt was enabled in nano smoothing mode. Or, nano smoothing mode was commanded with a custom macro interrupt enabled`
    });
  }
}

/**
 * ILLEGAL COMMAND IN NANO SMOOTHING
 *
 * G43, G44, or G49 was commanded during a nano smoothing
 */
export class A0343_IllegalCommandInNanoSmoothing extends RuntimeAlarm {
  constructor() {
    super({
      number: "0343",
      message: "ILLEGAL COMMAND IN NANO SMOOTHING",
      description: `G43, G44, or G49 was commanded during a nano smoothing`
    });
  }
}

/**
 * CANNOT CONTINUE NANO SMOOTHING
 *
 * An illegal command or operation by which a nano smoothing could not be continued was performed
 */
export class A0344_CannotContinueNanoSmoothing extends RuntimeAlarm {
  constructor() {
    super({
      number: "0344",
      message: "CANNOT CONTINUE NANO SMOOTHING",
      description: `An illegal command or operation by which a nano smoothing could not be continued was performed`
    });
  }
}

/**
 * TOOL CHANGE ILLEGAL Z AXIS POS
 *
 * A tool change position on the Z-axis is incorrect
 */
export class A0345_ToolChangeIllegalZAxisPos extends RuntimeAlarm {
  constructor() {
    super({
      number: "0345",
      message: "TOOL CHANGE ILLEGAL Z AXIS POS",
      description: `A tool change position on the Z-axis is incorrect`
    });
  }
}

/**
 * TOOL CHANGE ILLEGAL TOOL NUM
 *
 * A tool change position is not set
 */
export class A0346_ToolChangeIllegalToolNum extends RuntimeAlarm {
  constructor() {
    super({
      number: "0346",
      message: "TOOL CHANGE ILLEGAL TOOL NUM",
      description: `A tool change position is not set`
    });
  }
}

/**
 * TOOL CHANGE ILLEGAL COMMAND IN SAME BLK
 *
 * Tool changing is commanded twice or more in the same block
 */
export class A0347_ToolChangeIllegalCommandInSameBlk extends RuntimeAlarm {
  constructor() {
    super({
      number: "0347",
      message: "TOOL CHANGE ILLEGAL COMMAND IN SAME BLK",
      description: `Tool changing is commanded twice or more in the same block`
    });
  }
}

/**
 * TOOL CHANGE Z AXIS POS NOT ESTABLISHED
 *
 * A tool change spindle on the Z-axis is not set
 */
export class A0348_ToolChangeZAxisPosNotEstablished extends RuntimeAlarm {
  constructor() {
    super({
      number: "0348",
      message: "TOOL CHANGE Z AXIS POS NOT ESTABLISHED",
      description: `A tool change spindle on the Z-axis is not set`
    });
  }
}

/**
 * TOOL CHANGE SPINDLE NOT STOP
 *
 * A tool change spindle stop is not stopped
 */
export class A0349_ToolChangeSpindleNotStop extends RuntimeAlarm {
  constructor() {
    super({
      number: "0349",
      message: "TOOL CHANGE SPINDLE NOT STOP",
      description: `A tool change spindle stop is not stopped`
    });
  }
}

/**
 * PARAMETER OF THE INDEX OF THE SYNCHRONOUS CONTROL AXIS SET ERROR
 *
 * An illegal synchronization control axis number (parameter No. 8180) is set
 */
export class A0350_ParameterOfTheIndexOfTheSynchronousControlAxisSetError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0350",
      message: "PARAMETER OF THE INDEX OF THE SYNCHRONOUS CONTROL AXIS SET ERROR",
      description: `An illegal synchronization control axis number (parameter No. 8180) is set`
    });
  }
}

/**
 * BECAUSE THE AXIS IS MOVING, THE SYNC CONTROL IS CAN'T BE USED
 *
 * While the axis being subject to synchronization control was moving, an attempt was made to start or cancel the synchronization control by a synchronization control axis selection signal
 */
export class A0351_BecauseTheAxisIsMovingcommaTheSyncControlIsCannotBeUsed extends RuntimeAlarm {
  constructor() {
    super({
      number: "0351",
      message: "BECAUSE THE AXIS IS MOVING, THE SYNC CONTROL IS CAN'T BE USED",
      description: `While the axis being subject to synchronization control was moving, an attempt was made to start or cancel the synchronization control by a synchronization control axis selection signal`
    });
  }
}

/**
 * SYNCHRONOUS CONTROL AXIS COMPOSITION ERROR
 *
 * This error occurred when: great-grandchild for a parent-child-grandchild relation
 */
export class A0352_SynchronousControlAxisCompositionError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0352",
      message: "SYNCHRONOUS CONTROL AXIS COMPOSITION ERROR",
      description: `This error occurred when: great-grandchild for a parent-child-grandchild relation`
    });
  }
}

/**
 * THE INSTRUCTION WAS DONE FOR THE AXIS WHICH WAS NOT ABLE TO MOVE
 *
 * This error occurred when: parameter No. 8162#7MUMx is set to 1
 */
export class A0353_TheInstructionWasDoneForTheAxisWhichWasNotAbleToMove extends RuntimeAlarm {
  constructor() {
    super({
      number: "0353",
      message: "THE INSTRUCTION WAS DONE FOR THE AXIS WHICH WAS NOT ABLE TO MOVE",
      description: `This error occurred when: parameter No. 8162#7MUMx is set to 1`
    });
  }
}

/**
 * THE G28 WAS INSTRUCTED IN WITH THE REF POS NOT FIXED IN SYNC MODE
 *
 * This error occurred when G28 was specified to the master axis being parking during synchronization control, but an axis reference position is not set for the slave axis
 */
export class A0354_TheG28WasInstructedInWithTheRefPosNotFixedInSyncMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0354",
      message: "THE G28 WAS INSTRUCTED IN WITH THE REF POS NOT FIXED IN SYNC MODE",
      description: `This error occurred when G28 was specified to the master axis being parking during synchronization control, but an axis reference position is not set for the slave axis`
    });
  }
}

/**
 * PARAMETER OF THE INDEX OF THE COMPOSITE CONTROL AXIS SET ERROR
 *
 * An illegal composite control axis number (parameter No. 8183) is specified
 */
export class A0355_ParameterOfTheIndexOfTheCompositeControlAxisSetError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0355",
      message: "PARAMETER OF THE INDEX OF THE COMPOSITE CONTROL AXIS SET ERROR",
      description: `An illegal composite control axis number (parameter No. 8183) is specified`
    });
  }
}

/**
 * BECAUSE THE AXIS IS MOVING, THE COMP CONTROL IS CAN'T BE USED
 *
 * While the axis being subject to composite control was moving, an attempt was made to start or cancel the composite control by a composite control axis selection signal
 */
export class A0356_BecauseTheAxisIsMovingcommaTheCompControlIsCannotBeUsed extends RuntimeAlarm {
  constructor() {
    super({
      number: "0356",
      message: "BECAUSE THE AXIS IS MOVING, THE COMP CONTROL IS CAN'T BE USED",
      description: `While the axis being subject to composite control was moving, an attempt was made to start or cancel the composite control by a composite control axis selection signal`
    });
  }
}

/**
 * COMPOSITE CONTROL AXIS COMPOSITION ERROR
 *
 * This error occurred when an attempt was made to perform composite control for the axis during a synchronization, composition, or superposition
 */
export class A0357_CompositeControlAxisCompositionError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0357",
      message: "COMPOSITE CONTROL AXIS COMPOSITION ERROR",
      description: `This error occurred when an attempt was made to perform composite control for the axis during a synchronization, composition, or superposition`
    });
  }
}

/**
 * THE G28 WAS INSTRUCTED IN WITH THE REF POS NOT FIXED IN COMP MODE
 *
 * This error occurred when G28 was specified to the composite axis during composite control, but a reference position is not set to the other part of the composition
 */
export class A0359_TheG28WasInstructedInWithTheRefPosNotFixedInCompMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0359",
      message: "THE G28 WAS INSTRUCTED IN WITH THE REF POS NOT FIXED IN COMP MODE",
      description: `This error occurred when G28 was specified to the composite axis during composite control, but a reference position is not set to the other part of the composition`
    });
  }
}

/**
 * PARAMETER OF THE INDEX OF THE SUPERPOS CONTROL AXIS SET ERROR
 *
 * An illegal superposition control axis number (parameter No. 8186) is specified
 */
export class A0360_ParameterOfTheIndexOfTheSuperposControlAxisSetError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0360",
      message: "PARAMETER OF THE INDEX OF THE SUPERPOS CONTROL AXIS SET ERROR",
      description: `An illegal superposition control axis number (parameter No. 8186) is specified`
    });
  }
}

/**
 * BECAUSE THE AXIS IS MOVING, THE SUPERPOS CONTROL IS CAN'T BE USED
 *
 * While the axis being subject to superposition control was moving, an attempt was made to start or cancel the superposition control by a superposition control axis selection signal
 */
export class A0361_BecauseTheAxisIsMovingcommaTheSuperposControlIsCannotBeUsed extends RuntimeAlarm {
  constructor() {
    super({
      number: "0361",
      message: "BECAUSE THE AXIS IS MOVING, THE SUPERPOS CONTROL IS CAN'T BE USED",
      description: `While the axis being subject to superposition control was moving, an attempt was made to start or cancel the superposition control by a superposition control axis selection signal`
    });
  }
}

/**
 * SUPERPOSITION CONTROL AXIS COMPOSITION ERROR
 *
 * This error occurred when: great-grandchild for a parent-child-grandchild relation
 */
export class A0362_SuperpositionControlAxisCompositionError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0362",
      message: "SUPERPOSITION CONTROL AXIS COMPOSITION ERROR",
      description: `This error occurred when: great-grandchild for a parent-child-grandchild relation`
    });
  }
}

/**
 * THE G28 WAS INSTRUCTED IN TO THE SUPERPOS CONTROL SLAVE AXIS
 *
 * This error occurred when G28 was specified to the superposition control slave axis during superposition control
 */
export class A0363_TheG28WasInstructedInToTheSuperposControlSlaveAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "0363",
      message: "THE G28 WAS INSTRUCTED IN TO THE SUPERPOS CONTROL SLAVE AXIS",
      description: `This error occurred when G28 was specified to the superposition control slave axis during superposition control`
    });
  }
}

/**
 * THE G53 WAS INSTRUCTED IN TO THE SUPERPOS CONTROL SLAVE AXIS
 *
 * This error occurred when G53 was specified to the slave axis being moved during superposition control
 */
export class A0364_TheG53WasInstructedInToTheSuperposControlSlaveAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "0364",
      message: "THE G53 WAS INSTRUCTED IN TO THE SUPERPOS CONTROL SLAVE AXIS",
      description: `This error occurred when G53 was specified to the slave axis being moved during superposition control`
    });
  }
}

/**
 * TOO MANY MAXIMUM SV/SP AXIS NUMBER PER PATH
 *
 * The maximum control axis number or maximum control spindle number which could be used within a path was exceeded. (For a loader path, this alarm is generated if the number of axis per path is set to 5 or greater.)
 */
export class A0365_TooManyMaximumSvSpAxisNumberPerPath extends RuntimeAlarm {
  constructor() {
    super({
      number: "0365",
      message: "TOO MANY MAXIMUM SV/SP AXIS NUMBER PER PATH",
      description: `The maximum control axis number or maximum control spindle number which could be used within a path was exceeded. (For a loader path, this alarm is generated if the number of axis per path is set to 5 or greater.)`
    });
  }
}

/**
 * IMPROPER G-CODE IN TURRET METHOD
 *
 * When the turret change tools method was selected (parameter No. 5040#3 (TCT) = 0), G43, G43.1, G43.4, G43.5, or G43.7 was commanded
 */
export class A0366_ImproperGCodeInTurretMethod extends RuntimeAlarm {
  constructor() {
    super({
      number: "0366",
      message: "IMPROPER G-CODE IN TURRET METHOD",
      description: `When the turret change tools method was selected (parameter No. 5040#3 (TCT) = 0), G43, G43.1, G43.4, G43.5, or G43.7 was commanded`
    });
  }
}

/**
 * 3-D CONV. WAS COMMANDED IN SYNC MODE AS THE PARAMETER PKUx(NO.8162#2) IS 0
 *
 * A three-dimensional coordinate conversion was commanded during synchronization control when the parameter PKUx (No.8162#2) was 0
 */
export class A0367_3DConversionWasCommandedInSyncMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0367",
      message: "3-D CONV. WAS COMMANDED IN SYNC MODE AS THE PARAMETER PKUx(NO.8162#2) IS 0",
      description: `A three-dimensional coordinate conversion was commanded during synchronization control when the parameter PKUx (No.8162#2) was 0`
    });
  }
}

/**
 * OFFSET REMAIN AT OFFSET COMMAND
 *
 * When the ATC change tools method was selected (parameter No. 5040#3 (TCT) = 1) during G43, G43.1, G43.4, or G43.5 mode, G43.7 was commanded. Or, G43, G43.1, G43.4, or G43.5 was commanded during G43.7 mode
 */
export class A0368_OffsetRemainAtOffsetCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "0368",
      message: "OFFSET REMAIN AT OFFSET COMMAND",
      description: `When the ATC change tools method was selected (parameter No. 5040#3 (TCT) = 1) during G43, G43.1, G43.4, or G43.5 mode, G43.7 was commanded. Or, G43, G43.1, G43.4, or G43.5 was commanded during G43.7 mode`
    });
  }
}

/**
 * G31 FORMAT ERROR
 *
 * instruction is out of range. The torque Q range is 1 to 99
 */
export class A0369_G31FormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0369",
      message: "G31 FORMAT ERROR",
      description: `instruction is out of range. The torque Q range is 1 to 99`
    });
  }
}

/**
 * G31P/G04Q ERROR
 *
 * The specified address P value for G31 is out of range. The address P range is 1 to 4 in a multistage skip function. The specified address Q value for G04 is out of range. The address Q range is 1 to 4 in a multistage skip function. Or, P1-4 for G31, or Q1-4 for G04 was commanded without a multistage skip function option
 */
export class A0370_G31pG04qError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0370",
      message: "G31P/G04Q ERROR",
      description: `The specified address P value for G31 is out of range. The address P range is 1 to 4 in a multistage skip function. The specified address Q value for G04 is out of range. The address Q range is 1 to 4 in a multistage skip function. Or, P1-4 for G31, or Q1-4 for G04 was commanded without a multistage skip function option`
    });
  }
}

/**
 * ILLEGAL FORMAT IN G10 OR L50
 *
 * In a command format for a programmable parameter input, an attempt was made to change the parameter for an encryption (No. 3220), key (No. 3221), or protection range (No.3222 or No.3223) as a "the encryption function for the key and program." Modify the program
 */
export class A0371_IllegalFormatInG10OrL50 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0371",
      message: "ILLEGAL FORMAT IN G10 OR L50",
      description: `In a command format for a programmable parameter input, an attempt was made to change the parameter for an encryption (No. 3220), key (No. 3221), or protection range (No.3222 or No.3223) as a "the encryption function for the key and program." Modify the program`
    });
  }
}

/**
 * REFERENCE RETURN INCOMPLETE
 *
 * An attempt was made to perform an automatic return to the reference position on the orthogonal axis before the completion of a return to the reference position on the angular axis. However, this attempt failed because a manual return to the reference position during angular axis control or an automatic return to the reference position after power-up was not commanded. First, return to the reference position on the angular axis, then return to the reference position on the orthogonal axis
 */
export class A0372_ReferenceReturnIncomplete extends RuntimeAlarm {
  constructor() {
    super({
      number: "0372",
      message: "REFERENCE RETURN INCOMPLETE",
      description: `An attempt was made to perform an automatic return to the reference position on the orthogonal axis before the completion of a return to the reference position on the angular axis. However, this attempt failed because a manual return to the reference position during angular axis control or an automatic return to the reference position after power-up was not commanded. First, return to the reference position on the angular axis, then return to the reference position on the orthogonal axis`
    });
  }
}

/**
 * ILLEGAL HIGH-SPEED SKIP SIGNAL
 *
 * In the skip commands (G31, G31P1 to G31P4) and dwell commands (G04, G04Q1 to G04Q4), the same high-speed signal is selected in different paths
 */
export class A0373_IllegalHighSpeedSkipSignal extends RuntimeAlarm {
  constructor() {
    super({
      number: "0373",
      message: "ILLEGAL HIGH-SPEED SKIP SIGNAL",
      description: `In the skip commands (G31, G31P1 to G31P4) and dwell commands (G04, G04Q1 to G04Q4), the same high-speed signal is selected in different paths`
    });
  }
}

/**
 * ILLEGAL REGISTRATION OF TOOL MANAGER(G10)
 *
 * G10L75 or G10L76 data was registered during the following data registration: Command G10L75 or G10L76 again after the above operation is completed
 */
export class A0374_IllegalRegistrationOfToolManagerG10 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0374",
      message: "ILLEGAL REGISTRATION OF TOOL MANAGER(G10)",
      description: `G10L75 or G10L76 data was registered during the following data registration: Command G10L75 or G10L76 again after the above operation is completed`
    });
  }
}

/**
 * CAN NOT ANGULAR CONTROL(SYNC:MIX:OVL)
 *
 * Angular axis control is disabled for this axis configuration. superposition control mode1)
 */
export class A0375_CanNotAngularControlSyncMixOvl extends RuntimeAlarm {
  constructor() {
    super({
      number: "0375",
      message: "CAN NOT ANGULAR CONTROL(SYNC:MIX:OVL)",
      description: `Angular axis control is disabled for this axis configuration. superposition control mode1)`
    });
  }
}

/**
 * SERIAL DCL: ILLEGAL PARAMETER
 *
 * (Parameter No.1815#5 is set to “1”. )
 */
export class A0376_SerialDclIllegalParameter extends RuntimeAlarm {
  constructor() {
    super({
      number: "0376",
      message: "SERIAL DCL: ILLEGAL PARAMETER",
      description: `(Parameter No.1815#5 is set to “1”. )`
    });
  }
}

/**
 * ILLEGAL RTM DI/DO VAR
 *
 * There is no DI/DO variable that has a specified signal address (alphabet, number)
 */
export class A0387_IllegalRtmDiDoVar extends RuntimeAlarm {
  constructor() {
    super({
      number: "0387",
      message: "ILLEGAL RTM DI/DO VAR",
      description: `There is no DI/DO variable that has a specified signal address (alphabet, number)`
    });
  }
}

/**
 * ILLEGAL RTM SIGNAL BIT
 *
 * Bits other than bits 0 to 7 cannot be specified with a DI/DO signal
 */
export class A0389_IllegalRtmSignalBit extends RuntimeAlarm {
  constructor() {
    super({
      number: "0389",
      message: "ILLEGAL RTM SIGNAL BIT",
      description: `Bits other than bits 0 to 7 cannot be specified with a DI/DO signal`
    });
  }
}

/**
 * RTM BRANCH OVER
 *
 * The number of branches supported with real time custom macros was exceeded
 */
export class A0391_RtmBranchOver extends RuntimeAlarm {
  constructor() {
    super({
      number: "0391",
      message: "RTM BRANCH OVER",
      description: `The number of branches supported with real time custom macros was exceeded`
    });
  }
}

/**
 * TOO MANY SENTENCE CONTROL
 *
 * Many reserved words (ZONCE, ZEDGE, ZWHILE, ZDO, ZEND, G65, M99) for RTM control were used in a real time macro command
 */
export class A0392_TooManySentenceControl extends RuntimeAlarm {
  constructor() {
    super({
      number: "0392",
      message: "TOO MANY SENTENCE CONTROL",
      description: `Many reserved words (ZONCE, ZEDGE, ZWHILE, ZDO, ZEND, G65, M99) for RTM control were used in a real time macro command`
    });
  }
}

/**
 * NO SENTENCE CONTROL
 *
 * In a real time macro command, there is no data to be assigned
 */
export class A0393_NoSentenceControl extends RuntimeAlarm {
  constructor() {
    super({
      number: "0393",
      message: "NO SENTENCE CONTROL",
      description: `In a real time macro command, there is no data to be assigned`
    });
  }
}

/**
 * ILLEGAL SENTENCE CONTROL
 *
 * The matching of reserved words (ZONCE, ZEDGE, ZWHILE, ZDO, ZEND, G65, M99) for RTM control is incorrect
 */
export class A0394_IllegalSentenceControl extends RuntimeAlarm {
  constructor() {
    super({
      number: "0394",
      message: "ILLEGAL SENTENCE CONTROL",
      description: `The matching of reserved words (ZONCE, ZEDGE, ZWHILE, ZDO, ZEND, G65, M99) for RTM control is incorrect`
    });
  }
}

/**
 * ILLEGAL NC WORD CONTROL
 *
 * Control code G65 or M99 for calling a subprogram or returning from a subprogram is not coded correctly
 */
export class A0395_IllegalNcWordControl extends RuntimeAlarm {
  constructor() {
    super({
      number: "0395",
      message: "ILLEGAL NC WORD CONTROL",
      description: `Control code G65 or M99 for calling a subprogram or returning from a subprogram is not coded correctly`
    });
  }
}

/**
 * ILLEGAL RTM SENTENCE CONTROL
 *
 * In other than a real time macro command, a reserved word (ZONCE, ZEDGE, ZWHILE, ZDO, or ZEND) for RTM control is used
 */
export class A0396_IllegalRtmSentenceControl extends RuntimeAlarm {
  constructor() {
    super({
      number: "0396",
      message: "ILLEGAL RTM SENTENCE CONTROL",
      description: `In other than a real time macro command, a reserved word (ZONCE, ZEDGE, ZWHILE, ZDO, or ZEND) for RTM control is used`
    });
  }
}

/**
 * RTM BUFFER OVER
 *
 * There is no buffer available for real time macro commands. Too many blocks read in advance are buffered as triggers used by real time macro commands
 */
export class A0397_RtmBufferOver extends RuntimeAlarm {
  constructor() {
    super({
      number: "0397",
      message: "RTM BUFFER OVER",
      description: `There is no buffer available for real time macro commands. Too many blocks read in advance are buffered as triggers used by real time macro commands`
    });
  }
}

/**
 * 'ID OVER IN BUFFER
 *
 * In blocks read in advance, there are too many real time macro commands with the same ID
 */
export class A0398_IdOverInBuffer extends RuntimeAlarm {
  constructor() {
    super({
      number: "0398",
      message: "'ID OVER IN BUFFER",
      description: `In blocks read in advance, there are too many real time macro commands with the same ID`
    });
  }
}

/**
 * 'ID EXECUTION IN SAME TIME
 *
 * An attempt was made to execute real time macro commands with the same ID by using the same NC statement as a trigger
 */
export class A0399_IdExecutionInSameTime extends RuntimeAlarm {
  constructor() {
    super({
      number: "0399",
      message: "'ID EXECUTION IN SAME TIME",
      description: `An attempt was made to execute real time macro commands with the same ID by using the same NC statement as a trigger`
    });
  }
}

/**
 * ONESHOT CMDOVER
 *
 * Too many one-shot real time macro commands are specified
 */
export class A0400_OneshotCmdover extends RuntimeAlarm {
  constructor() {
    super({
      number: "0400",
      message: "ONESHOT CMDOVER",
      description: `Too many one-shot real time macro commands are specified`
    });
  }
}

/**
 * EXEC CMD NUM OVER IN SAME TIME
 *
 * The number of real time macro commands that can be executed simultaneously was exceeded
 */
export class A0401_ExecCmdNumOverInSameTime extends RuntimeAlarm {
  constructor() {
    super({
      number: "0401",
      message: "EXEC CMD NUM OVER IN SAME TIME",
      description: `The number of real time macro commands that can be executed simultaneously was exceeded`
    });
  }
}

/**
 * ILLEGAL TOKEN FOR RTM
 *
 * A token, variable, or function that is not supported by the real time custom macro function was detected
 */
export class A0402_IllegalTokenForRtm extends RuntimeAlarm {
  constructor() {
    super({
      number: "0402",
      message: "ILLEGAL TOKEN FOR RTM",
      description: `A token, variable, or function that is not supported by the real time custom macro function was detected`
    });
  }
}

/**
 * ACCESS TO RTM PROTECT VAR
 *
 * An attempt was made to access a protected variable
 */
export class A0403_AccessToRtmProtectVar extends RuntimeAlarm {
  constructor() {
    super({
      number: "0403",
      message: "ACCESS TO RTM PROTECT VAR",
      description: `An attempt was made to access a protected variable`
    });
  }
}

/**
 * RTM ERROR
 *
 * An error related to a real time macro command occurred
 */
export class A0404_RtmError extends RuntimeAlarm {
  constructor() {
    super({
      number: "0404",
      message: "RTM ERROR",
      description: `An error related to a real time macro command occurred`
    });
  }
}

/**
 * CODE AREA SHORTAGE
 *
 * The storage size of the real time macro area is insufficient
 */
export class A0406_CodeAreaShortage extends RuntimeAlarm {
  constructor() {
    super({
      number: "0406",
      message: "CODE AREA SHORTAGE",
      description: `The storage size of the real time macro area is insufficient`
    });
  }
}

/**
 * DOULE SLASH IN RTM MODE
 *
 * In the compile mode, an attempt was made to set the compile mode again
 */
export class A0407_DouleSlashInRtmMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0407",
      message: "DOULE SLASH IN RTM MODE",
      description: `In the compile mode, an attempt was made to set the compile mode again`
    });
  }
}

/**
 * G90 IS NOT PERMITTED
 *
 * The absolute command cannot be specified
 */
export class A0408_G90IsNotPermitted extends RuntimeAlarm {
  constructor() {
    super({
      number: "0408",
      message: "G90 IS NOT PERMITTED",
      description: `The absolute command cannot be specified`
    });
  }
}

/**
 * ILLEGAL AXIS NO
 *
 * An invalid axis number is specified
 */
export class A0409_IllegalAxisNo extends RuntimeAlarm {
  constructor() {
    super({
      number: "0409",
      message: "ILLEGAL AXIS NO",
      description: `An invalid axis number is specified`
    });
  }
}

/**
 * MIDDLE POINT IS NOT ZERO
 *
 * An intermediate point other than 0 is specified with G28
 */
export class A0410_MiddlePointIsNotZero extends RuntimeAlarm {
  constructor() {
    super({
      number: "0410",
      message: "MIDDLE POINT IS NOT ZERO",
      description: `An intermediate point other than 0 is specified with G28`
    });
  }
}

/**
 * SIMULTANEOUSLY AXES OVER
 *
 * The maximum number of axes that can be controlled simultaneously was exceeded
 */
export class A0411_SimultaneouslyAxesOver extends RuntimeAlarm {
  constructor() {
    super({
      number: "0411",
      message: "SIMULTANEOUSLY AXES OVER",
      description: `The maximum number of axes that can be controlled simultaneously was exceeded`
    });
  }
}

/**
 * ILLEGAL G CODE
 *
 * An unusable G code was used
 */
export class A0412_IllegalGCode extends RuntimeAlarm {
  constructor() {
    super({
      number: "0412",
      message: "ILLEGAL G CODE",
      description: `An unusable G code was used`
    });
  }
}

/**
 * ILLEGAL ADDRESS
 *
 * An unusable address was used
 */
export class A0413_IllegalAddress extends RuntimeAlarm {
  constructor() {
    super({
      number: "0413",
      message: "ILLEGAL ADDRESS",
      description: `An unusable address was used`
    });
  }
}

/**
 * ILLEGAL PMC AXIS NO
 *
 * An invalid PMC axis number is specified
 */
export class A0414_IllegalPmcAxisNo extends RuntimeAlarm {
  constructor() {
    super({
      number: "0414",
      message: "ILLEGAL PMC AXIS NO",
      description: `An invalid PMC axis number is specified`
    });
  }
}

/**
 * GROUP IS IN USE
 *
 * The group to which the specified axis belongs is already in used
 */
export class A0415_GroupIsInUse extends RuntimeAlarm {
  constructor() {
    super({
      number: "0415",
      message: "GROUP IS IN USE",
      description: `The group to which the specified axis belongs is already in used`
    });
  }
}

/**
 * UNABLE TO USE THE AXIS
 *
 * The specified axis cannot be used
 */
export class A0416_UnableToUseTheAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "0416",
      message: "UNABLE TO USE THE AXIS",
      description: `The specified axis cannot be used`
    });
  }
}

/**
 * AXIS IS UNABLE TO MOVE
 *
 * The specified axis is placed in the inoperative state
 */
export class A0417_AxisIsUnableToMove extends RuntimeAlarm {
  constructor() {
    super({
      number: "0417",
      message: "AXIS IS UNABLE TO MOVE",
      description: `The specified axis is placed in the inoperative state`
    });
  }
}

/**
 * ILLEGAL FEED SETTING
 *
 * An incorrect feedrate is set
 */
export class A0418_IllegalFeedSetting extends RuntimeAlarm {
  constructor() {
    super({
      number: "0418",
      message: "ILLEGAL FEED SETTING",
      description: `An incorrect feedrate is set`
    });
  }
}

/**
 * ILLEGAL DISTANCE SETTING
 *
 * A travel distance beyond the specifiable range is specified
 */
export class A0419_IllegalDistanceSetting extends RuntimeAlarm {
  constructor() {
    super({
      number: "0419",
      message: "ILLEGAL DISTANCE SETTING",
      description: `A travel distance beyond the specifiable range is specified`
    });
  }
}

/**
 * CONSTANT NUMBER P
 *
 * A subprogram is specified not by using a constant
 */
export class A0420_ConstantNumberP extends RuntimeAlarm {
  constructor() {
    super({
      number: "0420",
      message: "CONSTANT NUMBER P",
      description: `A subprogram is specified not by using a constant`
    });
  }
}

/**
 * ILLEGAL ARGUMENT G54
 *
 * With G65, an invalid argument, L, is used
 */
export class A0421_IllegalArgumentG54 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0421",
      message: "ILLEGAL ARGUMENT G54",
      description: `With G65, an invalid argument, L, is used`
    });
  }
}

/**
 * ILLEGAL ARGUMENT G54
 *
 * With G65, an invalid argument is used
 */
export class A0422_IllegalArgumentG54 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0422",
      message: "ILLEGAL ARGUMENT G54",
      description: `With G65, an invalid argument is used`
    });
  }
}

/**
 * NO PMC AXIS CONTROL OPTION
 *
 * The option for PMC axis control is missing
 */
export class A0423_NoPmcAxisControlOption extends RuntimeAlarm {
  constructor() {
    super({
      number: "0423",
      message: "NO PMC AXIS CONTROL OPTION",
      description: `The option for PMC axis control is missing`
    });
  }
}

/**
 * MULTIPLE AXES IN ONE GROUP
 *
 * Multiple axes are using one group
 */
export class A0424_MultipleAxesInOneGroup extends RuntimeAlarm {
  constructor() {
    super({
      number: "0424",
      message: "MULTIPLE AXES IN ONE GROUP",
      description: `Multiple axes are using one group`
    });
  }
}

/**
 * ONE AXIS USE MULTIPLE GROU
 *
 * One axis is using multiple groups
 */
export class A0425_OneAxisUseMultipleGrou extends RuntimeAlarm {
  constructor() {
    super({
      number: "0425",
      message: "ONE AXIS USE MULTIPLE GROU",
      description: `One axis is using multiple groups`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G10.6
 *
 * When retract was started in a threading block, a retract command had been issued for the long axis direction of threading
 */
export class A0429_IllegalCommandInG10_6 extends RuntimeAlarm {
  constructor() {
    super({
      number: "0429",
      message: "ILLEGAL COMMAND IN G10.6",
      description: `When retract was started in a threading block, a retract command had been issued for the long axis direction of threading`
    });
  }
}

/**
 * ILLEGAL FORMAT OF PROGRAM NO
 *
 * Address O or N is not followed by a number
 */
export class A1014_IllegalFormatOfProgramNo extends RuntimeAlarm {
  constructor() {
    super({
      number: "1014",
      message: "ILLEGAL FORMAT OF PROGRAM NO",
      description: `Address O or N is not followed by a number`
    });
  }
}

/**
 * EOB NOT FOUND
 *
 * EOB (End of Block) code is missing at the end of a program input in the MDI mode
 */
export class A1016_EobNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "1016",
      message: "EOB NOT FOUND",
      description: `EOB (End of Block) code is missing at the end of a program input in the MDI mode`
    });
  }
}

/**
 * M99 IN MAIN PROGRAM
 *
 * A M99 was commanded during main program when the parameter AMM (No. 7712#4) = 1 was set
 */
export class A1018_M99InMainProgram extends RuntimeAlarm {
  constructor() {
    super({
      number: "1018",
      message: "M99 IN MAIN PROGRAM",
      description: `A M99 was commanded during main program when the parameter AMM (No. 7712#4) = 1 was set`
    });
  }
}

/**
 * COMMAND IN BUFFERING MODE
 *
 * The manual intervention compensation request signal MIGET became “1” when a advanced block was found during automatic operation. To input the manual intervention compensation during automatic operation, a sequence for manipulating the manual intervention compensation request signal MIGET is required in an M code instruction without buffering
 */
export class A1059_CommandInBufferingMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "1059",
      message: "COMMAND IN BUFFERING MODE",
      description: `The manual intervention compensation request signal MIGET became “1” when a advanced block was found during automatic operation. To input the manual intervention compensation during automatic operation, a sequence for manipulating the manual intervention compensation request signal MIGET is required in an M code instruction without buffering`
    });
  }
}

/**
 * PROGRAM IN USE
 *
 * An attempt was made in the foreground to execute a program being edited in the background. The currently edited program cannot be executed, so end editing and restart program execution
 */
export class A1077_ProgramInUse extends RuntimeAlarm {
  constructor() {
    super({
      number: "1077",
      message: "PROGRAM IN USE",
      description: `An attempt was made in the foreground to execute a program being edited in the background. The currently edited program cannot be executed, so end editing and restart program execution`
    });
  }
}

/**
 * PROGRAM FILE NOT FOUND
 *
 * The program of the specified file No. is not registered in an external device. (external device subprogram call)
 */
export class A1079_ProgramFileNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "1079",
      message: "PROGRAM FILE NOT FOUND",
      description: `The program of the specified file No. is not registered in an external device. (external device subprogram call)`
    });
  }
}

/**
 * DUPLICATE DEVICE SUB PROGRAM CALL
 *
 * Another external device subprogram call was made from a subprogram after the subprogram called by the external device subprogram call
 */
export class A1080_DuplicateDeviceSubProgramCall extends RuntimeAlarm {
  constructor() {
    super({
      number: "1080",
      message: "DUPLICATE DEVICE SUB PROGRAM CALL",
      description: `Another external device subprogram call was made from a subprogram after the subprogram called by the external device subprogram call`
    });
  }
}

/**
 * EXT DEVICE SUB PROGRAM CALL MODE ERROR
 *
 * The external device subprogram call is not possible in this mode
 */
export class A1081_ExtDeviceSubProgramCallModeError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1081",
      message: "EXT DEVICE SUB PROGRAM CALL MODE ERROR",
      description: `The external device subprogram call is not possible in this mode`
    });
  }
}

/**
 * DUPLICATE SUB-CALL WORD
 *
 * More than one subprogram call instruction was specified in the same block
 */
export class A1091_DuplicateSubCallWord extends RuntimeAlarm {
  constructor() {
    super({
      number: "1091",
      message: "DUPLICATE SUB-CALL WORD",
      description: `More than one subprogram call instruction was specified in the same block`
    });
  }
}

/**
 * DUPLICATE MACRO-CALL WORD
 *
 * More than one macro call instruction was specified in the same block
 */
export class A1092_DuplicateMacroCallWord extends RuntimeAlarm {
  constructor() {
    super({
      number: "1092",
      message: "DUPLICATE MACRO-CALL WORD",
      description: `More than one macro call instruction was specified in the same block`
    });
  }
}

/**
 * DUPLICATE NC-WORD & M99
 *
 * An address other than O, N, P or L was specified in the same block as M99 during the macro modal call state
 */
export class A1093_DuplicateNcWordAndM99 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1093",
      message: "DUPLICATE NC-WORD & M99",
      description: `An address other than O, N, P or L was specified in the same block as M99 during the macro modal call state`
    });
  }
}

/**
 * TOO MANY TYPE-2 ARGUMENT
 *
 * More than ten sets of I, J and K arguments were specified in the type-II arguments (A, B, C, I, J, K, I, J, K, ...) for custom macros
 */
export class A1095_TooManyType2Argument extends RuntimeAlarm {
  constructor() {
    super({
      number: "1095",
      message: "TOO MANY TYPE-2 ARGUMENT",
      description: `More than ten sets of I, J and K arguments were specified in the type-II arguments (A, B, C, I, J, K, I, J, K, ...) for custom macros`
    });
  }
}

/**
 * ILLEGAL VARIABLE NAME
 *
 * An illegal variable name was specified. A code that cannot be specified as a variable name was specified. [#_OFSxx] does not match the tool offset memory option configuration
 */
export class A1096_IllegalVariableName extends RuntimeAlarm {
  constructor() {
    super({
      number: "1096",
      message: "ILLEGAL VARIABLE NAME",
      description: `An illegal variable name was specified. A code that cannot be specified as a variable name was specified. [#_OFSxx] does not match the tool offset memory option configuration`
    });
  }
}

/**
 * TOO LONG VARIABLE NAME
 *
 * The specified variable name is too long
 */
export class A1097_TooLongVariableName extends RuntimeAlarm {
  constructor() {
    super({
      number: "1097",
      message: "TOO LONG VARIABLE NAME",
      description: `The specified variable name is too long`
    });
  }
}

/**
 * NO VARIABLE NAME
 *
 * The specified variable name cannot be used as it is not registered
 */
export class A1098_NoVariableName extends RuntimeAlarm {
  constructor() {
    super({
      number: "1098",
      message: "NO VARIABLE NAME",
      description: `The specified variable name cannot be used as it is not registered`
    });
  }
}

/**
 * ILLLEGAL SUFFIX [ ]
 *
 * A suffix was not specified to a variable name that required a suffix enclosed by [ ]. A suffix was specified to a variable name that did not require a suffix enclosed by [ ]. The value enclosed by the specified [ ] was out of range
 */
export class A1099_IlllegalSuffixBrackets extends RuntimeAlarm {
  constructor() {
    super({
      number: "1099",
      message: "ILLLEGAL SUFFIX [ ]",
      description: `A suffix was not specified to a variable name that required a suffix enclosed by [ ]. A suffix was specified to a variable name that did not require a suffix enclosed by [ ]. The value enclosed by the specified [ ] was out of range`
    });
  }
}

/**
 * CANCEL WITHOUT MODAL CALL
 *
 * Call mode cancel (G67) was specified even though macro continuous-state call mode (G66) was not in effect
 */
export class A1100_CancelWithoutModalCall extends RuntimeAlarm {
  constructor() {
    super({
      number: "1100",
      message: "CANCEL WITHOUT MODAL CALL",
      description: `Call mode cancel (G67) was specified even though macro continuous-state call mode (G66) was not in effect`
    });
  }
}

/**
 * ILLEGAL CNC STATEMENT IRT
 *
 * An interrupt was made in a state where a custom macro interrupt containing a move instruction could not be executed
 */
export class A1101_IllegalCncStatementIrt extends RuntimeAlarm {
  constructor() {
    super({
      number: "1101",
      message: "ILLEGAL CNC STATEMENT IRT",
      description: `An interrupt was made in a state where a custom macro interrupt containing a move instruction could not be executed`
    });
  }
}

/**
 * READ PROTECTED VARIABLE
 *
 * An attempt was made in a custom macro to use on the right side of an expression a variable that can only be used on the left side of an expression
 */
export class A1115_ReadProtectedVariable extends RuntimeAlarm {
  constructor() {
    super({
      number: "1115",
      message: "READ PROTECTED VARIABLE",
      description: `An attempt was made in a custom macro to use on the right side of an expression a variable that can only be used on the left side of an expression`
    });
  }
}

/**
 * ILLEGAL ARGUMENT FORMAT
 *
 * The specified argument in the argument function (ATAN, POW) is in error
 */
export class A1120_IllegalArgumentFormat extends RuntimeAlarm {
  constructor() {
    super({
      number: "1120",
      message: "ILLEGAL ARGUMENT FORMAT",
      description: `The specified argument in the argument function (ATAN, POW) is in error`
    });
  }
}

/**
 * MISSING DO STATEMENT
 *
 * The DO instruction corresponding to the END instruction was missing in a custom macro
 */
export class A1124_MissingDoStatement extends RuntimeAlarm {
  constructor() {
    super({
      number: "1124",
      message: "MISSING DO STATEMENT",
      description: `The DO instruction corresponding to the END instruction was missing in a custom macro`
    });
  }
}

/**
 * ILLEGAL EXPRESSION FORMAT
 *
 * The description of the expression in a custom macro statement contains an error. A parameter program format error. The screen displayed to enter periodic maintenance data or item selection menu (machine) data does not match the data type
 */
export class A1125_IllegalExpressionFormat extends RuntimeAlarm {
  constructor() {
    super({
      number: "1125",
      message: "ILLEGAL EXPRESSION FORMAT",
      description: `The description of the expression in a custom macro statement contains an error. A parameter program format error. The screen displayed to enter periodic maintenance data or item selection menu (machine) data does not match the data type`
    });
  }
}

/**
 * SEQUENCE NUMBER OUT OF RANGE
 *
 * The jump destination sequence No. in a custom macro statement GOTO instruction was out of range (valid range: 1 to 99999999)
 */
export class A1128_SequenceNumberOutOfRange extends RuntimeAlarm {
  constructor() {
    super({
      number: "1128",
      message: "SEQUENCE NUMBER OUT OF RANGE",
      description: `The jump destination sequence No. in a custom macro statement GOTO instruction was out of range (valid range: 1 to 99999999)`
    });
  }
}

/**
 * MISSING OPEN BRACKET
 *
 * The number of left brackets ([) is less than the number of right brackets (]) in a custom macro statement
 */
export class A1131_MissingOpenBracket extends RuntimeAlarm {
  constructor() {
    super({
      number: "1131",
      message: "MISSING OPEN BRACKET",
      description: `The number of left brackets ([) is less than the number of right brackets (]) in a custom macro statement`
    });
  }
}

/**
 * MISSING CLOSE BRACKET
 *
 * The number of right brackets (]) is less than the number of left brackets ([) in a custom macro statement
 */
export class A1132_MissingCloseBracket extends RuntimeAlarm {
  constructor() {
    super({
      number: "1132",
      message: "MISSING CLOSE BRACKET",
      description: `The number of right brackets (]) is less than the number of left brackets ([) in a custom macro statement`
    });
  }
}

/**
 * MISSING '='
 *
 * An equal sign (=) is missing in the arithmetic calculation instruction in a custom macro statement
 */
export class A1133_MissingEquals extends RuntimeAlarm {
  constructor() {
    super({
      number: "1133",
      message: "MISSING '='",
      description: `An equal sign (=) is missing in the arithmetic calculation instruction in a custom macro statement`
    });
  }
}

/**
 * MISSING ','
 *
 * A delimiter (,) is missing in a custom macro statement
 */
export class A1134_MissingComma extends RuntimeAlarm {
  constructor() {
    super({
      number: "1134",
      message: "MISSING ','",
      description: `A delimiter (,) is missing in a custom macro statement`
    });
  }
}

/**
 * IF STATEMENT FORMAT ERROR
 *
 * The format used in the IF statement in a custom macro is in error
 */
export class A1137_IfStatementFormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1137",
      message: "IF STATEMENT FORMAT ERROR",
      description: `The format used in the IF statement in a custom macro is in error`
    });
  }
}

/**
 * WHILE STATEMENT FORMAT ERROR
 *
 * The format used in the WHILE statement in a custom macro is in error
 */
export class A1138_WhileStatementFormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1138",
      message: "WHILE STATEMENT FORMAT ERROR",
      description: `The format used in the WHILE statement in a custom macro is in error`
    });
  }
}

/**
 * SETVN STATEMENT FORMAT ERROR
 *
 * The format used in the SETVN statement in a custom macro is in error
 */
export class A1139_SetvnStatementFormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1139",
      message: "SETVN STATEMENT FORMAT ERROR",
      description: `The format used in the SETVN statement in a custom macro is in error`
    });
  }
}

/**
 * ILLEGAL CHARACTER IN VAR. NAME
 *
 * The SETVN statement in a custom macro contacts a character that cannot be used in a variable name
 */
export class A1141_IllegalCharacterInVariableName extends RuntimeAlarm {
  constructor() {
    super({
      number: "1141",
      message: "ILLEGAL CHARACTER IN VAR. NAME",
      description: `The SETVN statement in a custom macro contacts a character that cannot be used in a variable name`
    });
  }
}

/**
 * TOO LONG V-NAME (SETVN)
 *
 * The variable name used in a SETVN statement in a custom macro exceeds 8 characters
 */
export class A1142_TooLongVNameSetvn extends RuntimeAlarm {
  constructor() {
    super({
      number: "1142",
      message: "TOO LONG V-NAME (SETVN)",
      description: `The variable name used in a SETVN statement in a custom macro exceeds 8 characters`
    });
  }
}

/**
 * BPRNT/DPRNT STATEMENT FORMAT ERROR
 *
 * The format used in the BPRINT statement or DPRINT statement is in error
 */
export class A1143_BprntDprntStatementFormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1143",
      message: "BPRNT/DPRNT STATEMENT FORMAT ERROR",
      description: `The format used in the BPRINT statement or DPRINT statement is in error`
    });
  }
}

/**
 * G10 FORMAT ERROR
 *
 * The G10 L No. contains no relevant data input or corresponding option. Data setting address P or R is not specified. An address not relating to the data setting is specified. Which address to specify varies according to the L No. The sign, decimal point or range of the specified address are in error
 */
export class A1144_G10FormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1144",
      message: "G10 FORMAT ERROR",
      description: `The G10 L No. contains no relevant data input or corresponding option. Data setting address P or R is not specified. An address not relating to the data setting is specified. Which address to specify varies according to the L No. The sign, decimal point or range of the specified address are in error`
    });
  }
}

/**
 * G10.1 TIME OUT
 *
 * The response to a G10.1 instruction was not received from the PMC within the specified time limit
 */
export class A1145_G10_1TimeOut extends RuntimeAlarm {
  constructor() {
    super({
      number: "1145",
      message: "G10.1 TIME OUT",
      description: `The response to a G10.1 instruction was not received from the PMC within the specified time limit`
    });
  }
}

/**
 * G10.1 FORMAT ERROR
 *
 * The G10.1 instruction format is in error
 */
export class A1146_G10_1FormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1146",
      message: "G10.1 FORMAT ERROR",
      description: `The G10.1 instruction format is in error`
    });
  }
}

/**
 * G31.9/G31.8 FORMAT ERROR
 *
 * The format of the G31.9 or G31.8 block is erroneous in the following cases:
 */
export class A1152_G31_9G31_8FormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1152",
      message: "G31.9/G31.8 FORMAT ERROR",
      description: `The format of the G31.9 or G31.8 block is erroneous in the following cases:`
    });
  }
}

/**
 * CANNOT USE G31.9
 *
 * G31.9 cannot be specified in this modal state. This alarm is also generated when G31.9 is specified when a group 07 G code (e.g. cutter compensation) is not canceled
 */
export class A1153_CannotUseG31_9 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1153",
      message: "CANNOT USE G31.9",
      description: `G31.9 cannot be specified in this modal state. This alarm is also generated when G31.9 is specified when a group 07 G code (e.g. cutter compensation) is not canceled`
    });
  }
}

/**
 * COMMAND DATA OVERFLOW
 *
 * An overflow occurred in the position data within the CNC. This alarm is also generated if the target position of a command exceeds the maximum stroke as a result of calculation such as coordinate conversion, offset, or introduction of a manual intervention amount
 */
export class A1160_CommandDataOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "1160",
      message: "COMMAND DATA OVERFLOW",
      description: `An overflow occurred in the position data within the CNC. This alarm is also generated if the target position of a command exceeds the maximum stroke as a result of calculation such as coordinate conversion, offset, or introduction of a manual intervention amount`
    });
  }
}

/**
 * ALL PARALLEL AXES IN PARKING
 *
 * All of the axis specified for automatic operation are parked
 */
export class A1180_AllParallelAxesInParking extends RuntimeAlarm {
  constructor() {
    super({
      number: "1180",
      message: "ALL PARALLEL AXES IN PARKING",
      description: `All of the axis specified for automatic operation are parked`
    });
  }
}

/**
 * ILLEGAL DRILLING AXIS SELECTED
 *
 * An illegal axis was specified for drilling in a canned cycle for drilling. If the zero point of the drilling axis is not specified or parallel axes are specified in a block containing a G code in a canned cycle, simultaneously specify the parallel axes for the drilling axis
 */
export class A1196_IllegalDrillingAxisSelected extends RuntimeAlarm {
  constructor() {
    super({
      number: "1196",
      message: "ILLEGAL DRILLING AXIS SELECTED",
      description: `An illegal axis was specified for drilling in a canned cycle for drilling. If the zero point of the drilling axis is not specified or parallel axes are specified in a block containing a G code in a canned cycle, simultaneously specify the parallel axes for the drilling axis`
    });
  }
}

/**
 * PULSCODER INVALID ZERO RETURN
 *
 * The grid position could not be calculated during grid reference position return using the grid system as the one-revolution signal was not received before leaving the deceleration dog. This alarm is also generated when the tool does not reach a feedrate that exceeds the servo error amount preset to parameter No. 1841 before the deceleration limit switch is left (deceleration signal *DEC returns to “1”)
 */
export class A1200_PulscoderInvalidZeroReturn extends RuntimeAlarm {
  constructor() {
    super({
      number: "1200",
      message: "PULSCODER INVALID ZERO RETURN",
      description: `The grid position could not be calculated during grid reference position return using the grid system as the one-revolution signal was not received before leaving the deceleration dog. This alarm is also generated when the tool does not reach a feedrate that exceeds the servo error amount preset to parameter No. 1841 before the deceleration limit switch is left (deceleration signal *DEC returns to “1”)`
    });
  }
}

/**
 * NO F COMMAND AT G93
 *
 * F codes in the inverse time specification mode (G93) are not handled as modal, and must be specified in individual blocks
 */
export class A1202_NoFCommandAtG93 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1202",
      message: "NO F COMMAND AT G93",
      description: `F codes in the inverse time specification mode (G93) are not handled as modal, and must be specified in individual blocks`
    });
  }
}

/**
 * ILLEGAL SPINDLE SELECT
 *
 * An attempt was made to execute an instruction that uses the spindle although the spindle to be controlled has not been set correctly
 */
export class A1223_IllegalSpindleSelect extends RuntimeAlarm {
  constructor() {
    super({
      number: "1223",
      message: "ILLEGAL SPINDLE SELECT",
      description: `An attempt was made to execute an instruction that uses the spindle although the spindle to be controlled has not been set correctly`
    });
  }
}

/**
 * ILLEGAL COMMAND IN 3-D OFFSET
 *
 * An illegal G code was specified in the three-dimensional tool offset mode
 */
export class A1282_IllegalCommandIn3DOffset extends RuntimeAlarm {
  constructor() {
    super({
      number: "1282",
      message: "ILLEGAL COMMAND IN 3-D OFFSET",
      description: `An illegal G code was specified in the three-dimensional tool offset mode`
    });
  }
}

/**
 * ILLEGAL IJK IN 3-D OFFSET
 *
 * When bit 0 (ONI) of parameter No. 6029 is set to 1, I, J, and K commands are specified without the decimal point in three-dimensional tool compensation mode
 */
export class A1283_IllegalIjkIn3DOffset extends RuntimeAlarm {
  constructor() {
    super({
      number: "1283",
      message: "ILLEGAL IJK IN 3-D OFFSET",
      description: `When bit 0 (ONI) of parameter No. 6029 is set to 1, I, J, and K commands are specified without the decimal point in three-dimensional tool compensation mode`
    });
  }
}

/**
 * ILLEGAL INCH/METRIC CONVERSION
 *
 * An error occurred during inch/metric switching
 */
export class A1298_IllegalInchMetricConversion extends RuntimeAlarm {
  constructor() {
    super({
      number: "1298",
      message: "ILLEGAL INCH/METRIC CONVERSION",
      description: `An error occurred during inch/metric switching`
    });
  }
}

/**
 * ILLEGAL ADDRESS
 *
 * The axis No. address was specified even though the parameter is not an axis-type while loading parameters or pitch error compensation data from a tape or by entry of the G10 parameter. Axis No. cannot be specified in pitch error compensation data
 */
export class A1300_IllegalAddress extends RuntimeAlarm {
  constructor() {
    super({
      number: "1300",
      message: "ILLEGAL ADDRESS",
      description: `The axis No. address was specified even though the parameter is not an axis-type while loading parameters or pitch error compensation data from a tape or by entry of the G10 parameter. Axis No. cannot be specified in pitch error compensation data`
    });
  }
}

/**
 * MISSING ADDRESS
 *
 * The axis No. was not specified even though the parameter is an axis-type while loading parameters or pitch error compensation data from a tape or by entry of the G10 parameter. Or, data No. address N, or setting data address P or R are not specified
 */
export class A1301_MissingAddress extends RuntimeAlarm {
  constructor() {
    super({
      number: "1301",
      message: "MISSING ADDRESS",
      description: `The axis No. was not specified even though the parameter is an axis-type while loading parameters or pitch error compensation data from a tape or by entry of the G10 parameter. Or, data No. address N, or setting data address P or R are not specified`
    });
  }
}

/**
 * ILLEGAL DATA NUMBER
 *
 * A non-existent data No. was found while loading parameters or pitch error compensation data from a tape or by entry of the G10 parameter. An invalid address R value is specified in a pattern program for each machining purpose on the high-speed high-precision setting screen. This alarm is also generated when illegal word values are found
 */
export class A1302_IllegalDataNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "1302",
      message: "ILLEGAL DATA NUMBER",
      description: `A non-existent data No. was found while loading parameters or pitch error compensation data from a tape or by entry of the G10 parameter. An invalid address R value is specified in a pattern program for each machining purpose on the high-speed high-precision setting screen. This alarm is also generated when illegal word values are found`
    });
  }
}

/**
 * ILLEGAL AXIS NUMBER
 *
 * An axis No. address exceeding the maximum number of controlled axes was found while loading parameters from a tape or by entry of the G10 parameter
 */
export class A1303_IllegalAxisNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "1303",
      message: "ILLEGAL AXIS NUMBER",
      description: `An axis No. address exceeding the maximum number of controlled axes was found while loading parameters from a tape or by entry of the G10 parameter`
    });
  }
}

/**
 * TOO MANY DIGIT
 *
 * Data with too many digits was found while loading parameters or pitch error compensation data from a tape
 */
export class A1304_TooManyDigit extends RuntimeAlarm {
  constructor() {
    super({
      number: "1304",
      message: "TOO MANY DIGIT",
      description: `Data with too many digits was found while loading parameters or pitch error compensation data from a tape`
    });
  }
}

/**
 * DATA OUT OF RANGE
 *
 * Out-of-range data was found while loading parameters or pitch error compensation data from a tape. The values of the data setting addresses corresponding to L Nos. during data input by G10 was out of range. This alarm is also generated when NC programming words contain out-of-range values
 */
export class A1305_DataOutOfRange extends RuntimeAlarm {
  constructor() {
    super({
      number: "1305",
      message: "DATA OUT OF RANGE",
      description: `Out-of-range data was found while loading parameters or pitch error compensation data from a tape. The values of the data setting addresses corresponding to L Nos. during data input by G10 was out of range. This alarm is also generated when NC programming words contain out-of-range values`
    });
  }
}

/**
 * MISSING AXIS NUMBER
 *
 * A parameter which requires an axis to be specified was found without an axis No. (address A) while loading parameters from a tape
 */
export class A1306_MissingAxisNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "1306",
      message: "MISSING AXIS NUMBER",
      description: `A parameter which requires an axis to be specified was found without an axis No. (address A) while loading parameters from a tape`
    });
  }
}

/**
 * ILLEGAL USE OF MINUS SIGN
 *
 * Data with an illegal sign was found while loading parameters or pitch error compensation data from a tape, or by entry of the G10 parameter. A sign was specified to an address that does not support the use of signs
 */
export class A1307_IllegalUseOfMinusSign extends RuntimeAlarm {
  constructor() {
    super({
      number: "1307",
      message: "ILLEGAL USE OF MINUS SIGN",
      description: `Data with an illegal sign was found while loading parameters or pitch error compensation data from a tape, or by entry of the G10 parameter. A sign was specified to an address that does not support the use of signs`
    });
  }
}

/**
 * MISSING DATA
 *
 * An address not followed by a numeric value was found while loading parameters or pitch error compensation data from a tape
 */
export class A1308_MissingData extends RuntimeAlarm {
  constructor() {
    super({
      number: "1308",
      message: "MISSING DATA",
      description: `An address not followed by a numeric value was found while loading parameters or pitch error compensation data from a tape`
    });
  }
}

/**
 * ILLEGAL MACHINE GROUP NUMBER
 *
 * An machine group No. address exceeding the maximum number of controlled machine groups was found while loading parameters from a tape or by entry of the G10 parameter
 */
export class A1329_IllegalMachineGroupNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "1329",
      message: "ILLEGAL MACHINE GROUP NUMBER",
      description: `An machine group No. address exceeding the maximum number of controlled machine groups was found while loading parameters from a tape or by entry of the G10 parameter`
    });
  }
}

/**
 * ILLEGAL SPINDLE NUMBER
 *
 * An spindle No. address exceeding the maximum number of controlled spindles was found while loading parameters from a tape or by entry of the G10 parameter
 */
export class A1330_IllegalSpindleNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "1330",
      message: "ILLEGAL SPINDLE NUMBER",
      description: `An spindle No. address exceeding the maximum number of controlled spindles was found while loading parameters from a tape or by entry of the G10 parameter`
    });
  }
}

/**
 * ILLEGAL PATH NUMBER
 *
 * An path No. address exceeding the maximum number of controlled path was found while loading parameters from a tape or by entry of the G10 parameter
 */
export class A1331_IllegalPathNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "1331",
      message: "ILLEGAL PATH NUMBER",
      description: `An path No. address exceeding the maximum number of controlled path was found while loading parameters from a tape or by entry of the G10 parameter`
    });
  }
}

/**
 * DATA WRITE LOCK ERROR
 *
 * Could not load data while loading parameters, pitch error compensation data and work coordinate data from tape
 */
export class A1332_DataWriteLockError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1332",
      message: "DATA WRITE LOCK ERROR",
      description: `Could not load data while loading parameters, pitch error compensation data and work coordinate data from tape`
    });
  }
}

/**
 * DATA WRITE ERROR
 *
 * Could not write data while loading data from tape
 */
export class A1333_DataWriteError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1333",
      message: "DATA WRITE ERROR",
      description: `Could not write data while loading data from tape`
    });
  }
}

/**
 * PARAMETER OUT OF RANGE (TLAC)
 *
 * Illegal parameter setting. (Set value is out of range.)
 */
export class A1360_ParameterOutOfRangeTlac extends RuntimeAlarm {
  constructor() {
    super({
      number: "1360",
      message: "PARAMETER OUT OF RANGE (TLAC)",
      description: `Illegal parameter setting. (Set value is out of range.)`
    });
  }
}

/**
 * PARAMTER SETTING ERROR 1 (TLAC)
 *
 * Illegal parameter setting. (axis of rotation setting)
 */
export class A1361_ParamterSettingError1Tlac extends RuntimeAlarm {
  constructor() {
    super({
      number: "1361",
      message: "PARAMTER SETTING ERROR 1 (TLAC)",
      description: `Illegal parameter setting. (axis of rotation setting)`
    });
  }
}

/**
 * PARAMETER SETTING ERROR 2 (TLAC)
 *
 * Illegal parameter setting (tool axis setting)
 */
export class A1362_ParameterSettingError2Tlac extends RuntimeAlarm {
  constructor() {
    super({
      number: "1362",
      message: "PARAMETER SETTING ERROR 2 (TLAC)",
      description: `Illegal parameter setting (tool axis setting)`
    });
  }
}

/**
 * PARAMETER SETTING ERROR (DM3H-1)
 *
 * Out-of-range data was set during setting of the three-dimensional handle feed parameter
 */
export class A1370_ParameterSettingErrorDm3h1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1370",
      message: "PARAMETER SETTING ERROR (DM3H-1)",
      description: `Out-of-range data was set during setting of the three-dimensional handle feed parameter`
    });
  }
}

/**
 * PARAMETER SETTING ERROR (DM3H-2)
 *
 * An illegal axis of rotation was set during setting of the three-dimensional handle feed parameter
 */
export class A1371_ParameterSettingErrorDm3h2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1371",
      message: "PARAMETER SETTING ERROR (DM3H-2)",
      description: `An illegal axis of rotation was set during setting of the three-dimensional handle feed parameter`
    });
  }
}

/**
 * PARAMETAR SETTING ERROR (DM3H-3)
 *
 * An illegal master axis was set during setting of the three-dimensional handle feed parameter
 */
export class A1372_ParametarSettingErrorDm3h3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1372",
      message: "PARAMETAR SETTING ERROR (DM3H-3)",
      description: `An illegal master axis was set during setting of the three-dimensional handle feed parameter`
    });
  }
}

/**
 * PARAMETER SETTING ERROR (DM3H-4)
 *
 * An illegal parallel axis or twin table was set during setting of the three-dimensional handle feed parameter
 */
export class A1373_ParameterSettingErrorDm3h4 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1373",
      message: "PARAMETER SETTING ERROR (DM3H-4)",
      description: `An illegal parallel axis or twin table was set during setting of the three-dimensional handle feed parameter`
    });
  }
}

/**
 * G40.1 -G42.1 PARAMETER MISS
 *
 * A parameter setting related to normal direction control is illegal. The axis number of a normal direction controlled axis is set in parameter No. 5480, but that axis number is in the range of the number of controlled axes. The axis set as a normal direction controlled axis is not set as a rotation axis (ROTx, bit 0 of parameter No. 1006) = 1 and No.1022=0). Set the feedrate at which to insert rotation about a normal direction controlled axis in parameter No. 5481, in the range of 1 to 15000 mm/min
 */
export class A1470_G40_1G42_1ParameterMiss extends RuntimeAlarm {
  constructor() {
    super({
      number: "1470",
      message: "G40.1 -G42.1 PARAMETER MISS",
      description: `A parameter setting related to normal direction control is illegal. The axis number of a normal direction controlled axis is set in parameter No. 5480, but that axis number is in the range of the number of controlled axes. The axis set as a normal direction controlled axis is not set as a rotation axis (ROTx, bit 0 of parameter No. 1006) = 1 and No.1022=0). Set the feedrate at which to insert rotation about a normal direction controlled axis in parameter No. 5481, in the range of 1 to 15000 mm/min`
    });
  }
}

/**
 * DUPLICATE M-CODE (INDEX TABLE REVERSING)
 *
 * A function to which the same code as this M code is set exists. (index table indexing)
 */
export class A1508_DuplicateMCodeIndexTableReversing extends RuntimeAlarm {
  constructor() {
    super({
      number: "1508",
      message: "DUPLICATE M-CODE (INDEX TABLE REVERSING)",
      description: `A function to which the same code as this M code is set exists. (index table indexing)`
    });
  }
}

/**
 * DUPLICATE M-CODE (SPOS AXIS ORIENTATION)
 *
 * A function to which the same code as this M code is set exists. (spindle positioning, orientation)
 */
export class A1509_DuplicateMCodeSposAxisOrientation extends RuntimeAlarm {
  constructor() {
    super({
      number: "1509",
      message: "DUPLICATE M-CODE (SPOS AXIS ORIENTATION)",
      description: `A function to which the same code as this M code is set exists. (spindle positioning, orientation)`
    });
  }
}

/**
 * DUPLICATE M-CODE (SPOS AXIS POSITIONING)
 *
 * A function to which the same code as this M code is set exists. (spindle positioning, positioning)
 */
export class A1510_DuplicateMCodeSposAxisPositioning extends RuntimeAlarm {
  constructor() {
    super({
      number: "1510",
      message: "DUPLICATE M-CODE (SPOS AXIS POSITIONING)",
      description: `A function to which the same code as this M code is set exists. (spindle positioning, positioning)`
    });
  }
}

/**
 * DUPLICATE M-CODE (SPOS AXIS RELEASE)
 *
 * A function to which the same code as this M code is set exists. (spindle positioning, mode cancel)
 */
export class A1511_DuplicateMCodeSposAxisRelease extends RuntimeAlarm {
  constructor() {
    super({
      number: "1511",
      message: "DUPLICATE M-CODE (SPOS AXIS RELEASE)",
      description: `A function to which the same code as this M code is set exists. (spindle positioning, mode cancel)`
    });
  }
}

/**
 * ILLEGAL USE OF DECIMAL POINT (F-CODE)
 *
 * When the feedrate instruction contains valid data below the decimal point, the alarm is set and the F code contains valid data below the decimal point
 */
export class A1531_IllegalUseOfDecimalPointFCode extends RuntimeAlarm {
  constructor() {
    super({
      number: "1531",
      message: "ILLEGAL USE OF DECIMAL POINT (F-CODE)",
      description: `When the feedrate instruction contains valid data below the decimal point, the alarm is set and the F code contains valid data below the decimal point`
    });
  }
}

/**
 * ILLEGAL USE OF DECIMAL POINT (E-CODE)
 *
 * When the feedrate instruction contains valid data below the decimal point, the alarm is set and the E code contains valid data below the decimal point
 */
export class A1532_IllegalUseOfDecimalPointECode extends RuntimeAlarm {
  constructor() {
    super({
      number: "1532",
      message: "ILLEGAL USE OF DECIMAL POINT (E-CODE)",
      description: `When the feedrate instruction contains valid data below the decimal point, the alarm is set and the E code contains valid data below the decimal point`
    });
  }
}

/**
 * ADDRESS F UNDERFLOW (G95)
 *
 * The feedrate for the hole drilling axis calculated from the F and S codes is too slow in the feed per single rotation mode (G95)
 */
export class A1533_AddressFUnderflowG95 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1533",
      message: "ADDRESS F UNDERFLOW (G95)",
      description: `The feedrate for the hole drilling axis calculated from the F and S codes is too slow in the feed per single rotation mode (G95)`
    });
  }
}

/**
 * ADDRESS F OVERFLOW (G95)
 *
 * The feedrate for the hole drilling axis calculated from the F and S codes is too fast in the feed per single rotation mode (G95)
 */
export class A1534_AddressFOverflowG95 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1534",
      message: "ADDRESS F OVERFLOW (G95)",
      description: `The feedrate for the hole drilling axis calculated from the F and S codes is too fast in the feed per single rotation mode (G95)`
    });
  }
}

/**
 * ADDRESS E UNDERFLOW (G95)
 *
 * The feedrate for the hole drilling axis calculated from the E and S codes is too slow in the feed per single rotation mode (G95)
 */
export class A1535_AddressEUnderflowG95 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1535",
      message: "ADDRESS E UNDERFLOW (G95)",
      description: `The feedrate for the hole drilling axis calculated from the E and S codes is too slow in the feed per single rotation mode (G95)`
    });
  }
}

/**
 * ADDRESS E OVERFLOW (G95)
 *
 * The feedrate for the hole drilling axis calculated from the E and S codes is too fast in the feed per single rotation mode (G95)
 */
export class A1536_AddressEOverflowG95 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1536",
      message: "ADDRESS E OVERFLOW (G95)",
      description: `The feedrate for the hole drilling axis calculated from the E and S codes is too fast in the feed per single rotation mode (G95)`
    });
  }
}

/**
 * ADDRESS F UNDERFLOW (OVERRIDE)
 *
 * The speed obtained by applying override to the F instruction is too slow
 */
export class A1537_AddressFUnderflowOverride extends RuntimeAlarm {
  constructor() {
    super({
      number: "1537",
      message: "ADDRESS F UNDERFLOW (OVERRIDE)",
      description: `The speed obtained by applying override to the F instruction is too slow`
    });
  }
}

/**
 * ADDRESS F OVERFLOW (OVERRIDE)
 *
 * The speed obtained by applying override to the F instruction is too fast
 */
export class A1538_AddressFOverflowOverride extends RuntimeAlarm {
  constructor() {
    super({
      number: "1538",
      message: "ADDRESS F OVERFLOW (OVERRIDE)",
      description: `The speed obtained by applying override to the F instruction is too fast`
    });
  }
}

/**
 * ADDRESS E UNDERFLOW (OVERRIDE)
 *
 * The speed obtained by applying override to the E instruction is too slow
 */
export class A1539_AddressEUnderflowOverride extends RuntimeAlarm {
  constructor() {
    super({
      number: "1539",
      message: "ADDRESS E UNDERFLOW (OVERRIDE)",
      description: `The speed obtained by applying override to the E instruction is too slow`
    });
  }
}

/**
 * ADDRESS E OVERFLOW (OVERRIDE)
 *
 * The speed obtained by applying override to the E instruction is too fast
 */
export class A1540_AddressEOverflowOverride extends RuntimeAlarm {
  constructor() {
    super({
      number: "1540",
      message: "ADDRESS E OVERFLOW (OVERRIDE)",
      description: `The speed obtained by applying override to the E instruction is too fast`
    });
  }
}

/**
 * S-CODE ZERO
 *
 * “0” has been instructed as the S code
 */
export class A1541_SCodeZero extends RuntimeAlarm {
  constructor() {
    super({
      number: "1541",
      message: "S-CODE ZERO",
      description: `“0” has been instructed as the S code`
    });
  }
}

/**
 * FEED ZERO (E-CODE)
 *
 * “0” has been instructed as the feedrate (E code)
 */
export class A1542_FeedZeroECode extends RuntimeAlarm {
  constructor() {
    super({
      number: "1542",
      message: "FEED ZERO (E-CODE)",
      description: `“0” has been instructed as the feedrate (E code)`
    });
  }
}

/**
 * ILLEGAL GEAR SETTING
 *
 * The gear ratio between the spindle and position coder, or the set position coder number of pulses is illegal in the spindle positioning function
 */
export class A1543_IllegalGearSetting extends RuntimeAlarm {
  constructor() {
    super({
      number: "1543",
      message: "ILLEGAL GEAR SETTING",
      description: `The gear ratio between the spindle and position coder, or the set position coder number of pulses is illegal in the spindle positioning function`
    });
  }
}

/**
 * S-CODE OVER MAX
 *
 * The S command exceeds the maximum spindle rotation number
 */
export class A1544_SCodeOverMax extends RuntimeAlarm {
  constructor() {
    super({
      number: "1544",
      message: "S-CODE OVER MAX",
      description: `The S command exceeds the maximum spindle rotation number`
    });
  }
}

/**
 * ILLGAL AXIS MODE
 *
 * The spindle positioning axis/Cs contour control axis was specified during switching of the controlled axis mode
 */
export class A1548_IllgalAxisMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "1548",
      message: "ILLGAL AXIS MODE",
      description: `The spindle positioning axis/Cs contour control axis was specified during switching of the controlled axis mode`
    });
  }
}

/**
 * ILLEGAL INDEXING ANGLE
 *
 * The specified angle of rotation is not an integer multiple of the minimum indexing angle
 */
export class A1561_IllegalIndexingAngle extends RuntimeAlarm {
  constructor() {
    super({
      number: "1561",
      message: "ILLEGAL INDEXING ANGLE",
      description: `The specified angle of rotation is not an integer multiple of the minimum indexing angle`
    });
  }
}

/**
 * INDEX TABLE AXIS - OTHER AXIS SAME TIME
 *
 * The index table indexing axis and another axis have been specified in the same block
 */
export class A1564_IndexTableAxisOtherAxisSameTime extends RuntimeAlarm {
  constructor() {
    super({
      number: "1564",
      message: "INDEX TABLE AXIS - OTHER AXIS SAME TIME",
      description: `The index table indexing axis and another axis have been specified in the same block`
    });
  }
}

/**
 * INDEX TABLE AXIS DUPLICATE AXIS COMMAND
 *
 * Index table indexing was specified during axis movement or on an axis for which the index table indexing sequence was not completed
 */
export class A1567_IndexTableAxisDuplicateAxisCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "1567",
      message: "INDEX TABLE AXIS DUPLICATE AXIS COMMAND",
      description: `Index table indexing was specified during axis movement or on an axis for which the index table indexing sequence was not completed`
    });
  }
}

/**
 * ENCODE ALARM (PSWD&KEY)
 *
 * When an attempt was made to read a program, the specified password did not match the password on the tape and the password on tape was not equal to 0. When an attempt was made to punch an encrypted tape, the password was not in the range 0 to 99999999. The password parameter is No. 2210
 */
export class A1580_EncodeAlarmPswdandkey extends RuntimeAlarm {
  constructor() {
    super({
      number: "1580",
      message: "ENCODE ALARM (PSWD&KEY)",
      description: `When an attempt was made to read a program, the specified password did not match the password on the tape and the password on tape was not equal to 0. When an attempt was made to punch an encrypted tape, the password was not in the range 0 to 99999999. The password parameter is No. 2210`
    });
  }
}

/**
 * ENCODE ALARM (PARAMETER)
 *
 * When an attempt was made to punch an encrypted tape, the punch code parameter was set to EIA. Set parameter ISO (No. 0000#1) to “0”. An incorrect instruction was specified for program encryption or protection. This alarm is generated if an attempt is made to perform program editing, deletion, or range-specified punch-out in the protected range in the lock state. Or, a program outside the protected range is specified in rage specification punch-out in the unlock state. The protected range is defined from the program No. preset by parameter No. 3222 up to the program No. preset to parameter No. 3223. When both parameters are set to “0”, the protected range becomes O9000 to O9999
 */
export class A1581_EncodeAlarmParameter extends RuntimeAlarm {
  constructor() {
    super({
      number: "1581",
      message: "ENCODE ALARM (PARAMETER)",
      description: `When an attempt was made to punch an encrypted tape, the punch code parameter was set to EIA. Set parameter ISO (No. 0000#1) to “0”. An incorrect instruction was specified for program encryption or protection. This alarm is generated if an attempt is made to perform program editing, deletion, or range-specified punch-out in the protected range in the lock state. Or, a program outside the protected range is specified in rage specification punch-out in the unlock state. The protected range is defined from the program No. preset by parameter No. 3222 up to the program No. preset to parameter No. 3223. When both parameters are set to “0”, the protected range becomes O9000 to O9999`
    });
  }
}

/**
 * TH ERROR
 *
 * A TH error was detected during reading from an input device. The read code that caused the TH error and how many statements it is from the block can be verified in the diagnostics screen
 */
export class A1590_ThError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1590",
      message: "TH ERROR",
      description: `A TH error was detected during reading from an input device. The read code that caused the TH error and how many statements it is from the block can be verified in the diagnostics screen`
    });
  }
}

/**
 * TV ERROR
 *
 * An error was detected during the single-block TV error. The TV check can be suppressed by setting TVC parameter No. 0000#0 to “0”
 */
export class A1591_TvError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1591",
      message: "TV ERROR",
      description: `An error was detected during the single-block TV error. The TV check can be suppressed by setting TVC parameter No. 0000#0 to “0”`
    });
  }
}

/**
 * END OF RECORD
 *
 * The EOR (End of Record) code is specified in the middle of a block. This alarm is also generated when the percentage at the end of the NC program is read. For the program restart function, this alarm is generated if a specified block is not found
 */
export class A1592_EndOfRecord extends RuntimeAlarm {
  constructor() {
    super({
      number: "1592",
      message: "END OF RECORD",
      description: `The EOR (End of Record) code is specified in the middle of a block. This alarm is also generated when the percentage at the end of the NC program is read. For the program restart function, this alarm is generated if a specified block is not found`
    });
  }
}

/**
 * EGB PARAMETER SETTING ERROR
 *
 * Error in setting a parameter related to the EGB 7710 is not specified
 */
export class A1593_EgbParameterSettingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1593",
      message: "EGB PARAMETER SETTING ERROR",
      description: `Error in setting a parameter related to the EGB 7710 is not specified`
    });
  }
}

/**
 * EGB FORMAT ERROR
 *
 * Error in the format of the block of an EGB command specified for the master or slave axis
 */
export class A1594_EgbFormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1594",
      message: "EGB FORMAT ERROR",
      description: `Error in the format of the block of an EGB command specified for the master or slave axis`
    });
  }
}

/**
 * ILL-COMMAND IN EGB MODE
 *
 * During synchronization with the EGB, a command that must not be issued is issued
 */
export class A1595_IllCommandInEgbMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "1595",
      message: "ILL-COMMAND IN EGB MODE",
      description: `During synchronization with the EGB, a command that must not be issued is issued`
    });
  }
}

/**
 * EGB OVERFLOW
 *
 * An overflow occurred in the calculation of the synchronization coefficient
 */
export class A1596_EgbOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "1596",
      message: "EGB OVERFLOW",
      description: `An overflow occurred in the calculation of the synchronization coefficient`
    });
  }
}

/**
 * EGB AUTO PHASE FORMAT ERROR
 *
 * Format error in the G80 or G81 block in EGB automatic phase synchronization
 */
export class A1597_EgbAutoPhaseFormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1597",
      message: "EGB AUTO PHASE FORMAT ERROR",
      description: `Format error in the G80 or G81 block in EGB automatic phase synchronization`
    });
  }
}

/**
 * EGB AUTO PHASE PARAMETER SETTING ERROR
 *
 * Error in the setting of a parameter related to EGB automatic phase synchronization
 */
export class A1598_EgbAutoPhaseParameterSettingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1598",
      message: "EGB AUTO PHASE PARAMETER SETTING ERROR",
      description: `Error in the setting of a parameter related to EGB automatic phase synchronization`
    });
  }
}

/**
 * ILLEGAL COMMAND
 *
 * [I/O Device] An attempt was made to specify an illegal command during I/O processing on an I/O device. [G30 Zero Return] The P address Nos. for instructing No. 2 to No. 4 zero return are each out of the range 2 to 4. [Single Rotation Dwell] The specified spindle rotation is “0” when single rotation dwell is specified. [Three-dimensional Tool Offset] A G code that cannot be specified was specified in the three-dimensional tool offset mode. Scaling instruction G51, skip cutting G31 and automatic tool length measurement G37 were specified
 */
export class A1805_IllegalCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "1805",
      message: "ILLEGAL COMMAND",
      description: `[I/O Device] An attempt was made to specify an illegal command during I/O processing on an I/O device. [G30 Zero Return] The P address Nos. for instructing No. 2 to No. 4 zero return are each out of the range 2 to 4. [Single Rotation Dwell] The specified spindle rotation is “0” when single rotation dwell is specified. [Three-dimensional Tool Offset] A G code that cannot be specified was specified in the three-dimensional tool offset mode. Scaling instruction G51, skip cutting G31 and automatic tool length measurement G37 were specified`
    });
  }
}

/**
 * DEVICE TYPE MISS MATCH
 *
 * An operation not possible on the I/O device that is currently selected in the setting was specified. This alarm is also generated when file rewind is instructed even though the I/O device is not a FANUC Cassette
 */
export class A1806_DeviceTypeMissMatch extends RuntimeAlarm {
  constructor() {
    super({
      number: "1806",
      message: "DEVICE TYPE MISS MATCH",
      description: `An operation not possible on the I/O device that is currently selected in the setting was specified. This alarm is also generated when file rewind is instructed even though the I/O device is not a FANUC Cassette`
    });
  }
}

/**
 * PARAMETER SETTING ERROR
 *
 * An I/O interface option that has not yet been added on was specified. The external I/O device and baud rate, stop bit and protocol selection settings are erroneous
 */
export class A1807_ParameterSettingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "1807",
      message: "PARAMETER SETTING ERROR",
      description: `An I/O interface option that has not yet been added on was specified. The external I/O device and baud rate, stop bit and protocol selection settings are erroneous`
    });
  }
}

/**
 * DEVICE DOUBLE OPENED
 *
 * An attempt was made to open a device that is being accessed
 */
export class A1808_DeviceDoubleOpened extends RuntimeAlarm {
  constructor() {
    super({
      number: "1808",
      message: "DEVICE DOUBLE OPENED",
      description: `An attempt was made to open a device that is being accessed`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G41/G42
 *
 * Specified direction tool length compensation parameters are incorrect. A move instruction for a axis of rotation was specified in the specified direction tool length compensation mode
 */
export class A1809_IllegalCommandInG41G42 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1809",
      message: "ILLEGAL COMMAND IN G41/G42",
      description: `Specified direction tool length compensation parameters are incorrect. A move instruction for a axis of rotation was specified in the specified direction tool length compensation mode`
    });
  }
}

/**
 * FRAMING ERROR(1)
 *
 * The stop bit of the character received from the I/O device connected to reader/punch interface 1 was not detected
 */
export class A1823_FramingError1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1823",
      message: "FRAMING ERROR(1)",
      description: `The stop bit of the character received from the I/O device connected to reader/punch interface 1 was not detected`
    });
  }
}

/**
 * DR OFF(2)
 *
 * The data set ready input signal DR of the I/O device connected to reader/punch interface 2 turned OFF
 */
export class A1830_DrOff2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1830",
      message: "DR OFF(2)",
      description: `The data set ready input signal DR of the I/O device connected to reader/punch interface 2 turned OFF`
    });
  }
}

/**
 * OVERRUN ERROR(2)
 *
 * The next character was received from the I/O device connected to reader/punch interface 2 before it could read a previously received character
 */
export class A1832_OverrunError2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1832",
      message: "OVERRUN ERROR(2)",
      description: `The next character was received from the I/O device connected to reader/punch interface 2 before it could read a previously received character`
    });
  }
}

/**
 * FRAMING ERROR(2)
 *
 * The stop bit of the character received from the I/O device connected to reader/punch interface 2 was not detected
 */
export class A1833_FramingError2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1833",
      message: "FRAMING ERROR(2)",
      description: `The stop bit of the character received from the I/O device connected to reader/punch interface 2 was not detected`
    });
  }
}

/**
 * BUFFER OVERFLOW(2)
 *
 * The NC received more than 10 characters of data from the I/O device connected to reader/punch interface 2 even though the NC sent a stop code (DC3) during data reception
 */
export class A1834_BufferOverflow2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1834",
      message: "BUFFER OVERFLOW(2)",
      description: `The NC received more than 10 characters of data from the I/O device connected to reader/punch interface 2 even though the NC sent a stop code (DC3) during data reception`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G54.3
 *
 * An illegal command was issued in G54.3 block
 */
export class A1889_IllegalCommandInG54_3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1889",
      message: "ILLEGAL COMMAND IN G54.3",
      description: `An illegal command was issued in G54.3 block`
    });
  }
}

/**
 * ILLEGAL PARAMETER IN G54.2
 *
 * An illegal parameter (Nos. 6068 to 6076) was specified for fixture offset
 */
export class A1898_IllegalParameterInG54_2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1898",
      message: "ILLEGAL PARAMETER IN G54.2",
      description: `An illegal parameter (Nos. 6068 to 6076) was specified for fixture offset`
    });
  }
}

/**
 * V-DEVICE DRIVER ERROR (OPEN)
 *
 * An error occurred during device driver control
 */
export class A1912_VDeviceDriverErrorOpen extends RuntimeAlarm {
  constructor() {
    super({
      number: "1912",
      message: "V-DEVICE DRIVER ERROR (OPEN)",
      description: `An error occurred during device driver control`
    });
  }
}

/**
 * ACCESS ERROR (MEMORY CARD)
 *
 * Illegal memory card accessing This alarm is also generated during reading when reading is executed up to the end of the file without detection of the EOR code
 */
export class A1960_AccessErrorMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1960",
      message: "ACCESS ERROR (MEMORY CARD)",
      description: `Illegal memory card accessing This alarm is also generated during reading when reading is executed up to the end of the file without detection of the EOR code`
    });
  }
}

/**
 * NOT READY (MEMORY CARD)
 *
 * The memory card is not ready
 */
export class A1961_NotReadyMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1961",
      message: "NOT READY (MEMORY CARD)",
      description: `The memory card is not ready`
    });
  }
}

/**
 * CARD FULL (MEMORY CARD)
 *
 * The memory card has run out of space
 */
export class A1962_CardFullMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1962",
      message: "CARD FULL (MEMORY CARD)",
      description: `The memory card has run out of space`
    });
  }
}

/**
 * CARD PROTECTED (MEMORY CARD)
 *
 * The memory card is write-protected
 */
export class A1963_CardProtectedMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1963",
      message: "CARD PROTECTED (MEMORY CARD)",
      description: `The memory card is write-protected`
    });
  }
}

/**
 * NOT MOUNTED (MEMORY CARD)
 *
 * The memory card could not be mounted
 */
export class A1964_NotMountedMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1964",
      message: "NOT MOUNTED (MEMORY CARD)",
      description: `The memory card could not be mounted`
    });
  }
}

/**
 * DIRECTORY FULL (MEMORY CARD)
 *
 * The file could not be generated in the root directory for the memory card
 */
export class A1965_DirectoryFullMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1965",
      message: "DIRECTORY FULL (MEMORY CARD)",
      description: `The file could not be generated in the root directory for the memory card`
    });
  }
}

/**
 * FILE NOT FOUND (MEMORY CARD)
 *
 * The specified file could not be found on the memory card
 */
export class A1966_FileNotFoundMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1966",
      message: "FILE NOT FOUND (MEMORY CARD)",
      description: `The specified file could not be found on the memory card`
    });
  }
}

/**
 * FILE PROTECTED (MEMORY CARD)
 *
 * The memory card is write-protected
 */
export class A1967_FileProtectedMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1967",
      message: "FILE PROTECTED (MEMORY CARD)",
      description: `The memory card is write-protected`
    });
  }
}

/**
 * ILLEGAL FILE NAME (MEMORY CARD)
 *
 * Illegal memory card file name
 */
export class A1968_IllegalFileNameMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1968",
      message: "ILLEGAL FILE NAME (MEMORY CARD)",
      description: `Illegal memory card file name`
    });
  }
}

/**
 * ILLEGAL FORMAT (MEMORY CARD)
 *
 * Check the file name
 */
export class A1969_IllegalFormatMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1969",
      message: "ILLEGAL FORMAT (MEMORY CARD)",
      description: `Check the file name`
    });
  }
}

/**
 * ILLEGAL CARD (MEMORY CARD)
 *
 * This memory card cannot be handled
 */
export class A1970_IllegalCardMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1970",
      message: "ILLEGAL CARD (MEMORY CARD)",
      description: `This memory card cannot be handled`
    });
  }
}

/**
 * ERASE ERROR (MEMORY CARD)
 *
 * An error occurred during memory card erase
 */
export class A1971_EraseErrorMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1971",
      message: "ERASE ERROR (MEMORY CARD)",
      description: `An error occurred during memory card erase`
    });
  }
}

/**
 * BATTERY LOW (MEMORY CARD)
 *
 * The memory card battery is low
 */
export class A1972_BatteryLowMemoryCard extends RuntimeAlarm {
  constructor() {
    super({
      number: "1972",
      message: "BATTERY LOW (MEMORY CARD)",
      description: `The memory card battery is low`
    });
  }
}

/**
 * FILE ALREADY EXIST
 *
 * A file having the same name already exists on the memory card
 */
export class A1973_FileAlreadyExist extends RuntimeAlarm {
  constructor() {
    super({
      number: "1973",
      message: "FILE ALREADY EXIST",
      description: `A file having the same name already exists on the memory card`
    });
  }
}

/**
 * SPL:ILLEGAL AXIS COMMAND
 *
 * The axis specified by the smooth interpolation (G5.1Q2) is illegal
 */
export class A1990_SplIllegalAxisCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "1990",
      message: "SPL:ILLEGAL AXIS COMMAND",
      description: `The axis specified by the smooth interpolation (G5.1Q2) is illegal`
    });
  }
}

/**
 * SPL:CAN'T MAKE VECTOR
 *
 * The end point and the 2 previous point are the same in generation of the 3-dimensional tool offset vector by the end point for smooth interpolation
 */
export class A1993_SplCannotMakeVector extends RuntimeAlarm {
  constructor() {
    super({
      number: "1993",
      message: "SPL:CAN'T MAKE VECTOR",
      description: `The end point and the 2 previous point are the same in generation of the 3-dimensional tool offset vector by the end point for smooth interpolation`
    });
  }
}

/**
 * ILLEGAL PARAMETER IN G41.2/G42.2
 *
 * The parameter settings (parameter Nos. 6080 to 6089) for determining the relationship between the axis of rotation and the rotation plane are incorrect
 */
export class A1995_IllegalParameterInG41_2G42_2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1995",
      message: "ILLEGAL PARAMETER IN G41.2/G42.2",
      description: `The parameter settings (parameter Nos. 6080 to 6089) for determining the relationship between the axis of rotation and the rotation plane are incorrect`
    });
  }
}

/**
 * ILLEGAL PARAMETER IN G41.3
 *
 * The parameter settings (parameter Nos. 6080 to 6089) for determining the relationship between the axis of rotation and the rotation plane are incorrect
 */
export class A1999_IllegalParameterInG41_3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "1999",
      message: "ILLEGAL PARAMETER IN G41.3",
      description: `The parameter settings (parameter Nos. 6080 to 6089) for determining the relationship between the axis of rotation and the rotation plane are incorrect`
    });
  }
}

/**
 * NO KNOT COMMAND (NURBS)
 *
 * Knot has not been specified, or a block not related to NURBS interpolation was specified in the NURBS interpolation mode
 */
export class A2002_NoKnotCommandNurbs extends RuntimeAlarm {
  constructor() {
    super({
      number: "2002",
      message: "NO KNOT COMMAND (NURBS)",
      description: `Knot has not been specified, or a block not related to NURBS interpolation was specified in the NURBS interpolation mode`
    });
  }
}

/**
 * ILLEGAL AXIS COMMAND (NURBS)
 *
 * An axis not specified as a control point was specified in the No. 1 block
 */
export class A2003_IllegalAxisCommandNurbs extends RuntimeAlarm {
  constructor() {
    super({
      number: "2003",
      message: "ILLEGAL AXIS COMMAND (NURBS)",
      description: `An axis not specified as a control point was specified in the No. 1 block`
    });
  }
}

/**
 * ILLEGAL KNOT
 *
 * There is an insufficient number of knot individual blocks
 */
export class A2004_IllegalKnot extends RuntimeAlarm {
  constructor() {
    super({
      number: "2004",
      message: "ILLEGAL KNOT",
      description: `There is an insufficient number of knot individual blocks`
    });
  }
}

/**
 * ILLEGAL CANCEL (NURBS)
 *
 * The NURBS interpolation mode was turned OFF even though NURBS interpolation was not completed
 */
export class A2005_IllegalCancelNurbs extends RuntimeAlarm {
  constructor() {
    super({
      number: "2005",
      message: "ILLEGAL CANCEL (NURBS)",
      description: `The NURBS interpolation mode was turned OFF even though NURBS interpolation was not completed`
    });
  }
}

/**
 * ILLEGAL MODE (NURBS)
 *
 * A mode that cannot be paired with the NURBS interpolation mode was specified
 */
export class A2006_IllegalModeNurbs extends RuntimeAlarm {
  constructor() {
    super({
      number: "2006",
      message: "ILLEGAL MODE (NURBS)",
      description: `A mode that cannot be paired with the NURBS interpolation mode was specified`
    });
  }
}

/**
 * ILLEGAL MULTI-KNOT
 *
 * Nested knots for each level can be specified for the start and end points
 */
export class A2007_IllegalMultiKnot extends RuntimeAlarm {
  constructor() {
    super({
      number: "2007",
      message: "ILLEGAL MULTI-KNOT",
      description: `Nested knots for each level can be specified for the start and end points`
    });
  }
}

/**
 * #200-#499ILLEGAL P-CODE MACRO COMMON INPUT(NO OPTION)
 *
 * An attempt was made to enter a custom macro common variable not existing in the system
 */
export class A2051_Reg200_499IllegalPCodeMacroCommonInputNoOption extends RuntimeAlarm {
  constructor() {
    super({
      number: "2051",
      message: "#200-#499ILLEGAL P-CODE MACRO COMMON INPUT(NO OPTION)",
      description: `An attempt was made to enter a custom macro common variable not existing in the system`
    });
  }
}

/**
 * #500-#549P-CODE MACRO COMMON SELECT(CANNOT USE SETVN)
 *
 * The variable name cannot be entered. The SETVN command cannot be used with the P-CODE macro common variables #500 to #549
 */
export class A2052_Reg500_549PCodeMacroCommonSelectCannotUseSetvn extends RuntimeAlarm {
  constructor() {
    super({
      number: "2052",
      message: "#500-#549P-CODE MACRO COMMON SELECT(CANNOT USE SETVN)",
      description: `The variable name cannot be entered. The SETVN command cannot be used with the P-CODE macro common variables #500 to #549`
    });
  }
}

/**
 * THE NUMBER OF #30000 IS UNMATCH
 *
 * An attempt was made to enter a P-CODE-only variable not existing in the system
 */
export class A2053_TheNumberOfReg30000IsUnmatch extends RuntimeAlarm {
  constructor() {
    super({
      number: "2053",
      message: "THE NUMBER OF #30000 IS UNMATCH",
      description: `An attempt was made to enter a P-CODE-only variable not existing in the system`
    });
  }
}

/**
 * THE NUMBER OF #40000 IS UNMATCH
 *
 * An attempt was made to enter an extended P-CODE-only variable not existing in the system
 */
export class A2054_TheNumberOfReg40000IsUnmatch extends RuntimeAlarm {
  constructor() {
    super({
      number: "2054",
      message: "THE NUMBER OF #40000 IS UNMATCH",
      description: `An attempt was made to enter an extended P-CODE-only variable not existing in the system`
    });
  }
}

/**
 * ILLEGAL PARAMETER IN G43.4/G43.5
 *
 * The parameter for the pivot tool length compensation is incorrect
 */
export class A2060_IllegalParameterInG43_4G43_5 extends RuntimeAlarm {
  constructor() {
    super({
      number: "2060",
      message: "ILLEGAL PARAMETER IN G43.4/G43.5",
      description: `The parameter for the pivot tool length compensation is incorrect`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G43.4/G43.5
 *
 * An illegal command was specified in tool center point control. axis was not perpendicular to the plane
 */
export class A2061_IllegalCommandInG43_4G43_5 extends RuntimeAlarm {
  constructor() {
    super({
      number: "2061",
      message: "ILLEGAL COMMAND IN G43.4/G43.5",
      description: `An illegal command was specified in tool center point control. axis was not perpendicular to the plane`
    });
  }
}

/**
 * ILLEGAL REAL VALUE OF OBUF :
 *
 * The real value for a output buffer is in error
 */
export class A4010_IllegalRealValueOfObuf extends RuntimeAlarm {
  constructor() {
    super({
      number: "4010",
      message: "ILLEGAL REAL VALUE OF OBUF :",
      description: `The real value for a output buffer is in error`
    });
  }
}

/**
 * TOO MANY WORD IN ONE BLOCK
 *
 * The number of words in a block exceeds the maximum. The maximum is 26 words. However, this figure varies according to NC options. Divide the instruction word into two blocks
 */
export class A5006_TooManyWordInOneBlock extends RuntimeAlarm {
  constructor() {
    super({
      number: "5006",
      message: "TOO MANY WORD IN ONE BLOCK",
      description: `The number of words in a block exceeds the maximum. The maximum is 26 words. However, this figure varies according to NC options. Divide the instruction word into two blocks`
    });
  }
}

/**
 * TOO LARGE DISTANCE
 *
 * Due to compensation, point of intersection calculation, interpolation or similar reasons, a movement distance that exceeds the maximum permissible distance was specified. Check the programmed coordinates or compensation amounts
 */
export class A5007_TooLargeDistance extends RuntimeAlarm {
  constructor() {
    super({
      number: "5007",
      message: "TOO LARGE DISTANCE",
      description: `Due to compensation, point of intersection calculation, interpolation or similar reasons, a movement distance that exceeds the maximum permissible distance was specified. Check the programmed coordinates or compensation amounts`
    });
  }
}

/**
 * PARAMETER ZERO (DRY RUN)
 *
 * The dry run feedrate parameter No. 1410 or maximum cutting feedrate parameter No. 1422 for each axis has been set to 0
 */
export class A5009_ParameterZeroDryRun extends RuntimeAlarm {
  constructor() {
    super({
      number: "5009",
      message: "PARAMETER ZERO (DRY RUN)",
      description: `The dry run feedrate parameter No. 1410 or maximum cutting feedrate parameter No. 1422 for each axis has been set to 0`
    });
  }
}

/**
 * END OF RECORD
 *
 * The EOR (End of Record) code is specified in the middle of a block. This alarm is also generated when the percentage at the end of the NC program is read
 */
export class A5010_EndOfRecord extends RuntimeAlarm {
  constructor() {
    super({
      number: "5010",
      message: "END OF RECORD",
      description: `The EOR (End of Record) code is specified in the middle of a block. This alarm is also generated when the percentage at the end of the NC program is read`
    });
  }
}

/**
 * PARAMETER ZERO (CUT MAX)
 *
 * The maximum cutting feedrate parameter No. 1430 has been set to 0
 */
export class A5011_ParameterZeroCutMax extends RuntimeAlarm {
  constructor() {
    super({
      number: "5011",
      message: "PARAMETER ZERO (CUT MAX)",
      description: `The maximum cutting feedrate parameter No. 1430 has been set to 0`
    });
  }
}

/**
 * TRACE DATA NOT FOUND
 *
 * A transfer could not be made because of no trace data
 */
export class A5014_TraceDataNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "5014",
      message: "TRACE DATA NOT FOUND",
      description: `A transfer could not be made because of no trace data`
    });
  }
}

/**
 * NO ROTATION AXIS
 *
 * No rotation axis was found in a handle feed in the tool axis direction or in the tool axis right angle direction
 */
export class A5015_NoRotationAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "5015",
      message: "NO ROTATION AXIS",
      description: `No rotation axis was found in a handle feed in the tool axis direction or in the tool axis right angle direction`
    });
  }
}

/**
 * ILLEGAL COMBINATION OF M CODES
 *
 * M codes which belonged to the same group were specified in a block. Alternatively, an M code which must be specified without other M codes in the block was specified in a block with other M codes
 */
export class A5016_IllegalCombinationOfMCodes extends RuntimeAlarm {
  constructor() {
    super({
      number: "5016",
      message: "ILLEGAL COMBINATION OF M CODES",
      description: `M codes which belonged to the same group were specified in a block. Alternatively, an M code which must be specified without other M codes in the block was specified in a block with other M codes`
    });
  }
}

/**
 * POLYGON SPINDLE SPEED ERROR
 *
 * In G51.2 mode, the speed of the spindle or polygon synchronous axis either exceeds the clamp value or is too small. The specified rotation speed ratio thus cannot be maintained. For polygon turning between spindles: More information as to why this alarm occurred is indicated in DGN No. 471
 */
export class A5018_PolygonSpindleSpeedError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5018",
      message: "POLYGON SPINDLE SPEED ERROR",
      description: `In G51.2 mode, the speed of the spindle or polygon synchronous axis either exceeds the clamp value or is too small. The specified rotation speed ratio thus cannot be maintained. For polygon turning between spindles: More information as to why this alarm occurred is indicated in DGN No. 471`
    });
  }
}

/**
 * PARAMETER OF RESTART ERROR
 *
 * The setting of parameter No. 7310 for specifying the order of the axes on which to move to the machining restart position in a dry run is invalid. The valid range is from 1 to the number of controlled axes
 */
export class A5020_ParameterOfRestartError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5020",
      message: "PARAMETER OF RESTART ERROR",
      description: `The setting of parameter No. 7310 for specifying the order of the axes on which to move to the machining restart position in a dry run is invalid. The valid range is from 1 to the number of controlled axes`
    });
  }
}

/**
 * TOO MANY G68 NESTING
 *
 * Three-dimensional coordinate conversion has been specified three or more times. To perform another coordinate conversion, perform cancellation, then specify the coordinate conversion
 */
export class A5043_TooManyG68Nesting extends RuntimeAlarm {
  constructor() {
    super({
      number: "5043",
      message: "TOO MANY G68 NESTING",
      description: `Three-dimensional coordinate conversion has been specified three or more times. To perform another coordinate conversion, perform cancellation, then specify the coordinate conversion`
    });
  }
}

/**
 * G68 FORMAT ERROR
 *
 * Errors for three-dimensional coordinate conversion command are: three-dimensional coordinate conversion command block
 */
export class A5044_G68FormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5044",
      message: "G68 FORMAT ERROR",
      description: `Errors for three-dimensional coordinate conversion command are: three-dimensional coordinate conversion command block`
    });
  }
}

/**
 * ILLEGAL PARAMETER (S-COMP)
 *
 * The setting of a parameter related to straightness compensation contains an error. Possible causes include: or too small
 */
export class A5046_IllegalParameterSComp extends RuntimeAlarm {
  constructor() {
    super({
      number: "5046",
      message: "ILLEGAL PARAMETER (S-COMP)",
      description: `The setting of a parameter related to straightness compensation contains an error. Possible causes include: or too small`
    });
  }
}

/**
 * ILL-COMMAND IN G81.1 MODE
 *
 * During chopping, a move command has been issued for the chopping axis
 */
export class A5050_IllCommandInG81_1Mode extends RuntimeAlarm {
  constructor() {
    super({
      number: "5050",
      message: "ILL-COMMAND IN G81.1 MODE",
      description: `During chopping, a move command has been issued for the chopping axis`
    });
  }
}

/**
 * G35/G36 FORMAT ERROR
 *
 * A command for switching the major axis has been specified for circular threading. Alternatively, a command for setting the length of the major axis to 0 has been specified for circular threading
 */
export class A5058_G35G36FormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5058",
      message: "G35/G36 FORMAT ERROR",
      description: `A command for switching the major axis has been specified for circular threading. Alternatively, a command for setting the length of the major axis to 0 has been specified for circular threading`
    });
  }
}

/**
 * ILLEGAL PARAMETER IN G02.3/G03.3
 *
 * The axis parameter setting to perform an exponential interpolation is in error. Parameter No. 5641: A liner axis number for performing an exponential interpolation Parameter No. 5642: A rotation axis number for performing an exponential interpolation The settable value is 1 to the number of control axes, but it must not be duplicated
 */
export class A5060_IllegalParameterInG02_3G03_3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5060",
      message: "ILLEGAL PARAMETER IN G02.3/G03.3",
      description: `The axis parameter setting to perform an exponential interpolation is in error. Parameter No. 5641: A liner axis number for performing an exponential interpolation Parameter No. 5642: A rotation axis number for performing an exponential interpolation The settable value is 1 to the number of control axes, but it must not be duplicated`
    });
  }
}

/**
 * ILLEGAL FORMAT IN G02.3/G03.3
 *
 * The exponential interpolation command (G02.3/G03.3) has a format error. The command range for address I or J is -89.0 to -1.0 or +1.0 to +89.0. No I or J is specified or out-of -range value is specified. No address R, or 0 is specified
 */
export class A5061_IllegalFormatInG02_3G03_3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5061",
      message: "ILLEGAL FORMAT IN G02.3/G03.3",
      description: `The exponential interpolation command (G02.3/G03.3) has a format error. The command range for address I or J is -89.0 to -1.0 or +1.0 to +89.0. No I or J is specified or out-of -range value is specified. No address R, or 0 is specified`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G02.3/G03.3
 *
 * The value specified in an exponential interpolation command (G02.3/03.3) is illegal. A value that does not allow exponential interpolation is specified. (For example, the value for In is 0 or negative.)
 */
export class A5062_IllegalCommandInG02_3G03_3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5062",
      message: "ILLEGAL COMMAND IN G02.3/G03.3",
      description: `The value specified in an exponential interpolation command (G02.3/03.3) is illegal. A value that does not allow exponential interpolation is specified. (For example, the value for In is 0 or negative.)`
    });
  }
}

/**
 * DIFFERRENT AXIS UNIT
 *
 * Circular interpolation has been specified on a plane consisting of axes having different increment systems
 */
export class A5064_DifferrentAxisUnit extends RuntimeAlarm {
  constructor() {
    super({
      number: "5064",
      message: "DIFFERRENT AXIS UNIT",
      description: `Circular interpolation has been specified on a plane consisting of axes having different increment systems`
    });
  }
}

/**
 * DIFFERRENT AXIS UNIT(PMC AXIS)
 *
 * Axes having different increment systems have been specified in the same DI/DO group for PMC axis control. Modify the setting of parameter No. 8010
 */
export class A5065_DifferrentAxisUnitPmcAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "5065",
      message: "DIFFERRENT AXIS UNIT(PMC AXIS)",
      description: `Axes having different increment systems have been specified in the same DI/DO group for PMC axis control. Modify the setting of parameter No. 8010`
    });
  }
}

/**
 * RESTART ILLEGAL SEQUENCE NUMBER
 *
 * A sequence number from 7000 to 7999 was read during the search for the next number in a restart program for the back or restart function
 */
export class A5066_RestartIllegalSequenceNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "5066",
      message: "RESTART ILLEGAL SEQUENCE NUMBER",
      description: `A sequence number from 7000 to 7999 was read during the search for the next number in a restart program for the back or restart function`
    });
  }
}

/**
 * FORMAT ERROR IN G31P90
 *
 * No travel axis was specified. Two or more travel axes were specified
 */
export class A5068_FormatErrorInG31p90 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5068",
      message: "FORMAT ERROR IN G31P90",
      description: `No travel axis was specified. Two or more travel axes were specified`
    });
  }
}

/**
 * NO DECIMAL POINT
 *
 * No decimal point has been specified for an address requiring a decimal point
 */
export class A5073_NoDecimalPoint extends RuntimeAlarm {
  constructor() {
    super({
      number: "5073",
      message: "NO DECIMAL POINT",
      description: `No decimal point has been specified for an address requiring a decimal point`
    });
  }
}

/**
 * ADDRESS DUPLICATION ERROR
 *
 * The same address has been specified two or more times in a single block. Alternatively, two or more G codes in the same group have been specified in a single block
 */
export class A5074_AddressDuplicationError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5074",
      message: "ADDRESS DUPLICATION ERROR",
      description: `The same address has been specified two or more times in a single block. Alternatively, two or more G codes in the same group have been specified in a single block`
    });
  }
}

/**
 * SMOOTH IPL ERROR 1
 *
 * A block for specifying smooth interpolation contains a syntax error
 */
export class A5085_SmoothIplError1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5085",
      message: "SMOOTH IPL ERROR 1",
      description: `A block for specifying smooth interpolation contains a syntax error`
    });
  }
}

/**
 * ILLEGAL ORDER (NURBS)
 *
 * There is an error in the specification of the rank
 */
export class A5115_IllegalOrderNurbs extends RuntimeAlarm {
  constructor() {
    super({
      number: "5115",
      message: "ILLEGAL ORDER (NURBS)",
      description: `There is an error in the specification of the rank`
    });
  }
}

/**
 * ILLEGAL KNOT VALUE (NURBS)
 *
 * Monotone increasing of knots is not observed
 */
export class A5116_IllegalKnotValueNurbs extends RuntimeAlarm {
  constructor() {
    super({
      number: "5116",
      message: "ILLEGAL KNOT VALUE (NURBS)",
      description: `Monotone increasing of knots is not observed`
    });
  }
}

/**
 * ILLEGAL 1ST CONTROL POINT (NURBS)
 *
 * The first control point is incorrect. Or, it does not provide a continuity from the previous block
 */
export class A5117_Illegal1stControlPointNurbs extends RuntimeAlarm {
  constructor() {
    super({
      number: "5117",
      message: "ILLEGAL 1ST CONTROL POINT (NURBS)",
      description: `The first control point is incorrect. Or, it does not provide a continuity from the previous block`
    });
  }
}

/**
 * ILLEGAL RESTART (NURBS)
 *
 * After manual intervention with manual absolute mode set to on, NURBS interpolation was restarted
 */
export class A5118_IllegalRestartNurbs extends RuntimeAlarm {
  constructor() {
    super({
      number: "5118",
      message: "ILLEGAL RESTART (NURBS)",
      description: `After manual intervention with manual absolute mode set to on, NURBS interpolation was restarted`
    });
  }
}

/**
 * ILLEGAL COMMAND IN SPIRAL
 *
 * A spiral interpolation or conical interpolation command has an error. Specifically, this error is caused by one of the following:
 */
export class A5122_IllegalCommandInSpiral extends RuntimeAlarm {
  constructor() {
    super({
      number: "5122",
      message: "ILLEGAL COMMAND IN SPIRAL",
      description: `A spiral interpolation or conical interpolation command has an error. Specifically, this error is caused by one of the following:`
    });
  }
}

/**
 * OVER TOLERANCE OF END POINT IN SPIRAL
 *
 * The difference between a specified end point and the calculated end point exceeds the allowable range (parameter 3471)
 */
export class A5123_OverToleranceOfEndPointInSpiral extends RuntimeAlarm {
  constructor() {
    super({
      number: "5123",
      message: "OVER TOLERANCE OF END POINT IN SPIRAL",
      description: `The difference between a specified end point and the calculated end point exceeds the allowable range (parameter 3471)`
    });
  }
}

/**
 * CAN NOT COMMAND SPIRAL
 *
 * A spiral interpolation or conical interpolation was specified in any of the following modes:
 */
export class A5124_CanNotCommandSpiral extends RuntimeAlarm {
  constructor() {
    super({
      number: "5124",
      message: "CAN NOT COMMAND SPIRAL",
      description: `A spiral interpolation or conical interpolation was specified in any of the following modes:`
    });
  }
}

/**
 * NC AND SUPERIMPOSE AXIS CONFLICT
 *
 * In the PMC superposition axis control, the NC command and The PMC axis control command were conflicted. Modify the program and the ladder
 */
export class A5130_NcAndSuperimposeAxisConflict extends RuntimeAlarm {
  constructor() {
    super({
      number: "5130",
      message: "NC AND SUPERIMPOSE AXIS CONFLICT",
      description: `In the PMC superposition axis control, the NC command and The PMC axis control command were conflicted. Modify the program and the ladder`
    });
  }
}

/**
 * NC COMMAND IS NOT COMPATIBLE
 *
 * The PMC axis control and three-dimensional coordinate conversion or a polar coordinate interpolation were specified simultaneously
 */
export class A5131_NcCommandIsNotCompatible extends RuntimeAlarm {
  constructor() {
    super({
      number: "5131",
      message: "NC COMMAND IS NOT COMPATIBLE",
      description: `The PMC axis control and three-dimensional coordinate conversion or a polar coordinate interpolation were specified simultaneously`
    });
  }
}

/**
 * CANNOT CHANGE SUPERIMPOSED AXIS
 *
 * The superposition axis was selected for the axis for which the PMC superposition axis is being controlled
 */
export class A5132_CannotChangeSuperimposedAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "5132",
      message: "CANNOT CHANGE SUPERIMPOSED AXIS",
      description: `The superposition axis was selected for the axis for which the PMC superposition axis is being controlled`
    });
  }
}

/**
 * DIRECTION CAN NOT BE JUDGED
 *
 * For a one-contact input touch sensor used with the tool compensation amount measurement value direct input B function, stored pulse directions are not unified. Alternatively, the tool is moving along two axes (X-axis and Z-axis) simultaneously
 */
export class A5195_DirectionCanNotBeJudged extends RuntimeAlarm {
  constructor() {
    super({
      number: "5195",
      message: "DIRECTION CAN NOT BE JUDGED",
      description: `For a one-contact input touch sensor used with the tool compensation amount measurement value direct input B function, stored pulse directions are not unified. Alternatively, the tool is moving along two axes (X-axis and Z-axis) simultaneously`
    });
  }
}

/**
 * ILLEGAL AXIS OPERATION
 *
 * During HPCC or during the execution of a 5-axis-related function, an unavailable function was used
 */
export class A5196_IllegalAxisOperation extends RuntimeAlarm {
  constructor() {
    super({
      number: "5196",
      message: "ILLEGAL AXIS OPERATION",
      description: `During HPCC or during the execution of a 5-axis-related function, an unavailable function was used`
    });
  }
}

/**
 * REFERENCE POINT ADJUSTMENT MODE
 *
 * In case of distance coded linear scale I/F, the reference point auto setting parameter (No.1819#2) is set to "1". Move the machine to reference position by manual operation and execute manual reference return
 */
export class A5220_ReferencePointAdjustmentMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "5220",
      message: "REFERENCE POINT ADJUSTMENT MODE",
      description: `In case of distance coded linear scale I/F, the reference point auto setting parameter (No.1819#2) is set to "1". Move the machine to reference position by manual operation and execute manual reference return`
    });
  }
}

/**
 * G41/G42 NOT ALLOWED IN MDI MODE
 *
 * Cutter compensation or tool nose radius compensation was specified in MDI mode. (Depending on the setting of the parameter MCR (No. 5008#4))
 */
export class A5257_G41G42NotAllowedInMdiMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "5257",
      message: "G41/G42 NOT ALLOWED IN MDI MODE",
      description: `Cutter compensation or tool nose radius compensation was specified in MDI mode. (Depending on the setting of the parameter MCR (No. 5008#4))`
    });
  }
}

/**
 * TOUCH PANEL ERROR
 *
 * The touch panel is not connected correctly, or the touch panel cannot be initialized when the power is turned on. Correct the cause then turn on the power again
 */
export class A5303_TouchPanelError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5303",
      message: "TOUCH PANEL ERROR",
      description: `The touch panel is not connected correctly, or the touch panel cannot be initialized when the power is turned on. Correct the cause then turn on the power again`
    });
  }
}

/**
 * ILLEGAL SPINDLE NUMBER
 *
 * In a spindle select function by address P for a multiple spindle control, (No. 3702#1) is 1
 */
export class A5305_IllegalSpindleNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "5305",
      message: "ILLEGAL SPINDLE NUMBER",
      description: `In a spindle select function by address P for a multiple spindle control, (No. 3702#1) is 1`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G10 L75/76/77
 *
 * One of formats in G10L75, G10L76, or G10L77 to G11 commands is in error, or the command value is out of data range. Modify the program
 */
export class A5312_IllegalCommandInG10L757677 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5312",
      message: "ILLEGAL COMMAND IN G10 L75/76/77",
      description: `One of formats in G10L75, G10L76, or G10L77 to G11 commands is in error, or the command value is out of data range. Modify the program`
    });
  }
}

/**
 * TOOL TYPE NUMBER NOT FOUND
 *
 * A tool with the specified tool-type number could not be found. Modify the program or register the tool
 */
export class A5316_ToolTypeNumberNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "5316",
      message: "TOOL TYPE NUMBER NOT FOUND",
      description: `A tool with the specified tool-type number could not be found. Modify the program or register the tool`
    });
  }
}

/**
 * ALL TOOL LIFE IS OVER
 *
 * The lives of all tools with the specified tool-type number have expired. Replace the tool
 */
export class A5317_AllToolLifeIsOver extends RuntimeAlarm {
  constructor() {
    super({
      number: "5317",
      message: "ALL TOOL LIFE IS OVER",
      description: `The lives of all tools with the specified tool-type number have expired. Replace the tool`
    });
  }
}

/**
 * DIA./RAD. MODE CAN'T BE SWITCHED
 *
 * In any of the following states, diameter/radius specification was switched:
 */
export class A5320_DiameterRadiusModeCannotBeSwitched extends RuntimeAlarm {
  constructor() {
    super({
      number: "5320",
      message: "DIA./RAD. MODE CAN'T BE SWITCHED ",
      description: `In any of the following states, diameter/radius specification was switched:`
    });
  }
}

/**
 * M98 AND NC COMMAND IN SAME BLOCK
 *
 * A subprogram call which is not a single block was commanded during canned cycle mode
 */
export class A5329_M98AndNcCommandInSameBlock extends RuntimeAlarm {
  constructor() {
    super({
      number: "5329",
      message: "M98 AND NC COMMAND IN SAME BLOCK",
      description: `A subprogram call which is not a single block was commanded during canned cycle mode`
    });
  }
}

/**
 * TOOL INTERFERENCE CHECK ERROR
 *
 * This alarm is issued when interference with another tool is caused by a data modification based on G10 data input or file reading or when an attempt is made to modify the tool figure data of a tool registered in the cartridge
 */
export class A5360_ToolInterferenceCheckError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5360",
      message: "TOOL INTERFERENCE CHECK ERROR",
      description: `This alarm is issued when interference with another tool is caused by a data modification based on G10 data input or file reading or when an attempt is made to modify the tool figure data of a tool registered in the cartridge`
    });
  }
}

/**
 * ILLEGAL MAGAZINE DATA
 *
 * Tools stored in the cartridge are interfering with each other. Reregister the tools in the cartridge, or modify the tool management data or tool figure data. If this alarm is issued, no tool interference check is made when tools are registered in the cartridge management table. Moreover, empty pot search operation does not operate normally. If this alarm is issued, the power must be turned off before operation is continued
 */
export class A5361_IllegalMagazineData extends RuntimeAlarm {
  constructor() {
    super({
      number: "5361",
      message: "ILLEGAL MAGAZINE DATA",
      description: `Tools stored in the cartridge are interfering with each other. Reregister the tools in the cartridge, or modify the tool management data or tool figure data. If this alarm is issued, no tool interference check is made when tools are registered in the cartridge management table. Moreover, empty pot search operation does not operate normally. If this alarm is issued, the power must be turned off before operation is continued`
    });
  }
}

/**
 * G41.3 ILLEGAL START_UP
 *
 * is 0 or 180 degrees at the time of startup
 */
export class A5408_G41_3IllegalStart_up extends RuntimeAlarm {
  constructor() {
    super({
      number: "5408",
      message: "G41.3 ILLEGAL START_UP",
      description: `is 0 or 180 degrees at the time of startup`
    });
  }
}

/**
 * ILLEGAL PARAMETER IN G43.4/G43.5
 *
 * A parameter related to tool center point control is illegal
 */
export class A5420_IllegalParameterInG43_4G43_5 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5420",
      message: "ILLEGAL PARAMETER IN G43.4/G43.5",
      description: `A parameter related to tool center point control is illegal`
    });
  }
}

/**
 * ILLEGAL COMMAND IN G43.4/G43.5
 *
 * An illegal command was specified in tool center point control. axis was not perpendicular to the plane
 */
export class A5421_IllegalCommandInG43_4G43_5 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5421",
      message: "ILLEGAL COMMAND IN G43.4/G43.5",
      description: `An illegal command was specified in tool center point control. axis was not perpendicular to the plane`
    });
  }
}

/**
 * EXCESS VELOCITY IN G43.4/G43.5
 *
 * An attempt was made to make a movement at an axis feedrate exceeding the maximum cutting feedrate by tool center point control
 */
export class A5422_ExcessVelocityInG43_4G43_5 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5422",
      message: "EXCESS VELOCITY IN G43.4/G43.5",
      description: `An attempt was made to make a movement at an axis feedrate exceeding the maximum cutting feedrate by tool center point control`
    });
  }
}

/**
 * ILLEGAL OFFSET VALUE
 *
 * The offset number is incorrect
 */
export class A5425_IllegalOffsetValue extends RuntimeAlarm {
  constructor() {
    super({
      number: "5425",
      message: "ILLEGAL OFFSET VALUE",
      description: `The offset number is incorrect`
    });
  }
}

/**
 * ILLEGAL COMMAND IN 3-D CIR
 *
 * In a modal state in which three-dimensional circular interpolation cannot be specified, a three-dimensional circular interpolation (G02.4/G03.4) is specified. Alternatively, in three-dimensional circular interpolation mode, a code that cannot be specified is specified
 */
export class A5430_IllegalCommandIn3DCir extends RuntimeAlarm {
  constructor() {
    super({
      number: "5430",
      message: "ILLEGAL COMMAND IN 3-D CIR",
      description: `In a modal state in which three-dimensional circular interpolation cannot be specified, a three-dimensional circular interpolation (G02.4/G03.4) is specified. Alternatively, in three-dimensional circular interpolation mode, a code that cannot be specified is specified`
    });
  }
}

/**
 * G02.4/G03.4 FORMAT ERROR
 *
 * A three-dimensional circular interpolation command (G02.4/G03.4) is incorrect
 */
export class A5432_G02_4G03_4FormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5432",
      message: "G02.4/G03.4 FORMAT ERROR",
      description: `A three-dimensional circular interpolation command (G02.4/G03.4) is incorrect`
    });
  }
}

/**
 * MANUAL INTERVENTION IN G02.4/G03.4 (ABS ON)
 *
 * In three-dimensional circular interpolation mode (G02.4/G03.4), manual intervention was made when the manual absolute switch was on
 */
export class A5433_ManualInterventionInG02_4G03_4AbsOn extends RuntimeAlarm {
  constructor() {
    super({
      number: "5433",
      message: "MANUAL INTERVENTION IN G02.4/G03.4 (ABS ON)",
      description: `In three-dimensional circular interpolation mode (G02.4/G03.4), manual intervention was made when the manual absolute switch was on`
    });
  }
}

/**
 * PARAMETER OUT OF RANGE (TLAC)
 *
 * Illegal parameter setting. (Set value is out of range.)
 */
export class A5435_ParameterOutOfRangeTlac extends RuntimeAlarm {
  constructor() {
    super({
      number: "5435",
      message: "PARAMETER OUT OF RANGE (TLAC)",
      description: `Illegal parameter setting. (Set value is out of range.)`
    });
  }
}

/**
 * ILLEGAL PARAMETER SETTING OF ROTARY AXIS(TLAC)
 *
 * Illegal parameter setting. (axis of rotation setting)
 */
export class A5436_IllegalParameterSettingOfRotaryAxisTlac extends RuntimeAlarm {
  constructor() {
    super({
      number: "5436",
      message: "ILLEGAL PARAMETER SETTING OF ROTARY AXIS(TLAC)",
      description: `Illegal parameter setting. (axis of rotation setting)`
    });
  }
}

/**
 * ILLEGAL PARAMETER SETTING OF MASTER ROTARY AXIS(TLAC)
 *
 * Illegal parameter setting. (master axis of rotation setting)
 */
export class A5437_IllegalParameterSettingOfMasterRotaryAxisTlac extends RuntimeAlarm {
  constructor() {
    super({
      number: "5437",
      message: "ILLEGAL PARAMETER SETTING OF MASTER ROTARY AXIS(TLAC)",
      description: `Illegal parameter setting. (master axis of rotation setting)`
    });
  }
}

/**
 * CAN NOT COMMAND MOTION IN G39
 *
 * Corner circular interpolation (G39) of cutter compensation or tool nose radius compensation is not specified alone but is specified with a move command
 */
export class A5445_CanNotCommandMotionInG39 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5445",
      message: "CAN NOT COMMAND MOTION IN G39",
      description: `Corner circular interpolation (G39) of cutter compensation or tool nose radius compensation is not specified alone but is specified with a move command`
    });
  }
}

/**
 * NO AVOIDANCE AT G41/G42
 *
 * Because there is no interference evade vector, the interference check evade function of cutter compensation or tool nose radius compensation cannot evade interference
 */
export class A5446_NoAvoidanceAtG41G42 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5446",
      message: "NO AVOIDANCE AT G41/G42",
      description: `Because there is no interference evade vector, the interference check evade function of cutter compensation or tool nose radius compensation cannot evade interference`
    });
  }
}

/**
 * DANGEROUS AVOIDANCE AT G41/G42
 *
 * The interference check evade function of cutter compensation or tool nose radius compensation determines that an evade operation will lead to danger
 */
export class A5447_DangerousAvoidanceAtG41G42 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5447",
      message: "DANGEROUS AVOIDANCE AT G41/G42",
      description: `The interference check evade function of cutter compensation or tool nose radius compensation determines that an evade operation will lead to danger`
    });
  }
}

/**
 * INTERFERENCE TO AVD. AT G41/G42
 *
 * In the interference check evade function of cutter compensation or tool nose radius compensation, a further interference occurs for an already created interference evade vector
 */
export class A5448_InterferenceToAdvanceAtG41G42 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5448",
      message: "INTERFERENCE TO AVD. AT G41/G42",
      description: `In the interference check evade function of cutter compensation or tool nose radius compensation, a further interference occurs for an already created interference evade vector`
    });
  }
}

/**
 * TOO MANY G68.2 NESTING
 *
 * Tilted working plane command G68.2 was specified more than once. To perform another coordinate conversion, perform cancellation, then specify the coordinate conversion
 */
export class A5456_TooManyG68_2Nesting extends RuntimeAlarm {
  constructor() {
    super({
      number: "5456",
      message: "TOO MANY G68.2 NESTING",
      description: `Tilted working plane command G68.2 was specified more than once. To perform another coordinate conversion, perform cancellation, then specify the coordinate conversion`
    });
  }
}

/**
 * G68.2 FORMAT ERROR
 *
 * A G68.2 format error occurred
 */
export class A5457_G68_2FormatError extends RuntimeAlarm {
  constructor() {
    super({
      number: "5457",
      message: "G68.2 FORMAT ERROR",
      description: `A G68.2 format error occurred`
    });
  }
}

/**
 * ILLEGAL USE OF G53.1
 *
 * G53.1 was specified before the G68.2 command
 */
export class A5458_IllegalUseOfG53_1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5458",
      message: "ILLEGAL USE OF G53.1",
      description: `G53.1 was specified before the G68.2 command`
    });
  }
}

/**
 * MACHINE PARAMETER INCORRECT
 *
 * 5-axis machining (type 2) is specified when the programming coordinate system is the workpiece coordinate system
 */
export class A5459_MachineParameterIncorrect extends RuntimeAlarm {
  constructor() {
    super({
      number: "5459",
      message: "MACHINE PARAMETER INCORRECT",
      description: `5-axis machining (type 2) is specified when the programming coordinate system is the workpiece coordinate system`
    });
  }
}

/**
 * ILLEGAL USE OF TRC FOR 5-AXIS MACHINE
 *
 * other is canceled earlier
 */
export class A5460_IllegalUseOfTrcFor5AxisMachine extends RuntimeAlarm {
  constructor() {
    super({
      number: "5460",
      message: "ILLEGAL USE OF TRC FOR 5-AXIS MACHINE",
      description: `other is canceled earlier`
    });
  }
}

/**
 * ILLEGAL USE OF G41.2/G42.2/G41.5/G42.5
 *
 * A move command other than G00 or G01 was performed during cutter compensation for 5-axis machining in a mixed-type machine
 */
export class A5461_IllegalUseOfG41_2G42_2G41_5G42_5 extends RuntimeAlarm {
  constructor() {
    super({
      number: "5461",
      message: "ILLEGAL USE OF G41.2/G42.2/G41.5/G42.5",
      description: `A move command other than G00 or G01 was performed during cutter compensation for 5-axis machining in a mixed-type machine`
    });
  }
}

/**
 * ILLEGAL PARAMETER IN TRC FOR 5-AXIS MACHINE
 *
 * A parameter related to cutter compensation for 5-axis machining is illegal. parameter No. 19501, and parameter Nos. No.1671 and 1672
 */
export class A5463_IllegalParameterInTrcFor5AxisMachine extends RuntimeAlarm {
  constructor() {
    super({
      number: "5463",
      message: "ILLEGAL PARAMETER IN TRC FOR 5-AXIS MACHINE",
      description: `A parameter related to cutter compensation for 5-axis machining is illegal. parameter No. 19501, and parameter Nos. No.1671 and 1672`
    });
  }
}

/**
 * PARAMETER ENABLE SWITCH ON
 *
 * The parameter setting is enabled (PWE, one bit of parameter No. 8000 is set to “1”). To set the parameter, turn this parameter ON. Otherwise, set to OFF
 */
export class SW0100_ParameterEnableSwitchOn extends RuntimeAlarm {
  constructor() {
    super({
      number: "SW0100",
      message: "PARAMETER ENABLE SWITCH ON",
      description: `The parameter setting is enabled (PWE, one bit of parameter No. 8000 is set to “1”). To set the parameter, turn this parameter ON. Otherwise, set to OFF`
    });
  }
}

/**
 * SYNC ALIGNMENT ERROR
 *
 * In feed axis synchronization control, the amount of compensation for synchronization exceeded the parameter (No. 8325) setting value. This alarm occurs only for a slave axis
 */
export class SV0001_SyncAlignmentError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0001",
      message: "SYNC ALIGNMENT ERROR",
      description: `In feed axis synchronization control, the amount of compensation for synchronization exceeded the parameter (No. 8325) setting value. This alarm occurs only for a slave axis`
    });
  }
}

/**
 * SYNC EXCESS ERROR ALARM 2
 *
 * In feed axis synchronization control, the amount of synchronization error exceeded the parameter (No. 8332) setting value. When the synchronization is not completed after power-up, the determination is made by the parameter value (No. 8332) multiplied by the parameter (No. 8330) multiplier. This alarm occurs only for a slave axis only
 */
export class SV0002_SyncExcessErrorAlarm2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0002",
      message: "SYNC EXCESS ERROR ALARM 2",
      description: `In feed axis synchronization control, the amount of synchronization error exceeded the parameter (No. 8332) setting value. When the synchronization is not completed after power-up, the determination is made by the parameter value (No. 8332) multiplied by the parameter (No. 8330) multiplier. This alarm occurs only for a slave axis only`
    });
  }
}

/**
 * SYNCHRONOUS/COMPOSITE/SUPERI MPOSED CONTROL MODE CAN'T BE CONTINUED
 *
 * Since as axis in synchronization, composition, or superposition mode caused a servo alarm, the mode could not be continued, If one of the axes in a mode causes a servo alarm, all axes relating to the axis enter the servo-off state. This alarm is generated to enable the cause of the servo-off state to be checked
 */
export class SV0003_SynchronousCompositeSuperiMposedControlModeCannotBeContinued extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0003",
      message: "SYNCHRONOUS/COMPOSITE/SUPERI MPOSED CONTROL MODE CAN'T BE CONTINUED",
      description: `Since as axis in synchronization, composition, or superposition mode caused a servo alarm, the mode could not be continued, If one of the axes in a mode causes a servo alarm, all axes relating to the axis enter the servo-off state. This alarm is generated to enable the cause of the servo-off state to be checked`
    });
  }
}

/**
 * EXCESS ERROR (G31)
 *
 * The amount of positional deviation during torque limit skip command operation exceeded the limit value of the parameter No.6287
 */
export class SV0004_ExcessErrorG31 extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0004",
      message: "EXCESS ERROR (G31)",
      description: `The amount of positional deviation during torque limit skip command operation exceeded the limit value of the parameter No.6287`
    });
  }
}

/**
 * SYNC EXCESS ERROR (MCN)
 *
 * In feed axis synchronization control, for synchronization, the difference value of the machine coordinate between a master and slave axes exceeded the parameter (No. 8314) setting value. This alarm occurs for a master or slave axis
 */
export class SV0005_SyncExcessErrorMcn extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0005",
      message: "SYNC EXCESS ERROR (MCN)",
      description: `In feed axis synchronization control, for synchronization, the difference value of the machine coordinate between a master and slave axes exceeded the parameter (No. 8314) setting value. This alarm occurs for a master or slave axis`
    });
  }
}

/**
 * APC ALARM: COMMUNICATION ERROR
 *
 * Since the absolute-position detector caused a communication error, the correct machine position could not be obtained. (data transfer error) The absolute-position detector, cable, or servo interface module is thought to be defective
 */
export class SV0301_ApcAlarmCommunicationError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0301",
      message: "APC ALARM: COMMUNICATION ERROR",
      description: `Since the absolute-position detector caused a communication error, the correct machine position could not be obtained. (data transfer error) The absolute-position detector, cable, or servo interface module is thought to be defective`
    });
  }
}

/**
 * APC ALARM: OVER TIME ERROR
 *
 * Since the absolute-position detector caused an overtime error, the correct machine position could not be obtained. (data transfer error) The absolute-position detector, cable, or servo interface module is thought to be defective
 */
export class SV0302_ApcAlarmOverTimeError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0302",
      message: "APC ALARM: OVER TIME ERROR",
      description: `Since the absolute-position detector caused an overtime error, the correct machine position could not be obtained. (data transfer error) The absolute-position detector, cable, or servo interface module is thought to be defective`
    });
  }
}

/**
 * APC ALARM: FRAMING ERROR
 *
 * Since the absolute-position detector caused a framing error, the correct machine position could not be obtained. (data transfer error) The absolute-position detector, cable, or servo interface module is thought to be defective
 */
export class SV0303_ApcAlarmFramingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0303",
      message: "APC ALARM: FRAMING ERROR",
      description: `Since the absolute-position detector caused a framing error, the correct machine position could not be obtained. (data transfer error) The absolute-position detector, cable, or servo interface module is thought to be defective`
    });
  }
}

/**
 * APC ALARM: PARITY ERROR
 *
 * Since the absolute-position detector caused a parity error, the correct machine position could not be obtained. (data transfer error) The absolute-position detector, cable, or servo interface module is thought to be defective
 */
export class SV0304_ApcAlarmParityError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0304",
      message: "APC ALARM: PARITY ERROR",
      description: `Since the absolute-position detector caused a parity error, the correct machine position could not be obtained. (data transfer error) The absolute-position detector, cable, or servo interface module is thought to be defective`
    });
  }
}

/**
 * APC ALARM: PULSE ERROR
 *
 * Since the absolute-position detector caused a pulse error, the correct machine position could not be obtained. The absolute-position detector, or cable is thought to be defective
 */
export class SV0305_ApcAlarmPulseError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0305",
      message: "APC ALARM: PULSE ERROR",
      description: `Since the absolute-position detector caused a pulse error, the correct machine position could not be obtained. The absolute-position detector, or cable is thought to be defective`
    });
  }
}

/**
 * APC ALARM: OVER FLOW ERROR
 *
 * Since the amount of positional deviation overflowed, the correct machine position could not be obtained. Check to see the parameter No. 2084 or No. 2085
 */
export class SV0306_ApcAlarmOverFlowError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0306",
      message: "APC ALARM: OVER FLOW ERROR",
      description: `Since the amount of positional deviation overflowed, the correct machine position could not be obtained. Check to see the parameter No. 2084 or No. 2085`
    });
  }
}

/**
 * APC ALARM: MOVEMENT EXCESS ERROR
 *
 * Since the machine moved excessively, the correct machine position could not be obtained
 */
export class SV0307_ApcAlarmMovementExcessError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0307",
      message: "APC ALARM: MOVEMENT EXCESS ERROR",
      description: `Since the machine moved excessively, the correct machine position could not be obtained`
    });
  }
}

/**
 * ABNORMAL CHECKSUM(INT)
 *
 * The checksum alarm occurred on the built-in Pulsecoder
 */
export class SV0360_AbnormalChecksumInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0360",
      message: "ABNORMAL CHECKSUM(INT)",
      description: `The checksum alarm occurred on the built-in Pulsecoder`
    });
  }
}

/**
 * ABNORMAL PHASE DATA(INT)
 *
 * The phase data abnormal alarm occurred on the built-in Pulsecoder
 */
export class SV0361_AbnormalPhaseDataInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0361",
      message: "ABNORMAL PHASE DATA(INT)",
      description: `The phase data abnormal alarm occurred on the built-in Pulsecoder`
    });
  }
}

/**
 * ABNORMAL REV. DATA(INT)
 *
 * The speed count abnormal alarm occurred on the built-in Pulsecoder
 */
export class SV0362_AbnormalRevolutionDataInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0362",
      message: "ABNORMAL REV. DATA(INT)",
      description: `The speed count abnormal alarm occurred on the built-in Pulsecoder`
    });
  }
}

/**
 * ABNORMAL CLOCK(INT)
 *
 * The clock alarm occurred on the built-in Pulsecoder
 */
export class SV0363_AbnormalClockInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0363",
      message: "ABNORMAL CLOCK(INT)",
      description: `The clock alarm occurred on the built-in Pulsecoder`
    });
  }
}

/**
 * SOFT PHASE ALARM(INT)
 *
 * A digital servo soft detected an abnormality on the built in Pulsecoder
 */
export class SV0364_SoftPhaseAlarmInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0364",
      message: "SOFT PHASE ALARM(INT)",
      description: `A digital servo soft detected an abnormality on the built in Pulsecoder`
    });
  }
}

/**
 * BROKEN LED(INT)
 *
 * The digital servo software detected abnormal data on the built-in Pulsecoder
 */
export class SV0365_BrokenLedInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0365",
      message: "BROKEN LED(INT)",
      description: `The digital servo software detected abnormal data on the built-in Pulsecoder`
    });
  }
}

/**
 * PULSE MISS(INT)
 *
 * A pulse error occurred on the built-in Pulsecoder
 */
export class SV0366_PulseMissInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0366",
      message: "PULSE MISS(INT)",
      description: `A pulse error occurred on the built-in Pulsecoder`
    });
  }
}

/**
 * COUNT MISS(INT)
 *
 * A count error occurred on the built-in Pulsecoder
 */
export class SV0367_CountMissInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0367",
      message: "COUNT MISS(INT)",
      description: `A count error occurred on the built-in Pulsecoder`
    });
  }
}

/**
 * SERIAL DATA ERROR(INT)
 *
 * The communications data could not be received from the built-in Pulsecoder
 */
export class SV0368_SerialDataErrorInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0368",
      message: "SERIAL DATA ERROR(INT)",
      description: `The communications data could not be received from the built-in Pulsecoder`
    });
  }
}

/**
 * DATA TRANS. ERROR(INT)
 *
 * A CRC error or stop bit error occurred in the communications data from the built-in Pulsecoder
 */
export class SV0369_DataTransferErrorInt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0369",
      message: "DATA TRANS. ERROR(INT)",
      description: `A CRC error or stop bit error occurred in the communications data from the built-in Pulsecoder`
    });
  }
}

/**
 * BROKEN LED(EXT)
 *
 * Separate detector error
 */
export class SV0380_BrokenLedExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0380",
      message: "BROKEN LED(EXT)",
      description: `Separate detector error`
    });
  }
}

/**
 * ABNORMAL PHASE (EXT)
 *
 * An abnormal alarm in the position data occurred on the separate linear scale
 */
export class SV0381_AbnormalPhaseExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0381",
      message: "ABNORMAL PHASE (EXT)",
      description: `An abnormal alarm in the position data occurred on the separate linear scale`
    });
  }
}

/**
 * COUNT MISS(EXT)
 *
 * A count error occurred on the separate detector
 */
export class SV0382_CountMissExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0382",
      message: "COUNT MISS(EXT)",
      description: `A count error occurred on the separate detector`
    });
  }
}

/**
 * PULSE MISS(EXT)
 *
 * A pulse error occurred on the separate detector
 */
export class SV0383_PulseMissExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0383",
      message: "PULSE MISS(EXT)",
      description: `A pulse error occurred on the separate detector`
    });
  }
}

/**
 * SOFT PHASE ALARM(EXT)
 *
 * The digital servo software detected abnormal data on the separate detector
 */
export class SV0384_SoftPhaseAlarmExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0384",
      message: "SOFT PHASE ALARM(EXT)",
      description: `The digital servo software detected abnormal data on the separate detector`
    });
  }
}

/**
 * SERIAL DATA ERROR(EXT)
 *
 * The communications data could not be received from the separate detector
 */
export class SV0385_SerialDataErrorExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0385",
      message: "SERIAL DATA ERROR(EXT)",
      description: `The communications data could not be received from the separate detector`
    });
  }
}

/**
 * DATA TRANS. ERROR(EXT)
 *
 * A CRC error or stop bit error occurred in the communications data from the standalone detector
 */
export class SV0386_DataTransferErrorExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0386",
      message: "DATA TRANS. ERROR(EXT)",
      description: `A CRC error or stop bit error occurred in the communications data from the standalone detector`
    });
  }
}

/**
 * ABNORMAL ENCODER(EXT)
 *
 * An abnormality occurred on a separate detector. For more information, contact the scale manufacturer
 */
export class SV0387_AbnormalEncoderExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0387",
      message: "ABNORMAL ENCODER(EXT)",
      description: `An abnormality occurred on a separate detector. For more information, contact the scale manufacturer`
    });
  }
}

/**
 * IMPROPER V_READY OFF
 *
 * Although the ready signal (PRDY) of the position control was ON, the ready signal (VRDY) of the velocity control was OFF
 */
export class SV0401_ImproperV_readyOff extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0401",
      message: "IMPROPER V_READY OFF",
      description: `Although the ready signal (PRDY) of the position control was ON, the ready signal (VRDY) of the velocity control was OFF`
    });
  }
}

/**
 * IMPROPER V_READY ON
 *
 * Although the ready signal (PRDY) of the position control was OFF, the ready signal (VRDY) of the velocity control was ON
 */
export class SV0404_ImproperV_readyOn extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0404",
      message: "IMPROPER V_READY ON",
      description: `Although the ready signal (PRDY) of the position control was OFF, the ready signal (VRDY) of the velocity control was ON`
    });
  }
}

/**
 * EXCESS ERROR
 *
 * The difference value of the amount of positional deviation for the synchronization axis exceeded the setting value. (during synchronization control only)
 */
export class SV0407_ExcessError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0407",
      message: "EXCESS ERROR",
      description: `The difference value of the amount of positional deviation for the synchronization axis exceeded the setting value. (during synchronization control only)`
    });
  }
}

/**
 * DETECT ABNORMAL TORQUE
 *
 * An abnormal load was detected on the servo motor, or during Cs axis or spindle positioning. The alarm can be canceled by RESET
 */
export class SV0409_DetectAbnormalTorque extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0409",
      message: "DETECT ABNORMAL TORQUE",
      description: `An abnormal load was detected on the servo motor, or during Cs axis or spindle positioning. The alarm can be canceled by RESET`
    });
  }
}

/**
 * EXCESS ERROR (STOP)
 *
 * The amount of positional deviation during stopping exceeded the parameter (No. 1829) setting value. In a dual check safety function, an alarm occurs during safety monitoring (when the safety monitoring start signal SEV or SEP is 1), but the alarm cannot be canceled by a reset
 */
export class SV0410_ExcessErrorStop extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0410",
      message: "EXCESS ERROR (STOP)",
      description: `The amount of positional deviation during stopping exceeded the parameter (No. 1829) setting value. In a dual check safety function, an alarm occurs during safety monitoring (when the safety monitoring start signal SEV or SEP is 1), but the alarm cannot be canceled by a reset`
    });
  }
}

/**
 * EXCESS ERROR (MOVING)
 *
 * The amount of positional deviation during traveling became excessive than the parameter setting value. (Generally, in the parameter No.1828, the dual check safety function during safety monitoring (when he safety monitoring start signal SEV or SEP is 1) is the parameter No. 1838.) In a dual check safety function, an alarm occurs during safety monitoring, but the alarm cannot be canceled by a reset
 */
export class SV0411_ExcessErrorMoving extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0411",
      message: "EXCESS ERROR (MOVING)",
      description: `The amount of positional deviation during traveling became excessive than the parameter setting value. (Generally, in the parameter No.1828, the dual check safety function during safety monitoring (when he safety monitoring start signal SEV or SEP is 1) is the parameter No. 1838.) In a dual check safety function, an alarm occurs during safety monitoring, but the alarm cannot be canceled by a reset`
    });
  }
}

/**
 * LSI OVERFLOW
 *
 * The counter for the amount of positional deviation overflowed
 */
export class SV0413_LsiOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0413",
      message: "LSI OVERFLOW",
      description: `The counter for the amount of positional deviation overflowed`
    });
  }
}

/**
 * MOTION VALUE OVERFLOW
 *
 * The velocity exceeding the travel velocity limit was commanded
 */
export class SV0415_MotionValueOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0415",
      message: "MOTION VALUE OVERFLOW",
      description: `The velocity exceeding the travel velocity limit was commanded`
    });
  }
}

/**
 * ILL DGTL SERVO PARAMETER
 *
 * A digital serve parameter setting is incorrect
 */
export class SV0417_IllDgtlServoParameter extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0417",
      message: "ILL DGTL SERVO PARAMETER",
      description: `A digital serve parameter setting is incorrect`
    });
  }
}

/**
 * SYNC TORQUE EXCESS
 *
 * In feed axis synchronization control, for synchronization, the difference value of torque between a master and slave axes exceeded the parameter (No. 2031) setting value. This alarm occurs for a master axis
 */
export class SV0420_SyncTorqueExcess extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0420",
      message: "SYNC TORQUE EXCESS",
      description: `In feed axis synchronization control, for synchronization, the difference value of torque between a master and slave axes exceeded the parameter (No. 2031) setting value. This alarm occurs for a master axis`
    });
  }
}

/**
 * EXCESS ERROR(SEMI-FULL)
 *
 * The difference between the feedback from the semi and full sides exceeded the setting of parameter No.1729
 */
export class SV0421_ExcessErrorSemiFull extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0421",
      message: "EXCESS ERROR(SEMI-FULL)",
      description: `The difference between the feedback from the semi and full sides exceeded the setting of parameter No.1729`
    });
  }
}

/**
 * EXCESS VELOCITY IN TORQUE
 *
 * In torque control, the commanded permissible velocity was exceeded
 */
export class SV0422_ExcessVelocityInTorque extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0422",
      message: "EXCESS VELOCITY IN TORQUE",
      description: `In torque control, the commanded permissible velocity was exceeded`
    });
  }
}

/**
 * EXCESS ERROR IN TORQUE
 *
 * In torque control, the total permissible move value specified as a parameter was exceeded
 */
export class SV0423_ExcessErrorInTorque extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0423",
      message: "EXCESS ERROR IN TORQUE",
      description: `In torque control, the total permissible move value specified as a parameter was exceeded`
    });
  }
}

/**
 * SV MOTOR OVERHEAT
 *
 * The servo motor has overheated
 */
export class SV0430_SvMotorOverheat extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0430",
      message: "SV MOTOR OVERHEAT",
      description: `The servo motor has overheated`
    });
  }
}

/**
 * CNV. OVERLOAD
 *
 * PSM : Overheat  series SVU : Overheat
 */
export class SV0431_ConverterOverload extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0431",
      message: "CNV. OVERLOAD",
      description: `PSM : Overheat  series SVU : Overheat`
    });
  }
}

/**
 * CNV. LOW VOLT CONTROL
 *
 * PSM : The control power supply voltage has dropped. PSMR : The control power supply voltage has dropped.  series SVU : The control power supply voltage has dropped
 */
export class SV0432_ConverterLowVoltControl extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0432",
      message: "CNV. LOW VOLT CONTROL",
      description: `PSM : The control power supply voltage has dropped. PSMR : The control power supply voltage has dropped.  series SVU : The control power supply voltage has dropped`
    });
  }
}

/**
 * CNV. LOW VOLT DC LINK
 *
 * PSM : Low DC link voltage PSMR : Low DC link voltage  series SVU : Low DC link voltage  series SVU : Low DC link voltage
 */
export class SV0433_ConverterLowVoltDcLink extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0433",
      message: "CNV. LOW VOLT DC LINK",
      description: `PSM : Low DC link voltage PSMR : Low DC link voltage  series SVU : Low DC link voltage  series SVU : Low DC link voltage`
    });
  }
}

/**
 * INV. LOW VOLT CONTROL
 *
 * SVM : Low control power voltage
 */
export class SV0434_InverterLowVoltControl extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0434",
      message: "INV. LOW VOLT CONTROL",
      description: `SVM : Low control power voltage`
    });
  }
}

/**
 * INV. LOW VOLT DC LINK
 *
 * SVM : Low DC link voltage
 */
export class SV0435_InverterLowVoltDcLink extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0435",
      message: "INV. LOW VOLT DC LINK",
      description: `SVM : Low DC link voltage`
    });
  }
}

/**
 * SOFTTHERMAL(OVC)
 *
 * The digital servo software detected a software thermal (OVC)
 */
export class SV0436_SoftthermalOvc extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0436",
      message: "SOFTTHERMAL(OVC)",
      description: `The digital servo software detected a software thermal (OVC)`
    });
  }
}

/**
 * CNV. OVERCURRENT POWER
 *
 * PSM : Overcurrent on input circuit section
 */
export class SV0437_ConverterOvercurrentPowerer extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0437",
      message: "CNV. OVERCURRENT POWER",
      description: `PSM : Overcurrent on input circuit section`
    });
  }
}

/**
 * INV. ABNORMAL CURRENT
 *
 * SVM : Motor overcurrent  series SVU : Motor overcurrent  series SVU : Motor overcurrent
 */
export class SV0438_InverterAbnormalCurrent extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0438",
      message: "INV. ABNORMAL CURRENT",
      description: `SVM : Motor overcurrent  series SVU : Motor overcurrent  series SVU : Motor overcurrent`
    });
  }
}

/**
 * CNV. OVER VOLT DC LINK
 *
 * PSM : The DC link voltage is too high. PSMR : The DC link voltage is too high.  series SVU : The DC link voltage is too high
 */
export class SV0439_ConverterOverVoltDcLink extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0439",
      message: "CNV. OVER VOLT DC LINK",
      description: `PSM : The DC link voltage is too high. PSMR : The DC link voltage is too high.  series SVU : The DC link voltage is too high`
    });
  }
}

/**
 * CNV. EX DECELERATION POW
 *
 * PSMR : Excessive generative discharge  series SVU : Excessive generative discharge, or abnormal error in generative power circuit
 */
export class SV0440_ConverterExDecelerationPower extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0440",
      message: "CNV. EX DECELERATION POW",
      description: `PSMR : Excessive generative discharge  series SVU : Excessive generative discharge, or abnormal error in generative power circuit`
    });
  }
}

/**
 * ABNORMAL CURRENT OFFSET
 *
 * The digital servo software detected an abnormality in the motor current detection circuit
 */
export class SV0441_AbnormalCurrentOffset extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0441",
      message: "ABNORMAL CURRENT OFFSET",
      description: `The digital servo software detected an abnormality in the motor current detection circuit`
    });
  }
}

/**
 * CNV. CHARGE FAILURE
 *
 * PSM : The spare charge circuit for the DC link is abnormal. PSMR : The spare charge circuit for the DC link is abnormal
 */
export class SV0442_ConverterChargeFailure extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0442",
      message: "CNV. CHARGE FAILURE",
      description: `PSM : The spare charge circuit for the DC link is abnormal. PSMR : The spare charge circuit for the DC link is abnormal`
    });
  }
}

/**
 * CNV. COOLING FAN FAILURE
 *
 * PSM : Internal cooling fan failure. PSMR : Internal cooling fan failure.  series SVU : Internal cooling fan failure
 */
export class SV0443_ConverterCoolingFanFailure extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0443",
      message: "CNV. COOLING FAN FAILURE",
      description: `PSM : Internal cooling fan failure. PSMR : Internal cooling fan failure.  series SVU : Internal cooling fan failure`
    });
  }
}

/**
 * INV. COOLING FAN FAILURE
 *
 * SVM : Internal cooling fan failure
 */
export class SV0444_InverterCoolingFanFailure extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0444",
      message: "INV. COOLING FAN FAILURE",
      description: `SVM : Internal cooling fan failure`
    });
  }
}

/**
 * SOFT DISCONNECT ALARM
 *
 * The digital servo software detected a disconnected Pulsecoder
 */
export class SV0445_SoftDisconnectAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0445",
      message: "SOFT DISCONNECT ALARM",
      description: `The digital servo software detected a disconnected Pulsecoder`
    });
  }
}

/**
 * HARD DISCONNECT ALARM
 *
 * The hardware detected a disconnected built-in Pulsecoder
 */
export class SV0446_HardDisconnectAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0446",
      message: "HARD DISCONNECT ALARM",
      description: `The hardware detected a disconnected built-in Pulsecoder`
    });
  }
}

/**
 * HARD DISCONNECT(EXT)
 *
 * The hardware detected a disconnected separate detector
 */
export class SV0447_HardDisconnectExt extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0447",
      message: "HARD DISCONNECT(EXT)",
      description: `The hardware detected a disconnected separate detector`
    });
  }
}

/**
 * UNMATCHED FEEDBACK ALARM
 *
 * The sign of the feedback signal from the standalone detector is opposite to that from the feedback signal from the built-on Pulsecoder
 */
export class SV0448_UnmatchedFeedbackAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0448",
      message: "UNMATCHED FEEDBACK ALARM",
      description: `The sign of the feedback signal from the standalone detector is opposite to that from the feedback signal from the built-on Pulsecoder`
    });
  }
}

/**
 * INV. IPM ALARM
 *
 * SVM : The IPM (Intelligent Power Module) detected an alarm.  series SVU : The IPM (Intelligent Power Module) detected an alarm
 */
export class SV0449_InverterIpmAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0449",
      message: "INV. IPM ALARM",
      description: `SVM : The IPM (Intelligent Power Module) detected an alarm.  series SVU : The IPM (Intelligent Power Module) detected an alarm`
    });
  }
}

/**
 * SPC SOFT DISCONNECT ALARM
 *
 * Software disconnection alarm of the  Pulsecoder. Turn off the power to the CNC, then remove and insert the Pulsecoder cable. If this alarm is issued again, replace the Pulsecoder
 */
export class SV0453_SpcSoftDisconnectAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0453",
      message: "SPC SOFT DISCONNECT ALARM",
      description: `Software disconnection alarm of the  Pulsecoder. Turn off the power to the CNC, then remove and insert the Pulsecoder cable. If this alarm is issued again, replace the Pulsecoder`
    });
  }
}

/**
 * ILLEGAL ROTOR POS DETECT
 *
 * The magnetic pole detection function terminated abnormally. The magnetic pole could not be detected because the motor did not run
 */
export class SV0454_IllegalRotorPosDetect extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0454",
      message: "ILLEGAL ROTOR POS DETECT",
      description: `The magnetic pole detection function terminated abnormally. The magnetic pole could not be detected because the motor did not run`
    });
  }
}

/**
 * ILLEGAL CURRENT LOOP
 *
 * An attempt was made to set the current loop that could not be set. The amplifier pulse module in use does not comply with HIGH SPEED HRV. Or, requirements to control are not satisfied in the system
 */
export class SV0456_IllegalCurrentLoop extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0456",
      message: "ILLEGAL CURRENT LOOP",
      description: `An attempt was made to set the current loop that could not be set. The amplifier pulse module in use does not comply with HIGH SPEED HRV. Or, requirements to control are not satisfied in the system`
    });
  }
}

/**
 * CURRENT LOOP ERROR
 *
 * The specified current loop differs from the actual current loop
 */
export class SV0458_CurrentLoopError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0458",
      message: "CURRENT LOOP ERROR",
      description: `The specified current loop differs from the actual current loop`
    });
  }
}

/**
 * HI HRV SETTING ERROR
 *
 * For two axes whose servo axis numbers (parameter No. 1023) are consecutively even and odd numbers, HIGH SPEED HRV control is possible for one axis and impossible for the other
 */
export class SV0459_HiHrvSettingError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0459",
      message: "HI HRV SETTING ERROR",
      description: `For two axes whose servo axis numbers (parameter No. 1023) are consecutively even and odd numbers, HIGH SPEED HRV control is possible for one axis and impossible for the other`
    });
  }
}

/**
 * FSSB DISCONNECT
 *
 * The FSSB connection was discontinued. Probable causes are:
 */
export class SV0460_FssbDisconnect extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0460",
      message: "FSSB DISCONNECT",
      description: `The FSSB connection was discontinued. Probable causes are:`
    });
  }
}

/**
 * SEND CNC DATA FAILED
 *
 * The correct data could not be received on a slave side because of the FSSB communication error
 */
export class SV0462_SendCncDataFailed extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0462",
      message: "SEND CNC DATA FAILED",
      description: `The correct data could not be received on a slave side because of the FSSB communication error`
    });
  }
}

/**
 * SEND SLAVE DATA FAILED
 *
 * The correct data could not be received in the servo software because of the FSSB communication error
 */
export class SV0463_SendSlaveDataFailed extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0463",
      message: "SEND SLAVE DATA FAILED",
      description: `The correct data could not be received in the servo software because of the FSSB communication error`
    });
  }
}

/**
 * READ ID DATA FAILED
 *
 * A read of the ID information for the amplifier has failed at power-on
 */
export class SV0465_ReadIdDataFailed extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0465",
      message: "READ ID DATA FAILED",
      description: `A read of the ID information for the amplifier has failed at power-on`
    });
  }
}

/**
 * MOTOR/AMP. COMBINATION
 *
 * The maximum current of an amplifier is different to that of a motor. Probable causes are:
 */
export class SV0466_MotorAmplifierCombination extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0466",
      message: "MOTOR/AMP. COMBINATION",
      description: `The maximum current of an amplifier is different to that of a motor. Probable causes are:`
    });
  }
}

/**
 * HI HRV SETTING ERROR(AMP)
 *
 * An attempt was made to set up HIGH SPEED HRV control for use when the controlled axis of an amplifier for which HIGH SPEED HRV control could not be used
 */
export class SV0468_HiHrvSettingErrorAmp extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0468",
      message: "HI HRV SETTING ERROR(AMP)",
      description: `An attempt was made to set up HIGH SPEED HRV control for use when the controlled axis of an amplifier for which HIGH SPEED HRV control could not be used`
    });
  }
}

/**
 * INV. DC LINK OVER CURRENT
 *
 * SVM : DC link overcurrent.  SVU : DC link overcurrent
 */
export class SV0600_InverterDcLinkOverCurrent extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0600",
      message: "INV. DC LINK OVER CURRENT",
      description: `SVM : DC link overcurrent.  SVU : DC link overcurrent`
    });
  }
}

/**
 * INV. RADIATOR FAN FAILURE
 *
 * SVM : Radiator cooling fan failure.  SVU : Radiator cooling fan failure
 */
export class SV0601_InverterRadiatorFanFailure extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0601",
      message: "INV. RADIATOR FAN FAILURE",
      description: `SVM : Radiator cooling fan failure.  SVU : Radiator cooling fan failure`
    });
  }
}

/**
 * INV. OVERHEAT
 *
 * SVM : The servo motor has overheated
 */
export class SV0602_InverterOverheat extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0602",
      message: "INV. OVERHEAT",
      description: `SVM : The servo motor has overheated`
    });
  }
}

/**
 * INV. IPM ALARM(OH)
 *
 * SVM : The IPM (Intelligent Power Module) detected an overheat alarm.  SVU : The IPM (Intelligent Power Module) detected an overheat alarm
 */
export class SV0603_InverterIpmAlarmOverHeat extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0603",
      message: "INV. IPM ALARM(OH)",
      description: `SVM : The IPM (Intelligent Power Module) detected an overheat alarm.  SVU : The IPM (Intelligent Power Module) detected an overheat alarm`
    });
  }
}

/**
 * AMP. COMMUNICATION ERROR
 *
 * The communication between SVM and PSM is in error
 */
export class SV0604_AmplifierCommunicationError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0604",
      message: "AMP. COMMUNICATION ERROR",
      description: `The communication between SVM and PSM is in error`
    });
  }
}

/**
 * CNV. EX. DISCHARGE POW
 *
 * PSMR : The motor regenerative power is too much
 */
export class SV0605_ConverterExcessiveDischargePower extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0605",
      message: "CNV. EX. DISCHARGE POW",
      description: `PSMR : The motor regenerative power is too much`
    });
  }
}

/**
 * CNV. RADIATOR FAN FAILURE
 *
 * PSM : External radiator cooling fan failure. PSMR : External radiator cooling fan failure
 */
export class SV0606_ConverterRadiatorFanFailure extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0606",
      message: "CNV. RADIATOR FAN FAILURE",
      description: `PSM : External radiator cooling fan failure. PSMR : External radiator cooling fan failure`
    });
  }
}

/**
 * CNV. SINGLE PHASE FAILURE
 *
 * PSM : The input power supply has a missing phase. PSMR : The input power supply has a missing phase
 */
export class SV0607_ConverterSinglePhaseFailure extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV0607",
      message: "CNV. SINGLE PHASE FAILURE",
      description: `PSM : The input power supply has a missing phase. PSMR : The input power supply has a missing phase`
    });
  }
}

/**
 * V_READY ON (INITIALIZING )
 *
 * The ready signal (VRDY) of the velocity control which should be OFF is ON while the servo control is ON
 */
export class SV1025_V_readyOnInitializing extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV1025",
      message: "V_READY ON (INITIALIZING )",
      description: `The ready signal (VRDY) of the velocity control which should be OFF is ON while the servo control is ON`
    });
  }
}

/**
 * ILLEGAL AXIS ARRANGE
 *
 * The parameter for servo axis arrange is not set correctly. A negative value, duplicate value, or greater value than the number of control axes was set to the parameter No. 1023 "The servo axis number of each axis."
 */
export class SV1026_IllegalAxisArrange extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV1026",
      message: "ILLEGAL AXIS ARRANGE",
      description: `The parameter for servo axis arrange is not set correctly. A negative value, duplicate value, or greater value than the number of control axes was set to the parameter No. 1023 "The servo axis number of each axis."`
    });
  }
}

/**
 * ILLEGAL TANDEM AXIS
 *
 * In tandem control, the setting of the parameter No. 1023 is incorrect
 */
export class SV1055_IllegalTandemAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV1055",
      message: "ILLEGAL TANDEM AXIS",
      description: `In tandem control, the setting of the parameter No. 1023 is incorrect`
    });
  }
}

/**
 * ILLEGAL TANDEM PAIR
 *
 * In tandem control, the setting of the parameter No. 1020, No. 1025, No. 1026 or TDM (No.1817#6) is incorrect
 */
export class SV1056_IllegalTandemPair extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV1056",
      message: "ILLEGAL TANDEM PAIR",
      description: `In tandem control, the setting of the parameter No. 1020, No. 1025, No. 1026 or TDM (No.1817#6) is incorrect`
    });
  }
}

/**
 * FSSB:CONFIGURATION ERROR(SOFT)
 *
 * An FSSB configuration error occurred (detected by software). The connected amplifier type is incompatible with the FSSB setting value
 */
export class SV1067_FssbConfigurationErrorSoft extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV1067",
      message: "FSSB:CONFIGURATION ERROR(SOFT)",
      description: `An FSSB configuration error occurred (detected by software). The connected amplifier type is incompatible with the FSSB setting value`
    });
  }
}

/**
 * S-COMP. VALUE OVERFLOW
 *
 * The amount of compensation for the straightness exceeded a maximum value of 32767
 */
export class SV1100_SCompensationValueOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV1100",
      message: "S-COMP. VALUE OVERFLOW",
      description: `The amount of compensation for the straightness exceeded a maximum value of 32767`
    });
  }
}

/**
 * FSSB:OPEN READY TIME OUT
 *
 * In the initialization, the FSSB could not be in an open ready sate. The axis card is thought to be defective
 */
export class SV5134_FssbOpenReadyTimeOut extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV5134",
      message: "FSSB:OPEN READY TIME OUT",
      description: `In the initialization, the FSSB could not be in an open ready sate. The axis card is thought to be defective`
    });
  }
}

/**
 * FSSB:NUMBER OF AMP. IS INSUFFICIENT
 *
 * The number of amplifier identified by the FSSB is insufficient than the number of control axes. Or, the setting of the number of axes or the amplifier connection is in error
 */
export class SV5136_FssbNumberOfAmplifierIsInsufficient extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV5136",
      message: "FSSB:NUMBER OF AMP. IS INSUFFICIENT",
      description: `The number of amplifier identified by the FSSB is insufficient than the number of control axes. Or, the setting of the number of axes or the amplifier connection is in error`
    });
  }
}

/**
 * FSSB:CONFIGURATION ERROR
 *
 * An FSSB configuration error occurred. The connecting amplifier type is incompatible with the FSSB setting value
 */
export class SV5137_FssbConfigurationError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV5137",
      message: "FSSB:CONFIGURATION ERROR",
      description: `An FSSB configuration error occurred. The connecting amplifier type is incompatible with the FSSB setting value`
    });
  }
}

/**
 * FSSB:ERROR
 *
 * Servo initialization has not completed successfully. It is probable that an optical cable failed or a connection between the amplifier and another module failed
 */
export class SV5139_FssbError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV5139",
      message: "FSSB:ERROR",
      description: `Servo initialization has not completed successfully. It is probable that an optical cable failed or a connection between the amplifier and another module failed`
    });
  }
}

/**
 * FSSB:OPEN TIME OUT
 *
 * The initialization of the FSSB was completed, but it could not be opened. Or, the connection between the CNC and the amplifier in is incorrect
 */
export class SV5197_FssbOpenTimeOut extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV5197",
      message: "FSSB:OPEN TIME OUT",
      description: `The initialization of the FSSB was completed, but it could not be opened. Or, the connection between the CNC and the amplifier in is incorrect`
    });
  }
}

/**
 * FSSB:ILLEGAL CONNECTION
 *
 * requirements for performing HIGH SPEED HRV control
 */
export class SV5311_FssbIllegalConnection extends RuntimeAlarm {
  constructor() {
    super({
      number: "SV5311",
      message: "FSSB:ILLEGAL CONNECTION",
      description: `requirements for performing HIGH SPEED HRV control`
    });
  }
}

/**
 * + OVERTRAVEL ( SOFT 1 )
 *
 * Exceeded the positive side stored stroke check 1
 */
export class OT0500_PositiveOvertravelSoft1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0500",
      message: "+ OVERTRAVEL ( SOFT 1 )",
      description: `Exceeded the positive side stored stroke check 1`
    });
  }
}

/**
 * - OVERTRAVEL ( SOFT 1 )
 *
 * Exceeded the negative side stored stroke check 1
 */
export class OT0501_NegativeOvertravelSoft1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0501",
      message: "- OVERTRAVEL ( SOFT 1 )",
      description: `Exceeded the negative side stored stroke check 1`
    });
  }
}

/**
 * + OVERTRAVEL ( SOFT 2 )
 *
 * Exceeded the positive side stored stroke check 2. Or, in the chuck tail stock barrier, an entry to the inhibited area was made during movement in the positive direction
 */
export class OT0502_PositiveOvertravelSoft2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0502",
      message: "+ OVERTRAVEL ( SOFT 2 )",
      description: `Exceeded the positive side stored stroke check 2. Or, in the chuck tail stock barrier, an entry to the inhibited area was made during movement in the positive direction`
    });
  }
}

/**
 * - OVERTRAVEL ( SOFT 2 )
 *
 * Exceeded the negative side stored stroke check 2. Or, in the chuck tail stock barrier, an entry to the inhibited area was made during movement in the negative direction
 */
export class OT0503_NegativeOvertravelSoft2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0503",
      message: "- OVERTRAVEL ( SOFT 2 )",
      description: `Exceeded the negative side stored stroke check 2. Or, in the chuck tail stock barrier, an entry to the inhibited area was made during movement in the negative direction`
    });
  }
}

/**
 * + OVERTRAVEL ( SOFT 3 )
 *
 * Exceeded the positive side stored stroke check 3
 */
export class OT0504_PositiveOvertravelSoft3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0504",
      message: "+ OVERTRAVEL ( SOFT 3 )",
      description: `Exceeded the positive side stored stroke check 3`
    });
  }
}

/**
 * - OVERTRAVEL ( SOFT 3 )
 *
 * Exceeded the - side stored stroke check 3
 */
export class OT0505_NegativeOvertravelSoft3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0505",
      message: "- OVERTRAVEL ( SOFT 3 )",
      description: `Exceeded the - side stored stroke check 3`
    });
  }
}

/**
 * + OVERTRAVEL ( HARD )
 *
 * The stroke limit switch in the positive direction was triggered. This alarm is generated when the machine reaches the stroke end. When this alarm is not generated, feed of all axes is stopped during automatic operation. During manual operation, only the feed of the axis on which the alarm occurred is stopped
 */
export class OT0506_PositiveOvertravelHard extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0506",
      message: "+ OVERTRAVEL ( HARD )",
      description: `The stroke limit switch in the positive direction was triggered. This alarm is generated when the machine reaches the stroke end. When this alarm is not generated, feed of all axes is stopped during automatic operation. During manual operation, only the feed of the axis on which the alarm occurred is stopped`
    });
  }
}

/**
 * - OVERTRAVEL ( HARD )
 *
 * The stroke limit switch in the negative direction was triggered. This alarm is generated when the machine reaches the stroke end. When this alarm is not generated, feed of all axes is stopped during automatic operation. During manual operation, only the feed of the axis on which the alarm occurred is stopped
 */
export class OT0507_NegativeOvertravelHard extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0507",
      message: "- OVERTRAVEL ( HARD )",
      description: `The stroke limit switch in the negative direction was triggered. This alarm is generated when the machine reaches the stroke end. When this alarm is not generated, feed of all axes is stopped during automatic operation. During manual operation, only the feed of the axis on which the alarm occurred is stopped`
    });
  }
}

/**
 * INTERFERENCE:+
 *
 * A tool moving in the positive direction along the n axis has fouled another tool post
 */
export class OT0508_InterferencePositive extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0508",
      message: "INTERFERENCE:+",
      description: `A tool moving in the positive direction along the n axis has fouled another tool post`
    });
  }
}

/**
 * INTERFERENCE:-
 *
 * A tool moving in the negative direction along the n axis has fouled another tool post
 */
export class OT0509_InterferenceNegative extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0509",
      message: "INTERFERENCE:-",
      description: `A tool moving in the negative direction along the n axis has fouled another tool post`
    });
  }
}

/**
 * + OVERTRAVEL ( PRE-CHECK )
 *
 * The tool exceeded the limit in the negative direction during the stroke check before movement
 */
export class OT0510_PositiveOvertravelPreCheck extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0510",
      message: "+ OVERTRAVEL ( PRE-CHECK )",
      description: `The tool exceeded the limit in the negative direction during the stroke check before movement`
    });
  }
}

/**
 * - OVERTRAVEL ( PRE-CHECK )
 *
 * The tool exceeded the limit in the positive direction during the stroke check before movement
 */
export class OT0511_NegativeOvertravelPreCheck extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT0511",
      message: "- OVERTRAVEL ( PRE-CHECK )",
      description: `The tool exceeded the limit in the positive direction during the stroke check before movement`
    });
  }
}

/**
 * ILLEGAL ACC. PARAMETER (OPTIMUM TORQUE ACC/DEC)
 *
 * The permissible acceleration parameter for the optimum torque acceleration/deceleration is in error. A possible cause is either of the following: maximum time
 */
export class OT1710_IllegalAccelerationParameterOptimumTorqueAccDec extends RuntimeAlarm {
  constructor() {
    super({
      number: "OT1710",
      message: "ILLEGAL ACC. PARAMETER (OPTIMUM TORQUE ACC/DEC)",
      description: `The permissible acceleration parameter for the optimum torque acceleration/deceleration is in error. A possible cause is either of the following: maximum time`
    });
  }
}

/**
 * FILE ACCESS ERROR
 *
 * The resident-type file system could not be accessed as an error occurred in the resident-type file system
 */
export class IO1001_FileAccessError extends RuntimeAlarm {
  constructor() {
    super({
      number: "IO1001",
      message: "FILE ACCESS ERROR",
      description: `The resident-type file system could not be accessed as an error occurred in the resident-type file system`
    });
  }
}

/**
 * FILE SYSTEM ERROR
 *
 * The file could not be accessed as an error occurred in the CNC file system
 */
export class IO1002_FileSystemError extends RuntimeAlarm {
  constructor() {
    super({
      number: "IO1002",
      message: "FILE SYSTEM ERROR",
      description: `The file could not be accessed as an error occurred in the CNC file system`
    });
  }
}

/**
 * CHECK SUM ERROR
 *
 * The checksum of the CNC part program storage memory is incorrect
 */
export class IO1030_CheckSumError extends RuntimeAlarm {
  constructor() {
    super({
      number: "IO1030",
      message: "CHECK SUM ERROR",
      description: `The checksum of the CNC part program storage memory is incorrect`
    });
  }
}

/**
 * MEMORY ACCESS OVER RANGE
 *
 * Accessing of data occurred outside the CNC part program storage memory range
 */
export class IO1032_MemoryAccessOverRange extends RuntimeAlarm {
  constructor() {
    super({
      number: "IO1032",
      message: "MEMORY ACCESS OVER RANGE",
      description: `Accessing of data occurred outside the CNC part program storage memory range`
    });
  }
}

/**
 * POWER MUST BE OFF
 *
 * A parameter was set for which the power must be turned OFF then ON again
 */
export class PW0000_PowererMustBeOff extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW0000",
      message: "POWER MUST BE OFF",
      description: `A parameter was set for which the power must be turned OFF then ON again`
    });
  }
}

/**
 * X-ADDRESS(*DEC) IS NOT ASSIGNED
 *
 * The X address of the PMC could not be assigned correctly. This alarm may occur in the following case: - During the setting of parameter No. 3013, the X address could not be assigned correctly for the deceleration dog (*DEC) for a return to the reference position
 */
export class PW0001_XAddressDecelerationIsNotAssigned extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW0001",
      message: "X-ADDRESS(*DEC) IS NOT ASSIGNED",
      description: `The X address of the PMC could not be assigned correctly. This alarm may occur in the following case: - During the setting of parameter No. 3013, the X address could not be assigned correctly for the deceleration dog (*DEC) for a return to the reference position`
    });
  }
}

/**
 * PMC address is not correct(AXIS)
 *
 * The address to assign the axis signal is incorrect. This alarm may occur in the following case: - The parameter No.3021 setting is incorrect
 */
export class PW0002_PmcAddressIsNotCorrectAxis extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW0002",
      message: "PMC address is not correct(AXIS)",
      description: `The address to assign the axis signal is incorrect. This alarm may occur in the following case: - The parameter No.3021 setting is incorrect`
    });
  }
}

/**
 * PMC address is not correct(SPINDLE)
 *
 * The address to assign the spindle signal is incorrect. This alarm may occur in the following case: - The parameter No.3022 setting is incorrect
 */
export class PW0003_PmcAddressIsNotCorrectSpindle extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW0003",
      message: "PMC address is not correct(SPINDLE)",
      description: `The address to assign the spindle signal is incorrect. This alarm may occur in the following case: - The parameter No.3022 setting is incorrect`
    });
  }
}

/**
 * SETTING THE LOADER SYSTEM PATH IS NOT CORRECT
 *
 * The loader system could not be assigned correctly. The parameter No. 984 setting is incorrect. 984#0(LCP) does not match
 */
export class PW0004_SettingTheLoaderSystemPathIsNotCorrect extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW0004",
      message: "SETTING THE LOADER SYSTEM PATH IS NOT CORRECT",
      description: `The loader system could not be assigned correctly. The parameter No. 984 setting is incorrect. 984#0(LCP) does not match`
    });
  }
}

/**
 * POWER MUST BE OFF (ILL-EXEC-CHK)
 *
 * The malfunction prevention function detected an alarm to require the power off
 */
export class PW0006_PowererMustBeOffIllExecChk extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW0006",
      message: "POWER MUST BE OFF (ILL-EXEC-CHK)",
      description: `The malfunction prevention function detected an alarm to require the power off`
    });
  }
}

/**
 * X-ADDRESS(SKIP) IS NOT ASSIGNED
 *
 * The X address of PMC could not be assigned correctly. Possible causes are: correctly
 */
export class PW0007_XAddressSkipIsNotAssigned extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW0007",
      message: "X-ADDRESS(SKIP) IS NOT ASSIGNED",
      description: `The X address of PMC could not be assigned correctly. Possible causes are: correctly`
    });
  }
}

/**
 * ILLEGAL PARAMETER (I-COMP.)
 *
 * The parameter for setting slope compensation is incorrect. This alarm occurs in the following cases: small or too great
 */
export class PW1102_IllegalParameterICompensation extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW1102",
      message: "ILLEGAL PARAMETER (I-COMP.)",
      description: `The parameter for setting slope compensation is incorrect. This alarm occurs in the following cases: small or too great`
    });
  }
}

/**
 * ILLEGAL PARAMETER (S-COMP.128)
 *
 * The parameter for setting 128 straightness compensation points or the parameter compensation data is incorrect,
 */
export class PW1103_IllegalParameterSCompensation128 extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW1103",
      message: "ILLEGAL PARAMETER (S-COMP.128)",
      description: `The parameter for setting 128 straightness compensation points or the parameter compensation data is incorrect,`
    });
  }
}

/**
 * ILLEGAL PARAMETER (S-COMP.)
 *
 * The parameter for setting straightness compensation is incorrect
 */
export class PW5046_IllegalParameterSCompensation extends RuntimeAlarm {
  constructor() {
    super({
      number: "PW5046",
      message: "ILLEGAL PARAMETER (S-COMP.)",
      description: `The parameter for setting straightness compensation is incorrect`
    });
  }
}

/**
 * RIGID TAP ALARM : EXCESS ERROR
 *
 * The positional deviation of the stopped spindle has exceeded the set value during rigid tapping
 */
export class SP0740_RigidTapAlarmExcessError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP0740",
      message: "RIGID TAP ALARM : EXCESS ERROR",
      description: `The positional deviation of the stopped spindle has exceeded the set value during rigid tapping`
    });
  }
}

/**
 * RIGID TAP ALARM : EXCESS ERROR
 *
 * The positional deviation of the moving spindle has exceeded the set value during rigid tapping
 */
export class SP0741_RigidTapAlarmExcessError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP0741",
      message: "RIGID TAP ALARM : EXCESS ERROR",
      description: `The positional deviation of the moving spindle has exceeded the set value during rigid tapping`
    });
  }
}

/**
 * RIGID TAP ALARM : LSI OVERFLOW
 *
 * An LSI overflow has occurred for the spindle during rigid tapping
 */
export class SP0742_RigidTapAlarmLsiOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP0742",
      message: "RIGID TAP ALARM : LSI OVERFLOW",
      description: `An LSI overflow has occurred for the spindle during rigid tapping`
    });
  }
}

/**
 * SPINDLE MODE CHANGE ERROR
 *
 * This alarm is generated if the system does not properly terminate a mode change. The modes include the Cs contour control, spindle positioning, rigid tapping, and spindle control modes. The alarm is activated if the spindle control unit does not respond correctly to the mode change command issued by the NC
 */
export class SP0752_SpindleModeChangeError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP0752",
      message: "SPINDLE MODE CHANGE ERROR",
      description: `This alarm is generated if the system does not properly terminate a mode change. The modes include the Cs contour control, spindle positioning, rigid tapping, and spindle control modes. The alarm is activated if the spindle control unit does not respond correctly to the mode change command issued by the NC`
    });
  }
}

/**
 * ABNORMAL TORQUE
 *
 * An abnormal load was detected in a spindle motor. The alarm can be canceled by RESET
 */
export class SP0754_AbnormalTorque extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP0754",
      message: "ABNORMAL TORQUE",
      description: `An abnormal load was detected in a spindle motor. The alarm can be canceled by RESET`
    });
  }
}

/**
 * SAFETY FUNCTION ERROR
 *
 * The CNC CPU detected that the safely function of the n-th spindle was not executed
 */
export class SP0755_SafetyFunctionError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP0755",
      message: "SAFETY FUNCTION ERROR",
      description: `The CNC CPU detected that the safely function of the n-th spindle was not executed`
    });
  }
}

/**
 * ILLEGAL AXIS DATA
 *
 * The CNC CPU detected that the connection state and the hardware setting of the spindle amplifier were incompatible on the n-th spindle. If an alarm occurs because of the configuration change of the spindle amplifier , set the spindle amplifier correctly
 */
export class SP0756_IllegalAxisData extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP0756",
      message: "ILLEGAL AXIS DATA",
      description: `The CNC CPU detected that the connection state and the hardware setting of the spindle amplifier were incompatible on the n-th spindle. If an alarm occurs because of the configuration change of the spindle amplifier , set the spindle amplifier correctly`
    });
  }
}

/**
 * SAFETY SPEED OVER
 *
 * The CNC CPU detected that during safety monitoring (the safety monitoring start signal SEV or SEP is 0), the spindle motor speed was greater than the safety speed (parameter No. 4372, 4438, 4440, or 4442) on the n-th spindle. Operate within the safety speed
 */
export class SP0757_SafetySpeedOver extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP0757",
      message: "SAFETY SPEED OVER",
      description: `The CNC CPU detected that during safety monitoring (the safety monitoring start signal SEV or SEP is 0), the spindle motor speed was greater than the safety speed (parameter No. 4372, 4438, 4440, or 4442) on the n-th spindle. Operate within the safety speed`
    });
  }
}

/**
 * SPINDLE SELECT ERROR
 *
 * In a multi spindle control, the spindle number other than the valid spindle number was selected by a position coder select signal. An attempt was made to select the spindle number of the system having no valid spindle
 */
export class SP1202_SpindleSelectError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1202",
      message: "SPINDLE SELECT ERROR",
      description: `In a multi spindle control, the spindle number other than the valid spindle number was selected by a position coder select signal. An attempt was made to select the spindle number of the system having no valid spindle`
    });
  }
}

/**
 * TOOL CHANGE SP MOTION OVERFLOW
 *
 * The amount of distribution to a spindle is too much. (specific to the FANUC ROBODRILL)
 */
export class SP1210_ToolChangeSpMotionOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1210",
      message: "TOOL CHANGE SP MOTION OVERFLOW",
      description: `The amount of distribution to a spindle is too much. (specific to the FANUC ROBODRILL)`
    });
  }
}

/**
 * TOOL CHANGE SP ORTN EXCESS ERROR
 *
 * During a tool change, a too much orientation error was detected for the spindle. (specific to the FANUC ROBODRILL)
 */
export class SP1211_ToolChangeSpOrtnExcessError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1211",
      message: "TOOL CHANGE SP ORTN EXCESS ERROR",
      description: `During a tool change, a too much orientation error was detected for the spindle. (specific to the FANUC ROBODRILL)`
    });
  }
}

/**
 * TOOL CHANGE SP MOVE EXCESS ERROR
 *
 * During a tool change, a too much moving error was detected for the spindle. (specific to the FANUC ROBODRILL)
 */
export class SP1212_ToolChangeSpMoveExcessError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1212",
      message: "TOOL CHANGE SP MOVE EXCESS ERROR",
      description: `During a tool change, a too much moving error was detected for the spindle. (specific to the FANUC ROBODRILL)`
    });
  }
}

/**
 * TOOL CHANGE SP STOP EXCESS ERROR
 *
 * During a tool change, a too much stop error was detected for the spindle. (specific to the FANUC ROBODRILL)
 */
export class SP1213_ToolChangeSpStopExcessError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1213",
      message: "TOOL CHANGE SP STOP EXCESS ERROR",
      description: `During a tool change, a too much stop error was detected for the spindle. (specific to the FANUC ROBODRILL)`
    });
  }
}

/**
 * TOOL CHANGE SP ILLEGAL SEQUENCE
 *
 * During changing tools, an abnormal spindle sequence was detected. (specific to the FANUC ROBODRILL)
 */
export class SP1214_ToolChangeSpIllegalSequence extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1214",
      message: "TOOL CHANGE SP ILLEGAL SEQUENCE",
      description: `During changing tools, an abnormal spindle sequence was detected. (specific to the FANUC ROBODRILL)`
    });
  }
}

/**
 * NO SPINDLE AMP
 *
 * Either the cable connected to a serial spindle amplifier is broken, or the serial spindle amplifier is not connected
 */
export class SP1220_NoSpindleAmp extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1220",
      message: "NO SPINDLE AMP",
      description: `Either the cable connected to a serial spindle amplifier is broken, or the serial spindle amplifier is not connected`
    });
  }
}

/**
 * ILLEGAL MOTOR NUMBER
 *
 * The spindle No. and the motor No. are incorrectly matched
 */
export class SP1221_IllegalMotorNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1221",
      message: "ILLEGAL MOTOR NUMBER",
      description: `The spindle No. and the motor No. are incorrectly matched`
    });
  }
}

/**
 * ILLEGAL SPINDLE-POSITION CODER GEAR RATIO
 *
 * The spindle-position coder gear ratio was incorrect
 */
export class SP1224_IllegalSpindlePositionCoderGearRatio extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1224",
      message: "ILLEGAL SPINDLE-POSITION CODER GEAR RATIO",
      description: `The spindle-position coder gear ratio was incorrect`
    });
  }
}

/**
 * CRC ERROR (SERIAL SPINDLE)
 *
 * A CRC error (communications error) occurred in communications between the CNC and the serial spindle amplifier
 */
export class SP1225_CrcErrorSerialSpindle extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1225",
      message: "CRC ERROR (SERIAL SPINDLE)",
      description: `A CRC error (communications error) occurred in communications between the CNC and the serial spindle amplifier`
    });
  }
}

/**
 * FRAMING ERROR (SERIAL SPINDLE)
 *
 * A framing error occurred in communications between the CNC and the serial spindle amplifier
 */
export class SP1226_FramingErrorSerialSpindle extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1226",
      message: "FRAMING ERROR (SERIAL SPINDLE)",
      description: `A framing error occurred in communications between the CNC and the serial spindle amplifier`
    });
  }
}

/**
 * RECEIVING ERROR (SERIAL SPINDLE)
 *
 * A receive error occurred in communications between the CNC and the serial spindle amplifier
 */
export class SP1227_ReceivingErrorSerialSpindle extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1227",
      message: "RECEIVING ERROR (SERIAL SPINDLE)",
      description: `A receive error occurred in communications between the CNC and the serial spindle amplifier`
    });
  }
}

/**
 * COMMUNICATION ERROR (SERIAL SPINDLE)
 *
 * A communications error occurred between the CNC and the serial spindle amplifier
 */
export class SP1228_CommunicationErrorSerialSpindle extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1228",
      message: "COMMUNICATION ERROR (SERIAL SPINDLE)",
      description: `A communications error occurred between the CNC and the serial spindle amplifier`
    });
  }
}

/**
 * COMMUNICATION ERROR SERIAL SPINDLE AMP
 *
 * A communications error occurred between serial spindle amplifiers (motor Nos. 1 and 2, or motor Nos. 3-4)
 */
export class SP1229_CommunicationErrorSerialSpindleAmp extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1229",
      message: "COMMUNICATION ERROR SERIAL SPINDLE AMP",
      description: `A communications error occurred between serial spindle amplifiers (motor Nos. 1 and 2, or motor Nos. 3-4)`
    });
  }
}

/**
 * SPINDLE EXCESS ERROR (MOVING)
 *
 * The position deviation during spindle rotation was greater than the value set in parameters
 */
export class SP1231_SpindleExcessErrorMoving extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1231",
      message: "SPINDLE EXCESS ERROR (MOVING)",
      description: `The position deviation during spindle rotation was greater than the value set in parameters`
    });
  }
}

/**
 * SPINDLE EXCESS ERROR (STOP)
 *
 * The position deviation during spindle stop was greater than the value set in parameters
 */
export class SP1232_SpindleExcessErrorStop extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1232",
      message: "SPINDLE EXCESS ERROR (STOP)",
      description: `The position deviation during spindle stop was greater than the value set in parameters`
    });
  }
}

/**
 * POSITION CODER OVERFLOW
 *
 * The error counter/speed instruction value of the position coder overflowed
 */
export class SP1233_PositionCoderOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1233",
      message: "POSITION CODER OVERFLOW",
      description: `The error counter/speed instruction value of the position coder overflowed`
    });
  }
}

/**
 * GRID SHIFT OVERFLOW
 *
 * Grid shift overflowed
 */
export class SP1234_GridShiftOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1234",
      message: "GRID SHIFT OVERFLOW",
      description: `Grid shift overflowed`
    });
  }
}

/**
 * DISCONNECT POSITION CODER
 *
 * The analog spindle position coder is broken
 */
export class SP1240_DisconnectPositionCoder extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1240",
      message: "DISCONNECT POSITION CODER",
      description: `The analog spindle position coder is broken`
    });
  }
}

/**
 * D/A CONVERTER ERROR
 *
 * The D/A converter for controlling analog spindles is erroneous
 */
export class SP1241_DAConverterError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1241",
      message: "D/A CONVERTER ERROR",
      description: `The D/A converter for controlling analog spindles is erroneous`
    });
  }
}

/**
 * ILLEGAL SPINDLE PARAMETER SETTING(GAIN)
 *
 * The setting for the spindle position gain is incorrect
 */
export class SP1243_IllegalSpindleParameterSettingGain extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1243",
      message: "ILLEGAL SPINDLE PARAMETER SETTING(GAIN)",
      description: `The setting for the spindle position gain is incorrect`
    });
  }
}

/**
 * MOTION VALUE OVERFLOW
 *
 * The amount of distribution to a spindle is too much
 */
export class SP1244_MotionValueOverflow extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1244",
      message: "MOTION VALUE OVERFLOW",
      description: `The amount of distribution to a spindle is too much`
    });
  }
}

/**
 * COMMUNICATION DATA ERROR
 *
 * A communication data error was detected on the CNC
 */
export class SP1245_CommunicationDataError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1245",
      message: "COMMUNICATION DATA ERROR",
      description: `A communication data error was detected on the CNC`
    });
  }
}

/**
 * COMMUNICATION DATA ERROR
 *
 * A communication data error was detected on the CNC
 */
export class SP1246_CommunicationDataError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1246",
      message: "COMMUNICATION DATA ERROR",
      description: `A communication data error was detected on the CNC`
    });
  }
}

/**
 * COMMUNICATION DATA ERROR
 *
 * A communication data error was detected on the CNC
 */
export class SP1247_CommunicationDataError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1247",
      message: "COMMUNICATION DATA ERROR",
      description: `A communication data error was detected on the CNC`
    });
  }
}

/**
 * SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1969_SpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1969",
      message: "SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * SPINDLE CONTROL ERROR
 *
 * Initialization of spindle control ended in error
 */
export class SP1970_SpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1970",
      message: "SPINDLE CONTROL ERROR",
      description: `Initialization of spindle control ended in error`
    });
  }
}

/**
 * SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1971_SpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1971",
      message: "SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1972_SpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1972",
      message: "SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * ANALOG SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1974_AnalogSpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1974",
      message: "ANALOG SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * ANALOG SPINDLE CONTROL ERROR
 *
 * An position coder error was detected on the analog spindle
 */
export class SP1975_AnalogSpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1975",
      message: "ANALOG SPINDLE CONTROL ERROR",
      description: `An position coder error was detected on the analog spindle`
    });
  }
}

/**
 * SERIAL SPINDLE COMMUNICATION ERROR
 *
 * The amplifier No. could not be set to the serial spindle amplifier
 */
export class SP1976_SerialSpindleCommunicationError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1976",
      message: "SERIAL SPINDLE COMMUNICATION ERROR",
      description: `The amplifier No. could not be set to the serial spindle amplifier`
    });
  }
}

/**
 * SERIAL SPINDLE COMMUNICATION ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1977_SerialSpindleCommunicationError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1977",
      message: "SERIAL SPINDLE COMMUNICATION ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * SERIAL SPINDLE COMMUNICATION ERROR
 *
 * A time-out was detected during communications with the serial spindle amplifier
 */
export class SP1978_SerialSpindleCommunicationError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1978",
      message: "SERIAL SPINDLE COMMUNICATION ERROR",
      description: `A time-out was detected during communications with the serial spindle amplifier`
    });
  }
}

/**
 * SERIAL SPINDLE COMMUNICATION ERROR
 *
 * The communications sequence was no longer correct during communications with the serial spindle amplifier
 */
export class SP1979_SerialSpindleCommunicationError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1979",
      message: "SERIAL SPINDLE COMMUNICATION ERROR",
      description: `The communications sequence was no longer correct during communications with the serial spindle amplifier`
    });
  }
}

/**
 * SERIAL SPINDLE AMP. ERROR
 *
 * Defective SIC-LSI on serial spindle amplifier
 */
export class SP1980_SerialSpindleAmplifierError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1980",
      message: "SERIAL SPINDLE AMP. ERROR",
      description: `Defective SIC-LSI on serial spindle amplifier`
    });
  }
}

/**
 * SERIAL SPINDLE AMP. ERROR
 *
 * An error occurred during reading of the data from SIC-LSI on the analog spindle amplifier side
 */
export class SP1981_SerialSpindleAmplifierError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1981",
      message: "SERIAL SPINDLE AMP. ERROR",
      description: `An error occurred during reading of the data from SIC-LSI on the analog spindle amplifier side`
    });
  }
}

/**
 * SERIAL SPINDLE AMP. ERROR
 *
 * An error occurred during reading of the data from SIC-LSI on the serial spindle amplifier side
 */
export class SP1982_SerialSpindleAmplifierError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1982",
      message: "SERIAL SPINDLE AMP. ERROR",
      description: `An error occurred during reading of the data from SIC-LSI on the serial spindle amplifier side`
    });
  }
}

/**
 * SERIAL SPINDLE AMP. ERROR
 *
 * Could not clear on the spindle amplifier side
 */
export class SP1983_SerialSpindleAmplifierError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1983",
      message: "SERIAL SPINDLE AMP. ERROR",
      description: `Could not clear on the spindle amplifier side`
    });
  }
}

/**
 * SERIAL SPINDLE AMP. ERROR
 *
 * An error occurred during re-initialization of the spindle amplifier
 */
export class SP1984_SerialSpindleAmplifierError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1984",
      message: "SERIAL SPINDLE AMP. ERROR",
      description: `An error occurred during re-initialization of the spindle amplifier`
    });
  }
}

/**
 * SERIAL SPINDLE CONTROL ERROR
 *
 * Failed to automatically set parameters
 */
export class SP1985_SerialSpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1985",
      message: "SERIAL SPINDLE CONTROL ERROR",
      description: `Failed to automatically set parameters`
    });
  }
}

/**
 * SERIAL SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1986_SerialSpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1986",
      message: "SERIAL SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * SERIAL SPINDLE CONTROL ERROR
 *
 * Defective SIC-LSI on the CNC
 */
export class SP1987_SerialSpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1987",
      message: "SERIAL SPINDLE CONTROL ERROR",
      description: `Defective SIC-LSI on the CNC`
    });
  }
}

/**
 * SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1988_SpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1988",
      message: "SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1989_SpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1989",
      message: "SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * ILLEGAL SPINDLE PARAMETER SETTING
 *
 * The spindle was assigned incorrectly. Check to see the following parameter. (No.3716 or 3717)
 */
export class SP1996_IllegalSpindleParameterSetting extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1996",
      message: "ILLEGAL SPINDLE PARAMETER SETTING",
      description: `The spindle was assigned incorrectly. Check to see the following parameter. (No.3716 or 3717)`
    });
  }
}

/**
 * SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1998_SpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1998",
      message: "SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * SPINDLE CONTROL ERROR
 *
 * An error occurred in the spindle control software
 */
export class SP1999_SpindleControlError extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP1999",
      message: "SPINDLE CONTROL ERROR",
      description: `An error occurred in the spindle control software`
    });
  }
}

/**
 * SSPA:41 ILLEGAL 1REV SIGN OF POSITION CODER
 *
 * 41
 */
export class SP9041_Sspa41Illegal1revSignOfPositionCoder extends RuntimeAlarm {
  constructor() {
    super({
      number: "SP9041",
      message: "SSPA:41 ILLEGAL 1REV SIGN OF POSITION CODER",
      description: `41`
    });
  }
}

/**
 * LOCKER OVERHEAT
 *
 * CNC cabinet overheat
 */
export class OH0700_LockerOverheat extends RuntimeAlarm {
  constructor() {
    super({
      number: "OH0700",
      message: "LOCKER OVERHEAT",
      description: `CNC cabinet overheat`
    });
  }
}

/**
 * FAN MOTOR STOP
 *
 * PCB cooling fan motor abnormality
 */
export class OH0701_FanMotorStop extends RuntimeAlarm {
  constructor() {
    super({
      number: "OH0701",
      message: "FAN MOTOR STOP",
      description: `PCB cooling fan motor abnormality`
    });
  }
}

/**
 * SYNC EXCESS ERROR (POS DEV)
 *
 * In feed axis synchronization control, the difference in the amount of positional deviation between the master and slave axes exceeded the parameter (No. 8323) setting value. This alarm occurs only for the slave axis
 */
export class DS0001_SyncExcessErrorPosDev extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0001",
      message: "SYNC EXCESS ERROR (POS DEV)",
      description: `In feed axis synchronization control, the difference in the amount of positional deviation between the master and slave axes exceeded the parameter (No. 8323) setting value. This alarm occurs only for the slave axis`
    });
  }
}

/**
 * SYNC EXCESS ERROR ALARM 1
 *
 * In feed axis synchronization control, the difference in the amount of synchronization between the master and slave axes exceeded the parameter (No. 8331) setting value. This alarm occurs only for the slave axis
 */
export class DS0002_SyncExcessErrorAlarm1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0002",
      message: "SYNC EXCESS ERROR ALARM 1",
      description: `In feed axis synchronization control, the difference in the amount of synchronization between the master and slave axes exceeded the parameter (No. 8331) setting value. This alarm occurs only for the slave axis`
    });
  }
}

/**
 * SYNCHRONIZE ADJUST MODE
 *
 * The system is in the synchronize adjust mode
 */
export class DS0003_SynchronizeAdjustMode extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0003",
      message: "SYNCHRONIZE ADJUST MODE",
      description: `The system is in the synchronize adjust mode`
    });
  }
}

/**
 * EXCESS MAXIMUM FEEDRATE
 *
 * The malfunction prevention function detected the command in which a value exceeding the maximum speed was specified
 */
export class DS0004_ExcessMaximumFeedrate extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0004",
      message: "EXCESS MAXIMUM FEEDRATE",
      description: `The malfunction prevention function detected the command in which a value exceeding the maximum speed was specified`
    });
  }
}

/**
 * EXCESS MAXIMUM ACCELERATION
 *
 * The malfunction prevention function detected the command in which a value exceeding the maximum acceleration was specified
 */
export class DS0005_ExcessMaximumAcceleration extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0005",
      message: "EXCESS MAXIMUM ACCELERATION",
      description: `The malfunction prevention function detected the command in which a value exceeding the maximum acceleration was specified`
    });
  }
}

/**
 * TOOL CHANGE DETECT MACHINE LOCK
 *
 * A machine lock is turned on for the Z axis for which the tool is being changed
 */
export class DS0014_ToolChangeDetectMachineLock extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0014",
      message: "TOOL CHANGE DETECT MACHINE LOCK",
      description: `A machine lock is turned on for the Z axis for which the tool is being changed`
    });
  }
}

/**
 * TOOL CHANGE DETECT MIRROR IMAGE
 *
 * A mirror image is turned on for the Z axis for which the tool is being changed
 */
export class DS0015_ToolChangeDetectMirrorImage extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0015",
      message: "TOOL CHANGE DETECT MIRROR IMAGE",
      description: `A mirror image is turned on for the Z axis for which the tool is being changed`
    });
  }
}

/**
 * REFERENCE RETURN INCOMPLETE
 *
 * An attempt was made to perform an automatic return to the reference position on the perpendicular axis before the completion of a return to the reference position on the angular axis. However, this attempt failed because a manual return to the reference position during angular axis control or an automatic return to the reference position after power-up was not commanded. First, return to the reference position on the angular axis, then return to the reference position on the perpendicular axis
 */
export class DS0020_ReferenceReturnIncomplete extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0020",
      message: "REFERENCE RETURN INCOMPLETE",
      description: `An attempt was made to perform an automatic return to the reference position on the perpendicular axis before the completion of a return to the reference position on the angular axis. However, this attempt failed because a manual return to the reference position during angular axis control or an automatic return to the reference position after power-up was not commanded. First, return to the reference position on the angular axis, then return to the reference position on the perpendicular axis`
    });
  }
}

/**
 * MISMATCH OF ANGULAR AXIS(D.C.S)
 *
 * On angular axis control, one of the angular/perpendicular axes is the scale with ref-pos, and the other of them is not the scale with ref-pos. Such system is not admired
 */
export class DS0024_MismatchOfAngularAxisDcs extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0024",
      message: "MISMATCH OF ANGULAR AXIS(D.C.S)",
      description: `On angular axis control, one of the angular/perpendicular axes is the scale with ref-pos, and the other of them is not the scale with ref-pos. Such system is not admired`
    });
  }
}

/**
 * MISMATCH OF ANGULAR AXIS(D.C.S)
 *
 * On angular axis control, one of the angular/perpendicular axes is the scale with ref-pos, and the other of them is not the scale with ref-pos. Such system is not admired
 */
export class DS0026_MismatchOfAngularAxisDcs extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0026",
      message: "MISMATCH OF ANGULAR AXIS(D.C.S)",
      description: `On angular axis control, one of the angular/perpendicular axes is the scale with ref-pos, and the other of them is not the scale with ref-pos. Such system is not admired`
    });
  }
}

/**
 * MISMATCH OF SYNCHRONOUS AXIS(D.C.S)
 *
 * Master/slave axes of feed axis synchronization control, one of them is the linear scale with distance-coded reference marks, and the other of them is not the linear scale with distance-coded reference marks. Please establish reference position with the input signal SYNCn<G138>, SYNCJn<G140> or pameter setting to 0
 */
export class DS0027_MismatchOfSynchronousAxisDcs extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0027",
      message: "MISMATCH OF SYNCHRONOUS AXIS(D.C.S)",
      description: `Master/slave axes of feed axis synchronization control, one of them is the linear scale with distance-coded reference marks, and the other of them is not the linear scale with distance-coded reference marks. Please establish reference position with the input signal SYNCn<G138>, SYNCJn<G140> or pameter setting to 0`
    });
  }
}

/**
 * SPECIFIED NUMBER NOT FOUND
 *
 * [External data I/O] The No. specified for a program No. or sequence No. search could not be found. There was an I/O request issued for a pot No. or offset (tool data), but either no tool numbers have been input since power ON or there is no data for the entered tool No. [External workpiece No. search] The program corresponding to the specified workpiece No. could not be found
 */
export class DS0059_SpecifiedNumberNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0059",
      message: "SPECIFIED NUMBER NOT FOUND",
      description: `[External data I/O] The No. specified for a program No. or sequence No. search could not be found. There was an I/O request issued for a pot No. or offset (tool data), but either no tool numbers have been input since power ON or there is no data for the entered tool No. [External workpiece No. search] The program corresponding to the specified workpiece No. could not be found`
    });
  }
}

/**
 * TOO MANY MESSAGE
 *
 * An attempt was made to display an external operator message or external alarm message, but five or more displays were required simultaneously
 */
export class DS0131_TooManyMessage extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0131",
      message: "TOO MANY MESSAGE",
      description: `An attempt was made to display an external operator message or external alarm message, but five or more displays were required simultaneously`
    });
  }
}

/**
 * MESSAGE NUMBER NOT FOUND
 *
 * An attempt to cancel an external operator message or external alarm message failed because the specified message number was not found
 */
export class DS0132_MessageNumberNotFound extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0132",
      message: "MESSAGE NUMBER NOT FOUND",
      description: `An attempt to cancel an external operator message or external alarm message failed because the specified message number was not found`
    });
  }
}

/**
 * TOO LARGE NUMBER
 *
 * A value other than 0 to 4095 was specified as the external operator message or the external alarm message number
 */
export class DS0133_TooLargeNumber extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0133",
      message: "TOO LARGE NUMBER",
      description: `A value other than 0 to 4095 was specified as the external operator message or the external alarm message number`
    });
  }
}

/**
 * APC ALARM: NEED REF RETURN
 *
 * A setting to zero position for the absolute position detector (association with reference position and the counter value of the absolute position detector) is required. Perform the return to the reference position. This alarm may occur with other alarms simultaneously. In this case, other alarms must be handled first
 */
export class DS0300_ApcAlarmNeedRefReturn extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0300",
      message: "APC ALARM: NEED REF RETURN",
      description: `A setting to zero position for the absolute position detector (association with reference position and the counter value of the absolute position detector) is required. Perform the return to the reference position. This alarm may occur with other alarms simultaneously. In this case, other alarms must be handled first`
    });
  }
}

/**
 * APC ALARM: BATTERY VOLTAGE 0
 *
 * The battery voltage of the absolute position detector has dropped to a level at which data can no longer be held. Or, the power was supplied to the Pulsecoder for the first time. The battery or cable is thought to be defective. Replace the battery with the machine turned on
 */
export class DS0306_ApcAlarmBatteryVoltage0 extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0306",
      message: "APC ALARM: BATTERY VOLTAGE 0",
      description: `The battery voltage of the absolute position detector has dropped to a level at which data can no longer be held. Or, the power was supplied to the Pulsecoder for the first time. The battery or cable is thought to be defective. Replace the battery with the machine turned on`
    });
  }
}

/**
 * APC ALARM: BATTERY LOW 1
 *
 * The battery voltage of the absolute position detector has dropped to a level at which a replacement is required. Replace the battery with the machine turned on
 */
export class DS0307_ApcAlarmBatteryLow1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0307",
      message: "APC ALARM: BATTERY LOW 1",
      description: `The battery voltage of the absolute position detector has dropped to a level at which a replacement is required. Replace the battery with the machine turned on`
    });
  }
}

/**
 * APC ALARM: BATTERY LOW 2
 *
 * The battery voltage of the absolute position detector dropped to a level at which a replacement was required in the past. (including during power off) Replace the battery with the machine turned on
 */
export class DS0308_ApcAlarmBatteryLow2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0308",
      message: "APC ALARM: BATTERY LOW 2",
      description: `The battery voltage of the absolute position detector dropped to a level at which a replacement was required in the past. (including during power off) Replace the battery with the machine turned on`
    });
  }
}

/**
 * APC ALARM: REF RETURN IMPOSSIBLE
 *
 * An attempt was made to set the zero point for the absolute position detector by MDI operation when it was impossible to set the zero point. Rotate the motor manually at least one turn, and set the zero position of the absolute position detector after turning the CNC and servo amplifier off and then on again
 */
export class DS0309_ApcAlarmRefReturnImpossible extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0309",
      message: "APC ALARM: REF RETURN IMPOSSIBLE",
      description: `An attempt was made to set the zero point for the absolute position detector by MDI operation when it was impossible to set the zero point. Rotate the motor manually at least one turn, and set the zero position of the absolute position detector after turning the CNC and servo amplifier off and then on again`
    });
  }
}

/**
 * NOT ON RETURN POINT
 *
 * The return position recorded during retraction is not reached during recovery. The position may be displaced during recovery due to a machine lock or mirror image. Perform the operation again after making a reset
 */
export class DS0310_NotOnReturnPoint extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0310",
      message: "NOT ON RETURN POINT",
      description: `The return position recorded during retraction is not reached during recovery. The position may be displaced during recovery due to a machine lock or mirror image. Perform the operation again after making a reset`
    });
  }
}

/**
 * ZERO RETURN END NOT ON REF
 *
 * The axis specified in automatic zero return was not at the correct zero point when positioning was completed. Perform zero return from a point whose distance from the zero return start position to the zero point is 2 or more revolutions of the motor. Other probable causes are:
 */
export class DS0405_ZeroReturnEndNotOnRef extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS0405",
      message: "ZERO RETURN END NOT ON REF",
      description: `The axis specified in automatic zero return was not at the correct zero point when positioning was completed. Perform zero return from a point whose distance from the zero return start position to the zero point is 2 or more revolutions of the motor. Other probable causes are:`
    });
  }
}

/**
 * UNASSIGNED ADDRESS (HIGH)
 *
 * The upper 4 bits (EIA4 to EIA7) of an external data I/O interface address signal are set to an undefined address (high bits)
 */
export class DS1120_UnassignedAddressHigh extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1120",
      message: "UNASSIGNED ADDRESS (HIGH)",
      description: `The upper 4 bits (EIA4 to EIA7) of an external data I/O interface address signal are set to an undefined address (high bits)`
    });
  }
}

/**
 * UNASSIGNED ADDRESS (LOW)
 *
 * The lower 4 bits (EIA0 to EIA3) of an external data I/O interface address signal are set to an undefined address (low bits)
 */
export class DS1121_UnassignedAddressLow extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1121",
      message: "UNASSIGNED ADDRESS (LOW)",
      description: `The lower 4 bits (EIA0 to EIA3) of an external data I/O interface address signal are set to an undefined address (low bits)`
    });
  }
}

/**
 * OUTPUT REQUEST ERROR
 *
 * OUTPUT REQUEST ERROR An output request was issued during external data output, or an output request was issued for an address that has no output data
 */
export class DS1124_OutputRequestError extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1124",
      message: "OUTPUT REQUEST ERROR",
      description: `OUTPUT REQUEST ERROR An output request was issued during external data output, or an output request was issued for an address that has no output data`
    });
  }
}

/**
 * DI.EIDHW OUT OF RANGE
 *
 * The numerical value input by external data input signals EID32 to EID47 has exceeded the permissible range
 */
export class DS1127_DigitalInputeidhwOutOfRange extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1127",
      message: "DI.EIDHW OUT OF RANGE",
      description: `The numerical value input by external data input signals EID32 to EID47 has exceeded the permissible range`
    });
  }
}

/**
 * DI.EIDLL OUT OF RANGE
 *
 * The numerical value input by external data input signals EID0 to EID31 has exceeded the permissible range
 */
export class DS1128_DigitalInputeidllOutOfRange extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1128",
      message: "DI.EIDLL OUT OF RANGE",
      description: `The numerical value input by external data input signals EID0 to EID31 has exceeded the permissible range`
    });
  }
}

/**
 * SEARCH REQUEST NOT ACCEPTED
 *
 * No requests can be accepted for a program No. or a sequence No. search as the system is not in the memory mode or the reset state
 */
export class DS1130_SearchRequestNotAccepted extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1130",
      message: "SEARCH REQUEST NOT ACCEPTED",
      description: `No requests can be accepted for a program No. or a sequence No. search as the system is not in the memory mode or the reset state`
    });
  }
}

/**
 * EXT-DATA ERROR (OTHER)
 *
 * [External Data I/O] An attempt was made to input tool data for tool offset by a tool No. during loading by the G10 code
 */
export class DS1131_ExtDataErrorOther extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1131",
      message: "EXT-DATA ERROR (OTHER)",
      description: `[External Data I/O] An attempt was made to input tool data for tool offset by a tool No. during loading by the G10 code`
    });
  }
}

/**
 * A/D CONVERT ALARM
 *
 * A/D converter malfunction
 */
export class DS1150_ADConvertAlarm extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1150",
      message: "A/D CONVERT ALARM",
      description: `A/D converter malfunction`
    });
  }
}

/**
 * PARAMETER ERROR IN TORQUE
 *
 * An invalid parameter was set for torque control. The torque constant parameter is set to “0”
 */
export class DS1184_ParameterErrorInTorque extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1184",
      message: "PARAMETER ERROR IN TORQUE",
      description: `An invalid parameter was set for torque control. The torque constant parameter is set to “0”`
    });
  }
}

/**
 * OVER MAXIMUM FEED
 *
 * The maximum cutting feedrate or rapid traverse feedrate was exceeded in G54.3
 */
export class DS1185_OverMaximumFeed extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1185",
      message: "OVER MAXIMUM FEED",
      description: `The maximum cutting feedrate or rapid traverse feedrate was exceeded in G54.3`
    });
  }
}

/**
 * ILLEGAL PARAMETER (D.C.S.)
 *
 * The setting value of parameter for reference marks is satisfied the following any conditions. the valid data range
 */
export class DS1448_IllegalParameterDcs extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1448",
      message: "ILLEGAL PARAMETER (D.C.S.)",
      description: `The setting value of parameter for reference marks is satisfied the following any conditions. the valid data range`
    });
  }
}

/**
 * REFERENCE MARK ARE DIFFERENT FROM PARAMETER
 *
 * In case of distance coded linear scale I/F, the actual interval of reference marks is different from parameter (No.1821,1882) setting value
 */
export class DS1449_ReferenceMarkAreDifferentFromParameter extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1449",
      message: "REFERENCE MARK ARE DIFFERENT FROM PARAMETER",
      description: `In case of distance coded linear scale I/F, the actual interval of reference marks is different from parameter (No.1821,1882) setting value`
    });
  }
}

/**
 * ZERO RETURN NOT FINISHED
 *
 * 1st reference position return (CDxX7 to CDxX0: 17h (Hex)) was specified when the manual reference position return was not executed with the reference position return function enabled (parameter ZRN (No. 1005#0) set to “0”)
 */
export class DS1450_ZeroReturnNotFinished extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1450",
      message: "ZERO RETURN NOT FINISHED",
      description: `1st reference position return (CDxX7 to CDxX0: 17h (Hex)) was specified when the manual reference position return was not executed with the reference position return function enabled (parameter ZRN (No. 1005#0) set to “0”)`
    });
  }
}

/**
 * IMPROPER PMC AXIS COMMAND
 *
 * The PMC axes cannot be controlled in this state
 */
export class DS1451_ImproperPmcAxisCommand extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1451",
      message: "IMPROPER PMC AXIS COMMAND",
      description: `The PMC axes cannot be controlled in this state`
    });
  }
}

/**
 * EXCESS VELOCITY
 *
 * The feedrate of the linear axis during polar coordinate interpolation exceeded the maximum cutting feedrate
 */
export class DS1512_ExcessVelocity extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1512",
      message: "EXCESS VELOCITY",
      description: `The feedrate of the linear axis during polar coordinate interpolation exceeded the maximum cutting feedrate`
    });
  }
}

/**
 * ILLEGAL MOTION IN G12.1 MODE
 *
 * In a hypothetical axis direction compensation during the polar coordinate interpolation mode, an attempt is made to travel to the area in which the travel cannot be made
 */
export class DS1514_IllegalMotionInG12_1Mode extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1514",
      message: "ILLEGAL MOTION IN G12.1 MODE",
      description: `In a hypothetical axis direction compensation during the polar coordinate interpolation mode, an attempt is made to travel to the area in which the travel cannot be made`
    });
  }
}

/**
 * EXCESS VELOCITY IN G43.4/G43.5
 *
 * The axis rate was attempt to exceed the maximum cutting feedrate and travel by the pivot tool length compensation
 */
export class DS1553_ExcessVelocityInG43_4G43_5 extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1553",
      message: "EXCESS VELOCITY IN G43.4/G43.5",
      description: `The axis rate was attempt to exceed the maximum cutting feedrate and travel by the pivot tool length compensation`
    });
  }
}

/**
 * ILLEGAL ACC. PARAMETER (OPTIMUM TORQUE ACC/DEC)
 *
 * There are errors in the parameters of permissible acceleration for Optimum Torque Acceleration/Deceleration. One of the following is the cause
 */
export class DS1710_IllegalAccelerationParameterOptimumTorqueAccDec extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1710",
      message: "ILLEGAL ACC. PARAMETER (OPTIMUM TORQUE ACC/DEC)",
      description: `There are errors in the parameters of permissible acceleration for Optimum Torque Acceleration/Deceleration. One of the following is the cause`
    });
  }
}

/**
 * MACHINE PARAMETER INCORRECT
 *
 * One of parameters Nos. 19665 to 19667 and Nos.19680 to 19744 used to configure the machine contains an error
 */
export class DS1931_MachineParameterIncorrect extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1931",
      message: "MACHINE PARAMETER INCORRECT",
      description: `One of parameters Nos. 19665 to 19667 and Nos.19680 to 19744 used to configure the machine contains an error`
    });
  }
}

/**
 * DI.THML SIGNAL ON
 *
 * One of the parameters used to configure the machine is rewritten while the tool direction thermal displacement compensation function is enabled
 */
export class DS1932_DigitalInputThermalSignalOn extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1932",
      message: "DI.THML SIGNAL ON",
      description: `One of the parameters used to configure the machine is rewritten while the tool direction thermal displacement compensation function is enabled`
    });
  }
}

/**
 * NEED REF RETURN(SYNC:MIX:OVL)
 *
 * The relation between a machine coordinate of an axis in synchronization, composition, or superposition control, and the absolute, or relative coordinate was displaced. Perform the manual return to the reference position
 */
export class DS1933_NeedRefReturnSyncMixOvl extends RuntimeAlarm {
  constructor() {
    super({
      number: "DS1933",
      message: "NEED REF RETURN(SYNC:MIX:OVL)",
      description: `The relation between a machine coordinate of an axis in synchronization, composition, or superposition control, and the absolute, or relative coordinate was displaced. Perform the manual return to the reference position`
    });
  }
}

/**
 * + OVERTRAVEL ( SOFT 1 )
 *
 * The malfunction prevention function detected that stored stroke check 1 on the positive side was exceeded
 */
export class IE0001_PositiveOvertravelSoft1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0001",
      message: "+ OVERTRAVEL ( SOFT 1 )",
      description: `The malfunction prevention function detected that stored stroke check 1 on the positive side was exceeded`
    });
  }
}

/**
 * - OVERTRAVEL ( SOFT 1 )
 *
 * The malfunction prevention function detected that stored stroke check 1 on the negative side was exceeded
 */
export class IE0002_NegativeOvertravelSoft1 extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0002",
      message: "- OVERTRAVEL ( SOFT 1 )",
      description: `The malfunction prevention function detected that stored stroke check 1 on the negative side was exceeded`
    });
  }
}

/**
 * + OVERTRAVEL ( SOFT 2 )
 *
 * The malfunction prevention function detected that stored stroke check 2 on the positive side was exceeded
 */
export class IE0003_PositiveOvertravelSoft2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0003",
      message: "+ OVERTRAVEL ( SOFT 2 )",
      description: `The malfunction prevention function detected that stored stroke check 2 on the positive side was exceeded`
    });
  }
}

/**
 * - OVERTRAVEL ( SOFT 2 )
 *
 * The malfunction prevention function detected that stored stroke check 2 on the negative side was exceeded
 */
export class IE0004_NegativeOvertravelSoft2 extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0004",
      message: "- OVERTRAVEL ( SOFT 2 )",
      description: `The malfunction prevention function detected that stored stroke check 2 on the negative side was exceeded`
    });
  }
}

/**
 * + OVERTRAVEL ( SOFT 3 )
 *
 * The malfunction prevention function detected that stored stroke check 3 on the positive side was exceeded
 */
export class IE0005_PositiveOvertravelSoft3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0005",
      message: "+ OVERTRAVEL ( SOFT 3 )",
      description: `The malfunction prevention function detected that stored stroke check 3 on the positive side was exceeded`
    });
  }
}

/**
 * - OVERTRAVEL ( SOFT 3 )
 *
 * The malfunction prevention function detected that stored stroke check 3 on the negative side was exceeded
 */
export class IE0006_NegativeOvertravelSoft3 extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0006",
      message: "- OVERTRAVEL ( SOFT 3 )",
      description: `The malfunction prevention function detected that stored stroke check 3 on the negative side was exceeded`
    });
  }
}

/**
 * EXCESS MAXIMUM REV. DATA
 *
 * The malfunction prevention function detected the command in which a value exceeding the maximum speed was specified
 */
export class IE0007_ExcessMaximumRevolutionData extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0007",
      message: "EXCESS MAXIMUM REV. DATA",
      description: `The malfunction prevention function detected the command in which a value exceeding the maximum speed was specified`
    });
  }
}

/**
 * ILLEGAL ACC/DEC
 *
 * The malfunction prevention function detected the acceleration/deceleration error
 */
export class IE0008_IllegalAccDec extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0008",
      message: "ILLEGAL ACC/DEC",
      description: `The malfunction prevention function detected the acceleration/deceleration error`
    });
  }
}

/**
 * ILLEGAL MCN COODINATE
 *
 * The malfunction prevention function detected the displacement of a machine coordinate in the check point
 */
export class IE0009_IllegalMcnCoodinate extends RuntimeAlarm {
  constructor() {
    super({
      number: "IE0009",
      message: "ILLEGAL MCN COODINATE",
      description: `The malfunction prevention function detected the displacement of a machine coordinate in the check point`
    });
  }
}
