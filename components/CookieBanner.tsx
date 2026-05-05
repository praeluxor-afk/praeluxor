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

  function dismiss(choice: 'accepted' | 'rejected') {
    localStorage.setItem('cookie-consent', choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 animate-slide-up"
      style={{
        background:           'rgba(6,6,16,0.97)',
        backdropFilter:       'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop:            '1px solid rgba(200,168,75,0.25)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 relative">

        {/* Close × */}
        <button
          onClick={() => dismiss('rejected')}
          aria-label="Chiudi"
          className="absolute top-3 right-4 text-white/30 hover:text-[#C8A84B] transition-colors duration-200 text-lg leading-none p-1"
        >
          ✕
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-8">
          {/* Text */}
          <p className="font-sans text-xs text-white/45 leading-relaxed max-w-xl">
            Utilizziamo solo cookie tecnici necessari al funzionamento del sito. Nessun cookie
            di profilazione o tracciamento. Puoi continuare a navigare liberamente.{' '}
            <Link href="/cookie-policy" className="text-[#C8A84B]/70 hover:text-[#C8A84B] transition-colors duration-200 underline underline-offset-2">
              Cookie Policy
            </Link>
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => dismiss('rejected')}
              className="font-sans text-xs tracking-[0.15em] uppercase text-white/35 hover:text-white/60 transition-colors duration-200 whitespace-nowrap"
            >
              Rifiuta
            </button>

            <button
              onClick={() => dismiss('accepted')}
              className="inline-flex items-center justify-center min-h-[36px] px-6 py-2 bg-[#C8A84B] text-[#03030A] font-sans text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#E8C96A] transition-colors duration-200 whitespace-nowrap"
            >
              Accetta
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
