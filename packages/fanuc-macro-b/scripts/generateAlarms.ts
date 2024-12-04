import { readFileSync } from "node:fs";
import path from "node:path";

import * as prettier from "prettier";

import { joinCwd, writeFile } from "./common";

type RuntimeAlarmRecord = {
  description: string;
  message: string;
  number: string;
};

const alarmsDir = joinCwd("src", "alarms");
const inputJsonFile = path.join(alarmsDir, "alarms.json");
const outputTsFile = path.join(alarmsDir, "alarms.ts");

// Load the JSON data
const alarms = JSON.parse(
  readFileSync(inputJsonFile, "utf-8")
) as RuntimeAlarmRecord[];

function normalize(input: string) {
  return input
    .replace(/\+/, "POSITIVE")
    .replace(/^-|-$/, "NEGATIVE")
    .replace("=", "EQUALS")
    .replace(",", "COMMA")
    .replace("&", "AND")
    .replace("#200-#499", "REG 200_499 ")
    .replace("#500-#549", "REG 500_549 ")
    .replace("#", "REG") // Do not move after ^
    .replace("[ ]", "BRACKETS")
    .replace("POW", "POWER")
    .replace("NO.", "NUMBER")
    .replace("AFT.", "AFTER")
    .replace("BLK.", "BLOCK")
    .replace("DATA.", "DATA")
    .replace("DIA.", "DIAMETER")
    .replace("AVD.", "ADVANCE")
    .replace("RAD.", "RADIUS")
    .replace("D.C.S.", "DCS")
    .replace("D.C.S", "DCS") // Do not move after ^
    .replace("VAR.", "VARIABLE")
    .replace("CNV.", "CONVERTER")
    .replace("TRANS.", "TRANSFER")
    .replace("INV.", "INVERTER")
    .replace("EX.", "EXCESSIVE")
    .replace("CONV.", "CONVERSION")
    .replace("COMP.", "COMPENSATION")
    .replace("OP.", "OPERATION")
    .replace("AMP.", "AMPLIFIER")
    .replace("REV.", "REVOLUTION")
    .replace("THML", " THERMAL")
    .replace("*DEC", "DECELERATION")
    .replace("PARAM.", "PARAMETER")
    .replace("ACC.", "ACCELERATION")
    .replace("DI.", "DIGITAL INPUT")
    .replace("CAN'T", "CANNOT")
    .replace("(OH)", " OVER HEAT")
    .replace("AX[]", "AX ARRAY")
    .replace("AXNUM[]", "AX NUM ARRAY")
    .replace(
      /(\w)(\w*)/g,
      (_, g1: string, g2: string) => g1.toUpperCase() + g2.toLowerCase()
    )
    .replaceAll(/(\d)\.(\d)/g, "$1_$2")
    .replaceAll(/\s|\(|\)|:|,|'|-|\//g, "");
}

function generateSource() {
  let tsContent = `// THIS FILE WAS GENERATED @ ${new Date().toISOString()}

/**
 * Base error class for {@link MacroRuntime} to throw machine alarms.
 */
export class RuntimeAlarm extends Error {
  number: number | string;
  description: string;
  constructor(alarm: { number: number | string, message: string, description: string }) {
    super(alarm.message);
    this.number = alarm.number;
    this.description = alarm.description;
    this.name = this.constructor.name;
  }
}
`;

  for (const { description, message, number } of alarms) {
    const prefix = /\d/.test(number[0]) ? `A${number}` : number;

    let className = normalize(message);

    if (Number(number) === 367) {
      // console.log(className);
      className = className.split("As")[0];
    }

    tsContent += `
/**
 * ${message}
 *
 * ${description}
 */
export class ${prefix}_${className} extends RuntimeAlarm {
  constructor() {
    super({
      number: ${typeof number === "string" ? `"${number}"` : number},
      message: "${message}",
      description: \`${description}\`
    });
  }
}
`;
  }
  return tsContent;
}

void (async () => {
  const source = generateSource();
  const formatted = await prettier.format(source, {
    parser: "typescript",
    trailingComma: "none",
    semi: true,
    printWidth: 120
  });

  writeFile(outputTsFile, formatted);
})();
