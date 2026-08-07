# ZincBank Login Test Suite

## Overview

This test suite provides comprehensive coverage for the ZincBank login functionality. It follows the **Page Object Model (POM)** pattern with Playwright and Cucumber BDD framework.

## Test Credentials

**Student User:**

- Email: `student01@zinc.test`
- Password: `9pJolA7GBQec`

## File Structure

```
tests/
├── zinc-bank-login.feature          # Gherkin feature file with scenarios
└── LOGIN_TEST_SUITE.md              # This documentation file

src/
├── pages/
│   └── login.page.ts                # Page Object Model for login page
├── steps/
│   └── login.steps.ts               # Step definitions for login scenarios
└── fixtures/
    └── login-test-data.ts           # Test data and fixtures
```

## Scenarios Overview

### Positive Test Cases (Happy Path)

1. **Student successfully logs in with valid credentials** `@positive @critical`
   - Tests successful login with the provided student credentials
   - Verifies redirect to dashboard

2. **User successfully logs in with valid email and password** `@positive`
   - General login success scenario
   - Verifies login is successful

### Negative Test Cases (Error Handling)

3. **Login fails with empty email field** `@negative @critical`
   - Tests email field validation
   - Expects email validation error

4. **Login fails with empty password field** `@negative @critical`
   - Tests password field validation
   - Expects password validation error

5. **Login fails with incorrect password** `@negative`
   - Tests incorrect password handling
   - Expects invalid credentials error

6. **Login fails with unregistered email** `@negative`
   - Tests non-existent user handling
   - Expects invalid credentials error

7. **Login fails with invalid email format** `@negative`
   - Tests email format validation
   - Expects email format error

### UI/UX Test Cases

8. **User can navigate to account creation page** `@ui @navigation`
   - Tests navigation to sign-up page
   - Verifies "Open an account" link functionality

9. **Email field accepts valid email format** `@ui @input-validation`
   - Tests email input accepts valid values
   - Verifies input is displayed correctly

10. **Password field masks password characters** `@ui @input-validation`
    - Tests password masking for security
    - Verifies actual password not visible

### Accessibility Test Cases

11. **Login page has proper accessibility labels** `@ui @accessibility`
    - Tests accessibility labels for form fields
    - Ensures screen reader compatibility

### Form Validation Test Cases

12. **Both fields are required for form submission** `@ui @form-validation`
    - Tests required field validation
    - Verifies errors for empty fields

### Performance Test Cases

13. **Login page loads within acceptable time** `@performance`
    - Tests page load performance
    - Verifies all elements are visible

## Page Object Model (LoginPage)

### Key Locators

- **Email Input:** Uses accessibility selector `getByLabel()` with fallback to `input[type="email"]`
- **Password Input:** Uses accessibility selector `getByLabel()` with fallback to `input[type="password"]`
- **Sign In Button:** Uses role-based selector `getByRole('button', { name: 'Sign in' })`
- **Open Account Link:** Uses role-based selector for navigation
- **Error Messages:** Uses role-based selector `[role="alert"]` with fallback to class selectors

### Key Methods

#### Navigation

- `goto()` - Navigate to login page
- `getCurrentUrl()` - Get current page URL
- `isDashboardVisible()` - Check if redirected to dashboard

#### Input Actions

- `fillEmail(email)` - Fill email field
- `fillPassword(password)` - Fill password field
- `clearEmail()` - Clear email field
- `clearPassword()` - Clear password field
- `login(email, password)` - Fill both fields and submit
- `clickSignIn()` - Click sign-in button
- `clickOpenAccount()` - Click account creation link

#### Validations (without assertions - returns boolean)

- `isEmailInputVisible()` - Check email field visibility
- `isPasswordInputVisible()` - Check password field visibility
- `isSignInButtonVisible()` - Check button visibility
- `isSignInButtonEnabled()` - Check button enabled state
- `isErrorMessageVisible()` - Check error message visibility
- `isEmailErrorVisible()` - Check email error visibility
- `isPasswordErrorVisible()` - Check password error visibility
- `isDashboardVisible()` - Check if on dashboard

#### Data Retrieval

- `getEmailValue()` - Get email input value
- `getPasswordValue()` - Get password input value
- `getErrorMessageText()` - Get error message content
- `getEmailErrorText()` - Get email error content
- `getPasswordErrorText()` - Get password error content

## Step Definitions

### Setup/Teardown

- **Before Hook:** Initializes browser, context, page, and LoginPage instance
- **After Hook:** Closes context and browser after each scenario

### Given Steps

- `the user is on the ZincBank login page` - Navigate and verify login page
- `the user navigates to the ZincBank login page` - Navigate to login page

### When Steps

- `the user enters email {string}` - Fill email field
- `the user enters password {string}` - Fill password field
- `the user clicks the Sign in button` - Submit login form
- `the user leaves the email field empty` - Clear email field
- `the user leaves the password field empty` - Clear password field
- `the user clicks on {string} link` - Click navigation links
- `the user enters email {string} in the email field` - Fill email and verify
- `the user enters password {string} in the password field` - Fill password and verify

