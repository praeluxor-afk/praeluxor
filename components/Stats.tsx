'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  end: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { end: 8,   suffix: '+', label: 'Progetti completati' },
  { end: 3,   suffix: '',  label: 'App mobile lanciate'  },
  { end: 100, suffix: '%', label: 'Clienti soddisfatti'  },
  { end: 24,  suffix: 'h', label: 'Tempo di risposta'    },
]

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal]   = useState(0)
  const spanRef         = useRef<HTMLSpanElement>(null)
  const inView          = useInView(spanRef, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    let startTs = 0
    const DURATION = 1400
    const raf = (ts: number) => {
      if (!startTs) startTs = ts
      const prog   = Math.min((ts - startTs) / DURATION, 1)
      const eased  = 1 - Math.pow(1 - prog, 3)
      setVal(Math.round(eased * end))
      if (prog < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, end])

  return (
    <span ref={spanRef}>
      {val}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 md:py-28 border-y border-[#C8A84B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tabular-nums"
                style={{ color: '#C8A84B' }}
              >
                {inView
                  ? <CountUp end={s.end} suffix={s.suffix} />
                  : <span>0{s.suffix}</span>
                }
              </div>
              <p className="font-sans text-xs tracking-[0.18em] uppercase text-white/40 max-w-[110px] leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
