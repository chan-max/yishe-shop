import { fetchPublishedProductsForSitemap } from "./product-source";
import { buildProductSitemapUrls } from "./product-urls";
import { buildSearchSitemapUrls } from "./search-urls";
import { buildStaticSitemapUrls } from "./static-routes";

export const buildSitemapUrls = async () => {
  const now = new Date().toISOString();
  const products = await fetchPublishedProductsForSitemap();

  return [
    ...buildStaticSitemapUrls(now),
    ...buildSearchSitemapUrls(products, now),
    ...buildProductSitemapUrls(products, now),
  ];
};
