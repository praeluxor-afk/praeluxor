'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const VALUES = [
  {
    label: 'Design First',
    desc:  'Ogni pixel ha uno scopo',
  },
  {
    label: 'Performance',
    desc:  'Velocità come funzionalità',
  },
  {
    label: 'Strategia',
    desc:  'Tecnologia al servizio del business',
  },
]

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function Studio() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="studio" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left — heading + text */}
          <div>
            <motion.p
              variants={fadeUp}
              className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C8A84B] mb-4"
            >
              Chi siamo
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight"
            >
              Lo Studio
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-sans text-sm md:text-base text-white/50 leading-relaxed"
            >
              Praeluxor nasce dalla convinzione che il digitale debba essere bello, veloce e
              strategico. Siamo un team di designer e sviluppatori con una visione comune:
              costruire prodotti digitali che lascino il segno.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-sans text-sm md:text-base text-white/50 leading-relaxed mt-4"
            >
              Lavoriamo in modo snello, con attenzione ossessiva ai dettagli e un approccio
              orientato ai risultati. Niente overhead, niente burocrazia — solo esecuzione
              di alto livello.
            </motion.p>
          </div>

          {/* Right — values */}
          <motion.div variants={container} className="flex flex-col gap-6 lg:pt-16">
            {VALUES.map(({ label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="group flex items-start gap-5 border-b border-[#C8A84B]/10 pb-6 last:border-0 last:pb-0"
              >
                <span
                  className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#C8A84B' }}
                />
                <div>
                  <p className="font-serif text-xl font-light text-white group-hover:text-[#E8C96A] transition-colors duration-200">
                    {label}
                  </p>
                  <p className="font-sans text-xs text-white/35 tracking-wide mt-1">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
