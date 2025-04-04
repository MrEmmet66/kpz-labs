import { Logger } from './task1/Logger';
import { FileLoggerAdapter } from './task1/FileLoggerAdapter';

import { Warrior, Mage, Paladin } from './task2/ConcreteHeroes';
import { 
    Sword, 
    Staff, 
    PlateArmor, 
    Robe, 
    AmuletOfPower, 
    RingOfProtection 
} from './task2/InventoryDecorators';
import { Hero } from './task2/Hero';

import { VectorRenderer, RasterRenderer } from './task3/Renderer';
import { Circle, Square, Triangle } from './task3/Shape';

import { SmartTextReader } from './task4/SmartTextReader';
import { SmartTextChecker } from './task4/SmartTextChecker';
import { SmartTextReaderLocker } from './task4/SmartTextReaderLocker';
import * as path from 'path';

import { LightNode } from './task5/LightNode';
import { LightTextNode } from './task5/LightTextNode';
import { LightElementNode, DisplayType, CloseType } from './task5/LightElementNode';

import { BookHtmlConverter } from './task6/BookHtmlConverter';
import { FlyweightHtmlConverter } from './task6/FlyweightHtmlConverter';
import * as fs from 'fs';

const currentDir = process.cwd();

function demoTask1() {
    console.log("\n===== TASK 1: ADAPTER PATTERN DEMO =====");
    
    console.log("Using Console Logger:");
    const consoleLogger = new Logger();
    consoleLogger.Log("This is a normal log message");
    consoleLogger.Error("This is an error message");
    consoleLogger.Warn("This is a warning message");

    console.log("\nUsing File Logger Adapter:");
    const fileLogger = new FileLoggerAdapter("./log.txt");
    fileLogger.Log("Normal message saved to file");
    fileLogger.Error("Error message saved to file");
    fileLogger.Warn("Warning message saved to file");
    
    console.log("Logs have been written to log.txt");
}

function demoTask2() {
    console.log("\n===== TASK 2: RPG HERO DECORATOR PATTERN DEMO =====");
    
    function displayHeroStats(hero: Hero): void {
        console.log(`\n${hero.getName()} Stats:`);
        console.log(`Description: ${hero.getDescription()}`);
        console.log(`Attack: ${hero.getAttack()}`);
        console.log(`Defense: ${hero.getDefense()}`);
        console.log(`Magic: ${hero.getMagic()}`);
        console.log('------------------------');
    }
    
    console.log("RPG Hero Decorator Demo\n");

    const warrior = new Warrior();
    const mage = new Mage();
    const paladin = new Paladin();

    console.log("Base Heroes:");
    displayHeroStats(warrior);
    displayHeroStats(mage);
    displayHeroStats(paladin);

    console.log("\nEquipped Heroes:");
    
    const equippedWarrior = new PlateArmor(new Sword(warrior));
    displayHeroStats(equippedWarrior);
    
    const equippedMage = new AmuletOfPower(new Robe(new Staff(mage)));
    displayHeroStats(equippedMage);
    
    const equippedPaladin = new RingOfProtection(new PlateArmor(new Sword(paladin)));
    displayHeroStats(equippedPaladin);

    console.log("\nHero with Multiple Items of Same Type:");
    const twoRingsPaladin = new RingOfProtection(new RingOfProtection(paladin));
    displayHeroStats(twoRingsPaladin);
}

function demoTask3() {
    console.log("\n===== TASK 3: GRAPHICS EDITOR BRIDGE PATTERN DEMO =====");
    
    console.log("Graphics Editor with Bridge Pattern Demo\n");
    
    const vectorRenderer = new VectorRenderer();
    const rasterRenderer = new RasterRenderer();
    
    console.log("VECTOR RENDERING:");
    const vectorCircle = new Circle(vectorRenderer, 5);
    const vectorSquare = new Square(vectorRenderer, 4);
    const vectorTriangle = new Triangle(vectorRenderer, 3);
    
    vectorCircle.draw();
    vectorSquare.draw();
    vectorTriangle.draw();
    
    vectorCircle.resize(2);
    vectorCircle.draw();
    
    console.log("\nRASTER RENDERING:");
    const rasterCircle = new Circle(rasterRenderer, 5);
    const rasterSquare = new Square(rasterRenderer, 4);
    const rasterTriangle = new Triangle(rasterRenderer, 3);
    
    rasterCircle.draw();
    rasterSquare.draw();
    rasterTriangle.draw();
    
    rasterSquare.resize(0.5);
    rasterSquare.draw();
    
    console.log("\nCHANGING RENDERERS:");
    const circle = new Circle(vectorRenderer);
    console.log("Initially with vector renderer:");
    circle.draw();
    
    const circleWithRaster = new Circle(rasterRenderer);
    console.log("Then with raster renderer:");
    circleWithRaster.draw();
}

