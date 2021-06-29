import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import userAgent from "koa-useragent";
import { IntervalWorker } from "./IntervalWorker";
import { Logger } from "@lindorm-io/winston";
import { Middleware } from "../typing";
import {
  agentMiddleware,
  caseSwitchMiddleware,
  defaultStatusMiddleware,
  errorMiddleware,
  initContextMiddleware,
  metadataMiddleware,
  responseTimeMiddleware,
  sessionLoggerMiddleware,
  utilContextMiddleware,
} from "../middleware/private";

interface Options {
  logger: Logger;
  port: number;
}

export class KoaApp {
  public readonly app: Koa;
  public readonly router: Router;

  private readonly logger: Logger;
  private readonly middleware: Array<Middleware<any>>;
  private readonly port: number;
  private readonly workers: Array<IntervalWorker>;

  private loaded: boolean;

  public constructor(options: Options) {
    this.app = new Koa();
    this.router = new Router();

    this.loaded = false;
    this.logger = options.logger;
    this.middleware = [
      userAgent,
      bodyParser(),
      defaultStatusMiddleware,
      caseSwitchMiddleware,
      initContextMiddleware,
      utilContextMiddleware,
      agentMiddleware,
      metadataMiddleware,
      sessionLoggerMiddleware({ logger: this.logger }),
      errorMiddleware,
      responseTimeMiddleware,
    ];
    this.port = options.port;
    this.workers = [];
  }

  public callback(): any {
    if (!this.loaded) {
      this.load();
    }

    return this.app.callback();
  }

  public addMiddleware(middleware: Middleware<any>): void {
    this.middleware.push(middleware);
  }

  public addRoute(route: string, router: Router): void {
    this.router.use(route, router.routes(), router.allowedMethods());
  }

  public addWorker(worker: IntervalWorker): void {
    this.workers.push(worker);
  }

  public load(): void {
    this.loaded = true;

    this.loadMiddleware();
    this.loadRouter();
    this.loadEmitter();

    this.logger.info("app is loaded");
  }

  public async start(): Promise<void> {
    if (!this.loaded) {
      this.load();
    }

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
    this.app.on("error", (error): void => {
      console.error("app caught error", error);
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
