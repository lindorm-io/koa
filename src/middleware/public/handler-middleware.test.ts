import { KoaContextAware, Metric } from "../../class";
import { handlerMiddleware } from "./handler-middleware";
import { logger } from "../../test";

class Test extends KoaContextAware {}

const next = () => Promise.resolve();

describe("handlerMiddleware", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      controller: { data: "data" },
      handler: {},
      logger,
      metrics: {},
    };
    ctx.getMetric = (key: string) => new Metric(ctx, key);
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
