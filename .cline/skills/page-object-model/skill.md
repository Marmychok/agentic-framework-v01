# Page Object Model Skill

## Purpose
Supply reusable scaffolding, code snippets, and guidelines for creating Page Object classes that adhere to the rules in `.clinerules/page-object-model.md`.

## Examples
- **Snippet**: Basic Page Object template.
  ```typescript
  import { Page } from '@playwright/test';

  export class LoginPage {
    constructor(private readonly page: Page) {}

    // Locators
    readonly usernameInput = this.page.getByLabel('Username');
    readonly passwordInput = this.page.getByLabel('Password');
    readonly submitButton = this.page.getByRole('button', { name: 'Log in' });

    // Actions
    async fillCredentials(username: string, password: string) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      return this;
    }

    async submit() {
      await this.submitButton.click();
      await this.page.waitForURL('**/dashboard');
    }

    async isErrorVisible() {
      return this.page.getByText('Invalid credentials').isVisible();
    }
  }
  ```

- **Snippet**: Page Object with Component composition.
  ```typescript
  import { Page } from '@playwright/test';
  import { NavbarComponent } from '../../components/navbar.component';

  export class DashboardPage {
    constructor(private readonly page: Page) {}

    readonly navbar = new NavbarComponent(this.page);
    readonly welcomeMessage = this.page.getByText('Welcome');

    async verifyWelcome() {
      await this.welcomeMessage.waitFor({ state: 'visible' });
    }
  }
  ```

## Reusable Prompts
1. **Generate Page Object**
   ```
   Create a Page Object named <PageName>Page in the src/pages directory with the following locators and methods:
   - Locators: <list>
   - Methods: <list>
   Follow the .clinerules/page-object-model.md guidelines.
   ```

2. **Add Component to Page Object**
   ```
   Update the <PageName>Page to include a <ComponentName>Component instance and expose methods that delegate to it.
   ```

3. **Refactor Locator**
   ```
   Replace an existing locator in <PageName>Page with a higher‑priority selector according to .clinerules/locator-rules.md.
   ```

## Best Practices
- Keep locators as class properties, defined once.
- Methods should be **atomic**, **chainable** when appropriate, and free of assertions.
- Use only the preferred locator strategies; never embed CSS chains or XPath unless required.
- Avoid explicit `waitForTimeout`; rely on auto‑waiting or `await locator.waitFor()` as needed.
- Document each method with JSDoc comments.
- Centralize any reusable helper functions in a `utils` folder.

## Validation
- The generated file must compile with `tsc` and pass `npm run lint`.
- No `expect` calls should appear in the Page Object.
- All locators must follow the priority order defined in `.clinerules/locator-rules.md`.
- Ensure the file naming follows kebab‑case (`<page-name>.page.ts`) and class naming follows PascalCase (`<PageName>Page`).

## Anti‑patterns
- Mixing test assertions or Playwright API calls inside Page Objects.
- Defining locators inside methods instead of as class properties.
- Using brittle selectors (`nth-child`, overly specific CSS) for locators.
- Hard‑coding URLs or credentials.

## Limitations
- This skill focuses on Page Object scaffolding only; it does not generate the associated test steps or feature files. Use the `cucumber` or `test-data` skills for those artifacts.