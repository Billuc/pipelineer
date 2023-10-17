import { Pipeline } from "./pipeline";
import { PipelineMiddleware } from "./pipeline-middleware";
export declare class PipelineManager<TRequest, TResult> {
    private _middlewares;
    constructor();
    push(middleware: PipelineMiddleware<TRequest, TResult>): number;
    unshift(middleware: PipelineMiddleware<TRequest, TResult>): number;
    build(): Pipeline<TRequest, TResult>;
}
