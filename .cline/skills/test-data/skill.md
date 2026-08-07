# Test Data Skill

## Purpose

Provide reusable snippets, factories, and builders for generating test data used in BDD scenarios and Playwright tests, while adhering to the guidelines in `.clinerules/testing-data.md` (if present) and general Cline best‑practice rules.

## Examples

- **Factory Function**: User data factory.

  ```typescript
  import { faker } from '@faker-js/faker';

  export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

  export const userFactory = (overrides?: Partial<User>): User => ({
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    ...overrides,
  });
  ```

- **Builder Pattern**: Complex order builder.

  ```typescript
  interface OrderItem {
    productId: string;
    quantity: number;
  }

  export class OrderBuilder {
    private items: OrderItem[] = [];
    private total = 0;

    addItem(productId: string, quantity: number) {
      this.items.push({ productId, quantity });
      this.total += quantity * 10; // example price logic
      return this;
    }

    setTotal(total: number) {
      this.total = total;
      return this;
    }

    build() {
      return {
        items: this.items,
        total: this.total,
      };
    }
  }
  ```

- **Static JSON Fixture**: `login-fixture.json`
  ```json
  {
    "validUser": {
      "username": "john.doe@example.com",
      "password": "Secret123!"
    },
    "invalidUser": {
      "username": "invalid@example.com",
      "password": "wrong"
    }
  }
  ```

## Reusable Prompts

1. **Generate Factory**

   ```
   Create a TypeScript factory function for <Entity> that returns a fully populated object with realistic random data. Use faker where appropriate.
   ```

2. **Generate Builder**

   ```
   Provide a builder class for <ComplexEntity> with fluent methods to set each property and a build() method that returns the final object.
   ```

3. **Generate JSON Fixture**
   ```
   Produce a JSON fixture file named <fixture-name>.json containing data required for the <feature-name> feature.
   ```

## Best Practices

- Keep factories pure: no side effects, no external API calls.
- Use `faker` (or similar) for realistic random data, but allow overrides for deterministic test cases.
- Export types/interfaces alongside factories for strong typing.
- Store static JSON fixtures under `src/fixtures/` and load them via a helper `loadFixture` utility.
- Prefer builders for objects with many optional properties or complex construction logic.
- Keep test data generation fast; avoid heavy I/O or network calls.

## Validation

- Factories and builders must compile with TypeScript (`tsc`) and pass `npm run lint`.
- No direct I/O (e.g., reading files) inside factories; they should return plain objects.
- JSON fixtures must be valid JSON and conform to the corresponding TypeScript interfaces.

## Anti‑patterns

- Embedding business logic or API calls inside factories.
- Using hard‑coded dates/times that cause flaky tests.
- Overusing global mutable state for test data.
- Generating excessively large data sets without need.

## Limitations

- This skill does not create feature files or step definitions; combine with `cucumber` and `page-object-model` skills for full end‑to‑end test creation.
- Complex domain‑specific data may require additional custom utilities not covered here.
