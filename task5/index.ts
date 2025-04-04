import { LightNode } from './LightNode';
import { LightTextNode } from './LightTextNode';
import { LightElementNode, DisplayType, CloseType } from './LightElementNode';

function createSimpleList(): LightElementNode {
    // Create a simple unordered list
    const ul = new LightElementNode('ul').addClass('list').addClass('fancy-list');
    
    // Add list items
    const item1 = new LightElementNode('li', DisplayType.BLOCK);
    item1.addChild(new LightTextNode('First item'));
    
    const item2 = new LightElementNode('li', DisplayType.BLOCK);
    item2.addChild(new LightTextNode('Second item'));
    
    const item3 = new LightElementNode('li', DisplayType.BLOCK);
    item3.addChild(new LightTextNode('Third item'));
    
    // Add items to the list
    ul.addChild(item1).addChild(item2).addChild(item3);
    
    return ul;
}

function createTable(): LightElementNode {
    // Create a table with headers and data
    const table = new LightElementNode('table').addClass('data-table');
    
    // Create table header
    const thead = new LightElementNode('thead');
    const headerRow = new LightElementNode('tr');
    
    // Add header cells
    const th1 = new LightElementNode('th');
    th1.addChild(new LightTextNode('Name'));
    
    const th2 = new LightElementNode('th');
    th2.addChild(new LightTextNode('Age'));
    
    const th3 = new LightElementNode('th');
    th3.addChild(new LightTextNode('Country'));
    
    headerRow.addChild(th1).addChild(th2).addChild(th3);
    thead.addChild(headerRow);
    
    // Create table body
    const tbody = new LightElementNode('tbody');
    
    // Add rows
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
    
    // Combine all parts
    table.addChild(thead).addChild(tbody);
    
    return table;
}

function createComplexStructure(): LightElementNode {
    // Create a more complex structure
    const article = new LightElementNode('article').addClass('blog-post');
    
    // Header
    const header = new LightElementNode('header');
    const h1 = new LightElementNode('h1');
    h1.addChild(new LightTextNode('Light HTML Demo'));
    header.addChild(h1);
    
    // Author info
    const authorDiv = new LightElementNode('div').addClass('author-info');
    const img = new LightElementNode('img', DisplayType.INLINE, CloseType.SELF_CLOSING);
    authorDiv.addChild(img);
    
    const authorName = new LightElementNode('span').addClass('author-name');
    authorName.addChild(new LightTextNode('John Smith'));
    authorDiv.addChild(authorName);
    
    // Main content
    const content = new LightElementNode('div').addClass('content');
    const p1 = new LightElementNode('p');
    p1.addChild(new LightTextNode('This is a demonstration of our Light HTML markup language.'));
    
    const p2 = new LightElementNode('p');
    p2.addChild(new LightTextNode('It uses the Composite pattern to build HTML structures.'));
    
    content.addChild(p1).addChild(p2);
    
    // Add a list
    const listSection = new LightElementNode('section');
    const h2 = new LightElementNode('h2');
    h2.addChild(new LightTextNode('Features'));
    listSection.addChild(h2);
    listSection.addChild(createSimpleList());
    
    // Assemble article
    article.addChild(header)
        .addChild(authorDiv)
        .addChild(content)
        .addChild(listSection);
    
    return article;
}

function main() {
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
    
    // Demonstrate the difference between innerHTML and outerHTML
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

// Run the demo
main();
