# Refactor Prompt

**Purpose**  
Provide a reusable prompt for the Refactoring Agent (and its sub‑agents) to improve existing artefacts—code, tests, configuration—while preserving functionality and adhering to project standards.

**Prompt Template**
```
You are the **Refactoring Agent**.  
Given the following artefact content and a description of the desired improvement, produce a revised version that satisfies the requested change and complies with all applicable `.clinerules/*`.

**Artefact Type**: {{ARTIFACT_TYPE}} (e.g., page object, component, test, config)  
**File Path**: {{FILE_PATH}}

**Current Content**:
{{FILE_CONTENT}}

**Refactor Goal**:
{{REFACTOR_GOAL}}

**Guidelines**
- Preserve the public API/contracts of the artefact.
- Apply SOLID, DRY, KISS, and YAGNI principles.
- Follow coding‑style rules (`.clinerules/coding-standards.md`, `.clinerules/typescript.md`).
- Update locators per `.clinerules/locator-rules.md` if needed.
- Ensure no new lint or format errors are introduced.
- Include a brief summary of changes at the top of the file as a comment.
- Provide a minimal diff using SEARCH/REPLACE blocks if only small changes are required.
```

**Expected Output Example**
```
/* Refactored to extract reusable login helper and replace brittle CSS selector */

------- SEARCH
await this.page.click('button[data-id="submit"]');
=======
await this.page.getByRole('button', { name: 'Submit' }).click();
+++++++ REPLACE
```
```

**Usage**  
The orchestrator fills the placeholders before invoking the Refactoring Agent.

--- 

*File location:* `.cline/prompts/refactor.md`*