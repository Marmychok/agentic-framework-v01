# Hooks Template

**Purpose**  
Provide a starter TypeScript hooks file for Playwright test lifecycle events (e.g., beforeAll, afterEach) and custom helper functions.

**Template**
```typescript
import { test as base, Page } from '@playwright/test';

/**
 * Extend the base test with custom fixtures or hooks.
 *
 * @remarks
 * This file defines global test hooks and any custom fixtures that
 * should be available to all test files. Do not place assertions here.
 */
type TestFixtures = {
  // Example custom fixture
  customPage: Page;
};

export const test = base.extend<TestFixtures>({
  // -----------------------------------------------------------------
  // Custom fixtures
  // -----------------------------------------------------------------
  customPage: async ({ page }, use) => {
    // Perform any setup needed for the custom page fixture
    await use(page);
  },

  // -----------------------------------------------------------------
  // Global hooks
  // -----------------------------------------------------------------
  // Runs before all tests in the suite
  beforeAll: async () => {
    // Global setup (e.g., start mock server)
  },

  // Runs after all tests in the suite
  afterAll: async () => {
    // Global teardown (e.g., stop mock server)
  },

  // Runs before each test
  beforeEach: async ({}, testInfo) => {
    // Per‑test setup (e.g., clear cookies)
  },

  // Runs after each test
  afterEach: async ({}, testInfo) => {
    // Per‑test cleanup (e.g., take screenshot on failure)
  },
});
```

**Guidelines**
- Do **not** include `expect` assertions; those belong in test files or step definitions.
- Keep hook logic lightweight; rely on Playwright’s auto‑waiting.
- Use the highest‑priority locator strategy inside any fixture if you need to interact with the UI.
- Follow `.clinerules/playwright.md` and coding‑standard rules.
- Store this file as `src/hooks.ts` (or `src/test-hooks.ts`) and import `test` from it in all spec files.

**Usage**  
The orchestrator copies this template into the project and the Execution Agent can import the extended `test` object for all Playwright tests.