import { APIError } from "@lindorm-io/core";
import { errorMiddleware } from "./error-middleware";

describe("errorMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      app: {
        emit: jest.fn(),
      },
    };
    next = () =>
      Promise.reject(
        new APIError("message", {
          debug: { json: "debug" },
          details: "details",
          errorCode: "errorCode",
          publicData: { json: "publicData" },
          statusCode: 300,
          title: "title",
        }),
      );
  });

  test("should resolve with error data", async () => {
    await expect(errorMiddleware(ctx, next)).resolves.toBe(undefined);

    expect(ctx.app.emit).toHaveBeenCalled();
    expect(ctx.status).toBe(300);
    expect(ctx.body).toMatchSnapshot();
  });

  test("should resolve with default error data", async () => {
    next = () => Promise.reject(new APIError("message"));

    await expect(errorMiddleware(ctx, next)).resolves.toBe(undefined);

    expect(ctx.app.emit).toHaveBeenCalled();
    expect(ctx.status).toBe(500);
    expect(ctx.body).toMatchSnapshot();
  });
});
