import { CharacterBuilder } from './character-builder';
import { Gender, BodyType, HairColor, EyeColor } from './character';

export class CharacterDirector {
    private builder: CharacterBuilder;

    constructor(builder: CharacterBuilder) {
        this.builder = builder;
    }

    changeBuilder(builder: CharacterBuilder): void {
        this.builder = builder;
    }

    createFantasyHero(name: string): void {
        this.builder.reset(name)
            .setGender(Gender.Male)
            .setHeight(185)
            .setBodyType(BodyType.Athletic)
            .setHairColor(HairColor.Blonde)
            .setEyeColor(EyeColor.Blue)
            .addClothing("Leather armor")
            .addClothing("Enchanted cloak")
            .addClothing("Sturdy boots")
            .addInventoryItem("Magic sword")
            .addInventoryItem("Healing potions")
            .addInventoryItem("Gold coins")
            .addAbility("Sword mastery")
            .addAbility("Light magic")
            .addAbility("Courage")
            .addAction("Saved a village from bandits")
            .addAction("Defeated a dragon");
    }

    createFantasyHeroine(name: string): void {
        this.builder.reset(name)
            .setGender(Gender.Female)
            .setHeight(175)
            .setBodyType(BodyType.Athletic)
            .setHairColor(HairColor.Red)
            .setEyeColor(EyeColor.Green)
            .addClothing("Elven armor")
            .addClothing("Enchanted cloak")
            .addClothing("Ranger boots")
            .addInventoryItem("Enchanted bow")
            .addInventoryItem("Daggers")
            .addInventoryItem("Magic trinkets")
            .addAbility("Archery mastery")
            .addAbility("Nature magic")
            .addAbility("Stealth")
            .addAction("Protected the forest from corruption")
            .addAction("United warring tribes");
    }

    createDarkLord(name: string): void {
        this.builder.reset(name)
            .setGender(Gender.Male)
            .setHeight(195)
            .setBodyType(BodyType.Muscular)
            .setHairColor(HairColor.Black)
            .setEyeColor(EyeColor.Gray)
            .addClothing("Dark plate armor")
            .addClothing("Spiked helmet")
            .addClothing("Tattered cape")
            .addInventoryItem("Cursed sword")
            .addInventoryItem("Soul gems")
            .addInventoryItem("Poison vials")
            .addAbility("Dark magic")
            .addAbility("Mind control")
            .addAbility("Immortality")
            .addAction("Conquered three kingdoms")
            .addAction("Raised an undead army")
            .addAction("Corrupted the sacred forest");
    }

    createEvilSorceress(name: string): void {
        this.builder.reset(name)
            .setGender(Gender.Female)
            .setHeight(180)
            .setBodyType(BodyType.Slim)
            .setHairColor(HairColor.White)
            .setEyeColor(EyeColor.Hazel)
            .addClothing("Dark enchanted robes")
            .addClothing("Crystal accessories")
            .addClothing("Shadow cloak")
            .addInventoryItem("Cursed staff")
            .addInventoryItem("Magic grimoire")
            .addInventoryItem("Enchanted mirror")
            .addAbility("Illusion magic")
            .addAbility("Transformation")
            .addAbility("Mind reading")
            .addAction("Cursed a royal family")
            .addAction("Created a magic plague")
            .addAction("Imprisoned light fairies");
    }

    createCyborgHero(name: string): void {
        this.builder.reset(name)
            .setGender(Gender.Other)
            .setHeight(190)
            .setBodyType(BodyType.Athletic)
            .setHairColor(HairColor.Gray)
            .setEyeColor(EyeColor.Blue)
            .addClothing("Nanofiber suit")
            .addClothing("Tactical vest")
            .addClothing("Augmented boots")
            .addInventoryItem("Plasma rifle")
            .addInventoryItem("EMP grenades")
            .addInventoryItem("Medkit")
            .addAbility("Enhanced strength")
            .addAbility("Tactical analysis")
            .addAbility("Digital interface")
            .addAction("Saved the last human colony")
            .addAction("Destroyed the rogue AI")
            .addAction("Sacrificed parts to save others");
    }
}
