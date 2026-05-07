import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne } from 'next/font/google'
import Script from 'next/script'
import CookieBanner from '@/components/CookieBanner'
import WhatsappButton from '@/components/WhatsappButton'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const BASE_URL = 'https://www.praeluxor.com'

export const metadata: Metadata = {
  title: 'Praeluxor Digital Studio | Siti Web, App Mobile e SaaS',
  description:
    'Studio digitale italiano specializzato in siti web premium, app mobile e piattaforme SaaS. Design luxury, performance eccellenti, SEO tecnico avanzato.',
  keywords: [
    'siti web',
    'app mobile',
    'SaaS',
    'web design',
    'sviluppo web',
    'SEO',
    'digital studio',
    'Italia',
  ],
  authors: [{ name: 'Praeluxor Digital Studio' }],
  creator: 'Praeluxor Digital Studio',
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  verification: {
    google: 'kzDVUuVFnixbQA4ix2mrQXMK6trk23N7afp9P',
  },
  openGraph: {
    title: 'Praeluxor Digital Studio',
    description: 'Costruiamo esperienze digitali straordinarie.',
    url: BASE_URL,
    siteName: 'Praeluxor',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Praeluxor Digital Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Praeluxor Digital Studio',
    description: 'Costruiamo esperienze digitali straordinarie.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon:     '/images/logo.png',
    apple:    '/images/logo.png',
    shortcut: '/images/logo.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Praeluxor Digital Studio',
  url: BASE_URL,
  email: 'praeluxor@gmail.com',
  description: 'Studio digitale specializzato in siti web, app mobile e SaaS',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Crotone',
    addressRegion: 'Calabria',
    addressCountry: 'IT',
  },
  serviceType: ['Web Design', 'App Mobile', 'SaaS', 'SEO', 'E-commerce'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${cormorant.variable} ${syne.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-white antialiased">
        {children}
        <CookieBanner />
        <WhatsappButton />
      </body>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-VT7VGRXNGE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VT7VGRXNGE');
        `}
      </Script>
    </html>
  )
}
