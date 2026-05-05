# Praeluxor Digital Studio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Next.js 15 marketing site for Praeluxor Digital Studio with dark luxury tech design, interactive canvas particles, 7 sections, full Italian SEO, and mobile-first responsive layout.

**Architecture:** Single Next.js 15 App Router page. All interactive elements (canvas, animations) are Client Components. SEO metadata, sitemap, and robots configured via Next.js native APIs. Tailwind CSS v4 (CSS-first config) for styling.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, `next/font/google` (Cormorant Garamond + Syne), `next/image`.

---

## File Map

```
app/
  layout.tsx          — metadata, JSON-LD, fonts, lang="it"
  page.tsx            — section composition
  globals.css         — Tailwind @theme tokens, keyframes, .text-stroke
  sitemap.ts          — MetadataRoute.Sitemap
  robots.ts           — MetadataRoute.Robots
components/
  Navbar.tsx          — fixed nav, hamburger mobile, scroll blur
  Hero.tsx            — headline animation, canvas, orbit rings, ticker
  Stats.tsx           — count-up numbers on scroll
  Manifesto.tsx       — reveal quote on scroll
  Services.tsx        — 3×2 grid with hover underline
  Portfolio.tsx       — 5-column grid with LIVE/IN DEV badges
  CTA.tsx             — email CTA
  Footer.tsx          — links, dynamic year
hooks/
  useReducedMotion.ts — prefers-reduced-motion MediaQuery
  useParticles.ts     — canvas mouse-reactive particle system
public/images/
  logo.jpg            — user-provided (must exist before running dev)
```

---

## Task 1: Scaffold Next.js 15 project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json` (via create-next-app)

- [ ] **Step 1: Run create-next-app in the current directory**

Working directory: `D:\dati_utente\Desktop\sito_praeluxor`

```powershell
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Project scaffolded. If prompted about existing files (`docs/`), answer Yes to continue. The command creates `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts` (v3) or configures CSS (v4), and `app/`.

- [ ] **Step 2: Install Framer Motion**

```powershell
npm install framer-motion
```

Expected: `framer-motion` in `package.json` dependencies.

- [ ] **Step 3: Verify dev server starts**

```powershell
npm run dev
```

Open http://localhost:3000 — default Next.js page should render. `Ctrl+C` to stop.

---

## Task 2: Design tokens, global styles, fonts

**Files:**
- Modify: `app/globals.css`
- Delete (if exists): `tailwind.config.ts` — Tailwind v4 uses CSS-only config

- [ ] **Step 1: Replace app/globals.css entirely**

```css
@import "tailwindcss";

