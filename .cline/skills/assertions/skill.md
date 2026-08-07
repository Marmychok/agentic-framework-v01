# Assertions Skill

## Purpose
Provide reusable Playwright `expect` patterns, helper functions, and guidelines for writing clear, maintainable assertions that comply with `.clinerules/playwright.md` and the overall Cline quality standards.

## Examples
- **Common Assertion Helpers**
  ```typescript
  // utils/assertions.ts
  import { expect, Locator } from '@playwright/test';

  export const expectVisible = async (locator: Locator, timeout = 3000) => {
    await expect(locator).toBeVisible({ timeout });
  };

  export const expectTextContains = async (locator: Locator, text: string, timeout = 3000) => {
    await expect(locator).toContainText(text, { timeout });
  };

  export const expectUrlMatches = async (page: Page, pattern: RegExp, timeout = 5000) => {
    await expect(page).toHaveURL(pattern, { timeout });
  };
  ```

- **Custom Matcher for Toast Messages**
  ```typescript
  // utils/toast.ts
  import { Page, expect } from '@playwright/test';

  export const expectToast = async (page: Page, message: string) => {
    const toast = page.getByRole('alert');
    await expect(toast).toBeVisible({ timeout: 2000 });
    await expect(toast).toContainText(message);
  };
  ```

## Reusable Prompts
1. **Add Expectation**
   ```
   Insert an assertion using Playwright's expect API that verifies the <ElementDescription> is visible within <ms> milliseconds.
   ```

2. **Create Assertion Helper**
   ```
   Generate a TypeScript helper function named <HelperName> that wraps a common expect pattern (e.g., visibility, text content, URL) and accepts a Locator or Page argument.
   ```

3. **Validate API Response**
   ```
   Provide an assertion that checks a Playwright network response has status 200 and a JSON body containing a field <fieldName> with value <expectedValue>.
   ```

## Best Practices
- Use the built‑in Playwright auto‑waiting; avoid manual `waitForTimeout`.
- Prefer specific expect methods (`toBeVisible`, `toContainText`, `toHaveURL`, `toHaveAttribute`) over generic ones.
- Keep assertion logic inside Page Objects or dedicated assertion helpers; never place assertions in step definitions.
- Parameterize timeout values via a central config (`testTimeouts.ts`) rather than hard‑coding them.
- When asserting network responses, use `page.waitForResponse` and validate both status and payload.

## Validation
- All assertions must compile (`tsc`) and pass `npm run lint`.
- No `expect` calls should appear outside of Page Objects, Component Objects, or dedicated assertion helpers.
- Running `npx playwright test` should report failures only when an expectation is not met.

## Anti‑patterns
- Using generic `expect(value).toBeTruthy()` for UI checks; prefer explicit UI‑specific matchers.
- Placing assertions inside utility functions that also perform actions (mixing concerns).
- Hard‑coding large timeout values that hide flaky behavior.

## Limitations
- This skill does not generate full test suites; it supplies only the assertion building blocks. Combine with the `page-object-model`, `component-object-model`, and `cucumber` skills to produce complete end‑to‑end tests.