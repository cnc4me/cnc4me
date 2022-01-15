import MacroLexer from "../lexer/MacroLexer";
import MacroParser from "./MacroParser";

const parser = new MacroParser();

function parseInput(text) {
  const lexingResult = MacroLexer.tokenize(text);
  // "input" is a setter which will reset the parser's state.
  parser.input = lexingResult.tokens;
  parser.valueAddress();

  if (parser.errors.length > 0) {
    throw new Error("sad sad panda, Parsing errors detected");
  }
}

const inputText = "X12.3523";

parseInput(inputText);
