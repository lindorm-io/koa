import { KoaContext, Middleware } from "../../typing";
import { RedirectError } from "@lindorm-io/errors";
import { get } from "lodash";

export const redirectErrorMiddleware =
  (path: string): Middleware<KoaContext> =>
  async (ctx, next): Promise<void> => {
    try {
      await next();
    } catch (err) {
      const redirectUri = get(ctx, path);

      if (redirectUri) {
        throw new RedirectError(err.message, {
          code: err.code || err.data.code || "unexpected_error",
          description: err.description || err.data.description,
          error: err,
          redirect: redirectUri,
          uri: err.uri || err.data.uri,
          state: err.state || err.data.state,
        });
      }

      throw err;
    }
  };
