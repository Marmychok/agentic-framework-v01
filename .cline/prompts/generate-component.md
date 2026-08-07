# Generate Component Prompt

**Purpose**  
Provide a reusable prompt for the Component Generator agent to create a Playwright Component Object (`*.component.ts`) that adheres to the Component Object Model rules.

**Prompt Template**
```
You are the **Component Generator**.  
Based on the following UI fragment description and interaction requirements, generate a TypeScript Component Object class that complies with `.clinerules/component-model.md` and `.clinerules/locator-rules.md`.

**Component Description**:
{{COMPONENT_DESCRIPTION}}

**Interaction Requirements**:
{{INTERACTION_REQUIREMENTS}}

**Guidelines**
- Use the class name `<ComponentName>Component` (PascalCase) and file name `<component-name>.component.ts` (kebab‑case).
- Define locators using the highest‑priority selector strategy (see Locator Rules).
- Implement reusable methods only; do not include assertions or test logic.
- Encapsulate any necessary waits using Playwright’s auto‑waiting; avoid `waitForTimeout`.
- Follow TypeScript coding standards (`.clinerules/typescript.md`) and formatting (`.clinerules/coding-standards.md`).
- Include JSDoc comments for the class and each method.
- Import Playwright’s `Page` or `Locator` as needed.
```

**Output**
```typescript
import { Page } from '@playwright/test';

/**
 * Represents the navigation bar component.
 */
export class NavbarComponent {
  /** Menu button */
  readonly menuButton = this.page.getByRole('button', { name: 'Menu' });

  /** Logout link */
  readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });

  constructor(private readonly page: Page) {}

  /** Open the navigation menu */
  async openMenu() {
    await this.menuButton.click();
    await this.page.waitForSelector('[data-test-id="nav-menu"]');
  }

  /** Perform logout */
  async logout() {
    await this.logoutLink.click();
    await this.page.waitForURL('**/login');
  }
}
```
```

**Usage**  
The orchestrator substitutes `{{COMPONENT_DESCRIPTION}}` and `{{INTERACTION_REQUIREMENTS}}` with concrete details before invoking the Component Generator agent.

--- 

*File location:* `.cline/prompts/generate-component.md`*