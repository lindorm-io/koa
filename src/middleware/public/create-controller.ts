import { Controller, KoaContext } from "../../typing";

export const createController =
  (controller: Controller) =>
  async (ctx: KoaContext): Promise<void> => {
    const { status, body } = await controller(ctx);

    ctx.body = body;
    ctx.status = status;
  };
