import type { UnsplashPhotoRef } from "@/lib/unsplash/types";

const API = "https://api.unsplash.com";

type SearchResult = {
  results: UnsplashApiPhoto[];
};

type UnsplashApiPhoto = {
  id: string;
  width: number;
  height: number;
  urls: { regular: string; raw: string };
  links: { html: string };
  user: { name: string; links: { html: string } };
};

function getAccessKey(): string | undefined {
  return process.env.UNSPLASH_ACCESS_KEY?.trim() || undefined;
}

function mapApiPhotoToRef(p: UnsplashApiPhoto): UnsplashPhotoRef {
  return {
    photoId: p.id,
    url: p.urls.regular,
    width: p.width,
    height: p.height,
    photographerName: p.user.name,
    photographerHtmlUrl: p.user.links.html,
    photoHtmlUrl: p.links.html,
  };
}

/**
 * Required when a photo is shown to a user (Unsplash API terms).
 * Safe to fire-and-forget from a server component via `after()`.
 */
export async function triggerPhotoDownload(photoId: string): Promise<void> {
  const key = getAccessKey();
  if (!key) return;

  await fetch(`${API}/photos/${encodeURIComponent(photoId)}/download`, {
    headers: { Authorization: `Client-ID ${key}` },
  });
}

/** Used by the generation script (explicit key). */
export async function searchPhotosWithKey(
  accessKey: string,
  query: string,
  opts?: { perPage?: number; orientation?: "landscape" | "portrait" | "squarish" }
): Promise<UnsplashPhotoRef | null> {
  const params = new URLSearchParams({
    query: query.trim(),
    per_page: String(opts?.perPage ?? 1),
    orientation: opts?.orientation ?? "landscape",
  });

  const res = await fetch(`${API}/search/photos?${params}`, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Unsplash search failed ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as SearchResult;
  const first = data.results[0];
  return first ? mapApiPhotoToRef(first) : null;
}

export async function triggerPhotoDownloadWithKey(
  accessKey: string,
  photoId: string
): Promise<void> {
  await fetch(`${API}/photos/${encodeURIComponent(photoId)}/download`, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });
}
