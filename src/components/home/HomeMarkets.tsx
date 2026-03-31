import { WorldMapWithBadges } from "@/components/WorldMapWithBadges";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Link } from "@/i18n/navigation";
import { getMessages, getTranslations } from "next-intl/server";

function RegionChipIcon() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--faf-green)]/12 text-[var(--faf-green)] ring-1 ring-[var(--faf-green)]/25" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M3 12h18M12 3a15 15 0 000 18M12 3a15 15 0 010 18"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      </svg>
    </span>
  );
}

export async function HomeMarkets() {
  const t = await getTranslations("home");
  const messages = await getMessages();
  const regions = messages.home.regions as string[];

  return (
    <section className="relative overflow-hidden border-t border-[var(--faf-divider)] bg-gradient-to-b from-[var(--faf-card)] via-[var(--faf-bg)] to-[var(--faf-card)] py-16 md:py-24">
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-[var(--faf-green)]/[0.08] blur-3xl"
        aria-hidden
      />
      <div className="faf-container relative">
        <SectionHeading
          eyebrow={t("marketsEyebrow")}
          title={t("marketsTitle")}
          subtitle={t("marketsLead")}
        />

        <div className="mt-10 flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-10 xl:gap-12">
          {/* Map column — stretches to match regions column */}
          <div className="mx-auto flex w-full max-w-lg flex-col lg:col-span-5 lg:mx-0 lg:max-w-none lg:min-h-0 lg:h-full">
            <div className="flex min-h-[240px] flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--faf-divider)] bg-gradient-to-br from-[var(--faf-navy)]/[0.04] via-[var(--faf-bg)] to-[var(--faf-green)]/[0.06] p-1 shadow-[0_20px_50px_-24px_rgba(31,42,55,0.25)] ring-1 ring-black/[0.04] lg:min-h-0 lg:h-full">
              <WorldMapWithBadges
                mapAlt={t("marketsMapImageAlt")}
                compact
                fillHeight
                className="min-h-0 flex-1 lg:min-h-0"
              />
            </div>
          </div>

          {/* Regions — same top/bottom as map via stretched grid row + flex-1 */}
          <div className="flex min-h-0 min-w-0 flex-col lg:col-span-7 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faf-green)]">
              {t("marketsRegionsLabel")}
            </p>
            <ul className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[minmax(0,1fr)] lg:min-h-0">
              {regions.map((r) => (
                <li key={r} className="min-h-0">
                  <div className="flex h-full min-h-[3.25rem] items-center gap-3 rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-card)] px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--faf-green)]/40 hover:shadow-md">
                    <RegionChipIcon />
                    <span className="text-sm font-semibold leading-snug text-[var(--faf-ink)]">{r}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <Link
            href="/markets"
            className="inline-flex max-w-lg items-center justify-center rounded-xl bg-[var(--faf-cta)] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-orange-500/15 transition hover:bg-[var(--faf-cta-hover)] sm:px-8 sm:text-base"
          >
            {t("marketsSeeCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
