# Logging Skill

## Purpose
Provide reusable logging utilities and guidelines for consistent, structured logging across the automation framework, complying with the rules in `.clinerules/logging.md` (if present) and general Cline standards.

## Examples
- **Simple Logger Wrapper**
  ```typescript
  import { createLogger, format, transports } from 'winston';

  const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    transports: [new transports.Console()],
  });

  export const log = {
    info: (msg: string, meta?: unknown) => logger.info(msg, meta),
    warn: (msg: string, meta?: unknown) => logger.warn(msg, meta),
    error: (msg: string, meta?: unknown) => logger.error(msg, meta),
    debug: (msg: string, meta?: unknown) => logger.debug(msg, meta),
    trace: (msg: string, meta?: unknown) => logger.verbose(msg, meta),
  };
  ```

- **Playwright Test Logger Integration**
  ```typescript
  import { test as base } from '@playwright/test';
  import { log } from '../../utils/logger';

  export const test = base.extend({
    // Example of adding a logger to each test
    page: async ({ page }, use) => {
      log.info('Starting new test with page %s', page.url());
      await use(page);
      log.info('Test finished');
    },
  });
  ```

## Reusable Prompts
1. **Generate Logger**
   ```
   Create a TypeScript logger utility that supports levels INFO, WARN, ERROR, DEBUG, TRACE and respects LOG_LEVEL environment variable.
   ```

2. **Add Logging to Agent**
   ```
   Insert logging statements into the <AgentName> agent at the start and end of each major method, using the logger utility.
   ```

3. **Configure Logging in CI**
   ```
   Provide a configuration snippet for GitHub Actions to capture and upload logs as artifacts.
   ```

## Best Practices
- Use a single logger instance per process and import it where needed.
- Log at appropriate levels: `info` for high‑level flow, `debug` for detailed execution, `trace`/`verbose` for very fine‑grained data.
- Never log secrets or sensitive data; mask them if necessary.
- Structure logs as JSON to enable easy parsing and integration with log aggregation tools.
- Include contextual metadata (e.g., test name, scenario ID) in each log entry.
- Ensure logging does not impact test performance; avoid excessive synchronous I/O.

## Validation
- The logger module must compile (`tsc`) and pass `npm run lint`.
- No secret values should appear in the source code.
- In CI, logs should be collected without causing job failures.
- When executed, the logger should output valid JSON lines to stdout.

## Anti‑patterns
- Logging entire objects that contain passwords or tokens.
- Using `console.log` directly in production code; always go through the logger wrapper.
- Over‑logging in tight loops, which can degrade performance.
- Ignoring the `LOG_LEVEL` environment variable.

## Limitations
- This skill provides only the logger utility and usage guidelines; it does not configure external log aggregation services (e.g., ELK, Datadog). Those integrations should be added via separate DevOps agents if required.