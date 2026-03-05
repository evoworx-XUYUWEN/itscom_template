PROMPT: module_generator_lite

Use `0_rules.md`.

TASK
Generate one Nunjucks module file only.

INPUT
- `projectName` (required)
- `module`
- `slots` (optional)
- `componentsUsed` (optional)
- `variant` (required only when `module=card-list`)

RULES
- Output path target is `src/_includes/modules/{projectName}/{module}.njk`.
- Use grid-first module skeleton.
- Use placeholder content.
- For component include, use:
  `{% include includePath('../../components/{component}.njk') %}`

OUTPUT
- Return only the module `.njk` content.
