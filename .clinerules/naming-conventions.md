# Naming Conventions

## General Rules
- Use **clear**, **descriptive**, and **consistent** names.
- Follow the **SOLID** principle of single responsibility; names should reflect that responsibility.
- Avoid abbreviations unless universally understood (e.g., `API`, `UI`).

## Files & Directories
- **Kebab‑case** for file and directory names (e.g., `login-page.ts`, `user-service.ts`).
- **PascalCase** for class, interface, enum, and type definitions (e.g., `LoginPage`, `UserService`).
- **snake_case** for environment variables in `.env` (e.g., `API_BASE_URL`).

## TypeScript
- **Interfaces**: `I<Thing>` is optional; prefer descriptive names without the `I` prefix (e.g., `UserCredentials`).
- **Enums**: `PascalCase` (e.g., `UserRole`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).

## Playwright
- **Page Objects**: `<PageName>Page` (e.g., `LoginPage`).
- **Component Objects**: `<ComponentName>Component` (e.g., `NavbarComponent`).
- **Locators**: Use descriptive variable names reflecting the UI element (e.g., `submitButton`, `errorMessage`).

## Cucumber / Gherkin
- **Feature Files**: `<feature-name>.feature` (kebab‑case).
- **Scenario Titles**: Title Case, describing the expected behaviour.
- **Step Definitions**: Use natural language in the Gherkin step; the corresponding function name can be snake_case or camelCase internally.

## Tests
- **Spec Files**: `<module>.spec.ts` (kebab‑case).
- **Test Data / Fixtures**: `<entity>Factory.ts` or `<entity>Builder.ts`.

## Agents & Skills
- **Agent Files**: `<agent-name>.md` (kebab‑case) inside `.cline/agents`.
- **Skill Files**: `<skill-name>.md` (kebab-case) inside `.cline/skills`.

## Review Checklist
- [ ] Kebab‑case for file and directory names.
- [ ] PascalCase for classes, interfaces, enums, types.
- [ ] Descriptive, business‑focused names.
- [ ] No ambiguous abbreviations.
- [ ] Consistent naming across agents, skills, and code artefacts.