# Generate One Nunjucks Module

Use `/rules` constraints.

Input:
- `projectName`
- `module`
- `slots` (optional)
- `componentsUsed` (optional)
- `variant` (required only when `module=card-list`)

Rules:
- Output target path is `src/_includes/modules/{projectName}/{module}.njk`.
- Use grid-first module skeleton:
  - `p-{projectName}-{module}`
  - `p-{projectName}-{module}__grid`
- Use placeholder content.
- Use `includePath()` with correct relative depth.
- Module -> component include:
  `{% include includePath('../../components/{component}.njk') %}`

Return only the module `.njk` content.