@theme {
  --color-background: #03030A;
  --color-gold: #C8A84B;
  --color-gold-light: #E8C96A;
  --font-family-serif: var(--font-cormorant), Georgia, serif;
  --font-family-sans: var(--font-syne), system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #03030A;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

.text-stroke {
  -webkit-text-stroke: 1.5px #E8C96A;
  color: transparent;
}

@keyframes spin-orbit {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes fade-pulse {
  0%, 100% { opacity: 0.2; }
  50%       { opacity: 0.7; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

> **Note for Tailwind v3:** If `create-next-app` installed Tailwind v3, the `@theme` block won't work. Instead, keep `tailwind.config.ts` and add this to the `extend` section:
> ```ts
> colors: { background: '#03030A', gold: { DEFAULT: '#C8A84B', light: '#E8C96A' } },
> fontFamily: { serif: ['var(--font-cormorant)', 'Georgia', 'serif'], sans: ['var(--font-syne)', 'system-ui', 'sans-serif'] }
> ```
> And replace `@import "tailwindcss"` with the standard v3 directives:
> ```css
> @tailwind base;
> @tailwind components;
> @tailwind utilities;
> ```

---

## Task 3: Layout — metadata, JSON-LD, fonts, sitemap, robots

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 1: Write app/layout.tsx**

```typescript
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
```

- [ ] **Step 2: Write app/sitemap.ts**

```typescript
import { MetadataRoute } from 'next'

const BASE_URL = 'https://praeluxor.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```

- [ ] **Step 3: Write app/robots.ts**

```typescript
import { MetadataRoute } from 'next'

const BASE_URL = 'https://praeluxor.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
```

- [ ] **Step 4: TypeScript check**

```powershell
npx tsc --noEmit
```

Expected: No errors.

---

## Task 4: Navbar — responsive with hamburger

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create components/ directory**

```powershell
New-Item -ItemType Directory -Force -Path components
```

- [ ] **Step 2: Write components/Navbar.tsx**

```typescript
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
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C8A84B]/30 group-hover:border-[#C8A84B] transition-colors duration-300">
              <Image
                src="/images/logo.jpg"
                alt="Praeluxor logo"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
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
```

---

## Task 5: Hooks — useReducedMotion and useParticles

**Files:**
- Create: `hooks/useReducedMotion.ts`
- Create: `hooks/useParticles.ts`

- [ ] **Step 1: Create hooks/ directory**

```powershell
New-Item -ItemType Directory -Force -Path hooks
```

- [ ] **Step 2: Write hooks/useReducedMotion.ts**

```typescript
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

- [ ] **Step 3: Write hooks/useParticles.ts**

```typescript
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  targetOpacity: number
}

function makeParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    targetOpacity: Math.random() * 0.5 + 0.1,
  }
}

export function useParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  count = 80,
  disabled = false,
) {
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef   = useRef<number | null>(null)

  useEffect(() => {
    if (disabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = (canvas.width  = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    const particles = Array.from({ length: count }, () => makeParticle(W, H))

    const onMove   = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', onMove,   { passive: true })
    window.addEventListener('resize',    onResize, { passive: true })

    // #C8A84B = rgb(200, 168, 75)
    const GOLD_RGB = '200,168,75'

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      for (const p of particles) {
        const dx   = mouseRef.current.x - p.x
        const dy   = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        if (dist < 180) {
          p.vx += (dx / dist) * 0.025
          p.vy += (dy / dist) * 0.025
        }

        p.vx *= 0.97
        p.vy *= 0.97
        p.x  += p.vx
        p.y  += p.vy

        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        p.opacity += (p.targetOpacity - p.opacity) * 0.015
        if (Math.abs(p.opacity - p.targetOpacity) < 0.01) {
          p.targetOpacity = Math.random() * 0.5 + 0.1
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${GOLD_RGB},${p.opacity.toFixed(2)})`
        ctx!.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize',    onResize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [canvasRef, count, disabled])
}
```

---

## Task 6: Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Write components/Hero.tsx**

```typescript
'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useParticles } from '@/hooks/useParticles'

const TICKER_ITEMS = [
  'Siti Web', 'App Mobile', 'SaaS & Abbonamenti',
  'E-commerce', 'SEO Tecnico', 'Consulenza Digitale',
]

const ORBIT_RINGS = [
  { size: 168, duration: '12s', direction: 'normal',  dotSize: 8,  dotOpacity: 1   },
  { size: 228, duration: '8s',  direction: 'reverse', dotSize: 6,  dotOpacity: 0.6 },
  { size: 290, duration: '20s', direction: 'normal',  dotSize: 4,  dotOpacity: 0.3 },
]

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.22 } },
}

const line = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const reduced      = useReducedMotion()
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useParticles(canvasRef, 80, reduced || mobile)

  const tickerFull = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Canvas */}
      {!reduced && !mobile && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,168,75,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 md:gap-14 px-4 w-full max-w-6xl mx-auto text-center">

        {/* Logo + orbit rings */}
        <div className="relative flex items-center justify-center" style={{ width: 290, height: 290 }}>
          {ORBIT_RINGS.map(({ size, duration, direction, dotSize, dotOpacity }, i) => {
            const offset = (290 - size) / 2
            return (
              <div
                key={i}
                aria-hidden="true"
                className="absolute rounded-full border border-[#C8A84B]"
                style={{
                  width: size,
                  height: size,
                  top: offset,
                  left: offset,
                  opacity: 0.15 + i * 0.05,
                  animation: `spin-orbit ${duration} linear ${direction} infinite`,
                }}
              >
                <span
                  className="absolute rounded-full bg-[#C8A84B]"
                  style={{
                    width: dotSize,
                    height: dotSize,
                    top: -dotSize / 2,
                    left: '50%',
                    marginLeft: -dotSize / 2,
                    opacity: dotOpacity,
                    boxShadow: `0 0 ${dotSize * 2}px #C8A84B`,
                  }}
                />
              </div>
            )
          })}

          {/* Logo */}
          <div
            className="relative rounded-full overflow-hidden border-2 border-[#C8A84B]/50 z-10"
            style={{
              width: 110,
              height: 110,
              boxShadow: '0 0 24px rgba(200,168,75,0.25)',
            }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Praeluxor Digital Studio"
              fill
              priority
              className="object-cover"
              sizes="110px"
            />
          </div>
        </div>

        {/* Headline */}
        <motion.div
          variants={stagger}
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
        >
          <h1 className="font-serif font-light leading-[1.1] tracking-tight">
            <motion.span
              variants={line}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white"
            >
              Costruiamo
            </motion.span>
            <motion.span
              variants={line}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic"
              style={{ color: '#E8C96A' }}
            >
              prodotti digitali
            </motion.span>
            <motion.span
              variants={line}
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-stroke"
            >
              straordinari.
            </motion.span>
          </h1>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a
            href="#contatti"
            className="inline-flex items-center gap-3 min-h-[52px] px-8 py-3 border border-[#C8A84B] text-[#C8A84B] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#C8A84B] hover:text-[#03030A] transition-all duration-300 group"
          >
            Inizia il Progetto
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 inset-x-0 border-t border-[#C8A84B]/10 py-3 overflow-hidden bg-[#03030A]/50 backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="flex whitespace-nowrap"
          style={{ animation: 'ticker 32s linear infinite' }}
        >
          {tickerFull.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8 px-8 font-sans text-[11px] tracking-[0.25em] uppercase text-[#C8A84B]/50"
            >
              {item}
              <span className="text-[#C8A84B]/20 text-base">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-px h-8 bg-[#C8A84B]/30"
        style={{ animation: 'fade-pulse 2s ease-in-out infinite' }}
      />
    </section>
  )
}
```

---

## Task 7: Stats section

**Files:**
- Create: `components/Stats.tsx`

- [ ] **Step 1: Write components/Stats.tsx**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  end: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { end: 8,   suffix: '+', label: 'Progetti completati' },
  { end: 3,   suffix: '',  label: 'App mobile lanciate'  },
  { end: 100, suffix: '%', label: 'Clienti soddisfatti'  },
  { end: 24,  suffix: 'h', label: 'Tempo di risposta'    },
]

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal]   = useState(0)
  const spanRef         = useRef<HTMLSpanElement>(null)
  const inView          = useInView(spanRef, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    let startTs = 0
    const DURATION = 1400
    const raf = (ts: number) => {
      if (!startTs) startTs = ts
      const prog   = Math.min((ts - startTs) / DURATION, 1)
      const eased  = 1 - Math.pow(1 - prog, 3)
      setVal(Math.round(eased * end))
      if (prog < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, end])

  return (
    <span ref={spanRef}>
      {val}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 md:py-28 border-y border-[#C8A84B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tabular-nums"
                style={{ color: '#C8A84B' }}
              >
                {inView
                  ? <CountUp end={s.end} suffix={s.suffix} />
                  : <span>0{s.suffix}</span>
                }
              </div>
              <p className="font-sans text-xs tracking-[0.18em] uppercase text-white/40 max-w-[110px] leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Task 8: Manifesto section

**Files:**
- Create: `components/Manifesto.tsx`

- [ ] **Step 1: Write components/Manifesto.tsx**

```typescript
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
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
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
```

---

## Task 9: Services section

**Files:**
- Create: `components/Services.tsx`

- [ ] **Step 1: Write components/Services.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  {
    title: 'Siti Web',
    desc:  'Design su misura, performance eccellenti e SEO integrata per massimizzare la tua presenza online.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    title: 'App Mobile',
    desc:  'Applicazioni native e cross-platform con esperienza utente fluida e coinvolgente.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
  },
  {
    title: 'SaaS & Abbonamenti',
    desc:  'Piattaforme scalabili con modelli subscription, dashboard avanzate e integrazioni payment.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'E-commerce',
    desc:  'Store online ottimizzati per la conversione, con gestione inventario e checkout fluido.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    title: 'SEO Tecnico',
    desc:  'Ottimizzazione profonda: Core Web Vitals, structured data, architettura URL e crawlability.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
  {
    title: 'Consulenza Digitale',
    desc:  'Strategia digitale, audit UX e roadmap tecnologica per portare il tuo business al livello successivo.',
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
]

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const card = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export default function Services() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servizi" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 md:mb-20">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C8A84B] mb-4">
            Cosa facciamo
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white">
            Servizi
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C8A84B]/10"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.title}
              variants={card}
              className="group p-8 md:p-10 bg-[#03030A] hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="mb-6 text-[#C8A84B]/50 group-hover:text-[#C8A84B] transition-colors duration-300">
                {s.svg}
              </div>
              <h3 className="font-serif text-2xl font-light text-white mb-4 group-hover:text-[#E8C96A] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                {s.desc}
              </p>
              <div
                className="mt-8 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                style={{ backgroundColor: '#C8A84B' }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Task 10: Portfolio section

**Files:**
- Create: `components/Portfolio.tsx`

- [ ] **Step 1: Write components/Portfolio.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Badge = 'LIVE' | 'IN DEV' | null

interface Project {
  title:    string
  category: string
  badge:    Badge
  gradient: string
}

const PROJECTS: Project[] = [
  {
    title:    'Castello di Carlo V',
    category: 'Sito istituzionale',
    badge:    null,
    gradient: 'linear-gradient(160deg, #1a1209 0%, #0d0c0a 100%)',
  },
  {
    title:    'Premio Castello',
    category: 'Evento & Premio',
    badge:    null,
    gradient: 'linear-gradient(160deg, #0e1117 0%, #080b0f 100%)',
  },
  {
    title:    'Studio Elia',
    category: 'Sito professionale',
    badge:    'LIVE',
    gradient: 'linear-gradient(160deg, #0a1018 0%, #060a10 100%)',
  },
  {
    title:    'PronosticiPro',
    category: 'SaaS & Abbonamenti',
    badge:    'IN DEV',
    gradient: 'linear-gradient(160deg, #10100e 0%, #0a0a08 100%)',
  },
  {
    title:    'BookMe',
    category: 'App mobile',
    badge:    'IN DEV',
    gradient: 'linear-gradient(160deg, #0c0e14 0%, #080a10 100%)',
  },
]

function BadgePill({ badge }: { badge: Badge }) {
  if (!badge) return null
  const live = badge === 'LIVE'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-sans text-[9px] font-semibold tracking-[0.2em] uppercase border ${
        live
          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
          : 'bg-amber-500/15 text-amber-400 border-amber-500/25'
      }`}
    >
      {live && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {badge}
    </span>
  )
}

const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

export default function Portfolio() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="portfolio" ref={ref} className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 md:mb-20">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C8A84B] mb-4">
            Lavori recenti
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white">
            Portfolio
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.title}
              variants={item}
              className="group relative overflow-hidden cursor-default"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{ background: p.gradient }}
              />
              {/* Gold grid pattern */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px),' +
                    'linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              />

              {/* Badge */}
              {p.badge && (
                <div className="absolute top-3 left-3 z-20">
                  <BadgePill badge={p.badge} />
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#03030A]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-10 p-4 text-center">
                <p className="font-serif text-base md:text-lg font-light text-white">
                  {p.title}
                </p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40">
                  {p.category}
                </p>
              </div>

              {/* Default bottom title */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#03030A]/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <p className="font-serif text-sm font-light text-white/80 leading-snug">
                  {p.title}
                </p>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-[#C8A84B]/0 group-hover:border-[#C8A84B]/30 transition-colors duration-300 z-10" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Task 11: CTA section

**Files:**
- Create: `components/CTA.tsx`

- [ ] **Step 1: Write components/CTA.tsx**

```typescript
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTA() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

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

          <a
            href="mailto:praeluxor@gmail.com"
            className="inline-flex items-center gap-3 min-h-[52px] px-10 py-4 bg-[#C8A84B] text-[#03030A] font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#E8C96A] transition-all duration-300 group"
          >
            praeluxor@gmail.com
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Task 12: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Write components/Footer.tsx**

```typescript
const LINKS = [
  { href: '#servizi',   label: 'Servizi'   },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contatti',  label: 'Contatti'  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#C8A84B]/10 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="text-center md:text-left">
          <p className="font-serif text-lg font-light tracking-[0.3em] uppercase text-white">
            Praeluxor
          </p>
          <p className="font-sans text-[11px] text-white/25 tracking-wider mt-0.5">
            Digital Studio
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex items-center gap-6 md:gap-8">
            {LINKS.map(({ href, label }) => (
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

        <p className="font-sans text-[11px] text-white/25 text-center md:text-right leading-relaxed">
          © {year} Praeluxor Digital Studio.
          <br className="md:hidden" /> Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  )
}
```

---

## Task 13: Assemble app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```typescript
import Navbar    from '@/components/Navbar'
import Hero      from '@/components/Hero'
import Stats     from '@/components/Stats'
import Manifesto from '@/components/Manifesto'
import Services  from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import CTA       from '@/components/CTA'
import Footer    from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Manifesto />
        <Services />
        <Portfolio />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: TypeScript check**

```powershell
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Start dev server and verify**

```powershell
npm run dev
```

Open http://localhost:3000. Verify:
- Navbar visible, hamburger works on mobile breakpoint (DevTools responsive mode)
- Hero headline animates in 3 staggered lines
- Ticker scrolls at bottom of Hero
- Orbit rings spin around logo
- Canvas particles visible on desktop (mouse moves them)
- Stats count up on scroll
- Manifesto fades in on scroll
- Services 3×2 grid with hover gold underline
- Portfolio 5-column (desktop) / 2-column (mobile) with badges
- CTA gold button with email
- Footer shows current year

`Ctrl+C` to stop.

---

## Task 14: Git init and initial commit

**Files:** None — git operations only.

- [ ] **Step 1: Initialize git repository**

```powershell
git init
```

Expected: `Initialized empty Git repository` (or `Reinitialized` if `create-next-app` already ran `git init`).

- [ ] **Step 2: Stage all files**

```powershell
git add .
```

- [ ] **Step 3: Commit**

```powershell
git commit -m "Initial commit - Praeluxor website"
```

Expected: Commit with all project files listed.

- [ ] **Step 4: Verify**

```powershell
git log --oneline
```

Expected: At least one line showing `Initial commit - Praeluxor website`.

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Hero: headline 3 righe (solid/italic/outline), canvas particles, orbite logo, ticker
- ✅ Sezione Numeri: 4 stat con count-up
- ✅ Manifesto: testo con "ossessiva" in oro
- ✅ Servizi: griglia 3×2, 6 card
- ✅ Portfolio: 5 colonne, badge LIVE/IN DEV per tutti i progetti corretti
- ✅ CTA: "Hai un'idea? Costruiamola insieme." + email praeluxor@gmail.com
- ✅ Footer: dynamic year
- ✅ SEO: metadata, og:*, twitter:card, JSON-LD Organization, sitemap.ts, robots.ts, canonical, lang="it"
- ✅ Mobile-first: hamburger, testo responsive, canvas disabilitato su mobile
- ✅ Performance: next/font display:swap, next/image con priority su hero, canvas disabled su mobile + prefers-reduced-motion
- ✅ Git: Task 14 esegue `git init && git add . && git commit -m "Initial commit - Praeluxor website"`

**Potential issue:** `public/images/logo.jpg` deve esistere prima di avviare il dev server — `next/image` lancerà un errore se il file è assente. Se non è ancora presente, creare un placeholder temporaneo o commentare temporaneamente il componente `<Image>` nel Navbar e Hero.
