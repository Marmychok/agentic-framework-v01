# Generate Hooks Prompt

**Purpose**  
Provide a reusable prompt for the Hooks Generator agent to create Cucumber hook implementations (`hooks/*.ts`) that manage test lifecycle events (setup, teardown, global fixtures) in accordance with project conventions.

**Prompt Template**
```
You are the **Hooks Generator**.  
Based on the requested hook type and any specific setup/teardown actions, generate a TypeScript hook file that integrates with the Playwright test environment.

**Hook Type**: {{HOOK_TYPE}} (e.g., `BeforeAll`, `AfterEach`, `Before`, `After`)

**Desired Actions** (optional):
{{HOOK_ACTIONS}}

**Guidelines**
- Import the appropriate functions from `@cucumber/cucumber`.
- Use Playwright’s `test` fixtures when needed (e.g., browser, context, page).
- Keep hook logic minimal – only what is required for the described actions.
- Follow TypeScript and coding‑style rules (`.clinerules/typescript.md`, `.clinerules/coding-standards.md`).
- Add JSDoc comments describing the hook purpose.
- Ensure any resources allocated are properly cleaned up.
```

**Expected Output Example**
```typescript
import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

let browser;

BeforeAll(async () => {
  /** Launch a shared browser for all scenarios */
  browser = await chromium.launch({ headless: true });
});

AfterAll(async () => {
  /** Close the shared browser */
  await browser?.close();
});
```
```

**Usage**  
The orchestrator fills the placeholders before invoking the Hooks Generator agent.

--- 

*File location:* `.cline/prompts/generate-hooks.md`*