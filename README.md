# @lindorm-io/koa
This package contains Koa App & Router for lindorm.io packages.

## Installation
```shell script
npm install --save @lindorm-io/koa
```

### Peer Dependencies
This package has the following peer dependencies: 
* [@lindorm-io/common](https://www.npmjs.com/package/@lindorm-io/common)
* [@lindorm-io/global](https://www.npmjs.com/package/@lindorm-io/global)
* [@lindorm-io/winston](https://www.npmjs.com/package/@lindorm-io/winston)

## Usage

### KoaApp
```typescript
const app = new KoaApp({
  logger: winstonLogger,
  port: 3000,
});

app.addMiddleware(basicAuthMiddleware);

app.addRoute("/route", router);

app.addWorker(intervalWorker);

await app.start();
```

### IntervalWorker
```typescript
const intervalWorker = new IntervalWorker({
  callback: Promise.resolve(),
  time: 5000,
  logger: winstonLogger,
});
```
