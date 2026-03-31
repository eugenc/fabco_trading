import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";

export async function SiteHeader() {
  const t = await getTranslations("nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/import", label: t("import") },
    { href: "/export", label: t("export") },
    { href: "/logistics", label: t("logistics") },
    { href: "/markets", label: t("markets") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--faf-divider)] bg-[var(--faf-card)]/95 backdrop-blur-md">
      <div className="faf-container flex flex-wrap items-center justify-between gap-3 py-3 md:gap-4 md:py-4">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 md:gap-3"
          aria-label={`${t("brandName")} — ${t("home")}`}
        >
          <Image
            src="/logo/fafco_logo_icon.jpg"
            alt=""
            width={56}
            height={56}
            className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
            priority
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-[var(--faf-ink)] md:text-xl">
              {t("brandName")}
            </span>
            <span className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--faf-ink-muted)] sm:text-[11px]">
              {t("brandTagline")}
            </span>
          </span>
        </Link>

        <nav
          className="order-3 hidden w-full flex-wrap items-center justify-center gap-x-0.5 gap-y-1 text-sm font-medium md:order-none md:flex md:w-auto md:flex-1 md:justify-center lg:gap-x-1"
          aria-label="Primary"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-2 py-2 text-[var(--faf-ink)] transition hover:bg-[var(--faf-bg)] hover:text-[var(--faf-green)] lg:px-2.5"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex rounded-lg border border-[var(--faf-divider)] bg-[var(--faf-card)] px-4 py-2 text-sm font-semibold text-[var(--faf-ink)] shadow-sm transition hover:border-[var(--faf-cta)]/40 hover:bg-[var(--faf-bg)] hover:text-[var(--faf-navy)]"
          >
            {t("quoteCta")}
          </Link>
          <LocaleSwitcher />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
