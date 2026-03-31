"use client";

import {
  QUOTEABLE_ITEMS,
  getQuoteableItemById,
} from "@/lib/catalog";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

/** Display order: Price Quote → General Message → Product Sourcing → Partnership */
const INQUIRY = ["quote", "general", "sourcing", "partnership"] as const;

function InquiryIcon({
  kind,
  className = "h-6 w-6",
}: {
  kind: (typeof INQUIRY)[number];
  className?: string;
}) {
  const cls = `shrink-0 ${className}`;
  const stroke = "currentColor";
  const sw = 1.75;
  switch (kind) {
    case "quote":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14 2v6h6M8 13h8M8 17h6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    case "partnership":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="7" r="3" stroke={stroke} strokeWidth={sw} />
          <circle cx="15" cy="7" r="3" stroke={stroke} strokeWidth={sw} />
          <path
            d="M4 20c0-3 2.5-5 5-5h2c2.5 0 5 2 5 5"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </svg>
      );
    case "sourcing":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="6" stroke={stroke} strokeWidth={sw} />
          <path d="M20 20l-3.5-3.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8.5z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

const labelClass = "block text-sm font-medium text-[var(--faf-ink)]";
const fieldClass =
  "mt-1 w-full rounded-xl border border-[var(--faf-divider)] bg-white px-3 py-2.5 text-sm text-[var(--faf-ink)] shadow-sm transition focus:border-[var(--faf-navy)]/25 focus:outline-none focus:ring-2 focus:ring-[var(--faf-green)]/25";

function initialVariationForProduct(
  productId: string,
  urlVariation: string
): string {
  if (!productId) return "";
  const item = getQuoteableItemById(productId);
  if (!item?.variationOptions?.length) return "";
  const valid = item.variationOptions.some((o) => o.id === urlVariation);
  return valid
    ? urlVariation
    : item.variationOptions[0]!.id;
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as "en" | "fr";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const byCategory = useMemo(() => {
    const map = new Map<
      string,
      { slug: string; name: string; items: typeof QUOTEABLE_ITEMS }
    >();
    for (const item of QUOTEABLE_ITEMS) {
      const key = item.categorySlug;
      if (!map.has(key)) {
        map.set(key, {
          slug: item.categorySlug,
          name: item.categoryName[locale],
          items: [],
        });
      }
      map.get(key)!.items.push(item);
    }
    return [...map.values()];
  }, [locale]);

  const initialProduct = searchParams.get("product") || "";
  const urlVariation = searchParams.get("variation") || "";

  const [inquiryType, setInquiryType] =
    useState<(typeof INQUIRY)[number]>("quote");
  const [productId, setProductId] = useState(initialProduct);
  const [variationId, setVariationId] = useState(() =>
    initialVariationForProduct(initialProduct, urlVariation)
  );
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const showProductInterest =
    inquiryType === "quote" || inquiryType === "sourcing";

  useEffect(() => {
    if (!showProductInterest) {
      setProductId("");
      setVariationId("");
    }
  }, [showProductInterest]);

  function handleProductChange(nextId: string) {
    setProductId(nextId);
    const item = nextId ? getQuoteableItemById(nextId) : undefined;
    if (item?.variationOptions?.length) {
      setVariationId(item.variationOptions[0]!.id);
    } else {
      setVariationId("");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    const line =
      showProductInterest && productId
        ? getQuoteableItemById(productId)
        : undefined;
    const needsVariation = Boolean(line?.variationOptions?.length);
    startTransition(async () => {
      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locale,
            inquiryType,
            productId:
              showProductInterest && productId ? productId : undefined,
            variationId:
              showProductInterest && needsVariation && variationId
                ? variationId
                : undefined,
            company,
            name,
            email,
            phone: phone || undefined,
            country: country || undefined,
            message: message || undefined,
          }),
        });
        if (!res.ok) {
          setStatus("err");
          return;
        }
        setStatus("ok");
        router.refresh();
      } catch {
        setStatus("err");
      }
    });
  }

  const linePreview =
    showProductInterest && productId
      ? getQuoteableItemById(productId)
      : undefined;
  const showVariation = Boolean(linePreview?.variationOptions?.length);

  return (
    <form
      onSubmit={onSubmit}
      className="min-w-0 space-y-5 rounded-2xl border border-[var(--faf-divider)] bg-[var(--faf-card)] p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md md:p-8"
    >
      <div className="rounded-2xl border border-[var(--faf-divider)] bg-gradient-to-b from-[var(--faf-bg)]/90 to-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-5">
        <p
          className="text-base font-semibold leading-snug tracking-tight text-[var(--faf-ink)] sm:text-[1.05rem]"
          id="contact-inquiry-label"
        >
          {t("inquiryType")}
        </p>
        <p className="mt-1 text-xs text-[var(--faf-body)] sm:text-sm">
          {t("inquiryHint")}
        </p>
        <div
          className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3.5"
          role="radiogroup"
          aria-labelledby="contact-inquiry-label"
        >
          {INQUIRY.map((k) => {
            const selected = inquiryType === k;
            return (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setInquiryType(k)}
                className={[
                  "group flex min-h-[5.5rem] flex-col gap-2.5 rounded-xl border p-3.5 text-left transition-all duration-200 sm:min-h-[5.75rem] sm:p-4",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--faf-green)]/40 focus-visible:ring-offset-2",
                  "active:scale-[0.98]",
                  selected
                    ? "border-[var(--faf-green)] bg-[var(--faf-green)]/[0.12] shadow-[0_2px_10px_-3px_rgba(87,168,70,0.45)] ring-1 ring-[var(--faf-green)]/25"
                    : "border-[var(--faf-divider)] bg-white shadow-[0_1px_2px_rgba(31,42,55,0.04)] hover:border-[var(--faf-navy)]/16 hover:shadow-[0_6px_16px_-8px_rgba(31,42,55,0.18)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200",
                    selected
                      ? "bg-[var(--faf-green)]/25 text-[var(--faf-green)]"
                      : "bg-[var(--faf-navy)]/[0.06] text-[var(--faf-navy)]/78 group-hover:bg-[var(--faf-navy)]/[0.09] group-hover:text-[var(--faf-navy)]",
                  ].join(" ")}
                >
                  <InquiryIcon kind={k} />
                </span>
                <span className="text-balance text-[0.8125rem] font-medium leading-[1.35] text-[var(--faf-ink)] sm:text-sm">
                  {t(`inquiryTypes.${k}`)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {showProductInterest ? (
        <div className="space-y-5 border-t border-[var(--faf-divider)] pt-6">
          <div>
            <label className={labelClass}>{t("product")}</label>
            <select
              value={productId}
              onChange={(e) => handleProductChange(e.target.value)}
              className={fieldClass}
            >
              <option value="">{t("productGeneral")}</option>
              {byCategory.map((cat) => (
                <optgroup key={cat.slug} label={cat.name}>
                  {cat.items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.lineLabel[locale]}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {linePreview && !showVariation && (
              <p className="mt-2 text-xs text-[var(--faf-body)]">
                {linePreview.groupTitle[locale]}
              </p>
            )}
          </div>

          {showVariation && linePreview?.variationOptions && (
            <div>
              <label className={labelClass}>{t("variation")}</label>
              <select
                required
                value={variationId}
                onChange={(e) => setVariationId(e.target.value)}
                className={fieldClass}
              >
                {linePreview.variationOptions.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label[locale]}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-[var(--faf-body)]">
                {linePreview.groupTitle[locale]}
              </p>
            </div>
          )}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t("company")}</label>
          <input
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t("country")}</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("name")}</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t("email")}</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t("phone")}</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("message")}</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={fieldClass}
        />
      </div>

      {status === "ok" && (
        <p className="rounded-xl border border-[var(--faf-green)]/25 bg-[var(--faf-green)]/12 px-4 py-3 text-sm font-medium text-[var(--faf-green)]">
          {t("success")}
        </p>
      )}
      {status === "err" && (
        <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[var(--faf-cta)] px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-500/15 transition hover:bg-[var(--faf-cta-hover)] disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
