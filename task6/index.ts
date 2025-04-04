import * as path from 'path';
import { BookHtmlConverter } from './BookHtmlConverter';
import { FlyweightHtmlConverter } from './FlyweightHtmlConverter';

function formatBytes(bytes: number): string {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
}

function main() {
    console.log("LightHTML Book Converter with Flyweight Pattern Demo\n");
    
    // File path to the book
    const currentDir = process.cwd();
    const bookFilePath = path.join(currentDir, 'task6', 'book.txt');
    
    // ------------------------
    // Regular approach without Flyweight pattern
    // ------------------------
    console.log("Converting book to HTML without Flyweight pattern...");
    const regularConverter = new BookHtmlConverter();
    const regularStartTime = Date.now();
    const regularHtml = regularConverter.convertTextToHtml(bookFilePath);
    const regularEndTime = Date.now();
    
    console.log("Regular conversion completed in", regularEndTime - regularStartTime, "ms");
    
    // Measure memory usage
    const regularMemoryUsage = regularConverter.measureMemoryUsage(regularHtml);
    console.log("Regular HTML memory usage (estimated):", formatBytes(regularMemoryUsage));
    
    // Output HTML preview
    console.log("\nRegular HTML Preview (first 200 chars):");
    console.log(regularHtml.outerHTML().substring(0, 200) + "...");
    
    // ------------------------
    // Flyweight approach
    // ------------------------
    console.log("\nConverting book to HTML with Flyweight pattern...");
    const flyweightConverter = new FlyweightHtmlConverter();
    const flyweightStartTime = Date.now();
    const flyweightHtml = flyweightConverter.convertTextToHtml(bookFilePath);
    const flyweightEndTime = Date.now();
    
    console.log("Flyweight conversion completed in", flyweightEndTime - flyweightStartTime, "ms");
    
    // Measure memory usage
    const flyweightMemoryUsage = flyweightConverter.measureMemoryUsage(flyweightHtml);
    console.log("Flyweight HTML memory usage (estimated):", formatBytes(flyweightMemoryUsage));
    
    // Output HTML preview
    console.log("\nFlyweight HTML Preview (first 200 chars):");
    console.log(flyweightHtml.outerHTML().substring(0, 200) + "...");
    
    // Output flyweight factory info
    const factoryInfo = flyweightConverter.getFactoryInfo();
    console.log("\nFlyweight Factory Information:");
    console.log(`- Element types in pool: ${factoryInfo.poolSize}`);
    
    // Calculate memory savings
    const memorySaved = regularMemoryUsage - flyweightMemoryUsage;
    const savingsPercentage = ((memorySaved / regularMemoryUsage) * 100).toFixed(2);
    console.log("\nMemory Savings:");
    console.log(`- Saved: ${formatBytes(memorySaved)}`);
    console.log(`- Percentage: ${savingsPercentage}%`);
    
    // Verify both outputs are identical
    const regularOutput = regularHtml.outerHTML();
    const flyweightOutput = flyweightHtml.outerHTML();
    console.log("\nOutput verification:");
    console.log("Outputs are identical:", regularOutput === flyweightOutput);
}

// Run the demo
main();
