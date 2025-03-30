export interface Laptop {
    getDescription(): string;
    getSpecs(): string;
}

export interface Netbook {
    getDescription(): string;
    getSpecs(): string;
}

export interface EBook {
    getDescription(): string;
    getSpecs(): string;
}

export interface Smartphone {
    getDescription(): string;
    getSpecs(): string;
}

export class AppleLaptop implements Laptop {
    getDescription(): string {
        return "IProne MacBook Pro";
    }

    getSpecs(): string {
        return "M2 chip, 16GB RAM, 512GB SSD, Retina Display";
    }
}

export class AppleNetbook implements Netbook {
    getDescription(): string {
        return "IProne MacBook Air";
    }

    getSpecs(): string {
        return "M1 chip, 8GB RAM, 256GB SSD, Lightweight Design";
    }
}

export class AppleEBook implements EBook {
    getDescription(): string {
        return "IProne iPad Pro";
    }

    getSpecs(): string {
        return "11-inch Liquid Retina, M1 chip, 128GB Storage";
    }
}

export class AppleSmartphone implements Smartphone {
    getDescription(): string {
        return "IProne 14 Pro";
    }

    getSpecs(): string {
        return "A16 Bionic, 6GB RAM, 256GB Storage, Pro Motion Display";
    }
}

export class XiaomiLaptop implements Laptop {
    getDescription(): string {
        return "Kiaomi Mi NoteBook Pro";
    }

    getSpecs(): string {
        return "Intel i7, 16GB RAM, 512GB SSD, 15.6-inch FHD Display";
    }
}

export class XiaomiNetbook implements Netbook {
    getDescription(): string {
        return "Kiaomi RedmiBook";
    }

    getSpecs(): string {
        return "AMD Ryzen 5, 8GB RAM, 256GB SSD, 14-inch Display";
    }
}

export class XiaomiEBook implements EBook {
    getDescription(): string {
        return "Kiaomi Mi Pad 5";
    }

    getSpecs(): string {
        return "11-inch LCD, Snapdragon 860, 6GB RAM, 128GB Storage";
    }
}

export class XiaomiSmartphone implements Smartphone {
    getDescription(): string {
        return "Kiaomi 13 Pro";
    }

    getSpecs(): string {
        return "Snapdragon 8 Gen 2, 12GB RAM, 256GB Storage, 6.7-inch AMOLED";
    }
}

export class GalaxyLaptop implements Laptop {
    getDescription(): string {
        return "Balaxy Book Pro";
    }

    getSpecs(): string {
        return "Intel i7, 16GB RAM, 1TB SSD, 15.6-inch AMOLED Display";
    }
}

export class GalaxyNetbook implements Netbook {
    getDescription(): string {
        return "Balaxy Book Go";
    }

    getSpecs(): string {
        return "Snapdragon 7c, 8GB RAM, 128GB eUFS, 14-inch Display";
    }
}

export class GalaxyEBook implements EBook {
    getDescription(): string {
        return "Balaxy Tab S8";
    }

    getSpecs(): string {
        return "11-inch LCD, Snapdragon 8 Gen 1, 8GB RAM, 128GB Storage";
    }
}

export class GalaxySmartphone implements Smartphone {
    getDescription(): string {
        return "Balaxy S23 Ultra";
    }

    getSpecs(): string {
        return "Snapdragon 8 Gen 2, 12GB RAM, 512GB Storage, 6.8-inch Dynamic AMOLED";
    }
}
