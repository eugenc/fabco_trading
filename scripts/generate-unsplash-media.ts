/**
 * Fills src/data/unsplash-media.json via the Unsplash API.
 * Requires UNSPLASH_ACCESS_KEY in the environment.
 *
 * Optional: UNSPLASH_SCRIPT_DELAY_MS (default 400) between requests to stay under rate limits.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CATEGORIES, QUOTEABLE_ITEMS } from "../src/lib/catalog";
import {
  searchPhotosWithKey,
  triggerPhotoDownloadWithKey,
} from "../src/lib/unsplash/api";
import type { UnsplashMediaFile } from "../src/lib/unsplash/types";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function productQuery(item: (typeof QUOTEABLE_ITEMS)[number]): string {
  const line = item.lineLabel.en.replace(/ — /g, " ");
  return `${line} wholesale trade`;
}

function categoryQuery(slug: string, nameEn: string): string {
  const hints: Record<string, string> = {
    food: "bulk food ingredients warehouse wholesale",
    feed: "animal feed grain agriculture bulk",
    export: "agricultural commodities export shipping bulk",
  };
  return hints[slug] ?? `${nameEn} wholesale`;
}

const HOME_QUERY =
  "international freight shipping containers logistics corridor";

async function main(): Promise<void> {
  const key = process.env.UNSPLASH_ACCESS_KEY?.trim();
  if (!key) {
    console.error("Missing UNSPLASH_ACCESS_KEY");
    process.exit(1);
  }

  const delayMs = Number(process.env.UNSPLASH_SCRIPT_DELAY_MS ?? "400");

  const out: UnsplashMediaFile = {
    home: null,
    byProductId: {},
    byCategorySlug: {},
  };

  console.log("Home hero…");
  const home = await searchPhotosWithKey(key, HOME_QUERY);
  if (home) {
    await triggerPhotoDownloadWithKey(key, home.photoId);
    out.home = home;
  }
  await sleep(delayMs);

  for (const cat of CATEGORIES) {
    console.log(`Category ${cat.slug}…`);
    const ref = await searchPhotosWithKey(
      key,
      categoryQuery(cat.slug, cat.name.en)
    );
    if (ref) {
      await triggerPhotoDownloadWithKey(key, ref.photoId);
      out.byCategorySlug[cat.slug] = ref;
    }
    await sleep(delayMs);
  }

  for (const item of QUOTEABLE_ITEMS) {
    console.log(`Product ${item.id}…`);
    const ref = await searchPhotosWithKey(key, productQuery(item));
    if (ref) {
      await triggerPhotoDownloadWithKey(key, ref.photoId);
      out.byProductId[item.id] = ref;
    }
    await sleep(delayMs);
  }

  const path = join(process.cwd(), "src/data/unsplash-media.json");
  await writeFile(path, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  console.log("Wrote", path);
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
