import { Renderer } from './Renderer';

export abstract class Shape {
    protected renderer: Renderer;
    
    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }
    
    abstract draw(): void;
    abstract resize(factor: number): void;
}

export class Circle extends Shape {
    private radius: number;
    
    constructor(renderer: Renderer, radius: number = 1) {
        super(renderer);
        this.radius = radius;
    }
    
    draw(): void {
        this.renderer.renderShape('Circle');
    }
    
    resize(factor: number): void {
        this.radius *= factor;
        console.log(`Circle radius resized to ${this.radius}`);
    }
}

export class Square extends Shape {
    private side: number;
    
    constructor(renderer: Renderer, side: number = 1) {
        super(renderer);
        this.side = side;
    }
    
    draw(): void {
        this.renderer.renderShape('Square');
    }
    
    resize(factor: number): void {
        this.side *= factor;
        console.log(`Square side length resized to ${this.side}`);
    }
}

export class Triangle extends Shape {
    private side: number;
    
    constructor(renderer: Renderer, side: number = 1) {
        super(renderer);
        this.side = side;
    }
    
    draw(): void {
        this.renderer.renderShape('Triangle');
    }
    
    resize(factor: number): void {
        this.side *= factor;
        console.log(`Triangle side length resized to ${this.side}`);
    }
}
