/**
 * Square section images for `/import`, `/export`, and `/logistics` service
 * pages — paired with the `ServiceSection` component.
 *
 * Sources are Unsplash photo IDs already used elsewhere in the catalog so they
 * remain in the configured `next/image` `remotePatterns` allow-list. Cropped to
 * a 600x600 square via Unsplash query params for fast loading.
 */
const w = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=600&q=80`;

export const SERVICE_SECTION_IMAGES = {
  import: {
    food: w("1542838132-92c53300491e"),
    feed: w("1574943320219-553eb213f72d"),
    terms: w("1586528116311-ad8dd3c8310d"),
    logisticsSupport: w("1518709268805-4e9042af9f23"),
  },
  export: {
    ag: w("1625246333195-78d9c38ad449"),
    special: w("1500595046743-cd271d694d30"),
    wood: w("1574323347407-f5e1ad6d020b"),
    fert: w("1500382017468-9049fed747ef"),
    compliance: w("1454165804606-c3d57bc86b40"),
  },
  logistics: {
    cycle: w("1494412574643-ff11b0a5c1c3"),
    incoterms: w("1589939705384-5185137a7f0f"),
    supply: w("1522071820081-009f0129c71c"),
  },
} as const;
