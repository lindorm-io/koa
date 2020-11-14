import { correlationIdMiddleware } from "./correlation-id-middleware";

jest.mock("uuid", () => ({
  v1: jest.fn(() => "uuid-correlation-id"),
}));

describe("correlationIdMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      get: jest.fn(() => "mock-correlation-id"),
    };
    next = () => Promise.resolve();
  });

  test("should use correlation id from header if it exists", async () => {
    await expect(correlationIdMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.id).toBe("mock-correlation-id");
  });

  test("should use uuid if header does not exist", async () => {
    ctx.get = jest.fn(() => undefined);

    await expect(correlationIdMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.id).toBe("uuid-correlation-id");
  });
});
