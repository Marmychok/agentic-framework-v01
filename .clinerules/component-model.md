# Component Object Model Rules

## Purpose

Component Objects represent reusable UI fragments that can appear on multiple pages (e.g., navigation bars, modals, cards). They provide a focused API for interacting with the component without knowledge of the surrounding page.

## Structure

- **Locators**: Defined using the preferred locator strategy (see Locator Rules).
- **Reusable Methods**: Actions that can be performed on the component (e.g., `open()`, `close()`, `selectItem(name)`).
- **No Assertions**: Like Page Objects, components must not contain assertions; they expose state for callers to assert.
- **No Test Logic**: Business logic stays in step definitions or higher‑level page objects.

## Naming Conventions

- Class name: `<ComponentName>Component` (PascalCase).
- File name: `<component-name>.component.ts` (kebab‑case).

## Composition

- Page Objects may **contain** Component Objects as members and delegate to them.
- Component Objects may **nest** other Component Objects if needed (e.g., a `DropdownComponent` containing `OptionComponent`).

## Example

```typescript
export class NavbarComponent {
  readonly menuButton = this.page.getByRole('button', { name: 'Menu' });
  readonly logoutLink = this.page.getByRole('link', { name: 'Logout' });

  async openMenu() {
    await this.menuButton.click();
    await this.page.waitForSelector('[data-test-id="nav-menu"]');
  }

  async logout() {
    await this.logoutLink.click();
    await this.page.waitForURL('**/login');
  }
}
```

## Method Design

- Keep methods **single‑purpose** and **chainable** when appropriate.
- Accept parameters for dynamic data; avoid hard‑coded strings.

## Review Checklist

- [ ] Contains only locators and reusable methods.
- [ ] No assertions or test logic.
- [ ] Uses preferred locator strategy.
- [ ] No explicit `waitForTimeout`.
- [ ] Methods are atomic and composable.
- [ ] Class and file naming follow conventions.
- [ ] Designed for composition with Page Objects or other components.
