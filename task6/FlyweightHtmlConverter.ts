import * as fs from 'fs';
import { LightElementNode, DisplayType } from '../task5/LightElementNode';
import { LightTextNode } from '../task5/LightTextNode';

type ElementType = 'h1' | 'h2' | 'p' | 'blockquote';

export class HtmlElementFactory {
    private elementPool: Map<ElementType, LightElementNode> = new Map();
    
    getElement(type: ElementType): LightElementNode {
        if (!this.elementPool.has(type)) {
            const element = new LightElementNode(type);
            this.elementPool.set(type, element);
        }
        
        return this.cloneElement(this.elementPool.get(type)!);
    }
    
    private cloneElement(element: LightElementNode): LightElementNode {
        const clone = new LightElementNode(
            element.getTagName(),
            element.getDisplayType(),
            element.getCloseType()
        );
        
        element.getCssClasses().forEach(cssClass => {
            clone.addClass(cssClass);
        });
        
        return clone;
    }
    
    getPoolSize(): number {
        return this.elementPool.size;
    }
}

export class FlyweightHtmlConverter {
    private elementFactory: HtmlElementFactory;
    
    constructor() {
        this.elementFactory = new HtmlElementFactory();
    }
    
    convertTextToHtml(filePath: string): LightElementNode {
        const text = fs.readFileSync(filePath, 'utf8');
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        
        const article = new LightElementNode('article').addClass('book-content');
        
        lines.forEach((line, index) => {
            let elementType: ElementType;
            
            if (index === 0) {
                elementType = 'h1';
            } else if (line.length < 20) {
                elementType = 'h2';
            } else if (line.startsWith(' ')) {
                elementType = 'blockquote';
            } else {
                elementType = 'p';
            }
            
            const element = this.elementFactory.getElement(elementType);
            
            element.addChild(new LightTextNode(line.trim()));
            
            article.addChild(element);
        });
        
        return article;
    }
    
    getFactoryInfo(): { poolSize: number } {
        return {
            poolSize: this.elementFactory.getPoolSize()
        };
    }
    
    measureMemoryUsage(rootElement: LightElementNode): number {
        const visited = new Set<object>();
        
        const getNodeSize = (node: any): number => {
            if (node === null || node === undefined || typeof node !== 'object') {
                return typeof node === 'string' ? node.length * 2 : 8;
            }
            
            if (visited.has(node)) {
                return 0;
            }
            
            visited.add(node);
            
            let size = 40;
            
            try {
                if (Array.isArray(node)) {
                    size += 40;
                    for (let i = 0; i < node.length; i++) {
                        size += getNodeSize(node[i]);
                    }
                } else {
                    for (const key in node) {
                        if (key === 'parent' || !Object.prototype.hasOwnProperty.call(node, key)) {
                            continue;
                        }
                        
                        const value = node[key];
                        
                        if (typeof value === 'string') {
                            size += key.length * 2 + value.length * 2;
                        } else if (typeof value === 'number' || typeof value === 'boolean') {
                            size += key.length * 2 + 8;
                        } else if (value !== null && typeof value === 'object') {
                            size += key.length * 2 + getNodeSize(value);
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
