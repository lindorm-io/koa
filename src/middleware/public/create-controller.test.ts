import { createController } from "./create-controller";
import { Controller } from "../../typing";
import { HttpStatus } from "../../constant";

describe("createController", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = { request: { body: { string: "string" } } };
  });

  test("should resolve with data", async () => {
    const controller: Controller = async (ctx) => {
      return { status: HttpStatus.Success.CREATED, body: ctx.request.body };
    };

    await expect(createController(controller)(ctx)).resolves.toBeUndefined();

    expect(ctx.body).toStrictEqual({ string: "string" });
    expect(ctx.status).toStrictEqual(201);
  });
});
