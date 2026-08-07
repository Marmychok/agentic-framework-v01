# Architecture Overview

## Agentic Automation Platform for Cline

The platform follows an **Agentic Architecture** where each AI agent owns a **single responsibility**. Agents communicate through well‑defined contracts, enabling modularity, scalability, and maintainability. The design adheres to **SOLID**, **DRY**, **KISS**, and **YAGNI** principles, ensuring enterprise‑grade quality.

### Core Principles
- **Single Responsibility:** Every agent (including sub‑agents) performs one distinct task.
- **Composition Over Inheritance:** Agents are composed to build complex workflows.
- **Loose Coupling:** Inter‑agent communication occurs via simple data exchange (JSON) and validation contracts.
- **Extensibility:** New agents or capabilities can be added without impacting existing ones.

### High‑Level Layers
1. **Orchestrator Layer** – The **Master Agent** coordinates requests, selects appropriate agents, validates outputs, and enforces human‑approval checkpoints.
2. **Domain Layer** – Contains **Major Agents** (Planner, Requirement, Feature Generator, Page Object Generator, Locator Generator, etc.) each encapsulating a specific domain of the test‑automation lifecycle.
3. **Sub‑Agent Layer** – Specialized workers under each Major Agent (e.g., *Requirement Reader*, *Risk Analyzer*, *Accessibility Locator*). They generate granular artefacts.
4. **Skill Layer** – Reusable, language‑agnostic capabilities located in `.cline/skills/` (Playwright, TypeScript, Cucumber, etc.) that agents invoke to produce code snippets, prompts, or validation logic.
5. **Rules Layer** – `.clinerules/` stores all architectural, coding‑standard, and domain‑specific rule documents governing the platform.
6. **Infrastructure Layer** – GitHub Actions, Allure reporting, logging, and CI/CD pipelines defined under `.clinerules/` and consumed by the **GitHub Actions Agent**.

### Human‑Approval Gates
Every major action (e.g., feature generation, page‑object creation, code refactoring) is wrapped with a **STOP → Human Approval → CONTINUE** checkpoint. The orchestrator enforces these gates using the **Human Approval Agent**.

### Data Flow Example
```
User Request → Master Orchestrator
   ↓
Planner Agent (with sub‑agents) → generates high‑level plan
   ↓
Human Approval
   ↓
Feature Generator → Scenario Generator → Page Object Generator → Component Generator → Locator Generator → Step Definition Generator
   ↓
Human Approval (after each stage)
   ↓
Review Agent → Execution Agent → Reporting Agent
   ↓
Human Approval → Commit & Push (GitHub Actions Agent)
```

### Extensibility Path
To add a new capability (e.g., API testing), create:
- A **new Major Agent** (e.g., API Helper Agent) with its own sub‑agents.
- Corresponding **skills** under `.cline/skills/api/`.
- Update **rules** in `.clinerules/` as needed.
- Register the agent in the **Orchestrator’s routing table**.

---

## Task Progress Checklist
- [ ] Generate architecture document (this step)  
- [ ] Generate `.clinerules/` files (coding standards, etc.)  
- [ ] Generate `.cline/skills/` definitions  
- [ ] Generate agents markdown files  
- [ ] Generate sub‑agents markdown files  
- [ ] Generate prompts markdown files  
- [ ] Generate templates markdown files  
- [ ] Generate Playwright framework skeleton  
- [ ] Generate sample project using the framework  
- [ ] Generate documentation