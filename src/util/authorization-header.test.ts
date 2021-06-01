import { getAuthorizationHeader } from "./authorization-header";
import {
  InvalidAuthorizationHeaderLengthError,
  InvalidAuthorizationHeaderTypeError,
  MissingAuthorizationHeaderError,
} from "../error";

describe("authorization-header.ts", () => {
  test("should return an object with Basic type and value", () => {
    expect(getAuthorizationHeader("Basic mock-value-string")).toStrictEqual({
      type: "Basic",
      value: "mock-value-string",
    });
  });

  test("should return an object with Bearer type and value", () => {
    expect(getAuthorizationHeader("Bearer mock-value-string")).toStrictEqual({
      type: "Bearer",
      value: "mock-value-string",
    });
  });

  test("should throw an error when header is unavailable", () => {
    // @ts-ignore
    expect(() => getAuthorizationHeader(null)).toThrow(expect.any(MissingAuthorizationHeaderError));
  });

  test("should throw an error when header is too short", () => {
    expect(() => getAuthorizationHeader("one")).toThrow(expect.any(InvalidAuthorizationHeaderLengthError));
  });

  test("should throw an error when header is too long", () => {
    expect(() => getAuthorizationHeader("one two three")).toThrow(expect.any(InvalidAuthorizationHeaderLengthError));
  });

  test("should throw an error when header type is unexpected", () => {
    expect(() => getAuthorizationHeader("one two")).toThrow(expect.any(InvalidAuthorizationHeaderTypeError));
  });
});
