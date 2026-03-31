# FAF Trading — Stage 2 & 3 (care / future work)

This document captures scope, decisions, and technical direction for **Stage 2 (admin + Supabase)** and **Stage 3 (marketplace + billing)**. Stage 1 ships as a public EN/FR catalog with RFQ email flow; these stages are **not** in the current build.

---

## Shared principles

- **Supabase** as the system of record for catalog, quotes, users, and (Stage 3) tenants.
- **Shopify-like** mental model: Products, Variants (variations), Collections (categories), Inventory optional for B2B RFQ.
- **Duplicate SKUs across Import/Export** where business requires: allow the same commercial product to appear under more than one category/channel with independent rows or linked “channel” flags (decide in schema).

---

## Stage 2 — Admin, quotes in DB, CSV, dashboard

### Goals

- Admin UI to **create / edit / archive** categories, products, variations, and **prices** (visibility and currency **configurable** per product or globally).
- **Persist every quote request** in the database; admin **list, filter, export** (CSV optional).
- **CSV import & export** for bulk product operations; **bulk actions** (price update, activate/deactivate, reassign category) executed in DB (Supabase RPC or batched updates).
- **Dashboard**: quote volume, status pipeline, recent activity (Shopify Orders–style list, adapted for RFQs).
- **Email**: keep transactional emails (buyer confirmation + internal lead); optional **Resend** templates with IDs stored on `quote_requests`.

### Suggested schema (sketch)

| Table | Purpose |
|--------|---------|
| `categories` | Tree or flat with `slug`, `kind` (import_food / import_feed / export), `sort_order`, i18n JSON or separate `category_locale` |
| `products` | `category_id`, `slug`, `title_i18n`, `description_i18n`, `active`, `show_price`, `currency`, `moq`, `meta` |
| `product_variants` | `product_id`, `sku`, `label_i18n`, `price_cents` nullable, `unit` (kg, MT, pallet…), `sort_order` |
| `quote_requests` | `id`, timestamps, `locale`, buyer fields, `line_items` JSONB, `status` (new / contacted / closed), `source` (web), optional `email_ids` |
| `admin_users` | Supabase Auth; **RLS** so only staff roles read/write catalog and quotes |

### Configurable (per prior decisions)

- **Public pricing**: off / “from” / full — per product or global default.
- **Currency**: CAD default; multi-currency rules for display and export.
- **MOQ**: optional per variant or product.

### CSV

- **Export**: products + variants denormalized or normalized (two sheets).
- **Import**: validate row-by-row; dry-run mode; error report downloadable.
- **Bulk actions**: scoped by filter (e.g. category = Feed) then apply update in a transaction.

### Security

- **RLS** on all tables; service role only for edge functions that send email or process webhooks.
- **No secrets** in client; admin uses Supabase session.

---

## Stage 3 — Marketplace, suppliers, leads, billing

### Goals

- **Suppliers** as tenants: profile, branding (logo, colours, optional CSS variables within guardrails), **their** categories/products/variants.
- **Marketplace**: buyers search **across suppliers**; listing pages show **who** lists the product; **click / impression** analytics per listing and supplier dashboard.
- **RFQ routing**: buyer RFQ can target **one supplier** or **platform** (broadcast rules TBD); suppliers receive requests (email + in-app if you add a portal).
- **Billing**: **flat fee per lead** (or per qualified RFQ — productise as one “lead” unit); **Stripe** (or Stripe Connect if fees split) for charging suppliers; usage records in `billing_events` or Stripe metadata.
- **Super-admin**: all buyers/sellers, **set lead price**, suspend accounts, dispute resolution, global categories taxonomy optional.

### Suggested additions

| Table | Purpose |
|--------|---------|
| `suppliers` | Org, branding JSON, `stripe_customer_id`, status |
| `supplier_products` | FK supplier; mirror of product model or shared `products` with `owner_supplier_id` |
| `listings` | Search index row: product, supplier, visibility, SEO fields |
| `lead_events` | Click, impression, RFQ sent, billed flag, `stripe_invoice_id` |
| `marketplace_settings` | Global lead price, currency, tax display |

### Internationalisation

- Stage 1: **EN + FR**.
- Stage 3: **additional locales** (URL prefix or domain strategy; share message bundles).

### Open items (to decide before build)

- Supplier **onboarding** (invite-only vs global self-serve).
- **Duplicate** listings when multiple suppliers sell the same commodity — merge in search or separate rows.
- **Dispute** when two suppliers claim the same RFQ.

---

## Deployment notes (unchanged from Stage 1)

- **Vercel** for the Next.js app; **fafco.ca** on GoDaddy: point DNS to Vercel; **HTTPS** automatic on Vercel.
- **Canonical URL**: single preferred host (`https://fafco.ca` vs `www`) — set in `metadataBase` and 301 redirect for the non-canonical host.

---

## References

- [PIPEDA](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/) — privacy baseline for Canadian-facing privacy policy (Stage 1 uses a short, standard-informed template; legal review recommended before go-live).
