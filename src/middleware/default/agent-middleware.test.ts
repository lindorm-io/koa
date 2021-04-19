import { agentMiddleware } from "./agent-middleware";

describe("agentMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      userAgent: {
        browser: "browser",
        geoIp: { geoIp: 1 },
        os: "os",
        platform: "platform",
        source: "source",
        version: "version",
      },
    };
    next = () => Promise.resolve();
  });

  test("should set user agent data", async () => {
    await expect(agentMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.agent).toMatchSnapshot();
  });

  test("should set null if agent data does not exist", async () => {
    ctx.userAgent = undefined;

    await expect(agentMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.agent).toMatchSnapshot();
  });
});
