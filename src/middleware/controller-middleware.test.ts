import { KoaContextAware } from "../class";
import { controllerMiddleware } from "./controller-middleware";

class Test extends KoaContextAware {}

describe("controllerMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      controller: {},
      handler: { data: "data" },
    };
    next = () => Promise.resolve();
  });

  test("should set controller on context", async () => {
    await expect(controllerMiddleware(Test)(ctx, next)).resolves.toBe(undefined);
    expect(ctx.controller.test).toStrictEqual(expect.any(Test));
  });

  test("should set and keep references", async () => {
    await expect(controllerMiddleware(Test)(ctx, next)).resolves.toBe(undefined);
    ctx.handler.data = "new-data";
    expect(ctx.controller.test).toStrictEqual(expect.any(Test));
  });

  test("should set controller with specific key", async () => {
    await expect(controllerMiddleware(Test, { key: "otherKey" })(ctx, next)).resolves.toBe(undefined);
    expect(ctx.controller.otherKey).toStrictEqual(expect.any(Test));
  });
});
