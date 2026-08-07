# Page Object Template

**Purpose**  
Provide a starter TypeScript Page Object class that follows the project’s Page Object Model rules and can be extended for any page in the application.

**Template**
```typescript
import { Page } from '@playwright/test';

/**
 * Page Object for <Page Name>
 *
 * @remarks
 * This class encapsulates all UI interactions for the <Page Name> page.
 * It contains only locators and reusable methods—no assertions or test logic.
 */
export class <PageName>Page {
  readonly page: Page;

  // -----------------------------------------------------------------
  // Locators – follow .clinerules/locator-rules.md priority
  // -----------------------------------------------------------------
  readonly <elementName> = this.page.getByRole('button', { name: '<Button Name>' });
  // Add more locators here

  constructor(page: Page) {
    this.page = page;
  }

  // -----------------------------------------------------------------
  // Methods – high‑level actions, chainable when appropriate
  // -----------------------------------------------------------------
  /** Example method: navigate to the page */
  async goto(): Promise<this> {
    await this.page.goto('<PAGE_URL>');
    return this;
  }

  /** Example method: perform action on <elementName> */
  async click<ElementName>(): Promise<this> {
    await this.<elementName>.click();
    return this;
  }

  // Add additional methods here
}
```

**Guidelines**
- Replace `<PageName>` with a PascalCase name (e.g., `LoginPage`).
- Replace `<elementName>` and `<Button Name>` with descriptive, kebab‑case variable names.
- Use the highest‑priority locator strategy (`getByTestId`, `getByRole`, etc.) per `.clinerules/locator-rules.md`.
- Do **not** include any `expect` assertions; those belong in step definitions.
- Keep methods atomic and composable; return `this` when chaining is useful.
- Follow `.clinerules/page-object-model.md` and coding‑standard rules.

**Usage**  
The orchestrator places this file under `src/pages/<page-name>.page.ts` and fills the placeholders before invoking the Page Object Generator agent.