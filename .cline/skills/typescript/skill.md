# TypeScript Skill

## Purpose

Provide reusable TypeScript utility snippets, type definitions, and best‑practice guidelines for the automation framework.

## Examples

- **Snippet**: Strict `tsconfig.json` template.

  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "noImplicitAny": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "declaration": true,
      "outDir": "./dist"
    },
    "include": ["src/**/*.ts", "tests/**/*.ts"]
  }
  ```

- **Snippet**: Generic Result type.
  ```typescript
  export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
  ```

## Reusable Prompts

1. **Create Interface**

   ```
   Generate a TypeScript interface for <Entity> with fields:
   - <field1>: <type>
   - <field2>: <type>
   ```

2. **Create Enum**

   ```
   Define a TypeScript enum named <EnumName> with values:
   - VALUE_ONE
   - VALUE_TWO
   - VALUE_THREE
   ```

3. **Create Utility Function**
   ```
   Write a utility function <functionName> that takes <parameters> and returns <return type>.
   ```

## Best Practices

- Always enable `strict` mode.
- Prefer `interface` for public contracts, `type` for unions.
- Use `readonly` for immutable properties.
- Prefer `async/await` for asynchronous code.
- Keep functions small and focused; single responsibility.
- Document public APIs with JSDoc.

## Validation

- Code must pass `npm run lint` and `npm run format`.
- No `any` usage; all types must be explicit.
- Ensure generated `tsconfig.json` matches `.clinerules/typescript.md`.

## Anti‑patterns

- Using `any` or `unknown` without justification.
- Declaring global variables without `export`.
- Mixing runtime logic with type definitions.

## Limitations

- This skill does not generate test data or fixture files; see the `test-data` skill for that purpose.
