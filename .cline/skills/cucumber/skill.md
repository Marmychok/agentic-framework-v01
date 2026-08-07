# Cucumber Skill

## Purpose
Provide reusable Cucumber (BDD) snippets, Gherkin templates, and best‑practice guidelines for writing feature files and step definitions that integrate with the Playwright framework.

## Examples
- **Feature Template**: Basic login feature.
  ```gherkin
  @ui @login
  Feature: User Login

    Background:
      Given the user is on the login page

    Scenario: Successful login with valid credentials
      When the user fills in username "john.doe@example.com"
      And the user fills in password "Secret123!"
      And the user clicks the "Log in" button
      Then the dashboard page should be displayed
      And the user sees a welcome message "Welcome, John!"

    Scenario Outline: Unsuccessful login attempts
      When the user fills in username "<username>"
      And the user fills in password "<password>"
      And the user clicks the "Log in" button
      Then an error message "<error>" should be displayed

      Examples:
        | username                | password   | error                     |
        | invalid@example.com     | Secret123! | Invalid credentials       |
        | john.doe@example.com    | wrongPass  | Invalid credentials       |
  ```

- **Step Definition Snippet** (TypeScript):
  ```typescript
  import { Given, When, Then } from '@cucumber/cucumber';
  import { LoginPage } from '../../src/pages/login.page';

  const loginPage = new LoginPage(page);

  Given('the user is on the login page', async () => {
    await page.goto('https://example.com/login');
  });

  When('the user fills in username {string}', async (username) => {
    await loginPage.fillUsername(username);
  });

  When('the user fills in password {string}', async (password) => {
    await loginPage.fillPassword(password);
  });

  When('the user clicks the {string} button', async (buttonName) => {
    await loginPage.clickButtonByName(buttonName);
  });

  Then('the dashboard page should be displayed', async () => {
    await page.waitForURL('**/dashboard');
  });
  ```

## Reusable Prompts
1. **Generate Feature File**
   ```
   Create a feature file <feature-name>.feature for the scenario <description>. Include Background, Tags, and Scenario Outline if data‑driven.
   ```

2. **Generate Step Definitions**
   ```
   Write step definitions in TypeScript for the steps in <feature-name>.feature using the Playwright Page Objects.
   ```

3. **Generate Hooks**
   ```
   Provide a Cucumber hook (Before/After) that sets up a new Playwright browser context for each scenario.
   ```

## Best Practices
- Keep feature files business‑focused; avoid UI implementation details.
- Use **Background** for shared preconditions.
- Prefer **Scenario Outline** with **Examples** for data‑driven tests.
- Tag scenarios appropriately (e.g., `@smoke`, `@regression`).
- Keep step definitions **thin**: they should delegate to Page/Component Objects.
- Do not place Playwright API calls, locators, or assertions inside step definitions.
- Use meaningful step names that read like natural language.

## Validation
- Feature files must be valid Gherkin (`cucumber-js` parser passes).
- Step definitions must compile with TypeScript and pass `npm run lint`.
- No direct `expect` calls inside step definitions; assertions belong to Page/Component Objects.
- All steps reference existing Page Objects or Component Objects.

## Anti‑patterns
- Embedding CSS/XPath selectors inside step definitions.
- Writing large blocks of test logic in steps instead of delegating.
- Duplicating step definitions across multiple files without reuse.
- Using hard‑coded URLs or credentials in steps.

## Limitations
- This skill does not generate test data factories; see the `test-data` skill for that purpose.
- Hook generation is limited to basic before/after hooks; complex lifecycle management should be handled by dedicated agents.