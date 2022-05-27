export class MacroLogger {
    config = {
        decimals: 5,
        listener: a => a
    };
    logLines = [];
    log(arg) {
        this.config.listener(arg);
        this.logLines.push(String(arg));
    }
    setConfig(config) {
        this.config = { ...this.config, ...config };
    }
    operation(lhs, operator, rhs) {
        const pad = (a) => String(a).padStart(this.config.decimals + 3, " ");
        const opNum = String(this.logLines.length + 1).padStart(4, "0");
        const leftArg = pad(typeof lhs === "number" ? this.round(lhs) : lhs);
        const rightArg = pad(typeof rhs === "number" ? this.round(rhs) : rhs);
        this.log(`[${opNum}] ${operator} ${leftArg} ${rightArg}`);
    }
    tap(listener) {
        this.config.listener = listener;
    }
    getLog() {
        return this.logLines;
    }
    round(value) {
        const { decimals } = this.config;
        const val = Math.round(Number(`${value}e${decimals}`));
        return Number(`${val}e-${decimals}`);
    }
}
