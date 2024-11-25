export interface LoggerConfig {
  decimals: number;
  listener: (entry: unknown) => void;
}

export class MacroLogger {
  config: LoggerConfig = {
    decimals: 5,
    listener: a => a
  };

  #logLines: string[] = [];

  log(arg: string | number) {
    this.config.listener(arg);

    this.#logLines.push(String(arg));
  }

  setConfig(config: Partial<LoggerConfig>) {
    this.config = { ...this.config, ...config };
  }

  operation(lhs: number | string, operator: string, rhs: number | string) {
    const pad = (a: string | number) =>
      String(a).padStart(this.config.decimals + 3, " ");
    const opNum = String(this.#logLines.length + 1).padStart(4, "0");

    const leftArg = pad(typeof lhs === "number" ? this._round(lhs) : lhs);
    const rightArg = pad(typeof rhs === "number" ? this._round(rhs) : rhs);

    this.log(`[${opNum}] ${operator} ${leftArg} ${rightArg}`);
  }

  tap(listener: LoggerConfig["listener"]) {
    this.config.listener = listener;
  }

  getLog() {
    return this.#logLines;
  }

  private _round(value: number) {
    const { decimals } = this.config;

    const val = Math.round(Number(`${value}e${decimals}`));

    return Number(`${val}e-${decimals}`);
  }
}
