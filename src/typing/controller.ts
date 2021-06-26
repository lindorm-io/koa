import { KoaContext } from "./context";

export type ControllerResponse<ResponseData> = Promise<{
  data?: ResponseData;
  redirect?: string;
  status?: number;
}>;

export type Controller<
  Context extends KoaContext = KoaContext,
  ResponseData extends Record<string, any> = Record<string, any>,
> = (ctx: Context) => ControllerResponse<ResponseData>;
