import { KoaContextAware } from "../../class";
import { handlerMiddleware } from "./handler-middleware";
import { logger } from "../../test";

class Test extends KoaContextAware<any> {}

describe("controllerMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      controller: { data: "data" },
      handler: {},
      logger,
    };
    next = () => Promise.resolve();
  });

  test("should set handler on context", async () => {
    await expect(handlerMiddleware(Test)(ctx, next)).resolves.toBeUndefined();
    expect(ctx.handler.test).toStrictEqual(expect.any(Test));
  });

  test("should set and keep references", async () => {
    await expect(handlerMiddleware(Test)(ctx, next)).resolves.toBeUndefined();
    ctx.controller.data = "new-data";
    expect(ctx.handler.test).toStrictEqual(expect.any(Test));
  });

  test("should set handler with specific key", async () => {
    await expect(handlerMiddleware(Test, { key: "otherKey" })(ctx, next)).resolves.toBeUndefined();
    expect(ctx.handler.otherKey).toStrictEqual(expect.any(Test));
  });
});
