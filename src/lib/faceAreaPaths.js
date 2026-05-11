// viewBox: 0 0 1254 1254  (matches face.png — 1254×1254 px)
// Last saved by debug editor — 2026-05-11T03:52:38.095Z

export const FACE_AREA_PATHS = [
  {
    id: "forehead",
    label: "Forehead",
    shapes: [
      { type: 'ellipse', cx: 627, cy: 397, rx: 197, ry: 108, rotation: 1 }
    ],
    labelPos: { x: 627, y: 397 },
    concernOptions: [
    "Wrinkles",
    "Volume Loss",
    "Contour Balance"
    ],
  },
  {
    id: "temples",
    label: "Temples",
    shapes: [
      { type: 'ellipse', cx: 373, cy: 556, rx: 51, ry: 64 },
      { type: 'ellipse', cx: 881, cy: 556, rx: 51, ry: 64 }
    ],
    labelPos: { x: 148, y: 315 },
    concernOptions: [
    "Volume Loss",
    "Contour Balance"
    ],
  },
  {
    id: "upperEyes",
    label: "Eyebrows / Upper Eyes",
    shapes: [
      { type: 'ellipse', cx: 482, cy: 521, rx: 85, ry: 33 },
      { type: 'ellipse', cx: 773, cy: 521, rx: 85, ry: 33 }
    ],
    labelPos: { x: 627, y: 338 },
    concernOptions: [
    "Sagging",
    "Asymmetry",
    "Tired Impression"
    ],
  },
  {
    id: "frownLines",
    label: "Frown Lines",
    shapes: [
      { type: 'ellipse', cx: 621, cy: 538, rx: 50, ry: 30 }
    ],
    labelPos: { x: 621, y: 538 },
    concernOptions: [
    "Wrinkles",
    "Expression Lines",
    "Tired Impression"
    ],
  },
  {
    id: "crowsFeet",
    label: "Crow's Feet",
    shapes: [
      { type: 'ellipse', cx: 398, cy: 632, rx: 35, ry: 31 },
      { type: 'ellipse', cx: 856, cy: 632, rx: 35, ry: 31 }
    ],
    labelPos: { x: 208, y: 432 },
    concernOptions: [
    "Wrinkles",
    "Expression Lines",
    "Elasticity Loss"
    ],
  },
  {
    id: "underEyes",
    label: "Under Eyes",
    shapes: [
      { type: 'ellipse', cx: 482, cy: 661, rx: 63, ry: 27 },
      { type: 'ellipse', cx: 773, cy: 661, rx: 63, ry: 27 }
    ],
    labelPos: { x: 627, y: 462 },
    concernOptions: [
    "Fine Wrinkles",
    "Hollowness",
    "Dark Circles",
    "Elasticity Loss"
    ],
  },
  {
    id: "nose",
    label: "Nose",
    shapes: [
      { type: 'ellipse', cx: 623, cy: 676, rx: 66, ry: 112 }
    ],
    labelPos: { x: 623, y: 676 },
    concernOptions: [
    "Contour Balance",
    "Bridge Definition"
    ],
  },
  {
    id: "cheeks",
    label: "Cheeks / Midface",
    shapes: [
      { type: 'ellipse', cx: 478, cy: 746, rx: 84, ry: 77 },
      { type: 'ellipse', cx: 777, cy: 746, rx: 84, ry: 77 }
    ],
    labelPos: { x: 190, y: 598 },
    concernOptions: [
    "Volume Loss",
    "Sagging",
    "Elasticity Loss",
    "Pores / Texture"
    ],
  },
  {
    id: "nasolabialFolds",
    label: "Nasolabial Folds",
    shapes: [
      { type: 'ellipse', cx: 544, cy: 813, rx: 18, ry: 63, rotation: 21 },
      { type: 'ellipse', cx: 710, cy: 813, rx: 18, ry: 63, rotation: -21 }
    ],
    labelPos: { x: 365, y: 656 },
    concernOptions: [
    "Folds",
    "Wrinkles",
    "Volume Loss",
    "Sagging"
    ],
  },
  {
    id: "lipsMouthCorners",
    label: "Lips / Mouth Corners",
    shapes: [
      { type: 'ellipse', cx: 622, cy: 863, rx: 80, ry: 47 }
    ],
    labelPos: { x: 622, y: 863 },
    concernOptions: [
    "Volume Loss",
    "Asymmetry",
    "Mouth Corner Drooping",
    "Fine Lines"
    ],
  },
  {
    id: "jawline",
    label: "Jawline / V-Line",
    shapes: [
      { type: 'ellipse', cx: 441, cy: 859, rx: 25, ry: 106, rotation: -29 },
      { type: 'ellipse', cx: 814, cy: 859, rx: 25, ry: 106, rotation: 29 }
    ],
    labelPos: { x: 182, y: 826 },
    concernOptions: [
    "Contour",
    "Sagging",
    "Square Jaw",
    "Definition"
    ],
  },
  {
    id: "chin",
    label: "Chin",
    shapes: [
      { type: 'ellipse', cx: 625, cy: 948, rx: 107, ry: 64 }
    ],
    labelPos: { x: 627, y: 946 },
    concernOptions: [
    "Contour Balance",
    "Projection",
    "Dimpling",
    "Excess Fat",
    "Sagging",
    "Lower Face Heaviness"
    ],
  },
  {
    id: "neck",
    label: "Neck",
    shapes: [
      { type: 'ellipse', cx: 627, cy: 1093, rx: 154, ry: 87 }
    ],
    labelPos: { x: 627, y: 1093 },
    concernOptions: [
    "Neck Wrinkles",
    "Elasticity Loss",
    "Skin Texture"
    ],
  }
]

export const DEBUG_PALETTE = [
  'rgba(255,80,80,0.32)',
  'rgba(255,160,80,0.32)',
  'rgba(80,200,80,0.32)',
  'rgba(80,80,255,0.32)',
  'rgba(200,80,200,0.32)',
  'rgba(80,200,200,0.32)',
  'rgba(200,200,80,0.32)',
  'rgba(255,120,120,0.32)',
  'rgba(120,255,120,0.32)',
  'rgba(120,120,255,0.32)',
  'rgba(255,200,80,0.32)',
  'rgba(80,255,200,0.32)',
  'rgba(200,80,255,0.32)',
  'rgba(80,160,255,0.32)'
]
