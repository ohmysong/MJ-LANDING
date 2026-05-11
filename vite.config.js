import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs   from 'fs'
import path from 'path'

// ── Serialise areas array back to faceAreaPaths.js ──────────────────────────
function buildFileContent(areas) {
  const areasStr = areas.map(area => {
    const shapes = area.shapes.map(s => {
      const rot = (s.rotation && s.rotation !== 0) ? `, rotation: ${s.rotation}` : ''
      return `      { type: '${s.type}', cx: ${s.cx}, cy: ${s.cy}, rx: ${s.rx}, ry: ${s.ry}${rot} }`
    }).join(',\n')
    const concerns = area.concernOptions.map(c => `    ${JSON.stringify(c)}`).join(',\n')
    return `  {
    id: ${JSON.stringify(area.id)},
    label: ${JSON.stringify(area.label)},
    shapes: [
${shapes}
    ],
    labelPos: { x: ${area.labelPos.x}, y: ${area.labelPos.y} },
    concernOptions: [
${concerns}
    ],
  }`
  }).join(',\n')

  const palette = [
    'rgba(255,80,80,0.32)','rgba(255,160,80,0.32)','rgba(80,200,80,0.32)',
    'rgba(80,80,255,0.32)','rgba(200,80,200,0.32)','rgba(80,200,200,0.32)',
    'rgba(200,200,80,0.32)','rgba(255,120,120,0.32)','rgba(120,255,120,0.32)',
    'rgba(120,120,255,0.32)','rgba(255,200,80,0.32)','rgba(80,255,200,0.32)',
    'rgba(200,80,255,0.32)','rgba(80,160,255,0.32)',
  ].map(c => `  '${c}'`).join(',\n')

  return `// viewBox: 0 0 1254 1254  (matches face.png — 1254×1254 px)
// Last saved by debug editor — ${new Date().toISOString()}

export const FACE_AREA_PATHS = [
${areasStr}
]

export const DEBUG_PALETTE = [
${palette}
]
`
}

// ── Dev-only Vite plugin: POST /api/save-face-areas ─────────────────────────
function saveFaceAreasPlugin() {
  return {
    name: 'save-face-areas',
    configureServer(server) {
      server.middlewares.use('/api/save-face-areas', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405; res.end('Method Not Allowed'); return
        }
        let raw = ''
        req.on('data', chunk => { raw += chunk.toString() })
        req.on('end', () => {
          try {
            const areas    = JSON.parse(raw)
            const filePath = path.join(process.cwd(), 'src', 'lib', 'faceAreaPaths.js')
            fs.writeFileSync(filePath, buildFileContent(areas), 'utf-8')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
        req.on('error', () => {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'stream error' }))
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), saveFaceAreasPlugin()],
  base: '/mj/',
})
