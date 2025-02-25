import { Money } from "./Money";
import { Product } from "./product";

export class WarehouseItem {
    private product: Product;
    private quantity: number;
    private lastDeliveryDate: Date;

    constructor(product: Product, quantity: number, lastDeliveryDate: Date = new Date()) {
        this.product = product;
        this.quantity = quantity;
        this.lastDeliveryDate = lastDeliveryDate;
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getLastDeliveryDate(): Date {
        return this.lastDeliveryDate;
    }

    setQuantity(quantity: number): void {
        if (quantity < 0) {
            throw new Error("Quantity cannot be negative");
        }
        this.quantity = quantity;
    }

    setLastDeliveryDate(date: Date): void {
        this.lastDeliveryDate = date;
    }

    addQuantity(amount: number): void {
        if (amount < 0) {
            throw new Error("Cannot add negative quantity");
        }
        this.quantity += amount;
        this.lastDeliveryDate = new Date();
    }

    removeQuantity(amount: number): void {
        if (amount < 0) {
            throw new Error("Cannot remove negative quantity");
        }
        if (this.quantity < amount) {
            throw new Error(`Insufficient quantity of ${this.product.getName()}`);
        }
        this.quantity -= amount;
    }

    getTotalValue(): Money {
        return this.product.getPrice().multiply(this.quantity);
    }

    display(): string {
        const formatter = new Intl.DateTimeFormat('uk-UA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        
        return `${this.product.display()}, Quantity: ${this.quantity} ${this.product.getUnit()}, Last delivery: ${formatter.format(this.lastDeliveryDate)}, Total value: ${this.getTotalValue().display()}`;
    }
}

export class Warehouse {
    private items: Map<string, WarehouseItem>;

    constructor() {
        this.items = new Map<string, WarehouseItem>();
    }

    addProduct(product: Product, quantity: number): void {
        const productName = product.getName();
        
        if (this.items.has(productName)) {
            const item = this.items.get(productName)!;
            item.addQuantity(quantity);
        } else {
            const newItem = new WarehouseItem(product, quantity);
            this.items.set(productName, newItem);
        }
    }

    getProduct(productName: string): WarehouseItem | undefined {
        return this.items.get(productName);
    }

    hasEnoughProduct(productName: string, quantity: number): boolean {
        const item = this.items.get(productName);
        return item !== undefined && item.getQuantity() >= quantity;
    }

    removeProduct(productName: string, quantity: number): void {
        const item = this.items.get(productName);
        
        if (!item) {
            throw new Error(`Product ${productName} not found in warehouse`);
        }
        
        item.removeQuantity(quantity);
        
        if (item.getQuantity() === 0) {
            this.items.delete(productName);
        }
    }

    getAllItems(): WarehouseItem[] {
        return Array.from(this.items.values());
    }

    getTotalInventoryValue(): Money {
        let total = new Money(0, 0);
        
        for (const item of this.items.values()) {
            total = total.add(item.getTotalValue());
        }
        
        return total;
    }

    displayInventory(): string[] {
        const result: string[] = [];
        result.push("Warehouse Inventory:");
        
        for (const item of this.items.values()) {
            result.push(item.display());
        }
        
        result.push(`Total inventory value: ${this.getTotalInventoryValue().display()}`);
        return result;
    }
}