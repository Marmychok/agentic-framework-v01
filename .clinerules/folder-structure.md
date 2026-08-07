# Folder Structure Guidelines

## Top‑Level Layout

```
project/
├── .cline/                     # Agent and skill definitions
│   ├── agents/                 # Major agents (markdown)
│   ├── skills/                 # Reusable skill libraries
│   └── templates/              # Template files for generation
├── .clinerules/                # Architectural and coding rules
│   ├── architecture.md
│   ├── coding-standards.md
│   ├── typescript.md
│   ├── playwright.md
│   ├── cucumber.md
│   ├── locator-rules.md
│   ├── page-object-model.md
│   ├── component-model.md
│   ├── naming-conventions.md
│   ├── folder-structure.md
│   ├── review-checklist.md
│   ├── git-workflow.md
│   ├── human-approval.md
│   └── security.md
├── src/                        # Application source code (if any)
│   ├── pages/                  # Page Object implementations
│   ├── components/             # Component Object implementations
│   ├── tests/                  # Playwright test files (specs)
│   └── fixtures/               # Test data and fixtures
├── tests/                      # Cucumber feature files
│   └── *.feature
├── steps/                      # Step definition files
│   └── *.ts
├── .env                        # Environment variables (git‑ignored)
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── jest.config.ts (or vitest.config.ts) # Unit test config
├── playwright.config.ts        # Playwright configuration
├── cucumber.js                 # Cucumber configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Project overview and setup instructions
```

## Guidelines

- **Keep all automation artefacts** (`pages`, `components`, `tests`, `steps`, `fixtures`) under the `src/` tree.
- **Feature files** live in a dedicated `tests/` directory separate from Playwright spec files.
- **Agent definitions** (`.cline/agents`) are markdown files describing each agent’s purpose and contract.
- **Skills** (`.cline/skills`) are reusable code snippets, prompts, and utilities.
- **Templates** (`.cline/templates`) provide scaffolding for generated artefacts (features, page objects, etc.).
- **Configuration files** (ESLint, Prettier, Playwright, Cucumber) sit at the project root for tooling visibility.

## Maintenance

- When adding a new major agent or capability, create a matching folder under `.cline/agents` and corresponding skill/template entries.
- Keep the folder structure aligned with the **Architecture Overview** in `.clinerules/architecture.md`.
- Regularly run lint and format checks to ensure files remain in their intended locations.

## Review Checklist

- [ ] Directory layout matches the diagram above.
- [ ] All automation artefacts are under `src/`.
- [ ] Feature files are placed in `tests/`.
- [ ] Agent and skill definitions reside in `.cline/`.
- [ ] Configuration files are at the project root.
- [ ] No stray files outside the defined structure.
