PROMPT: module-generator

[Use rules from 0_rules.md]

TASK

Generate a Nunjucks module.

Input:

Page name
Module name

If module = card-list
you must also receive:

variant:
card-list-grid
card-list-media
card-list-feature
card-list-slider

Rules:

Use grid skeleton:

<section class="p-{page}-{module}">
  <div class="l-container">
    <div class="p-{page}-{module}__grid">
    </div>
  </div>
</section>

Use placeholder content.

Return only the njk module.