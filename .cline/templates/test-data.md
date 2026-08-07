# Test Data Template

**Purpose**  
Provide a starter TypeScript module for generating reusable test data, factories, and builders that can be consumed by fixtures, step definitions, or page objects.

**Template**
```typescript
// src/test-data/<entity>-factory.ts
/**
 * Factory for creating <Entity> test objects.
 *
 * @remarks
 * Use this module to generate deterministic or random data for tests.
 * It contains no Playwright test definitions or assertions.
 */
export interface <Entity> {
  id: string;
  name: string;
  // Add additional fields as needed
}

/**
 * Create a deterministic <Entity>.
 *
 * @param overrides - Partial fields to override the defaults.
 * @returns A fully populated <Entity> object.
 */
export function create<Entity>(overrides: Partial<<Entity>> = {}): <Entity> {
  const defaultData: <Entity> = {
    id: `test-${Date.now()}`,
    name: 'Sample Name',
    // Populate other default fields here
  };

  return { ...defaultData, ...overrides } as <Entity>;
}

/**
 * Generate an array of <Entity> objects.
 *
 * @param count - Number of objects to generate.
 * @returns An array of <Entity> instances.
 */
export function createMany(count: number): <Entity>[] {
  return Array.from({ length: count }, () => create());
}

/**
 * Example of a random data generator (use with caution).
 *
 * @returns A <Entity> with random values.
 */
export function createRandom(): <Entity> {
  return {
    id: `random-${Math.random().toString(36).substring(2, 10)}`,
    name: `Name_${Math.random().toString(36).substring(2, 6)}`,
    // Add random generation for other fields
  };
}
```

**Guidelines**
- Replace `<Entity>` with a PascalCase name that represents the domain object (e.g., `User`, `Order`).
- Keep the factory pure (no side effects, no I/O). Use it in fixtures or test steps.
- Do **not** include `expect` assertions.
- Follow `.clinerules/typescript.md` and coding‑standard rules.
- Store each factory under `src/test-data/` with a descriptive file name.

**Usage**  
The orchestrator can import these factories in fixture files or step definitions to supply consistent test data.