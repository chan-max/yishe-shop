import { yisheSiteConfig } from "./yishe/site.config";

export const siteRegistry = {
  yishe: yisheSiteConfig,
};

export type SiteId = keyof typeof siteRegistry;

// Keep selection build-time so each deployment produces one explicit brand
// bundle. A new storefront only needs registration above and one active entry.
export const activeSiteConfig = siteRegistry.yishe;

export type { SiteDefinition } from "./types";
