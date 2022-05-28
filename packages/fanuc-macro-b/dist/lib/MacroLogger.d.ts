export interface LoggerConfig {
    decimals: number;
    listener: (entry: unknown) => void;
}
export declare class MacroLogger {
    config: LoggerConfig;
    private logLines;
    log(arg: string | number): void;
    setConfig(config: Partial<LoggerConfig>): void;
    operation(lhs: number | string, operator: string, rhs: number | string): void;
    tap(listener: LoggerConfig["listener"]): void;
    getLog(): string[];
    private round;
}
