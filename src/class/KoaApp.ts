import Koa, { Middleware } from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import userAgent from "koa-useragent";
import { IntervalWorker } from "./IntervalWorker";
import { Logger } from "@lindorm-io/winston";
import { correlationIdMiddleware, errorMiddleware, metricsMiddleware, sessionLoggerMiddleware } from "../middleware";

export interface IKoaAppOptions {
  logger: Logger;
  port: number;
}

export class KoaApp {
  readonly app: Koa;
  readonly router: Router;

  private logger: Logger;
  private middleware: Array<Middleware>;
  private port: number;
  private workers: Array<IntervalWorker>;

  constructor(options: IKoaAppOptions) {
    this.app = new Koa();
    this.router = new Router();

    this.logger = options.logger;
    this.middleware = [
      userAgent,
      bodyParser(),
      correlationIdMiddleware,
      sessionLoggerMiddleware({ logger: this.logger }),
      metricsMiddleware,
      errorMiddleware,
    ];
    this.port = options.port;
    this.workers = [];
  }

  public addMiddleware(middleware: Middleware): void {
    this.middleware.push(middleware);
  }

  public addRoute(route: string, router: Router): void {
    this.router.use(route, router.routes(), router.allowedMethods());
  }

  public addWorker(worker: IntervalWorker): void {
    this.workers.push(worker);
  }

  public async start(): Promise<void> {
    this.loadMiddleware();
    this.loadRouter();
    this.loadEmitter();

    this.listen();

    await this.waitForStartEvent();

    this.logger.info("app has started");
  }

  private listen(): void {
    this.app.listen(this.port, (): void => {
      this.logger.info(`listening on server port: ${this.port}`);
      this.app.emit("start");
    });
  }

  private loadEmitter(): void {
    this.app.on("error", (eventData: any): void => {
      this.logger.error("app caught error", eventData);
    });

    this.app.on("start", (): void => {
      this.loadWorkers();
    });
  }

  private loadMiddleware(): void {
    for (const middleware of this.middleware) {
      this.app.use(middleware);
    }
  }

  private loadRouter(): void {
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  private loadWorkers(): void {
    for (const worker of this.workers) {
      worker.start();
      worker.trigger();
    }
  }

  private async waitForStartEvent(): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("app start has timed out"));
      }, 30000);
      this.app.on("start", () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }
}

export { Router };
