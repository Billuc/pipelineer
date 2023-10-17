import { Pipeline } from "./pipeline";
import { PipelineError } from "./pipeline-error";
import { PipelineMiddleware } from "./pipeline-middleware";

export class PipelineManager<TRequest, TResult> {
  private _middlewares: Array<PipelineMiddleware<TRequest, TResult>>;

  constructor() {
    this._middlewares = new Array<PipelineMiddleware<TRequest, TResult>>();
  }

  push(middleware: PipelineMiddleware<TRequest, TResult>): number {
    return this._middlewares.push(middleware);
  }

  unshift(middleware: PipelineMiddleware<TRequest, TResult>): number {
    return this._middlewares.unshift(middleware);
  }

  build(): Pipeline<TRequest, TResult> {
    if (this._middlewares.length === 0) {
      throw new PipelineError("Cannot build a pipeline with 0 middlewares");
    }

    return new Pipeline<TRequest, TResult>(this._middlewares);
  }
}
