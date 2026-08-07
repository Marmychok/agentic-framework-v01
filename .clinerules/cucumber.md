# Cucumber (BDD) Rules

## Feature File Structure
- Use **Gherkin** syntax with clear, business‑focused language.
- Include an optional **Background** section for shared preconditions.
- Each **Scenario** must be independent and idempotent.
- Use **Scenario Outline** with **Examples** for data‑driven tests.
- Tag scenarios for component, layer, or criticality (e.g., `@ui`, `@smoke`, `@regression`).

## Step Definition Guidelines
- Keep step definitions **thin**; they must only delegate to Page Objects or Component Objects.
- Do **not** include Playwright APIs, locators, or assertions in step definitions.
- Use descriptive **step names** that map directly to business actions.
- Group related steps into logical files within `steps/`.

## Naming Conventions
- Feature files: `<feature>.feature` (lower‑kebab‑case).
- Scenario titles: Title Case, describing the business outcome.
- Step definitions: `Given/When/Then` phrasing that reads naturally.

## Best Practices
- Avoid implementation details in Gherkin; keep it at the **behaviour** level.
- Reuse steps across features where possible; extract common steps into shared step files.
- Prefer **parameterized steps** over duplicating similar steps.
- Use **explicit** data in Examples tables; avoid ambiguous placeholders.

## Assertions
- All assertions belong in **Page Objects** or **Component Objects** and are invoked via step definitions.
- Use Playwright’s `expect` API inside those objects.

## Hooks
- Use **Before** and **After** hooks sparingly; they should set up/tear down test context, not contain test logic.
- Store hook implementations in a dedicated `hooks/` directory.

## Review Checklist
- [ ] Feature files are business‑focused, no UI specifics.
- [ ] Scenarios are independent and idempotent.
- [ ] Step definitions are thin and delegate to page/component objects.
- [ ] No Playwright API calls inside step definitions.
- [ ] Assertions are performed via page/component objects.
- [ ] Tags are applied appropriately.
- [ ] Examples tables are clear and explicit.