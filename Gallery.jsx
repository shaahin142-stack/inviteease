import Invite from './Invite'
import { CATS, TPL, baseData } from '../data/templates'

export default function Gallery({ go, cat, setCat, tick }) {
  const list = TPL.filter((t) => !cat || t.cat === cat)
  return (
    <section>
      <div className="wrap">
        <div className="title">
          <h2>Invitation templates</h2>
          <p>Every template is fully editable</p>
        </div>
        <div className="chips">
          <button className={'chip' + (!cat ? ' on' : '')} onClick={() => setCat('')}>All</button>
          {CATS.map((c) => (
            <button key={c.id} className={'chip' + (cat === c.id ? ' on' : '')} onClick={() => setCat(c.id)}>
              {c.e} {c.n}
            </button>
          ))}
        </div>
        <div className="grid">
          {list.map((t, i) => (
            <div className="tc" key={t.id} style={{ animationDelay: i * 60 + 'ms' }}>
              <Invite d={baseData(t)} t={t} sc={0.3} tick={tick} />
              <div className="in">
                <div>
                  <b>{t.name}</b>
                  <small>{CATS.find((c) => c.id === t.cat).n}</small>
                </div>
                <button className="btn sm" onClick={() => go('editor', null, null, t)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
