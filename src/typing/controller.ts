import { DefaultObject, KoaContext } from "./context";

export type ControllerResponse<ResponseData> = Promise<{
  data?: ResponseData;
  redirect?: string;
  status?: number;
}>;

export type Controller<Context extends KoaContext = KoaContext, ResponseData extends DefaultObject = DefaultObject> = (
  ctx: Context,
) => ControllerResponse<ResponseData>;
