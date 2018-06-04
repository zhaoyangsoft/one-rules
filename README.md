# One-Rules

# 目标：dp-lintes

沉淀一系列的 经过 Dataphin Merged MR 的开发规则,   统一开发规范， 提高代码的健壮性； 防范于未然；

# dp-lintes 规则梳理

所有人可以在这里补充 能够想象到的 lint 规则;

## Lint1

author: mickle.zy
ruleName: slice-rule
desc: warn the tip info when use slice in array ; 常量使用 slice 有风向， 改了之后 所有的 slice 需要重新改
example: .slice(0, 3)

## Lint2

author: mickle.zy
ruleName: multi if warn enum
desc: 多个 if   判断字符串的时候 可以提示使用 enum
example：

```js
if (filterItem.id === 'projectId') {
        ...
      }

      if (filterItem.id === 'physicalTableName') {
        ...
      }

      if (filterItem.id === 'summaryIndexCatalog') {
        ...
      }
```

## Lint3:

author: mickle.zy
ruleName: enum-annotate  
desc: 枚举每一项都需要有注释;

## Lint4:

author: huiying
ruleName: 方法块的行数；
desc:
方法块的行数限制

## Lint5：

author: qiyang
ruleName: 单个字符的变量， warn

## Lint6：

author: mickle.zy
ruleName: Boolean check
desc: Use Boolean

```js
// before
const showAll = selectedAttr !== "" ? true : false;

// after
const showAll = selectedAttr !== "";
```

## styleLint7：

author: mickle.zy
ruleName: use more brief method
desc: replace 'white' with '#fff'

```css
// before
background: white;

// after
background: #F;
```

## Lint8：undefined

author: mickle.zy
ruleName: Empty-string-checker
desc: Empty character string, Judge

```js
// before
const searchColumns = selectedAttr !== "" ? "xx" : "ff";

// after
const searchColumns = selectedAttr ? "xx" : "ff";
```

## Lint9：

author: mickle.zy
ruleName: length_0_chekcer
desc: length 0 chekcer

```js
// before
const searchColumns = value.length > 0 ? "xx" : "ff";

// after
const searchColumns = value.length ? "xx" : "ff";
```

## Lint10：在国际化

author: mickle.zy, wuling
ruleName: 源代码文件里面的全角半角检测。
desc: 代码文件里的全角半角检测

## Lint11：

author: mickle.zy
ruleName: Enum 命名规则；（官方 ts enum ）
desc: enum 名称 首字母大写， 驼峰， enum 变量名 规范也用驼峰? 待定

```js
// before
enum formType

// after
enum FormType



// before
enum FormType {
  fileName:1
}

// after
enum FormType {
  FileName:1
}
```

## Lint12：

author: mickle.zy
ruleName: callback handle name;
desc: 回调函数 以 handle 开始

## Lint13：

author: mickle.zy
ruleName:  
desc: addListener 后， 要 remove 掉

## Lint14：

author: mickle.zy
ruleName: .
desc: 如果有 多个 if (>4 个)， 则用 switch 替换， (checkcase 固定的值)

## Lint15：

author: mickle.zy
ruleName: no-display-chinese-in-text
desc: 中文是否仅存在于语言包中(显示的内容不能直接包含中文)

## Lint16：

author: mickle.zy
ruleName:  
desc: pages 里边 setState 需要有一条注释.

## Lint17：

author: wuling
ruleName:  
desc: 检验时间格式是否经过国际化处理
