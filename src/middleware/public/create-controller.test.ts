import { createController } from "./create-controller";
import { Controller } from "../../typing";
import { HttpStatus } from "../../constant";

describe("createController", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      redirect: jest.fn(),
      request: { body: { string: "string" } },
    };
  });

  afterEach(jest.clearAllMocks);

  test("should resolve status and data", async () => {
    const controller: Controller = async (ctx) => {
      return {
        status: HttpStatus.Success.CREATED,
        data: ctx.request.body,
      };
    };

    await expect(createController(controller)(ctx)).resolves.toBeUndefined();

    expect(ctx.body).toStrictEqual({ string: "string" });
    expect(ctx.status).toStrictEqual(201);
    expect(ctx.redirect).not.toHaveBeenCalled();
  });

  test("should resolve redirect with query parameters", async () => {
    const controller: Controller = async (ctx) => {
      return {
        data: {
          queryParamOne: "string",
          twoNumber: 22,
        },
        redirect: "https://test.lindorm.io/",
      };
    };

    await expect(createController(controller)(ctx)).resolves.toBeUndefined();

    expect(ctx.body).toBeUndefined();
    expect(ctx.status).toBeUndefined();
    expect(ctx.redirect).toHaveBeenCalledWith("https://test.lindorm.io/?query_param_one=string&two_number=22");
  });
});
