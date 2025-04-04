import { LightNode } from './LightNode';

export enum DisplayType {
    BLOCK = 'block',
    INLINE = 'inline'
}

export enum CloseType {
    SELF_CLOSING = 'self-closing',
    PAIRED = 'paired'               
}

export class LightElementNode extends LightNode {
    private tagName: string;
    private displayType: DisplayType;
    private closeType: CloseType;
    private cssClasses: string[] = [];
    private children: LightNode[] = [];
    
    constructor(
        tagName: string, 
        displayType: DisplayType = DisplayType.BLOCK,
        closeType: CloseType = CloseType.PAIRED
    ) {
        super();
        this.tagName = tagName;
        this.displayType = displayType;
        this.closeType = closeType;
    }
    
    addClass(cssClass: string): LightElementNode {
        if (!this.cssClasses.includes(cssClass)) {
            this.cssClasses.push(cssClass);
        }
        return this;
    }
    
    removeClass(cssClass: string): LightElementNode {
        this.cssClasses = this.cssClasses.filter(c => c !== cssClass);
        return this;
    }
    
    addChild(child: LightNode): LightElementNode {
        this.children.push(child);
        child.setParent(this);
        return this;
    }
    
    removeChild(child: LightNode): boolean {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            child.setParent(null);
            return true;
        }
        return false;
    }
    
    getChildCount(): number {
        return this.children.length;
    }
    
    getTagName(): string {
        return this.tagName;
    }
    
    getDisplayType(): DisplayType {
        return this.displayType;
    }
    
    getCloseType(): CloseType {
        return this.closeType;
    }
    
    getCssClasses(): string[] {
        return [...this.cssClasses];
    }
    
    getChildren(): LightNode[] {
        return [...this.children];
    }
    
    innerHTML(): string {
        return this.children.map(child => child.render()).join('');
    }
    
    render(): string {
        let html = `<${this.tagName}`;
        
        if (this.cssClasses.length > 0) {
            html += ` class="${this.cssClasses.join(' ')}"`;
        }
        
        if (this.closeType === CloseType.SELF_CLOSING) {
            html += ' />';
        } else {
            html += '>';
            html += this.innerHTML();
            html += `</${this.tagName}>`;
        }
        
        return html;
    }
    
    outerHTML(): string {
        return this.render();
    }
}
