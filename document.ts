import { Money } from "./Money";
import { TransactionDocument } from "./transactionDocument";
import { Warehouse } from "./warehouse";

export class IncomingDocument extends TransactionDocument {
    constructor(documentId: string, warehouse: Warehouse) {
        super(documentId, warehouse);
    }
    
    protected calculateTotal(): void {
        let total = new Money(0, 0);
        
        for (const [productName, quantity] of this.products.entries()) {
            const item = this.warehouse.getProduct(productName);
            if (item) {
                const productPrice = item.getProduct().getPrice();
                total = total.add(productPrice.multiply(quantity));
            }
        }
        
        this.total = total;
    }


    execute(): void {
        for (const [productName, quantity] of this.products.entries()) {
            const item = this.warehouse.getProduct(productName);
            
            if (item) {

                item.addQuantity(quantity);
            } else {
                throw new Error(`Product ${productName} not found in warehouse. Add the product first.`);
            }
        }
    }
}


export class OutgoingDocument extends TransactionDocument {
    constructor(documentId: string, warehouse: Warehouse) {
        super(documentId, warehouse);
    }

    protected calculateTotal(): void {
        let total = new Money(0, 0);
        
        for (const [productName, quantity] of this.products.entries()) {
            const item = this.warehouse.getProduct(productName);
            if (item) {
                const productPrice = item.getProduct().getPrice();
                total = total.add(productPrice.multiply(quantity));
            }
        }
        
        this.total = total;
    }


    override addProduct(productName: string, quantity: number): void {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
        

        if (!this.warehouse.hasEnoughProduct(productName, quantity)) {
            throw new Error(`Not enough ${productName} in warehouse`);
        }
                const currentQuantity = this.products.get(productName) || 0;
        this.products.set(productName, currentQuantity + quantity);
        

        this.calculateTotal();
    }


    execute(): void {

        for (const [productName, quantity] of this.products.entries()) {
            if (!this.warehouse.hasEnoughProduct(productName, quantity)) {
                throw new Error(`Not enough ${productName} in warehouse`);
            }
        }
        

        for (const [productName, quantity] of this.products.entries()) {
            this.warehouse.removeProduct(productName, quantity);
        }
    }
}