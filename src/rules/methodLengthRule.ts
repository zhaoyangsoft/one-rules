import * as ts from "typescript";
import * as Lint from "tslint";
import { IOptions } from "tslint";
import * as _ from "lodash";

/**
 *
 */

const DEF_LIMIT_NUM = 30;

interface MethodLengthRuleOptions extends IOptions {
  // 最多行限制
  limit: number;
}

export class Rule extends Lint.Rules.AbstractRule {
  public isEnabled(): boolean {
    const limit = this.getRuleOptions().limit;
    return super.isEnabled() && limit > 0;
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    // We convert the `ruleArguments` into a useful format before passing it to the constructor of AbstractWalker.
    // return this.applyWithWalker(new MethodLengthWalker(sourceFile, this.getRuleOptions()));
    return this.applyWithWalker(
      new MethodLengthWalker(sourceFile, this.getOptions())
    );
  }

  private getRuleOptions(): MethodLengthRuleOptions {
    const argument = this.ruleArguments[0];
    let options: MethodLengthRuleOptions = {
      limit: DEF_LIMIT_NUM,
      ruleArguments: this.ruleArguments,
      ruleSeverity: this.ruleSeverity,
      ruleName: this.ruleName,
      disabledIntervals: []
    };
    if (typeof argument === "number") {
      options.limit = argument;
    } else {
      if (argument) options = argument as MethodLengthRuleOptions;
    }
    options.limit = Number(options.limit); // user can pass a string instead of number
    return options;
  }
}

// The type parameter of AbstractWalker corresponds to the third constructor parameter.
class MethodLengthWalker extends Lint.RuleWalker {
  public walk(node: ts.Node) {
    super.walk(node);
  }

  public visitArrowFunction(node: ts.ArrowFunction) {
    this.checkMethodLength(node, node.getFullText());
    super.visitArrowFunction(node);
  }

  public checkMethodLength(node: ts.ArrowFunction, body: string) {
    const options: MethodLengthRuleOptions = this.getOptions();
    const limitNum = _.get(options, "[0].limit", DEF_LIMIT_NUM);
    // 可以通过参数配置
    if (body.split("\n").length > limitNum) {
      this.addFailure(
        this.createFailure(
          node.getStart(),
          node.getWidth(),
          `方法行数不能超过 ${limitNum} 行，请重构 `
        )
      );
    }
  }
}
