PROMPT: layout_card_loop_lite

Use `0_rules.md`.

任务
- 生成一个“卡片循环”模块 `.njk`。
- 输出仅限模块内容。

输入
- `projectName`（必填）
- `module`（建议默认 `card-list`）
- `variant`（可选：`basic` / `media` / `feature`）
- `items`（可选，循环数据）
- `componentsUsed`（可选，例如 `card-basic`）

结构要求
- 外层 block：`p-{projectName}-{module}`
- 必含：
  - `__grid`
  - `__list`
  - `__item`
- 如果传入 `componentsUsed`：
  - 在模块中用 `includePath('../../components/{component}.njk')` include 组件
  - 循环里传 item 给组件（按 `props` 形式）

循环规则
- 优先使用：`{% for item in items %}`
- 若无 `items`：输出 3 张占位卡片
- 不写真实营销文案

路径与过滤器
- 图片路径用 `| imgPath`
- 链接路径用 `| hrefPath`

输出
- 仅返回模块 `.njk` 内容。
