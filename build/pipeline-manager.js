"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineManager = void 0;
var pipeline_1 = require("./pipeline");
var pipeline_error_1 = require("./pipeline-error");
var PipelineManager = (function () {
    function PipelineManager() {
        this._middlewares = new Array();
    }
    PipelineManager.prototype.push = function (middleware) {
        return this._middlewares.push(middleware);
    };
    PipelineManager.prototype.unshift = function (middleware) {
        return this._middlewares.unshift(middleware);
    };
    PipelineManager.prototype.build = function () {
        if (this._middlewares.length === 0) {
            throw new pipeline_error_1.PipelineError("Cannot build a pipeline with 0 middlewares");
        }
        return new pipeline_1.Pipeline(this._middlewares);
    };
    return PipelineManager;
}());
exports.PipelineManager = PipelineManager;
//# sourceMappingURL=pipeline-manager.js.map