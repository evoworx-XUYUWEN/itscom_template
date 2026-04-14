PROMPT: layout_hamburger_menu_lite

Use `0_rules.md`.

任务
- 生成一个可复用的 `hamburger menu` 模块 `.njk`。
- 输出仅限模块内容。

输入
- `projectName`（必填）
- `module`（建议默认 `header-nav`）
- `brandLabel`（可选）
- `menuItems`（可选，默认 4 项）

结构要求
- 外层 block：`p-{projectName}-{module}`
- 必含元素：
  - `__bar`（顶部栏）
  - `__brand`
  - `__toggle`（按钮，含 `aria-expanded` / `aria-controls`）
  - `__panel`（菜单容器）
  - `__list`
  - `__item`
  - `__link`
- JS 仅用 hook class：
  - `js-nav-toggle`
  - `js-nav-panel`

可访问性
- toggle 使用 `<button type="button">`
- `aria-expanded="false"`
- `aria-controls="{projectName}-{module}-panel"`
- panel 使用匹配 `id`

数据与循环
- `menuItems` 存在时，使用 `{% for item in menuItems %}` 循环输出。
- 无数据时输出 4 条占位链接。

路径与过滤器
- 链接一律 `| hrefPath`。
- logo/image（若有）一律 `| imgPath`。

输出
- 仅返回模块 `.njk` 内容。
