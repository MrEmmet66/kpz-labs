export class Logger {
    public Log(message: string): void {
        console.log('\x1b[32m%s\x1b[0m', message);
    }

    public Error(message: string): void {
        console.log('\x1b[31m%s\x1b[0m', message);
    }

    public Warn(message: string): void {
        console.log('\x1b[33m%s\x1b[0m', message);
    }
}
