export enum DisplayType {
    BLOCK = 'block',
    INLINE = 'inline'
}

export enum CloseType {
    SELF_CLOSING = 'self-closing',  // e.g., <img/>
    PAIRED = 'paired'               // e.g., <div></div>
}

// Define interfaces for the nodes
export interface ILightNode {
    setParent(parent: ILightElementNode | null): void;
    getParent(): ILightElementNode | null;
    render(): string;
}

export interface ILightElementNode extends ILightNode {
    addClass(cssClass: string): ILightElementNode;
    removeClass(cssClass: string): ILightElementNode;
    addChild(child: ILightNode): ILightElementNode;
    removeChild(child: ILightNode): boolean;
    getChildCount(): number;
    getTagName(): string;
    getDisplayType(): DisplayType;
    getCloseType(): CloseType;
    getCssClasses(): string[];
    getChildren(): ILightNode[];
    innerHTML(): string;
    outerHTML(): string;
}