function demoTask4() {
    console.log("\n===== TASK 4: SMART TEXT READER PROXY PATTERN DEMO =====");
    
    function printTextArray(textArray: string[][]): void {
        console.log("Content as 2D array (showing first 3 lines):");
        for (let i = 0; i < Math.min(3, textArray.length); i++) {
            console.log(`Line ${i + 1}: [${textArray[i].join(', ')}]`);
        }
        if (textArray.length > 3) {
            console.log("...(more lines)");
        }
    }
    
    console.log("Smart Text Reader with Proxy Pattern Demo\n");
    
    const exampleFilePath = path.join(currentDir, 'task4', 'example.txt');
    const restrictedFilePath = path.join(currentDir, 'task4', 'restricted.txt');
    const nonExistentFilePath = path.join(currentDir, 'task4', 'nonexistent.txt');
    
    console.log("\n===== BASIC READER =====");
    const reader = new SmartTextReader();
    console.log("Reading example.txt with basic reader:");
    const basicResult = reader.readTextFromFile(exampleFilePath);
    printTextArray(basicResult);
    
    console.log("\n===== LOGGING PROXY =====");
    const checkerProxy = new SmartTextChecker(reader);
    console.log("Reading example.txt with logging proxy:");
    const checkerResult = checkerProxy.readTextFromFile(exampleFilePath);
    
    console.log("\nAttempting to read non-existent file with logging proxy:");
    checkerProxy.readTextFromFile(nonExistentFilePath);
    
    console.log("\n===== ACCESS CONTROL PROXY =====");
    const lockerProxy = new SmartTextReaderLocker(reader, "restricted");
    
    console.log("Reading allowed file (example.txt):");
    const lockerAllowedResult = lockerProxy.readTextFromFile(exampleFilePath);
    printTextArray(lockerAllowedResult);
    
    console.log("\nAttempting to read restricted file (restricted.txt):");
    lockerProxy.readTextFromFile(restrictedFilePath);
    
    console.log("\n===== COMBINED PROXIES =====");
    const combinedProxy = new SmartTextReaderLocker(
        new SmartTextChecker(reader),
        "restricted"
    );
    
    console.log("Reading allowed file through combined proxies:");
    combinedProxy.readTextFromFile(exampleFilePath);
    
    console.log("\nAttempting to read restricted file through combined proxies:");
    combinedProxy.readTextFromFile(restrictedFilePath);
}

function demoTask5() {
    console.log("\n===== TASK 5: LIGHT HTML COMPOSITE PATTERN DEMO =====");
    
    function createSimpleList(): LightElementNode {
        const ul = new LightElementNode('ul').addClass('list').addClass('fancy-list');
        
        const item1 = new LightElementNode('li', DisplayType.BLOCK);
        item1.addChild(new LightTextNode('First item'));
        
        const item2 = new LightElementNode('li', DisplayType.BLOCK);
        item2.addChild(new LightTextNode('Second item'));
        
        const item3 = new LightElementNode('li', DisplayType.BLOCK);
        item3.addChild(new LightTextNode('Third item'));
        
        ul.addChild(item1).addChild(item2).addChild(item3);
        
        return ul;
    }
    
    function createTable(): LightElementNode {
        const table = new LightElementNode('table').addClass('data-table');
        
        const thead = new LightElementNode('thead');
        const headerRow = new LightElementNode('tr');
        
        const th1 = new LightElementNode('th');
        th1.addChild(new LightTextNode('Name'));
        
        const th2 = new LightElementNode('th');
        th2.addChild(new LightTextNode('Age'));
        
        const th3 = new LightElementNode('th');
        th3.addChild(new LightTextNode('Country'));
        
        headerRow.addChild(th1).addChild(th2).addChild(th3);
        thead.addChild(headerRow);
        
        const tbody = new LightElementNode('tbody');
        
        const createRow = (name: string, age: string, country: string): LightElementNode => {
            const row = new LightElementNode('tr');
            
            const td1 = new LightElementNode('td');
            td1.addChild(new LightTextNode(name));
            
            const td2 = new LightElementNode('td');
            td2.addChild(new LightTextNode(age));
            
            const td3 = new LightElementNode('td');
            td3.addChild(new LightTextNode(country));
            
            row.addChild(td1).addChild(td2).addChild(td3);
            return row;
        };
        
        tbody.addChild(createRow('John', '28', 'USA'));
        tbody.addChild(createRow('Maria', '33', 'Spain'));
        tbody.addChild(createRow('Yuki', '24', 'Japan'));
        
        table.addChild(thead).addChild(tbody);
        
        return table;
    }
    
    function createComplexStructure(): LightElementNode {
        const article = new LightElementNode('article').addClass('blog-post');
        
        const header = new LightElementNode('header');
        const h1 = new LightElementNode('h1');
        h1.addChild(new LightTextNode('Light HTML Demo'));
        header.addChild(h1);
        
        const authorDiv = new LightElementNode('div').addClass('author-info');
        const img = new LightElementNode('img', DisplayType.INLINE, CloseType.SELF_CLOSING);
        authorDiv.addChild(img);
        
        const authorName = new LightElementNode('span').addClass('author-name');
        authorName.addChild(new LightTextNode('John Smith'));
        authorDiv.addChild(authorName);
        
        const content = new LightElementNode('div').addClass('content');
        const p1 = new LightElementNode('p');
        p1.addChild(new LightTextNode('This is a demonstration of our Light HTML markup language.'));
        
        const p2 = new LightElementNode('p');
        p2.addChild(new LightTextNode('It uses the Composite pattern to build HTML structures.'));
        
        content.addChild(p1).addChild(p2);
        
        const listSection = new LightElementNode('section');
        const h2 = new LightElementNode('h2');
        h2.addChild(new LightTextNode('Features'));
        listSection.addChild(h2);
        listSection.addChild(createSimpleList());
        
        article.addChild(header)
            .addChild(authorDiv)
            .addChild(content)
            .addChild(listSection);
        
        return article;
    }
    
    console.log("Light HTML Markup Language Demo\n");
    
    console.log("Simple List:");
    const list = createSimpleList();
    console.log(list.outerHTML());
    console.log(`Child count: ${list.getChildCount()}`);
    console.log(`CSS classes: ${list.getCssClasses().join(', ')}`);
    
    console.log("\nTable Example:");
    const table = createTable();
    console.log(table.outerHTML());
    
    console.log("\nComplex Structure:");
    const article = createComplexStructure();
    console.log(article.outerHTML());
    
    console.log("\nInnerHTML vs OuterHTML:");
    const div = new LightElementNode('div').addClass('container');
    const span = new LightElementNode('span', DisplayType.INLINE);
    span.addChild(new LightTextNode('This is inside a span'));
    div.addChild(span);
    
    console.log("div.innerHTML():");
    console.log(div.innerHTML());
    
    console.log("div.outerHTML():");
    console.log(div.outerHTML());
}

