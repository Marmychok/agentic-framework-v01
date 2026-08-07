# Security Guidelines

## Secrets Management
- Store all secrets (API keys, passwords, tokens) in a `.env` file at the project root.
- **Never** commit `.env` to version control; add it to `.gitignore`.
- Load secrets via the `dotenv` package (`process.env.VAR_NAME`).

## Input Validation
- Validate all external inputs (e.g., test data from APIs, environment variables) before use.
- Prefer **whitelisting** over blacklisting.
- Use libraries such as `zod` or `io-ts` for schema validation in TypeScript.

## Dependency Management
- Keep dependencies up‑to‑date. Run `npm audit` regularly.
- Use `npm audit fix` or `yarn audit fix` to address vulnerabilities.
- Pin versions in `package.json` (avoid caret `^` for critical security packages).

## Least Privilege
- Run tests and agents with the minimal required permissions.
- For CI/CD, use scoped access tokens with read‑only rights where possible.

## Secure Coding Practices
- Avoid using `eval`, `new Function`, or dynamic code execution.
- Do not expose internal types or implementation details in public APIs.
- Sanitize any data that is interpolated into strings that may be executed (e.g., shell commands).

## Network Security
- When making HTTP requests during tests, enforce HTTPS.
- Validate SSL certificates; do not disable certificate verification.

## Logging
- Do not log secret values. Mask or omit them in logs (`***`).
- Use structured logging with severity levels (INFO, WARN, ERROR, DEBUG, TRACE).

## Incident Response
- If a secret is accidentally committed, rotate the secret immediately and purge the repository history (e.g., using `git filter-branch` or `bfg`).

## Review Checklist
- [ ] No secrets hard‑coded; all secrets loaded from `process.env`.
- [ ] `.env` is listed in `.gitignore`.
- [ ] Input schemas validate external data.
- [ ] Dependencies are audited and free of known vulnerabilities.
- [ ] No use of `eval` or similar unsafe constructs.
- [ ] HTTPS used for all external calls.
- [ ] Secret values are masked in logs.
- [ ] Approval logs are stored securely and are tamper‑evident.