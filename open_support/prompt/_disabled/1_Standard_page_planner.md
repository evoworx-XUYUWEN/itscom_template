PROMPT: standard_page_planner_wrapper

Use `1_page_planner.md` with:
- `useStandardCatalog = true`

Input required:
- `projectName`
- requested modules

Output:
1. LP rename/update checklist:
   - `src/pages/lp/plan/template.njk` -> `src/pages/lp/plan/{projectName}.njk`
   - `{% set pageName = "template" %}` -> `{% set pageName = "{projectName}" %}`
   - `p-sample` -> `p-{projectName}`
   - `.env` `DIRECTORY_NAME="template"` -> `DIRECTORY_NAME="{projectName}"`
   - keep `ASSETS_PATH` unchanged unless explicitly requested
2. Component vs Module decision
3. File tree
4. One-line description per module

Do not generate template code.
