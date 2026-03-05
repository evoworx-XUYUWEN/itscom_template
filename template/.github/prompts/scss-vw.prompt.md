# Convert SCSS Spacing px to vw()

Only refactor spacing values from `px` to responsive `vw()` expressions.

Rules:
- Do not redesign styles.
- Do not modify selectors.
- Do not change numeric values.
- If already using `vw()` or `min()`, keep unchanged.

PC:
- `margin-top: 32px;` -> `margin-top: min(vw(32, pc), 32px);`

Inside `@include under_md`:
- `margin-top: 32px;` -> `margin-top: min(vw(32, sp));`

Convert only these properties:
- margin / padding / gap / row-gap / column-gap
- top / left / right / bottom
- width / height

Never touch:
- `font-weight`, `line-height`, `z-index`, `opacity`
- `border`, `box-shadow`, `transform`, `animation`, `transition`

Return refactored SCSS only.
