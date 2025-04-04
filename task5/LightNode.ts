export abstract class LightNode {
    // Use a more generic type to avoid circular references
    protected parent: LightNode | null = null;
    
    /**
     * Sets the parent node
     */
    setParent(parent: LightNode | null): void {
        this.parent = parent;
    }
    
    /**
     * Gets the parent node
     */
    getParent(): LightNode | null {
        return this.parent;
    }
    
    /**
     * Renders the node as a string
     */
    abstract render(): string;
}
