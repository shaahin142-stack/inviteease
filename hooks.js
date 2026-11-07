import { useEffect, useState } from 'react'
import { FONTS } from '../data/templates'

/** Re-renders once the web fonts are ready so canvases redraw with the right typefaces. */
export function useFonts() {
  const [n, set] = useState(0)
  useEffect(() => {
    Promise.all(
      FONTS.flatMap((f) => [`40px "${f}"`, `italic 500 30px "${f}"`, `700 30px "${f}"`].map((s) => document.fonts.load(s)))
    ).then(() => set(1))
    document.fonts.ready.then(() => set((x) => x + 1))
  }, [])
  return n
}

/** Loads an uploaded photo (data URL) into an Image element. */
export function useImg(src) {
  const [img, set] = useState(null)
  useEffect(() => {
    if (!src) return set(null)
    const m = new Image()
    m.onload = () => set(m)
    m.src = src
  }, [src])
  return img
}
