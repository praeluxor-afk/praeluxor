'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '#servizi', label: 'Servizi' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contatti', label: 'Contatti' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#03030A]/90 backdrop-blur-md border-b border-[#C8A84B]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo mark */}
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Praeluxor logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span
              className="font-serif text-base md:text-lg font-light tracking-[0.25em] uppercase text-white"
            >
              Praeluxor
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-sans text-xs tracking-[0.2em] uppercase text-white/60 hover:text-[#C8A84B] transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contatti"
                className="inline-flex items-center min-h-[44px] px-5 py-2 border border-[#C8A84B] text-[#C8A84B] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#C8A84B] hover:text-[#03030A] transition-all duration-200"
              >
                Inizia il Progetto
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
            className="md:hidden min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-[5px] p-2"
          >
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                open ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 ${
                open ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                open ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        } bg-[#03030A]/95 backdrop-blur-md border-b border-[#C8A84B]/10`}
      >
        <ul className="flex flex-col px-4 py-4 gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center min-h-[44px] py-2 font-sans text-xs tracking-[0.2em] uppercase text-white/60 hover:text-[#C8A84B] transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contatti"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center min-h-[44px] w-full py-3 border border-[#C8A84B] text-[#C8A84B] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#C8A84B] hover:text-[#03030A] transition-all duration-200"
            >
              Inizia il Progetto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
