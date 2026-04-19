Extract all class names from the specified njk file and organize them into the corresponding SCSS file as nested BEM selectors with empty rule blocks and comments.

## Steps

1. Read the njk file at `$ARGUMENTS` (e.g. `src/includes/foo.njk`)
2. Extract all unique class names used in the HTML
3. Identify the root block class (the outermost element's class)
4. Determine the corresponding SCSS file path by replacing `src/includes/` with `src/css/object/page/_p-` and `.njk` with `.scss`
5. Read the existing SCSS file if it exists, to preserve any styles already written
6. Rebuild the SCSS file with full BEM nesting:
   - Root block as the top-level selector
   - `-element` parts as `&-element {}`
   - `__modifier` parts as `&__modifier {}`
   - `--variant` parts as `&--variant {}`
   - Add a comment above each selector showing the full compiled class name
   - Preserve any existing CSS properties already written in matching blocks

Example input: `src/includes/service.njk`
Example output path: `src/css/object/page/_p-service.scss`
