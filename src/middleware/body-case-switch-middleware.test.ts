import { bodyCaseSwitchMiddleware } from "./body-case-switch-middleware";

describe("body-case-switch-middleware.ts", () => {
  let ctx: any;
  let next: any;

  beforeEach(() => {
    ctx = {
      request: {
        body: {
          camelCase: "camelCase",
          PascalCase: "PascalCase",
          snake_case: "snake_case",
        },
      },
      body: {
        camelCase: "camelCase",
        PascalCase: "PascalCase",
        snake_case: "snake_case",
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
    });
  });

  test("should transform all outgoing body to snake_case", async () => {
    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.body).toStrictEqual({
      camel_case: "camelCase",
      pascal_case: "PascalCase",
      snake_case: "snake_case",
    });
  });

  test("should not fail if there is no body", async () => {
    ctx = { request: { body: undefined }, body: undefined };

    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBe(undefined);
    expect(ctx.request.body).toStrictEqual({});
    expect(ctx.body).toStrictEqual({});
  });
});
