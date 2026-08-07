# Gherkin Skill

## Purpose

Provide reusable snippets, best‑practice guidelines, and prompts for writing clear, business‑focused Gherkin feature files that conform to the standards in `.clinerules/cucumber.md` and the Cline naming conventions.

## Examples

- **Feature File Skeleton**

  ```gherkin
  @ui @smoke
  Feature: User login

    Background:
      Given the user navigates to the login page

    Scenario: Successful login
      When the user logs in with valid credentials
      Then the dashboard is displayed
      And a welcome message containing the user's first name is shown

    Scenario Outline: Invalid login attempts
      When the user logs in with "<email>" and "<password>"
      Then an error message "<errorMessage>" is shown

      Examples:
        | email                 | password   | errorMessage               |
        | invalid@example.com   | wrong123   | Invalid credentials        |
        | ""                    | secret123! | Email is required          |
        | user@example.com      | ""         | Password is required       |
  ```

- **Parameterized Step Definition Prompt**
  ```
  Generate a step definition for the step "When the user logs in with "<email>" and "<password>"" that uses the LoginPage object to fill the form and submit.
  ```

## Reusable Prompts

1. **Create Feature**

   ```
   Generate a Gherkin feature file for <FeatureName> that includes a Background, at least two Scenarios (one happy path, one error case), and appropriate @tags.
   ```

2. **Add Scenario Outline**

   ```
   Extend the <FeatureFile> with a Scenario Outline titled "<Title>" that uses a data table with columns <Col1>, <Col2>, ... and describes the expected outcome.
   ```

3. **Generate Step Definitions**
   ```
   Produce TypeScript step definitions for all steps in <FeatureFile> using the appropriate Page/Object methods and the logging skill.
   ```

## Best Practices

- Keep language business‑oriented; avoid UI implementation details (e.g., selector names, button IDs).
- Use **Background** for shared preconditions across scenarios.
- Prefer **Scenario Outline** with an **Examples** table when the same steps are executed with multiple data sets.
- Tag scenarios with high‑level categories (`@ui`, `@api`, `@regression`, `@smoke`) for selective execution.
- Keep step text concise and reusable; reuse existing step definitions whenever possible.
- Follow the naming conventions in `.clinerules/naming-conventions.md` for file names (`<feature-name>.feature`).

## Validation

- Feature files must parse with the cucumber CLI (`cucumber-js`) without errors.
- All steps must have matching step definitions; missing definitions are reported by the test run.
- No step should contain technical details such as element selectors or URLs.
- Tags must be lowercase and prefixed with `@`.

## Anti‑patterns

- Embedding UI specifics like “click the button with data‑test‑id='login'”.
- Using long, complex sentences that are hard to reuse.
- Duplicating step text across multiple scenarios; extract into a shared step instead.
- Leaving unused or orphaned step definitions.

## Limitations

- This skill does not generate the actual implementation code for page objects or components; combine it with the `page-object-model` and `component-object-model` skills for full end‑to‑end test generation.
