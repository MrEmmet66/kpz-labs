import { WebSite, MobileApp, ManagerCall } from './task1/subscription-creator';
import { DeviceFactoryCreator } from './task2/device-factory';
import { Authenticator, EnhancedAuthenticator } from './task3/authenticator';
import { Virus } from './task4/virus';
import { HeroBuilder, EnemyBuilder } from './task5/character-builder';
import { CharacterDirector } from './task5/character-director';
import { Gender, BodyType, HairColor, EyeColor } from './task5/character';

function task1Demo() {
    console.log('=== Video Provider Subscription System Demo ===\n');

    const website = new WebSite();
    const mobileApp = new MobileApp();
    const managerCall = new ManagerCall();

    console.log('--- Website Subscription Creation ---');
    const domesticSubscription = website.purchaseSubscription('domestic');
    console.log('\nSubscription created:');
    console.log(domesticSubscription.getInfo());
    
    console.log('\n--- Mobile App Subscription Creation ---');
    const educationalSubscription = mobileApp.purchaseSubscription('educational');
    console.log('\nSubscription created:');
    console.log(educationalSubscription.getInfo());
    
    console.log('\n--- Manager Call Subscription Creation ---');
    const premiumSubscription = managerCall.purchaseSubscription('premium');
    console.log('\nSubscription created:');
    console.log(premiumSubscription.getInfo());

    try {
        console.log('\n--- Testing Invalid Subscription Type ---');
        website.purchaseSubscription('nonexistent');
    } catch (error) {
        console.log(`Error caught: ${error.message}`);
    }
}

function task2Demo() {
    console.log('\n=== Electronic Device Factory Demo ===\n');
    
    console.log('--- IProne Products ---');
    const iproneFactory = DeviceFactoryCreator.getFactory('iprone');
    
    const iproneLaptop = iproneFactory.createLaptop();
    console.log(`Laptop: ${iproneLaptop.getDescription()}`);
    console.log(`Specs: ${iproneLaptop.getSpecs()}\n`);
    
    const iproneNetbook = iproneFactory.createNetbook();
    console.log(`Netbook: ${iproneNetbook.getDescription()}`);
    console.log(`Specs: ${iproneNetbook.getSpecs()}\n`);
    
    const iproneEBook = iproneFactory.createEBook();
    console.log(`EBook: ${iproneEBook.getDescription()}`);
    console.log(`Specs: ${iproneEBook.getSpecs()}\n`);
    
    const iproneSmartphone = iproneFactory.createSmartphone();
    console.log(`Smartphone: ${iproneSmartphone.getDescription()}`);
    console.log(`Specs: ${iproneSmartphone.getSpecs()}\n`);
    
    console.log('--- Kiaomi Products ---');
    const kiaomiFactory = DeviceFactoryCreator.getFactory('kiaomi');
    
    const kiaomiLaptop = kiaomiFactory.createLaptop();
    console.log(`Laptop: ${kiaomiLaptop.getDescription()}`);
    console.log(`Specs: ${kiaomiLaptop.getSpecs()}\n`);
    
    const kiaomiSmartphone = kiaomiFactory.createSmartphone();
    console.log(`Smartphone: ${kiaomiSmartphone.getDescription()}`);
    console.log(`Specs: ${kiaomiSmartphone.getSpecs()}\n`);
    
    console.log('--- Balaxy Products ---');
    const balaxyFactory = DeviceFactoryCreator.getFactory('balaxy');
    
    const balaxyEBook = balaxyFactory.createEBook();
    console.log(`EBook: ${balaxyEBook.getDescription()}`);
    console.log(`Specs: ${balaxyEBook.getSpecs()}\n`);
    
    const balaxySmartphone = balaxyFactory.createSmartphone();
    console.log(`Smartphone: ${balaxySmartphone.getDescription()}`);
    console.log(`Specs: ${balaxySmartphone.getSpecs()}\n`);
    
    try {
        console.log('--- Testing Invalid Brand ---');
        DeviceFactoryCreator.getFactory('invalidBrand');
    } catch (error) {
        console.log(`Error caught: ${error.message}`);
    }
}

