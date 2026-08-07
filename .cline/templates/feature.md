# Feature Template

**Purpose**  
Provide a starter Gherkin feature file that follows the project’s BDD conventions and can be used as a basis for new features.

**Template**

```gherkin
@<TAG1> @<TAG2>
Feature: <Feature Title>

  As a <role>
  I want to <goal>
  So that <benefit>

  Background:
    # Optional shared steps for all scenarios in this feature
    Given <common precondition>

  # -----------------------------------------------------------------
  # Scenario 1
  # -----------------------------------------------------------------
  Scenario: <Scenario Title>
    Given <precondition>
    When <action>
    Then <expected outcome>

  # -----------------------------------------------------------------
  # Scenario Outline (optional)
  # -----------------------------------------------------------------
  Scenario Outline: <Scenario Outline Title>
    Given <precondition>
    When <action>
    Then <expected outcome>

    Examples:
      | <parameter1> | <parameter2> |
      | <value1>     | <value2>     |
```

**Guidelines**

- Use **Title Case** for feature and scenario titles.
- Tag the feature with business‐relevant tags (e.g., `@ui`, `@smoke`).
- Keep steps **business‑focused**, avoid UI implementation details.
- Do **not** include selectors or technical terms.
- Add a **Background** only when steps are truly common to all scenarios.
- Place a blank line between scenarios for readability.
- Follow the project's `.clinerules/cucumber.md` and `.clinerules/naming-conventions.md`.

**Usage**
The orchestrator copies this file to `tests/<feature-name>.feature` and substitutes the placeholders (`<...>`) with concrete values before invoking the Feature Generator agent.
