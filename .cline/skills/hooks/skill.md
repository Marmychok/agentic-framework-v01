# Hooks Skill

## Purpose
Provide reusable Playwright hook implementations and guidelines for setting up and tearing down test environments, ensuring consistent state across test runs while adhering to `.clinerules/playwright.md` and Cline best‑practice standards.

## Examples
- **Global Setup/Teardown Hook**
  ```typescript
  // hooks/global-setup.ts
  import { chromium, ChromiumBrowser } from '@playwright/test';
  import { getEnv } from '../utils/env';

  let browser: ChromiumBrowser;

  export const globalSetup = async () => {
    const headless = getEnv('HEADLESS', 'true') === 'true';
    browser = await chromium.launch({ headless });
    // Store browser instance for later use (e.g., via global variable or test fixtures)
  };

  export const globalTeardown = async () => {
    await browser?.close();
  };
  ```

- **Per‑Test Hook via Extend**
  ```typescript
  // fixtures/authenticated-page.ts
  import { test as base } from '@playwright/test';
  import { LoginPage } from '../src/pages/login.page';

  export const test = base.extend<{ authPage: LoginPage }>({
    authPage: async ({ page }, use) => {
      const login = new LoginPage(page);
      await login.login('test@example.com', 'Password123');
      await use(login);
    },
  });
  ```

- **AfterEach Screenshot on Failure**
  ```typescript
  // hooks/screenshot-on-failure.ts
  import { test as base } from '@playwright/test';
  import { mkdirSync } from 'fs';
  import path from 'path';

  export const test = base.extend({
    page: async ({ page }, use, testInfo) => {
      await use(page);
      testInfo.attachments.push({
        name: 'screenshot',
        path: path.resolve(`screenshots/${testInfo.title}.png`),
        contentType: 'image/png',
      });
    },
  });

  // In playwright.config.ts
  // test.afterEach(async ({}, testInfo) => {
  //   if (testInfo.status !== testInfo.expectedStatus) {
  //     await testInfo.attachments[0].path; // screenshot already attached
  //   }
  // });
  ```

## Reusable Prompts
1. **Create Global Setup Hook**
   ```
   Generate a globalSetup function that launches a Chromium browser instance based on the HEADLESS env variable and stores it for reuse.
   ```

2. **Add Authenticated Page Fixture**
   ```
   Provide a Playwright test extension that logs in a user before each test and exposes the logged‑in page object as `test.authPage`.
   ```

3. **Capture Screenshot on Failure**
   ```
   Implement an afterEach hook that automatically captures a screenshot when a test fails and attaches it to the test report.
   ```

## Best Practices
- Use **globalSetup/globalTeardown** for expensive one‑time operations (e.g., starting a Docker container, launching a browser).
- Keep per‑test hooks lightweight; avoid long‑running async work inside them.
- Always clean up resources (close browsers, database connections) in teardown hooks.
- Store any shared state in a well‑defined location (e.g., a dedicated fixture module) to avoid hidden globals.
- Leverage Playwright’s built‑in `test.describe.configure({ retries: 2 })` for flaky‑prone suites instead of custom retry logic.

## Validation
- Hooks must be referenced correctly in `playwright.config.ts` (`globalSetup`, `globalTeardown`, `reporter`, etc.).
- Running `npx playwright test` should execute the hooks without uncaught exceptions.
- Screenshots should appear in the test report for failing tests.

## Anti‑patterns
- Performing heavy I/O or network calls inside a per‑test hook, causing slowdown.
- Leaving dangling browser instances or database connections after tests complete.
- Using `testInfo.attachments` without proper cleanup, leading to disk bloat.

## Limitations
- This skill does not provide CI‑specific hook integration (e.g., GitHub Actions matrix setup); those can be added via the `github-actions` skill or a dedicated DevOps agent.