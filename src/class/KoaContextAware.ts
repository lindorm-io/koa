import { IKoaAppContext } from "../typing";

export abstract class KoaContextAware {
  protected ctx: IKoaAppContext;

  public constructor(ctx: IKoaAppContext) {
    this.ctx = ctx;
  }
}
