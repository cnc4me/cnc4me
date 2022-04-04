import { G10ParseResult, PossibleG10LineValues } from "../../types/g10";
import { createToolchain } from "../../utils/createToolchain";

export class G10Line {
  L: number;
  P: number;
  R?: number;
  X?: number;
  Y?: number;
  Z?: number;
  B?: number;

  /**
   * Parsing a string of text as a G10 line for values
   *
   * @TODO this is DIRTY
   */
  static parse(input: string): G10ParseResult {
    const { errors, parser, interpreter } = createToolchain({ preloadInput: input });

    if (errors.length > 0) {
      return { error: errors[0].message, result: null };
    }

    const lineCst = parser.lines();
    const result = interpreter.lines(lineCst.children);

    if (!result[0].gCodeMap["G10"]) {
      return { error: `G10 not found in ${input}.`, result: null };
    }

    // const addressValueTuples = .map(a => [a.prefix, a.value]);

    const addresses = result[0].addresses.reduce((values, currAddr) => {
      return {
        ...values,
        [currAddr.prefix]: currAddr.value
      };
    }, {} as PossibleG10LineValues);

    return { error: null, result: addresses };
  }

  constructor(L: number, P: number, X?: number, Y?: number, Z?: number, B?: number, R?: number) {
    this.L = L;
    this.P = P;
    this.R = R;
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.B = B;
  }
}
