import {
    Laptop, Netbook, EBook, Smartphone,
    AppleLaptop, AppleNetbook, AppleEBook, AppleSmartphone,
    XiaomiLaptop, XiaomiNetbook, XiaomiEBook, XiaomiSmartphone,
    GalaxyLaptop, GalaxyNetbook, GalaxyEBook, GalaxySmartphone
} from './devices';

export interface DeviceFactory {
    createLaptop(): Laptop;
    createNetbook(): Netbook;
    createEBook(): EBook;
    createSmartphone(): Smartphone;
}

export class IProneFactory implements DeviceFactory {
    createLaptop(): Laptop {
        return new AppleLaptop();
    }
    
    createNetbook(): Netbook {
        return new AppleNetbook();
    }
    
    createEBook(): EBook {
        return new AppleEBook();
    }
    
    createSmartphone(): Smartphone {
        return new AppleSmartphone();
    }
}

export class KiaomiFactory implements DeviceFactory {
    createLaptop(): Laptop {
        return new XiaomiLaptop();
    }
    
    createNetbook(): Netbook {
        return new XiaomiNetbook();
    }
    
    createEBook(): EBook {
        return new XiaomiEBook();
    }
    
    createSmartphone(): Smartphone {
        return new XiaomiSmartphone();
    }
}

export class BalaxyFactory implements DeviceFactory {
    createLaptop(): Laptop {
        return new GalaxyLaptop();
    }
    
    createNetbook(): Netbook {
        return new GalaxyNetbook();
    }
    
    createEBook(): EBook {
        return new GalaxyEBook();
    }
    
    createSmartphone(): Smartphone {
        return new GalaxySmartphone();
    }
}

export class DeviceFactoryCreator {
    static getFactory(brand: string): DeviceFactory {
        switch (brand.toLowerCase()) {
            case 'iprone':
                return new IProneFactory();
            case 'kiaomi':
                return new KiaomiFactory();
            case 'balaxy':
                return new BalaxyFactory();
            default:
                throw new Error(`Unknown brand: ${brand}`);
        }
    }
}
