# Fixture Template

**Purpose**  
Provide a starter TypeScript fixture file that can be used to set up test data, mock services, or configure the test environment.

**Template**
```typescript
// src/fixtures/<fixture-name>.fixture.ts
import { Page } from '@playwright/test';

/**
 * Fixture for <Purpose Description>
 *
 * @remarks
 * Contains reusable setup code, mock data, or helper functions.
 * Does not contain test assertions or Playwright test definitions.
 */
export class <FixtureName>Fixture {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Example: seed data */
  async seedData(): Promise<void> {
    // Implement data seeding or mocking logic here
  }

  /** Example: clean up after test */
  async cleanup(): Promise<void> {
    // Implement cleanup logic here
  }

  // Add additional helper methods as needed
}
```

**Guidelines**
- Replace `<FixtureName>` with a PascalCase name (e.g., `UserFixture`).
- Keep methods focused on data preparation, mocking, or environment configuration.
- Do **not** include any `expect` assertions; those belong in step definitions or test files.
- Follow `.clinerules/testing-standards.md` (if existent) and general coding‑standard rules.
- Store the file under `src/fixtures/` and reference it from tests via the orchestrator.

**Usage**  
The orchestrator copies this template when generating a new fixture and fills the placeholders before invoking the Fixture Generator agent.