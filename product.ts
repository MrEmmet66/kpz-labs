import { Money } from "./Money";

export interface IProduct {
    getName(): string;
    getPrice(): Money;
    getUnit(): string;
    reducePrice(amount: Money): void;
}


export class Product implements IProduct {
    private name: string;
    private price: Money;
    private unit: string;

    constructor(name: string, price: Money, unit: string) {
        this.name = name;
        this.price = price;
        this.unit = unit;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): Money {
        return this.price;
    }

    getUnit(): string {
        return this.unit;
    }


    reducePrice(amount: Money): void {
        try {
            this.price = this.price.subtract(amount);
        } catch (error) {

            this.price = new Money(0, 0);
        }
    }


    display(): string {
        return `${this.name} (${this.unit}): ${this.price.display()}`;
    }
}