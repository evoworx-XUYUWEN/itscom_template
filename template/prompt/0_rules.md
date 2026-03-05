PROMPT: global_rules_lite

Generate Nunjucks (`.njk`) and SCSS for this existing project only.
Do not generate build/tool configs.

## 1) LP workflow (must follow)

For LP production page tasks:

- Do not create an extra page.
- Rename `src/pages/lp/plan/template.njk` to `src/pages/lp/plan/{projectName}.njk`.
- In that page, replace `{% set pageName = "template" %}` with `{% set pageName = "{projectName}" %}`.
- Replace all `p-sample` classes with `p-{projectName}`.

## 2) `.env` sync (must read)

- Read `.env`.
- Change `DIRECTORY_NAME` from `"template"` to `"{projectName}"`.
- Keep `ASSETS_PATH` following current project convention unless explicitly requested to change.

## 3) Paths and responsibility (must follow)

- Page entry: `src/pages/lp/plan/{projectName}.njk`
- Page modules: `src/_includes/modules/{projectName}/{module}.njk`
- Reusable components: `src/_includes/components/{component}.njk`
- Page files only include modules; modules include components.

## 4) Include rules (must follow)

- Always use `includePath()`.
- Page -> module:
  `{% include includePath('../_includes/modules/{projectName}/{module}.njk') %}`
- Module -> component:
  `{% include includePath('../../components/{component}.njk') %}`

## 5) Path filters (must follow)

- Images: `imgPath` (example: `'/assets/img/xxx.png' | imgPath`)
- Links: `hrefPath`
- Page URL: `pageUrl`
- OGP: `ogpPath`
- Never hardcode production paths.

## 6) Class naming (BEM + prefix)

- Prefixes:
  - `l-` layout
  - `c-` reusable component
  - `p-` page module
  - `u-` utility
  - `js-` JS hook only (never style)
- BEM: `block`, `block__element`, `block--modifier`
- kebab-case only
- Element depth <= 2

## 7) Content safety

- Use placeholder copy only.
- No real business or marketing claims.

## 8) Output discipline

- Output only what the task asks for.
- No extra explanation unless requested.
