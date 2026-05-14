// Treatment database — prices in 만원 (KRW ÷ 10,000)
// Source: 3월 ECF 수가표 (부대표원장님_ECF & 시술_ECF)

export const TREATMENTS = [
  // ─── LIFTING & FIRMING ───────────────────────────────────────────────────
  {
    id: 'ultherapy',
    name: 'Ultherapy',
    nameKr: '울쎄라',
    category: 'Lifting & Firming',
    tagline: 'The gold standard in non-surgical lifting',
    description:
      'High-intensity focused ultrasound that reaches the deep foundational layers of the skin, stimulating sustained collagen production for a progressive, natural lift — without incision or downtime.',
    concerns: ['lifting', 'elasticity', 'wrinkles'],
    price: 150,
    style: ['noticeable', 'dramatic'],
    intensity: 'high',
  },
  {
    id: 'thermage_flx',
    name: 'Thermage FLX',
    nameKr: '써마지 FLX',
    category: 'Lifting & Firming',
    tagline: 'Single-session tightening with lasting results',
    description:
      'The most advanced iteration of radiofrequency skin tightening, delivering precise uniform heat to contract existing collagen and stimulate new formation — achieving remarkable firmness from a single comprehensive session.',
    concerns: ['lifting', 'elasticity', 'wrinkles', 'texture'],
    price: 418,
    style: ['noticeable', 'dramatic'],
    intensity: 'high',
  },
  {
    id: 'virtue_rf',
    name: 'Virtue RF Microneedling',
    nameKr: '버츄 RF',
    category: 'Lifting & Firming',
    tagline: 'Precision skin renewal from within',
    description:
      'Combines microneedling with targeted radiofrequency energy, remodelling collagen at multiple skin depths to tighten pores, refine texture, and restore a youthful firmness with minimal social downtime.',
    concerns: ['lifting', 'elasticity', 'pores', 'texture', 'wrinkles'],
    price: 79,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'rejuran',
    name: 'Rejuran Healer',
    nameKr: '리쥬란',
    category: 'Lifting & Firming',
    tagline: 'Deep biological skin regeneration',
    description:
      'Salmon-derived polynucleotides injected into the dermis to repair the skin\'s architecture, restore elasticity, and create a plumped, hydrated luminosity — the closest treatment to genuine skin regeneration.',
    concerns: ['elasticity', 'lifting', 'wrinkles', 'dryness', 'texture'],
    price: 79,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'hydropixie',
    name: 'Hydropixie Contouring',
    nameKr: '하이드로픽시',
    category: 'Lifting & Firming',
    tagline: 'Sculpted lift with deep hydration',
    description:
      'A sophisticated dual-action protocol combining focused ultrasound contouring with cellution injections — simultaneously sculpting the facial outline and deeply hydrating the skin for visible, lasting results.',
    concerns: ['lifting', 'elasticity', 'contour', 'dryness'],
    price: 95,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },

  // ─── VOLUME & CONTOURING ──────────────────────────────────────────────────
  {
    id: 'thread_4d',
    name: '4D Thread Lift',
    nameKr: '4D 리프팅',
    category: 'Lifting & Contouring',
    tagline: 'Architectural facial definition',
    description:
      'Biodegradable cog and scaffold threads placed with surgical precision to immediately redefine the V-line, restore midface structure, and stimulate a sustained collagen response over 12–18 months.',
    concerns: ['lifting', 'contour', 'elasticity', 'volumeLoss'],
    price: 215,
    style: ['noticeable', 'dramatic'],
    intensity: 'high',
  },
  {
    id: 'accufit',
    name: 'AccuFit Precision Lifting',
    nameKr: '아큐핏 리프팅',
    category: 'Lifting & Contouring',
    tagline: 'Targeted fat reduction and contouring',
    description:
      'A high-precision body contouring technology that selectively targets submental and buccal fat, creating a dramatically sculpted jawline and refined lower face definition.',
    concerns: ['lifting', 'contour', 'volumeLoss'],
    price: 315,
    style: ['dramatic'],
    intensity: 'high',
  },
  {
    id: 'filler_cheeks',
    name: 'Cheek & Midface Filler',
    nameKr: '볼 필러',
    category: 'Volume & Contouring',
    tagline: 'Restoring youthful facial structure',
    description:
      'Precise volumising of the cheeks and midface using premium hyaluronic acid fillers, restoring the natural projection that creates a lifted, refreshed appearance.',
    concerns: ['volumeLoss', 'lifting', 'contour'],
    price: 95,
    style: ['natural', 'noticeable', 'dramatic'],
    intensity: 'medium',
  },
  {
    id: 'filler_forehead',
    name: 'Forehead Volume Filler',
    nameKr: '이마볼륨 필러',
    category: 'Volume & Contouring',
    tagline: 'Smooth, rounded forehead contour',
    description:
      'Subtle volumising of the forehead to create a smooth, harmonious curve — addressing hollowing or irregularity for a refined, balanced facial proportion.',
    concerns: ['volumeLoss', 'wrinkles', 'contour'],
    price: 157,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'filler_nose',
    name: 'Nose Contouring Filler',
    nameKr: '코 필러',
    category: 'Volume & Contouring',
    tagline: 'Non-surgical rhinoplasty',
    description:
      'Precision filler placement to refine the nasal bridge and tip, creating improved definition and symmetry — a highly effective alternative to surgical rhinoplasty.',
    concerns: ['contour', 'volumeLoss'],
    price: 79,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'filler_chin',
    name: 'Chin Contouring Filler',
    nameKr: '턱끝 필러',
    category: 'Volume & Contouring',
    tagline: 'Facial proportion and definition',
    description:
      'Targeted chin projection and shaping to balance facial proportions, elongate the lower face, and create a more defined, elegant profile.',
    concerns: ['contour', 'volumeLoss', 'lifting'],
    price: 95,
    style: ['natural', 'noticeable', 'dramatic'],
    intensity: 'medium',
  },
  {
    id: 'filler_nasolabial',
    name: 'Nasolabial Fold Treatment',
    nameKr: '팔자 필러',
    category: 'Volume & Contouring',
    tagline: 'Softened, naturally refreshed expression',
    description:
      'Precise hyaluronic acid placement to soften the nasolabial folds, restoring volume lost through ageing and creating a naturally refreshed appearance.',
    concerns: ['wrinkles', 'volumeLoss', 'lifting'],
    price: 95,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'btx_jaw',
    name: 'Jawline Botox',
    nameKr: '사각턱 보톡스',
    category: 'Volume & Contouring',
    tagline: 'A softer, more feminine V-line',
    description:
      'Precise neuromodulator injections into the masseter muscle gradually reduce jaw width, creating a softer, more refined facial contour without any recovery period.',
    concerns: ['contour', 'lifting'],
    price: 31,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'btx_forehead',
    name: 'Forehead & Brow Botox',
    nameKr: '이마/미간 보톡스',
    category: 'Expression Lines',
    tagline: 'A refreshed, open expression',
    description:
      'Expertly placed neuromodulator to smooth horizontal forehead lines and vertical frown creases, while delicately lifting the brows for a more open, rested appearance.',
    concerns: ['wrinkles'],
    price: 31,
    style: ['natural', 'noticeable'],
    intensity: 'low',
  },
  {
    id: 'undereye_pdrn',
    name: 'Under-Eye Rejuvenation',
    nameKr: '눈밑 PDRN',
    category: 'Eye Area',
    tagline: 'Luminous, revitalised under-eyes',
    description:
      'Regenerative polynucleotide injections targeting the delicate under-eye area to reduce hollowness, fine lines, and dark circles — revealing a brighter, more rested eye contour.',
    concerns: ['wrinkles', 'volumeLoss', 'elasticity'],
    price: 52,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'filler_lips',
    name: 'Lip Enhancement',
    nameKr: '입술 필러',
    category: 'Volume & Contouring',
    tagline: 'Natural fullness and definition',
    description:
      'Delicate hyaluronic acid augmentation designed for natural-looking lip volume, definition of the cupid\'s bow, and subtle projection — never overdone.',
    concerns: ['volumeLoss', 'contour'],
    price: 79,
    style: ['natural', 'noticeable', 'dramatic'],
    intensity: 'low',
  },

  // ─── BRIGHTENING & CLARITY ────────────────────────────────────────────────
  {
    id: 'royal_toning',
    name: 'Royal Toning Laser',
    nameKr: '로얄토닝',
    category: 'Brightening & Clarity',
    tagline: 'Luminous, even-toned radiance',
    description:
      'Multi-wavelength laser therapy that targets melanin clusters, vascular irregularities, and diffuse pigmentation simultaneously — delivering progressive brightening and an even, radiant complexion.',
    concerns: ['brightening', 'redness', 'texture'],
    price: 47,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'luminus',
    name: 'Luminus Fractional Laser',
    nameKr: '루미너스',
    category: 'Brightening & Clarity',
    tagline: 'Refined clarity and texture',
    description:
      'Fractional photothermolysis targeting pigmentation, pores, and surface texture — creating columns of controlled renewal that visibly transform skin clarity and tone.',
    concerns: ['brightening', 'texture', 'pores', 'acneScars'],
    price: 62,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },
  {
    id: 'exosome',
    name: 'Exosome Skin Reset',
    nameKr: '큐어아크네 엑소제',
    category: 'Brightening & Clarity',
    tagline: 'Cellular-level skin renewal',
    description:
      'Cutting-edge exosome technology delivering anti-inflammatory, antioxidant, and regenerative signals directly to skin cells — resetting skin tone, reducing redness, and accelerating repair.',
    concerns: ['redness', 'brightening', 'dryness', 'acne', 'texture'],
    price: 62,
    style: ['natural', 'noticeable'],
    intensity: 'medium',
  },

  // ─── ACNE & SCARRING ──────────────────────────────────────────────────────
  {
    id: 'agnes',
    name: 'Agnes RF Acne Treatment',
    nameKr: '아그네스',
    category: 'Acne & Clarifying',
    tagline: 'Permanent acne resolution',
    description:
      'Targeted radiofrequency microneedling that selectively destroys overactive sebaceous glands — addressing the root cause of acne rather than symptoms, with results that can be permanent.',
    concerns: ['acne', 'pores', 'texture'],
    price: 62,
    style: ['natural', 'noticeable'],
    intensity: 'high',
  },
  {
    id: 'scar_resurfacing',
    name: 'Acne Scar Resurfacing',
    nameKr: '흉터 레이저 + PDRN',
    category: 'Acne & Clarifying',
    tagline: 'Comprehensive scar correction',
    description:
      'A synergistic protocol combining Luminus fractional laser, Erbium resurfacing, and PDRN regenerative therapy — systematically reducing ice-pick, boxcar, and rolling scars for a smoother, more uniform skin surface.',
    concerns: ['acneScars', 'texture', 'pores'],
    price: 79,
    style: ['natural', 'noticeable'],
    intensity: 'high',
  },

  // ─── HYDRATION & GLOW ─────────────────────────────────────────────────────
  {
    id: 'medical_skincare',
    name: 'Medical Skin Care',
    nameKr: '메디컬 스킨케어',
    category: 'Hydration & Glow',
    tagline: 'The foundation of beautiful skin',
    description:
      'A highly customised medical-grade facial combining advanced serums, oxygen therapy, and targeted devices — the ideal preparatory or maintenance treatment that enhances every other protocol.',
    concerns: ['dryness', 'texture', 'brightening', 'redness'],
    price: 47,
    style: ['natural'],
    intensity: 'low',
  },
]

// Concern → category label mapping for narrative generation
export const CONCERN_LABELS = {
  brightening:  'Brightening & Pigmentation',
  elasticity:   'Skin Elasticity',
  lifting:      'Lifting & Firming',
  wrinkles:     'Line Reduction',
  dryness:      'Hydration & Renewal',
  texture:      'Skin Texture',
  pores:        'Pore Refinement',
  acne:         'Acne Treatment',
  acneScars:    'Scar Correction',
  volumeLoss:   'Volume Restoration',
  contour:      'Facial Contouring',
  redness:      'Sensitivity & Clarity',
}

export const CATEGORY_ORDER = [
  'Lifting & Firming',
  'Lifting & Contouring',
  'Volume & Contouring',
  'Expression Lines',
  'Eye Area',
  'Brightening & Clarity',
  'Acne & Clarifying',
  'Hydration & Glow',
]
