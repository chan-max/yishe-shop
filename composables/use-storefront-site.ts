import type { SiteDefinition } from "~/sites";

export const useStorefrontSite = () =>
  useAppConfig().site as SiteDefinition;
