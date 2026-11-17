import { useEffect } from 'react'
import { ContactForm } from '../components/ContactForm'

const services = [
  { number: '01', name: 'Architectural glass', detail: 'Partitions, balustrades and bespoke glazing that open a room to possibility.' },
  { number: '02', name: 'Windows & doors', detail: 'Considered frames and clear views, measured and fitted with care.' },
  { number: '03', name: 'Interior detailing', detail: 'Mirrors, shower enclosures and the finishing touches that make a space yours.' },
]

const projects = [
  { image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85', alt: 'Sunlit contemporary living space with warm natural materials', name: 'A quieter kind of open plan', type: 'GLASS STUDY · PARTITIONS', className: 'project-image-tall' },
  { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85', alt: 'Modern home interior with floor-to-ceiling glazing', name: 'Light, carried through', type: 'GLASS STUDY · FRAMING & LIGHT', className: 'project-image-wide' },
  { image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85', alt: 'Refined interior with natural stone and detailed finishes', name: 'Small details, well resolved', type: 'DETAIL STUDY · REFLECTION & STONE', className: 'project-image-detail' },
]

export function HomePage() {
  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' })

    revealElements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return (
    <main id="home">
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2200&q=90" alt="Modern glass-fronted home framed by trees" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> GLASS, GLAZING & INTERIORS</p>
          <h1 id="hero-title">Spaces shaped<br />by <em>light.</em></h1>
          <p className="hero-intro">We bring clarity to the spaces you live and work in, with considered glasswork and interior finishes, made to measure.</p>
          <a className="button button-light" href="#contact">Discuss your project <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-caption"><span>01 / 03</span><span>DESIGNED FOR THE WAY YOU LIVE</span></div>
        <a className="scroll-cue" href="#work" aria-label="Scroll to our work">↓</a>
      </section>

      <section className="intro-band" id="about">
        <p className="eyebrow" data-reveal>A MORE THOUGHTFUL FINISH</p>
        <p className="intro-statement" data-reveal>Good design is felt in the everyday. We pair precise glasswork with a considered eye for how a room should <em>feel.</em></p>
        <span className="intro-index" data-reveal>01 — 03</span>
      </section>

      <section className="work-section section-wrap" id="work">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow">MATERIAL & SPACE STUDIES</p><h2>Made for <em>living.</em></h2></div>
          <p>Every space has its own character. Our work starts by listening, then making the details feel like they always belonged.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1}`} data-reveal key={project.name}>
              <div className={`project-image ${project.className}`}>
                <img src={project.image} alt={project.alt} loading="lazy" />
                <span className="project-number">0{index + 1}</span>
              </div>
              <div className="project-meta"><h3>{project.name}</h3><span>{project.type}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="services-inner">
          <div className="services-heading" data-reveal><p className="eyebrow">WHAT WE DO</p><h2>Clear thinking.<br /><em>Beautifully made.</em></h2><p>From first measure to final fitting, one team takes care of the details.</p></div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" data-reveal key={service.number}>
                <span className="service-number">{service.number}</span>
                <div><h3>{service.name}</h3><p>{service.detail}</p></div>
                <span className="service-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-aside" data-reveal>
          <p className="eyebrow">LET'S MAKE SOMETHING LAST</p>
          <h2>Tell us what<br />you <em>see.</em></h2>
          <p className="contact-note">A new room, a renovation, or one detail you can't quite solve. Tell us a little about it and our team will be in touch.</p>
          <div className="contact-mark" aria-hidden="true">V<span>G&I</span></div>
        </div>
        <div className="contact-form-wrap" data-reveal><ContactForm /></div>
      </section>
    </main>
  )
}