import * as fs from 'fs';

export class FileWriter {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public Write(content: string): void {
        fs.appendFileSync(this.filePath, content);
    }

    public WriteLine(content: string): void {
        fs.appendFileSync(this.filePath, content + '\n');
    }
}
