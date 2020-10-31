import { Context } from "koa";
import { Logger } from "@lindorm-io/winston";
import { TObject } from "@lindorm-io/core";

export interface IKoaAppContext extends Context {
  id: string;
  metrics: TObject<number>;
  logger: Logger;
}
