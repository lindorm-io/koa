import { redirectErrorMiddleware } from "./redirect-error-middleware";
import { LindormError } from "@lindorm-io/errors";

const next = jest.fn();

describe("redirectErrorMiddleware", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      request: { body: { redirectUri: "redirectUri" } },
    };
  });

  afterEach(jest.clearAllMocks);

  test("should resolve middleware on no error", async () => {
    next.mockResolvedValue(undefined);
    await expect(redirectErrorMiddleware("request.body.redirectUri")(ctx, next)).resolves.toBeUndefined();
  });

  test("should throw with redirect error", async () => {
    next.mockRejectedValue(
      new LindormError("message", {
        code: "lindorm_code",
        description: "lindorm description",
      }),
    );

    await expect(redirectErrorMiddleware("request.body.redirectUri")(ctx, next)).rejects.toThrow(
      expect.objectContaining({
        code: "lindorm_code",
        description: "lindorm description",
        redirect: "redirectUri",
        uri: null,
        state: null,
      }),
    );
  });

  test("should utilise error data object as fallback", async () => {
    next.mockRejectedValue(
      new LindormError("message", {
        data: {
          code: "lindorm_code",
          description: "lindorm description",
          uri: "uri",
          state: "state",
        },
      }),
    );

    await expect(redirectErrorMiddleware("request.body.redirectUri")(ctx, next)).rejects.toThrow(
      expect.objectContaining({
        code: "lindorm_code",
        description: "lindorm description",
        redirect: "redirectUri",
        uri: "uri",
        state: "state",
      }),
    );
  });
});
