# Generate Reusable Component

Use `/rules` constraints.

Generate one reusable component in:
- `src/_includes/components/{component}.njk`

Rules:
- Prefix must be `c-`.
- If macro style is needed, use:
  `{% macro componentName(props) %}`
- Use placeholder content only.

Return only the component `.njk` content.
