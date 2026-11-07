import Invite from './Invite'
import { TPL, baseData } from '../data/templates'

export default function Hero({ go, tick }) {
  const t = TPL[1]
  return (
    <div className="hero">
      <div className="blob" style={{ width: 300, height: 300, background: '#f6c9d4', top: -60, left: -60 }} />
      <div className="blob" style={{ width: 260, height: 260, background: '#dcd0f5', bottom: -60, right: '30%', animationDelay: '2s' }} />
      <div className="wrap">
        <div>
          <span className="tag">✨ Digital invitations</span>
          <h1>Invitations that feel as special as your celebration</h1>
          <p>Pick a beautiful template, personalise every detail in minutes, then download or share on WhatsApp. No design skills needed.</p>
          <div className="cta">
            <button className="btn" onClick={() => go('gallery')}>Browse templates</button>
            <button className="btn alt" onClick={() => go('home', 'cats')}>Explore categories</button>
          </div>
        </div>
        <div className="card">
          <Invite d={baseData(t)} t={t} sc={0.35} tick={tick} />
        </div>
      </div>
    </div>
  )
}
