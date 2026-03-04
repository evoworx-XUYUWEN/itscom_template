[Include Prompt 0 rules]

TASK

Generate a Nunjucks module.

Input:

Page name
Module name
Slots needed
Optional components used

Requirements:

Use grid layout.

Use skeleton:

<section class="p-{page}-{module}">
  <div class="l-container">
    <div class="p-{page}-{module}__grid">
    </div>
  </div>
</section>

Use placeholder content.

Return only the njk file.