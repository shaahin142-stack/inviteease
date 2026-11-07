import { useRef, useState } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Gallery from './components/Gallery'
import Editor from './components/Editor'
import Footer from './components/Footer'
import Toast from './components/Toast'
import { TPL } from './data/templates'
import { useFonts } from './utils/hooks'

export default function App() {
  const [view, setView] = useState('home') // home | gallery | editor
  const [cat, setCat] = useState('')
  const [tpl, setTpl] = useState(TPL[0])
  const [msg, setMsg] = useState('')
  const timer = useRef()
  const tick = useFonts()

  const toast = (m) => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(''), 3500)
  }

  // go(view, scrollToId, category, template)
  const go = (v, anchor, c, t) => {
    if (c !== undefined && c !== null) setCat(c)
    else if (v === 'gallery' && !anchor && c === undefined) setCat('')
    if (t) setTpl(t)
    setView(v)
    setTimeout(() => {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <Nav go={go} />
      {view === 'home' && <Home go={go} tick={tick} />}
      {view === 'gallery' && <Gallery go={go} cat={cat} setCat={setCat} tick={tick} />}
      {view === 'editor' && <Editor tpl={tpl} setTpl={setTpl} tick={tick} toast={toast} />}
      <Footer />
      <Toast msg={msg} />
    </>
  )
}
