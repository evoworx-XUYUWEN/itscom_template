# Nunjucks LP Rules

Follow these project rules strictly:

- Do not create an extra page.
- Rename `src/pages/lp/plan/template.njk` to `src/pages/lp/plan/{projectName}.njk`.
- In the page file, replace `{% set pageName = "template" %}` with `{% set pageName = "{projectName}" %}`.
- Replace all `p-sample` classes with `p-{projectName}`.
- Read `.env`, then change `DIRECTORY_NAME` from `"template"` to `"{projectName}"`.
- Keep `ASSETS_PATH` following current convention unless explicitly requested to change.
- Page entry path: `src/pages/lp/plan/{projectName}.njk`.
- Page modules path: `src/_includes/modules/{projectName}/{module}.njk`.
- Reusable components path: `src/_includes/components/{component}.njk`.
- Page files only include modules; modules include components.
- Use `includePath()` for all includes.
- Page -> module include:
  `{% include includePath('../_includes/modules/{projectName}/{module}.njk') %}`
- Module -> component include:
  `{% include includePath('../../components/{component}.njk') %}`
- Use filters: `imgPath`, `hrefPath`, `pageUrl`, `ogpPath`.
- Never hardcode production paths.
- Use placeholder content only; no real marketing claims.
- Use BEM with prefixes: `l-`, `c-`, `p-`, `u-`, `js-`.

Return concise output only.
