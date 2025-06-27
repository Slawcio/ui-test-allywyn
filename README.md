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

### TS Linting and Formatting

...in progress