import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepWrapper from '../StepWrapper'
import NavButtons from '../ui/NavButtons'
import { FACE_AREA_PATHS, DEBUG_PALETTE } from '../../../lib/faceAreaPaths'

const VIEW = 1254 // SVG viewBox dimension (matches face.png 1254×1254)
const HANDLE_R = 18 // resize handle radius (SVG units)
const MOVE_R   = 22 // center move handle radius

// ── SVG shape — supports rotation + optional dashed stroke ──────────────────
function SvgShape({ shape, fill, stroke, strokeWidth, strokeDasharray, filter, onClick, onMouseEnter, onMouseLeave }) {
  const rot = shape.rotation ?? 0
  const tf  = rot !== 0 ? `rotate(${rot} ${shape.cx} ${shape.cy})` : undefined
  const common = { fill, stroke, strokeWidth, strokeDasharray, filter, transform: tf, onClick, onMouseEnter, onMouseLeave }
  if (shape.type === 'ellipse') {
    return <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} style={{ cursor: 'pointer' }} {...common} />
  }
  if (shape.type === 'path')    return <path    d={shape.d}          style={{ cursor: 'pointer' }} {...common} />
  if (shape.type === 'polygon') return <polygon points={shape.points} style={{ cursor: 'pointer' }} {...common} />
  return null
}

// ── Tooltip position: SVG coords → % of container ──────────────────────────
function tooltipPos(area) {
  const xPct = (area.labelPos.x / VIEW) * 100
  const yPct = (area.labelPos.y / VIEW) * 100
  const isTop = yPct < 32
  return {
    left: `${Math.max(10, Math.min(88, xPct))}%`,
    ...(isTop
      ? { top: `${yPct + 6}%`,   transform: 'translateX(-50%)' }
      : { top: `${yPct}%`,       transform: 'translateX(-50%) translateY(calc(-100% - 10px))' }),
  }
}

// ── Code output for copy button ─────────────────────────────────────────────
function buildCopyText(areas) {
  const lines = areas.map(area => {
    const shapesStr = area.shapes.map(s =>
      `    { type: 'ellipse', cx: ${s.cx}, cy: ${s.cy}, rx: ${s.rx}, ry: ${s.ry} }`
    ).join(',\n')
    return `  // ${area.label}\n  { id: '${area.id}', shapes: [\n${shapesStr}\n  ] }`
  })
  return lines.join(',\n')
}

