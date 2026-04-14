PROMPT: page_planner_lite

Use `0_rules.md`.

TASK
Plan LP page structure only (no template code).

INPUT
- `projectName` (required)
- `sections` (or `modules`)
- `useStandardCatalog` (true/false, optional)

Standard catalog (when enabled):
- `hero`
- `feature`
- `media-text`
- `card-list:{variant}`
- `faq`
- `cta`

card-list variants:
- `card-list-grid`
- `card-list-media`
- `card-list-feature`
- `card-list-slider`

OUTPUT
1. LP rename/update checklist:
   - `src/pages/lp/plan/template.njk` -> `src/pages/lp/plan/{projectName}.njk`
   - `{% set pageName = "template" %}` -> `{% set pageName = "{projectName}" %}`
   - `p-sample` -> `p-{projectName}`
   - `.env` `DIRECTORY_NAME="template"` -> `DIRECTORY_NAME="{projectName}"`
   - keep `ASSETS_PATH` unchanged unless explicitly requested
2. Component vs Module decision
3. File tree
4. One-line description per module

Keep output concise.
