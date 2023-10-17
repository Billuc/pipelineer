"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
var pipeline_error_1 = require("./pipeline-error");
var Pipeline = (function () {
    function Pipeline(middlewares) {
        this._middlewares = middlewares;
    }
    Pipeline.prototype.exec = function (request) {
        return this.execMiddleware(request, 0);
    };
    Pipeline.prototype.execMiddleware = function (request, index) {
        var _this = this;
        if (index < 0 || index >= this._middlewares.length) {
            throw new pipeline_error_1.PipelineError("Middleware index out of bounds : " + index);
        }
        var middleware = this._middlewares[index];
        var next = index == this._middlewares.length - 1
            ? function (req) { return undefined; }
            : function (req) { return _this.execMiddleware(req, index + 1); };
        try {
            return middleware.exec(request, next);
        }
        catch (e) {
            throw new pipeline_error_1.PipelineError("Error occured during execution of middleware ".concat(index, " :\n").concat(e));
        }
    };
    return Pipeline;
}());
exports.Pipeline = Pipeline;
//# sourceMappingURL=pipeline.js.map