### Then Steps

- `the user should be logged in successfully` - Verify login success
- `the user should be redirected to the dashboard` - Verify dashboard redirect
- `the login should be successful` - Verify no errors
- `an email validation error should be displayed` - Verify email error
- `a password validation error should be displayed` - Verify password error
- `an invalid credentials error should be displayed` - Verify credentials error
- `an email format error should be displayed` - Verify format error
- `the user should be redirected to the account creation page` - Verify signup redirect
- `the email field should display {string}` - Verify email input value
- `the password field should display masked characters` - Verify password masking
- `the actual password should not be visible` - Verify password security
- `the email input should have an accessible label {string}` - Verify accessibility
- `the password input should have an accessible label {string}` - Verify accessibility
- `the Sign in button should have an accessible label {string}` - Verify button label
- `validation errors should be displayed for both fields` - Verify multiple errors
- `the page should load within {int} seconds` - Verify performance
- `all login form elements should be visible` - Verify page rendering

## Test Data Fixtures

### Valid Credentials

```typescript
VALID_STUDENT_CREDENTIALS = {
  email: 'student01@zinc.test',
  password: '9pJolA7GBQec',
  description: 'Valid student user credentials',
};
```

### Test Cases

The `LOGIN_TEST_CASES` array contains 8 predefined test cases covering:

- Valid credentials (success)
- Missing email (validation error)
- Missing password (validation error)
- Both fields empty (validation error)
- Invalid password (error)
- Non-existent email (error)
- Invalid email format (validation error)
- Different email format (error)

### Email Validation Cases

Includes 8 test cases for valid and invalid email formats

### Password Strength Cases

Includes 4 test cases for different password strength levels

### Error Messages

Predefined expected error messages:

- `INVALID_CREDENTIALS`
- `EMAIL_REQUIRED`
- `PASSWORD_REQUIRED`
- `INVALID_EMAIL`
- `USER_NOT_FOUND`
- `LOGIN_FAILED`
- `ACCOUNT_LOCKED`
- `SESSION_EXPIRED`

### User Roles

Defines user roles (STUDENT, ADMIN, TEACHER) with expected behavior

## Running the Tests

### Run all login scenarios

```bash
npm run test:cucumber tests/zinc-bank-login.feature
```

### Run specific tag

```bash
npm run test:cucumber -- --tags "@positive"
npm run test:cucumber -- --tags "@critical"
npm run test:cucumber -- --tags "@smoke"
```

### Run with reporting

```bash
npm run test:cucumber -- --format html:reports/cucumber-report.html
```

## Test Coverage

| Category           | Count  | Coverage                               |
| ------------------ | ------ | -------------------------------------- |
| Positive Scenarios | 2      | Happy path, login success              |
| Negative Scenarios | 5      | Invalid credentials, validation errors |
| UI/UX Scenarios    | 2      | Navigation, input masking              |
| Accessibility      | 1      | WCAG labels                            |
| Form Validation    | 1      | Required fields                        |
| Performance        | 1      | Load time                              |
| **Total**          | **13** | **Comprehensive**                      |

## Best Practices Applied

✅ **Page Object Model (POM)** - All UI interactions encapsulated in LoginPage  
✅ **No Assertions in POM** - Only getter methods returning state  
✅ **Accessibility-First Selectors** - Using `getByRole()`, `getByLabel()`, `getByTestId()`  
✅ **Thin Step Definitions** - Delegates to POM methods  
✅ **BDD Format** - Business-focused Gherkin scenarios  
✅ **Test Data Separation** - Fixtures in separate file  
✅ **Error Handling** - Graceful handling of navigation waits  
✅ **Reusable Methods** - Chainable actions in POM  
✅ **Auto-waiting** - Playwright's auto-waiting, no explicit timeouts  
✅ **Security** - Password masking verification, no hardcoded secrets

## Coding Standards Compliance

- **TypeScript:** Strict mode enabled, explicit typing
- **Naming:** PascalCase for classes, camelCase for methods
- **Documentation:** JSDoc comments for all public methods
- **Code Style:** Consistent formatting with Prettier

## Notes

- Tests use Chromium browser by default
- Network idle waiting for page loads
- Error message visibility with timeout fallback
- Supports both validation and business logic errors
- Extensible for additional user roles and scenarios

## Future Enhancements

- [ ] Add multi-language login testing
- [ ] Add 2FA/MFA scenarios
- [ ] Add rate limiting tests
- [ ] Add session management tests
- [ ] Add CSRF protection verification
- [ ] Add XSS prevention verification
- [ ] Add API integration tests
- [ ] Add performance benchmarking
- [ ] Add visual regression testing
- [ ] Add accessibility (a11y) automated testing
