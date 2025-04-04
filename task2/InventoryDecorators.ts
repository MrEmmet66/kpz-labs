import { Hero } from './Hero';
import { HeroDecorator } from './HeroDecorator';

// Weapon decorators
export class Sword extends HeroDecorator {
    getAttack(): number {
        return this.hero.getAttack() + 5;
    }

    getDescription(): string {
        return `${this.hero.getDescription()}, equipped with a sword`;
    }
}

export class Staff extends HeroDecorator {
    getAttack(): number {
        return this.hero.getAttack() + 2;
    }

    getMagic(): number {
        return this.hero.getMagic() + 7;
    }

    getDescription(): string {
        return `${this.hero.getDescription()}, wielding a magic staff`;
    }
}

// Armor decorators
export class PlateArmor extends HeroDecorator {
    getDefense(): number {
        return this.hero.getDefense() + 8;
    }

    getDescription(): string {
        return `${this.hero.getDescription()}, protected by plate armor`;
    }
}

export class Robe extends HeroDecorator {
    getDefense(): number {
        return this.hero.getDefense() + 3;
    }

    getMagic(): number {
        return this.hero.getMagic() + 4;
    }

    getDescription(): string {
        return `${this.hero.getDescription()}, wearing a magical robe`;
    }
}

// Artifact decorators
export class AmuletOfPower extends HeroDecorator {
    getAttack(): number {
        return this.hero.getAttack() + 3;
    }

    getMagic(): number {
        return this.hero.getMagic() + 3;
    }

    getDescription(): string {
        return `${this.hero.getDescription()}, with an amulet of power`;
    }
}

export class RingOfProtection extends HeroDecorator {
    getDefense(): number {
        return this.hero.getDefense() + 4;
    }

    getDescription(): string {
        return `${this.hero.getDescription()}, wearing a ring of protection`;
    }
}
