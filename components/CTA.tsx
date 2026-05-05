'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTA() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contatti" ref={ref} className="relative py-32 md:py-44 px-4 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,168,75,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          className="flex flex-col items-center gap-8 md:gap-12"
        >
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C8A84B]">
            Lavoriamo insieme
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
            Hai un&apos;idea?{' '}
            <em className="not-italic" style={{ color: '#E8C96A' }}>
              Costruiamola
            </em>{' '}
            insieme.
          </h2>

          <a
            href="mailto:praeluxor@gmail.com"
            className="inline-flex items-center gap-3 min-h-[52px] px-10 py-4 bg-[#C8A84B] text-[#03030A] font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#E8C96A] transition-all duration-300 group"
          >
            praeluxor@gmail.com
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
