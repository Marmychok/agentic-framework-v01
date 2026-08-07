# Security Skill

## Purpose
Provide reusable utilities, guidelines, and code snippets for handling secrets, environment variables, input validation, and secure coding practices within the automation framework, in accordance with `.clinerules/security.md` and the overall Cline security standards.

## Examples
- **Environment Variable Loader**
  ```typescript
  // utils/env.ts
  import * as dotenv from 'dotenv';
  dotenv.config();

  export const getEnv = (key: string, fallback?: string): string => {
    const value = process.env[key] ?? fallback;
    if (value === undefined) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
  };
  ```

- **Input Validation with Zod**
  ```typescript
  import { z } from 'zod';

  export const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
  });

  // Usage in a step definition
  const parsed = userSchema.parse(rawUserData);
  ```

- **Secret Masking Logger**
  ```typescript
  // utils/logger.ts (extends logging skill)
  const maskSecrets = (obj: unknown): unknown => {
    const secretKeys = ['password', 'apiKey', 'token', 'secret'];
    if (Array.isArray(obj)) return obj.map(maskSecrets);
    if (obj && typeof obj === 'object') {
      const result: any = {};
      for (const [k, v] of Object.entries(obj as any)) {
        result[k] = secretKeys.includes(k) ? '***REDACTED***' : maskSecrets(v);
      }
      return result;
    }
    return obj;
  };

  export const secureLog = {
    info: (msg: string, meta?: unknown) => log.info(msg, maskSecrets(meta)),
    warn: (msg: string, meta?: unknown) => log.warn(msg, maskSecrets(meta)),
    error: (msg: string, meta?: unknown) => log.error(msg, maskSecrets(meta)),
    debug: (msg: string, meta?: unknown) => log.debug(msg, maskSecrets(meta)),
  };
  ```

- **Dependency Audit Script**
  ```json
  // package.json script
  {
    "scripts": {
      "audit": "npm audit && npm audit fix --force"
    }
  }
  ```

## Reusable Prompts
1. **Create Env Loader**
   ```
   Generate a TypeScript utility that loads .env variables, validates required keys, and throws a clear error if any are missing.
   ```

2. **Add Input Validation**
   ```
   Provide a Zod schema for the <Entity> data structure and demonstrate how to parse incoming test data safely.
   ```

3. **Integrate Secret‑Masking Logger**
   ```
   Extend the existing logging utility to automatically mask fields named password, apiKey, token, or secret in all logged objects.
   ```

4. **Setup Dependency Audit**
   ```
   Add an npm script named "audit" that runs npm audit and attempts to fix vulnerable dependencies, failing the CI job on unresolved high‑severity issues.
   ```

## Best Practices
- Store all secrets in a `.env` file that is listed in `.gitignore`.
- Never commit secrets; use `git‑secret` or similar tools if needed for encrypted storage.
- Validate all external inputs (e.g., fixture data, API responses) using a schema library such as **Zod** or **io‑ts**.
- Use the `secureLog` wrapper for any logging that may contain sensitive data.
- Run `npm audit` as part of the CI pipeline and treat any high‑severity findings as build‑breaking.
- Keep secret‑related code isolated from business logic; inject values via dependency injection where possible.

## Validation
- The environment loader must throw an error when a required variable is missing.
- All Zod schemas must compile and correctly reject invalid data.
- `secureLog` must produce JSON logs with secret fields replaced by `***REDACTED***`.
- The `npm run audit` script must exit with a non‑zero status on unresolved high‑severity vulnerabilities.

## Anti‑patterns
- Hard‑coding secrets directly in source files.
- Logging raw request/response bodies that contain passwords or tokens.
- Using `any` for input data without validation.
- Disabling `npm audit` or ignoring its output.

## Limitations
- This skill does not provide secret management integrations (e.g., HashiCorp Vault, AWS Secrets Manager). Those can be added via separate DevOps agents if required.