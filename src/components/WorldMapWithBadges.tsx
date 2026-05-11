import type { CSSProperties } from "react";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import type { RegionCode } from "@/lib/markets-regions";

/**
 * Hub markers on an equirectangular world map (lon −180…180°, lat −90…90°).
 * Positions are approximate geographic centers for each corridor label.
 */
const REGION_MARKERS: ReadonlyArray<{
  code: RegionCode;
  lon: number;
  lat: number;
}> = [
  { code: "CA", lon: -96, lat: 56 },
  { code: "US", lon: -98, lat: 39 },
  { code: "EU", lon: 12, lat: 50 },
  { code: "EE", lon: 25, lat: 48 },
  { code: "ME", lon: 47, lat: 30 },
  { code: "AS", lon: 105, lat: 32 },
  { code: "LATAM", lon: -68, lat: -12 },
];

function lonLatToStyle(lon: number, lat: number): CSSProperties {
  const leftPct = ((lon + 180) / 360) * 100;
  const topPct = ((90 - lat) / 180) * 100;
  return {
    left: `${leftPct}%`,
    top: `${topPct}%`,
  };
}

function markerBadgeClass(code: string, compact: boolean): string {
  const base =
    "flex items-center justify-center rounded-full border-2 border-[#1a6b44] bg-white font-bold leading-tight text-[#14231a] shadow-md";
  if (compact) {
    return code === "LATAM"
      ? `${base} h-7 min-w-[2.75rem] px-1 text-[7px] sm:h-8 sm:min-w-[3rem] sm:text-[8px]`
      : `${base} h-7 min-w-[1.75rem] px-1 text-[7px] sm:h-8 sm:min-w-[2rem] sm:text-[8px]`;
  }
  return code === "LATAM"
    ? `${base} h-9 min-w-[3.25rem] px-1.5 text-[9px] sm:h-10 sm:min-w-[3.5rem] sm:px-2 sm:text-[10px]`
    : `${base} h-9 min-w-[2.25rem] px-1.5 text-[9px] sm:h-10 sm:min-w-[2.5rem] sm:px-2 sm:text-[10px]`;
}

type WorldMapWithBadgesProps = {
  mapAlt: string;
  className?: string;
  /** Smaller markers for narrow / sidebar layout */
  compact?: boolean;
  /** Fill parent height (e.g. stretched column); omit aspect ratio */
  fillHeight?: boolean;
  /** When set, each hub badge links to this href (e.g. `/markets?region=CA`). */
  markerHref?: (code: RegionCode) => string;
  /** Accessible name for marker links — provide when using `markerHref`. */
  markerLinkAriaLabel?: (code: RegionCode) => string;
};

export function WorldMapWithBadges({
  mapAlt,
  className = "",
  compact = false,
  fillHeight = false,
  markerHref,
  markerLinkAriaLabel,
}: WorldMapWithBadgesProps) {
  const sizeClass = fillHeight
    ? "h-full min-h-[200px] w-full"
    : "aspect-[2/1] w-full";

  return (
    <div
      className={`relative overflow-hidden rounded-[14px] bg-[#e8eef2] ${sizeClass} ${className}`}
    >
      <Image
        src="/brand/world-map.jpg"
        alt={mapAlt}
        fill
        className="object-contain object-center"
        sizes={
          compact
            ? "(max-width: 1023px) 100vw, 420px"
            : "(max-width: 1024px) 100vw, 960px"
        }
        priority={false}
      />
      {REGION_MARKERS.map((m) => {
        const badge = (
          <span className={markerBadgeClass(m.code, compact)} title={m.code}>
            {m.code}
          </span>
        );
        return (
          <div
            key={m.code}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={lonLatToStyle(m.lon, m.lat)}
          >
            {markerHref ? (
              <Link
                href={markerHref(m.code)}
                aria-label={markerLinkAriaLabel?.(m.code) ?? m.code}
                className="block rounded-full outline-offset-2 transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--faf-brand)]"
              >
                {badge}
              </Link>
            ) : (
              badge
            )}
          </div>
        );
      })}
    </div>
  );
}
