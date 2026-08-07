# Human Approval Guidelines

## Principle

Every major action in the automation pipeline must be gated by an explicit **human approval** checkpoint to ensure quality, compliance, and alignment with business goals.

## Approval Flow

1. **STOP** – The orchestrator pauses the workflow before a major step.
2. **Human Review** – The responsible stakeholder reviews the generated artefacts (e.g., feature file, page object, component, locator, test code).
3. **Decision** – The stakeholder either **APPROVES** to continue or **REJECTS** with feedback.
4. **CONTINUE** – Upon approval, the orchestrator proceeds to the next step.

## What Requires Approval

- Generating a new **Feature** (Feature file + scenarios).
- Creating or modifying **Page Objects**.
- Creating or modifying **Component Objects**.
- Generating **Locators** or updating existing ones.
- Generating **Step Definitions**.
- Refactoring code (including moving/renaming files).
- Deleting files or large‑scale removals.
- Running the **Test Suite** (executing Playwright tests).
- **Committing** changes to the repository.
- **Pushing** changes to remote (GitHub).

## Approval Documentation

- Every approval must be recorded in the Pull Request comment thread or an accompanying Markdown file (`approval-log.md`) with:
  - Date and time.
  - Approver name.
  - Artefact(s) approved.
  - Any comments or required follow‑up actions.

## Rejection Handling

- If rejected, the orchestrator provides the feedback to the relevant agent.
- The agent revises the artefact and initiates a new approval cycle.

## Automation Support

- The **Human Approval Agent** manages the STOP/CONTINUE signals.
- Agents expose a `requestApproval` method that returns a boolean based on user response.

## Review Checklist

- [ ] STOP signal emitted before each major step.
- [ ] Approver reviews the artefact in detail.
- [ ] Approval logged with timestamp and reviewer.
- [ ] No step proceeds without explicit approval.
- [ ] Rejection triggers a revision loop.

## Example Workflow Snippet

```
Planner Agent → STOP → Human approves → Feature Generator → STOP → Human approves → Page Object Generator → …
```

## Security & Compliance

- Approvals must be performed by a user with the appropriate role (e.g., QA Lead, Architect).
- All approval logs are stored in the repository (git‑tracked) for auditability.
