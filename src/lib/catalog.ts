import { PRODUCT_EXTRAS } from "@/data/catalog-product-extras.gen";

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
      en: "Food Products",
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
          { en: "Sunflower Oil", fr: "Huile de tournesol" },
          { en: "Soybean Oil", fr: "Huile de soja" },
          { en: "Olive Oil", fr: "Huile d’olive" },
        ],
      },
      {
        id: "flour-bakery",
        title: {
          en: "Flour & Bakery Products",
          fr: "Farine et produits de boulangerie",
        },
        items: [
          { en: "Wheat Flour", fr: "Farine de blé" },
          { en: "Rusks & Dry Bread", fr: "Biscottes et pain sec" },
          { en: "Bakery Products", fr: "Produits de boulangerie" },
        ],
      },
      {
        id: "grains-cereals",
        title: { en: "Grains & Cereals", fr: "Céréales et grains" },
        items: [
          { en: "Buckwheat", fr: "Sarrasin" },
          { en: "Pearl Barley", fr: "Orge perlé" },
          {
            en: "Other Cereals (On Request)",
            fr: "Autres céréales (sur demande)",
          },
        ],
      },
      {
        id: "canned",
        title: {
          en: "Canned & Preserved Vegetables",
          fr: "Légumes en conserve et marinés",
        },
        items: [
          { en: "Pickled Cucumbers", fr: "Concombres marinés" },
          { en: "Canned Tomatoes", fr: "Tomates en conserve" },
          {
            en: "Vegetable Mixes & Appetizers (Lecho, Salads, Spreads)",
            fr: "Mélanges de légumes et apéritifs (lecho, salades, tartinables)",
          },
        ],
      },
      {
        id: "honey-jams-nuts",
        title: {
          en: "Honey, Jams & Nuts",
          fr: "Miel, confitures et noix",
        },
        items: [
          { en: "Natural Honey", fr: "Miel naturel" },
          { en: "Fruit Jams & Preserves", fr: "Confitures et fruits au sirop" },
          {
            en: "Nuts (Almonds, Hazelnuts, Mixes)",
            fr: "Noix (amandes, noisettes, mélanges)",
          },
        ],
      },
      {
        id: "fresh-fruits",
        title: { en: "Fresh Fruits", fr: "Fruits frais" },
        items: [
          { en: "Bananas", fr: "Bananes" },
          { en: "Oranges", fr: "Oranges" },
          {
            en: "Mandarins / Clementines",
            fr: "Mandarines / clémentines",
          },
          {
            en: "Seasonal Fruits (On Request)",
            fr: "Fruits de saison (sur demande)",
          },
        ],
      },
      {
        id: "juices-drinks",
        title: { en: "Juices & Drinks", fr: "Jus et boissons" },
        items: [
          { en: "Fruit Juices", fr: "Jus de fruits" },
          { en: "Carbonated Drinks", fr: "Boissons gazeuses" },
          {
            en: "Vitamin / Functional Drinks",
            fr: "Boissons vitaminées / fonctionnelles",
          },
          { en: "Protein Drinks", fr: "Boissons protéinées" },
        ],
      },
    ],
  },
  {
    id: "feed",
    slug: "feed",
    name: {
      en: "Feed Products",
      fr: "Alimentation animale",
    },
    description: {
      en: "We supply feed ingredients, energy components (oils & fats), and custom feed blends tailored to customer specifications.",
      fr: "Nous fournissons des ingrédients pour l’alimentation animale, des composants énergétiques (huiles et matières grasses) et des mélanges sur mesure adaptés aux besoins des clients.",
    },
    groups: [
      {
        id: "soybean-cake",
        title: { en: "Soybean Cake", fr: "Gâteau de soja" },
        items: [{ en: "Soybean Cake", fr: "Gâteau de soja" }],
      },
      {
        id: "sunflower-meal",
        title: {
          en: "Sunflower Meal (Cake)",
          fr: "Tournesol, tourteau (gâteau)",
        },
        items: [
          {
            en: "Sunflower Meal (Cake)",
            fr: "Tourteau de tournesol (gâteau)",
          },
        ],
      },
      {
        id: "feed-grains",
        title: { en: "Feed Grains", fr: "Céréales pour alimentation animale" },
        items: [
          {
            en: "Feed Grains",
            fr: "Céréales pour alimentation animale",
          },
        ],
      },
      {
        id: "custom-blends",
        title: { en: "Custom Feed Blends", fr: "Mélanges sur mesure" },
        items: [
          {
            en: "Custom Feed Blends",
            fr: "Mélanges d’aliments sur mesure",
          },
        ],
      },
      {
        id: "feed-oils-fats",
        title: {
          en: "Feed-Grade Oils & Fats",
          fr: "Huiles et matières grasses pour alimentation animale",
        },
        items: [
          { en: "Animal Fat (Tallow)", fr: "Graisse animale (suif)" },
          { en: "Poultry Fat", fr: "Graisse avicole" },
          { en: "Vegetable Oils", fr: "Huiles végétales" },
        ],
      },
    ],
  },
  {
    id: "export",
    slug: "export",
    name: {
      en: "Export Products",
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
          en: "Agricultural Commodities",
          fr: "Produits agricoles de base",
        },
        items: [
          { en: "Canola Oil", fr: "Huile de canola" },
          { en: "Lentils", fr: "Lentilles" },
          { en: "Peas", fr: "Pois" },
        ],
      },
      {
        id: "special-crops",
        title: { en: "Special Crops", fr: "Cultures spéciales" },
        items: [{ en: "Hops", fr: "Houblon" }],
      },
      {
        id: "wood",
        title: {
          en: "Industrial & Wood Products",
          fr: "Produits industriels et bois",
        },
        items: [
          { en: "Lumber", fr: "Bois de sciage" },
          { en: "Wood Pellets", fr: "Granulés de bois" },
          { en: "Logs", fr: "Grumes" },
          { en: "Wood Pulp (BSKP / BHKP)", fr: "Pâte à bois (BSKP / BHKP)" },
        ],
      },
      {
        id: "fertilizers",
        title: {
          en: "Fertilizers & Crop Nutrition",
          fr: "Engrais et nutrition des cultures",
        },
        items: [
          { en: "Potash Fertilizers", fr: "Engrais potassiques" },
          { en: "Nitrogen Fertilizers", fr: "Engrais azotés" },
          { en: "Phosphate Fertilizers", fr: "Engrais phosphatés" },
          {
            en: "Compound Fertilizers (Custom NPK Blends)",
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
  /** Sourcing origin(s), CMS-managed and informational. */
  countryOfOrigin?: Localized;
  /**
   * Informational packaging / format chips from the CMS. Distinct from
   * `variationOptions`, which drive quote selection. When both exist (e.g.
   * Salt), the page uses `variationOptions` and ignores `displayFormats`.
   */
  displayFormats?: Localized[];
};

export function slugifyPart(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function withExtras(item: QuoteableItem): QuoteableItem {
  const extras = PRODUCT_EXTRAS[item.id];
  if (!extras) return item;
  // When variationOptions drive quoting (e.g. Salt), suppress displayFormats
  // to avoid duplicating the same chips in the UI.
  const displayFormats = item.variationOptions?.length
    ? undefined
    : extras.displayFormats;
  return {
    ...item,
    countryOfOrigin: extras.countryOfOrigin,
    displayFormats,
  };
}

function buildQuoteableItems(): QuoteableItem[] {
  const out: QuoteableItem[] = [];
  for (const cat of CATEGORIES) {
    for (const g of cat.groups) {
      if (g.variations?.length) {
        if (g.quoteAsSingleProduct) {
          out.push(
            withExtras({
              id: `${cat.slug}-${g.id}`,
              categorySlug: cat.slug,
              categoryName: cat.name,
              groupId: g.id,
              groupTitle: g.title,
              lineLabel: g.title,
              variationOptions: g.variations,
            })
          );
          continue;
        }
        for (const v of g.variations) {
          out.push(
            withExtras({
              id: `${cat.slug}-${g.id}-${v.id}`,
              categorySlug: cat.slug,
              categoryName: cat.name,
              groupId: g.id,
              groupTitle: g.title,
              lineLabel: {
                en: v.label.en,
                fr: v.label.fr,
              },
            })
          );
        }
        continue;
      }
      if (g.items?.length) {
        for (const item of g.items) {
          const part = slugifyPart(item.en);
          out.push(
            withExtras({
              id: `${cat.slug}-${g.id}-${part}`,
              categorySlug: cat.slug,
              categoryName: cat.name,
              groupId: g.id,
              groupTitle: g.title,
              lineLabel: {
                en: item.en,
                fr: item.fr,
              },
            })
          );
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
