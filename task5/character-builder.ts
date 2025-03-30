import { Character, Gender, BodyType, HairColor, EyeColor } from './character';

export interface CharacterBuilder {
    reset(name: string): this;
    setGender(gender: Gender): this;
    setHeight(height: number): this;
    setBodyType(bodyType: BodyType): this;
    setHairColor(hairColor: HairColor): this;
    setEyeColor(eyeColor: EyeColor): this;
    addClothing(item: string): this;
    addInventoryItem(item: string): this;
    addAbility(ability: string): this;
    addAction(action: string): this;
    getResult(): Character;
}

export class HeroBuilder implements CharacterBuilder {
    private character: Character;

    constructor(name: string = "Hero") {
        this.character = new Character(name, true);
    }

    reset(name: string): this {
        this.character = new Character(name, true);
        return this;
    }

    setGender(gender: Gender): this {
        this.character.gender = gender;
        return this;
    }

    setHeight(height: number): this {
        this.character.height = height;
        return this;
    }

    setBodyType(bodyType: BodyType): this {
        this.character.bodyType = bodyType;
        return this;
    }

    setHairColor(hairColor: HairColor): this {
        this.character.hairColor = hairColor;
        return this;
    }

    setEyeColor(eyeColor: EyeColor): this {
        this.character.eyeColor = eyeColor;
        return this;
    }

    addClothing(item: string): this {
        this.character.addClothing(item);
        return this;
    }

    addInventoryItem(item: string): this {
        this.character.addInventoryItem(item);
        return this;
    }

    addAbility(ability: string): this {
        this.character.addAbility(ability);
        return this;
    }

    addAction(action: string): this {
        this.character.addAction(action);
        return this;
    }

    addHeroicDeed(deed: string): this {
        return this.addAction(`Heroic Deed: ${deed}`);
    }

    saveInnocent(who: string): this {
        return this.addHeroicDeed(`Saved ${who} from danger`);
    }

    fightVillain(villain: string): this {
        return this.addHeroicDeed(`Fought against ${villain}`);
    }

    getResult(): Character {
        return this.character;
    }
}

export class EnemyBuilder implements CharacterBuilder {
    private character: Character;

    constructor(name: string = "Enemy") {
        this.character = new Character(name, false);
    }

    reset(name: string): this {
        this.character = new Character(name, false);
        return this;
    }

    setGender(gender: Gender): this {
        this.character.gender = gender;
        return this;
    }

    setHeight(height: number): this {
        this.character.height = height;
        return this;
    }

    setBodyType(bodyType: BodyType): this {
        this.character.bodyType = bodyType;
        return this;
    }

    setHairColor(hairColor: HairColor): this {
        this.character.hairColor = hairColor;
        return this;
    }

    setEyeColor(eyeColor: EyeColor): this {
        this.character.eyeColor = eyeColor;
        return this;
    }

    addClothing(item: string): this {
        this.character.addClothing(item);
        return this;
    }

    addInventoryItem(item: string): this {
        this.character.addInventoryItem(item);
        return this;
    }

    addAbility(ability: string): this {
        this.character.addAbility(ability);
        return this;
    }

    addAction(action: string): this {
        this.character.addAction(action);
        return this;
    }

    addEvilDeed(deed: string): this {
        return this.addAction(`Evil Deed: ${deed}`);
    }

    threatInnocent(who: string): this {
        return this.addEvilDeed(`Threatened ${who}`);
    }

    plotAgainstHero(hero: string): this {
        return this.addEvilDeed(`Plotted against ${hero}`);
    }

    getResult(): Character {
        return this.character;
    }
}
