import { LightNode } from './LightNode';

export class LightTextNode extends LightNode {
    private text: string;
    
    /**
     * Creates a new text node with the specified text
     */
    constructor(text: string) {
        super();
        this.text = text;
    }
    
    /**
     * Gets the text content
     */
    getText(): string {
        return this.text;
    }
    
    /**
     * Sets the text content
     */
    setText(text: string): void {
        this.text = text;
    }
    
    /**
     * Renders the text node
     */
    render(): string {
        return this.text;
    }
}
