export interface Renderer {
    renderShape(shapeName: string): void;
}

export class VectorRenderer implements Renderer {
    renderShape(shapeName: string): void {
        console.log(`Drawing ${shapeName} as vector graphics (lines and curves)`);
    }
}

export class RasterRenderer implements Renderer {
    renderShape(shapeName: string): void {
        console.log(`Drawing ${shapeName} as pixels (raster graphics)`);
    }
}
