import MockDate from "mockdate";
import { caseSwitchMiddleware } from "./case-switch-middleware";

MockDate.set("2020-01-01T08:00:00.000Z");

const next = () => Promise.resolve();

describe("bodyCaseSwitchMiddleware", () => {
  const array = ["array"];
  const date = new Date();
  const error = new Error("error");
  const string = "string";

  let ctx: any;

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
      params: {
        camelCase: "camelCase",
        PascalCase: "PascalCase",
        snake_case: "snake_case",
        array,
        date,
        error,
        string,
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
  });

  test("should transform all incoming body to camelCase", async () => {
    await expect(caseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.request.body).toMatchSnapshot();
  });

  test("should transform all incoming params to camelCase", async () => {
    await expect(caseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.params).toMatchSnapshot();
  });

  test("should transform all outgoing body to snake_case", async () => {
    await expect(caseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.body).toMatchSnapshot();
  });

  test("should not fail if data is undefined", async () => {
    ctx = { params: undefined, request: { body: undefined }, body: undefined };

    await expect(caseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.params).toStrictEqual({});
    expect(ctx.request.body).toStrictEqual({});
    expect(ctx.body).toBeUndefined();
  });

  test("should not convert response body when not object", async () => {
    ctx = { params: "", request: { body: {} }, body: "string" };

    await expect(caseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.body).toBe("string");
  });
});
