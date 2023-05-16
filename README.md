# 个人工具集 Personal Toolbox

[在线使用](https://iwctwbh.github.io/Tools/Home/)
[Online](https://iwctwbh.github.io/Tools/Home/)

有bug可提issue，或者直接联系我。
If you find bug, please mention the issue or contact me directly.

如果对你有帮助，欢迎star。
If it helps you, please star.

## 现包含以下 Include Of

### 工具 Tools

#### [日志过滤 LogFilter](https://iwctwbh.github.io/Tools/LogFilter)

自动识别日期时间，可按时间过滤或正则过滤。
Automatically recognize date and time, can filter by time or regular expression.

#### [Json格式化 JsonFormat](https://iwctwbh.github.io/Tools/JsonFormat)

Json格式化，以及逆格式化。
Json format, and reverse format.

#### [文本对比 WordCompare](https://iwctwbh.github.io/Tools/WordCompare)

文本差异对比。
Text difference comparison.

#### [UUID生成 UUIDCreate](https://iwctwbh.github.io/Tools/UUIDCreate)

UUID生成，随机数生成。
UUID create, random number create.

#### [大小写转换 CaseConvert](https://iwctwbh.github.io/Tools/CaseConvert)

大小写转换，驼峰转换。
Case convert, camel case convert.

#### [正则替换 RegexReplace](https://iwctwbh.github.io/Tools/RegexReplace)

开发中。

### 小游戏 Game

#### [猜数游戏 GuessNumber](https://iwctwbh.github.io/Tools/GuessNumber)

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue
3 `<script setup>` SFCs, check out
the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [Webstorm](https://www.jetbrains.com/webstorm/)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type
by default. In most cases this is fine if you don't really care about component prop types outside of templates.
However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using
manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look
   for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default,
   Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
