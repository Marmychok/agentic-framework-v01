# Debugging Skill

## Purpose

Provide reusable debugging utilities, patterns, and guidelines for troubleshooting Playwright tests, TypeScript code, and AI‑agent workflows, adhering to the standards in `.clinerules/debugging.md` (if present) and general Cline best practices.

## Examples

- **Playwright Trace Helper**

  ```typescript
  import { Page, test } from '@playwright/test';

  export const enableTrace = test.extend({
    // Enable trace for every test
    context: async ({ context }, use) => {
      await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
      await use(context);
      await context.tracing.stop({ path: `traces/${Date.now()}.zip` });
    },
  });
  ```

- **Error Wrapper for Agent Calls**

  ```typescript
  export class AgentError extends Error {
    constructor(
      message: string,
      public readonly cause?: unknown,
    ) {
      super(message);
      this.name = 'AgentError';
    }
  }

  export const safeExecute = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      // Log and re‑throw a standardized error
      log.error('Agent execution failed: %s', err);
      throw new AgentError('Agent operation failed', err);
    }
  };
  ```

- **Node.js Inspector Launch Script**
  ```json
  // package.json script
  {
    "scripts": {
      "debug": "node --inspect-brk ./dist/orchestrator.js"
    }
  }
  ```

## Reusable Prompts

1. **Generate Debug Trace**

   ```
   Add Playwright tracing to the <AgentName> test suite, ensuring screenshots, snapshots, and source files are captured.
   ```

2. **Create Error Handling Wrapper**

   ```
   Provide a TypeScript utility that wraps any async function and logs errors with stack traces, returning a standardized error object.
   ```

3. **Add Debug Logging to Agent**
   ```
   Insert debug‑level log statements before and after each major step in the <AgentName> agent using the logging skill.
   ```

## Best Practices

- Enable Playwright tracing only for failing tests or when a debugging flag is set to avoid performance overhead.
- Use structured error classes (`AgentError`, `FrameworkError`) to convey context.
- Keep debugging utilities separate from production code; guard them with environment checks (`process.env.NODE_ENV !== 'production'`).
- Do not leave `console.log` or `debugger` statements in committed code; replace them with the logger utility at appropriate levels.
- Capture and store trace artifacts as CI artifacts for later analysis.

## Validation

- The trace helper must start and stop tracing without errors and produce a `.zip` file.
- Error wrappers must preserve the original stack trace and be type‑safe (`AgentError` extends `Error`).
- All new code must pass `npm run lint` and `npm run format`.

## Anti‑patterns

- Leaving tracing enabled for every test in CI, causing large artifact sizes.
- Swallowing errors without re‑throwing or logging them.
- Using `debugger` statements in production branches.

## Limitations

- This skill does not provide remote debugging configuration (e.g., VS Code launch configs); those can be added via a separate DevOps or tooling agent if required.
