"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Syncs `<html lang>` with the active locale segment (`/en` / `/fr`) for accessibility and SEO.
 */
export function SetHtmlLang() {
  const pathname = usePathname();
  useEffect(() => {
    const locale = pathname?.startsWith("/fr") ? "fr" : "en";
    document.documentElement.lang = locale;
  }, [pathname]);
  return null;
}
