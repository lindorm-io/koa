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
          camelCaseOne: "camelCaseOne",
          PascalCaseOne: "PascalCaseOne",
          snake_case_one: "snake_case_one",
          array,
          date,
          error,
          string,
        },
      },
      body: {
        camelCaseTwo: "camelCaseTwo",
        PascalCaseTwo: "PascalCaseTwo",
        snake_case_two: "snake_case_two",
        array,
        date,
        error,
        string,
      },
      params: {
        camelCaseThree: "camelCaseThree",
        PascalCaseThree: "PascalCaseThree",
        snake_case_three: "snake_case_three",
        array,
        date,
        error,
        string,
      },
      query: {
        camelCaseFour: "camelCaseFour",
        PascalCaseFour: "PascalCaseFour",
        snake_case_four: "snake_case_four",
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

  test("should transform all incoming query to camelCase", async () => {
    await expect(caseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.query).toMatchSnapshot();
  });

  test("should merge all incoming data into one object on context", async () => {
    await expect(caseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.data).toMatchSnapshot();
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
    ctx = { params: "", query: "", request: { body: {} }, body: "string" };

    await expect(caseSwitchMiddleware(ctx, next)).resolves.toBeUndefined();

    expect(ctx.body).toBe("string");
  });
});
