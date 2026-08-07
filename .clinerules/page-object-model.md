# Page Object Model Rules

## Purpose

Page Objects encapsulate the UI of a specific page or view, providing a clean API for tests to interact with the page without exposing implementation details.

## Structure

- **Locators**: Defined as class properties using the preferred locator strategy (see Locator Rules).
- **Reusable Methods**: Public methods that perform high‑level actions (e.g., `login(username, password)`).
- **No Assertions**: Page Objects must never contain assertions; they return state to be asserted by step definitions or higher‑level components.
- **No Test Logic**: Business logic belongs in step definitions, component objects, or helper services.
- **Encapsulated Waits**: Only implicit auto‑waiting or internal helper waits (e.g., waiting for a modal to appear) are allowed; explicit `waitForTimeout` is prohibited.

## Naming Conventions

- Class name: `<PageName>Page` (PascalCase).
- File name: `<page-name>.page.ts` (kebab‑case).

## Method Design

- Keep methods **atomic** and **composable**.
- Return `this` for chainable actions when appropriate.
- Accept parameters for dynamic inputs; avoid hard‑coded values.

## Example

```typescript
export class LoginPage {
  readonly usernameInput = this.page.getByLabel('Username');
  readonly passwordInput = this.page.getByLabel('Password');
  readonly submitButton = this.page.getByRole('button', { name: 'Log in' });

  async fillCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    return this;
  }

  async submit() {
    await this.submitButton.click();
    await this.page.waitForURL('**/dashboard');
  }

  async isErrorVisible() {
    return this.page.getByText('Invalid credentials').isVisible();
  }
}
```

## Component Integration

- Page Objects may **compose** Component Objects for reusable UI fragments (e.g., header, footer).
- Component Objects follow the same rules but represent smaller UI pieces.

## Review Checklist

- [ ] Contains only locators and reusable methods.
- [ ] No assertions or test logic present.
- [ ] Uses preferred locator strategy.
- [ ] No explicit `waitForTimeout`.
- [ ] Methods are atomic and composable.
- [ ] Class and file naming follow conventions.
- [ ] Component objects are used where appropriate.
