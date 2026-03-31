import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

function ContactIconBox({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--faf-green)]/35 bg-[var(--faf-green)]/10 text-[var(--faf-green)]"
      aria-hidden
    >
      {children}
    </span>
  );
}

export async function ContactDetails() {
  const t = await getTranslations("contact.details");

  const telHref = t("phoneValue").replace(/[^\d+]/g, "");

  return (
    <aside className="min-w-0 rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-card)] p-6 shadow-sm ring-1 ring-black/5 md:p-8 lg:sticky lg:top-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faf-green)] sm:text-sm">
        {t("sidebarTitle")}
      </p>

      <dl className="mt-6 space-y-4">
        <div className="flex gap-3 rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-bg)]/80 px-4 py-3 shadow-sm">
          <ContactIconBox>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ContactIconBox>
          <div className="min-w-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--faf-navy)]">
              {t("phoneLabel")}
            </dt>
            <dd className="mt-1">
              <a
                href={`tel:${telHref}`}
                className="text-sm font-medium text-[var(--faf-ink)] underline decoration-[var(--faf-divider)] underline-offset-2 transition hover:text-[var(--faf-green)] hover:decoration-[var(--faf-green)]"
              >
                {t("phoneValue")}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-bg)]/80 px-4 py-3 shadow-sm">
          <ContactIconBox>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 6l-10 7L2 6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ContactIconBox>
          <div className="min-w-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--faf-navy)]">
              {t("emailLabel")}
            </dt>
            <dd className="mt-1">
              <a
                href={`mailto:${t("emailValue")}`}
                className="break-all text-sm font-medium text-[var(--faf-ink)] underline decoration-[var(--faf-divider)] underline-offset-2 transition hover:text-[var(--faf-green)] hover:decoration-[var(--faf-green)]"
              >
                {t("emailValue")}
              </a>
            </dd>
          </div>
        </div>

        <div className="flex gap-3 rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-bg)]/80 px-4 py-3 shadow-sm">
          <ContactIconBox>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
            </svg>
          </ContactIconBox>
          <div className="min-w-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--faf-navy)]">
              {t("addressLabel")}
            </dt>
            <dd className="mt-1 whitespace-pre-line text-sm leading-relaxed text-[var(--faf-body)]">
              {t("addressValue")}
            </dd>
          </div>
        </div>
      </dl>

      <div className="mt-8 border-t border-[var(--faf-divider)] pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--faf-green)] sm:text-sm">
          {t("locationsTitle")}
        </p>
        <ul className="mt-5 space-y-3">
          <li className="rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-card)] px-4 py-3 shadow-sm ring-1 ring-black/[0.03]">
            <p className="text-sm font-semibold text-[var(--faf-navy)]">{t("canadaTitle")}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--faf-body)]">
              {t("canadaBody")}
            </p>
          </li>
          <li className="rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-card)] px-4 py-3 shadow-sm ring-1 ring-black/[0.03]">
            <p className="text-sm font-semibold text-[var(--faf-navy)]">{t("germanyTitle")}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--faf-body)]">
              {t("germanyBody")}
            </p>
          </li>
          <li className="rounded-xl border border-[var(--faf-divider)] bg-[var(--faf-card)] px-4 py-3 shadow-sm ring-1 ring-black/[0.03]">
            <p className="text-sm font-semibold text-[var(--faf-navy)]">{t("dubaiTitle")}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--faf-body)]">
              {t("dubaiBody")}
            </p>
          </li>
        </ul>
      </div>
    </aside>
  );
}
