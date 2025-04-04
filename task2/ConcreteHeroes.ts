import { Hero } from './Hero';

export class Warrior implements Hero {
    getName(): string {
        return 'Warrior';
    }

    getAttack(): number {
        return 10;
    }

    getDefense(): number {
        return 8;
    }

    getMagic(): number {
        return 2;
    }

    getDescription(): string {
        return 'A strong warrior';
    }
}

export class Mage implements Hero {
    getName(): string {
        return 'Mage';
    }

    getAttack(): number {
        return 4;
    }

    getDefense(): number {
        return 3;
    }

    getMagic(): number {
        return 15;
    }

    getDescription(): string {
        return 'A powerful mage';
    }
}

export class Paladin implements Hero {
    getName(): string {
        return 'Paladin';
    }

    getAttack(): number {
        return 7;
    }

    getDefense(): number {
        return 10;
    }

    getMagic(): number {
        return 6;
    }

    getDescription(): string {
        return 'A holy paladin';
    }
}
