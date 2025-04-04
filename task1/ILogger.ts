export interface ILogger {
    Log(message: string): void;
    Error(message: string): void;
    Warn(message: string): void;
}
