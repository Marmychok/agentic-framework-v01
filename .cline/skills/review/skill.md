# Review Skill

## Purpose
Offer reusable checklists, helper functions, and guidelines for performing code reviews of the automation framework, ensuring compliance with `.clinerules/review-checklist.md`, `.clinerules/coding-standards.md`, and Cline’s quality gates.

## Examples
- **Automated Lint & Formatting Check**
  ```bash
  # scripts/lint-and-format.sh
  #!/bin/bash
  set -e
  echo "Running ESLint..."
  npm run lint
  echo "Running Prettier..."
  npm run format
  ```

- **Static Analysis Helper**
  ```typescript
  // utils/static-analysis.ts
  import { execSync } from 'child_process';

  export const runTsc = () => {
    try {
      execSync('npx tsc --noEmit', { stdio: 'inherit' });
    } catch (err) {
      throw new Error('TypeScript compilation errors detected.');
    }
  };
  ```

- **Review Checklist Markdown**
  ```markdown
  ## Review Checklist

  - [ ] Lint passes (`npm run lint`)
  - [ ] Prettier formatting applied (`npm run format`)
  - [ ] No `any` types (`tsc --noEmit` passes)
  - [ ] All locators follow priority rules (`.clinerules/locator-rules.md`)
  - [ ] No brittle selectors (`nth-child`) in code
  - [ ] No assertions inside Page or Component Objects
  - [ ] All steps have matching step definitions
  - [ ] All new APIs have Zod validation
  - [ ] No secrets committed (`git grep -i password` yields nothing)
  - [ ] All newly added tests have Allure labels (`feature`, `story`, `severity`)
  - [ ] Documentation updated (README, architecture, changelog)
  ```

## Reusable Prompts
1. **Run Automated Review**
   ```
   Execute the lint-and-format script, then run the static analysis helper to ensure the codebase passes lint, format, and type‑check stages.
   ```

2. **Generate Review Checklist**
   ```
   Produce a markdown checklist covering lint, formatting, type safety, locator priority, assertion placement, step definition coverage, security, and documentation updates.
   ```

3. **Add Review Section to PR**
   ```
   Insert a "Review Checklist" section into the pull request description template, referencing the generated checklist markdown.
   ```

## Best Practices
- Run the **Automated Review** step as a pre‑commit hook (via Husky) and as part of the CI pipeline.
- Keep the checklist **version‑controlled** in `.clinerules/review-checklist.md` and reference it in PR templates.
- Encourage reviewers to tick each item before approving; any unchecked item blocks the **Human Approval** gate.
- Use the **static‑analysis** helper to surface TypeScript compile errors early.
- Ensure that any new dependencies are added to `package.json` and that `npm audit` passes.

## Validation
- The `lint-and-format.sh` script must exit with status `0` when lint and Prettier succeed.
- `runTsc()` must throw an error if `tsc --noEmit` reports any problems.
- The generated checklist must be up‑to‑date with the current `.clinerules` files.

## Anti‑patterns
- Skipping the review checklist because “the code looks fine”.
- Manually editing the checklist in PRs without updating the source `.clinerules/review-checklist.md`.
- Allowing `any` types or disabling lint rules in new code.

## Limitations
- This skill does not perform semantic code review (e.g., design critiques) – those are handled by human reviewers and the **Human Approval Agent**.
- Automated security scanning beyond `npm audit` (e.g., SAST tools) is out of scope for this skill but can be added via additional DevOps agents.