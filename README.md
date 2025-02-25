Developed by Oleh Hlushko, ІПЗ-23-3

# How to run

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)

Install dependencies:
   ```sh
   npm install
   ```


To start the application, run:
```sh
npm i -g tsx
tsx main.ts
```


## Programming Principles Demonstrated

### 1. Single Responsibility Principle (SOLID)

Each class in the system has a single responsibility:
- `Money` class ([line 2-72](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L2-L72)) is responsible only for monetary calculations and representation.
- `Product` class ([line 81-108](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L81-L108)) is responsible only for product information.
- `Warehouse` class ([line 173-241](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L173-L241)) is responsible only for inventory management.
- `Reporting` class ([line 351-410](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L351-L410)) is responsible only for document management and report generation.

### 2. Open/Closed Principle (SOLID)

The system is designed to be open for extension but closed for modification:
- `TransactionDocument` abstract class ([line 249-296](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L249-L296)) allows creating new document types without modifying existing code.
- The implementation of `IncomingDocument` ([line 299-324](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L299-L324)) and `OutgoingDocument` ([line 327-350](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L327-L350)) extends the base functionality without changing it.

### 3. Liskov Substitution Principle (SOLID)

Subtypes can be used in place of their parent types:
- `IncomingDocument` and `OutgoingDocument` can be used wherever a `TransactionDocument` is expected.
- These subclasses implement all required methods and follow the contract defined by the parent class.
- Example: In the `Reporting` class, both document types are processed consistently ([line 375-390](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L375-L390)).

### 4. Interface Segregation Principle (SOLID)

Interfaces are kept focused and minimal:
- `IProduct` interface ([line 75-80](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L75-L80)) contains only methods relevant for products.
- `ITransactionDocument` interface ([line 243-248](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L243-L248)) contains only methods required for transaction documents.

### 5. Dependency Inversion Principle (SOLID)

High-level modules don't depend on low-level modules; both depend on abstractions:
- `Reporting` class depends on the `Warehouse` abstraction, not specific implementations ([line 353](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L353)).
- Transaction documents depend on the `ITransactionDocument` interface ([line 249](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L249)).

### 6. DRY (Don't Repeat Yourself)

Code reuse is maximized to avoid duplication:
- Common functionality for documents is implemented in the `TransactionDocument` base class.
- Money calculations are centralized in the `Money` class.
- The `calculateTotal` method is implemented only once in each document type ([line 305-315](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L305-L315) and [line 333-343](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L333-L343)).

### 7. KISS (Keep It Simple, Stupid)

The solution is straightforward and not over-engineered:
- Classes have clear, focused methods.
- Logic is broken down into simple, understandable pieces.
- For example, the `addProduct` method in `Warehouse` class ([line 180-190](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L180-L190)) has simple and clear logic.

### 8. YAGNI (You Aren't Gonna Need It)

Only necessary functionality is implemented, without speculative features:
- The implementation focuses on the required features without adding unnecessary complexity.
- For example, the `Money` class contains only the methods needed for basic currency operations.

### 9. Fail Fast

Errors are detected and reported as early as possible:
- Input validation is done at the beginning of methods (example: [line 346-348](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L346-L348)).
- The `OutgoingDocument.execute()` method checks if all products are available before making any changes ([line 366-371](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L366-L371)).
- Exception handling is implemented throughout the system to catch errors early.

### 10. Program to Interfaces not Implementations

The code depends on abstractions rather than concrete implementations:
- The use of `IProduct` interface ([line 81](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L81)) allows for different product implementations.
- The `ITransactionDocument` interface ([line 249](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L249)) defines a contract that can be implemented by different document types.

### 11. Composition Over Inheritance

Composition is used where appropriate:
- `WarehouseItem` contains a `Product` rather than inheriting from it ([line 112](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L112)).
- `Reporting` composes a `Warehouse` instance rather than inheriting from it ([line 352-353](https://github.com/MrEmmet66/kpz-labs/lab1/warehouse-management-system.ts#L352-L353)).