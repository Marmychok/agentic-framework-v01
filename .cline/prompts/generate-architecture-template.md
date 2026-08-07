# Prompt: generate-architecture-template.md

**Goal**  
Instruct agents to produce a high‑level architecture markdown file that documents the layers, agents, sub‑agents, skills, templates, prompts, and rules of the Cline automation platform.

**Prompt**
```
Generate a complete Architecture Overview document in Markdown that includes:

1. **Orchestrator Layer** – description of the Master Orchestrator.
2. **Domain Layer** – list all major agents with a one‑sentence purpose.
3. **Sub‑Agent Layer** – for each major agent, list its sub‑agents.
4. **Skills Layer** – enumerate skill groups under `.cline/skills/`.
5. **Templates Layer** – list template files under `.cline/templates/`.
6. **Prompts Layer** – list prompt files under `.cline/prompts/`.
7. **Rules Layer** – list all `.clinerules/` documents.
8. **Infrastructure Layer** – brief note on CI/CD, Allure, Husky, etc.
9. **Data Flow Diagram** – include a Mermaid flowchart illustrating the typical request flow from user → orchestrator → agents → human approval → execution → reporting.

Use placeholders (`<...>`) where project‑specific values may be inserted later. Follow the project’s coding‑standard and naming conventions. Output the content inside a fenced code block with `markdown` language.
```

**Usage**  
The Documentation Agent invokes this prompt when updating `architecture.md` at the repository root.