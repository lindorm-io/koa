import { metadataMiddleware } from "./metadata-middleware";

jest.mock("uuid", () => ({
  v1: jest.fn(() => "0dacd3cc-035e-4968-881e-1fc30d496121"),
  v4: jest.fn(() => "a26dad28-e854-447d-bce6-5c685cddfea8"),
}));

describe("metadataMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      get: jest.fn((name) => name),
    };
    next = () => Promise.resolve();
  });

  test("should use correlation id from header if it exists", async () => {
    await expect(metadataMiddleware(ctx, next)).resolves.toBeUndefined();
    expect(ctx.metadata).toMatchSnapshot();
    expect(ctx.metadataHeaders).toMatchSnapshot();
  });

  test("should use uuid if header does not exist", async () => {
    ctx.get = jest.fn(() => undefined);

    await expect(metadataMiddleware(ctx, next)).resolves.toBeUndefined();
    expect(ctx.metadata).toMatchSnapshot();
    expect(ctx.metadataHeaders).toMatchSnapshot();
  });
});
