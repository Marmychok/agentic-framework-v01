# Fixtures Skill

## Purpose

Define reusable test fixture utilities, data loading helpers, and lifecycle hooks for Playwright tests, ensuring consistency, type safety, and compliance with `.clinerules/testing-data.md` (if present) and Cline best‑practice standards.

## Examples

- **Global Test Fixture**

  ```typescript
  // fixtures/global-fixture.ts
  import { test as base } from '@playwright/test';
  import { getEnv } from '../utils/env';

  export const test = base.extend<{ apiUrl: string }>({
    apiUrl: async ({}, use) => {
      const url = getEnv('API_BASE_URL');
      await use(url);
    },
  });
  ```

- **Per‑Test Data Fixture**

  ```typescript
  // fixtures/user-fixture.ts
  import { test as base } from '@playwright/test';
  import { userFactory } from '../skills/test-data/skill';

  export const test = base.extend<{ user: ReturnType<typeof userFactory> }>({
    user: async ({}, use) => {
      const user = userFactory();
      await use(user);
    },
  });
  ```

- **JSON Fixture Loader**
  ```typescript
  // utils/fixture-loader.ts
  import { readFileSync } from 'fs';
  import { resolve } from 'path';

  export const loadFixture = <T>(name: string): T => {
    const path = resolve(__dirname, `../fixtures/${name}.json`);
    const raw = readFileSync(path, 'utf-8');
    return JSON.parse(raw) as T;
  };
  ```

## Reusable Prompts

1. **Create Global Fixture**

   ```
   Generate a Playwright test fixture that provides the base API URL from environment variables to every test.
   ```

2. **Add Per‑Test User Fixture**

   ```
   Provide a fixture that creates a new random user (using the test-data skill) for each test and makes it available as `test.user`.
   ```

3. **Load JSON Fixture**
   ```
   Write a TypeScript utility `loadFixture<T>(name: string): T` that reads a JSON file from src/fixtures and returns the parsed object with proper generic typing.
   ```

## Best Practices

- Keep fixtures **pure** and side‑effect free; avoid mutating global state.
- Scope fixtures appropriately: use **global** fixtures for cross‑test configuration, **per‑test** fixtures for data that must be isolated.
- Type fixtures using generics to retain strong typing throughout the test suite.
- Store static JSON fixtures under `src/fixtures/` and load them via the loader helper.
- Register fixtures in a single entry point (e.g., `src/fixtures/index.ts`) and import from there in test files.

## Validation

- Fixtures must compile (`tsc`) and be usable in Playwright tests without type errors.
- The `loadFixture` utility should throw a clear error if the file does not exist or contains invalid JSON.
- Running `npx playwright test` with the fixtures should not introduce flaky behavior; each test receives its own isolated data.

## Anti‑patterns

- Sharing mutable objects between tests (e.g., a singleton user object).
- Performing I/O (network calls, database writes) directly inside fixture definitions; instead, perform such actions in the test body or a dedicated setup step.
- Hard‑coding file paths; use `path.resolve` relative to the project root.

## Limitations

- This skill does not manage external resources (databases, services). For such resources, create dedicated setup/teardown scripts or use the `api` skill to interact with them.
