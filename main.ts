import { Money } from "./Money";
import { Product } from "./product";
import { Reporting } from "./Reporting";
import { Warehouse } from "./warehouse";

function main() {


    const warehouse = new Warehouse();

    const apple = new Product("Apple", new Money(1, 50), "kg");
    const banana = new Product("Banana", new Money(2, 30), "kg");
    const orange = new Product("Orange", new Money(1, 80), "kg");
    
    console.log("Created products:");
    console.log(apple.display());
    console.log(banana.display());
    console.log(orange.display());
    

    warehouse.addProduct(apple, 100);
    warehouse.addProduct(banana, 150);
    warehouse.addProduct(orange, 80);
    
    console.log("\nInitial warehouse inventory:");
    warehouse.displayInventory().forEach(line => console.log(line));

    const reporting = new Reporting(warehouse);

    console.log("\nCreating an incoming document...");
    const incomingDoc = reporting.createIncomingDocument("IN-001");
    incomingDoc.addProduct("Apple", 50);
    incomingDoc.addProduct("Banana", 30);
    console.log(incomingDoc.display());

    console.log("\nExecuting the incoming document...");
    incomingDoc.execute();
    
    console.log("\nUpdated warehouse inventory after receiving products:");
    warehouse.displayInventory().forEach(line => console.log(line));
    

    console.log("\nCreating an outgoing document...");
    const outgoingDoc = reporting.createOutgoingDocument("OUT-001");
    outgoingDoc.addProduct("Apple", 30);
    outgoingDoc.addProduct("Orange", 25);
    console.log(outgoingDoc.display());
    

    console.log("\nExecuting the outgoing document...");
    outgoingDoc.execute();
    

    console.log("\nFinal warehouse inventory after shipping products:");
    warehouse.displayInventory().forEach(line => console.log(line));

    console.log("\nReducing price of Bananas by $0.50...");
    const bananaItem = warehouse.getProduct("Banana");
    if (bananaItem) {
        const bananaProduct = bananaItem.getProduct();
        console.log(`Original price: ${bananaProduct.getPrice().display()}`);
        bananaProduct.reducePrice(new Money(0, 50));
        console.log(`New price: ${bananaProduct.getPrice().display()}`);
    }
    

    console.log("\nFinal inventory report with updated prices:");
    reporting.generateInventoryReport().forEach(line => console.log(line));
}


main();