# Generate Report Prompt

**Purpose**  
Provide a reusable prompt for the Reporting Agent to assemble Allure test reports, Playwright traces, screenshots, and execution summaries into a comprehensive artifact for CI/CD and stakeholder review.

**Prompt Template**
```
You are the **Reporting Agent**.  
Based on the completed test run data, generate an Allure report package and a concise markdown summary.

**Test Run Outputs**:
- Playwright HTML report directory: {{PLAYWRIGHT_REPORT_DIR}}
- Allure results directory: {{ALLURE_RESULTS_DIR}}
- Execution logs: {{EXECUTION_LOGS_PATH}}
- Any failure screenshots or traces: {{ARTIFACTS_PATHS}}

**Guidelines**
- Invoke the appropriate CLI commands (`npm run allure:generate`, `npm run allure:open`, etc.) to produce the HTML report.
- Create a `REPORT_SUMMARY.md` that includes:
  * Total scenarios executed, passed, failed.
  * High‑level failure analysis (e.g., flaky tests, locator errors).
  * Links to detailed Allure report, Playwright trace files, and screenshots.
  * Recommendations for next steps (e.g., investigate flaky tests).
- Ensure the summary adheres to `.clinerules/coding-standards.md` for markdown formatting.
- Store the generated HTML report under `reports/allure/<timestamp>/` and the summary at the project root.
- Include a checklist for human approval before publishing the report.
```

**Expected Output Example**
```markdown
# Test Execution Summary – 2026‑08‑06 18:00 UTC

- **Scenarios Executed**: 124
- **Passed**: 118
- **Failed**: 6
- **Flaky**: 2

## Failure Highlights
1. **LoginPage.submit** – Timeout waiting for URL `**/dashboard**` (see `playwright-traces/login-failure.zip`).
2. **NavbarComponent.logout** – Selector `button[data-id="logout"]` is brittle (see `screenshots/logout-brittle.png`).

## Links
- Allure Report: `reports/allure/20260806_1800/index.html`
- Playwright Trace Archive: `artifacts/traces.zip`
- Screenshots Archive: `artifacts/screenshots.zip`

## Recommendations
- Refactor the brittle selector in `NavbarComponent`.
- Add explicit waits for dashboard navigation.

## Approval Checklist
- [ ] Verify failure analysis.
- [ ] Confirm all artifacts are attached.
- [ ] Approve publishing the Allure report.
```
```

**Usage**  
The orchestrator fills in the placeholders with actual paths after a test run and invokes the Reporting Agent.

--- 

*File location:* `.cline/prompts/generate-report.md`*