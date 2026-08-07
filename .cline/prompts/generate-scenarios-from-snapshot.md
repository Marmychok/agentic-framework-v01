# Prompt: generate-scenarios-from-snapshot.md

**Goal**  
Enable the Cline agents to automatically analyze a live website using the Playwright MCP, capture an accessibility snapshot, and generate BDD scenario files that cover the discovered UI elements.

**Prompt**

```
1. Use the Playwright MCP `browser_snapshot` tool to capture an accessibility snapshot of the target URL.
   - Set `depth` to 2 to get a concise view.
   - Store the snapshot in `snapshot.md` at the repository root.

2. Parse the generated `snapshot.md` to identify interactive elements (buttons, links, inputs, etc.) using the locator priority rules from `.clinerules/locator-rules.md`.

3. For each identified element, generate a Cucumber scenario in a dedicated feature file under `tests/`. Use the existing Feature and Scenario templates (`.cline/templates/feature.md` and `.cline/templates/scenario.md`) with placeholders filled as follows:
   - **Feature Title** – `<PageName> UI Coverage`.
   - **Scenario Title** – `Verify <Element Description> is functional`.
   - **Steps** –
     * Given the user navigates to `<Page URL>`.
     * When the user interacts with the element (e.g., clicks the button, fills the input).
     * Then the expected outcome (e.g., element is visible, navigation occurs, data is saved) is asserted using Playwright `expect`.

4. Write the generated scenarios to `tests/<page-name>.feature`. If the feature file already exists, append new scenarios; otherwise create it using the Feature template.

5. Return a summary JSON listing:
   - `snapshotFile`: path to the snapshot (`snapshot.md`).
   - `featureFile`: path to the generated feature file.
   - `scenariosCreated`: number of scenarios added.
```

**Usage**  
The Documentation or Website‑Analyzer agent calls this prompt after receiving a URL from the user. The agent then invokes the `browser_snapshot` MCP tool, processes the result, and writes/updates the appropriate `.feature` file. This keeps the BDD suite in sync with the actual UI without manual effort.
