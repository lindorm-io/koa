import MockDate from "mockdate";
import { bodyCaseSwitchMiddleware } from "./body-case-switch-middleware";

MockDate.set("2020-01-01T08:00:00.000Z");

describe("bodyCaseSwitchMiddleware", () => {
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
    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();
    expect(ctx.request.body).toMatchSnapshot();
  });

  test("should transform all outgoing body to snake_case", async () => {
    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();
    expect(ctx.body).toMatchSnapshot();
  });

  test("should not fail if there is no body", async () => {
    ctx = { request: { body: undefined }, body: undefined };

    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();
    expect(ctx.request.body).toStrictEqual({});
    expect(ctx.body).toBeUndefined();
  });

  test("should not convert when body is not object", async () => {
    ctx = { request: { body: "string" }, body: "string" };

    await expect(bodyCaseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();
    expect(ctx.request.body).toStrictEqual({});
    expect(ctx.body).toBe("string");
  });
});
