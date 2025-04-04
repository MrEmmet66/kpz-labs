import { ITextReader } from './ITextReader';

export class SmartTextChecker implements ITextReader {
    private reader: ITextReader;
    
    constructor(reader: ITextReader) {
        this.reader = reader;
    }
    
    readTextFromFile(filePath: string): string[][] {
        console.log(`[INFO] Opening file: ${filePath}`);
        
        try {
            const startTime = Date.now();
            const result = this.reader.readTextFromFile(filePath);
            const endTime = Date.now();
            
            console.log(`[INFO] File successfully read in ${endTime - startTime}ms`);
            
            const lineCount = result.length;
            let characterCount = 0;
            
            for (const line of result) {
                characterCount += line.length;
            }
            
            console.log(`[STATS] Total lines: ${lineCount}`);
            console.log(`[STATS] Total characters: ${characterCount}`);
            console.log(`[INFO] File closed: ${filePath}`);
            
            return result;
        } catch (error) {
            console.log(`[ERROR] Failed to read file: ${error.message}`);
            return [];
        }
    }
}
