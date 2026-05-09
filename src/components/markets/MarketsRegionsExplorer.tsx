"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";

import type { RegionCode } from "@/lib/markets-regions";

export type RegionCardProduct = {
  id: string;
  href: string;
  imageSrc: string;
  name: string;
  categoryName: string;
  origins: string[];
};

export type RegionView = {
  code: RegionCode;
  label: string;
  countries: string[];
  products: RegionCardProduct[];
};

type MarketsRegionsExplorerProps = {
  regions: RegionView[];
};

export function MarketsRegionsExplorer({
  regions,
}: MarketsRegionsExplorerProps) {
  const t = useTranslations("marketsPage");
  const [selectedCode, setSelectedCode] = useState<RegionCode | null>(null);

  const selected = useMemo(
    () => regions.find((r) => r.code === selectedCode) ?? null,
    [regions, selectedCode]
  );

  return (
    <section
      className="mt-10"
      aria-labelledby="markets-sourcing-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faf-green)]">
        {t("sourcingEyebrow")}
      </p>
      <h2
        id="markets-sourcing-heading"
        className="mt-2 text-2xl font-bold tracking-tight text-[var(--faf-ink)] md:text-3xl"
      >
        {t("sourcingTitle")}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-[var(--faf-ink-muted)]">
        {t("sourcingHint")}
      </p>

      <div
        role="tablist"
        aria-label={t("sourcingTitle")}
        className="mt-6 flex flex-wrap gap-3"
      >
        {regions.map((r) => {
          const active = r.code === selectedCode;
          return (
            <button
              key={r.code}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`region-panel-${r.code}`}
              id={`region-tab-${r.code}`}
              onClick={() => setSelectedCode(active ? null : r.code)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--faf-brand)]",
                active
                  ? "border border-[var(--faf-green)] bg-[var(--faf-green)] text-white shadow-sm"
                  : "border border-[var(--faf-deep-blue)]/20 bg-[var(--faf-bg)] text-[var(--faf-ink)] hover:border-[var(--faf-green)]/40 hover:bg-[var(--faf-card)]",
              ].join(" ")}
            >
              {r.label}
            </button>
          );
        })}
        {selected && (
          <button
            type="button"
            onClick={() => setSelectedCode(null)}
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--faf-ink-muted)] underline-offset-4 hover:text-[var(--faf-ink)] hover:underline"
          >
            {t("clearSelection")}
          </button>
        )}
      </div>

      {selected && (
        <div
          id={`region-panel-${selected.code}`}
          role="tabpanel"
          aria-labelledby={`region-tab-${selected.code}`}
          className="mt-10"
        >
          <h3 className="text-xl font-semibold tracking-tight text-[var(--faf-ink)] md:text-2xl">
            {t("regionProductsTitle", { region: selected.label })}
          </h3>
          {selected.countries.length > 0 && (
            <p className="mt-2 text-sm text-[var(--faf-ink-muted)]">
              {t("regionSourcingFrom", {
                countries: selected.countries.join(", "),
              })}
            </p>
          )}

          {selected.products.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-[var(--faf-divider)] bg-[var(--faf-card)] px-4 py-6 text-sm text-[var(--faf-ink-muted)]">
              {t("regionProductsEmpty")}
            </p>
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {selected.products.map((p) => (
                <li key={p.id} className="min-w-0">
                  <Link
                    href={p.href}
                    className="group relative block overflow-hidden rounded-lg border border-[var(--faf-divider)] bg-[var(--faf-navy)] shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--faf-brand)] sm:rounded-2xl"
                    aria-label={`${p.name} — ${p.categoryName}`}
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={p.imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[var(--faf-navy)]/95 via-[var(--faf-navy)]/40 to-[var(--faf-navy)]/15"
                        aria-hidden
                      />
                      <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col p-2 sm:p-4">
                        <p className="line-clamp-2 text-[8px] font-bold uppercase leading-tight tracking-wide text-[#8fd97f] sm:text-[11px] sm:tracking-[0.18em]">
                          {p.categoryName}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs font-bold leading-snug text-white sm:mt-2 sm:text-base">
                          {p.name}
                        </p>
                        {p.origins.length > 0 && (
                          <p className="mt-1 line-clamp-1 text-[9px] font-medium leading-tight text-white/80 sm:mt-1.5 sm:text-xs">
                            {p.origins.join(", ")}
                          </p>
                        )}
                        <p className="mt-1 text-[9px] font-semibold leading-tight text-[#8fd97f] sm:mt-2 sm:text-sm">
                          <span className="sm:hidden" aria-hidden>
                            →
                          </span>
                          <span className="hidden sm:inline">
                            {t("viewProduct")} →
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
