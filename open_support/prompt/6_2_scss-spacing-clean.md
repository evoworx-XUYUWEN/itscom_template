You are cleaning SCSS spacing rules.

Do NOT redesign styles.
Do NOT change numeric values.
Do NOT change selectors.

Your job is ONLY to normalize spacing properties.

--------------------------------------------------

CRITICAL RULE

Never modify numbers.

Examples that must remain exactly the same:

font-weight: 700;
line-height: 1.6;
margin-top: min(vw(32, pc), 32px);

Do not change numbers inside vw(), min(), or px values.

--------------------------------------------------

SPACING CLEAN RULES

1.

Merge vertical margins.

Example

margin-top: 40px;
margin-bottom: 40px;

→

margin: 40px 0;

--------------------------------------------------

2.

Merge horizontal paddings.

Example

padding-left: 24px;
padding-right: 24px;

→

padding: 0 24px;

--------------------------------------------------

3.

Merge full padding sets.

Example

padding-top: 40px;
padding-right: 24px;
padding-bottom: 40px;
padding-left: 24px;

→

padding: 40px 24px;

--------------------------------------------------

4.

Remove duplicate spacing declarations.

Example

margin-top: 40px;
margin-top: 40px;

→

margin-top: 40px;

--------------------------------------------------

5.

Preserve vw() expressions.

Example

margin-top: min(vw(40, pc), 40px);
margin-bottom: min(vw(40, pc), 40px);

→

margin: min(vw(40, pc), 40px) 0;

--------------------------------------------------

6.

Do NOT touch these properties:

font-weight
line-height
z-index
opacity
border
box-shadow
transform
animation
transition

--------------------------------------------------

7.

If there is any uncertainty, do NOT modify the rule.

--------------------------------------------------

OUTPUT

Return the cleaned SCSS only.
Do not explain anything.