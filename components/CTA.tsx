'use client'

import { useRef, useState, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE  = 'service_s8pk03d'
const EMAILJS_TEMPLATE = 'template_nmbxu0b'
const EMAILJS_KEY      = '2CfYwBSRdB0lMStLz'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full bg-transparent border border-[#C8A84B]/20 px-4 py-3 font-sans text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#C8A84B]/60 transition-colors duration-200'

export default function CTA() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [status, setStatus]   = useState<Status>('idle')
  const [form, setForm]       = useState({ from_name: '', from_email: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:  form.from_name,
          from_email: form.from_email,
          message:    form.message,
          reply_to:   form.from_email,
        },
        EMAILJS_KEY,
      )
      setStatus('success')
      setForm({ from_name: '', from_email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

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

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl text-left flex flex-col gap-4 mt-4"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="from_name"
                value={form.from_name}
                onChange={handleChange}
                placeholder="Nome"
                required
                minLength={2}
                className={inputClass}
              />
              <input
                type="email"
                name="from_email"
                value={form.from_email}
                onChange={handleChange}
                placeholder="Email"
                required
                className={inputClass}
              />
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Messaggio"
              required
              minLength={10}
              rows={5}
              className={`${inputClass} resize-none`}
            />

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 border border-[#C8A84B] text-[#C8A84B] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#C8A84B] hover:text-[#03030A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Invio in corso…
                  </>
                ) : (
                  'Invia messaggio'
                )}
              </button>

              {status === 'success' && (
                <p className="font-sans text-xs text-emerald-400 tracking-wide">
                  ✓ Messaggio inviato! Ti risponderemo presto.
                </p>
              )}
              {status === 'error' && (
                <p className="font-sans text-xs text-red-400 tracking-wide">
                  ✗ Errore nell&apos;invio, riprova.
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
