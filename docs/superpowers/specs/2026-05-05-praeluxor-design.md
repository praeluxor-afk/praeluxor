# Praeluxor Digital Studio — Design Spec
**Date:** 2026-05-05  
**Status:** Approved

---

## Overview

Single-page marketing site for Praeluxor Digital Studio. Dark luxury tech aesthetic with interactive animations. Built on Next.js 15 App Router with full Italian SEO.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion (section reveals) |
| Canvas | Custom React hook (particles) |
| Fonts | next/font/google — Cormorant Garamond + Syne |
| Images | next/image |

---

## Design Tokens

- Background: `#03030A`
- Gold primary: `#C8A84B`
- Gold light: `#E8C96A`
- Font serif (titles): Cormorant Garamond
- Font sans (body): Syne
- Min font size mobile: 16px (text-base)

---

## File Structure

```
app/
  layout.tsx          — global metadata, JSON-LD Organization, lang="it"
  page.tsx            — section composition
  sitemap.ts          — dynamic sitemap
  robots.ts           — robots.txt
components/
  Navbar/             — logo, nav links, hamburger mobile
  Hero/               — animated headline, canvas particles, orbits, ticker
  Stats/              — 4 numbers with count-up on scroll
  Manifesto/          — centered reveal text
  Services/           — 3x2 grid with hover borders
  Portfolio/          — 5-column grid with LIVE/IN DEV badges
  CTA/                — email link, mailto:praeluxor@gmail.com
  Footer/             — links, dynamic year
hooks/
  useParticles.ts     — canvas mouse-reactive particle logic
  useReducedMotion.ts — prefers-reduced-motion check
public/images/
  logo.jpg            — user-provided logo
```

---

## Sections

### 1. Navbar
- Fixed top, transparent → blurred backdrop on scroll
- Logo left, nav links right (desktop)
- Hamburger icon on mobile (`md:hidden`), dropdown menu with useState
- All nav links close mobile menu on click
- Links: #servizi, #portfolio, #contatti

### 2. Hero
- Full viewport height (`min-h-screen`)
- Animated headline 3 lines:
  - Line 1: solid white — "Costruiamo"
  - Line 2: italic gold `#E8C96A` — "prodotti digitali"
  - Line 3: outline/stroke text — "straordinari."
- Each line animates in with staggered Framer Motion (y: 40 → 0, opacity 0 → 1)
- Canvas layer behind text: gold particles that follow mouse (mousemove → requestAnimationFrame)
- Canvas disabled on mobile (`window.innerWidth < 768`) and `prefers-reduced-motion`
- 3 CSS animated orbiting rings around `logo.jpg` (centered left or center)
- Ticker/marquee strip below headline: scrolling text with 6 service names separated by `·`
- CTA button "Inizia il Progetto" → scrolls to `#contatti`
- Touch target: `min-h-[44px]`

### 3. Stats (Numeri)
- 4 columns (stack on mobile)
- Count-up animation triggered by Intersection Observer
- Values: `8+` Progetti, `3` App, `100%` Soddisfazione, `24h` Risposta
- Numbers in gold, labels in white/muted

### 4. Manifesto
- Centered section, serif font, large text
- "Non vendiamo template. Costruiamo prodotti digitali con attenzione ossessiva ai dettagli."
- Word "ossessiva" highlighted in gold italic
- Fade-in reveal on scroll via Framer Motion + Intersection Observer

### 5. Servizi
- `id="servizi"`
- Section title "Servizi"
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap-6
- 6 cards: Siti Web, App Mobile, SaaS & Abbonamenti, E-commerce, SEO Tecnico, Consulenza Digitale
- Each card: icon (SVG), title, short description
- Hover: gold border, subtle scale transform

### 6. Portfolio
- Section title "Portfolio"
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`
- 5 items:
  - Castello di Carlo V (image, no badge)
  - Premio Castello (image, no badge)
  - Studio Elia — badge LIVE (green)
  - PronosticiPro — badge IN DEV (yellow/amber)
  - BookMe — badge IN DEV (yellow/amber)
- next/image with aspect-ratio container, object-cover
- Hover: overlay with project name

### 7. CTA
- `id="contatti"`
- Headline: "Hai un'idea? Costruiamola insieme."
- Email: `praeluxor@gmail.com` as `<a href="mailto:...">` styled as gold button
- Background: slightly lighter than page bg or gold-tinted gradient section

### 8. Footer
- Logo + tagline
- Nav links
- Dynamic year: `new Date().getFullYear()`
- "© {year} Praeluxor Digital Studio. Tutti i diritti riservati."

---

## SEO

### metadata (layout.tsx)
```ts
{
  title: 'Praeluxor Digital Studio | Siti Web, App e SaaS su misura',
  description: 'Praeluxor crea prodotti digitali con attenzione ossessiva ai dettagli: siti web, app mobile, SaaS, e-commerce e SEO tecnico.',
  keywords: ['web design', 'app mobile', 'SaaS', 'e-commerce', 'SEO tecnico', 'digital studio', 'Italia'],
  openGraph: { title, description, url, siteName, locale: 'it_IT', type: 'website', images: [og-image] },
  twitter: { card: 'summary_large_image', title, description, images },
  alternates: { canonical: 'https://praeluxor.com' }
}
```

### JSON-LD Organization (layout.tsx)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Praeluxor Digital Studio",
  "url": "https://praeluxor.com",
  "email": "praeluxor@gmail.com",
  "logo": "https://praeluxor.com/images/logo.jpg"
}
```

### sitemap.ts
- `generateSitemap()` returning `[{ url: 'https://praeluxor.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]`

### robots.ts
- Allow all, disallow nothing, sitemap URL

---

## Mobile-First

- Hero text: `text-4xl md:text-6xl lg:text-8xl`
- All buttons: `min-h-[44px] min-w-[44px]`
- Canvas: disabled on mobile and prefers-reduced-motion
- Navbar: hamburger on mobile, horizontal links on desktop
- Grids: always start 1 column, expand at md/lg

---

## Performance

- `next/font/google` with `display: 'swap'`, subset Latin
- `next/image` with `sizes`, `priority` on hero logo
- Framer Motion `LazyMotion` + `domAnimation` to reduce bundle
- Canvas hook uses `useRef` + cleanup on unmount
- Section animations use `whileInView` (Framer) — no JS until visible

---

## Git

After implementation:
```
git init
git add .
git commit -m "Initial commit - Praeluxor website"
```
