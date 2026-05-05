const NAV_LINKS = [
  { href: '#servizi',   label: 'Servizi'   },
  { href: '#studio',    label: 'Studio'    },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contatti',  label: 'Contatti'  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#C8A84B]/10 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Brand */}
        <div className="text-center md:text-left">
          <p className="font-serif text-lg font-light tracking-[0.3em] uppercase text-white">
            Praeluxor
          </p>
          <p className="font-sans text-[11px] text-white/25 tracking-wider mt-0.5">
            Digital Studio
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Footer">
          <ul className="flex items-center gap-6 md:gap-8 flex-wrap justify-center">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-[#C8A84B] transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-sans text-[11px] text-white/25 text-center md:text-right">
            © {year} Praeluxor Digital Studio. Tutti i diritti riservati.
          </p>
          <p className="font-sans text-[10px] text-white/20 flex items-center gap-2">
            <a href="/privacy-policy" className="hover:text-[#C8A84B] transition-colors duration-200">Privacy Policy</a>
            <span>·</span>
            <a href="/cookie-policy" className="hover:text-[#C8A84B] transition-colors duration-200">Cookie Policy</a>
          </p>
        </div>

      </div>
    </footer>
  )
}
