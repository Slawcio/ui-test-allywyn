# Experimental Playwright Test Suite

This repository contains automated end-to-end tests using [Playwright](https://playwright.dev/).  
Test scenarios are organized in the following files:

Made for recruitment process as well as exploring some ideas:
- page composition from reusable separate views
- check all elements on page with one base method
- seeking to minimize redundancy and reusability since the very beginning
- visual regression
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
This keeps credentials secure, allows easy env switching, and avoids hardcoding vulnerable data

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
```

To run a specific scenario:
```sh
npx playwright test file_name.spec.ts
```

Update visual comparison snapshots
```sh
 npx playwright test -u
 ```

### Test Structure

- All test scenarios are located in the root or `tests/e2e` directory.
- Each `.spec.ts` file contains one or more related test cases.

### Reporting

Playwright provides built-in reporting via the HTML reporter and trace viewer. For most test suites, these are sufficient, especially with trace capture enabled. For advanced CI integration or external reporting, custom or third-party reporters (like Allure or JSON + dashboard) can be used.

config:
- screenshots on failure
- trace on first retry
- html report does not open after `npx run playwright`

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
- `storage-state` for all test users -> enabling to run all of them
- extract test users to `.env` probably (security)
- some refactoring eg extracting some of e2e buying process into `test.steps`
- github actions
- propose some e2e `*.spec.ts` files grouping
- more wise `tag` management

### General folder mapping
```text
.
├── _auth/                      # Auth-related artifacts
├── node_modules/               # Node.js dependencies
├── pages/                      # Page Object Model structure
├── playwright-report/          # Playwright test reports
├── setup/                      # Test setup routines
├── test-results/               # Output artifacts
├── tests/                      # Main test suite
│   ├── common-steps/           # Reusable test steps
│   ├── data/                   # Test data sources
│   ├── e2e/                    # Full end-to-end test scenarios
│   └── visual-regression.spec.ts-snapshots/ # Snapshot files
├── utils/                      # Utility functions
├── .env                        # Environment config
├── .env.example                # Sample env file
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json              # TypeScript compiler config
└── types.ts                   # Shared types/interfaces
```