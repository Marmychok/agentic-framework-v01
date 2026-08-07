# Scenario Outline Template

**Purpose**  
Provide a reusable Gherkin scenario outline that can be used when a scenario needs to be executed with multiple data sets.

**Template**
```gherkin
Scenario Outline: <Scenario Outline Title>
  Given <precondition>
  When <action>
  Then <expected outcome>

  Examples:
    | <parameter1> | <parameter2> | <parameter3> |
    | <value1a>    | <value2a>    | <value3a>    |
    | <value1b>    | <value2b>    | <value3b>    |
```

**Guidelines**
- Title case the outline title.
- Keep steps **business‑focused**; avoid UI selectors or technical details.
- List only the parameters that vary between examples.
- Ensure the `Examples` table follows the `.clinerules/cucumber.md` formatting rules.
- Replace placeholder brackets (`<...>`) with concrete values before committing.

**Usage**  
The orchestrator can insert this snippet into a `.feature` file generated from the Feature Template or add it directly to an existing feature.