import { ILogger } from './ILogger';
import { FileWriter } from './FileWriter';

export class FileLoggerAdapter implements ILogger {
    private fileWriter: FileWriter;

    constructor(filePath: string) {
        this.fileWriter = new FileWriter(filePath);
    }

    public Log(message: string): void {
        this.fileWriter.WriteLine(`[INFO] ${message}`);
    }

    public Error(message: string): void {
        this.fileWriter.WriteLine(`[ERROR] ${message}`);
    }

    public Warn(message: string): void {
        this.fileWriter.WriteLine(`[WARNING] ${message}`);
    }
}
