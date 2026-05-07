'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useParticles } from '@/hooks/useParticles'

const ORBIT_RINGS = [
  { size: 420, duration: '12s', direction: 'normal',  dotSize: 8, dotOpacity: 0.9 },
  { size: 540, duration: '8s',  direction: 'reverse', dotSize: 6, dotOpacity: 0.5 },
  { size: 660, duration: '22s', direction: 'normal',  dotSize: 4, dotOpacity: 0.3 },
]

// ~43% of desktop values, fits within 300px container
const ORBIT_RINGS_MOBILE = [
  { size: 180, duration: '12s', direction: 'normal',  dotSize: 4, dotOpacity: 0.9 },
  { size: 230, duration: '8s',  direction: 'reverse', dotSize: 3, dotOpacity: 0.5 },
  { size: 280, duration: '22s', direction: 'normal',  dotSize: 2, dotOpacity: 0.3 },
]

const FLOATING_TAGS = [
  { value: '8+',  label: 'Progetti Live', top: '8%',   left: 'auto', right: '3%',  bottom: 'auto', translateY: '0' },
  { value: '3',   label: 'App in Dev',    top: 'auto', left: '3%',   right: 'auto', bottom: '10%',  translateY: '0' },
  { value: '24h', label: 'Risposta',      top: '50%',  left: 'auto', right: '1%',   bottom: 'auto', translateY: '-50%' },
]

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced   = useReducedMotion()
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useParticles(canvasRef, 60, reduced || mobile)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Canvas particles */}
      {!reduced && !mobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Ambient glow — right side */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 78% 50%, rgba(200,168,75,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-0 md:min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ─── LEFT — text ─── */}
          <motion.div
            variants={container}
            initial={reduced ? 'visible' : 'hidden'}
            animate="visible"
            className="flex flex-col gap-8 text-center md:text-left"
          >
            {/* Kicker */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center md:justify-start gap-2"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#C8A84B' }}
              />
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C8A84B]">
                Praeluxor — Digital Studio
              </span>
            </motion.div>

            {/* Mobile logo — visible only below md, floating tags excluded */}
            <motion.div
              variants={fadeUp}
              className="flex md:hidden items-center justify-center"
              aria-hidden="true"
            >
              <div
                className="relative flex items-center justify-center flex-shrink-0"
                style={{ width: 300, height: 300 }}
              >
                {/* Radial glow */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 180,
                    height: 180,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background:
                      'radial-gradient(circle, rgba(200,168,75,0.22) 0%, transparent 68%)',
                  }}
                />

                {/* Orbit rings (mobile scale) */}
                {ORBIT_RINGS_MOBILE.map(({ size, duration, direction, dotSize, dotOpacity }, i) => {
                  const offset = (300 - size) / 2
                  return (
                    <div
                      key={i}
                      className="absolute rounded-full border border-[#C8A84B]"
                      style={{
                        width: size,
                        height: size,
                        top: offset,
                        left: offset,
                        opacity: 0.12 + i * 0.04,
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
                          boxShadow: `0 0 ${dotSize * 3}px #C8A84B`,
                        }}
                      />
                    </div>
                  )
                })}

                {/* Logo */}
                <div
                  className="relative z-10 flex-shrink-0"
                  style={{ animation: 'spin-orbit 20s linear infinite' }}
                >
                  <Image
                    src="/images/logo.png"
                    alt="Praeluxor Digital Studio"
                    width={160}
                    height={160}
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-serif leading-[0.95] tracking-tight"
              style={{ fontWeight: 300 }}
            >
              <span className="block text-[3rem] md:text-[5rem] lg:text-[6rem] text-white">
                Costruiamo
              </span>
              <span
                className="block text-[3rem] md:text-[5rem] lg:text-[6rem] italic"
                style={{ color: '#E8C96A' }}
              >
                esperienze
              </span>
              <span className="block text-[3rem] md:text-[5rem] lg:text-[6rem] text-stroke">
                digitali.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="font-sans text-sm md:text-base leading-relaxed text-white/40 max-w-md mx-auto md:mx-0"
            >
              App, siti web e piattaforme SaaS che trasformano idee ambiziose in prodotti concreti.
              Design premium. Performance senza compromessi.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center md:items-start gap-4 justify-center md:justify-start"
            >
              {/* Primary — gold gradient + shimmer */}
              <a
                href="#contatti"
                className="relative overflow-hidden group inline-flex items-center justify-center min-h-[52px] w-full sm:w-auto px-8 py-3 font-sans text-xs font-bold tracking-[0.22em] uppercase text-[#03030A] select-none"
                style={{ background: 'linear-gradient(135deg, #E8C96A 0%, #C8A84B 100%)' }}
              >
                <span className="relative z-10">Inizia il Progetto</span>
                {/* Shimmer sweep */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.32) 50%, transparent 100%)',
                  }}
                />
              </a>

              {/* Ghost */}
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-4 py-3 font-sans text-xs tracking-[0.22em] uppercase text-white/35 hover:text-[#C8A84B] transition-colors duration-200 group"
              >
                Vedi Portfolio
                <span className="text-[#C8A84B] group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT — visual (desktop only) ─── */}
          <div className="hidden md:flex items-center justify-center relative overflow-hidden" style={{ minHeight: 700 }}>

            {/* Orbit + logo container */}
            <div
              className="relative flex items-center justify-center flex-shrink-0"
              style={{ width: 680, height: 680 }}
            >
              {/* Radial glow behind logo */}
              <div
                aria-hidden="true"
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 400,
                  height: 400,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background:
                    'radial-gradient(circle, rgba(200,168,75,0.22) 0%, transparent 68%)',
                }}
              />

              {/* Orbit rings */}
              {ORBIT_RINGS.map(({ size, duration, direction, dotSize, dotOpacity }, i) => {
                const offset = (680 - size) / 2
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
                      opacity: 0.12 + i * 0.04,
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
                        boxShadow: `0 0 ${dotSize * 3}px #C8A84B`,
                      }}
                    />
                  </div>
                )
              })}

              {/* Logo — slow rotation */}
              <div
                className="relative z-10 flex-shrink-0"
                style={{ animation: 'spin-orbit 20s linear infinite' }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Praeluxor Digital Studio"
                  width={340}
                  height={340}
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Floating tags — positioned relative to the right column */}
            {FLOATING_TAGS.map(({ value, label, top, left, right, bottom, translateY }) => (
              <div
                key={label}
                className="absolute z-20 pointer-events-none"
                style={{ top, left, right, bottom, transform: `translateY(${translateY})` }}
              >
                <div
                  className="px-4 py-3 flex flex-col items-center gap-0.5 min-w-[72px]"
                  style={{
                    background: 'rgba(3,3,10,0.72)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(200,168,75,0.28)',
                  }}
                >
                  <span
                    className="font-serif text-2xl leading-none text-white"
                    style={{ fontWeight: 300 }}
                  >
                    {value}
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.18em] uppercase text-[#C8A84B]/55 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
