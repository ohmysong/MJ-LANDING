import { TREATMENTS, CONCERN_LABELS, CATEGORY_ORDER } from './treatmentData.js'

// Budget ceiling in 만원 per range
const BUDGET_CEILINGS = {
  under_5m:  500,
  '5m_10m':  1000,
  '10m_15m': 1500,
  '15m_20m': 2000,
  '20m_30m': 3000,
  over_30m:  9999,
}

const FLEXIBILITY_MULTIPLIERS = {
  fixed:             1.0,
  slightly_flexible: 1.15,
  flexible:          1.3,
}

function effectiveBudget(range, flexibility) {
  const base = BUDGET_CEILINGS[range] ?? 1000
  const mult = FLEXIBILITY_MULTIPLIERS[flexibility] ?? 1.0
  return Math.floor(base * mult)
}

function scoreTreatment(treatment, { concerns, priorities, aestheticStyle }) {
  let score = 0

  // Sum concern scores for each concern the treatment addresses
  for (const key of treatment.concerns) {
    const s = concerns?.[key] ?? 0
    if (s > 0) score += s * 3
  }

  // Priority rank bonus — top-ranked concerns get extra weight
  for (let i = 0; i < Math.min(priorities?.length ?? 0, 5); i++) {
    if (treatment.concerns.includes(priorities[i])) {
      score += (5 - i) * 4
    }
  }

  // Aesthetic style alignment
  if (aestheticStyle && treatment.style.includes(aestheticStyle)) {
    score += 8
  } else if (aestheticStyle) {
    score -= 4
  }

  return score
}

// Greedy budget allocation: take highest-scoring treatments that fit
function buildPlan(scored, budget) {
  const plan = []
  let spent = 0

  for (const t of scored) {
    if (plan.length >= 6) break
    if (spent + t.price <= budget) {
      plan.push(t)
      spent += t.price
    }
  }

  return { plan, spent }
}

export function generateRecommendation(data) {
  const { budget = {}, concerns = {}, priorities = [], aestheticStyle = '' } = data
  const maxBudget = effectiveBudget(budget.range, budget.flexibility)

  // Score and filter
  const scored = TREATMENTS
    .map(t => ({ ...t, score: scoreTreatment(t, { concerns, priorities, aestheticStyle }) }))
    .filter(t => t.score > 0 && t.price <= maxBudget)
    .sort((a, b) => b.score - a.score)

  const { plan, spent } = buildPlan(scored, maxBudget)

  // Group by category in defined order
  const grouped = {}
  for (const t of plan) {
    if (!grouped[t.category]) grouped[t.category] = []
    grouped[t.category].push(t)
  }

  const orderedGroups = CATEGORY_ORDER
    .filter(cat => grouped[cat])
    .map(cat => ({ category: cat, treatments: grouped[cat] }))

  // Narrative generation
  const topConcerns = (priorities.length > 0 ? priorities : Object.keys(concerns))
    .filter(k => (concerns[k] ?? 0) >= 3)
    .slice(0, 3)
    .map(k => CONCERN_LABELS[k] ?? k)

  const narrative = buildNarrative(data, plan, topConcerns)

  return {
    groups: orderedGroups,
    totalCost: spent,
    budget: maxBudget,
    narrative,
    treatmentCount: plan.length,
  }
}

function buildNarrative(data, plan, topConcerns) {
  const { basicInfo, aestheticStyle, budget } = data
  const firstName = basicInfo?.fullName?.split(' ')[0] || 'you'
  const styleLabel = {
    natural:     'natural, understated refinement',
    noticeable:  'visible, harmonious improvement',
    dramatic:    'a bold, transformative elevation',
  }[aestheticStyle] || 'personalised enhancement'

  if (plan.length === 0) {
    return `Based on your consultation profile, our specialists will prepare a bespoke recommendation tailored to your unique goals. Please allow 24–48 hours for your personalised plan to be confirmed.`
  }

  const primaryConcernText = topConcerns.length > 0
    ? topConcerns.length === 1
      ? topConcerns[0].toLowerCase()
      : topConcerns.slice(0, -1).map(s => s.toLowerCase()).join(', ') + ' and ' + topConcerns[topConcerns.length - 1].toLowerCase()
    : 'your skin goals'

  const primaryTreatment = plan[0]
  const secondaryTreatments = plan.slice(1, 3)

  let intro = `Based on your pre-check profile, we have curated a personalised treatment journey for ${firstName} — one focused on ${primaryConcernText}, guided by a preference for ${styleLabel}.`

  const descLower = primaryTreatment.description.replace(/^[A-Z]/, c => c.toLowerCase())
  let body = ` Your plan centres on the **${primaryTreatment.name}**, ${descLower}`

  if (secondaryTreatments.length > 0) {
    const names = secondaryTreatments.map(t => t.name).join(' and ')
    body += ` This is thoughtfully complemented by ${names}, working in synergy to address the full range of your priorities.`
  }

  const flexNote = budget?.flexibility === 'fixed'
    ? ' This plan has been composed entirely within your stated investment.'
    : budget?.flexibility === 'slightly_flexible'
      ? ' We have optimised this plan to deliver exceptional value within your investment parameters.'
      : ' This plan reflects our highest-impact selection within your investment range.'

  return intro + body + flexNote
}

// Format price as KRW string
export function formatPrice(manWon) {
  if (manWon >= 100) {
    const uk = Math.floor(manWon / 100)
    const remainder = manWon % 100
    if (remainder === 0) return `₩${uk},000만원`
    return `₩${uk},${String(remainder).padStart(2, '0')}0만원`
  }
  return `₩${manWon}만원`
}

export function formatPriceKRW(manWon) {
  return `₩${(manWon * 10000).toLocaleString('en-US')}`
}
