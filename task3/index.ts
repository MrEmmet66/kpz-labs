import { VectorRenderer, RasterRenderer } from './Renderer';
import { Circle, Square, Triangle } from './Shape';

function main() {
    console.log("Graphics Editor with Bridge Pattern Demo\n");
    
    const vectorRenderer = new VectorRenderer();
    const rasterRenderer = new RasterRenderer();
    
    console.log("VECTOR RENDERING:");
    const vectorCircle = new Circle(vectorRenderer, 5);
    const vectorSquare = new Square(vectorRenderer, 4);
    const vectorTriangle = new Triangle(vectorRenderer, 3);
    
    vectorCircle.draw();
    vectorSquare.draw();
    vectorTriangle.draw();
    
    vectorCircle.resize(2);
    vectorCircle.draw();
    
    console.log("\nRASTER RENDERING:");
    const rasterCircle = new Circle(rasterRenderer, 5);
    const rasterSquare = new Square(rasterRenderer, 4);
    const rasterTriangle = new Triangle(rasterRenderer, 3);
    
    rasterCircle.draw();
    rasterSquare.draw();
    rasterTriangle.draw();
    
    rasterSquare.resize(0.5);
    rasterSquare.draw();
    
    console.log("\nCHANGING RENDERERS:");
    const circle = new Circle(vectorRenderer);
    console.log("Initially with vector renderer:");
    circle.draw();
    
    const circleWithRaster = new Circle(rasterRenderer);
    console.log("Then with raster renderer:");
    circleWithRaster.draw();
}

main();
