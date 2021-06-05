import { KoaContext } from "../typing";
import { Logger } from "@lindorm-io/winston";

export abstract class KoaContextAware {
  protected readonly ctx: KoaContext;
  protected readonly logger: Logger;

  public constructor(ctx: KoaContext) {
    this.ctx = ctx;
    this.logger = ctx.logger.createChildLogger(this.constructor.name || "KoaContextAware");
  }
}
