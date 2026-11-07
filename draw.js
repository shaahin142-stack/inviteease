// Canvas renderer: the same function draws thumbnails, the live preview and the downloaded image.
const mix = (h, t) => {
  const n = parseInt(h.slice(1), 16)
  const f = (v) => Math.round(v + (255 - v) * t)
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`
}

function wrap(c, s, max) {
  const out = []
  ;(s || '').split('\n').forEach((p) => {
    let l = ''
    p.split(' ').forEach((w) => {
      const t = l ? l + ' ' + w : w
      if (c.measureText(t).width > max && l) {
        out.push(l)
        l = w
      } else l = t
    })
    out.push(l)
  })
  return out
}

function flower(c, x, y, r, col, a) {
  c.save()
  c.globalAlpha = a
  c.translate(x, y)
  c.fillStyle = col
  for (let i = 0; i < 6; i++) {
    c.rotate(Math.PI / 3)
    c.beginPath()
    c.ellipse(0, -r * 0.55, r * 0.32, r * 0.55, 0, 0, 7)
    c.fill()
  }
  c.fillStyle = '#fff'
  c.beginPath()
  c.arc(0, 0, r * 0.2, 0, 7)
  c.fill()
  c.restore()
}

function heart(c, x, y, s) {
  c.beginPath()
  c.moveTo(x, y + s * 0.3)
  c.bezierCurveTo(x - s, y - s * 0.5, x - s * 0.5, y - s, x, y - s * 0.4)
  c.bezierCurveTo(x + s * 0.5, y - s, x + s, y - s * 0.5, x, y + s * 0.3)
  c.fill()
}

function star(c, x, y, r) {
  c.beginPath()
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2
    const k = i % 2 ? r * 0.45 : r
    c.lineTo(x + Math.cos(a) * k, y + Math.sin(a) * k)
  }
  c.closePath()
  c.fill()
}

function deco(c, k, ac, w, h) {
  let s = 7
  const r = () => (s = (s * 9301 + 49297) % 233280) / 233280
  c.fillStyle = c.strokeStyle = ac
  if (k === 'floral') {
    ;[[90, 90, 120], [1000, 110, 90], [40, 1270, 100], [1010, 1290, 130], [200, 40, 50], [900, 1230, 50]].forEach((f, i) =>
      flower(c, f[0], f[1], f[2], ac, i < 4 ? 0.45 : 0.3)
    )
  } else if (k === 'dots' || k === 'confetti' || k === 'stars' || k === 'hearts') {
    for (let i = 0; i < 46; i++) {
      let x = r() * w
      let y = r() * h
      if (x > 150 && x < w - 150 && y > 150 && y < h - 150) x = r() < 0.5 ? r() * 130 : w - r() * 130
      c.globalAlpha = 0.25 + r() * 0.35
      const z = 14 + r() * 28
      if (k === 'dots') {
        c.beginPath()
        c.arc(x, y, z / 1.5, 0, 7)
        c.fill()
      } else if (k === 'stars') star(c, x, y, z)
      else if (k === 'hearts') heart(c, x, y, z)
      else {
        c.save()
        c.translate(x, y)
        c.rotate(r() * 3)
        c.fillStyle = i % 3 ? ac : '#ffffffcc'
        c.fillRect(-z / 2, -z / 5, z, z / 2.5)
        c.restore()
      }
    }
    c.globalAlpha = 1
  } else if (k === 'frame') {
    c.lineWidth = 5
    c.globalAlpha = 0.8
    c.strokeRect(50, 50, w - 100, h - 100)
    c.lineWidth = 2
    c.strokeRect(72, 72, w - 144, h - 144)
    ;[[72, 72], [w - 72, 72], [72, h - 72], [w - 72, h - 72]].forEach((p) => flower(c, p[0], p[1], 46, ac, 0.8))
    c.globalAlpha = 1
  } else if (k === 'arch') {
    c.globalAlpha = 0.8
    ;[0, 26].forEach((o) => {
      c.beginPath()
      c.moveTo(80 + o, h - 80 - o)
      c.lineTo(80 + o, 430)
      c.arc(w / 2, 430, w / 2 - 80 - o, Math.PI, 0)
      c.lineTo(w - 80 - o, h - 80 - o)
      c.closePath()
      c.lineWidth = o ? 2 : 5
      c.stroke()
    })
    flower(c, w / 2, 40, 56, ac, 0.7)
    flower(c, 120, h - 120, 60, ac, 0.5)
    flower(c, w - 120, h - 120, 60, ac, 0.5)
    c.globalAlpha = 1
  }
}

/** Draws the invitation (1080x1350 design units) onto canvas `cv`, scaled by `sc`. */
export function draw(cv, d, t, img, sc) {
  const w = 1080
  const h = 1350
  cv.width = w * sc
  cv.height = h * sc
  const c = cv.getContext('2d')
  c.scale(sc, sc)

  const g = c.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, d.bg)
  g.addColorStop(1, mix(d.bg, 0.55))
  c.fillStyle = g
  c.fillRect(0, 0, w, h)

  deco(c, t.deco, t.accent, w, h)
  if (t.deco !== 'frame' && t.deco !== 'arch') {
    const gg = c.createLinearGradient(0, 0, w, h)
    gg.addColorStop(0, '#b8903f')
    gg.addColorStop(0.5, '#f0d98c')
    gg.addColorStop(1, '#b8903f')
    c.strokeStyle = gg
    c.lineWidth = 4
    c.strokeRect(34, 34, w - 68, h - 68)
    c.lineWidth = 1.5
    c.strokeRect(50, 50, w - 100, h - 100)
  }

  c.textAlign = 'center'
  c.textBaseline = 'alphabetic'
  c.fillStyle = d.color

  let y = 210
  if (img) {
    c.save()
    c.beginPath()
    c.arc(540, 330, 165, 0, 7)
    c.clip()
    const k = Math.max(330 / img.width, 330 / img.height)
    const iw = img.width * k
    const ih = img.height * k
    c.drawImage(img, 540 - iw / 2, 330 - ih / 2, iw, ih)
    c.restore()
    c.strokeStyle = t.accent
    c.lineWidth = 8
    c.beginPath()
    c.arc(540, 330, 178, 0, 7)
    c.stroke()
    y = 580
  }

  c.font = '500 26px Montserrat'
  c.letterSpacing = '8px'
  c.fillText('YOU ARE INVITED TO', 540 + 4, y)
  c.letterSpacing = '0px'

  const ev = d.event || 'Your Event'
  let sz = ev.length > 22 ? 84 : ev.length > 12 ? 106 : 132
  let L
  do {
    c.font = `${sz}px "${d.font}"`
    L = wrap(c, ev, 860)
    sz -= 8
  } while (L.length > 3 && sz > 50)
  sz += 8
  y += sz * 0.95
  L.forEach((l) => {
    c.fillText(l, 540, y)
    y += sz * 0.98
  })

  y += 4
  c.font = 'italic 500 34px "Cormorant Garamond"'
  c.fillText('hosted by', 540, y + 10)
  y += 64
  c.font = `58px "${d.font}"`
  c.fillText(d.host || 'Host name', 540, y)

  y += 44
  c.fillStyle = '#c2993f'
  c.fillRect(440, y, 200, 3)
  c.save()
  c.translate(540, y + 1.5)
  c.rotate(Math.PI / 4)
  c.fillRect(-9, -9, 18, 18)
  c.restore()
  c.fillStyle = d.color

  y += 66
  c.font = 'italic 500 38px "Cormorant Garamond"'
  wrap(c, d.msg, 800)
    .slice(0, 6)
    .forEach((l) => {
      c.fillText(l, 540, y)
      y += 50
    })

  const B = []
  const dt = d.date ? new Date(d.date) : null
  if (dt && !isNaN(dt)) {
    B.push(['600 50px "Cormorant Garamond"', dt.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), 62])
    B.push(['500 30px Montserrat', dt.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }), 58])
  }
  if (d.venue) B.push(['700 40px "Cormorant Garamond"', d.venue, 52])
  if (d.address) {
    c.font = '400 26px Montserrat'
    wrap(c, d.address, 780).forEach((l) => B.push(['400 26px Montserrat', l, 38]))
  }
  let by = h - (t.deco === 'frame' || t.deco === 'arch' ? 150 : 110) - B.reduce((a, b) => a + b[2], 0) + 34
  B.forEach((b) => {
    c.font = b[0]
    c.fillText(b[1], 540, by)
    by += b[2]
  })
}
