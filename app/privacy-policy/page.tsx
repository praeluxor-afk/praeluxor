import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Praeluxor Digital Studio',
  description: 'Informativa sul trattamento dei dati personali ai sensi del GDPR.',
  robots: { index: false, follow: false },
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-serif text-xl font-light text-[#C8A84B] mb-4 tracking-wide">{title}</h2>
    <div className="font-sans text-sm text-white/60 leading-relaxed space-y-3">{children}</div>
  </div>
)

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="font-sans text-xs text-white/25 mb-16">
          Ultimo aggiornamento: maggio 2025
        </p>

        <div className="border-t border-[#C8A84B]/10 pt-12">

          <Section title="1. Titolare del trattamento">
            <p>
              Il titolare del trattamento dei dati personali è <strong className="text-white/80">Praeluxor Digital Studio</strong>,
              contattabile all'indirizzo email:{' '}
              <a href="mailto:praeluxor@gmail.com" className="text-[#C8A84B] hover:underline">
                praeluxor@gmail.com
              </a>
            </p>
          </Section>

          <Section title="2. Dati raccolti">
            <p>
              Attraverso il modulo di contatto presente sul sito raccogliamo esclusivamente i seguenti dati personali,
              forniti volontariamente dall'utente:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Nome</li>
              <li>Indirizzo email</li>
              <li>Testo del messaggio</li>
            </ul>
            <p>Non raccogliamo dati di navigazione, dati sensibili o informazioni aggiuntive.</p>
          </Section>

          <Section title="3. Finalità del trattamento">
            <p>
              I dati raccolti vengono utilizzati esclusivamente per rispondere alle richieste di contatto
              inviate dagli utenti tramite il modulo presente sul sito. Non vengono utilizzati per
              finalità di marketing, profilazione o altri scopi commerciali.
            </p>
          </Section>

          <Section title="4. Base giuridica">
            <p>
              Il trattamento dei dati si basa sul <strong className="text-white/80">consenso dell'interessato</strong> (art. 6, par. 1, lett. a) del GDPR),
              espresso mediante la compilazione e l'invio volontario del modulo di contatto.
            </p>
          </Section>

          <Section title="5. Conservazione dei dati">
            <p>
              I dati personali vengono conservati per un periodo massimo di <strong className="text-white/80">12 mesi</strong> dalla
              ricezione del messaggio, trascorsi i quali vengono eliminati. In caso di instaurazione
              di un rapporto contrattuale, i dati necessari potrebbero essere conservati per i termini
              di legge applicabili.
            </p>
          </Section>

          <Section title="6. Comunicazione a terzi">
            <p>
              I dati personali <strong className="text-white/80">non vengono venduti, ceduti o comunicati a terzi</strong> per
              finalità proprie. Il servizio di invio email è gestito tramite EmailJS, un servizio
              tecnico che trasmette i messaggi al titolare senza trattenere o elaborare i dati
              per finalità proprie.
            </p>
          </Section>

          <Section title="7. Cookie e tracciamento">
            <p>
              Il sito non utilizza cookie di profilazione né strumenti di tracciamento degli utenti.
              Consulta la nostra{' '}
              <Link href="/cookie-policy" className="text-[#C8A84B] hover:underline">
                Cookie Policy
              </Link>{' '}
              per maggiori informazioni.
            </p>
          </Section>

          <Section title="8. Diritti dell'interessato">
            <p>
              Ai sensi degli artt. 15-22 del GDPR, l'utente ha il diritto di:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/50 ml-2">
              <li>Accedere ai propri dati personali</li>
              <li>Richiederne la rettifica o l'aggiornamento</li>
              <li>Richiederne la cancellazione ("diritto all'oblio")</li>
              <li>Opporsi al trattamento</li>
              <li>Richiedere la limitazione del trattamento</li>
              <li>Proporre reclamo all'Autorità Garante per la protezione dei dati personali</li>
            </ul>
            <p>
              Per esercitare questi diritti, scrivi a:{' '}
              <a href="mailto:praeluxor@gmail.com" className="text-[#C8A84B] hover:underline">
                praeluxor@gmail.com
              </a>
            </p>
          </Section>

          <Section title="9. Modifiche alla presente informativa">
            <p>
              Il titolare si riserva il diritto di modificare la presente informativa in qualsiasi
              momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data
              di aggiornamento.
            </p>
          </Section>

        </div>
      </div>
    </main>
  )
}
