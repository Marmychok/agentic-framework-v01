# Prompt: generate-readme-template.md

**Goal**  
Guide the agents to create a comprehensive README template for a Cline‑based automation project.

**Prompt**
```
Produce a Markdown README template that includes sections for:

- Project title and description
- Table of contents
- Getting started (high‑level workflow overview)
- Prerequisites (Node.js, npm/yarn, Git, VS Code)
- Installation steps
- Running Playwright tests and generating Allure reports
- Using Cline agents to generate artefacts (features, page objects, components, etc.)
- CI/CD pipeline summary (GitHub Actions)
- Contribution guidelines (fork, branch, human‑approval process)
- License information

Insert placeholders (`<...>`) where project‑specific values should be filled in (e.g., `<repository-url>`, `<project-folder>`). Ensure the template adheres to `.clinerules/markdown.md` if it exists, otherwise follow the project's coding‑standard rules. Provide the complete content as a fenced code block with `markdown` language.
```

**Usage**  
The orchestrator calls this prompt when a new README is required; the generated content is written to `.cline/templates/readme.md` (or directly to `README.md` at the repo root).