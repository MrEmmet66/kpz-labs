import * as fs from 'fs';
import { LightElementNode, DisplayType } from '../task5/LightElementNode';
import { LightTextNode } from '../task5/LightTextNode';

export class BookHtmlConverter {
    convertTextToHtml(filePath: string): LightElementNode {
        const text = fs.readFileSync(filePath, 'utf8');
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        
        const article = new LightElementNode('article').addClass('book-content');
        
        lines.forEach((line, index) => {
            let element: LightElementNode;
            
            if (index === 0) {
                element = new LightElementNode('h1');
            } else if (line.length < 20) {
                element = new LightElementNode('h2');
            } else if (line.startsWith(' ')) {
                element = new LightElementNode('blockquote');
            } else {
                element = new LightElementNode('p');
            }
            
            element.addChild(new LightTextNode(line.trim()));
            
            article.addChild(element);
        });
        
        return article;
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
