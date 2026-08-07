# Component Object Model Skill

## Purpose

Provide reusable snippets, templates, and guidelines for creating Component Object classes that encapsulate reusable UI fragments, following the rules in `.clinerules/component-model.md`.

## Examples

- **Snippet**: Simple Navbar Component.

  ```typescript
  import { Page } from '@playwright/test';

  export class NavbarComponent {
    constructor(private readonly page: Page) {}

    // Locators
    readonly menuButton = this.page.getByRole('button', { name: 'Menu' });
    readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });

    // Actions
    async openMenu() {
      await this.menuButton.click();
      await this.page.waitForSelector('[data-test-id="nav-menu"]');
    }

    async logout() {
      await this.logoutLink.click();
      await this.page.waitForURL('**/login');
    }
  }
  ```

- **Snippet**: Modal Component with dynamic content.
  ```typescript
  import { Page } from '@playwright/test';

  export class ConfirmationModalComponent {
    constructor(private readonly page: Page) {}

    // Locators
    private readonly modalRoot = this.page.getByTestId('confirmation-modal');
    private readonly confirmButton = this.modalRoot.getByRole('button', { name: 'Confirm' });
    private readonly cancelButton = this.modalRoot.getByRole('button', { name: 'Cancel' });
    private readonly messageText = this.modalRoot.getByText(/.*/);

    // Actions
    async waitForVisible() {
      await this.modalRoot.waitFor({ state: 'visible' });
    }

    async confirm() {
      await this.confirmButton.click();
    }

    async cancel() {
      await this.cancelButton.click();
    }

    async getMessage(): Promise<string> {
      return this.messageText.textContent();
    }
  }
  ```

## Reusable Prompts

1. **Generate Component**

   ```
   Create a Component Object named <ComponentName>Component in src/components with the necessary locators and methods. Follow .clinerules/component-model.md.
   ```

2. **Add Component to Page Object**

   ```
   Update <PageName>Page to instantiate <ComponentName>Component and delegate relevant actions.
   ```

3. **Refactor Component Locator**
   ```
   Replace a locator inside <ComponentName>Component with a higher‑priority selector as defined in .clinerules/locator-rules.md.
   ```

## Best Practices

- Store locators as **readonly** class properties; do not create them inside methods.
- Keep methods **atomic**, **side‑effect free**, and free of assertions.
- Prefer the highest‑priority selector strategy; avoid brittle CSS or XPath.
- Do not embed navigation or URL checks inside components; those belong in Page Objects.
- Document each method with JSDoc, describing inputs, outputs, and side effects.
- Components should be reusable across multiple Page Objects; avoid page‑specific logic.

## Validation

- The file must compile with TypeScript (`tsc`) and pass `npm run lint`.
- No `expect` calls should be present.
- All locators must honor the priority order from `.clinerules/locator-rules.md`.
- File naming follows kebab‑case (`<component-name>.component.ts`) and class naming follows PascalCase (`<ComponentName>Component`).

## Anti‑patterns

- Mixing assertions or navigation logic inside component methods.
- Defining locators inside method bodies.
- Using fragile selectors (`nth-child`, overly specific CSS chains).
- Hard‑coding URLs, credentials, or environment‑specific data.

## Limitations

- This skill does not generate the associated test steps or feature files; use the `cucumber` or `test-data` skills for those.
- Complex component hierarchies may require separate helper utilities; see the `utils` skill for that purpose.
