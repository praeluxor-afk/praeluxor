'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Manifesto() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 md:py-40 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/85"
        >
          Non vendiamo template. Costruiamo prodotti digitali con attenzione{' '}
          <em className="not-italic" style={{ color: '#E8C96A' }}>
            ossessiva
          </em>{' '}
          ai dettagli.
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.55, duration: 0.8, ease: 'easeOut' }}
          className="mt-12 mx-auto h-px w-20 origin-center"
          style={{ backgroundColor: '#C8A84B' }}
        />
      </div>
    </section>
  )
}
