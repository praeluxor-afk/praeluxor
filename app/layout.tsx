import type { Metadata } from 'next'
import { Cormorant_Garamond, Syne } from 'next/font/google'
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

const BASE_URL = 'https://praeluxor.com'

export const metadata: Metadata = {
  title: 'Praeluxor Digital Studio | Siti Web, App e SaaS su misura',
  description:
    'Praeluxor crea prodotti digitali con attenzione ossessiva ai dettagli: siti web, app mobile, SaaS, e-commerce e SEO tecnico. Studio digitale italiano.',
  keywords: [
    'web design',
    'app mobile',
    'SaaS',
    'e-commerce',
    'SEO tecnico',
    'digital studio',
    'sviluppo web Italia',
    'consulenza digitale',
    'Praeluxor',
  ],
  authors: [{ name: 'Praeluxor Digital Studio' }],
  creator: 'Praeluxor Digital Studio',
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Praeluxor Digital Studio | Prodotti digitali su misura',
    description:
      'Costruiamo prodotti digitali con attenzione ossessiva ai dettagli: siti web, app mobile, SaaS ed e-commerce.',
    url: BASE_URL,
    siteName: 'Praeluxor Digital Studio',
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
    title: 'Praeluxor Digital Studio | Prodotti digitali su misura',
    description: 'Costruiamo prodotti digitali con attenzione ossessiva ai dettagli.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Praeluxor Digital Studio',
  url: BASE_URL,
  email: 'praeluxor@gmail.com',
  logo: `${BASE_URL}/images/logo.jpg`,
  description:
    'Studio digitale specializzato in siti web, app mobile, SaaS ed e-commerce.',
  address: { '@type': 'PostalAddress', addressCountry: 'IT' },
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
      </body>
    </html>
  )
}
