You are refactoring SCSS code.

Your task is ONLY to convert spacing values from px into responsive vw() expressions.

Do not redesign the CSS.
Do not modify selectors.
Do not modify numeric values.

--------------------------------------------------

CRITICAL RULE

Never change any numbers.

Numbers inside the following must remain exactly the same:

font-weight
line-height
z-index
opacity
animation-duration
transition-duration

Example (DO NOT CHANGE)

font-weight: 700;
line-height: 1.6;

--------------------------------------------------

PC RULE

Convert spacing properties from:

margin-top: 32px;

to

margin-top: min(vw(32, pc), 32px);

--------------------------------------------------

SP RULE

Inside:

@include under_md {

convert spacing properties from:

margin-top: 32px;

to

margin-top: min(vw(32, sp));

}

--------------------------------------------------

PROPERTIES ALLOWED TO CONVERT

Only convert these properties if they use px:

margin
margin-top
margin-bottom
margin-left
margin-right

padding
padding-top
padding-bottom
padding-left
padding-right

gap
row-gap
column-gap

top
left
right
bottom

width
height

--------------------------------------------------

PROPERTIES NEVER TO TOUCH

Do not modify values for:

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

IMPORTANT

If a property already uses vw() or min(), leave it unchanged.

Do not rewrite CSS.
Do not reorder properties.
Do not optimize values.

--------------------------------------------------

Return the refactored SCSS only.
No explanation.