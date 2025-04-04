export class Logger {
    public Log(message: string): void {
        console.log('\x1b[32m%s\x1b[0m', message); // Green color
    }

    public Error(message: string): void {
        console.log('\x1b[31m%s\x1b[0m', message); // Red color
    }

    public Warn(message: string): void {
        console.log('\x1b[33m%s\x1b[0m', message); // Orange/Yellow color
    }
}
