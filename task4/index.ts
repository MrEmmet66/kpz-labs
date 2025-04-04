import { SmartTextReader } from './SmartTextReader';
import { SmartTextChecker } from './SmartTextChecker';
import { SmartTextReaderLocker } from './SmartTextReaderLocker';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path
const currentDir = process.cwd();

function printTextArray(textArray: string[][]): void {
    console.log("Content as 2D array (showing first 3 lines):");
    for (let i = 0; i < Math.min(3, textArray.length); i++) {
        console.log(`Line ${i + 1}: [${textArray[i].join(', ')}]`);
    }
    if (textArray.length > 3) {
        console.log("...(more lines)");
    }
}

function main() {
    console.log("Smart Text Reader with Proxy Pattern Demo\n");
    
    // Create file paths using absolute paths
    const exampleFilePath = path.join(currentDir, 'task4', 'example.txt');
    const restrictedFilePath = path.join(currentDir, 'task4', 'restricted.txt');
    const nonExistentFilePath = path.join(currentDir, 'task4', 'nonexistent.txt');
    
    // 1. Basic SmartTextReader
    console.log("\n===== BASIC READER =====");
    const reader = new SmartTextReader();
    console.log("Reading example.txt with basic reader:");
    const basicResult = reader.readTextFromFile(exampleFilePath);
    printTextArray(basicResult);
    
    // 2. SmartTextChecker (logging proxy)
    console.log("\n===== LOGGING PROXY =====");
    const checkerProxy = new SmartTextChecker(reader);
    console.log("Reading example.txt with logging proxy:");
    const checkerResult = checkerProxy.readTextFromFile(exampleFilePath);
    
    // Try reading non-existent file with logging proxy
    console.log("\nAttempting to read non-existent file with logging proxy:");
    checkerProxy.readTextFromFile(nonExistentFilePath);
    
    // 3. SmartTextReaderLocker (access control proxy)
    console.log("\n===== ACCESS CONTROL PROXY =====");
    // Create a locker that restricts access to files with "restricted" in the name
    const lockerProxy = new SmartTextReaderLocker(reader, "restricted");
    
    // Try to read the allowed file
    console.log("Reading allowed file (example.txt):");
    const lockerAllowedResult = lockerProxy.readTextFromFile(exampleFilePath);
    printTextArray(lockerAllowedResult);
    
    // Try to read the restricted file
    console.log("\nAttempting to read restricted file (restricted.txt):");
    lockerProxy.readTextFromFile(restrictedFilePath);
    
    // 4. Combining proxies
    console.log("\n===== COMBINED PROXIES =====");
    // First the logger, then the access control
    const combinedProxy = new SmartTextReaderLocker(
        new SmartTextChecker(reader),
        "restricted"
    );
    
    console.log("Reading allowed file through combined proxies:");
    combinedProxy.readTextFromFile(exampleFilePath);
    
    console.log("\nAttempting to read restricted file through combined proxies:");
    combinedProxy.readTextFromFile(restrictedFilePath);
}

// Run the demo
main();
