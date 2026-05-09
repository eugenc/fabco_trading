"use client";

import { CATEGORIES, QUOTEABLE_ITEMS, type CatalogCategory } from "@/lib/catalog";
import { getCatalogProductImageSrc } from "@/data/catalogProductImages";
import { Link } from "@/i18n/navigation";
import { quoteItemToPageSlug } from "@/lib/product-pages";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";

type Locale = "en" | "fr";

type GroupOption = {
  categorySlug: string;
  groupId: string;
  label: string;
};

function itemMatchesQuery(
  item: (typeof QUOTEABLE_ITEMS)[number],
  query: string,
  locale: Locale
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const line = item.lineLabel[locale].toLowerCase();
  const group = item.groupTitle[locale].toLowerCase();
  const cat = item.categoryName[locale].toLowerCase();
  return line.includes(q) || group.includes(q) || cat.includes(q);
}

function buildSuggestions(query: string, locale: Locale, limit = 12) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const out: { key: string; text: string }[] = [];
  const seen = new Set<string>();

  for (const c of CATEGORIES) {
    const name = c.name[locale].toLowerCase();
    if (name.includes(q)) {
      const key = `cat:${c.slug}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push({ key, text: c.name[locale] });
      }
    }
  }
  for (const c of CATEGORIES) {
    for (const g of c.groups) {
      const t = g.title[locale].toLowerCase();
      if (t.includes(q)) {
        const key = `grp:${c.slug}:${g.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          out.push({ key, text: g.title[locale] });
        }
      }
    }
  }
  for (const item of QUOTEABLE_ITEMS) {
    const line = item.lineLabel[locale].toLowerCase();
    if (line.includes(q)) {
      const key = `prd:${item.id}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push({ key, text: item.lineLabel[locale] });
      }
    }
  }
  return out.slice(0, limit);
}

type GroupBlock = {
  group: CatalogCategory["groups"][number];
  items: typeof QUOTEABLE_ITEMS;
};

/** Pack groups into rows of up to 4 columns: a group with n products uses n columns (n ≤ 4). */
function packGroupsIntoRows(groups: GroupBlock[]): GroupBlock[][] {
  const rows: GroupBlock[][] = [];
  let row: GroupBlock[] = [];
  let used = 0;

  const flush = () => {
    if (row.length) {
      rows.push(row);
      row = [];
      used = 0;
    }
  };

  for (const block of groups) {
    const n = block.items.length;
    if (n > 4) {
      flush();
      rows.push([block]);
      continue;
    }
    if (used + n > 4) {
      flush();
    }
    row.push(block);
    used += n;
    if (used === 4) {
      flush();
    }
  }
  flush();
  return rows;
}

function productSubgridClass(itemCount: number): string {
  if (itemCount <= 1)
    return "grid grid-cols-3 gap-2 sm:grid-cols-1 sm:gap-4";
  /* Mobile: 3 columns; sm+ restores roomier layouts up to lg */
  if (itemCount === 2) return "grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-2";
  if (itemCount === 3) {
    return "grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3";
  }
  if (itemCount === 4) {
    return "grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4";
  }
  return "grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4";
}

function groupColSpanClass(itemCount: number): string {
  const span = itemCount > 4 ? 4 : itemCount;
  if (span === 1) return "lg:col-span-1";
  if (span === 2) return "lg:col-span-2";
  if (span === 3) return "lg:col-span-3";
  return "lg:col-span-4";
}

export function ProductsCatalogClient({
  locale,
  initialCategory,
}: {
  locale: Locale;
  /** When set (e.g. from `?category=food`), pre-selects the category filter. */
  initialCategory?: string;
}) {
  const t = useTranslations("products");
  const searchId = useId();
  const validatedInitialCategory =
    initialCategory &&
    CATEGORIES.some((c) => c.slug === initialCategory)
      ? initialCategory
      : "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>(
    validatedInitialCategory
  );
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [activeSuggest, setActiveSuggest] = useState(-1);

  const groupOptions: GroupOption[] = useMemo(() => {
    const opts: GroupOption[] = [];
    for (const c of CATEGORIES) {
      if (categoryFilter !== "all" && c.slug !== categoryFilter) continue;
      for (const g of c.groups) {
        const catName = locale === "fr" ? c.name.fr : c.name.en;
        const gTitle = locale === "fr" ? g.title.fr : g.title.en;
        opts.push({
          categorySlug: c.slug,
          groupId: g.id,
          label: `${gTitle} — ${catName}`,
        });
      }
    }
    return opts.sort((a, b) => a.label.localeCompare(b.label, locale));
  }, [categoryFilter, locale]);

  useEffect(() => {
    if (groupFilter === "all") return;
    const ok = groupOptions.some((o) => o.groupId === groupFilter);
    if (!ok) setGroupFilter("all");
  }, [categoryFilter, groupFilter, groupOptions]);

  useEffect(() => {
    const next =
      initialCategory &&
      CATEGORIES.some((c) => c.slug === initialCategory)
        ? initialCategory
        : "all";
    setCategoryFilter(next);
    setGroupFilter("all");
  }, [initialCategory]);

  const visibleItems = useMemo(() => {
    return QUOTEABLE_ITEMS.filter((item) => {
      if (categoryFilter !== "all" && item.categorySlug !== categoryFilter) {
        return false;
      }
      if (groupFilter !== "all" && item.groupId !== groupFilter) {
        return false;
      }
      return itemMatchesQuery(item, searchQuery, locale);
    });
  }, [categoryFilter, groupFilter, searchQuery, locale]);

  const visibleIds = useMemo(
    () => new Set(visibleItems.map((i) => i.id)),
    [visibleItems]
  );

  const suggestions = useMemo(
    () => buildSuggestions(searchQuery, locale),
    [searchQuery, locale]
  );

  const sections = useMemo(() => {
    const result: {
      category: CatalogCategory;
      groups: { group: CatalogCategory["groups"][number]; items: typeof QUOTEABLE_ITEMS }[];
    }[] = [];

    for (const cat of CATEGORIES) {
      if (categoryFilter !== "all" && cat.slug !== categoryFilter) continue;

      const groupsOut: {
        group: CatalogCategory["groups"][number];
        items: typeof QUOTEABLE_ITEMS;
      }[] = [];

      for (const g of cat.groups) {
        if (groupFilter !== "all" && g.id !== groupFilter) continue;
        const items = QUOTEABLE_ITEMS.filter(
          (q) =>
            q.categorySlug === cat.slug &&
            q.groupId === g.id &&
            visibleIds.has(q.id)
        );
        if (items.length > 0) {
          groupsOut.push({ group: g, items });
        }
      }

      if (groupsOut.length > 0) {
        result.push({ category: cat, groups: groupsOut });
      }
    }
    return result;
  }, [categoryFilter, groupFilter, visibleIds]);

  const showSuggest =
    suggestOpen && searchQuery.trim().length > 0 && suggestions.length > 0;

  function applySuggestion(text: string) {
    setSearchQuery(text);
    setSuggestOpen(false);
    setActiveSuggest(-1);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
      <div className="w-full min-w-0 rounded-2xl border border-black/5 bg-[var(--faf-card)] p-4 shadow-sm md:p-6">
        {/* Fixed grid on lg: search ~3fr, each select column 1fr with min width — panel width stays stable */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(11rem,1fr)_minmax(11rem,1fr)] lg:items-end lg:gap-x-5 lg:gap-y-4">
          <div className="relative min-w-0">
            <label
              htmlFor={searchId}
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--faf-ink-muted)]"
            >
              {t("catalogSearchLabel")}
            </label>
            <input
              id={searchId}
              type="search"
              role="combobox"
              aria-expanded={showSuggest}
              aria-controls={`${searchId}-listbox`}
              aria-autocomplete="list"
              autoComplete="off"
              placeholder={t("catalogSearchPlaceholder")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSuggestOpen(true);
                setActiveSuggest(-1);
              }}
              onFocus={() => setSuggestOpen(true)}
              onBlur={() => {
                window.setTimeout(() => setSuggestOpen(false), 180);
              }}
              onKeyDown={(e) => {
                if (!showSuggest) return;
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveSuggest((i) =>
                    Math.min(i + 1, suggestions.length - 1)
                  );
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveSuggest((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter" && activeSuggest >= 0) {
                  e.preventDefault();
                  applySuggestion(suggestions[activeSuggest]!.text);
                } else if (e.key === "Escape") {
                  setSuggestOpen(false);
                }
              }}
              className="box-border w-full min-w-0 rounded-xl border border-black/10 bg-[var(--faf-bg)] px-4 py-3 text-sm text-[var(--faf-ink)] outline-none ring-[var(--faf-brand)] transition placeholder:text-[var(--faf-ink-muted)] focus:border-[var(--faf-brand)]/50 focus:ring-2"
            />
            {showSuggest && (
              <ul
                id={`${searchId}-listbox`}
                role="listbox"
                className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-xl border border-black/10 bg-[var(--faf-card)] py-1 shadow-lg"
              >
                {suggestions.map((s, idx) => (
                  <li key={s.key} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={idx === activeSuggest}
                      className={`flex w-full px-4 py-2.5 text-left text-sm text-[var(--faf-ink)] hover:bg-[var(--faf-bg)] ${
                        idx === activeSuggest ? "bg-[var(--faf-bg)]" : ""
                      }`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => applySuggestion(s.text)}
                    >
                      {s.text}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="min-w-0">
            <label
              htmlFor={`${searchId}-cat`}
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--faf-ink-muted)]"
            >
              {t("filterCategory")}
            </label>
            <select
              id={`${searchId}-cat`}
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setGroupFilter("all");
              }}
              className="box-border w-full min-w-0 max-w-full rounded-xl border border-black/10 bg-[var(--faf-bg)] px-3 py-3 text-sm text-[var(--faf-ink)] outline-none focus:border-[var(--faf-brand)]/50 focus:ring-2 focus:ring-[var(--faf-brand)]"
            >
              <option value="all">{t("filterCategoryAll")}</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {locale === "fr" ? c.name.fr : c.name.en}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label
              htmlFor={`${searchId}-grp`}
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--faf-ink-muted)]"
            >
              {t("filterGroup")}
            </label>
            <select
              id={`${searchId}-grp`}
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="box-border w-full min-w-0 max-w-full rounded-xl border border-black/10 bg-[var(--faf-bg)] px-3 py-3 text-sm text-[var(--faf-ink)] outline-none focus:border-[var(--faf-brand)]/50 focus:ring-2 focus:ring-[var(--faf-brand)]"
            >
              <option value="all">{t("filterGroupAll")}</option>
              {groupOptions.map((o) => (
                <option
                  key={`${o.categorySlug}:${o.groupId}`}
                  value={o.groupId}
                >
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Border always present so the card width/structure stays stable when toggling filters. */}
        <div className="mt-4 border-t border-black/5 pt-4">
          {(searchQuery ||
            categoryFilter !== "all" ||
            groupFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setGroupFilter("all");
              }}
              className="text-sm font-semibold text-[var(--faf-brand)] hover:underline"
            >
              {t("clearFilters")}
            </button>
          )}
        </div>
      </div>

      {sections.length === 0 ? (
        <p className="mt-10 text-center text-[var(--faf-ink-muted)]">
          {t("catalogNoResults")}
        </p>
      ) : (
        <div className="mt-12 w-full space-y-16">
          {sections.map(({ category, groups }) => (
            <section
              key={category.id}
              className="w-full min-w-0"
              aria-labelledby={`cat-${category.id}`}
            >
              <h2
                id={`cat-${category.id}`}
                className="text-2xl font-bold tracking-tight text-[var(--faf-ink)] md:text-3xl"
              >
                {locale === "fr" ? category.name.fr : category.name.en}
              </h2>
              <div className="mt-10 w-full space-y-8 lg:space-y-6">
                {packGroupsIntoRows(groups).map((row, rowIdx) => (
                  <div
                    key={`row-${category.id}-${rowIdx}`}
                    className="grid w-full min-w-0 grid-cols-1 gap-8 lg:gap-6 lg:[grid-template-columns:repeat(4,minmax(0,1fr))]"
                  >
                    {row.map(({ group, items }) => (
                      <div
                        key={group.id}
                        className={`w-full min-w-0 ${groupColSpanClass(items.length)}`}
                      >
                        <h3 className="text-lg font-semibold text-[var(--faf-ink)] md:text-xl">
                          {locale === "fr" ? group.title.fr : group.title.en}
                        </h3>
                        {group.note && (
                          <p className="mt-2 w-full min-w-0 break-words text-sm text-[var(--faf-ink-muted)]">
                            {locale === "fr" ? group.note.fr : group.note.en}
                          </p>
                        )}
                        <ul
                          className={`mt-6 w-full min-w-0 ${productSubgridClass(items.length)}`}
                        >
                          {items.map((item) => (
                            <li key={item.id} className="min-w-0">
                              <Link
                                href={`/products/${item.categorySlug}/${quoteItemToPageSlug(item)}`}
                                className="group relative block overflow-hidden rounded-lg border border-[var(--faf-divider)] bg-[var(--faf-navy)] shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--faf-brand)] sm:rounded-2xl"
                                aria-label={`${item.lineLabel[locale]} — ${item.categoryName[locale]}`}
                              >
                                <div className="relative aspect-square w-full overflow-hidden sm:aspect-[3/4] lg:aspect-square">
                                  <Image
                                    src={getCatalogProductImageSrc(
                                      item.id,
                                      item.categorySlug
                                    )}
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 34vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                                  />
                                  <div
                                    className="absolute inset-0 bg-gradient-to-t from-[var(--faf-navy)]/95 via-[var(--faf-navy)]/40 to-[var(--faf-navy)]/15"
                                    aria-hidden
                                  />
                                  <div className="absolute inset-x-0 bottom-0 z-[1] flex flex-col p-1.5 sm:p-4 md:p-5">
                                    <p className="line-clamp-2 text-[7px] font-bold uppercase leading-tight tracking-wide text-[#8fd97f] sm:text-[11px] sm:tracking-[0.18em]">
                                      {item.categoryName[locale]}
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-[11px] font-bold leading-snug text-white sm:mt-2 sm:text-base md:text-lg">
                                      {item.lineLabel[locale]}
                                    </p>
                                    <p className="mt-1 text-[9px] font-semibold leading-tight text-[#8fd97f] sm:mt-3 sm:text-sm">
                                      <span className="sm:hidden" aria-hidden>
                                        →
                                      </span>
                                      <span className="hidden sm:inline">
                                        {t("cardViewProduct")} →
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
