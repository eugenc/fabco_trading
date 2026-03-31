# FAF Trading — fafco.ca (Stage 1)

Public **EN / FR** catalogue (Import Food, Import Feed, Export), **Request a quote** flow, and transactional emails (buyer confirmation + internal copy). Stages 2–3 are documented in [`CARE.md`](./CARE.md).

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` — middleware redirects to `/en`.

## Environment

Copy [`.env.example`](./.env.example) to `.env.local`. For production email delivery, configure **Resend** (`RESEND_API_KEY`, `EMAIL_FROM`) plus `FAF_QUOTE_INBOX` and `QUOTE_REPLY_TO`.

Without `RESEND_API_KEY`, quote submissions return success in **dev log mode** (payload printed server-side).

## Deploy (Vercel + GoDaddy)

- Deploy the app on **Vercel**; set `NEXT_PUBLIC_SITE_URL` to `https://fafco.ca` (or your canonical host).
- In **GoDaddy DNS**, point the apex or `www` to Vercel per [Vercel domain docs](https://vercel.com/docs/concepts/projects/domains).
- **Canonical URL:** pick either `https://fafco.ca` or `https://www.fafco.ca`, set `NEXT_PUBLIC_SITE_URL` to that host, and add a **301** redirect for the non-canonical host in `next.config` or Vercel redirects (recommended for SEO).

## Site map (Stage 1)

| Path | Purpose |
|------|---------|
| `/[locale]` | Home (hero, advantages, about preview, product categories, import/export, logistics flow, featured, markets, CTA) |
| `/[locale]/about` | Company story, mission, why clients work with us |
| `/[locale]/products` | Product hub → **food**, **feed**, **export** |
| `/[locale]/products/food` \| `/feed` \| `/export` | Category detail + inquiry CTA |
| `/[locale]/import` | Import supply narrative |
| `/[locale]/export` | Export commodities narrative |
| `/[locale]/logistics` | Supply chain + Incoterms + capabilities |
| `/[locale]/markets` | Regions served |
| `/[locale]/contact` | Lead form (quote / partnership / sourcing / general) |
| `/quote` (per locale) | **Permanent redirect** → `/contact` |
| `/[locale]/privacy` | Privacy policy |

API: `POST /api/quote` (unchanged path; emails buyer + FAF).

**Social previews:** `/{locale}/opengraph-image` and `/{locale}/twitter-image` (generated with `next/og`). Set `NEXT_PUBLIC_SITE_URL` so crawlers resolve absolute image URLs.

**Hero / photography:** Replace or extend the gradient hero with photography in `HomeHero` when licensed assets are available (e.g. `next/image` + `public/hero/`).

## Brand

- Placeholder mark: [`public/brand/faf-mark.svg`](./public/brand/faf-mark.svg) (cycle + leaf motif; replace when the client’s final logo is available).
- Colours are defined as CSS variables in [`src/app/globals.css`](./src/app/globals.css) (`--faf-brand`, `--faf-accent`, etc.).

## Stack

Next.js 16 (App Router), Tailwind CSS 4, **next-intl**, **Resend**, **Zod**.
