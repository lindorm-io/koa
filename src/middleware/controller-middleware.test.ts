import { KoaContextAware } from "../class";
import { controllerMiddleware } from "./controller-middleware";

class Test extends KoaContextAware {}

describe("controllerMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      agent: "agent",
      cache: "cache",
      controller: {},
      handler: { data: "data" },
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
    await expect(controllerMiddleware(Test)(ctx, next)).resolves.toBe(undefined);
    expect(ctx).toMatchSnapshot();
  });

  test("should set and keep references", async () => {
    await expect(controllerMiddleware(Test)(ctx, next)).resolves.toBe(undefined);
    ctx.handler.data = "new-data";
    expect(ctx).toMatchSnapshot();
  });
});
