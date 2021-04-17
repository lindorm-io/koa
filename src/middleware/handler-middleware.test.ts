import { KoaContextAware } from "../class";
import { handlerMiddleware } from "./handler-middleware";

class Test extends KoaContextAware {}

describe("controllerMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      agent: "agent",
      cache: "cache",
      controller: { data: "data" },
      handler: {},
      issuer: "issuer",
      keystore: "keystore",
      logger: "logger",
      metadata: "metadata",
      metrics: "metrics",
      repository: "repository",
      support: "support",
      token: "token",
    };
    next = () => Promise.resolve();
  });

  test("should set controller on context", async () => {
    await expect(handlerMiddleware(Test)(ctx, next)).resolves.toBe(undefined);
    expect(ctx).toMatchSnapshot();
  });

  test("should set and keep references", async () => {
    await expect(handlerMiddleware(Test)(ctx, next)).resolves.toBe(undefined);
    ctx.handler.data = "new-data";
    expect(ctx).toMatchSnapshot();
  });
});
