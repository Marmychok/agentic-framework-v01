# Prompt: generate-hooks-template.md

**Goal**  
Instruct the Cline agents to create a reusable Hooks template for Playwright test lifecycle management.

**Prompt**
```
Generate a TypeScript hooks template that extends Playwright’s base test with custom fixtures and global lifecycle hooks (beforeAll, afterEach, etc.). The template should:

- Live under `src/` (e.g., `src/hooks.ts`).
- Define a `test` object extending `base.extend` with a custom fixture example.
- Include placeholders for user‑specific logic (`<...>`).
- Follow the project's `.clinerules/playwright.md`, `.clinerules/coding-standards.md`, and `.clinerules/naming-conventions.md`.
- Contain no assertions; only setup/teardown logic.
- Provide a concise usage comment.

Return the complete file content as a Markdown code block with language identifier `typescript`.
```

**Usage**  
The orchestrator calls this prompt when a new hooks file is required, and the generated content is written to `.cline/templates/hooks.md` (or directly to `src/hooks.ts` by the Hooks Generator agent.