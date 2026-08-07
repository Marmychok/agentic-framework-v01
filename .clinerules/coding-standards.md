# Coding Standards

## General Principles
- **Consistency:** Follow a consistent style across all codebases.
- **Readability:** Prioritize clear, self‑documenting code.
- **Maintainability:** Write code that is easy to refactor and extend.
- **Safety:** Avoid patterns that can lead to runtime errors or security issues.

## TypeScript
- Use **strict** mode (`"strict": true` in `tsconfig.json`).
- Prefer `const` over `let` unless mutation is required.
- Prefer explicit types over `any`.
- Use interfaces for public contracts; use types for internal structures.
- Enforce **no implicit any** and **no unused variables** via ESLint.

## Playwright
- Use the **Page Object Model** – no assertions inside page objects.
- Prefer accessibility selectors (`getByRole`, `getByLabel`, `getByTestId`, etc.).
- Avoid brittle CSS selectors and `nth-child`.
- Leverage **auto‑waiting**; never use `waitForTimeout`.
- Keep test files under `tests/` and name them `*.spec.ts`.

## Cucumber / Gherkin
- Keep feature files **business‑focused**; no implementation details.
- Use **Background** for common preconditions.
- Tag scenarios for component, layer, or criticality.
- Keep step definitions thin – they should delegate to page objects.

## ESLint & Prettier
- ESLint with the `@typescript-eslint` plugin for linting.
- Prettier for code formatting – enforce single‑quotes, 2‑space indentation.
- Run `eslint --fix` and `prettier --write` on pre‑commit via Husky.

## Commit Messages
- Follow the **Conventional Commits** format: `type(scope): description`.
  - Types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`.
- Include reference to the related ticket or user story.

## Security
- Never commit secrets; use `.env` and `dotenv`.
- Validate all external inputs.
- Use latest dependencies with known vulnerabilities patched.

## Documentation
- Every public function/class must have a JSDoc comment.
- Keep architecture, API, and usage docs up‑to‑date.

## Review Checklist
- [ ] Lint passes (`npm run lint`).
- [ ] Prettier format applied.
- [ ] No unused imports or variables.
- [ ] Types are explicit; no `any`.
- [ ] Accessibility selectors used where possible.
- [ ] No hard‑coded waits.
- [ ] All secrets are stored in `.env` and referenced via `process.env`.