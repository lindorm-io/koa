import Joi from "joi";
import { schemaMiddleware } from "./schema-middleware";
import { ClientError } from "@lindorm-io/errors";

const next = () => Promise.resolve();

describe("schemaMiddleware", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      request: { body: { string: "string", number: 12345 } },
    };
  });

  test("should resolve with validation", async () => {
    await expect(
      schemaMiddleware(
        "request.body",
        Joi.object({
          string: Joi.string().required(),
          number: Joi.number().required(),
        }),
      )(ctx, next),
    ).resolves.toBeUndefined();
  });

  test("should throw ClientError", async () => {
    await expect(
      schemaMiddleware(
        "request.body",
        Joi.object({
          string: Joi.number().required(),
          number: Joi.string().required(),
        }),
      )(ctx, next),
    ).rejects.toThrow(ClientError);
  });
});
