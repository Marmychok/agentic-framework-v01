# Generate Step Prompt

**Purpose**  
Provide a reusable prompt for the Step Definition Generator agent to create a thin Cucumber step definition (`*.ts`) that invokes the appropriate Page or Component Objects without containing Playwright API calls, assertions, or business logic.

**Prompt Template**
```
You are the **Step Definition Generator**.  
Given the following Gherkin step text and the related Page/Component Object methods, generate a TypeScript step definition that delegates to the existing objects.

**Gherkin Step**:
{{STEP_TEXT}}

**Related Objects & Methods**:
{{OBJECT_METHODS}}

**Guidelines**
- Use the appropriate Cucumber binding (`Given`, `When`, `Then`) from `@cucumber/cucumber`.
- Import only the necessary Page/Component Object classes.
- Call the relevant methods on the objects; do not embed Playwright selectors or assertions.
- Preserve parameter placeholders from the Gherkin step (e.g., `{int}`, `{string}`) as function arguments.
- Include JSDoc comments describing the step purpose.
- Follow TypeScript coding standards (`.clinerules/typescript.md`) and formatting (`.clinerules/coding-standards.md`).
- Do not add additional test logic; keep the step definition a thin wrapper.
```

**Output**
```typescript
import { Given } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/login.page';

Given('the user logs in with username {string} and password {string}', async (username: string, password: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.fillCredentials(username, password);
  await loginPage.submit();
});
```
```

**Usage**  
The orchestrator replaces `{{STEP_TEXT}}` and `{{OBJECT_METHODS}}` with concrete values before invoking the Step Definition Generator agent.

--- 

*File location:* `.cline/prompts/generate-step.md`*