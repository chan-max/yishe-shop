import { buildStaticSitemapUrls } from "./static-routes";

export const buildSitemapUrls = async () => {
  const now = new Date().toISOString();
  return buildStaticSitemapUrls(now);
};