// ═══════════════════════════════════════════════════════════════════════════
export default function Step4FaceAreaSelector({ data, onNext, onBack, debug = false }) {

  // ── Normal-mode state ───────────────────────────────────────────────────
  const [selectedAreas, setSelectedAreas] = useState(data?.selectedFaceAreas ?? [])
  const [activeAreaId,  setActiveAreaId]  = useState(null)
  const [hoveredAreaId, setHoveredAreaId] = useState(null)

  // ── Debug-mode state ────────────────────────────────────────────────────
  const [debugAreas, setDebugAreas] = useState(() =>
    JSON.parse(JSON.stringify(FACE_AREA_PATHS))
  )
  const [debugSelId,  setDebugSelId]  = useState(null)
  const [copied,      setCopied]      = useState(false)
  const [saving,      setSaving]      = useState(false)
  const [saveStatus,  setSaveStatus]  = useState(null) // 'ok' | 'error' | null

  // ── Drag refs (no re-render on every mouse move) ────────────────────────
  const svgRef  = useRef(null)
  const dragRef = useRef(null) // { type, areaId, shapeIdx, startPt, orig }

  // ── SVG coordinate helper ───────────────────────────────────────────────
  const toSvg = useCallback((clientX, clientY) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const pt = svg.createSVGPoint()
    pt.x = clientX; pt.y = clientY
    const r = pt.matrixTransform(svg.getScreenCTM().inverse())
    return { x: r.x, y: r.y }
  }, [])

  // ── Shape updater — for bilateral areas, mirrors rx/ry across both shapes ──
  const updateShape = useCallback((areaId, shapeIdx, updates) => {
    setDebugAreas(prev => prev.map(area => {
      if (area.id !== areaId) return area
      return {
        ...area,
        shapes: area.shapes.map((s, i) => {
          if (i === shapeIdx) return { ...s, ...updates }
          if (area.bilateral) {
            const mirror = {}
            if ('rx' in updates) mirror.rx = updates.rx
            if ('ry' in updates) mirror.ry = updates.ry
            return Object.keys(mirror).length ? { ...s, ...mirror } : s
          }
          return s
        }),
      }
    }))
  }, [])

  // ── Window mouse handlers (attached only in debug mode) ─────────────────
  useEffect(() => {
    if (!debug) return

    const onMove = (e) => {
      if (!dragRef.current) return
      const { type, areaId, shapeIdx, startPt, orig, otherOrig, startAngle } = dragRef.current
      const pt  = toSvg(e.clientX, e.clientY)
      const dx  = pt.x - startPt.x
      const dy  = pt.y - startPt.y
      const θ   = ((orig.rotation ?? 0) * Math.PI) / 180
      const cos = Math.cos(θ), sin = Math.sin(θ)

      if (type === 'move') {
        if (otherOrig) {
          const otherIdx = 1 - shapeIdx
          setDebugAreas(prev => prev.map(a => {
            if (a.id !== areaId) return a
            return {
              ...a,
              shapes: a.shapes.map((s, i) => {
                if (i === shapeIdx) return { ...s, cx: Math.round(orig.cx + dx),      cy: Math.round(orig.cy + dy) }
                if (i === otherIdx) return { ...s, cx: Math.round(otherOrig.cx - dx), cy: Math.round(otherOrig.cy + dy) }
                return s
              }),
            }
          }))
        } else {
          updateShape(areaId, shapeIdx, { cx: Math.round(orig.cx + dx), cy: Math.round(orig.cy + dy) })
        }
        return
      }

      // Rotation-aware resize — project drag onto the rotated axis
      if (type === 'resizeE') updateShape(areaId, shapeIdx, { rx: Math.max(8, Math.round(orig.rx + dx * cos + dy * sin)) })
      if (type === 'resizeW') updateShape(areaId, shapeIdx, { rx: Math.max(8, Math.round(orig.rx - dx * cos - dy * sin)) })
      if (type === 'resizeS') updateShape(areaId, shapeIdx, { ry: Math.max(8, Math.round(orig.ry - dx * sin + dy * cos)) })
      if (type === 'resizeN') updateShape(areaId, shapeIdx, { ry: Math.max(8, Math.round(orig.ry + dx * sin - dy * cos)) })

      if (type === 'rotate') {
        const curAngle  = Math.atan2(pt.y - orig.cy, pt.x - orig.cx) * 180 / Math.PI
        const delta     = curAngle - startAngle
        const newRot    = Math.round((orig.rotation ?? 0) + delta)
        if (otherOrig) {
          // Bilateral: mirror rotation (left +θ → right −θ)
          const otherIdx = 1 - shapeIdx
          setDebugAreas(prev => prev.map(a => {
            if (a.id !== areaId) return a
            return {
              ...a,
              shapes: a.shapes.map((s, i) => {
                if (i === shapeIdx) return { ...s, rotation: newRot }
                if (i === otherIdx) return { ...s, rotation: -newRot }
                return s
              }),
            }
          }))
        } else {
          updateShape(areaId, shapeIdx, { rotation: newRot })
        }
      }
    }
    const onUp = () => { dragRef.current = null }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [debug, updateShape, toSvg])

  // ── Start drag ──────────────────────────────────────────────────────────
  const startDrag = (type, areaId, shapeIdx, shape, otherShape, e) => {
    e.stopPropagation()
    e.preventDefault()
    const pt         = toSvg(e.clientX, e.clientY)
    const startAngle = type === 'rotate'
      ? Math.atan2(pt.y - shape.cy, pt.x - shape.cx) * 180 / Math.PI
      : null
    dragRef.current = {
      type, areaId, shapeIdx,
      startPt:    pt,
      orig:       { ...shape },
      otherOrig:  otherShape ? { ...otherShape } : null,
      startAngle,
    }
  }

  // ── Normal mode helpers ─────────────────────────────────────────────────
  // isSelected: visually highlighted only when ≥1 concern chosen
  const isSelected  = id => selectedAreas.some(a => a.area === id && a.concerns.length > 0)
  // isPending: in list but no concern chosen yet
  const isPending   = id => selectedAreas.some(a => a.area === id && a.concerns.length === 0)
  // isInList: any entry (for click logic)
  const isInList    = id => selectedAreas.some(a => a.area === id)
  const getAreaData = id => selectedAreas.find(a => a.area === id)

  const handleAreaClick = (area) => {
    if (!isInList(area.id)) {
      setSelectedAreas(prev => [...prev, { area: area.id, areaLabel: area.label, concerns: [] }])
      setActiveAreaId(area.id)
    } else {
      setActiveAreaId(prev => prev === area.id ? null : area.id)
    }
  }

  const toggleConcern = (areaId, concern) => {
    setSelectedAreas(prev => prev.map(a =>
      a.area !== areaId ? a : {
        ...a,
        concerns: a.concerns.includes(concern)
          ? a.concerns.filter(c => c !== concern)
          : [...a.concerns, concern],
      }
    ))
  }

  const removeArea = (areaId) => {
    setSelectedAreas(prev => prev.filter(a => a.area !== areaId))
    if (activeAreaId === areaId) setActiveAreaId(null)
  }

  // ── Copy code ───────────────────────────────────────────────────────────
  const handleCopy = () => {
    navigator.clipboard.writeText(buildCopyText(debugAreas)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Save to faceAreaPaths.js via Vite dev plugin ─────────────────────────
  const handleSave = async () => {
    setSaving(true)
    setSaveStatus(null)
    try {
      // Auto-update labelPos to match first shape center
      const toSave = debugAreas.map(area => ({
        ...area,
        labelPos: area.shapes.length === 1
          ? { x: area.shapes[0].cx, y: area.shapes[0].cy }
          : area.labelPos,
      }))
      const res  = await fetch('/api/save-face-areas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave),
      })
      const data = await res.json()
      setSaveStatus(data.ok ? 'ok' : 'error')
    } catch {
      setSaveStatus('error')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveStatus(null), 3500)
    }
  }

  // ── Derived ─────────────────────────────────────────────────────────────
  const activeArea      = FACE_AREA_PATHS.find(a => a.id === activeAreaId)
  const hoveredArea     = FACE_AREA_PATHS.find(a => a.id === hoveredAreaId)
  const faceImg         = `${import.meta.env.BASE_URL}images/face.png`
  const renderAreas     = debug ? debugAreas : FACE_AREA_PATHS
  const confirmedCount  = selectedAreas.filter(a => a.concerns.length > 0).length

  const handleSubmit = e => { e.preventDefault(); onNext({ selectedFaceAreas: selectedAreas }) }

  // ── SVG fill / stroke per state ─────────────────────────────────────────
  const svgProps = (area, aIdx) => {
    const isHov    = hoveredAreaId === area.id
    const isSel    = isSelected(area.id)
    const isPend   = isPending(area.id)
    const isAct    = activeAreaId === area.id
    const isDbgSel = debugSelId  === area.id

    const fill = debug
      ? isDbgSel
        ? DEBUG_PALETTE[aIdx % DEBUG_PALETTE.length].replace('0.32', '0.50')
        : DEBUG_PALETTE[aIdx % DEBUG_PALETTE.length]
      : isSel && isAct  ? 'rgba(199,164,106,0.24)'
      : isSel           ? 'rgba(199,164,106,0.16)'
      : isPend && isAct ? 'rgba(199,164,106,0.09)'
      : isHov           ? 'rgba(199,164,106,0.11)'
      : 'transparent'

    const stroke = debug
      ? isDbgSel ? 'rgba(0,0,0,0.80)' : 'rgba(0,0,0,0.40)'
      : isSel && isAct  ? 'rgba(199,164,106,0.88)'
      : isSel           ? 'rgba(199,164,106,0.58)'
      : isPend && isAct ? 'rgba(199,164,106,0.55)'
      : isHov           ? 'rgba(199,164,106,0.40)'
      : 'transparent'

    const strokeDasharray = !debug && isPend ? '8 5' : undefined
    const strokeWidth     = debug ? (isDbgSel ? 3 : 1.5) : (isSel && isAct ? 2.5 : 1.8)
    const filter          = !debug && isSel && isAct ? 'url(#goldGlow)'
      : !debug && isSel  ? 'url(#softGlow)' : undefined

    return { fill, stroke, strokeWidth, strokeDasharray, filter, isSel, isPend, isAct, isDbgSel }
  }

  // ═══════════════════════════════════════════════════════════════════════
  return (
    <StepWrapper
      eyebrow="Step 4 · Concern Areas"
      title={debug ? 'Debug Editor — Face Areas' : 'Select Your Concern Areas.'}
      description={debug
        ? 'Click an area to select it. Drag the center to move, drag edge handles to resize. Copy coordinates when done.'
        : 'Tap areas of the face where you have concerns. Select specific concerns for each area.'}
      maxWidth={1160}
    >
      <form onSubmit={handleSubmit}>

        <style>{`@media(max-width:740px){.face-sel-grid{grid-template-columns:1fr!important}}`}</style>

        {/* ════════════════════════════════════════════════════════════════
            TWO-COLUMN GRID  (debug: full-width single column)
        ════════════════════════════════════════════════════════════════ */}
        <div
          className={debug ? '' : 'face-sel-grid'}
          style={{
            display: 'grid',
            gridTemplateColumns: debug ? '1fr' : 'minmax(0, 620px) 1fr',
            gap: 32,
            alignItems: 'start',
          }}
        >

          {/* ── LEFT: Face image + SVG ── */}
          <div style={{ position: 'relative', userSelect: 'none' }}>
            <div style={{ position: 'relative', paddingBottom: '100%' }}>

              <img
                src={faceImg}
                alt="Face illustration"
                draggable={false}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', pointerEvents: 'none', display: 'block',
                }}
              />

              <svg
                ref={svgRef}
                viewBox={`0 0 ${VIEW} ${VIEW}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', cursor: debug ? 'default' : 'auto' }}
              >
                <defs>
                  <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                    <feColorMatrix in="blur" type="matrix" values="1 0.8 0.3 0 0  0.8 0.65 0.2 0 0  0.2 0.15 0 0 0  0 0 0 0.7 0" result="colored"/>
                    <feMerge><feMergeNode in="colored"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {renderAreas.map((area, aIdx) => {
                  const { fill, stroke, strokeWidth, strokeDasharray, filter, isAct, isDbgSel } = svgProps(area, aIdx)

                  return (
                    <g key={area.id}>
                      {area.shapes.map((shape, si) => (
                        <SvgShape
                          key={`${area.id}-${si}`}
                          shape={shape}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDasharray}
                          filter={filter}
                          onClick={debug
                            ? (e) => { e.stopPropagation(); setDebugSelId(prev => prev === area.id ? null : area.id) }
                            : () => handleAreaClick(area)}
                          onMouseEnter={debug ? undefined : () => setHoveredAreaId(area.id)}
                          onMouseLeave={debug ? undefined : () => setHoveredAreaId(null)}
                        />
                      ))}

                    {/* ── Debug labels ── */}
                    {debug && (
                      <text
                        x={area.shapes[0].cx}
                        y={area.shapes[0].cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fontFamily: 'sans-serif', fontSize: 20, fontWeight: 700, fill: 'rgba(0,0,0,0.72)', pointerEvents: 'none' }}
                      >
                        {area.label.split('/')[0].trim()}
                      </text>
                    )}

                    {/* ── Debug drag handles (only for selected area) ── */}
                    {debug && isDbgSel && area.shapes.map((shape, si) => {
                      if (shape.type !== 'ellipse') return null
                      const { cx, cy, rx, ry } = shape
                      const rotation   = shape.rotation ?? 0
                      const otherShape = area.bilateral ? area.shapes.find((_, i) => i !== si) : null
                      const ROT_OFFSET = ry + 55  // distance above N handle for rotate circle

                      const mkResize = (type, hx, hy, cur) => (
                        <circle
                          key={type}
                          cx={hx} cy={hy} r={HANDLE_R}
                          fill="#fff"
                          stroke="rgba(199,164,106,0.9)"
                          strokeWidth={2.5}
                          style={{ cursor: cur }}
                          onMouseDown={e => startDrag(type, area.id, si, shape, otherShape, e)}
                        />
                      )

                      return (
                        <g key={`h-${area.id}-${si}`}>
                          {/* Rotate the entire handle group with the ellipse */}
                          <g transform={`rotate(${rotation} ${cx} ${cy})`}>
                            {/* Resize handles at cardinal edges */}
                            {mkResize('resizeN', cx,      cy - ry,      'ns-resize')}
                            {mkResize('resizeS', cx,      cy + ry,      'ns-resize')}
                            {mkResize('resizeE', cx + rx, cy,           'ew-resize')}
                            {mkResize('resizeW', cx - rx, cy,           'ew-resize')}

                            {/* Move handle at center */}
                            <circle
                              cx={cx} cy={cy} r={MOVE_R}
                              fill="rgba(199,164,106,0.75)"
                              stroke="#fff" strokeWidth={2.5}
                              style={{ cursor: 'move' }}
                              onMouseDown={e => startDrag('move', area.id, si, shape, otherShape, e)}
                            />

                            {/* Rotate handle — dashed stem + circle above N handle */}
                            <line
                              x1={cx} y1={cy - ry - HANDLE_R - 2}
                              x2={cx} y2={cy - ry - ROT_OFFSET + HANDLE_R + 2}
                              stroke="rgba(199,164,106,0.55)" strokeWidth={1.5}
                              strokeDasharray="5 4" pointerEvents="none"
                            />
                            <circle
                              cx={cx} cy={cy - ry - ROT_OFFSET} r={HANDLE_R}
                              fill="rgba(80,60,20,0.82)"
                              stroke="rgba(199,164,106,0.9)" strokeWidth={2.5}
                              style={{ cursor: 'grab' }}
                              onMouseDown={e => startDrag('rotate', area.id, si, shape, otherShape, e)}
                            />
                            {/* Rotation icon inside rotate handle */}
                            <path
                              d={`M ${cx-7} ${cy - ry - ROT_OFFSET - 5}
                                  A 7 7 0 1 1 ${cx+5} ${cy - ry - ROT_OFFSET + 6}`}
                              fill="none" stroke="rgba(199,164,106,0.9)" strokeWidth={1.8}
                              strokeLinecap="round" pointerEvents="none"
                            />
                            <polygon
                              points={`${cx+5},${cy - ry - ROT_OFFSET + 6} ${cx+10},${cy - ry - ROT_OFFSET + 1} ${cx+2},${cy - ry - ROT_OFFSET + 1}`}
                              fill="rgba(199,164,106,0.9)" pointerEvents="none"
                            />
                          </g>

                          {/* Coordinate readout — always horizontal (outside rotation group) */}
                          <text
                            x={cx > VIEW / 2 ? cx - rx - 14 : cx + rx + 14}
                            y={cy}
                            textAnchor={cx > VIEW / 2 ? 'end' : 'start'}
                            dominantBaseline="middle"
                            style={{ fontFamily: 'monospace', fontSize: 18, fill: '#111', pointerEvents: 'none' }}
                          >
                            {`cx${cx} cy${cy} rx${rx} ry${ry}${rotation !== 0 ? ` ${rotation}°` : ''}`}
                          </text>
                        </g>
                      )
                    })}
                  </g>
                )
              })}
            </svg>

            {/* Hover tooltip */}
              <AnimatePresence>
                {!debug && hoveredAreaId && hoveredArea && (
                  <motion.div
                    key={hoveredAreaId}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 2 }}
                    transition={{ duration: 0.14 }}
                    style={{
                      position: 'absolute', ...tooltipPos(hoveredArea), zIndex: 30, pointerEvents: 'none',
                      background: 'rgba(22,18,14,0.92)', backdropFilter: 'blur(16px)', color: '#f0ead8',
                      fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '10px 20px', whiteSpace: 'nowrap', boxShadow: '0 8px 28px rgba(0,0,0,0.28)',
                    }}
                  >
                    {hoveredArea.label}
                    <div style={{ height: 1, background: 'rgba(199,164,106,0.7)', marginTop: 5 }} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirmed count badge */}
              {!debug && confirmedCount > 0 && (
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(22,18,14,0.82)', backdropFilter: 'blur(10px)', color: 'var(--gold)',
                  fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  padding: '5px 11px', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
                  {confirmedCount} selected
                </div>
              )}

              {/* Debug coordinate panel */}
              {debug && debugSelId && (() => {
                const area = debugAreas.find(a => a.id === debugSelId)
                if (!area) return null
                return (
                  <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, background: 'rgba(16,13,10,0.92)', backdropFilter: 'blur(12px)', color: '#f0ead8', fontFamily: 'monospace', fontSize: 12, padding: '14px 18px', zIndex: 40, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(199,164,106,0.8)', marginBottom: 4 }}>{area.label}</span>
                    {area.shapes.map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                        {area.shapes.length > 1 && <span style={{ color: 'rgba(255,255,255,0.4)', minWidth: 60 }}>shape {i + 1}</span>}
                        <span><span style={{ color: 'rgba(199,164,106,0.7)' }}>cx</span> {s.cx}</span>
                        <span><span style={{ color: 'rgba(199,164,106,0.7)' }}>cy</span> {s.cy}</span>
                        <span><span style={{ color: 'rgba(199,164,106,0.7)' }}>rx</span> {s.rx}</span>
                        <span><span style={{ color: 'rgba(199,164,106,0.7)' }}>ry</span> {s.ry}</span>
                        <span><span style={{ color: 'rgba(199,164,106,0.7)' }}>rot</span> {s.rotation ?? 0}°</span>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>{/* end paddingBottom box */}

            {/* Disclaimer */}
            {!debug && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#999', textAlign: 'center', marginTop: 10 }}>
                User-selected mapping · Not a diagnostic tool
              </p>
            )}
          </div>{/* end LEFT column */}

          {/* ── RIGHT: Controls ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Debug toolbar */}
            {debug && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', border: '1px solid var(--warm-gray2)', background: '#fff', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#333', marginBottom: 4 }}>Debug mode</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#555' }}>
                    {debugSelId ? `Editing: ${debugAreas.find(a => a.id === debugSelId)?.label}` : 'Click any coloured area to select & edit'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  {debugSelId && (
                    <button type="button" onClick={() => setDebugSelId(null)} style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '10px 18px', border: '1px solid var(--warm-gray2)', background: 'transparent', color: '#444', cursor: 'pointer' }}>
                      Deselect
                    </button>
                  )}
                  {saveStatus && (
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: saveStatus === 'ok' ? '#22c55e' : '#f87171', display: 'flex', alignItems: 'center', gap: 5 }}>
                      {saveStatus === 'ok' ? <><svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5l3 3L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Saved</> : 'Save failed'}
                    </span>
                  )}
                  <motion.button type="button" onClick={handleSave} disabled={saving} whileTap={!saving ? { scale: 0.97 } : {}}
                    style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '10px 24px', background: saving ? 'var(--warm-gray2)' : 'var(--gold)', border: '1px solid var(--gold)', color: saving ? '#666' : '#111', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    {saving ? 'Saving…' : <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 8.5V10h7.5V8.5M5.75 1.5v6M3.5 5.5l2.25 2.25L8 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>Save</>}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Hint — shown when no area is active */}
            {!debug && !activeAreaId && (
              <div style={{ border: '1px dashed rgba(199,164,106,0.35)', padding: '24px 20px', textAlign: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(199,164,106,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="var(--gold)" strokeWidth="1.2"/>
                    <path d="M8 7v4M8 5h.01" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 300, color: '#222', marginBottom: 6 }}>
                  Select a concern area
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#666', letterSpacing: '0.04em', lineHeight: 1.7 }}>
                  Tap any area on the face illustration<br/>to select your concerns.
                </p>
              </div>
            )}

            {/* Concern panel */}
            {!debug && (
              <AnimatePresence mode="wait">
                {activeArea && (
                  <motion.div
                    key={activeAreaId}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                    style={{ border: '1px solid rgba(199,164,106,0.45)', background: '#fff', padding: '22px 24px', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--gold), rgba(199,164,106,0.2))' }} />
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>Concern Area</p>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 300, color: '#111' }}>{activeArea.label}</p>
                      </div>
                      <button type="button" onClick={() => setActiveAreaId(null)} aria-label="Close"
                        style={{ width: 28, height: 28, flexShrink: 0, marginTop: 2, border: '1px solid #ccc', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='#888'; e.currentTarget.style.color='#111' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='#ccc'; e.currentTarget.style.color='#666' }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>Select all that apply</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {activeArea.concernOptions.map(concern => {
                        const on = getAreaData(activeAreaId)?.concerns.includes(concern) ?? false
                        return (
                          <motion.button key={concern} type="button" onClick={() => toggleConcern(activeAreaId, concern)} whileTap={{ scale: 0.95 }}
                            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 14px', border: `1px solid ${on ? 'var(--gold)' : '#ccc'}`, background: on ? 'rgba(199,164,106,0.09)' : '#fff', fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.03em', color: on ? '#111' : '#333', cursor: 'pointer', transition: 'all 0.18s' }}
                          >
                            <motion.span initial={false} animate={{ width: on ? 14 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.18 }} style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                              <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5L8 1" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </motion.span>
                            {concern}
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Selected area chips */}
            {!debug && (
              <AnimatePresence>
                {selectedAreas.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#222' }}>
                        Selected Areas
                        <span style={{ marginLeft: 8, color: 'var(--gold)', fontWeight: 400 }}>{selectedAreas.length}</span>
                      </p>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#777' }}>
                        Tap to edit · × to remove
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      <AnimatePresence initial={false}>
                        {selectedAreas.map(area => {
                          const isAct = activeAreaId === area.area
                          const hasConcerns = area.concerns.length > 0
                          return (
                            <motion.div key={area.area}
                              initial={{ opacity: 0, x: -8, height: 0 }} animate={{ opacity: 1, x: 0, height: 'auto' }} exit={{ opacity: 0, x: 8, height: 0 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}
                            >
                              <div
                                onClick={() => { const a = FACE_AREA_PATHS.find(a => a.id === area.area); if (a) handleAreaClick(a) }}
                                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', border: `1px solid ${isAct ? 'rgba(199,164,106,0.6)' : hasConcerns ? 'rgba(199,164,106,0.25)' : '#ddd'}`, background: isAct ? 'rgba(199,164,106,0.05)' : '#fff', cursor: 'pointer', transition: 'all 0.18s' }}
                              >
                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: hasConcerns ? 'var(--gold)' : '#ccc', marginTop: 6, flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: '#111', marginBottom: hasConcerns ? 6 : 0 }}>
                                    {area.areaLabel}
                                  </p>
                                  {hasConcerns ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                      {area.concerns.map(c => (
                                        <span key={c} style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#444', background: 'var(--warm-gray)', border: '1px solid #ddd', padding: '2px 7px' }}>
                                          {c}
                                        </span>
                                      ))}
                                    </div>
                                  ) : (
                                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: '#888', fontStyle: 'italic' }}>Tap to add concerns</p>
                                  )}
                                </div>
                                <button type="button" onClick={e => { e.stopPropagation(); removeArea(area.area) }}
                                  style={{ width: 20, height: 20, flexShrink: 0, border: '1px solid #ddd', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', transition: 'all 0.15s' }}
                                  onMouseEnter={e => { e.currentTarget.style.borderColor='#f87171'; e.currentTarget.style.color='#f87171' }}
                                  onMouseLeave={e => { e.currentTarget.style.borderColor='#ddd'; e.currentTarget.style.color='#aaa' }}
                                >
                                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 1l5 5M6 1L1 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                                </button>
                              </div>
                            </motion.div>
                          )
                        })}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <NavButtons onBack={onBack} />
          </div>{/* end RIGHT column */}
        </div>{/* end grid */}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </form>
    </StepWrapper>
  )
}
