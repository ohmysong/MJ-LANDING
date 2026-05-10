export const SKIN_CONCERNS = [
  { key: 'brightening', label: 'Brightening / Pigmentation', sub: 'Dark spots, uneven tone, dullness' },
  { key: 'elasticity',  label: 'Elasticity',                sub: 'Skin firmness and bounce' },
  { key: 'lifting',     label: 'Lifting',                   sub: 'Sagging skin, jawline definition' },
  { key: 'wrinkles',    label: 'Wrinkles',                  sub: 'Fine lines and deep creases' },
  { key: 'dryness',     label: 'Dryness',                   sub: 'Dehydration, flakiness, tight skin' },
  { key: 'texture',     label: 'Skin Texture',              sub: 'Roughness, uneven surface' },
  { key: 'pores',       label: 'Pores',                     sub: 'Enlarged or visible pores' },
  { key: 'acneScars',   label: 'Acne Scars',                sub: 'Post-acne marks or indented scars' },
  { key: 'volumeLoss',  label: 'Volume Loss',               sub: 'Sunken cheeks, hollow temples' },
  { key: 'contour',     label: 'Facial Contour',            sub: 'Facial shape, proportions, symmetry' },
  { key: 'redness',     label: 'Redness / Sensitivity',     sub: 'Reactive skin, rosacea, flushing' },
]

export const EMPTY_CONCERNS = Object.fromEntries(
  SKIN_CONCERNS.map(c => [c.key, 0])
)

export const STEP_NAMES = [
  '', 'About You', 'Skin Assessment', 'Your Priorities',
  'Aesthetic Goals', 'Investment', 'Lifestyle',
  'Health Profile', 'Reference Photos', 'Complete',
]
