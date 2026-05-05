'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Badge = 'LIVE' | 'IN DEV' | null

interface Project {
  title:    string
  category: string
  badge:    Badge
  gradient: string
}

const PROJECTS: Project[] = [
  {
    title:    'Castello di Carlo V',
    category: 'Sito istituzionale',
    badge:    null,
    gradient: 'linear-gradient(160deg, #1a1209 0%, #0d0c0a 100%)',
  },
  {
    title:    'Premio Castello',
    category: 'Evento & Premio',
    badge:    null,
    gradient: 'linear-gradient(160deg, #0e1117 0%, #080b0f 100%)',
  },
  {
    title:    'Studio Elia',
    category: 'Sito professionale',
    badge:    'LIVE',
    gradient: 'linear-gradient(160deg, #0a1018 0%, #060a10 100%)',
  },
  {
    title:    'PronosticiPro',
    category: 'SaaS & Abbonamenti',
    badge:    'IN DEV',
    gradient: 'linear-gradient(160deg, #10100e 0%, #0a0a08 100%)',
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
          {PROJECTS.map((p) => (
            <motion.article
              key={p.title}
              variants={item}
              className="group relative overflow-hidden cursor-default"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{ background: p.gradient }}
              />
              {/* Gold grid pattern */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px),' +
                    'linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              />

              {/* Badge */}
              {p.badge && (
                <div className="absolute top-3 left-3 z-20">
                  <BadgePill badge={p.badge} />
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
              </div>

              {/* Default bottom title */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#03030A]/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <p className="font-serif text-sm font-light text-white/80 leading-snug">
                  {p.title}
                </p>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-[#C8A84B]/0 group-hover:border-[#C8A84B]/30 transition-colors duration-300 z-10" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
