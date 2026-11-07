import Hero from './Hero'
import { CATS, TPL } from '../data/templates'

const STEPS = [
  ['1', 'Choose', 'Pick a template that matches your event’s mood.'],
  ['2', 'Personalise', 'Edit names, date, venue, message, photo, fonts and colours with a live preview.'],
  ['3', 'Share', 'Download a high-quality image or send it straight to WhatsApp.'],
]

export default function Home({ go, tick }) {
  return (
    <>
      <Hero go={go} tick={tick} />
      <section id="cats">
        <div className="wrap">
          <div className="title">
            <h2>Invitations for every occasion</h2>
            <p>Choose a category to see matching designs</p>
          </div>
          <div className="cats">
            {CATS.map((c) => (
              <button key={c.id} className="cat" onClick={() => go('gallery', null, c.id)}>
                <span className="e">{c.e}</span>
                <b>{c.n}</b>
                <small>{TPL.filter((t) => t.cat === c.id).length} templates</small>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section id="how" style={{ background: 'color-mix(in srgb,var(--pink) 18%,var(--bg))' }}>
        <div className="wrap">
          <div className="title"><h2>Three easy steps</h2></div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s[0]}>
                <i>{s[0]}</i>
                <h3>{s[1]}</h3>
                <p>{s[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
