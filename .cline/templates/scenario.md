# Scenario Template

**Purpose**  
Provide a ready‑to‑use Gherkin scenario snippet that can be inserted into a feature file.

**Template**

```gherkin
Scenario: <Scenario Title>
  Given <precondition>
  When <action>
  Then <expected outcome>
```

**Guidelines**

- Title case the scenario title.
- Keep each step **business‑focused**; avoid UI selectors or implementation details.
- Use the appropriate Gherkin keywords (`Given`, `When`, `Then`, `And`, `But`) as needed.
- Follow the project’s `.clinerules/cucumber.md` and naming conventions.
- Replace the placeholder brackets (`<...>`) with concrete values before committing.

**Usage**  
The orchestrator can copy this snippet into an existing `.feature` file or combine it with the Feature Template.
