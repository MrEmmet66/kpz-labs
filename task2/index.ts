import { Warrior, Mage, Paladin } from './ConcreteHeroes';
import { 
    Sword, 
    Staff, 
    PlateArmor, 
    Robe, 
    AmuletOfPower, 
    RingOfProtection 
} from './InventoryDecorators';
import { Hero } from './Hero';

function displayHeroStats(hero: Hero): void {
    console.log(`\n${hero.getName()} Stats:`);
    console.log(`Description: ${hero.getDescription()}`);
    console.log(`Attack: ${hero.getAttack()}`);
    console.log(`Defense: ${hero.getDefense()}`);
    console.log(`Magic: ${hero.getMagic()}`);
    console.log('------------------------');
}

function main() {
    console.log("RPG Hero Decorator Demo\n");

    // Create base heroes
    const warrior = new Warrior();
    const mage = new Mage();
    const paladin = new Paladin();

    // Display base stats
    console.log("Base Heroes:");
    displayHeroStats(warrior);
    displayHeroStats(mage);
    displayHeroStats(paladin);

    // Equip heroes with items (applying decorators)
    console.log("\nEquipped Heroes:");
    
    // Warrior with sword and plate armor
    const equippedWarrior = new PlateArmor(new Sword(warrior));
    displayHeroStats(equippedWarrior);
    
    // Mage with staff, robe, and amulet of power
    const equippedMage = new AmuletOfPower(new Robe(new Staff(mage)));
    displayHeroStats(equippedMage);
    
    // Paladin with sword, plate armor, and ring of protection
    const equippedPaladin = new RingOfProtection(new PlateArmor(new Sword(paladin)));
    displayHeroStats(equippedPaladin);

    // Showing multiple items of the same type (e.g., two rings)
    console.log("\nHero with Multiple Items of Same Type:");
    const twoRingsPaladin = new RingOfProtection(new RingOfProtection(paladin));
    displayHeroStats(twoRingsPaladin);
}

// Run the demo
main();
