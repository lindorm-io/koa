import { ServerError } from "@lindorm-io/errors";
import { errorMiddleware } from "./error-middleware";

describe("errorMiddleware", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      app: {
        emit: jest.fn(),
      },
      logger: {
        error: jest.fn(),
      },
    };
    next = () =>
      Promise.reject(
        new ServerError("error-message", {
          developer: {
            debug: { value: "developer-debug" },
            details: "developer-details",
          },
          public: {
            data: { value: "data-value" },
            description: "public-description",
            title: "public-title",
          },
          statusCode: ServerError.StatusCode.LOOP_DETECTED,
        }),
      );
  });

  test("should resolve with error data", async () => {
    await expect(errorMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.status).toBe(508);
    expect(ctx.body).toStrictEqual({
      error: {
        data: {
          value: "data-value",
        },
        description: "public-description",
        message: "error-message",
        name: "ServerError",
        title: "public-title",
      },
    });
    expect(ctx.logger.error).toHaveBeenCalledWith("Service Error", expect.any(ServerError));
  });

  test("should resolve with default error data", async () => {
    next = () => Promise.reject(new ServerError("message"));

    await expect(errorMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.status).toBe(500);
    expect(ctx.body).toStrictEqual({
      error: {
        data: {},
        description: null,
        message: "message",
        name: "ServerError",
        title: null,
      },
    });
    expect(ctx.logger.error).toHaveBeenCalledWith("Service Error", expect.any(ServerError));
  });

  test("should resolve even when something fails", async () => {
    ctx.logger.error.mockImplementationOnce(() => {
      throw new Error("unexpected");
    });

    await expect(errorMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.status).toBe(500);
    expect(ctx.body).toStrictEqual({
      error: new Error("unexpected"),
    });
    expect(ctx.app.emit).toHaveBeenCalledWith("error", new Error("unexpected"));
  });
});
