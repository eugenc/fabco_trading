"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ServicesNavMobile } from "./ServicesNav";

export function MobileNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const serviceItems = [
    { href: "/import", label: t("import") },
    { href: "/export", label: t("export") },
    { href: "/logistics", label: t("logistics") },
  ] as const;

  const linksBeforeServices = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
  ] as const;

  const linksAfterServices = [
    { href: "/markets", label: t("markets") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const menuPanel =
    open && mounted ? (
      <div
        className="fixed inset-0 z-[200] md:hidden"
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
      >
        <button
          type="button"
          className="absolute inset-0 bg-[var(--faf-navy)]/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-label={t("closeMenu")}
        />
        <nav
          className="absolute right-0 top-0 flex h-[100dvh] max-h-[100dvh] w-[min(100%,20rem)] flex-col bg-[var(--faf-card)] shadow-2xl"
          aria-label="Mobile"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-[var(--faf-divider)] px-4 py-4">
            <span id="mobile-nav-title" className="text-lg font-bold text-[var(--faf-ink)]">
              {t("brandName")}
            </span>
            <button
              type="button"
              className="rounded-lg p-2 text-[var(--faf-ink-muted)] hover:bg-[var(--faf-bg)]"
              onClick={() => setOpen(false)}
              aria-label={t("closeMenu")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-4">
            {linksBeforeServices.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-[var(--faf-ink)] hover:bg-[var(--faf-bg)]"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <ServicesNavMobile
              key={pathname ?? ""}
              label={t("services")}
              items={[...serviceItems]}
              onNavigate={() => setOpen(false)}
            />
            {linksAfterServices.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-[var(--faf-ink)] hover:bg-[var(--faf-bg)]"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="shrink-0 border-t border-[var(--faf-divider)] p-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-[var(--faf-cta)] px-4 py-3 text-sm font-semibold text-white shadow hover:bg-[var(--faf-cta-hover)]"
            >
              {t("quoteCta")}
            </Link>
          </div>
          <div
            className="shrink-0 border-t border-[var(--faf-divider)] bg-[var(--faf-card)] p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
          >
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--faf-divider)] bg-[var(--faf-bg)] px-4 py-3.5 text-sm font-semibold text-[var(--faf-ink)] shadow-sm transition hover:bg-[var(--faf-card)]"
              onClick={() => setOpen(false)}
              aria-label={t("closeMenu")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
              {t("closeMenu")}
            </button>
          </div>
        </nav>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-visible rounded-lg border border-[var(--faf-divider)] bg-[var(--faf-card)] text-[var(--faf-ink)] shadow-sm ${open ? "invisible pointer-events-none" : ""}`}
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={t("openMenu")}
      >
        <span className="sr-only">{t("openMenu")}</span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      </button>

      {menuPanel ? createPortal(menuPanel, document.body) : null}
    </>
  );
}
