# Plan LP Page Structure

Use `/rules` constraints.

Input:
- `projectName`
- `sections` or `modules`
- `useStandardCatalog` (`true`/`false`)

If standard catalog is enabled, module choices:
- `hero`
- `feature`
- `media-text`
- `card-list:{variant}`
- `faq`
- `cta`

`card-list` variants:
- `card-list-grid`
- `card-list-media`
- `card-list-feature`
- `card-list-slider`

Output:
1. LP rename/update checklist:
   - `src/pages/lp/plan/template.njk` -> `src/pages/lp/plan/{projectName}.njk`
   - `{% set pageName = "template" %}` -> `{% set pageName = "{projectName}" %}`
   - `p-sample` -> `p-{projectName}`
   - `.env` `DIRECTORY_NAME="template"` -> `DIRECTORY_NAME="{projectName}"`
   - keep `ASSETS_PATH` unchanged unless explicitly requested
2. Component vs module decision
3. File tree
4. One-line description per module

Do not generate template code.
