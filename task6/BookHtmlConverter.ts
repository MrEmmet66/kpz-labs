import * as fs from 'fs';
import { LightElementNode, DisplayType } from '../task5/LightElementNode';
import { LightTextNode } from '../task5/LightTextNode';

export class BookHtmlConverter {
    /**
     * Converts a text file to HTML elements according to rules:
     * - First line -> <h1>
     * - Line with less than 20 chars -> <h2>
     * - Line starting with whitespace -> <blockquote>
     * - Any other line -> <p>
     */
    convertTextToHtml(filePath: string): LightElementNode {
        // Read the book text
        const text = fs.readFileSync(filePath, 'utf8');
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        
        // Create root element
        const article = new LightElementNode('article').addClass('book-content');
        
        // Process lines according to rules
        lines.forEach((line, index) => {
            let element: LightElementNode;
            
            if (index === 0) {
                // First line is h1
                element = new LightElementNode('h1');
            } else if (line.length < 20) {
                // Short line is h2
                element = new LightElementNode('h2');
            } else if (line.startsWith(' ')) {
                // Line starting with space is blockquote
                element = new LightElementNode('blockquote');
            } else {
                // Default is paragraph
                element = new LightElementNode('p');
            }
            
            // Add text content
            element.addChild(new LightTextNode(line.trim()));
            
            // Add to article
            article.addChild(element);
        });
        
        return article;
    }
    
    /**
     * Measures and returns the approximate memory usage of the HTML structure
     */
    measureMemoryUsage(rootElement: LightElementNode): number {
        // Use a Set to track objects we've already seen to avoid circular references
        const visited = new Set<object>();
        
        // Simple estimation function (not accurate but gives relative sizes)
        const getNodeSize = (node: any): number => {
            // If null, undefined, or primitive type
            if (node === null || node === undefined || typeof node !== 'object') {
                return typeof node === 'string' ? node.length * 2 : 8; // UTF-16 chars or 8 bytes
            }
            
            // If we've seen this object before, skip it
            if (visited.has(node)) {
                return 0;
            }
            
            // Mark as visited
            visited.add(node);
            
            let size = 40; // Base object overhead
            
            try {
                // Check what type of object this is
                if (Array.isArray(node)) {
                    size += 40; // Array overhead
                    // Process array items
                    for (let i = 0; i < node.length; i++) {
                        size += getNodeSize(node[i]);
                    }
                } else {
                    // Process object properties, but be careful with certain properties
                    for (const key in node) {
                        // Skip parent property to avoid circular references
                        if (key === 'parent' || !Object.prototype.hasOwnProperty.call(node, key)) {
                            continue;
                        }
                        
                        const value = node[key];
                        
                        if (typeof value === 'string') {
                            size += key.length * 2 + value.length * 2; // Key and string value
                        } else if (typeof value === 'number' || typeof value === 'boolean') {
                            size += key.length * 2 + 8; // Key and primitive value
                        } else if (value !== null && typeof value === 'object') {
                            size += key.length * 2 + getNodeSize(value); // Key and object value
                        }
                    }
                }
            } catch (e) {
                console.error('Error measuring size:', e);
            }
            
            return size;
        };
        
        return getNodeSize(rootElement);
    }
}
