import { SectionHeading } from "@/components/home/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

const ABOUT_IMAGE = "/brand/about-fafco-logistics.png";

function AboutHighlightIcon({ index }: { index: number }) {
  const stroke = "currentColor";
  const cls =
    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--faf-green)]/35 bg-[var(--faf-green)]/10 text-[var(--faf-green)]";
  switch (index % 3) {
    case 0:
      return (
        <span className={cls} aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22V11M12 11c-4-3-9-3.5-9 1 0 3.5 4 6.5 9 4M12 11c4-3 9-3.5 9 1 0 3.5-4 6.5-9 4"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    case 1:
      return (
        <span className={cls} aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 14h16M4 10h16M6 18h12"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <path
              d="M8 6h8v4H8z"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    default:
      return (
        <span className={cls} aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.75" />
            <path
              d="M3 12h18M12 3a15 15 0 000 18M12 3a15 15 0 010 18"
              stroke={stroke}
              strokeWidth="1.75"
            />
          </svg>
        </span>
      );
  }
}

export async function HomeAboutPreview() {
  const t = await getTranslations("home");
  const h = await getTranslations("pageHero");
  const messages = await getMessages();
  const highlights = messages.home.aboutPreviewHighlights as string[];

  return (
    <section className="relative overflow-hidden border-y border-[var(--faf-divider)] bg-gradient-to-br from-[var(--faf-bg)] via-[var(--faf-card)] to-[var(--faf-bg)]">
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-[min(80%,520px)] w-[min(90vw,480px)] -translate-y-1/2 rounded-full bg-[var(--faf-green)]/[0.06] blur-3xl"
        aria-hidden
      />
      <div className="faf-container relative grid gap-10 py-16 md:gap-14 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="min-w-0">
          <SectionHeading
            eyebrow={h("eyebrowAbout")}
            title={t("aboutPreviewTitle")}
            subtitle={t("aboutPreviewBody")}
          />

          <ul className="mt-8 space-y-3">
            {highlights.map((line, i) => (
              <li
                key={line}
                className="flex items-center gap-3 rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-card)]/90 px-4 py-3 shadow-sm backdrop-blur-sm"
              >
                <AboutHighlightIcon index={i} />
                <span className="text-sm font-medium leading-snug text-[var(--faf-ink)] md:text-base">
                  {line}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="mt-8 inline-flex rounded-xl bg-[var(--faf-cta)] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/15 transition hover:bg-[var(--faf-cta-hover)]"
          >
            {t("aboutPreviewCta")}
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(31,42,55,0.35)] ring-1 ring-black/10">
            <Image
              src={ABOUT_IMAGE}
              alt={t("aboutPreviewImageAlt")}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--faf-navy)]/25 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
