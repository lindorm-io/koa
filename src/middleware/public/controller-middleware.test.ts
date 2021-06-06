import { KoaContextAware, Metric } from "../../class";
import { controllerMiddleware } from "./controller-middleware";
import { logger } from "../../test";

class Test extends KoaContextAware {}

const next = () => Promise.resolve();

describe("controllerMiddleware", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      controller: {},
      handler: { data: "data" },
      logger,
      metrics: {},
    };
    ctx.getMetric = (key: string) => new Metric(ctx, key);
  });

  test("should set controller on context", async () => {
    await expect(controllerMiddleware(Test)(ctx, next)).resolves.toBeUndefined();
    expect(ctx.controller.test).toStrictEqual(expect.any(Test));
  });

  test("should set and keep references", async () => {
    await expect(controllerMiddleware(Test)(ctx, next)).resolves.toBeUndefined();
    ctx.handler.data = "new-data";
    expect(ctx.controller.test).toStrictEqual(expect.any(Test));
  });

  test("should set controller with specific key", async () => {
    await expect(controllerMiddleware(Test, { key: "otherKey" })(ctx, next)).resolves.toBeUndefined();
    expect(ctx.controller.otherKey).toStrictEqual(expect.any(Test));
  });
});
