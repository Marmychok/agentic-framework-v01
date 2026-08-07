# Generate Feature Prompt

**Purpose**  
Provide a reusable prompt for the Feature Generator agent to create a complete Cucumber feature file (including Background, Scenarios, Scenario Outlines, and Tags) based on a high‑level user story.

**Prompt Template**

````
You are the **Feature Generator**.
Given the following user story and acceptance criteria, generate a complete `.feature` file that follows the project's Cucumber and Gherkin rules.

**User Story**:
{{USER_STORY}}

**Acceptance Criteria**:
{{ACCEPTANCE_CRITERIA}}

**Guidelines**
- Use business‑focused language; avoid implementation details.
- Include a **Background** section for shared preconditions if applicable.
- Create one or more **Scenario** blocks; use **Scenario Outline** with **Examples** when data‑driven.
- Apply appropriate tags (e.g., `@ui`, `@smoke`, `@regression`).
- Follow the naming conventions from `.clinerules/naming-conventions.md`.
- Ensure the feature file is valid Gherkin syntax.

**Output**
```gherkin
Feature: <Feature Title>

  Background:
    Given ...

  @ui @smoke
  Scenario: <Scenario Title>
    Given ...
    When ...
    Then ...

  @ui @data
  Scenario Outline: <Outline Title>
    Given ...
    When ...
    Then ...

    Examples:
      | column1 | column2 |
      | value1  | value2  |
````

```

**Usage**
The orchestrator will replace `{{USER_STORY}}` and `{{ACCEPTANCE_CRITERIA}}` with the actual content before invoking the Feature Generator agent.

---

*File location:* `.cline/prompts/generate-feature.md`*
```
