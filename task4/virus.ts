export class Virus {
    private _weight: number;
    private _age: number;
    private _name: string;
    private _species: string;
    private _children: Virus[];

    constructor(weight: number, age: number, name: string, species: string) {
        this._weight = weight;
        this._age = age;
        this._name = name;
        this._species = species;
        this._children = [];
    }

    get weight(): number {
        return this._weight;
    }

    get age(): number {
        return this._age;
    }

    get name(): string {
        return this._name;
    }

    get species(): string {
        return this._species;
    }

    get children(): Virus[] {
        return [...this._children];
    }

    addChild(child: Virus): void {
        this._children.push(child);
    }

    clone(): Virus {
        const clonedVirus = new Virus(this._weight, this._age, this._name, this._species);
        
        for (const child of this._children) {
            const clonedChild = child.clone();
            clonedVirus.addChild(clonedChild);
        }
        
        return clonedVirus;
    }

    getInfo(indentation: string = ""): string {
        let info = `${indentation}Virus: ${this._name}\n`;
        info += `${indentation}Species: ${this._species}\n`;
        info += `${indentation}Age: ${this._age}\n`;
        info += `${indentation}Weight: ${this._weight}\n`;
        
        if (this._children.length > 0) {
            info += `${indentation}Children:\n`;
            for (const child of this._children) {
                info += child.getInfo(`${indentation}  `);
            }
        }
        
        return info;
    }
}
