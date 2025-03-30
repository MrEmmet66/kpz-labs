# Design Patterns Implementation

This project demonstrates the implementation of various design patterns in TypeScript.

## Task 1: Factory Method

Implementation of a subscription system for a video streaming service using the Factory Method pattern.

- `Subscription` hierarchy with different subscription types
- `SubscriptionCreator` abstract factory with concrete implementations for different purchase channels

## Task 2: Abstract Factory

Implementation of an electronic device manufacturing system using the Abstract Factory pattern.

- Device hierarchy (Laptop, Netbook, EBook, Smartphone)
- Brand-specific factories (IProne, Kiaomi, Balaxy)
- Each factory can create all device types specific to its brand

## Task 3: Singleton

Implementation of an authentication system using the Singleton pattern.

- `Authenticator` class with a single instance throughout the application
- Inheritance demonstrated with `EnhancedAuthenticator` class
- Thread-safety simulation showing instance is shared across threads

## Task 4: Prototype

Implementation of a virus replication system using the Prototype pattern.

- `Virus` class with self-replication (cloning) capability
- Deep cloning that includes the entire virus hierarchy
- Demonstration of independent mutation after cloning

## Task 5: Builder

Implementation of a character creation system using the Builder pattern.

- `Character` class with various attributes
- Builders for creating heroes and enemies with fluent interface
- Director class for creating pre-configured character types

## Running the Demo

```bash
# Install dependencies
npm install

# Compile TypeScript
npx tsc

# Run the demo
node main.js
```
