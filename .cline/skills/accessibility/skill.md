# Accessibility Skill

## Purpose

Provide reusable utilities, testing patterns, and guidelines for verifying accessibility compliance of UI components using Playwright and aXe, following the standards in `.clinerules/accessibility.md` (if present) and Cline’s overall quality requirements.

## Examples

- **aXe Integration Helper**

  ```typescript
  // utils/axe-helper.ts
  import { Page } from '@playwright/test';
  import AxeBuilder from '@axe-core/playwright';

  export const runAxeChecks = async (page: Page) => {
    const results = await new AxeBuilder({ page }).analyze();
    if (results.violations.length) {
      const messages = results.violations.map((v) => `${v.id}: ${v.description}`).join('\n');
      throw new Error(`Accessibility violations detected:\n${messages}`);
    }
  };
  ```

- **Automated Accessibility Test**

  ```typescript
  // tests/accessibility/login-accessibility.spec.ts
  import { test, expect } from '@playwright/test';
  import { runAxeChecks } from '../../utils/axe-helper';
  import { LoginPage } from '../../src/pages/login.page';

  test('Login page meets WCAG 2.1 AA', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await runAxeChecks(page);
  });
  ```

- **Custom Violation Reporter**
  ```typescript
  // reporters/axe-reporter.ts
  import { Reporter, TestResult } from '@playwright/test/reporter';

  export default class AxeReporter implements Reporter {
    onTestEnd(test, result: TestResult) {
      if (result.error?.message?.includes('Accessibility violations')) {
        console.error(`⚠️ Accessibility failure in ${test.title}`);
      }
    }
  }
  ```

## Reusable Prompts

1. **Add Axe Check**

   ```
   Insert an aXe accessibility check into the <PageName>Page test that fails the test if any violations are found.
   ```

2. **Create Custom Reporter**

   ```
   Generate a Playwright reporter that logs a concise summary of aXe violations for each test.
   ```

3. **Define Accessibility Standards**
   ```
   Provide a markdown checklist of required accessibility rules (e.g., color contrast, ARIA attributes) that should be enforced in all new components.
   ```

## Best Practices

- Run aXe checks **after** the page is fully loaded and all dynamic content is rendered.
- Keep accessibility checks fast by limiting the scope to the component under test (e.g., using `page.locator('component-root')`).
- Fail the test on any violation; do not treat accessibility warnings as optional.
- Integrate the aXe reporter into CI to surface violations early.
- Document any known false positives and suppress them with proper aXe rule configuration.

## Validation

- The `runAxeChecks` utility must throw an error when violations exist and pass silently when none are found.
- Tests that include the utility should fail in CI if accessibility issues are present.
- The custom reporter should output a readable summary of violations without breaking the test run.

## Anti‑patterns

- Skipping accessibility checks in flaky or slow tests.
- Using `await page.waitForTimeout` to give aXe time to run; rely on Playwright’s auto‑waiting.
- Ignoring violations by catching and suppressing errors.

## Limitations

- This skill does not perform comprehensive accessibility audits across the entire application; it provides per‑page/component helpers. For full audits, integrate a dedicated accessibility testing pipeline (e.g., Lighthouse CI) via the `github-actions` skill.
