# Locator Skill

## Purpose

Provide reusable snippets and guidance for creating robust, maintainable locators that follow the priority order defined in `.clinerules/locator-rules.md`.

## Examples

- **Snippet**: Using `getByTestId` selector.

  ```typescript
  // Preferred when data-test-id attribute is present
  const submitButton = page.getByTestId('submit-button');
  ```

- **Snippet**: Fallback to `getByRole`.

  ```typescript
  const loginButton = page.getByRole('button', { name: 'Log in' });
  ```

- **Snippet**: Using `locator` with a stable custom attribute.
  ```typescript
  const customElement = page.locator('[data-automation-id="custom-element"]');
  ```

## Reusable Prompts

1. **Generate Locator**

   ```
   Provide a locator for the <element description> using the highest‑priority strategy from .clinerules/locator-rules.md.
   ```

2. **Generate Multiple Locators**

   ```
   List locators for the following UI elements on the <page name> page:
   - <element 1 description>
   - <element 2 description>
   - <element 3 description>
   ```

3. **Validate Locator**
   ```
   Verify that the locator <locator code> follows the selector guidelines and does not use brittle patterns.
   ```

## Best Practices

- Follow the exact priority order: `getByTestId` → `getByRole` → `getByLabel` → `getByPlaceholder` → `getByText` → `locator` → CSS → XPath.
- Prefer stable attributes (`data-test-id`, `aria-label`, `role`) over dynamic IDs or classes.
- Keep selectors short and expressive; avoid chaining multiple attribute selectors.
- Document each locator with a comment explaining its purpose.
- Centralize locators within Page or Component Objects; never inline them in test files.
- Run linting rules that flag prohibited patterns (`nth-child`, overly specific CSS).

## Validation

- Locator must compile with TypeScript and pass `npm run lint`.
- Linter must not report any prohibited selector patterns.
- When run with Playwright, the locator should resolve without errors (`await locator.waitFor()` succeeds).

## Anti‑patterns

- Using `nth-child` or fragile CSS chains.
- Relying on dynamic IDs that change between runs.
- Embedding business logic inside locator definitions.
- Placing locators directly in step definitions or test specs.

## Limitations

- This skill does not generate entire Page Objects; combine with the `page-object-model` skill for full classes.
- Complex hierarchical selectors may require custom helper functions; see the `utils` skill for that purpose.
