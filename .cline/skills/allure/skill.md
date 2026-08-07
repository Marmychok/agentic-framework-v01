# Allure Skill

## Purpose

Supply reusable utilities, configuration snippets, and best‑practice guidelines for generating Allure reports from Playwright test runs, adhering to `.clinerules/reporting.md` (if present) and Cline’s documentation standards.

## Examples

- **Allure Reporter Configuration**

  ```typescript
  // playwright.config.ts
  import { defineConfig, devices } from '@playwright/test';

  export default defineConfig({
    reporter: [
      ['list'],
      [
        'allure-playwright',
        { outputFolder: 'allure-results', disableWebdriverStepsReporting: true },
      ],
    ],
    use: {
      // common settings
      headless: true,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
  });
  ```

- **Adding Attachments in Tests**

  ```typescript
  // tests/example.spec.ts
  import { test, expect } from '@playwright/test';
  import { all } from 'allure-playwright';

  test('example with attachment', async ({ page }) => {
    await page.goto('https://example.com');
    const screenshot = await page.screenshot();
    all.attachment('Home page screenshot', screenshot, 'image/png');
    await expect(page).toHaveTitle(/Example Domain/);
  });
  ```

- **Custom Allure Labels**
  ```typescript
  // utils/allure-helpers.ts
  import { all } from 'allure-playwright';

  export const setFeature = (feature: string) => {
    all.feature(feature);
  };

  export const setStory = (story: string) => {
    all.story(story);
  };
  ```

## Reusable Prompts

1. **Configure Allure Reporter**

   ```
   Update playwright.config.ts to include the allure-playwright reporter with output folder "allure-results" and enable screenshot/video attachments on failure.
   ```

2. **Add Test Attachment**

   ```
   Insert an Allure attachment of the page HTML after the test finishes, using the appropriate helper from allure-playwright.
   ```

3. **Define Feature/Story Labels**
   ```
   Provide a utility that sets Allure feature and story labels based on the current test's metadata.
   ```

## Best Practices

- Keep the **output folder** (`allure-results`) inside the project root and add it to `.gitignore`.
- Attach **screenshots** and **videos** only on failure to keep report size manageable.
- Use **labels** (feature, story, severity) to organize tests and enable selective report generation.
- Run `npx playwright test && npx allure generate allure-results --clean -o allure-report` as part of the CI pipeline.
- Archive the generated `allure-report` as a CI artifact for stakeholder review.

## Validation

- After a test run, the `allure-results` directory must contain `.json` files for each test and any attached media.
- Running `npx allure serve allure-results` should launch a local server displaying the report without errors.
- The configuration must pass `npm run lint` and TypeScript compilation.

## Anti‑patterns

- Attaching large files (e.g., full page source) for every test; restrict attachments to failures.
- Disabling the reporter or redirecting output to a non‑persistent location.
- Forgetting to clean the `allure-results` folder between runs, leading to stale data.

## Limitations

- This skill does not cover CI‑specific steps for publishing Allure reports to external services (e.g., Allure Docker, GitHub Pages). Those steps can be added via the `github-actions` skill or a dedicated DevOps agent.
