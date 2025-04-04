import * as fs from 'fs';
import { LightElementNode, DisplayType } from '../task5/LightElementNode';
import { LightTextNode } from '../task5/LightTextNode';

/**
 * Element type for flyweight factory
 */
type ElementType = 'h1' | 'h2' | 'p' | 'blockquote';

/**
 * Flyweight factory for HTML elements
 */
export class HtmlElementFactory {
    private elementPool: Map<ElementType, LightElementNode> = new Map();
    
    /**
     * Gets an element of the specified type from the pool or creates a new one
     */
    getElement(type: ElementType): LightElementNode {
        if (!this.elementPool.has(type)) {
            const element = new LightElementNode(type);
            this.elementPool.set(type, element);
        }
        
        // Return a clone of the cached element
        return this.cloneElement(this.elementPool.get(type)!);
    }
    
    /**
     * Creates a lightweight clone of the element (without children)
     */
    private cloneElement(element: LightElementNode): LightElementNode {
        // Create a new element with the same tag
        const clone = new LightElementNode(
            element.getTagName(),
            element.getDisplayType(),
            element.getCloseType()
        );
        
        // Copy CSS classes
        element.getCssClasses().forEach(cssClass => {
            clone.addClass(cssClass);
        });
        
        return clone;
    }
    
    /**
     * Gets the size of the element pool
     */
    getPoolSize(): number {
        return this.elementPool.size;
    }
}

export class FlyweightHtmlConverter {
    private elementFactory: HtmlElementFactory;
    
    constructor() {
        this.elementFactory = new HtmlElementFactory();
    }
    
    /**
     * Converts a text file to HTML elements using flyweight pattern
     */
    convertTextToHtml(filePath: string): LightElementNode {
        // Read the book text
        const text = fs.readFileSync(filePath, 'utf8');
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        
        // Create root element (not flyweight since we only need one)
        const article = new LightElementNode('article').addClass('book-content');
        
        // Process lines according to rules
        lines.forEach((line, index) => {
            let elementType: ElementType;
            
            if (index === 0) {
                // First line is h1
                elementType = 'h1';
            } else if (line.length < 20) {
                // Short line is h2
                elementType = 'h2';
            } else if (line.startsWith(' ')) {
                // Line starting with space is blockquote
                elementType = 'blockquote';
            } else {
                // Default is paragraph
                elementType = 'p';
            }
            
            // Get element from flyweight factory
            const element = this.elementFactory.getElement(elementType);
            
            // Add text content (not shared, as it's the extrinsic state)
            element.addChild(new LightTextNode(line.trim()));
            
            // Add to article
            article.addChild(element);
        });
        
        return article;
    }
    
    /**
     * Gets information about the flyweight factory
     */
    getFactoryInfo(): { poolSize: number } {
        return {
            poolSize: this.elementFactory.getPoolSize()
        };
    }
    
    /**
     * Measures and returns the approximate memory usage of the HTML structure
     * (Same implementation as in BookHtmlConverter for comparison)
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
