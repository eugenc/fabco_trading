export type Localized = { en: string; fr: string };

export type CatalogGroup = {
  id: string;
  title: Localized;
  /** Optional longer description under the group */
  note?: Localized;
  /** Simple bullet list — each becomes a quote line */
  items?: Localized[];
  /** Named variants (e.g. pack sizes) */
  variations?: { id: string; label: Localized }[];
  /**
   * When true with `variations` only: one quote product; user picks pack size separately.
   * (Otherwise each variation becomes its own quote line.)
   */
  quoteAsSingleProduct?: boolean;
};

export type CatalogCategory = {
  id: string;
  slug: string;
  name: Localized;
  description: Localized;
  groups: CatalogGroup[];
};

export const CATEGORIES: CatalogCategory[] = [
  {
    id: "food",
    slug: "food",
    name: {
      en: "Food products",
      fr: "Produits alimentaires",
    },
    description: {
      en: "B2B food lines sourced for supermarkets, distributors, and industrial buyers.",
      fr: "Gammes alimentaires B2B pour supermarchés, distributeurs et acheteurs industriels.",
    },
    groups: [
      {
        id: "sugar",
        title: { en: "Sugar", fr: "Sucre" },
        items: [{ en: "Sugar", fr: "Sucre" }],
      },
      {
        id: "salt",
        title: { en: "Salt", fr: "Sel" },
        quoteAsSingleProduct: true,
        variations: [
          { id: "salt-1kg", label: { en: "1 kg", fr: "1 kg" } },
          { id: "salt-25kg", label: { en: "25 kg", fr: "25 kg" } },
        ],
      },
      {
        id: "rice",
        title: { en: "Rice", fr: "Riz" },
        items: [{ en: "Rice", fr: "Riz" }],
      },
      {
        id: "oils",
        title: { en: "Oils", fr: "Huiles" },
        items: [
          { en: "Sunflower oil", fr: "Huile de tournesol" },
          { en: "Soybean oil", fr: "Huile de soja" },
          { en: "Olive oil", fr: "Huile d’olive" },
        ],
      },
      {
        id: "flour-bakery",
        title: {
          en: "Flour & bakery products",
          fr: "Farine et produits de boulangerie",
        },
        items: [
          { en: "Wheat flour", fr: "Farine de blé" },
          { en: "Rusks & dry bread", fr: "Biscottes et pain sec" },
          { en: "Bakery products", fr: "Produits de boulangerie" },
        ],
      },
      {
        id: "grains-cereals",
        title: { en: "Grains & cereals", fr: "Céréales et grains" },
        items: [
          { en: "Buckwheat", fr: "Sarrasin" },
          { en: "Pearl barley", fr: "Orge perlé" },
          {
            en: "Other cereals (on request)",
            fr: "Autres céréales (sur demande)",
          },
        ],
      },
      {
        id: "canned",
        title: {
          en: "Canned & preserved vegetables",
          fr: "Légumes en conserve et marinés",
        },
        items: [
          { en: "Pickled cucumbers", fr: "Concombres marinés" },
          { en: "Canned tomatoes", fr: "Tomates en conserve" },
          {
            en: "Vegetable mixes & appetizers (lecho, salads, spreads)",
            fr: "Mélanges de légumes et apéritifs (lecho, salades, tartinables)",
          },
        ],
      },
      {
        id: "honey-jams-nuts",
        title: {
          en: "Honey, jams & nuts",
          fr: "Miel, confitures et noix",
        },
        items: [
          { en: "Natural honey", fr: "Miel naturel" },
          { en: "Fruit jams & preserves", fr: "Confitures et fruits au sirop" },
          {
            en: "Nuts (almonds, hazelnuts, mixes)",
            fr: "Noix (amandes, noisettes, mélanges)",
          },
        ],
      },
      {
        id: "fresh-fruits",
        title: { en: "Fresh fruits", fr: "Fruits frais" },
        items: [
          { en: "Bananas", fr: "Bananes" },
          { en: "Oranges", fr: "Oranges" },
          {
            en: "Mandarins / clementines",
            fr: "Mandarines / clémentines",
          },
          {
            en: "Seasonal fruits (on request)",
            fr: "Fruits de saison (sur demande)",
          },
        ],
      },
      {
        id: "juices-drinks",
        title: { en: "Juices & drinks", fr: "Jus et boissons" },
        items: [
          { en: "Fruit juices", fr: "Jus de fruits" },
          { en: "Carbonated drinks", fr: "Boissons gazeuses" },
          {
            en: "Vitamin / functional drinks",
            fr: "Boissons vitaminées / fonctionnelles",
          },
          { en: "Protein drinks", fr: "Boissons protéinées" },
        ],
      },
    ],
  },
  {
    id: "feed",
    slug: "feed",
    name: {
      en: "Feed products",
      fr: "Alimentation animale",
    },
    description: {
      en: "We supply feed ingredients, energy components (oils & fats), and custom feed blends tailored to customer specifications.",
      fr: "Nous fournissons des ingrédients pour l’alimentation animale, des composants énergétiques (huiles et matières grasses) et des mélanges sur mesure adaptés aux besoins des clients.",
    },
    groups: [
      {
        id: "soybean-cake",
        title: { en: "Soybean cake", fr: "Gâteau de soja" },
        items: [{ en: "Soybean cake", fr: "Gâteau de soja" }],
      },
      {
        id: "sunflower-meal",
        title: {
          en: "Sunflower meal (cake)",
          fr: "Tournesol, tourteau (gâteau)",
        },
        items: [
          {
            en: "Sunflower meal (cake)",
            fr: "Tourteau de tournesol (gâteau)",
          },
        ],
      },
      {
        id: "feed-grains",
        title: { en: "Feed grains", fr: "Céréales pour alimentation animale" },
        items: [
          {
            en: "Feed grains",
            fr: "Céréales pour alimentation animale",
          },
        ],
      },
      {
        id: "custom-blends",
        title: { en: "Custom feed blends", fr: "Mélanges sur mesure" },
        items: [
          {
            en: "Custom feed blends",
            fr: "Mélanges d’aliments sur mesure",
          },
        ],
      },
      {
        id: "feed-oils-fats",
        title: {
          en: "Feed-grade oils & fats",
          fr: "Huiles et matières grasses pour alimentation animale",
        },
        items: [
          { en: "Animal fat (tallow)", fr: "Graisse animale (suif)" },
          { en: "Poultry fat", fr: "Graisse avicole" },
          { en: "Vegetable oils", fr: "Huiles végétales" },
        ],
      },
    ],
  },
  {
    id: "export",
    slug: "export",
    name: {
      en: "Export products",
      fr: "Produits d’export",
    },
    description: {
      en: "Export-oriented commodities from Canada and international markets.",
      fr: "Produits d’exportation pour le Canada et les marchés internationaux.",
    },
    groups: [
      {
        id: "ag-commodities",
        title: {
          en: "Agricultural commodities",
          fr: "Produits agricoles de base",
        },
        items: [
          { en: "Canola oil", fr: "Huile de canola" },
          { en: "Lentils", fr: "Lentilles" },
          { en: "Peas", fr: "Pois" },
        ],
      },
      {
        id: "special-crops",
        title: { en: "Special crops", fr: "Cultures spéciales" },
        items: [{ en: "Hops", fr: "Houblon" }],
      },
      {
        id: "wood",
        title: {
          en: "Industrial & wood products",
          fr: "Produits industriels et bois",
        },
        items: [
          { en: "Lumber", fr: "Bois de sciage" },
          { en: "Wood pellets", fr: "Granulés de bois" },
          { en: "Logs", fr: "Grumes" },
          { en: "Wood pulp (BSKP / BHKP)", fr: "Pâte à bois (BSKP / BHKP)" },
        ],
      },
      {
        id: "fertilizers",
        title: {
          en: "Fertilizers & crop nutrition",
          fr: "Engrais et nutrition des cultures",
        },
        note: {
          en: "Potash, nitrogen, and phosphate fertilizers; custom NPK blends tailored to soil and crop requirements.",
          fr: "Engrais potassiques, azotés et phosphatés ; mélanges NPK sur mesure selon les sols et cultures.",
        },
        items: [
          { en: "Potash fertilizers", fr: "Engrais potassiques" },
          { en: "Nitrogen fertilizers", fr: "Engrais azotés" },
          { en: "Phosphate fertilizers", fr: "Engrais phosphatés" },
          {
            en: "Compound fertilizers (custom NPK blends)",
            fr: "Engrais composés (mélanges NPK sur mesure)",
          },
        ],
      },
    ],
  },
];

