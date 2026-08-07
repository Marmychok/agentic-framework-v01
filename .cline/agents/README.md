# Agents Usage Guide

## Overview
The Cline automation platform is built around **AI agents** that each own a single responsibility.  
Agents live in the `.cline/agents/` directory as markdown files describing:

- **Name** – the agent’s identifier.  
- **Mission** – high‑level purpose.  
- **Responsibilities** – what the agent does.  
- **Inputs / Outputs** – data contracts (JSON) used to communicate with other agents.  
- **Dependencies** – other agents or skills it relies on.  
- **Workflow** – step‑by‑step execution flow.  
- **Human‑Approval Rules** – when a STOP/CONTINUE gate is required.

The **Master Orchestrator** (`orchestrator.md`) receives user requests, selects the appropriate agents, validates outputs, and enforces human‑approval checkpoints before proceeding.

## Invoking Agents
Agents are normally triggered through the **Cline CLI** (or VS Code extension) which talks to the orchestrator. The generic command pattern is:

```bash
cline <action> [options]
```

Common actions:

| Action | Description |
|--------|-------------|
| `cline generate feature` | Starts the **Feature Generator** workflow (creates a feature file, scenarios, tags, etc.). |
| `cline generate page` | Scaffolds a new **Page Object** using the `page-object.md` template. |
| `cline generate component` | Scaffolds a **Component Object**. |
| `cline run <agent-name>` | Directly runs a specific agent (useful for debugging). |
| `cline orchestrate <request>` | Sends a free‑form request to the Master Orchestrator which routes it to the appropriate agents. |

All commands respect the **Human Approval** process defined in `.clinerules/human-approval.md`. After a major step (e.g., generating a feature file or modifying source code) the orchestrator pauses and prompts the user to **Approve** or **Reject** the artefact.

## Example Workflow
```bash
# 1️⃣ Plan
cline generate feature   # Planner → Requirement → Story Analyzer → Acceptance Criteria

# ⏸️ Human approval
# (review the generated .md files, then approve)

# 2️⃣ Generate artefacts
cline generate page      # Page Object Generator creates src/pages/<name>.page.ts
cline generate component # Component Generator creates src/components/<name>.component.ts

# ⏸️ Human approval for each artefact

# 3️⃣ Review & Test
cline run review-agent   # Runs static analysis, linting, and rule checks
cline run execution-agent # Executes Playwright tests, produces Allure report

# ⏸️ Human approval before committing
```

## Where to Find Agent Documentation
Each agent’s markdown file includes detailed specifications. For example:

- `.cline/agents/page-object-generator.md`
- `.cline/agents/component-generator.md`
- `.cline/agents/locator-generator.md`

Read them to understand required inputs (e.g., page name, component name) and optional flags.

## Adding a New Agent
1. **Create** a markdown file under `.cline/agents/` following the same structure.  
2. **Implement** any required skill scripts under `.cline/skills/` (optional – many agents are purely declarative).  
3. **Register** the agent in the orchestrator’s routing table (see `orchestrator.md`).  
4. **Update** the human‑approval checklist if the new agent performs a major action.

## Best Practices
- **Never bypass human approval** for code‑generating agents; always let the STOP → APPROVE → CONTINUE cycle run.  
- Keep agents **stateless** – rely on inputs/outputs rather than shared mutable state.  
- Follow the project’s coding standards (`.clinerules/coding-standards.md`) when writing agent logic or prompts.  
- Use the provided **prompts** (e.g., `generate-page.md`) to keep language consistent across agents.

## Troubleshooting
- **Missing module errors** – ensure you have run `npm ci` and that the orchestrator’s environment has the required dependencies.  
- **Agent fails validation** – check the agent’s `Inputs`/`Outputs` contract against the JSON passed by the orchestrator.  
- **Human‑approval loop never ends** – confirm that the agent’s `Human Approval Rules` section correctly specifies `STOP` points and that the orchestrator is receiving the approval response.

---

*This guide is part of the Cline Automation Framework. Keep it up‑to‑date as new agents are added or existing ones are refactored.*