function task3Demo() {
    console.log('\n=== Authenticator Singleton Demo ===\n');
    
    console.log('Getting first instance of Authenticator:');
    const auth1 = Authenticator.getInstance();
    
    console.log('\nLogin attempt with invalid credentials:');
    const loginResult1 = auth1.login("admin", "wrongpassword");
    console.log(`Login successful: ${loginResult1}`);
    console.log(`Current user: ${auth1.getCurrentUser()}`);
    console.log(`Is authenticated: ${auth1.isAuthenticated()}`);
    
    console.log('\nLogin attempt with valid credentials:');
    const loginResult2 = auth1.login("admin", "admin123");
    console.log(`Login successful: ${loginResult2}`);
    console.log(`Current user: ${auth1.getCurrentUser()}`);
    console.log(`Is authenticated: ${auth1.isAuthenticated()}`);
    
    console.log('\nGetting another instance of Authenticator:');
    const auth2 = Authenticator.getInstance();
    console.log(`Current user from second instance: ${auth2.getCurrentUser()}`);
    console.log(`Is the same instance: ${auth1 === auth2}`);
    
    console.log('\nLogging out from second instance:');
    auth2.logout();
    console.log(`Current user from first instance: ${auth1.getCurrentUser()}`);
    console.log(`Current user from second instance: ${auth2.getCurrentUser()}`);
    
    console.log('\nRegistering a new user from first instance:');
    const registerResult = auth1.registerUser("newuser", "newpassword");
    console.log(`Registration successful: ${registerResult}`);
    
    console.log('\nLogging in with new user from second instance:');
    const loginResult3 = auth2.login("newuser", "newpassword");
    console.log(`Login successful: ${loginResult3}`);
    console.log(`Current user from first instance: ${auth1.getCurrentUser()}`);
    console.log(`Current user from second instance: ${auth2.getCurrentUser()}`);
    
    console.log('\nTesting inheritance with EnhancedAuthenticator:');
    console.log(EnhancedAuthenticator.getInstanceInfo());
    
    const auth3 = EnhancedAuthenticator.getInstance();
    console.log(`Current user from EnhancedAuthenticator: ${auth3.getCurrentUser()}`);
    console.log(`Is the same instance as auth1: ${auth1 === auth3}`);
    
    if (auth3 instanceof EnhancedAuthenticator) {
        console.log('\nTesting EnhancedAuthenticator specific method:');
        auth3.loginWithToken("token-user");
        console.log(`Current user after token login: ${auth3.getCurrentUser()}`);
        
        console.log(`Current user in original authenticator: ${auth1.getCurrentUser()}`);
    }
    
    console.log('\nTesting Singleton in multiple threads (simulated):');
    
    setTimeout(() => {
        console.log('Thread 1: Getting authenticator instance');
        const threadAuth1 = Authenticator.getInstance();
        console.log(`Thread 1: Current user: ${threadAuth1.getCurrentUser()}`);
    }, 100);
    
    setTimeout(() => {
        console.log('Thread 2: Getting authenticator instance');
        const threadAuth2 = Authenticator.getInstance();
        console.log(`Thread 2: Current user: ${threadAuth2.getCurrentUser()}`);
        threadAuth2.logout();
        console.log(`Thread 2: Logged out user`);
    }, 200);
    
    setTimeout(() => {
        console.log('Thread 3: Getting authenticator instance');
        const threadAuth3 = Authenticator.getInstance();
        console.log(`Thread 3: Current user: ${threadAuth3.getCurrentUser()}`);
        console.log(`Thread 3: Login attempt`);
        threadAuth3.login("user1", "password1");
        console.log(`Thread 3: Current user after login: ${threadAuth3.getCurrentUser()}`);
    }, 300);
}

