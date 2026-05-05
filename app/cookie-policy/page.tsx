import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Praeluxor Digital Studio',
  description: 'Informativa sull\'utilizzo dei cookie sul sito Praeluxor Digital Studio.',
  robots: { index: false, follow: false },
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-serif text-xl font-light text-[#C8A84B] mb-4 tracking-wide">{title}</h2>
    <div className="font-sans text-sm text-white/60 leading-relaxed space-y-3">{children}</div>
  </div>
)

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#03030A] px-4 py-20">
      <div className="max-w-3xl mx-auto">

        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-[#C8A84B]/60 hover:text-[#C8A84B] transition-colors duration-200 mb-16"
        >
          ← Torna alla home
        </Link>

        <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C8A84B] mb-4">
          Informativa legale
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
          Cookie Policy
        </h1>
        <p className="font-sans text-xs text-white/25 mb-16">
          Ultimo aggiornamento: maggio 2025
        </p>

        <div className="border-t border-[#C8A84B]/10 pt-12">

          <Section title="1. Cosa sono i cookie">
            <p>
              I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell'utente
              durante la navigazione. Vengono utilizzati per far funzionare correttamente i siti,
              migliorare l'esperienza utente o raccogliere informazioni statistiche.
            </p>
          </Section>

          <Section title="2. Cookie utilizzati da questo sito">
            <p>
              Il sito <strong className="text-white/80">praeluxor.com utilizza esclusivamente cookie tecnici necessari</strong> al
              corretto funzionamento delle pagine. Non vengono installati cookie di profilazione,
              marketing o analisi comportamentale.
            </p>
            <div
              className="mt-4 border border-[#C8A84B]/15 overflow-hidden"
              style={{ borderRadius: 0 }}
            >
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#C8A84B]/10">
                    <th className="text-left px-4 py-3 text-[#C8A84B]/70 font-sans font-semibold tracking-wider">Tipo</th>
                    <th className="text-left px-4 py-3 text-[#C8A84B]/70 font-sans font-semibold tracking-wider">Finalità</th>
                    <th className="text-left px-4 py-3 text-[#C8A84B]/70 font-sans font-semibold tracking-wider">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-white/50">Tecnici di sessione</td>
                    <td className="px-4 py-3 text-white/50">Navigazione del sito</td>
                    <td className="px-4 py-3 text-white/50">Sessione</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="3. Cookie di terze parti">
            <p>
              Il sito <strong className="text-white/80">non installa cookie di terze parti</strong>. Il servizio EmailJS,
              utilizzato per la gestione del modulo di contatto, opera esclusivamente tramite
              chiamate API lato client e <strong className="text-white/80">non utilizza cookie</strong>.
            </p>
          </Section>

          <Section title="4. Cookie di profilazione e tracciamento">
            <p>
              Il sito <strong className="text-white/80">non utilizza cookie di profilazione</strong> né strumenti di
              tracciamento del comportamento degli utenti (es. Google Analytics, Facebook Pixel
              o strumenti simili). Nessun dato di navigazione viene trasmesso a piattaforme
              pubblicitarie o di analisi.
            </p>
          </Section>

          <Section title="5. Gestione dei cookie">
            <p>
              Poiché il sito utilizza esclusivamente cookie tecnici necessari, non è richiesto
              il consenso dell'utente ai sensi dell'art. 122 del Codice Privacy e delle Linee
              Guida del Garante. L'utente può comunque gestire o disabilitare i cookie
              attraverso le impostazioni del proprio browser:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Chrome: Impostazioni → Privacy e sicurezza → Cookie</li>
              <li>Firefox: Preferenze → Privacy e sicurezza</li>
              <li>Safari: Preferenze → Privacy</li>
              <li>Edge: Impostazioni → Cookie e autorizzazioni sito</li>
            </ul>
            <p className="text-white/40 text-xs mt-2">
              La disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.
            </p>
          </Section>

          <Section title="6. Contatti">
            <p>
              Per qualsiasi domanda relativa alla presente Cookie Policy, contattaci a:{' '}
              <a href="mailto:praeluxor@gmail.com" className="text-[#C8A84B] hover:underline">
                praeluxor@gmail.com
              </a>
            </p>
            <p>
              Per informazioni sul trattamento dei dati personali, consulta la nostra{' '}
              <Link href="/privacy-policy" className="text-[#C8A84B] hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </Section>

        </div>
      </div>
    </main>
  )
}
