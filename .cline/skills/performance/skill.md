# Performance Skill

## Purpose
Offer reusable utilities, patterns, and guidelines for measuring and improving the performance of Playwright test suites, TypeScript code, and AI‑agent workflows, in line with the standards defined in `.clinerules/performance.md` (if present) and the overall Cline quality guidelines.

## Examples
- **Playwright Test Timeout Configuration**
  ```typescript
  // playwright.config.ts
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    timeout: 30_000, // global test timeout of 30 seconds
    expect: {
      timeout: 5_000, // maximum time for expect() statements
    },
    // Limit parallelism to avoid resource contention
    workers: process.env.CI ? 2 : undefined,
  });
  ```

- **Custom Slow Test Reporter**
  ```typescript
  // reporters/slow-test-reporter.ts
  import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

  export default class SlowTestReporter implements Reporter {
    onTestEnd(test: TestCase, result: TestResult) {
      const duration = result.duration;
      if (duration > 10_000) {
        console.warn(`⚠️ Slow test: ${test.title} took ${duration}ms`);
      }
    }
  }
  ```

- **Node.js CPU/Memory Profiling Helper**
  ```typescript
  import { execSync } from 'child_process';
  import { writeFileSync } from 'fs';

  export const profile = (script: string, output: string) => {
    const pid = execSync(`pgrep -f "${script}"`).toString().trim();
    execSync(`perf record -p ${pid} -g -- sleep 5`);
    execSync(`perf script > ${output}`);
  };
  ```

## Reusable Prompts
1. **Configure Test Timeout**
   ```
   Update the Playwright configuration to set a global test timeout of <ms> ms and an expect timeout of <ms> ms, while limiting parallel workers for CI environments.
   ```

2. **Add Slow Test Reporter**
   ```
   Create a custom Playwright reporter that logs any test whose execution time exceeds <threshold> ms, and integrate it into playwright.config.ts.
   ```

3. **Generate Profiling Script**
   ```
   Provide a Node.js utility that records CPU and memory usage for a given script and outputs a perf report to a specified file.
   ```

## Best Practices
- Keep test execution times short; aim for an average of <5 seconds per test.
- Use `workers` wisely: limit parallelism in CI to avoid flaky tests due to resource contention.
- Prefer `await expect(...).toBeVisible({ timeout: 2000 })` over longer waits.
- Leverage Playwright’s built‑in tracing only for failing tests to reduce overhead.
- Monitor CI pipeline duration; set performance budgets and fail the build if exceeded.
- Cache heavy fixtures (e.g., large datasets) between tests when possible.

## Validation
- Run `npx playwright test --reporter=line` and ensure the total suite duration respects the performance budget defined in `.clinerules/performance.md`.
- The custom reporter must output warnings for any test exceeding the configured threshold.
- Profiling utilities should produce a non‑empty report file without crashing.
- All new code must pass `npm run lint` and `npm run format`.

## Anti‑patterns
- Setting excessively high global timeouts to mask slow tests.
- Enabling tracing for every test in CI, leading to large artifact sizes and slowed builds.
- Using synchronous blocking loops (`while`, `for`) for waiting; rely on Playwright’s auto‑waiting instead.
- Ignoring performance regression warnings in CI logs.

## Limitations
- This skill provides only in‑process profiling helpers and Playwright configuration tips; it does not perform load‑testing of the application under test. For load testing, use dedicated tools (e.g., k6, Gatling) integrated via separate agents.