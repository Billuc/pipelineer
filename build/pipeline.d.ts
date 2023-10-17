import { PipelineMiddleware } from "./pipeline-middleware";
export declare class Pipeline<TRequest, TResult> {
    private _middlewares;
    constructor(middlewares: Array<PipelineMiddleware<TRequest, TResult>>);
    exec(request: TRequest): TResult;
    private execMiddleware;
}
