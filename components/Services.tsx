'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  {
    title: 'Siti Web',
    desc:  'Design su misura, performance eccellenti e SEO integrata per massimizzare la tua presenza online.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    title: 'App Mobile',
    desc:  'Applicazioni native e cross-platform con esperienza utente fluida e coinvolgente.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
  },
  {
    title: 'SaaS & Abbonamenti',
    desc:  'Piattaforme scalabili con modelli subscription, dashboard avanzate e integrazioni payment.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'E-commerce',
    desc:  'Store online ottimizzati per la conversione, con gestione inventario e checkout fluido.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    title: 'SEO Tecnico',
    desc:  'Ottimizzazione profonda: Core Web Vitals, structured data, architettura URL e crawlability.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
  {
    title: 'Consulenza Digitale',
    desc:  'Strategia digitale, audit UX e roadmap tecnologica per portare il tuo business al livello successivo.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
]

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const card = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function Services() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servizi" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 md:mb-20">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C8A84B] mb-4">
            Cosa facciamo
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white">
            Servizi
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C8A84B]/10"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.title}
              variants={card}
              className="group p-8 md:p-10 bg-[#03030A] hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="mb-6 text-[#C8A84B]/50 group-hover:text-[#C8A84B] transition-colors duration-300">
                {s.svg}
              </div>
              <h3 className="font-serif text-2xl font-light text-white mb-4 group-hover:text-[#E8C96A] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                {s.desc}
              </p>
              <div
                className="mt-8 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ backgroundColor: '#C8A84B' }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
