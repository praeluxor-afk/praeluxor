'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

type Badge = 'LIVE' | 'IN DEV'

interface Project {
  title:    string
  category: string
  badge:    Badge
  image:    string
  url?:     string
}

const PROJECTS: Project[] = [
  {
    title:    'Castello di Carlo V',
    category: 'Turismo · Crotone · 2026',
    badge:    'LIVE',
    image:    '/images/portfolio/castello.png',
    url:      'https://www.castellocarlovcrotone.it',
  },
  {
    title:    'Premio Castello',
    category: 'Evento Culturale · Crotone · 2026',
    badge:    'LIVE',
    image:    '/images/portfolio/premio.png',
    url:      'https://www.premiocastellocrotone.it',
  },
  {
    title:    'Studio Elia',
    category: 'Consulenza Lavoro · Crotone · 2026',
    badge:    'LIVE',
    image:    '/images/portfolio/elia.png',
    url:      'https://www.studioconsulenzaelia.it',
  },
  {
    title:    'PronosticiPro',
    category: 'SaaS · Pronostici Calcio · 2026',
    badge:    'IN DEV',
    image:    '/images/portfolio/pronosticipro.png',
  },
  {
    title:    'BookMe',
    category: 'App Mobile · Prenotazioni · 2026',
    badge:    'IN DEV',
    image:    '/images/portfolio/bookme.png',
  },
]

const BADGE_STYLE = {
  LIVE:     { background: '#166534', color: '#bbf7d0' },
  'IN DEV': { background: '#78350f', color: '#fde68a' },
}

function BadgePill({ badge }: { badge: Badge }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-sans text-[9px] font-semibold tracking-wide uppercase"
      style={BADGE_STYLE[badge]}
    >
      {badge === 'LIVE' && (
        <span className="w-1 h-1 rounded-full bg-[#bbf7d0] animate-pulse" />
      )}
      {badge}
    </span>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Portfolio() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 md:mb-20">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C8A84B] mb-4">
            Lavori recenti
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white">
            Portfolio
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.title}
              variants={item}
              className="flex flex-col overflow-hidden rounded-lg bg-white/[0.05]"
              style={{ borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              {/* Image */}
              <div className="relative h-[130px] shrink-0">
                <div className="absolute top-2 left-2 z-10">
                  <BadgePill badge={p.badge} />
                </div>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover"
                />
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-3 gap-0.5">
                <p className="font-sans text-[13px] font-medium text-white leading-snug">
                  {p.title}
                </p>
                <p className="font-sans text-[11px] text-white/40">
                  {p.category}
                </p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-2 inline-flex items-center gap-1 font-sans text-[11px] text-[#C8A84B] hover:text-[#e0c070] transition-colors"
                  >
                    Visita il sito <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
