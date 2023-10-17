export interface PipelineMiddleware<TRequest, TResult> {
    exec(request: TRequest, next: (request: TRequest) => TResult | undefined): TResult;
}