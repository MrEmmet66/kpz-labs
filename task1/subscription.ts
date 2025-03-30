 export abstract class Subscription {
    protected _monthlyFee: number;
    protected _minimumPeriod: number;
    protected _channels: string[];
    protected _features: string[];

    constructor(monthlyFee: number, minimumPeriod: number) {
        this._monthlyFee = monthlyFee;
        this._minimumPeriod = minimumPeriod;
        this._channels = [];
        this._features = [];
    }

    get monthlyFee(): number {
        return this._monthlyFee;
    }

    get minimumPeriod(): number {
        return this._minimumPeriod;
    }

    get channels(): string[] {
        return [...this._channels];
    }

    get features(): string[] {
        return [...this._features];
    }

    abstract getDescription(): string;

    getInfo(): string {
        return `${this.getDescription()}
- Monthly Fee: $${this._monthlyFee}
- Minimum Period: ${this._minimumPeriod} months
- Channels: ${this._channels.join(', ')}
- Features: ${this._features.join(', ')}`;
    }
}

export class DomesticSubscription extends Subscription {
    constructor() {
        super(9.99, 1);
        this._channels = ['News', 'Entertainment', 'Local Shows'];
        this._features = ['SD Quality', 'Single Device'];
    }

    getDescription(): string {
        return 'Domestic Subscription - Basic package for home viewing';
    }
}

export class EducationalSubscription extends Subscription {
    constructor() {
        super(14.99, 3);
        this._channels = ['Discovery', 'History', 'National Geographic', 'Educational Shows'];
        this._features = ['HD Quality', 'Offline Viewing', 'Two Devices'];
    }

    getDescription(): string {
        return 'Educational Subscription - Knowledge and learning package';
    }
}

export class PremiumSubscription extends Subscription {
    constructor() {
        super(29.99, 6);
        this._channels = ['All Sports', 'Premium Movies', 'All Entertainment', 'All News', 'Exclusive Content'];
        this._features = ['4K Quality', 'Unlimited Devices', 'Download Content', 'Ad-Free', 'Early Access'];
    }

    getDescription(): string {
        return 'Premium Subscription - Ultimate entertainment experience';
    }
}
