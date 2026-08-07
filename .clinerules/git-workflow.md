# Git Workflow

## Branching Model
- **main** – Production‑ready code. Protected; only merge via Pull Requests after approval.
- **develop** – Integration branch for features ready for testing.
- **feature/<name>** – Feature branches for new functionality.
- **bugfix/<name>** – Bug‑fix branches.
- **release/<version>** – Release preparation branches.
- **hotfix/<name>** – Emergency fixes directly on `main`.

## Pull Request Process
1. **Create PR** from `feature/*` (or other) into `develop`.
2. **Automatic checks** run: lint, build, Playwright tests, Allure report generation.
3. **Human Approval** required (see `human-approval.md`).
4. **Merge** into `develop` after approval and passing checks.
5. Periodically **merge `develop` into `main`** via a release PR; tag the release.

## Commit Message Convention
- Follow **Conventional Commits** (see `coding-standards.md`):
  - `feat(scope): description`
  - `fix(scope): description`
  - `refactor(scope): description`
  - `test(scope): description`
  - `chore(scope): description`
  - `docs(scope): description`
- Include ticket/issue reference if applicable.

## Tags
- Use semantic version tags on `main` (e.g., `v1.2.3`).
- Feature tags can be added to PRs for release notes.

## CI/CD Integration
- GitHub Actions automatically trigger on PR open, push, and merge.
- Lint, test, and reporting steps must pass before merge is allowed.
- Artifacts (Allure reports, traces, videos) are uploaded for each run.

## Rebase vs Merge
- Prefer **rebase** for feature branches to maintain a clean linear history before opening a PR.
- Use **merge commits** only for release branches to preserve release history.

## Review Checklist
- [ ] Branch follows naming convention (`feature/*`, `bugfix/*`, etc.).
- [ ] Commits follow Conventional Commits format.
- [ ] PR description includes a summary and related tickets.
- [ ] All automated checks pass.
- [ ] Human approval obtained before merge.
- [ ] No secret files are committed.