import type { KoaContext } from "../typing";
import { Logger } from "@lindorm-io/winston";

export abstract class KoaContextAware<Context extends KoaContext> {
  protected readonly ctx: Context;
  protected readonly logger: Logger;

  public constructor(ctx: Context) {
    this.ctx = ctx;
    this.logger = ctx.logger.createChildLogger(this.constructor.name || "KoaContextAware");
  }
}
