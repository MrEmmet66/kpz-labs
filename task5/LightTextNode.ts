import { LightNode } from './LightNode';

export class LightTextNode extends LightNode {
    private text: string;
    
    constructor(text: string) {
        super();
        this.text = text;
    }
    
    getText(): string {
        return this.text;
    }
    
    setText(text: string): void {
        this.text = text;
    }
    
    render(): string {
        return this.text;
    }
}
