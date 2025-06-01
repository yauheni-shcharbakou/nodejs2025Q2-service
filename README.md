# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone git@github.com:yauheni-shcharbakou/nodejs2025Q2-service.git // for SSH
git clone https://github.com/yauheni-shcharbakou/nodejs2025Q2-service.git // for HTTPS
```

## Installing NPM modules

```bash
npm install
```

## Running application

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

For change port value you can place .env file with `PORT={{your port here}}` content.

## Testing

After application running open new terminal and enter:

To run only tests for Home Library Service part 1:

```bash
npm run test -- users.e2e.spec.ts
npm run test -- tracks.e2e.spec.ts
npm run test -- artists.e2e.spec.ts
npm run test -- albums.e2e.spec.ts
npm run test -- favorites.e2e.spec.ts

// or

npm run test
```

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
