/**
 * Writes src/data/catalog-outline.csv from the live catalog.
 * Run: npx tsx scripts/export-catalog-outline.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { CATEGORIES, QUOTEABLE_ITEMS } from "../src/lib/catalog";

function escapeCsv(s: string): string {
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const headers = [
  "category_id",
  "category_slug",
  "category_name_en",
  "category_name_fr",
  "category_description_en",
  "category_description_fr",
  "group_id",
  "group_title_en",
  "group_title_fr",
  "group_note_en",
  "group_note_fr",
  "quote_as_single_product",
  "quote_item_id",
  "product_line_en",
  "product_line_fr",
  "variation_id",
  "variation_label_en",
  "variation_label_fr",
] as const;

const rows: string[][] = [];

for (const q of QUOTEABLE_ITEMS) {
  const cat = CATEGORIES.find((c) => c.slug === q.categorySlug);
  const g = cat?.groups.find((g) => g.id === q.groupId);
  if (!cat || !g) continue;

  const quoteAsSingle =
    Boolean(g.quoteAsSingleProduct && g.variations?.length) ? "yes" : "no";

  const base: string[] = [
    cat.id,
    cat.slug,
    cat.name.en,
    cat.name.fr,
    cat.description.en,
    cat.description.fr,
    g.id,
    g.title.en,
    g.title.fr,
    g.note?.en ?? "",
    g.note?.fr ?? "",
    quoteAsSingle,
  ];

  if (q.variationOptions?.length) {
    for (const v of q.variationOptions) {
      rows.push([
        ...base,
        q.id,
        q.lineLabel.en,
        q.lineLabel.fr,
        v.id,
        v.label.en,
        v.label.fr,
      ]);
    }
  } else {
    rows.push([
      ...base,
      q.id,
      q.lineLabel.en,
      q.lineLabel.fr,
      "",
      "",
      "",
    ]);
  }
}

const csv =
  "\ufeff" +
  [headers.join(","), ...rows.map((r) => r.map(escapeCsv).join(","))].join(
    "\r\n"
  );

const out = join(process.cwd(), "src/data/catalog-outline.csv");
writeFileSync(out, csv, "utf8");
console.log(`Wrote ${out} (${rows.length} rows)`);
