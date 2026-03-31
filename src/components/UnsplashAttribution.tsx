import type { UnsplashPhotoRef } from "@/lib/unsplash/types";
import { getTranslations } from "next-intl/server";

type Props = {
  photo: UnsplashPhotoRef;
};

export async function UnsplashAttribution({ photo }: Props) {
  const t = await getTranslations("unsplash");
  const link = "text-[var(--faf-green)] hover:underline";

  return (
    <p className="text-xs text-[var(--faf-ink-muted)]">
      {t("photoBy")}{" "}
      <a
        href={photo.photographerHtmlUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={link}
      >
        {photo.photographerName}
      </a>{" "}
      {t("on")}{" "}
      <a
        href="https://unsplash.com"
        target="_blank"
        rel="noreferrer noopener"
        className={link}
      >
        Unsplash
      </a>
    </p>
  );
}
