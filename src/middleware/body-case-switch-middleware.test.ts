import { bodyCaseSwitchMiddleware } from "./body-case-switch-middleware";

describe("body-case-switch-middleware.ts", () => {
  const array = ["array"];
  const date = new Date();
  const error = new Error("error");
  const string = "string";

  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      request: {
        body: {
          camelCase: "camelCase",
          PascalCase: "PascalCase",
          snake_case: "snake_case",
          array,
          date,
          error,
          string,
        },
      },
      body: {
        camelCase: "camelCase",
        PascalCase: "PascalCase",
        snake_case: "snake_case",
        array,
        date,
        error,
        string,
      },
    };

    next = () => Promise.resolve();
  });

  test("should transform all incoming body to camelCase", async () => {
    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.request.body).toStrictEqual({
      camelCase: "camelCase",
      pascalCase: "PascalCase",
      snakeCase: "snake_case",
      array,
      date,
      error,
      string,
    });
  });

  test("should transform all outgoing body to snake_case", async () => {
    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.body).toStrictEqual({
      camel_case: "camelCase",
      pascal_case: "PascalCase",
      snake_case: "snake_case",
      array,
      date,
      error,
      string,
    });
  });

  test("should not fail if there is no body", async () => {
    ctx = { request: { body: undefined }, body: undefined };

    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.request.body).toStrictEqual({});
    expect(ctx.body).toStrictEqual({});
  });
});
