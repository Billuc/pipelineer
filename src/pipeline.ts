import { PipelineError } from "./pipeline-error";
import { PipelineMiddleware } from "./pipeline-middleware";

export class Pipeline<TRequest, TResult> {
  private _middlewares: Array<PipelineMiddleware<TRequest, TResult>>;

  constructor(middlewares: Array<PipelineMiddleware<TRequest, TResult>>) {
    this._middlewares = middlewares;
  }

  exec(request: TRequest): TResult {
    return this.execMiddleware(request, 0);
  }

  private execMiddleware(request: TRequest, index: number): TResult {
    if (index < 0 || index >= this._middlewares.length) {
      throw new PipelineError("Middleware index out of bounds : " + index);
    }

    const middleware = this._middlewares[index];
    const next =
      index == this._middlewares.length - 1
        ? (req: TRequest) => undefined
        : (req: TRequest) => this.execMiddleware(req, index + 1);

    try {
      return middleware.exec(request, next);
    } catch (e: any) {
      throw new PipelineError(
        `Error occured during execution of middleware ${index} :\n${e}`
      );
    }
  }
}
