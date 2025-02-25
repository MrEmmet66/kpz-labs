import { Money } from "./Money";
import { Warehouse } from "./warehouse";

export interface ITransactionDocument {
    getDocumentId(): string;
    getDate(): Date;
    getProducts(): Map<string, number>;
    getTotal(): Money;
    display(): string;
}

export abstract class TransactionDocument implements ITransactionDocument {
    protected documentId: string;
    protected date: Date;
    protected products: Map<string, number>;
    protected warehouse: Warehouse;
    protected total: Money;

    constructor(documentId: string, warehouse: Warehouse) {
        this.documentId = documentId;
        this.date = new Date();
        this.products = new Map<string, number>();
        this.warehouse = warehouse;
        this.total = new Money(0, 0);
    }

    getDocumentId(): string {
        return this.documentId;
    }

    getDate(): Date {
        return this.date;
    }

    getProducts(): Map<string, number> {
        return this.products;
    }

    getTotal(): Money {
        return this.total;
    }

    addProduct(productName: string, quantity: number): void {
        if (quantity <= 0) {
            throw new Error("Quantity must be positive");
        }
        
        const currentQuantity = this.products.get(productName) || 0;
        this.products.set(productName, currentQuantity + quantity);
        
        this.calculateTotal();
    }

    protected abstract calculateTotal(): void;

    abstract execute(): void;

    display(): string {
        const formatter = new Intl.DateTimeFormat('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        
        let result = `Document ID: ${this.documentId}, Date: ${formatter.format(this.date)}\n`;
        result += "Products:\n";
        
        for (const [productName, quantity] of this.products.entries()) {
            result += `  - ${productName}: ${quantity} units\n`;
        }
        
        result += `Total: ${this.total.display()}`;
        return result;
    }
}