import { KoaContext } from "./context";

export interface ControllerResponse<ResponseBody> {
  body: ResponseBody;
  status: number;
}

export type Controller<Context extends KoaContext = KoaContext, ResponseBody = unknown> = (
  ctx: Context,
) => Promise<ControllerResponse<ResponseBody>>;
