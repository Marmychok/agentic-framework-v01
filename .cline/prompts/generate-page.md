# Generate Page Prompt

**Purpose**  
Provide a reusable prompt for the Page Object Generator agent to create a Playwright Page Object (`*.page.ts`) that follows the project’s Page Object Model rules.

**Prompt Template**
```
You are the **Page Object Generator**.  
Based on the following UI description and functional requirements, generate a TypeScript Page Object class that complies with `.clinerules/page-object-model.md` and `.clinerules/locator-rules.md`.

**UI Description**:
{{UI_DESCRIPTION}}

**Functional Requirements**:
{{FUNCTIONAL_REQUIREMENTS}}

**Guidelines**
- Use the class name `<PageName>Page` (PascalCase) and file name `<page-name>.page.ts` (kebab‑case).
- Define locators using the highest‑priority selector strategy (see Locator Rules).
- Implement reusable methods only; do not include assertions or test logic.
- Encapsulate any necessary waits using Playwright’s auto‑waiting; avoid `waitForTimeout`.
- Follow TypeScript coding standards (`.clinerules/typescript.md`) and formatting (`.clinerules/coding-standards.md`).
- Include JSDoc comments for the class and each method.
- Add import statements for Playwright’s `test` or `Page` as needed.
```

**Output**
```typescript
import { Page } from '@playwright/test';

/**
 * Represents the Login page.
 */
export class LoginPage {
  /** Username input */
  readonly usernameInput = this.page.getByLabel('Username');

  /** Password input */
  readonly passwordInput = this.page.getByLabel('Password');

  /** Submit button */
  readonly submitButton = this.page.getByRole('button', { name: 'Log in' });

  constructor(private readonly page: Page) {}

  /** Fill in credentials */
  async fillCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    return this;
  }

  /** Submit the login form */
  async submit() {
    await this.submitButton.click();
    await this.page.waitForURL('**/dashboard');
  }
}
```
```

**Usage**  
The orchestrator substitutes `{{UI_DESCRIPTION}}` and `{{FUNCTIONAL_REQUIREMENTS}}` with concrete details before invoking the Page Object Generator agent.

--- 

*File location:* `.cline/prompts/generate-page.md`*