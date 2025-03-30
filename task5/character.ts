export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export enum BodyType {
    Slim = "Slim",
    Athletic = "Athletic",
    Muscular = "Muscular",
    Heavy = "Heavy"
}

export enum HairColor {
    Black = "Black",
    Brown = "Brown",
    Blonde = "Blonde",
    Red = "Red",
    White = "White",
    Gray = "Gray",
    Colorful = "Colorful"
}

export enum EyeColor {
    Brown = "Brown",
    Blue = "Blue",
    Green = "Green",
    Gray = "Gray",
    Hazel = "Hazel"
}

export class Character {
    private _name: string;
    private _gender: Gender;
    private _height: number;
    private _bodyType: BodyType;
    private _hairColor: HairColor;
    private _eyeColor: EyeColor;
    private _clothing: string[] = [];
    private _inventory: string[] = [];
    private _abilities: string[] = [];
    private _actions: string[] = [];
    private _isHero: boolean;

    constructor(name: string, isHero: boolean) {
        this._name = name;
        this._isHero = isHero;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get gender(): Gender {
        return this._gender;
    }

    set gender(value: Gender) {
        this._gender = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get bodyType(): BodyType {
        return this._bodyType;
    }

    set bodyType(value: BodyType) {
        this._bodyType = value;
    }

    get hairColor(): HairColor {
        return this._hairColor;
    }

    set hairColor(value: HairColor) {
        this._hairColor = value;
    }

    get eyeColor(): EyeColor {
        return this._eyeColor;
    }

    set eyeColor(value: EyeColor) {
        this._eyeColor = value;
    }

    get clothing(): string[] {
        return [...this._clothing];
    }

    addClothing(item: string): void {
        this._clothing.push(item);
    }

    get inventory(): string[] {
        return [...this._inventory];
    }

    addInventoryItem(item: string): void {
        this._inventory.push(item);
    }

    get abilities(): string[] {
        return [...this._abilities];
    }

    addAbility(ability: string): void {
        this._abilities.push(ability);
    }

    get actions(): string[] {
        return [...this._actions];
    }

    addAction(action: string): void {
        this._actions.push(action);
    }

    get isHero(): boolean {
        return this._isHero;
    }

    getInfo(): string {
        let info = `=== ${this._isHero ? "HERO" : "ENEMY"}: ${this._name} ===\n`;
        info += `Gender: ${this._gender}\n`;
        info += `Height: ${this._height} cm\n`;
        info += `Body Type: ${this._bodyType}\n`;
        info += `Hair Color: ${this._hairColor}\n`;
        info += `Eye Color: ${this._eyeColor}\n`;
        
        info += `\nClothing:\n`;
        if (this._clothing.length === 0) {
            info += "  None\n";
        } else {
            this._clothing.forEach(item => {
                info += `  - ${item}\n`;
            });
        }
        
        info += `\nInventory:\n`;
        if (this._inventory.length === 0) {
            info += "  Empty\n";
        } else {
            this._inventory.forEach(item => {
                info += `  - ${item}\n`;
            });
        }
        
        info += `\nAbilities:\n`;
        if (this._abilities.length === 0) {
            info += "  None\n";
        } else {
            this._abilities.forEach(ability => {
                info += `  - ${ability}\n`;
            });
        }
        
        info += `\n${this._isHero ? "Heroic" : "Villainous"} Actions:\n`;
        if (this._actions.length === 0) {
            info += "  None\n";
        } else {
            this._actions.forEach(action => {
                info += `  - ${action}\n`;
            });
        }
        
        return info;
    }
}
