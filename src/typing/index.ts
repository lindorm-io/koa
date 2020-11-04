import { ParameterizedContext } from "koa";
import { Logger } from "@lindorm-io/winston";
import { TObject } from "@lindorm-io/core";
import { IRouterParamContext } from "koa-router";

export interface IKoaAppContext extends ParameterizedContext<any, IRouterParamContext<any, Record<any, unknown>>> {
  id: string;
  metrics: TObject<number>;
  logger: Logger;
}
