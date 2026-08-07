# GitHub Actions Skill

## Purpose

Provide ready‑to‑use GitHub Actions workflow snippets, scripts, and best‑practice guidance for CI/CD pipelines that build, lint, test, and report the Playwright automation framework, complying with `.clinerules/git-workflow.md` and Cline’s DevOps standards.

## Examples

- **Main CI Workflow**

  ```yaml
  # .github/workflows/ci.yml
  name: CI

  on:
    push:
      branches: [main, develop]
    pull_request:
      branches: [main, develop]

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Setup Node
          uses: actions/setup-node@v4
          with:
            node-version: '20'
            cache: 'npm'

        - name: Install dependencies
          run: npm ci

        - name: Lint
          run: npm run lint

        - name: Type Check
          run: npx tsc --noEmit

        - name: Playwright Tests
          run: npx playwright test --reporter=line

        - name: Generate Allure Report
          if: always()
          run: |
            npx allure generate allure-results --clean -o allure-report
            npx allure open --port 5252 &
          continue-on-error: true

        - name: Upload Artifacts
          if: failure()
          uses: actions/upload-artifact@v4
          with:
            name: test-artifacts
            path: |
              playwright-report/
              allure-results/
              screenshots/
              videos/
  ```

- **Release Workflow**

  ```yaml
  name: Release

  on:
    push:
      tags:
        - 'v*.*.*'

  jobs:
    release:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Setup Node
          uses: actions/setup-node@v4
          with:
            node-version: '20'
            cache: 'npm'

        - run: npm ci
        - run: npm run build
        - run: npm publish
          env:
            NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
  ```

- **Dependency Audit Job**
  ```yaml
  name: Security Audit

  on:
    schedule:
      - cron: '0 3 * * 0' # every Sunday at 03:00 UTC

  jobs:
    audit:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Setup Node
          uses: actions/setup-node@v4
          with:
            node-version: '20'
        - run: npm ci
        - run: npm run audit
  ```

## Reusable Prompts

1. **Add CI Pipeline**

   ```
   Insert a GitHub Actions workflow that runs lint, type‑check, Playwright tests, and generates an Allure report, uploading artifacts on failure.
   ```

2. **Create Release Workflow**

   ```
   Provide a workflow that triggers on semantic version tags, builds the project, and publishes it to npm using a secured token.
   ```

3. **Configure Security Audit**
   ```
   Add a scheduled GitHub Actions job that runs `npm run audit` weekly and fails the build on high‑severity findings.
   ```

## Best Practices

- Pin action versions (`@v4`) to avoid breaking changes.
- Cache `node_modules` using the built‑in `setup-node` cache for faster builds.
- Separate **build**, **test**, and **release** jobs; use dependencies (`needs`) to enforce order.
- Always upload **test artifacts** (screenshots, videos, Allure results) on failure for debugging.
- Store secrets (e.g., `NPM_TOKEN`) in GitHub **encrypted secrets**; never hard‑code them.
- Fail the pipeline on lint or type‑check errors; use `continue-on-error` only for optional steps like opening Allure UI.

## Validation

- The workflow files must be valid YAML and pass GitHub’s workflow validation (no syntax errors).
- Running `act` locally (or a GitHub Actions runner) should execute all steps without unexpected failures.
- All npm scripts referenced (`lint`, `audit`, `build`, etc.) must exist in `package.json`.

## Anti‑patterns

- Using `latest` tags for actions, which can introduce breaking changes.
- Ignoring security audit failures (`continue-on-error: true` on audit step).
- Committing generated reports (`allure-results/`) to the repository.

## Limitations

- This skill does not manage environment provisioning (e.g., Docker containers, cloud services); those can be added via additional workflow steps or separate DevOps agents.
