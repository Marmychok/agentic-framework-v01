# Review Checklist

## Code Quality

- [ ] Lint passes (`npm run lint`).
- [ ] Prettier formatting applied (`npm run format`).
- [ ] No unused imports or variables.
- [ ] No `any` types; strict TypeScript enabled.
- [ ] All public functions/classes have JSDoc comments.
- [ ] Naming follows conventions (`.clinerules/naming-conventions.md`).

## Accessibility & Selectors

- [ ] All locators use the highest‑priority strategy (see `locator-rules.md`).
- [ ] No brittle selectors (`nth-child`, dynamic IDs).
- [ ] Accessibility selectors are preferred wherever possible.

## Test Structure

- [ ] Feature files are business‑focused, no UI implementation details.
- [ ] Scenarios are independent and idempotent.
- [ ] Step definitions are thin and delegate to Page/Component Objects.
- [ ] No Playwright API calls inside step definitions.
- [ ] Assertions only appear in Page or Component Objects.

## Page & Component Objects

- [ ] No assertions inside Page Objects.
- [ ] No assertions inside Component Objects.
- [ ] No explicit `waitForTimeout`; rely on auto‑waiting.
- [ ] Methods are atomic and composable.
- [ ] Locators are defined centrally within the object.

## Security & Secrets

- [ ] No secrets hard‑coded; use `process.env` via `dotenv`.
- [ ] Input validation performed where external data is used.

## Human Approval Gates

- [ ] Every major change is preceded by a STOP and human approval checkpoint (see `human-approval.md`).

## Documentation

- [ ] Architecture overview updated (`.clinerules/architecture.md`).
- [ ] Coding standards up‑to‑date (`coding-standards.md`).
- [ ] README includes setup and usage instructions.

## CI/CD

- [ ] GitHub Actions pipelines defined for lint, build, test, and reporting.
- [ ] Allure reports generated on test failures.
- [ ] Traces and videos are uploaded as artifacts.

## Performance & Reliability

- [ ] Tracing enabled for flaky tests (`await page.tracing.start()`).
- [ ] Retries configured for flaky suites (`test.describe.configure({ retries: 2 })`).

## Final Acceptance

- [ ] All checklist items passed.
- [ ] Human approval granted for the release.
