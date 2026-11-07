import { useEffect, useRef } from 'react'
import { draw } from '../utils/draw'

// Renders one invitation onto a canvas. Used for thumbnails, hero card and the live preview.
export default function Invite({ d, t, img, sc = 0.4, tick }) {
  const ref = useRef(null)
  useEffect(() => {
    draw(ref.current, d, t, img, sc)
  }, [d, t, img, sc, tick])
  return <canvas ref={ref} />
}
