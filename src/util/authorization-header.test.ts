import { getAuthorization } from "./authorization-header";
import {
  InvalidAuthorizationHeaderLengthError,
  InvalidAuthorizationHeaderTypeError,
  MissingAuthorizationHeaderError,
} from "../error";

describe("authorization-header.ts", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      get: () => null,
    };
  });

  test("should return an object with Basic type and value", () => {
    ctx.get = () => "Basic base64";

    expect(getAuthorization(ctx)()).toStrictEqual({
      type: "Basic",
      value: "base64",
    });
  });

  test("should return an object with Bearer type and value", () => {
    ctx.get = () => "Bearer jwt.jwt.jwt";

    expect(getAuthorization(ctx)()).toStrictEqual({
      type: "Bearer",
      value: "jwt.jwt.jwt",
    });
  });

  test("should throw an error when header is unavailable", () => {
    expect(() => getAuthorization(ctx)()).toThrow(expect.any(MissingAuthorizationHeaderError));
  });

  test("should throw an error when header is too short", () => {
    ctx.get = () => "one";

    expect(() => getAuthorization(ctx)()).toThrow(expect.any(InvalidAuthorizationHeaderLengthError));
  });

  test("should throw an error when header is too long", () => {
    ctx.get = () => "one two three";

    expect(() => getAuthorization(ctx)()).toThrow(expect.any(InvalidAuthorizationHeaderLengthError));
  });

  test("should throw an error when header type is unexpected", () => {
    ctx.get = () => "one two";

    expect(() => getAuthorization(ctx)()).toThrow(expect.any(InvalidAuthorizationHeaderTypeError));
  });
});
