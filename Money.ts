export class Money {
    private wholePart: number; 
    private fractionalPart: number; 

    constructor(wholePart: number = 0, fractionalPart: number = 0) {
        this.wholePart = wholePart;
        this.fractionalPart = fractionalPart;
        this.normalize();
    }

    private normalize(): void {
        if (this.fractionalPart >= 100) {
            this.wholePart += Math.floor(this.fractionalPart / 100);
            this.fractionalPart %= 100;
        }
    }

    setWholePart(wholePart: number): void {
        this.wholePart = wholePart;
    }

    setFractionalPart(fractionalPart: number): void {
        this.fractionalPart = fractionalPart;
        this.normalize();
    }


    setAmount(wholePart: number, fractionalPart: number): void {
        this.wholePart = wholePart;
        this.fractionalPart = fractionalPart;
        this.normalize();
    }

    getWholePart(): number {
        return this.wholePart;
    }


    getFractionalPart(): number {
        return this.fractionalPart;
    }


    getValue(): number {
        return this.wholePart + this.fractionalPart / 100;
    }


    display(): string {
        return `$${this.wholePart}.${this.fractionalPart.toString().padStart(2, '0')}`;
    }

    add(other: Money): Money {
        const newWholePart = this.wholePart + other.wholePart;
        const newFractionalPart = this.fractionalPart + other.fractionalPart;
        return new Money(newWholePart, newFractionalPart);
    }


    subtract(other: Money): Money {
        let value1 = this.wholePart * 100 + this.fractionalPart;
        let value2 = other.wholePart * 100 + other.fractionalPart;
        
        if (value1 < value2) {
            throw new Error("Cannot have negative money amount");
        }
        
        const totalCents = value1 - value2;
        const newWholePart = Math.floor(totalCents / 100);
        const newFractionalPart = totalCents % 100;
        
        return new Money(newWholePart, newFractionalPart);
    }


    multiply(factor: number): Money {
        if (factor < 0) {
            throw new Error("Cannot multiply by negative factor");
        }
        
        const totalCents = Math.round((this.wholePart * 100 + this.fractionalPart) * factor);
        const newWholePart = Math.floor(totalCents / 100);
        const newFractionalPart = totalCents % 100;
        
        return new Money(newWholePart, newFractionalPart);
    }
}