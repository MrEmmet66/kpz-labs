import { LightNode } from './LightNode';

export enum DisplayType {
    BLOCK = 'block',
    INLINE = 'inline'
}

export enum CloseType {
    SELF_CLOSING = 'self-closing',  // e.g., <img/>
    PAIRED = 'paired'               // e.g., <div></div>
}

// Regular class definition, no longer a redefinition
export class LightElementNode extends LightNode {
    private tagName: string;
    private displayType: DisplayType;
    private closeType: CloseType;
    private cssClasses: string[] = [];
    private children: LightNode[] = [];
    
    /**
     * Creates a new element node
     */
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
    
    /**
     * Adds a CSS class to the element
     */
    addClass(cssClass: string): LightElementNode {
        if (!this.cssClasses.includes(cssClass)) {
            this.cssClasses.push(cssClass);
        }
        return this;
    }
    
    /**
     * Removes a CSS class from the element
     */
    removeClass(cssClass: string): LightElementNode {
        this.cssClasses = this.cssClasses.filter(c => c !== cssClass);
        return this;
    }
    
    /**
     * Adds a child node to this element
     */
    addChild(child: LightNode): LightElementNode {
        this.children.push(child);
        child.setParent(this);
        return this;
    }
    
    /**
     * Removes a child node from this element
     */
    removeChild(child: LightNode): boolean {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            child.setParent(null);
            return true;
        }
        return false;
    }
    
    /**
     * Gets the number of children
     */
    getChildCount(): number {
        return this.children.length;
    }
    
    /**
     * Gets the tag name
     */
    getTagName(): string {
        return this.tagName;
    }
    
    /**
     * Gets the display type (block or inline)
     */
    getDisplayType(): DisplayType {
        return this.displayType;
    }
    
    /**
     * Gets the close type (self-closing or paired)
     */
    getCloseType(): CloseType {
        return this.closeType;
    }
    
    /**
     * Gets the CSS classes
     */
    getCssClasses(): string[] {
        return [...this.cssClasses];
    }
    
    /**
     * Gets the child nodes
     */
    getChildren(): LightNode[] {
        return [...this.children];
    }
    
    /**
     * Renders the inner HTML (content between opening and closing tags)
     */
    innerHTML(): string {
        return this.children.map(child => child.render()).join('');
    }
    
    /**
     * Renders the complete element including tags and content
     */
    render(): string {
        // Opening tag with any CSS classes
        let html = `<${this.tagName}`;
        
        // Add CSS classes if any
        if (this.cssClasses.length > 0) {
            html += ` class="${this.cssClasses.join(' ')}"`;
        }
        
        if (this.closeType === CloseType.SELF_CLOSING) {
            // Self-closing tag
            html += ' />';
        } else {
            // Opening tag, contents, and closing tag
            html += '>';
            html += this.innerHTML();
            html += `</${this.tagName}>`;
        }
        
        return html;
    }
    
    /**
     * Alias for render() to match HTML terminology
     */
    outerHTML(): string {
        return this.render();
    }
}
