import { HeroFeatureIcon } from "@/components/home/heroFeatureIcons";
import { Link } from "@/i18n/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

/** Full-bleed hero photo (Unsplash — replace with `/public/brand/hero-bg.jpg` if you bundle locally). */
const HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2400&q=85";

export async function HomeHero() {
  const t = await getTranslations("home");
  const h = await getTranslations("pageHero");
  const messages = await getMessages();
  const bullets = messages.home.heroBullets as string[];

  return (
    <section className="relative isolate min-h-[min(92vh,980px)] overflow-hidden border-b border-white/10">
      <Image
        src={HERO_IMAGE_SRC}
        alt={t("heroImageAlt")}
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />
      {/* Readability: left-heavy dark wash + subtle top/bottom vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--faf-navy)]/[0.94] via-[var(--faf-navy)]/78 to-[var(--faf-navy)]/45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--faf-navy)]/50 via-transparent to-[var(--faf-navy)]/55 md:from-[var(--faf-navy)]/35 md:to-[var(--faf-navy)]/70"
        aria-hidden
      />

      <div className="faf-container relative z-10 flex min-h-[min(92vh,980px)] items-center py-16 md:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8fd97f] sm:text-sm">
            {h("eyebrowHome")}
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-[3rem]">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {t("heroIntro")}
          </p>
          <p className="mt-5 max-w-xl border-l-[3px] border-[var(--faf-green)] pl-4 text-base font-semibold leading-snug text-white">
            {t("specialize")}
          </p>
          <ul className="mt-8 grid gap-x-6 gap-y-4 text-sm text-white/90 sm:grid-cols-2">
            {bullets.map((label, i) => (
              <li key={label} className="flex items-start gap-3">
                <HeroFeatureIcon index={i} />
                <span className="pt-1.5 leading-snug">{label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--faf-cta)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[var(--faf-cta-hover)] sm:w-auto"
            >
              {t("ctaQuote")}
            </Link>
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-white/85 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/15 sm:w-auto"
            >
              {t("ctaCatalog")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
