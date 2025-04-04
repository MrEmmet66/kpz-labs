import { Hero } from './Hero';

export abstract class HeroDecorator implements Hero {
    protected hero: Hero;

    constructor(hero: Hero) {
        this.hero = hero;
    }

    getName(): string {
        return this.hero.getName();
    }

    getAttack(): number {
        return this.hero.getAttack();
    }

    getDefense(): number {
        return this.hero.getDefense();
    }

    getMagic(): number {
        return this.hero.getMagic();
    }

    getDescription(): string {
        return this.hero.getDescription();
    }
}
