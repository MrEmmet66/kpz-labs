import { VectorRenderer, RasterRenderer } from './Renderer';
import { Circle, Square, Triangle } from './Shape';

function main() {
    console.log("Graphics Editor with Bridge Pattern Demo\n");
    
    // Create renderers
    const vectorRenderer = new VectorRenderer();
    const rasterRenderer = new RasterRenderer();
    
    // Create shapes with vector rendering
    console.log("VECTOR RENDERING:");
    const vectorCircle = new Circle(vectorRenderer, 5);
    const vectorSquare = new Square(vectorRenderer, 4);
    const vectorTriangle = new Triangle(vectorRenderer, 3);
    
    // Draw vector shapes
    vectorCircle.draw();
    vectorSquare.draw();
    vectorTriangle.draw();
    
    // Resize a vector shape
    vectorCircle.resize(2);
    vectorCircle.draw();
    
    console.log("\nRASTER RENDERING:");
    // Create shapes with raster rendering
    const rasterCircle = new Circle(rasterRenderer, 5);
    const rasterSquare = new Square(rasterRenderer, 4);
    const rasterTriangle = new Triangle(rasterRenderer, 3);
    
    // Draw raster shapes
    rasterCircle.draw();
    rasterSquare.draw();
    rasterTriangle.draw();
    
    // Resize a raster shape
    rasterSquare.resize(0.5);
    rasterSquare.draw();
    
    // Demonstrate that the same shape can switch renderers
    console.log("\nCHANGING RENDERERS:");
    const circle = new Circle(vectorRenderer);
    console.log("Initially with vector renderer:");
    circle.draw();
    
    // Create a new circle with raster renderer
    const circleWithRaster = new Circle(rasterRenderer);
    console.log("Then with raster renderer:");
    circleWithRaster.draw();
}

// Run the demo
main();