function task4Demo() {
    console.log('\n=== Virus Prototype Demo ===\n');
    
    // Create first generation - The grandparent
    const coronavirusGrandparent = new Virus(0.0000000000001, 10, "SARS-CoV", "Coronavirus");
    
    // Create second generation - Children of the grandparent
    const coronavirusParent1 = new Virus(0.0000000000002, 5, "MERS-CoV", "Coronavirus");
    const coronavirusParent2 = new Virus(0.0000000000003, 3, "SARS-CoV-2", "Coronavirus");
    
    // Create third generation - Grandchildren
    const coronavirusChild1 = new Virus(0.0000000000004, 1, "Alpha variant", "Coronavirus");
    const coronavirusChild2 = new Virus(0.0000000000005, 0.8, "Delta variant", "Coronavirus");
    const coronavirusChild3 = new Virus(0.0000000000006, 0.5, "Omicron variant", "Coronavirus");
    
    // Build the virus family tree
    coronavirusParent1.addChild(coronavirusChild1);
    coronavirusParent2.addChild(coronavirusChild2);
    coronavirusParent2.addChild(coronavirusChild3);
    
    coronavirusGrandparent.addChild(coronavirusParent1);
    coronavirusGrandparent.addChild(coronavirusParent2);
    
    // Display the original virus family
    console.log('=== Original Virus Family ===');
    console.log(coronavirusGrandparent.getInfo());
    
    // Clone the entire virus family from the grandparent
    console.log('\n=== Cloning the entire virus family from the grandparent ===');
    const clonedVirusFamily = coronavirusGrandparent.clone();
    console.log(clonedVirusFamily.getInfo());
    
    // Verify that it's a deep clone by checking reference equality
    console.log('\n=== Verifying it\'s a deep clone (different memory references) ===');
    console.log(`Original and clone are the same object: ${coronavirusGrandparent === clonedVirusFamily}`);
    console.log(`Original and clone have the same name: ${coronavirusGrandparent.name === clonedVirusFamily.name}`);
    
    // Clone just one branch of the family from a parent
    console.log('\n=== Cloning just one branch of the family (SARS-CoV-2) ===');
    const clonedBranch = coronavirusParent2.clone();
    console.log(clonedBranch.getInfo());
    
    // Demonstrate independent mutation of clones
    console.log('\n=== Demonstrating independent mutation of clones ===');
    const mutatedClone = coronavirusGrandparent.clone();
    const mutatedChild = new Virus(0.0000000000007, 0.2, "New mutation", "Coronavirus");
    mutatedClone.children[1].addChild(mutatedChild);
    
    console.log('Original virus family (unchanged):');
    console.log(coronavirusGrandparent.getInfo());
    
    console.log('\nMutated clone (with new child added):');
    console.log(mutatedClone.getInfo());
}

function task5Demo() {
    console.log('\n=== Character Builder Demo ===\n');
    
    // Create builders
    const heroBuilder = new HeroBuilder();
    const enemyBuilder = new EnemyBuilder();
    
    // Create a director to orchestrate complex builds
    const director = new CharacterDirector(heroBuilder);
    
    // Use the director to create pre-defined characters
    console.log('--- Using Director to Create a Fantasy Hero ---');
    director.createFantasyHero("Aragon");
    const fantasyHero = heroBuilder.getResult();
    console.log(fantasyHero.getInfo());
    
    console.log('\n--- Using Director to Create a Dark Lord ---');
    director.changeBuilder(enemyBuilder);
    director.createDarkLord("Mordos");
    const darkLord = enemyBuilder.getResult();
    console.log(darkLord.getInfo());
    
    // Use the fluid interface directly for custom characters
    console.log('\n--- Creating Custom Hero Using Fluent Interface ---');
    const customHero = new HeroBuilder()
        .reset("Astra the Starborn")
        .setGender(Gender.Female)
        .setHeight(170)
        .setBodyType(BodyType.Athletic)
        .setHairColor(HairColor.Colorful)
        .setEyeColor(EyeColor.Blue)
        .addClothing("Star-infused armor")
        .addClothing("Cosmic belt")
        .addClothing("Phase boots")
        .addInventoryItem("Celestial staff")
        .addInventoryItem("Star fragments")
        .addInventoryItem("Constellation map")
        .addAbility("Starlight manipulation")
        .addAbility("Cosmic vision")
        .addAbility("Interstellar teleportation")
        .saveInnocent("a child from falling meteors")
        .fightVillain("the Void Devourer")
        .addHeroicDeed("Restored the broken constellation")
        .getResult();
    
    console.log(customHero.getInfo());
    
    console.log('\n--- Creating Custom Enemy Using Fluent Interface ---');
    const customEnemy = new EnemyBuilder()
        .reset("Necromus the Soul Harvester")
        .setGender(Gender.Male)
        .setHeight(200)
        .setBodyType(BodyType.Slim)
        .setHairColor(HairColor.White)
        .setEyeColor(EyeColor.Gray)
        .addClothing("Soul-woven robes")
        .addClothing("Bone crown")
        .addClothing("Spectral boots")
        .addInventoryItem("Soulreaper scythe")
        .addInventoryItem("Phylactery")
        .addInventoryItem("Soul jars")
        .addAbility("Necromancy")
        .addAbility("Soul extraction")
        .addAbility("Deathly presence")
        .threatInnocent("the people of Sunnyside village")
        .plotAgainstHero("Astra the Starborn")
        .addEvilDeed("Created an undead army from fallen warriors")
        .getResult();
    
    console.log(customEnemy.getInfo());
}

function main() {
    task1Demo();
    task2Demo();
    task3Demo();
    task4Demo();
    task5Demo();
}

main();
