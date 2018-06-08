"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var _ = require("lodash");
/**
 *
 */
var DEF_LIMIT_NUM = 30;
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.isEnabled = function () {
        var limit = this.getRuleOptions().limit;
        return _super.prototype.isEnabled.call(this) && limit > 0;
    };
    Rule.prototype.apply = function (sourceFile) {
        // We convert the `ruleArguments` into a useful format before passing it to the constructor of AbstractWalker.
        // return this.applyWithWalker(new MethodLengthWalker(sourceFile, this.getRuleOptions()));
        return this.applyWithWalker(new MethodLengthWalker(sourceFile, this.getOptions()));
    };
    Rule.prototype.getRuleOptions = function () {
        var argument = this.ruleArguments[0];
        var options = {
            limit: DEF_LIMIT_NUM,
            ruleArguments: this.ruleArguments,
            ruleSeverity: this.ruleSeverity,
            ruleName: this.ruleName,
            disabledIntervals: []
        };
        if (typeof argument === "number") {
            options.limit = argument;
        }
        else {
            if (argument)
                options = argument;
        }
        options.limit = Number(options.limit); // user can pass a string instead of number
        return options;
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The type parameter of AbstractWalker corresponds to the third constructor parameter.
var MethodLengthWalker = /** @class */ (function (_super) {
    __extends(MethodLengthWalker, _super);
    function MethodLengthWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MethodLengthWalker.prototype.walk = function (node) {
        _super.prototype.walk.call(this, node);
    };
    MethodLengthWalker.prototype.visitArrowFunction = function (node) {
        this.checkMethodLength(node, node.getFullText());
        _super.prototype.visitArrowFunction.call(this, node);
    };
    MethodLengthWalker.prototype.checkMethodLength = function (node, body) {
        var options = this.getOptions();
        var limitNum = _.get(options, "[0].limit", DEF_LIMIT_NUM);
        // 可以通过参数配置
        if (body.split("\n").length > limitNum) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), "\u65B9\u6CD5\u884C\u6570\u4E0D\u80FD\u8D85\u8FC7 " + limitNum + " \u884C\uFF0C\u8BF7\u91CD\u6784. \u3010Tip By One-Rules\u3011"));
        }
    };
    return MethodLengthWalker;
}(Lint.RuleWalker));
