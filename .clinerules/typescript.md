# TypeScript Guidelines

## Compiler Settings
- Enable **strict** mode (`"strict": true`).
- Target **ES2022** to leverage modern language features.
- Use **moduleResolution** set to `node`.
- Generate declaration files (`"declaration": true`).

## Code Style
- Prefer `const` over `let` unless reassignment is required.
- Use **explicit typing**; avoid `any`.
- Prefer **interfaces** for public contracts and **type aliases** for internal structures.
- Use **readonly** for immutable properties.
- Prefer **enum** for limited sets of string literals.

## Naming Conventions
- **PascalCase** for classes, interfaces, enums, and type aliases.
- **camelCase** for variables, functions, and object properties.
- **UPPER_SNAKE_CASE** for constants.
- Test files: `<name>.spec.ts`.

## Async/Await
- Always use `async/await` for asynchronous operations.
- Return `Promise<T>` where appropriate.
- Handle errors with `try/catch` and propagate with `throw`.

## Error Handling
- Use custom error classes extending `Error` for domain‑specific errors.
- Include meaningful messages and stack traces.

## Linting & Formatting
- ESLint with `@typescript-eslint` plugin.
- Prettier with 2‑space indentation, single quotes, and trailing commas.

## Documentation
- Use **JSDoc** comments for all exported members.
- Include `@param`, `@returns`, and `@throws` where applicable.

## Testing
- Write unit tests using **Jest** or **Vitest**.
- Keep tests isolated; mock external dependencies.

## Performance
- Avoid unnecessary object allocations in hot paths.
- Prefer immutable data structures where possible.

## Security
- Validate all external inputs.
- Do not expose internal types in the public API.

## Review Checklist
- [ ] Strict mode enabled
- [ ] No `any` usages
- [ ] Consistent naming conventions
- [ ] Lint passes
- [ ] Prettier applied
- [ ] JSDoc present for public APIs
- [ ] Error handling follows guidelines