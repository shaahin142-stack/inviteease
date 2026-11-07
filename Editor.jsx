import { useState } from 'react'
import Invite from './Invite'
import Field from './Field'
import Swatches from './Swatches'
import { TPL, FONTS, TXT, BGS, baseData } from '../data/templates'
import { draw } from '../utils/draw'
import { useImg } from '../utils/hooks'

export default function Editor({ tpl, setTpl, tick, toast }) {
  const [d, setD] = useState(() => baseData(tpl))
  const img = useImg(d.photo)
  const up = (k, v) => setD((p) => ({ ...p, [k]: v }))

  // Switch template but keep everything the customer typed
  const pick = (t) => {
    setTpl(t)
    setD((p) => ({ ...p, font: t.font, color: t.text, bg: t.bg }))
  }

  const onPhoto = (e) => {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = () => up('photo', r.result)
    r.readAsDataURL(f)
  }

  // High-quality export: render at 2x (2160 x 2700 px)
  const makeBlob = () =>
    new Promise((res) => {
      const cv = document.createElement('canvas')
      draw(cv, d, tpl, img, 2)
      cv.toBlob(res, 'image/png')
    })

  const download = async () => {
    const b = await makeBlob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(b)
    a.download = 'InviteEase-' + (d.event || 'invitation').replace(/\W+/g, '-') + '.png'
    a.click()
    toast('Invitation downloaded ✓')
  }

  const whatsapp = async () => {
    const when = d.date ? ' – ' + new Date(d.date).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' }) : ''
    const text = `You’re invited! ${d.event}${when}${d.venue ? ' at ' + d.venue : ''}. – ${d.host}`
    const b = await makeBlob()
    const f = new File([b], 'invitation.png', { type: 'image/png' })
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      try {
        await navigator.share({ files: [f], text })
        return
      } catch (e) {
        if (e.name === 'AbortError') return
      }
    }
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank')
    toast('WhatsApp opened with your message. Download the image and attach it in the chat.')
  }

  return (
    <div className="wrap ed">
      <div className="pv">
        <div className="stage">
          <div className="frame">
            <Invite d={d} t={tpl} img={img} sc={0.45} tick={tick} />
          </div>
        </div>
        <div className="pvcap">Live preview · updates as you type</div>
      </div>

      <div style={{ display: 'grid', gap: 18 }}>
        <div className="panel">
          <h3>Template</h3>
          <div className="strip">
            {TPL.filter((t) => t.cat === tpl.cat).map((t) => (
              <button key={t.id} className={t.id === tpl.id ? 'on' : ''} onClick={() => pick(t)} aria-label={t.name}>
                <Invite d={baseData(t)} t={t} sc={0.07} tick={tick} />
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Details</h3>
          <Field label="Host name" value={d.host} onChange={(v) => up('host', v)} />
          <Field label="Event name" value={d.event} onChange={(v) => up('event', v)} />
          <Field label="Date and time" type="datetime-local" value={d.date} onChange={(v) => up('date', v)} />
          <Field label="Venue" value={d.venue} onChange={(v) => up('venue', v)} />
          <label>
            Address
            <textarea style={{ minHeight: 60 }} value={d.address} onChange={(e) => up('address', e.target.value)} />
          </label>
          <label>
            Invitation message
            <textarea value={d.msg} onChange={(e) => up('msg', e.target.value)} />
          </label>
          <label>
            Personal photo
            <input type="file" accept="image/*" onChange={onPhoto} />
          </label>
          {d.photo && <button className="btn alt sm" onClick={() => up('photo', null)}>Remove photo</button>}
        </div>

        <div className="panel">
          <h3>Style</h3>
          <label>Font</label>
          <div className="fonts">
            {FONTS.map((f) => (
              <button key={f} className={d.font === f ? 'on' : ''} style={{ fontFamily: f }} onClick={() => up('font', f)}>
                {f}
              </button>
            ))}
          </div>
          <label>Text colour</label>
          <Swatches list={TXT} val={d.color} on={(v) => up('color', v)} />
          <label>Background colour</label>
          <Swatches list={BGS} val={d.bg} on={(v) => up('bg', v)} />
        </div>

        <div className="acts">
          <button className="btn" onClick={download}>⬇ Download image</button>
          <button className="btn wa" onClick={whatsapp}>Share on WhatsApp</button>
          <button className="btn alt" onClick={() => { setD(baseData(tpl)); toast('Reset to template defaults') }}>Reset</button>
        </div>
      </div>
    </div>
  )
}
