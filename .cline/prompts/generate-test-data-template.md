# Prompt: generate-test-data-template.md

**Goal**  
Direct agents to produce a TypeScript test‑data factory template for creating deterministic and random domain objects.

**Prompt**

```
Create a TypeScript test‑data template that:

- Resides under `src/test-data/` (e.g., `src/test-data/<entity>-factory.ts`).
- Defines a TypeScript `interface` for the entity (`<Entity>`).
- Provides three factory functions:
  1. `create` – returns a full object with optional overrides.
  2. `createMany` – returns an array of objects.
  3. `createRandom` – returns an object with random values.
- Uses placeholders (`<Entity>`, `<entityName>`) for the user to replace.
- Contains no Playwright test definitions or assertions.
- Adheres to `.clinerules/typescript.md` and coding‑standard rules.

Output the file content as a fenced code block with `typescript` language tag.
```

**Usage**  
The Prompt is invoked by the Test Data Generator agent to create `.cline/templates/test-data.md` (or directly write to `src/test-data/`).
