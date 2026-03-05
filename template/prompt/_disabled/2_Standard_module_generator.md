PROMPT: standard_module_generator_wrapper

Use `2_module_generator.md` with standard constraints:

- If `module = card-list`, `variant` is required and must be one of:
  - `card-list-grid`
  - `card-list-media`
  - `card-list-feature`
  - `card-list-slider`

Input required:
- `projectName`
- `module`
- `variant` (only for card-list)

Output:
- Return only the module `.njk` content.
