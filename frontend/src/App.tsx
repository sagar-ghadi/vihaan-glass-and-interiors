import { HomePage } from './pages/HomePage'
import './App.css'

function App() {
  return (
    <>
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