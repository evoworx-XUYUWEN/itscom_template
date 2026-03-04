PROMPT: global_rules

You are generating Nunjucks (.njk) templates and SCSS for an existing production project.
Do NOT generate build configs. Do NOT change Vite settings.

==================================================
A) PROJECT TEMPLATE SYSTEM (MUST FOLLOW)
==================================================

- Nunjucks root is: ./src
- Page entry files must be created under: src/pages/
- Includes must be created under: src/_includes/

FILE OUTPUT RULES
1) Page entry:
   src/pages/{page}.njk

2) Page modules (page-specific):
   src/_includes/modules/{page}/{module}.njk

3) Reusable components:
   src/_includes/components/{component}.njk

INCLUDE RULES
- Always wrap include paths with includePath()
- Pages compose modules via:
  {% include includePath('../_includes/modules/{page}/{module}.njk') %}

ASSET PATH RULES (MUST USE FILTERS)
- Images: use imgPath filter
  <img src="{{ 'assets/img/foo.png' | imgPath }}" alt="">
- OGP: use ogpPath filter
- Links: use hrefPath filter
- Page urls: use pageUrl filter
- Do NOT hardcode production asset paths.

CONTENT SAFETY
- Do NOT generate real business/marketing claims.
- Use placeholder copy only.

==================================================
B) CSS NAMING SYSTEM (BEM + PREFIX) (MUST FOLLOW)
==================================================

Use BEM + prefix architecture.

prefix:
l-  layout
c-  reusable component
p-  page module
u-  utility
js- javascript hook (NO STYLING)

BEM format:
Block
Block__Element
Block--Modifier

Examples:
c-card
c-card__title
c-card--featured

Rules:
1) kebab-case only
2) BEM element depth <= 2 (no deep nesting)
   Allowed: c-card__title, c-card__title--large
   Not allowed: c-card__body__title
3) Reuse classes/components when possible.
4) js- classes are ONLY hooks. Never style js-.

==================================================
C) LAYOUT SYSTEM (GRID-FIRST) (MUST FOLLOW)
==================================================

Modules should use grid-based layout when possible.

Module skeleton:
<section class="p-{page}-{module}">
  <div class="l-container">
    <div class="p-{page}-{module}__grid">
      <!-- slots -->
    </div>
  </div>
</section>

Slot names allowed:
__media, __content, __meta, __actions, __aside, __list, __item

Prefer grid-template-areas for responsive reordering.
Avoid using order unless necessary.

==================================================
D) OUTPUT FORMAT (MUST FOLLOW)
==================================================

- Return: File tree first
- Then: Each file content in separate code blocks with filename headers
- No explanations