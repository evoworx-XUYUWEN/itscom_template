# Clean SCSS Spacing Declarations

Only normalize spacing declarations.

Rules:
- Do not redesign styles.
- Do not change selectors.
- Do not change numeric values (including values in `vw()` and `min()`).

Allowed cleanup:
1. Merge vertical margins:
   - `margin-top: A; margin-bottom: A;` -> `margin: A 0;`
2. Merge horizontal paddings:
   - `padding-left: A; padding-right: A;` -> `padding: 0 A;`
3. Merge full paddings:
   - top/right/bottom/left -> `padding: T R;` (when valid)
4. Remove duplicate spacing declarations.
5. Preserve existing `vw()` expressions.

Never touch:
- `font-weight`, `line-height`, `z-index`, `opacity`
- `border`, `box-shadow`, `transform`, `animation`, `transition`

If uncertain, do not modify.

Return cleaned SCSS only.
