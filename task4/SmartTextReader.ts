import * as fs from 'fs';
import { ITextReader } from './ITextReader';

export class SmartTextReader implements ITextReader {
    readTextFromFile(filePath: string): string[][] {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            
            const lines = fileContent.split('\n');
            const result: string[][] = [];
            
            for (const line of lines) {
                result.push(line.split(''));
            }
            
            return result;
        } catch (error) {
            console.error(`Error reading file: ${error.message}`);
            return [];
        }
    }
}
