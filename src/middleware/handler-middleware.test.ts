import { KoaContextAware } from "../class";
import { handlerMiddleware } from "./handler-middleware";

class Test extends KoaContextAware {}

describe("controllerMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      controller: { data: "data" },
      handler: {},
    };
    next = () => Promise.resolve();
  });

  test("should set handler on context", async () => {
    await expect(handlerMiddleware(Test)(ctx, next)).resolves.toBe(undefined);
    expect(ctx.handler.test).toMatchSnapshot();
  });

  test("should set and keep references", async () => {
    await expect(handlerMiddleware(Test)(ctx, next)).resolves.toBe(undefined);
    ctx.controller.data = "new-data";
    expect(ctx.handler.test).toMatchSnapshot();
  });

  test("should set handler with specific key", async () => {
    await expect(handlerMiddleware(Test, { key: "otherKey" })(ctx, next)).resolves.toBe(undefined);
    expect(ctx.handler.otherKey).toMatchSnapshot();
  });
});
