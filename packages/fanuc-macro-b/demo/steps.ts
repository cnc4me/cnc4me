import { interpreter, parser, tokenize } from "../src/";

const result = tokenize(`
#1=1.12345678
#2=[3*#1]
#3=#1+#2
#4=#3*[#3-5]
#5=#4*#3`);

parser.input = result.tokens;

interpreter.logger.setConfig({ decimals: 5 });
interpreter.onLog(console.log);

interpreter.visit(parser.lines());
