# Component Template

**Purpose**  
Provide a starter TypeScript Component Object class that follows the Component Object Model rules and can be reused across multiple pages.

**Template**
```typescript
import { Page } from '@playwright/test';

/**
 * Component Object for <Component Name>
 *
 * @remarks
 * Encapsulates reusable UI fragment interactions.
 * Contains only locators and reusable methods—no assertions or test logic.
 */
export class <ComponentName>Component {
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
  // Methods – high‑level actions specific to this component
  // -----------------------------------------------------------------
  /** Example method: open the component (if applicable) */
  async open(): Promise<this> {
    await this.<elementName>.click();
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
- Replace `<ComponentName>` with a PascalCase name (e.g., `NavbarComponent`).
- Replace `<elementName>` and `<Button Name>` with descriptive, kebab‑case variable names.
- Use the highest‑priority locator strategy per `.clinerules/locator-rules.md`.
- Do **not** include any `expect` assertions; those belong in step definitions.
- Keep methods atomic and composable; return `this` when chaining is useful.
- Follow `.clinerules/component-model.md` and coding‑standard rules.

**Usage**  
The orchestrator stores this file under `src/components/<component-name>.component.ts` and fills the placeholders before invoking the Component Generator agent.