export type QuoteableItem = {
  id: string;
  categorySlug: string;
  categoryName: Localized;
  groupId: string;
  groupTitle: Localized;
  /** Product name only (category is shown by section heading / breadcrumb). */
  lineLabel: Localized;
  /** If set, user must choose one pack/format for this product */
  variationOptions?: { id: string; label: Localized }[];
};

export function slugifyPart(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function buildQuoteableItems(): QuoteableItem[] {
  const out: QuoteableItem[] = [];
  for (const cat of CATEGORIES) {
    for (const g of cat.groups) {
      if (g.variations?.length) {
        if (g.quoteAsSingleProduct) {
          out.push({
            id: `${cat.slug}-${g.id}`,
            categorySlug: cat.slug,
            categoryName: cat.name,
            groupId: g.id,
            groupTitle: g.title,
            lineLabel: g.title,
            variationOptions: g.variations,
          });
          continue;
        }
        for (const v of g.variations) {
          out.push({
            id: `${cat.slug}-${g.id}-${v.id}`,
            categorySlug: cat.slug,
            categoryName: cat.name,
            groupId: g.id,
            groupTitle: g.title,
            lineLabel: {
              en: v.label.en,
              fr: v.label.fr,
            },
          });
        }
        continue;
      }
      if (g.items?.length) {
        for (const item of g.items) {
          const part = slugifyPart(item.en);
          out.push({
            id: `${cat.slug}-${g.id}-${part}`,
            categorySlug: cat.slug,
            categoryName: cat.name,
            groupId: g.id,
            groupTitle: g.title,
            lineLabel: {
              en: item.en,
              fr: item.fr,
            },
          });
        }
      }
    }
  }
  return out;
}

export const QUOTEABLE_ITEMS: QuoteableItem[] = buildQuoteableItems();

/** Homepage “Best offers” — stable quote line ids from {@link QUOTEABLE_ITEMS} */
export const FEATURED_QUOTE_IDS = [
  "feed-soybean-cake-soybean-cake",
  "food-salt",
  "export-ag-commodities-canola-oil",
] as const;

/** Default pack for featured Salt card (contact form prefill) */
export const FEATURED_SALT_VARIATION_ID = "salt-25kg" as const;

export function getCategoryBySlug(slug: string): CatalogCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getQuoteableItemById(
  id: string
): QuoteableItem | undefined {
  return QUOTEABLE_ITEMS.find((q) => q.id === id);
}

export function getLocalizedLine(
  item: QuoteableItem,
  locale: "en" | "fr"
): string {
  return item.lineLabel[locale];
}

/** Full line for emails (product + selected pack when applicable). */
export function formatQuoteLineLabel(
  item: QuoteableItem,
  locale: "en" | "fr",
  variationId?: string
): string {
  if (item.variationOptions?.length && variationId) {
    const v = item.variationOptions.find((o) => o.id === variationId);
    if (v) {
      return `${item.lineLabel[locale]} — ${v.label[locale]}`;
    }
  }
  return item.lineLabel[locale];
}
