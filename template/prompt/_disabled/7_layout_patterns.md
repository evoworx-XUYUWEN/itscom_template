PROMPT: layout_patterns_lite

Use `0_rules.md`.

目标
- 只生成模块或组件内容，不做页面规划。
- 不创建文件，不改路径，不解释。

输入
- `projectName`（必填）
- `module`（必填）
- `pattern`（必填，例如：`hamburger-menu` / `card-loop`）
- `slots`（可选）
- `componentsUsed`（可选）
- `items`（可选，循环数据）

通用规则
- 只输出 `.njk` 内容。
- 模块输出路径约定：`src/_includes/modules/{projectName}/{module}.njk`
- 组件输出路径约定：`src/_includes/components/{component}.njk`
- 页面只 include 模块；模块里 include 组件。
- include 必须用 `includePath()`。
- 图片/链接必须用 `imgPath` / `hrefPath` / `pageUrl` / `ogpPath`。
- 禁止硬编码生产路径。
- 文案使用占位内容。

输出约束
- 若 `pattern = hamburger-menu`：使用 `7_1_layout_hamburger_menu.md` 规则。
- 若 `pattern = card-loop`：使用 `7_2_layout_card_loop.md` 规则。
