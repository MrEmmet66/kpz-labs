export abstract class LightNode {
    protected parent: LightNode | null = null;
    
    setParent(parent: LightNode | null): void {
        this.parent = parent;
    }
    
    getParent(): LightNode | null {
        return this.parent;
    }
    
    abstract render(): string;
}
