export default function Swatches({ list, val, on }) {
  return (
    <div className="sw">
      {list.map((c) => (
        <button key={c} aria-label={c} className={val === c ? 'on' : ''} style={{ background: c }} onClick={() => on(c)} />
      ))}
      <input type="color" value={val} onChange={(e) => on(e.target.value)} aria-label="Custom colour" />
    </div>
  )
}
