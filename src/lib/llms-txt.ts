/**
 * Machine-readable site overview for LLMs (https://llmstxt.org/).
 * Served at `/llms.txt`; use absolute URLs from the public origin.
 */
export function buildLlmsTxt(publicOrigin: string): string {
  const o = publicOrigin.replace(/\/$/, "");
  const en = (path: string) => `${o}/en${path}`;
  const fr = (path: string) => `${o}/fr${path}`;

  return `# FAFCO

> FAFCO is an international **B2B** trading company focused on **food products**, **animal feed materials**, and **agricultural commodities**. The public website is bilingual: **English** (\`/en/\`) and **French** (\`/fr/\`). This is **not** a retail storefront; commercial buyers request quotes and specifications through **contact** forms.

- **Canonical public origin:** ${o}
- **Audience:** Distributors, industrial buyers, and trade partners (not consumer retail).
- **Engagement model:** Quote-based; logistics terms may include FOB, CIF, or EXW depending on the corridor.

## Core pages

- [Home (English)](${en("")}): Service overview, regions, product category entry points, and logistics flow.
- [Home (French)](${fr("")}): French homepage (same scope as English).
- [About (English)](${en("/about")}): Company positioning, approach, and partnership model.
- [About (French)](${fr("/about")}): À propos (French).
- [Products catalog (English)](${en("/products")}): Food, feed, and export lines; filter by category; links to individual products.
- [Products catalog (French)](${fr("/products")}): Catalogue produits (French).
- [Import supply (English)](${en("/import")}): Imported food and feed programs for buyers.
- [Export commodities (English)](${en("/export")}): Agricultural, wood, and crop nutrition export-oriented lines.
- [Logistics (English)](${en("/logistics")}): Sourcing, quality control, consolidation, road and ocean freight.
- [Markets & regions (English)](${en("/markets")}): Operating regions and sourcing context.
- [Contact & quotes (English)](${en("/contact")}): Quote requests and partnership inquiries (primary conversion path).
- [Contact & quotes (French)](${fr("/contact")}): Contact (French).

## Product category entry points

- [Food products — filtered catalog (EN)](${en("/products?category=food")}): Sugar, salt, rice, oils, flour, grains, preserves, honey, fruits, juices, and related B2B lines.
- [Feed products — filtered catalog (EN)](${en("/products?category=feed")}): Soybean cake, meals, feed grains, blends, oils and fats for animal feed.
- [Export products — filtered catalog (EN)](${en("/products?category=export")}): Pulses, canola, hops, lumber, pellets, pulp, fertilizers, and related export commodities.

## Optional

- [Privacy policy (English)](${en("/privacy")}): How personal data is handled for the site and quote flow.
- [Privacy policy (French)](${fr("/privacy")}): Politique de confidentialité (French).
- [Sitemap (XML)](${o}/sitemap.xml): Full list of indexable URLs per locale.
- [Robots](${o}/robots.txt): Crawler directives.
`;
}
