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
          code: "ERROR_CODE",
          data: { value: "data" },
          debug: { value: "debug", notes: "notes" },
          description: "description",
          statusCode: ServerError.StatusCode.LOOP_DETECTED,
          title: "title",
        }),
      );
  });

  test("should resolve with error data", async () => {
    await expect(errorMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.status).toBe(508);
    expect(ctx.body).toStrictEqual({
      error: {
        code: "ERROR_CODE",
        data: { value: "data" },
        description: "description",
        message: "error-message",
        name: "ServerError",
        title: "title",
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
        code: null,
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
      error: {
        name: "UnexpectedError",
        title: "Unexpected Error",
        message: "Something went wrong",
      },
    });
    expect(ctx.app.emit).toHaveBeenCalledWith("error", new Error("unexpected"));
  });
});
