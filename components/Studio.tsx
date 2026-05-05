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
  visible: { transition: { staggerChildren: 0.13 } },
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
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-10"
              style={{ color: '#E8C96A' }}
            >
              Praeluxor —<br />Digital Studio
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-sans text-sm md:text-base text-white/55 leading-relaxed"
            >
              Progettiamo e sviluppiamo prodotti digitali con un&apos;attenzione maniacale ai
              dettagli. Ogni progetto è trattato come se fosse l&apos;unico: nessuna soluzione
              preconfezionata, nessun compromesso sulla qualità. Dal concept al deploy,
              controlliamo ogni fase con precisione chirurgica.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-sans text-sm md:text-base text-white/40 leading-relaxed mt-5"
            >
              Il nostro approccio è semplice: capire profondamente il problema, costruire
              la soluzione giusta, consegnarla senza scuse.
            </motion.p>
          </div>

          {/* Right — values */}
          <motion.div variants={container} className="flex flex-col gap-0 lg:pt-20">
            {VALUES.map(({ label, desc }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="group flex items-start gap-6 py-7 border-b border-[#C8A84B]/10 first:border-t"
              >
                <span className="font-sans text-[10px] text-[#C8A84B]/40 tracking-widest pt-1 w-5 flex-shrink-0 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-serif text-2xl font-light text-white group-hover:text-[#E8C96A] transition-colors duration-300">
                    {label}
                  </p>
                  <p className="font-sans text-xs text-[#C8A84B]/50 tracking-[0.15em] uppercase mt-1.5">
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
