# API Skill

## Purpose
Provide reusable utilities, request wrappers, and validation patterns for interacting with REST/GraphQL APIs from Playwright tests or agent workflows, following the guidelines in `.clinerules/api.md` (if present) and Cline’s security and coding standards.

## Examples
- **Generic API Client Wrapper**
  ```typescript
  // utils/api-client.ts
  import fetch, { RequestInit, Response } from 'node-fetch';
  import { getEnv } from './env';

  const baseUrl = getEnv('API_BASE_URL');

  export const apiRequest = async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const url = `${baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getEnv('API_TOKEN')}`,
      ...options.headers,
    };
    return fetch(url, { ...options, headers });
  };

  export const getJson = async <T>(endpoint: string): Promise<T> => {
    const resp = await apiRequest(endpoint, { method: 'GET' });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`GET ${endpoint} failed: ${resp.status} ${text}`);
    }
    return resp.json() as Promise<T>;
  };
  ```

- **GraphQL Helper**
  ```typescript
  // utils/graphql.ts
  import { apiRequest } from './api-client';

  export const gql = async <T>(query: string, variables?: Record<string, unknown>) => {
    const resp = await apiRequest('/graphql', {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    });
    const json = await resp.json();
    if (json.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }
    return json.data as T;
  };
  ```

- **API Test Example**
  ```typescript
  // tests/api/user-api.spec.ts
  import { test, expect } from '@playwright/test';
  import { getJson } from '../../utils/api-client';

  test('GET /users returns a list', async () => {
    const users = await getJson<Array<{ id: string; email: string }>>('/users');
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('email');
  });
  ```

## Reusable Prompts
1. **Create API Client**
   ```
   Generate a TypeScript module `api-client.ts` that reads the base URL and token from environment variables, provides a generic `apiRequest` function, and a typed `getJson<T>` helper.
   ```

2. **Add GraphQL Wrapper**
   ```
   Provide a `graphql.ts` utility that sends a GraphQL query with optional variables and returns the typed data, handling errors appropriately.
   ```

3. **Write API Test**
   ```
   Produce a Playwright test that uses the API client to call GET /orders and asserts that the response contains at least one order with a valid status field.
   ```

## Best Practices
- Centralize all API interactions in a dedicated `utils/api-client` module.
- Use **environment variables** for base URLs and authentication tokens; never hard‑code secrets.
- Validate responses with **Zod schemas** (or a similar validator) to ensure contract compliance.
- Keep API calls **idempotent** where possible; avoid mutating state in GET requests.
- Cache expensive data between tests using Playwright fixtures if needed.
- Log API request/response pairs using the `secureLog` wrapper to avoid leaking sensitive data.

## Validation
- API utilities must compile (`tsc`) and pass lint.
- Running the generated API test should succeed against the configured staging environment; failures must produce clear error messages.
- Secrets must not appear in source code or logs (masked by `secureLog`).

## Anti‑patterns
- Embedding API keys directly in request headers.
- Ignoring HTTP error codes; always check `resp.ok`.
- Using `any` for response payloads without validation.

## Limitations
- This skill does not provide automated mock servers or contract testing frameworks; those can be added via separate `testing` or `devops` agents if required.