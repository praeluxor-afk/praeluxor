'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useParticles } from '@/hooks/useParticles'

const TICKER_ITEMS = [
  'Siti Web', 'App Mobile', 'SaaS & Abbonamenti',
  'E-commerce', 'SEO Tecnico', 'Consulenza Digitale',
]

const ORBIT_RINGS = [
  { size: 168, duration: '12s', direction: 'normal',  dotSize: 8,  dotOpacity: 1   },
  { size: 228, duration: '8s',  direction: 'reverse', dotSize: 6,  dotOpacity: 0.6 },
  { size: 290, duration: '20s', direction: 'normal',  dotSize: 4,  dotOpacity: 0.3 },
]

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.22 } },
}

const line = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export default function Hero() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const reduced      = useReducedMotion()
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useParticles(canvasRef, 80, reduced || mobile)

  const tickerFull = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Canvas */}
      {!reduced && !mobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,168,75,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 md:gap-14 px-4 w-full max-w-6xl mx-auto text-center">

        {/* Logo + orbit rings */}
        <div className="relative flex items-center justify-center" style={{ width: 290, height: 290 }}>
          {ORBIT_RINGS.map(({ size, duration, direction, dotSize, dotOpacity }, i) => {
            const offset = (290 - size) / 2
            return (
              <div
                key={i}
                aria-hidden="true"
                className="absolute rounded-full border border-[#C8A84B]"
                style={{
                  width: size,
                  height: size,
                  top: offset,
                  left: offset,
                  opacity: 0.15 + i * 0.05,
                  animation: `spin-orbit ${duration} linear ${direction} infinite`,
                }}
              >
                <span
                  className="absolute rounded-full bg-[#C8A84B]"
                  style={{
                    width: dotSize,
                    height: dotSize,
                    top: -dotSize / 2,
                    left: '50%',
                    marginLeft: -dotSize / 2,
                    opacity: dotOpacity,
                    boxShadow: `0 0 ${dotSize * 2}px #C8A84B`,
                  }}
                />
              </div>
            )
          })}

          {/* Logo */}
          <div
            className="relative rounded-full overflow-hidden border-2 border-[#C8A84B]/50 z-10"
            style={{
              width: 110,
              height: 110,
              boxShadow: '0 0 24px rgba(200,168,75,0.25)',
            }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Praeluxor Digital Studio"
              fill
              priority
              className="object-cover"
              sizes="110px"
            />
          </div>
        </div>

        {/* Headline */}
        <motion.div
          variants={stagger}
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
        >
          <h1 className="font-serif font-light leading-[1.1] tracking-tight">
            <motion.span
              variants={line}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white"
            >
              Costruiamo
            </motion.span>
            <motion.span
              variants={line}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic"
              style={{ color: '#E8C96A' }}
            >
              prodotti digitali
            </motion.span>
            <motion.span
              variants={line}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-stroke"
            >
              straordinari.
            </motion.span>
          </h1>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="#contatti"
            className="inline-flex items-center gap-3 min-h-[52px] px-8 py-3 border border-[#C8A84B] text-[#C8A84B] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#C8A84B] hover:text-[#03030A] transition-all duration-300 group"
          >
            Inizia il Progetto
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 border-t border-[#C8A84B]/10 py-3 overflow-hidden bg-[#03030A]/50 backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="flex whitespace-nowrap"
          style={{ animation: 'ticker 32s linear infinite' }}
        >
          {tickerFull.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8 px-8 font-sans text-[11px] tracking-[0.25em] uppercase text-[#C8A84B]/50"
            >
              {item}
              <span className="text-[#C8A84B]/20 text-base">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-px h-8 bg-[#C8A84B]/30"
        style={{ animation: 'fade-pulse 2s ease-in-out infinite' }}
      />
    </section>
  )
}
