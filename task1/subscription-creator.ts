import { Subscription, DomesticSubscription, EducationalSubscription, PremiumSubscription } from './subscription';

export abstract class SubscriptionCreator {
    abstract createSubscription(type: string): Subscription;

    purchaseSubscription(type: string): Subscription {
        const subscription = this.createSubscription(type);
        
        this.processPayment(subscription);
        this.completeRegistration(subscription);
        
        return subscription;
    }

    protected abstract processPayment(subscription: Subscription): void;
    protected abstract completeRegistration(subscription: Subscription): void;
}

export class WebSite extends SubscriptionCreator {
    createSubscription(type: string): Subscription {
        console.log(`Creating ${type} subscription via Website...`);
        
        switch (type.toLowerCase()) {
            case 'domestic':
                return new DomesticSubscription();
            case 'educational':
                return new EducationalSubscription();
            case 'premium':
                return new PremiumSubscription();
            default:
                throw new Error(`Unknown subscription type: ${type}`);
        }
    }

    protected processPayment(subscription: Subscription): void {
        console.log(`Processing online payment of $${subscription.monthlyFee}...`);
        console.log('Payment completed via online payment gateway');
    }

    protected completeRegistration(subscription: Subscription): void {
        console.log('Sending confirmation email with account details');
        console.log(`Your ${subscription.minimumPeriod}-month subscription is now active`);
    }
}

export class MobileApp extends SubscriptionCreator {
    createSubscription(type: string): Subscription {
        console.log(`Creating ${type} subscription via Mobile App...`);
        
        switch (type.toLowerCase()) {
            case 'domestic':
                return new DomesticSubscription();
            case 'educational':
                return new EducationalSubscription();
            case 'premium':
                return new PremiumSubscription();
            default:
                throw new Error(`Unknown subscription type: ${type}`);
        }
    }

    protected processPayment(subscription: Subscription): void {
        console.log(`Processing in-app purchase of $${subscription.monthlyFee}...`);
        console.log('Payment completed via App Store/Google Play');
    }

    protected completeRegistration(subscription: Subscription): void {
        console.log('Sending push notification with subscription details');
        console.log(`Your ${subscription.minimumPeriod}-month subscription is now active on your device`);
    }
}

export class ManagerCall extends SubscriptionCreator {
    createSubscription(type: string): Subscription {
        console.log(`Creating ${type} subscription via Manager Call...`);
        
        switch (type.toLowerCase()) {
            case 'domestic':
                return new DomesticSubscription();
            case 'educational':
                return new EducationalSubscription();
            case 'premium':
                return new PremiumSubscription();
            default:
                throw new Error(`Unknown subscription type: ${type}`);
        }
    }

    protected processPayment(subscription: Subscription): void {
        console.log(`Processing manual payment of $${subscription.monthlyFee}...`);
        console.log('Payment details recorded by the manager');
    }

    protected completeRegistration(subscription: Subscription): void {
        console.log('Manager will send physical welcome package');
        console.log(`Your ${subscription.minimumPeriod}-month subscription will be activated within 24 hours`);
    }
}
