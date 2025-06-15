# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone git@github.com:yauheni-shcharbakou/nodejs2025Q2-service.git // for SSH
git clone https://github.com/yauheni-shcharbakou/nodejs2025Q2-service.git // for HTTPS
```

## Change git branch

```bash
git checkout home-library-service-part-2
```

## Installing NPM modules

```bash
npm install
```

## Audit

### Audit npm vulnerabilities:

```bash
npm run audit:npm
```

This command is also used in backend dockerfile

### Docker images audit:

```bash
npm run audit:docker
```

## Environment variables

Copy `.env.example` content to `.env` file (and change) for setup environment variables. It's required, because docker 
compose also uses `.env` file for load variables.

- `PORT` backend port value

- `LOG_LEVEL` log level (one of `fatal` | `error` | `warn` | `log` | `debug` | `verbose`)
- `LOG_MAX_SIZE_KB` max log file size in KB 
    > It is also important to consider that in MacOS since version 10.6 the finder uses the decimal system, so the file 
    > size will be displayed there 2.4% larger. For greater accuracy, you should pay attention to the file size in bytes 
    > (for 100 KB it will be 102400) 
- `LOG_DIRECTORY` relative path to repository root for store logs

- `CRYPT_SALT` salt value used for hashing
- `JWT_SECRET_KEY` secret key used for access token
- `JWT_SECRET_REFRESH_KEY` secret key used for refresh token
- `TOKEN_EXPIRE_TIME` access token expire time parameter
- `TOKEN_REFRESH_EXPIRE_TIME` refresh token expire time parameter

- `POSTGRES_PORT` postgres port value
- `POSTGRES_USER` postgres user name
- `POSTGRES_PASSWORD` postgres user password
- `DATABASE_URL` postgres connection url, `postgresql://{{POSTGRES_USER}}:{{POSTGRES_PASSWORD}}@localhost:{{POSTGRES_PORT}}/home-library-service`

## Logging

By default, logs saved at directory `logs` (it can be changed by using `LOG_DIRECTORY` env variable) and separated by
day timestamp:

```
/logs
  /2025-06-14
    2025-06-14.0.log // ordinary log (warn | log | debug | verbose)
    2025-06-14.0.error.log // error log file, here are fatal and error levels
    2025-06-14.1.log
    2025-06-14.1.error.log
  /2025-06-15
    2025-06-14.0.log
    ...
```

- `unhandledRejection` and `uncaughtException` implemented as `fatal` level logs
- errors use `error` level
- request and response data logged as `debug` level

Here is the priority of levels:
- `fatal`
- `error`
- `warn`
- `log`
- `debug`
- `verbose`

So, for see `debug` logs you need set `debug` or `verbose` level, for see `error` - `error` or anything below in the 
list, etc. By default, `log` level is set (can be changed via `LOG_LEVEL` env variable)

## Running application 

### For run without docker in development mode:

```bash
npm run prisma:generate // for generate prisma client
npm run prisma:migrate // apply migrations and seed db
npm run start // or npm run start:dev
```

### For build and run in production mode:

```bash
npm run prisma:generate // for generate prisma client
npm run build
npm run prisma:migrate // apply migrations and seed db
npm run start:prod
```

### For run with docker using local dockerfiles:

```bash
npm run docker-compose:local
npm run docker-compose:local:build // with --build glag
```

### For run with docker using deployed docker images:

```bash
npm run docker-compose:hub
npm run docker-compose:hub:build // with --build glag
```

Deployed DockerHub images:
- [database image](https://hub.docker.com/repository/docker/evgeniishcherbakov/postgresql/general)
- [backend image](https://hub.docker.com/repository/docker/evgeniishcherbakov/home-library-service/general)

### For reset database:

```bash
npm run prisma:reset
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Deploying docker images

Login into DockerHub:

```bash
docker login
```

### Build and deploy database image:

```bash
npm run docker:build:db
npm run docker:push:db
```

### Build and deploy backend image:

```bash
npm run docker:build:backend
npm run docker:push:backend
```

## Testing

After application running open new terminal and enter:

### To run only tests for Home Library Service part 3:

```bash
npm run test:auth
npm run test:refresh
```

### To run all tests without authorization

```bash
npm run test
```

### To run only one of all test suites

```bash
npm run test -- <path to suite>
```

### To run all test with authorization

```bash
npm run test:auth
```

### To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```

## Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
