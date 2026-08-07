# Locator Rules

## Priority Order
When generating locators, follow this strict priority list:

1. **getByTestId** – Use `data-test-id` attributes whenever available.
2. **getByRole** – Preferred for interactive elements (buttons, links, inputs, etc.).
3. **getByLabel** – Use for form controls with visible `<label>` elements.
4. **getByPlaceholder** – Use for inputs that have placeholder text.
5. **getByText** – Use for static text elements where other strategies are not applicable.
6. **locator** – Use when none of the above applies; construct a stable selector (e.g., `[data-automation-id="..."]`).
7. **CSS Selector** – Use only as a fallback when no accessibility or data‑test identifiers exist.
8. **XPath** – Use as a last resort for complex hierarchical queries.

## General Guidelines
- **Never** use brittle selectors such as `nth-child`, overly specific attribute chains, or dynamic IDs.
- Prefer stable attributes (`data-test-id`, `data-qa`, `aria-label`, `role`) that are unlikely to change.
- Keep selectors **short**, **readable**, and **descriptive**.
- When using `locator()`, avoid chaining overly specific CSS; instead, rely on custom data attributes.
- Document each locator with a comment describing its purpose and the UI element it targets.

## Accessibility First
- Aim to use **accessibility selectors** (`getByRole`, `getByLabel`, `getByTestId`, `getByPlaceholder`, `getByText`) wherever possible.
- Ensure that the UI under test includes appropriate accessibility attributes.

## Maintenance
- Centralize locators within Page Objects or Component Objects.
- When a UI change occurs, update the locator in the single source of truth.
- Run automated linting rules to detect the presence of prohibited selector patterns.

## Review Checklist
- [ ] Locator uses the highest‑priority strategy possible.
- [ ] No `nth-child` or fragile CSS chains.
- [ ] Selector is based on stable attributes.
- [ ] Locator is defined within a Page/Object class, not inline in tests.
- [ ] Accessibility selectors are preferred.
- [ ] XPath is only used when no other option exists.