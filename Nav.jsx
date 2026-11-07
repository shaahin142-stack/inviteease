export default function Nav({ go }) {
  return (
    <nav>
      <div className="wrap">
        <button className="logo" onClick={() => go('home')}>InviteEase</button>
        <div className="links">
          <button onClick={() => go('home', 'cats')}>Categories</button>
          <button onClick={() => go('gallery')}>Templates</button>
          <button onClick={() => go('home', 'how')}>How it works</button>
        </div>
        <button className="btn sm" onClick={() => go('gallery')}>Create invite</button>
      </div>
    </nav>
  )
}
