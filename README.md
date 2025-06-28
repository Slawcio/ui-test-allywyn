# Experimental Playwright Test Suite

This repository contains automated end-to-end tests using [Playwright](https://playwright.dev/).  
Test scenarios are organized in the following files:

- Scenario 1: 

Made for recruitment process as well as exploring some ideas:
- page composition from sections
- check all elements in base class
- one export for utils, test data
- seeking to minimize redundancy and reusability since the very beginning

- feel free to challange it ^

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:Slawcio/playwright-tests.git
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Install Playwright browsers:
   ```sh
   npx playwright install
   ```
### Setup .env file

Use a .env file to store sensitive data (e.g., API keys, base URLs).
This keeps credentials secure, allows easy env switching, and avoids hardcoding.

### Running Tests

To run all tests:
```sh
npx playwright test
# or
npm run test
```

To run with tags
```sh
npx playwright test --grep @my_tag
#or
npm run test --grep @my_tag
```

To run a specific scenario:
```sh
npx playwright test file_name.spec.ts
#or
npm run test file_name.spec.ts
```

### Test Structure

- All test scenarios are located in the root or `tests/e2e` directory.
- Each `.spec.ts` file contains one or more related test cases.

### Reporting

Playwright provides built-in reporting via the HTML reporter and trace viewer. For most test suites, these are sufficient, especially with trace capture enabled. For advanced CI integration or external reporting, custom or third-party reporters (like Allure or JSON + dashboard) can be used.

config:
- screenshots on failure
- trace on first retry
- html report does not open automatically

type
```sh
npx playwright show-report
``` 
to open reporter based on latest tests results

### TS Linting and Formatting

...in progress


### What left to do:

- redirecting of burger menu and back buttons
- personal checkout validations
- storage-state for all test users -> enabling to run all of them
- extract test users to .env probably (security)
- some refactoring eg some buying steps into test.steps
- github actions