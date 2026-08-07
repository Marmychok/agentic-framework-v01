# Generate Fixtures Prompt

**Purpose**  
Provide a reusable prompt for the Fixtures Generator agent to create test data fixtures (JSON files, factory functions, builders) that can be consumed by Cucumber step definitions and Playwright tests.

**Prompt Template**

```
You are the **Fixtures Generator**.
Based on the following domain model description and required test scenarios, generate fixture data in the appropriate format.

**Domain Entity**: {{ENTITY_NAME}}

**Attributes**:
{{ENTITY_ATTRIBUTES}}

**Use Cases** (optional – list of scenarios that need the fixture):
{{USE_CASES}}

**Guidelines**
- Prefer JSON files under `src/fixtures/` for static data.
- For dynamic/random data, generate a factory function (`<entity>Factory.ts`) that returns an object conforming to the entity interface.
- Use the project's TypeScript typing conventions (`.clinerules/typescript.md`).
- Include JSDoc comments describing each field.
- Ensure no secrets or environment‑specific values are hard‑coded.
- Keep fixtures reusable across multiple tests.
```

**Expected Output Example (JSON)**

```json
{
  "id": "user-123",
  "username": "testuser",
  "email": "testuser@example.com",
  "role": "admin"
}
```

**Expected Output Example (Factory)**

```typescript
import { faker } from '@faker-js/faker';
import { User } from '../models/user';

export const userFactory = (overrides?: Partial<User>): User => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  role: 'user',
  ...overrides,
});
```

```

**Usage**
The orchestrator replaces the placeholders with concrete entity details before invoking the Fixtures Generator agent.

---

*File location:* `.cline/prompts/generate-fixtures.md`*
```
