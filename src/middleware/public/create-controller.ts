import { Controller, KoaContext } from "../../typing";
import { snakeKeys } from "@lindorm-io/core";
import { HttpStatus } from "../../constant";

export const createController =
  (controller: Controller) =>
  async (ctx: KoaContext): Promise<void> => {
    const { data, redirect, status } = await controller(ctx);

    if (redirect) {
      const url = new URL(redirect);

      if (data) {
        const converted = snakeKeys(data);

        for (const [key, value] of Object.entries(converted)) {
          url.searchParams.append(key, encodeURI(value));
        }
      }

      ctx.redirect(url.toString());
    } else {
      ctx.body = data || undefined;
      ctx.status = status || HttpStatus.Success.NO_CONTENT;
    }
  };
