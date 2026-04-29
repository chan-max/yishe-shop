import type { ProductListResponse, ProductSitemapItem } from "./types";

const PRODUCT_SITEMAP_PAGE_SIZE = 500;
const PRODUCT_SITEMAP_MAX_PAGES = 100;

export const fetchPublishedProductsForSitemap = async () => {
  const config = useRuntimeConfig();
  const apiBase = String(config.public.apiBase || "").replace(/\/$/, "");
  const openApiKey = String(config.public.openApiKey || "");
  const products: ProductSitemapItem[] = [];

  if (!apiBase || !openApiKey) {
    console.warn("[Sitemap] Missing apiBase or openApiKey, skipping product fetch");
    return products;
  }

  try {
    for (let page = 1; page <= PRODUCT_SITEMAP_MAX_PAGES; page += 1) {
      const response = await $fetch<ProductListResponse>(`${apiBase}/product/page`, {
        method: "POST",
        headers: {
          "x-open-api-key": openApiKey,
        },
        body: {
          page,
          pageSize: PRODUCT_SITEMAP_PAGE_SIZE,
          isPublish: true,
          includeRelations: false,
        },
        retry: 2,
        timeout: 15000,
      }).catch((err) => {
        console.error(`[Sitemap] Failed to fetch page ${page}:`, err.message);
        return null;
      });

      if (!response) break;

      const list = response?.data?.list || [];
      products.push(...list);

      const total = Number(response?.data?.total || 0);
      if (!list.length || products.length >= total) {
        break;
      }
    }

    console.log(`[Sitemap] Fetched ${products.length} products from API`);
  } catch (error) {
    console.error("[Sitemap] Error fetching products:", error);
  }

  return products;
};
