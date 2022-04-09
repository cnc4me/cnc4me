import { assertIsAddressToken, NcToken } from "../../NcLexer";
import { getDefinition } from "../../NcSpec";
import { CodeDefinition, Tokens } from "../../types";
import { splitParse } from "./helpers";
import { Mcode } from "./Mcode";

export class Address {
  prefix: string;
  value: number;

  static fromString(address: string): Address | Mcode {
    const { prefix, value } = splitParse(address);

    return new Address(prefix, value);
  }

  static fromToken(token: NcToken): Address {
    if (token.type !== Tokens.ADDRESS) {
      throw Error(`Token must be of type "ADDR"`);
    }

    assertIsAddressToken(token);

    return new Address(token.prefix, token.value);
  }

  constructor(prefix: string, value: number) {
    this.value = value;
    this.prefix = prefix;
  }

  get definition(): CodeDefinition {
    return getDefinition(this);
  }

  get isGcode(): boolean {
    return this.prefix === "G";
  }

  get isMcode(): boolean {
    return this.prefix === "M";
  }

  get isZero(): boolean {
    return this.value === 0;
  }

  get isPositive(): boolean {
    return this.value > 0;
  }

  get isNegative(): boolean {
    return this.value < 0;
  }

  toString(): string {
    return `${this.prefix}${this.value}`;
  }
}