function demoTask6() {
    console.log("\n===== TASK 6: LIGHT HTML FLYWEIGHT PATTERN DEMO =====");
    
    function formatBytes(bytes: number): string {
        if (bytes < 1024) return bytes + " bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
        else return (bytes / 1048576).toFixed(2) + " MB";
    }
    
    console.log("LightHTML Book Converter with Flyweight Pattern Demo\n");
    
    const bookFilePath = path.join(currentDir, 'task6', 'book.txt');
    
    console.log("Converting book to HTML without Flyweight pattern...");
    const regularConverter = new BookHtmlConverter();
    const regularStartTime = Date.now();
    const regularHtml = regularConverter.convertTextToHtml(bookFilePath);
    const regularEndTime = Date.now();
    
    console.log("Regular conversion completed in", regularEndTime - regularStartTime, "ms");
    
    const regularMemoryUsage = regularConverter.measureMemoryUsage(regularHtml);
    console.log("Regular HTML memory usage (estimated):", formatBytes(regularMemoryUsage));
    
    console.log("\nRegular HTML Preview (first 200 chars):");
    console.log(regularHtml.outerHTML().substring(0, 200) + "...");
    
    console.log("\nConverting book to HTML with Flyweight pattern...");
    const flyweightConverter = new FlyweightHtmlConverter();
    const flyweightStartTime = Date.now();
    const flyweightHtml = flyweightConverter.convertTextToHtml(bookFilePath);
    const flyweightEndTime = Date.now();
    
    console.log("Flyweight conversion completed in", flyweightEndTime - flyweightStartTime, "ms");
    
    const flyweightMemoryUsage = flyweightConverter.measureMemoryUsage(flyweightHtml);
    console.log("Flyweight HTML memory usage (estimated):", formatBytes(flyweightMemoryUsage));
    
    console.log("\nFlyweight HTML Preview (first 200 chars):");
    console.log(flyweightHtml.outerHTML().substring(0, 200) + "...");
    
    const factoryInfo = flyweightConverter.getFactoryInfo();
    console.log("\nFlyweight Factory Information:");
    console.log(`- Element types in pool: ${factoryInfo.poolSize}`);
    
    const memorySaved = regularMemoryUsage - flyweightMemoryUsage;
    const savingsPercentage = ((memorySaved / regularMemoryUsage) * 100).toFixed(2);
    console.log("\nMemory Savings:");
    console.log(`- Saved: ${formatBytes(memorySaved)}`);
    console.log(`- Percentage: ${savingsPercentage}%`);
    
    const regularOutput = regularHtml.outerHTML();
    const flyweightOutput = flyweightHtml.outerHTML();
    console.log("\nOutput verification:");
    console.log("Outputs are identical:", regularOutput === flyweightOutput);
}

function main() {
    console.log("DESIGN PATTERNS DEMO");
    
    demoTask1();
    demoTask2();
    demoTask3();
    demoTask4();
    demoTask5();
    demoTask6();
    
    console.log("\n===== ALL DEMOS COMPLETED =====");
}

main();
