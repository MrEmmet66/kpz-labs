import { ITextReader } from './ITextReader';

export class SmartTextReaderLocker implements ITextReader {
    private reader: ITextReader;
    private restrictionPattern: RegExp;
    
    constructor(reader: ITextReader, restrictionPattern: string) {
        this.reader = reader;
        this.restrictionPattern = new RegExp(restrictionPattern);
    }
    
    readTextFromFile(filePath: string): string[][] {
        if (this.restrictionPattern.test(filePath)) {
            console.log(`Access denied! File ${filePath} matches restricted pattern.`);
            return [];
        }
        
        return this.reader.readTextFromFile(filePath);
    }
}
