import winston from "winston";

const { combine, label, json } = winston.format;

const ConsoleTransport = new winston.transports.Console({
  level: "silly"
});

const CombinedFileTransport = new winston.transports.File({
  filename: "combined.log"
});

export const loggers = new winston.Container();

loggers.add("lexer", {
  format: combine(label({ label: "MacroLexer" }), json()),
  transports: [ConsoleTransport, CombinedFileTransport]
});

loggers.add("parser", {
  format: combine(label({ label: "MacroParser" }), json()),
  transports: [ConsoleTransport, CombinedFileTransport]
});

loggers.add("interpreter", {
  format: combine(label({ label: "MacroInterpreter" }), json()),
  transports: [ConsoleTransport, CombinedFileTransport]
});

loggers.add("memory", {
  format: combine(label({ label: "MacroMemory" }), json()),
  transports: [ConsoleTransport, CombinedFileTransport]
});

loggers.add("runtime", {
  format: combine(label({ label: "MacroRuntime" }), json()),
  transports: [ConsoleTransport, CombinedFileTransport]
});
