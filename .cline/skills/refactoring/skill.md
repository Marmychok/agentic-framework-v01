# Refactoring Skill

## Purpose

Provide reusable refactoring patterns, code‑modification snippets, and best‑practice guidelines for improving existing TypeScript/Playwright code while respecting the rules in `.clinerules/review-checklist.md` and `.clinerules/coding-standards.md`.

## Examples

- **Extract Method Refactor**

  ```typescript
  // Before
  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForURL('**/dashboard');
  }

  // After extracting fillCredentials
  async login(username: string, password: string) {
    await this.fillCredentials(username, password);
    await this.submit();
    await this.page.waitForURL('**/dashboard');
  }

  async fillCredentials(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
  ```

- **Rename Variable with Safe Guard**

  ```bash
  # Using jscodeshift (example command)
  jscodeshift -t rename-variable.js src/**/*.ts --dry --parser=tsx
  ```

- **Move Component to Shared Library**
  ```typescript
  // src/components/navbar.component.ts  -->  src/shared/components/navbar.component.ts
  // Update all imports:
  // import { NavbarComponent } from '../../components/navbar.component';
  // becomes
  // import { NavbarComponent } from '../../shared/components/navbar.component';
  ```

## Reusable Prompts

1. **Extract Method**

   ```
   Refactor the <ClassName> class by extracting the logic inside <method> into a new method named <NewMethodName>, preserving behavior and updating all call sites.
   ```

2. **Rename Symbol**

   ```
   Rename the variable/function/class <OldName> to <NewName> across the entire codebase, ensuring all references are updated and no naming collisions occur.
   ```

3. **Move Component**
   ```
   Relocate the <ComponentName>Component from src/components to src/shared/components and update all imports accordingly.
   ```

## Best Practices

- Keep each refactor small and isolated; run the test suite after each change.
- Prefer automated codemods (e.g., jscodeshift, ts-morph) for large‑scale rename/move operations.
- Do not modify public APIs without creating a deprecation plan.
- Update JSDoc comments to reflect new method names or signatures.
- Run `npm run lint --fix` and `npm run format` after each refactor to maintain style compliance.
- Record the refactor rationale in a markdown file under `.clinerules/refactoring-log.md` for auditability.

## Validation

- All affected code must compile (`tsc`) and pass `npm run lint`.
- No tests should fail after the refactor (`npm test` or `npm run test`).
- Updated imports must resolve correctly; run `tsc --noEmit` to verify.
- Ensure the refactoring does not introduce duplicate locators or break the locator priority rules.

## Anti‑patterns

- Performing massive rename operations manually without tool support.
- Changing method signatures that are used by external agents without versioning.
- Leaving dead code or unused imports after a refactor.
- Ignoring the review checklist (e.g., missing lint failures).

## Limitations

- This skill does not automatically create pull requests or run CI pipelines; those actions are handled by the `GitHub Actions Agent`.
- Complex architectural changes (e.g., moving from Page Objects to a new pattern) require coordination with the `Architecture Agent` and may involve multiple sub‑agents.
