import { metadataMiddleware } from "./metadata-middleware";

jest.mock("uuid", () => ({
  v1: jest.fn(() => "0dacd3cc-035e-4968-881e-1fc30d496121"),
  v4: jest.fn(() => "a26dad28-e854-447d-bce6-5c685cddfea8"),
}));

describe("correlationIdMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      get: jest.fn((name) => name),
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

  test("should use correlation id from header if it exists", async () => {
    await expect(metadataMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.metadata).toMatchSnapshot();
  });

  test("should use uuid if header does not exist", async () => {
    ctx.get = jest.fn(() => undefined);

    await expect(metadataMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.metadata).toMatchSnapshot();
  });

  test("should set user agent data", async () => {
    await expect(metadataMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.agent).toMatchSnapshot();
  });

  test("should set null if agent data does not exist", async () => {
    ctx.userAgent = undefined;

    await expect(metadataMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.agent).toMatchSnapshot();
  });
});
