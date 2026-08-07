# Playwright Rules

## Selector Strategy

- **Primary selectors**: Use accessibility selectors whenever possible.
  - `getByRole()`
  - `getByLabel()`
  - `getByTestId()`
  - `getByPlaceholder()`
  - `getByText()`
- **Secondary selectors**: `locator()` for custom patterns when accessibility selectors are insufficient.
- **Fallback**: CSS selectors only when no accessible alternative exists.
- **Last resort**: XPath for complex hierarchical queries.

## Selector Quality

- Never use brittle selectors such as `nth-child`, overly specific attribute chains, or dynamic IDs.
- Prefer stable attributes (`data-test-id`, `aria-label`, `role`) that are unlikely to change.
- Keep selectors short and expressive.

## Interaction Patterns

- Leverage **auto‑waiting**; do not add explicit `waitForTimeout`.
- Use `await element.click()`, `await element.fill()`, `await element.check()` etc.; Playwright will wait for the element to be actionable.
- For navigation, prefer `await page.goto(url, { waitUntil: 'networkidle' })`.

## Assertions

- Use Playwright’s `expect` API exclusively.
- Prefer specific assertions:
  - `toBeVisible()`
  - `toContainText()`
  - `toHaveText()`
  - `toHaveValue()`
  - `toHaveURL()`
- Avoid generic or custom assertion logic inside page objects.

## Waiting Strategy

- Prefer built‑in waiting mechanisms:
  - `await page.waitForURL()`
  - `await page.waitForResponse()`
  - `await locator.waitFor()`
- Only use explicit waits (`waitForTimeout`) in exceptional cases with documented justification.

## Test Organization

- Place test files under `tests/` with the naming convention `*.spec.ts`.
- Keep test logic thin; delegate interactions to Page Objects and Component Objects.

## Performance & Reliability

- Enable tracing (`await page.tracing.start()`) for debugging flaky tests.
- Record videos and screenshots on failure for Allure reporting.
- Use `test.describe.configure({ retries: 2 })` for flaky‑prone suites.

## Security

- Never hard‑code secrets; load them via `dotenv` and `process.env`.
- Validate any external data used for test parametrization.
