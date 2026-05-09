"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SERVICE_HREFS = ["/import", "/export", "/logistics"] as const;

export type ServiceMegaItem = {
  href: string;
  label: string;
  description: string;
};

function ServiceMegaIcon({ slug }: { slug: "import" | "export" | "logistics" }) {
  const common = "h-10 w-10 text-[var(--faf-green)]";
  if (slug === "import") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M8 28V14l6-4h12l6 4v14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 28h24M14 18v10M26 18v10" strokeLinecap="round" />
        <path d="M17 10l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (slug === "export") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="9" y="13" width="22" height="17" rx="2" />
        <path d="M13 13V10a2 2 0 012-2h10a2 2 0 012 2v3M20 8V6" strokeLinecap="round" />
        <path d="M15 22h10M15 26h6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 28h28M8 28l4-10h16l4 10" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="28" r="3" />
      <circle cx="28" cy="28" r="3" />
      <path d="M16 18h8M20 14v8" strokeLinecap="round" />
    </svg>
  );
}

function serviceSlugFromHref(href: string): "import" | "export" | "logistics" {
  if (href.includes("export")) return "export";
  if (href.includes("logistics")) return "logistics";
  return "import";
}

export function ServicesNavDesktop({
  label,
  items,
  megaEyebrow,
  megaTitle,
  megaLead,
  quoteCta,
}: {
  label: string;
  items: ServiceMegaItem[];
  megaEyebrow: string;
  megaTitle: string;
  megaLead: string;
  quoteCta: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [megaTop, setMegaTop] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const routeActive =
    pathname != null && SERVICE_HREFS.some((h) => pathname === h || pathname.startsWith(`${h}/`));

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- document.body portal; avoid SSR/hydration mismatch */
    setMounted(true);
  }, []);

  const updateMegaTop = () => {
    const el = triggerRef.current;
    if (el) setMegaTop(el.getBoundingClientRect().bottom);
  };

  useLayoutEffect(() => {
    if (!open) return;
    updateMegaTop();
    window.addEventListener("resize", updateMegaTop);
    window.addEventListener("scroll", updateMegaTop, true);
    return () => {
      window.removeEventListener("resize", updateMegaTop);
      window.removeEventListener("scroll", updateMegaTop, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const megaPanel =
    open && mounted ? (
      <>
        <div
          className="fixed bottom-0 left-0 right-0 z-[60] bg-[var(--faf-navy)]/20 backdrop-blur-[2px]"
          style={{ top: megaTop }}
          aria-hidden
          onClick={() => setOpen(false)}
        />
        <div
          id="services-nav-menu"
          role="region"
          aria-labelledby="services-nav-trigger"
          className="fixed left-0 right-0 z-[70] max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto overscroll-contain border-b border-[var(--faf-divider)] bg-[var(--faf-card)] shadow-xl"
          style={{ top: megaTop }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="faf-container py-8 md:py-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-center lg:col-span-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--faf-green-muted)]">
                  {megaEyebrow}
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-[var(--faf-ink)] sm:text-2xl">{megaTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--faf-ink-muted)]">{megaLead}</p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-fit items-center rounded-lg bg-[var(--faf-cta)] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--faf-cta-hover)]"
                  onClick={() => setOpen(false)}
                >
                  {quoteCta}
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
                {items.map((item) => {
                  const slug = serviceSlugFromHref(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-bg)]/60 p-5 transition hover:border-[var(--faf-green)]/45 hover:bg-[var(--faf-card)] hover:shadow-md"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="rounded-lg bg-[var(--faf-card)] p-2 shadow-sm ring-1 ring-[var(--faf-divider)] transition group-hover:ring-[var(--faf-green)]/30">
                          <ServiceMegaIcon slug={slug} />
                        </div>
                        <span
                          className="mt-1 text-[var(--faf-green)] transition group-hover:translate-x-0.5"
                          aria-hidden
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-bold text-[var(--faf-ink)]">{item.label}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--faf-ink-muted)]">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null;

  return (
    <>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          className={`inline-flex items-center gap-0.5 rounded-md px-2 py-2 text-sm font-medium transition lg:px-2.5 ${
            routeActive || open
              ? "bg-[var(--faf-bg)] text-[var(--faf-green)]"
              : "text-[var(--faf-ink)] hover:bg-[var(--faf-bg)] hover:text-[var(--faf-green)]"
          }`}
          aria-expanded={open}
          aria-controls="services-nav-menu"
          id="services-nav-trigger"
          aria-haspopup="dialog"
          onClick={() => setOpen((v) => !v)}
        >
          {label}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {megaPanel ? createPortal(megaPanel, document.body) : null}
    </>
  );
}

export function ServicesNavMobile({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { href: string; label: string }[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const startsExpanded =
    pathname != null &&
    SERVICE_HREFS.some((h) => pathname === h || pathname.startsWith(`${h}/`));
  const [expanded, setExpanded] = useState(startsExpanded);

  return (
    <li className="flex flex-col">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-[var(--faf-ink)] hover:bg-[var(--faf-bg)]"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {label}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {expanded ? (
        <ul className="flex flex-col gap-0.5 border-l border-[var(--faf-divider)] pl-3 ml-3 mb-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2 text-[15px] font-medium text-[var(--faf-ink-muted)] hover:bg-[var(--faf-bg)] hover:text-[var(--faf-ink)]"
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
