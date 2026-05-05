'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 animate-slide-up"
      style={{
        background:       'rgba(6,6,16,0.96)',
        backdropFilter:   'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop:        '1px solid rgba(200,168,75,0.25)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-sans text-xs text-white/45 leading-relaxed text-center sm:text-left max-w-xl">
          Utilizziamo solo cookie tecnici necessari al funzionamento del sito.
          Nessun cookie di profilazione o tracciamento.
        </p>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/cookie-policy"
            className="font-sans text-xs tracking-[0.15em] uppercase text-white/35 hover:text-[#C8A84B] transition-colors duration-200 whitespace-nowrap"
          >
            Scopri di più
          </Link>

          <button
            onClick={accept}
            className="inline-flex items-center justify-center min-h-[36px] px-6 py-2 bg-[#C8A84B] text-[#03030A] font-sans text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#E8C96A] transition-colors duration-200 whitespace-nowrap"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}
