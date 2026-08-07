# Playwright Skill

## Purpose

Provide reusable Playwright code snippets, best‑practice guidelines, and prompts for generating Page Objects, Component Objects, and test scripts.

## Examples

- **Snippet**: Launch a browser with a clean context.

  ```typescript
  import { chromium } from '@playwright/test';

  export async function launchBrowser() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, context, page };
  }
  ```

- **Prompt**: Generate a Page Object for a login page.
  ```
  Generate a Page Object named LoginPage with the following methods:
  - fillCredentials(username: string, password: string)
  - submit()
  - isErrorVisible(): Promise<boolean>
  Use the preferred locator strategy (see .clinerules/locator-rules.md).
  ```

## Reusable Prompts

1. **Generate Page Object**

   ```
   Create a Page Object <PageName>Page with locators and methods described in the specification.
   ```

2. **Generate Component Object**

   ```
   Create a Component Object <ComponentName>Component with appropriate locators and actions.
   ```

3. **Generate Test Step**
   ```
   Write a step definition that calls <PageObject>.<method>() and asserts the expected outcome.
   ```

## Best Practices

- Use **accessibility selectors** as the first choice.
- Keep methods **atomic** and **chainable**.
- Do not embed assertions; delegate to the caller.
- Leverage **auto‑waiting**; avoid `waitForTimeout`.
- Wrap browser launch/close in fixtures for reuse.

## Validation

- All generated code must pass `npm run lint` and `npm run format`.
- Locators must follow the priority list in `.clinerules/locator-rules.md`.
- No direct `expect` calls inside the generated Page/Component code.

## Anti‑patterns

- Hard‑coded URLs or credentials.
- Use of `nth-child` or brittle CSS selectors.
- Mixing test logic with page object responsibilities.

## Limitations

- This skill does not manage test data generation; see the `test-data` skill for data factories.
