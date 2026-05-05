'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Badge = 'LIVE' | 'IN DEV' | null

interface Project {
  title:    string
  category: string
  badge:    Badge
  gradient: string
  url?:     string
}

const PROJECTS: Project[] = [
  {
    title:    'Castello di Carlo V',
    category: 'Sito istituzionale',
    badge:    null,
    gradient: 'linear-gradient(160deg, #1a1108 0%, #0f0c06 100%)',
    url:      'https://www.castellocarlovcrotone.it',
  },
  {
    title:    'Premio Castello',
    category: 'Evento & Premio',
    badge:    null,
    gradient: 'linear-gradient(160deg, #0e1017 0%, #08090f 100%)',
    url:      'https://www.premiocastellocrotone.it',
  },
  {
    title:    'Studio Elia',
    category: 'Sito professionale',
    badge:    'LIVE',
    gradient: 'linear-gradient(160deg, #0a1018 0%, #060a10 100%)',
    url:      'https://www.studioconsulenzaelia.it',
  },
  {
    title:    'PronosticiPro',
    category: 'SaaS & Abbonamenti',
    badge:    'IN DEV',
    gradient: 'linear-gradient(160deg, #130f07 0%, #0c0a05 100%)',
  },
  {
    title:    'BookMe',
    category: 'App mobile',
    badge:    'IN DEV',
    gradient: 'linear-gradient(160deg, #0c0e14 0%, #080a10 100%)',
  },
]

function BadgePill({ badge }: { badge: Badge }) {
  if (!badge) return null
  const live = badge === 'LIVE'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-sans text-[9px] font-semibold tracking-[0.2em] uppercase border ${
        live
          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
          : 'bg-amber-500/15 text-amber-400 border-amber-500/25'
      }`}
    >
      {live && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {badge}
    </span>
  )
}

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

function GoldPlaceholder({ title }: { title: string }) {
  const initials = title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #1a1408 0%, #0a0805 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,168,75,0.12) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(200,168,75,0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-serif text-4xl font-light select-none"
          style={{ color: 'rgba(200,168,75,0.25)' }}
        >
          {initials}
        </span>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(200,168,75,0.05) 0%, transparent 70%)',
        }}
      />
    </>
  )
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
        >
          {PROJECTS.map((p) => {
            const inner = (
              <>
                <GoldPlaceholder title={p.title} />

                {/* Badge */}
                {p.badge && (
                  <div className="absolute top-3 left-3 z-20">
                    <BadgePill badge={p.badge} />
                  </div>
                )}

                {/* External link icon for live projects */}
                {p.url && (
                  <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,75,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#03030A]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-10 p-4 text-center">
                  <p className="font-serif text-base md:text-lg font-light text-white">
                    {p.title}
                  </p>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40">
                    {p.category}
                  </p>
                  {p.url && (
                    <p className="font-sans text-[9px] tracking-[0.15em] uppercase text-[#C8A84B]/70 mt-1">
                      Visita il sito →
                    </p>
                  )}
                </div>

                {/* Default bottom title */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#03030A]/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <p className="font-serif text-sm font-light text-white/80 leading-snug">
                    {p.title}
                  </p>
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-[#C8A84B]/0 group-hover:border-[#C8A84B]/30 transition-colors duration-300 z-10" />
              </>
            )

            const sharedClasses = 'group relative overflow-hidden'

            return (
              <motion.article
                key={p.title}
                variants={item}
                style={{ aspectRatio: '3/4' }}
                className={sharedClasses}
              >
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-30"
                    aria-label={`Visita ${p.title}`}
                  />
                ) : null}
                {inner}
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
