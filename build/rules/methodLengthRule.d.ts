import * as ts from "typescript";
import * as Lint from "tslint";
export declare class Rule extends Lint.Rules.AbstractRule {
    isEnabled(): boolean;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
    private getRuleOptions();
}
