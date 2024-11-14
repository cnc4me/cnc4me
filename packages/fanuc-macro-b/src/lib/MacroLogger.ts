export interface LoggerConfig {
  decimals: number;
  listener: (entry: unknown) => void;
}

export class MacroLogger {
  public config: LoggerConfig = {
    decimals: 5,
    listener: a => a
  };

  private logLines: string[] = [];

  public log(arg: string | number) {
    this.config.listener(arg);

    this.logLines.push(String(arg));
  }

  public setConfig(config: Partial<LoggerConfig>) {
    this.config = { ...this.config, ...config };
  }

  public operation(
    lhs: number | string,
    operator: string,
    rhs: number | string
  ) {
    const pad = (a: string | number) =>
      String(a).padStart(this.config.decimals + 3, " ");
    const opNum = String(this.logLines.length + 1).padStart(4, "0");

    const leftArg = pad(typeof lhs === "number" ? this.round(lhs) : lhs);
    const rightArg = pad(typeof rhs === "number" ? this.round(rhs) : rhs);

    this.log(`[${opNum}] ${operator} ${leftArg} ${rightArg}`);
  }

  public tap(listener: LoggerConfig["listener"]) {
    this.config.listener = listener;
  }

  public getLog() {
    return this.logLines;
  }

  private round(value: number) {
    const { decimals } = this.config;

    const val = Math.round(Number(`${value}e${decimals}`));

    return Number(`${val}e-${decimals}`);
  }
}
