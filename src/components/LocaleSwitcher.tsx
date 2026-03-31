"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const locales = ["en", "fr"] as const;

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="flex items-center gap-1 text-sm" aria-label="Language">
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            className={`rounded-md px-2 py-1 font-medium transition-colors ${
              active
                ? "bg-[var(--faf-navy)] text-white"
                : "text-[var(--faf-body)] hover:bg-black/5"
            }`}
            hrefLang={l}
            lang={l}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
