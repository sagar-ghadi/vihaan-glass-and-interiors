import { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true)
  const [isLoaderLeaving, setIsLoaderLeaving] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsLoaderVisible(false)
      return
    }

    const fadeTimer = window.setTimeout(() => setIsLoaderLeaving(true), 850)
    const removeTimer = window.setTimeout(() => setIsLoaderVisible(false), 1300)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  return (
    <>
      {isLoaderVisible && (
        <div className={`site-loader${isLoaderLeaving ? ' site-loader-leaving' : ''}`} role="status" aria-live="polite">
          <div className="loader-emblem" aria-hidden="true"><span>V</span><i /></div>
          <p className="loader-brand">VIHAAN <span>GLASS & INTERIORS</span></p>
          <p className="loader-caption">Bringing the details into focus</p>
          <div className="loader-track" aria-hidden="true"><span /></div>
        </div>
      )}
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Vihaan Glass and Interiors home">
          <span className="brand-mark" aria-hidden="true">V</span>
          <span className="brand-name">VIHAAN <span>GLASS & INTERIORS</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Our work</a>
          <a href="#services">What we do</a>
          <a href="#about">About</a>
        </nav>
        <a className="header-cta" href="#contact">Start a project <span aria-hidden="true">↗</span></a>
      </header>
      <HomePage />
      <footer className="site-footer">
        <a className="footer-brand" href="#home">VIHAAN <span>GLASS & INTERIORS</span></a>
        <p>Thoughtful spaces, made to last.</p>
        <a href="#contact">Tell us what you have in mind <span aria-hidden="true">↗</span></a>
        <small>© {new Date().getFullYear()} Vihaan Glass & Interiors</small>
      </footer>
    </>
  )
}

export default App