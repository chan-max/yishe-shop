import type { ProductListResponse, ProductSitemapItem } from "./types";

const PRODUCT_SITEMAP_PAGE_SIZE = 500;
const PRODUCT_SITEMAP_MAX_PAGES = 100;

export const fetchPublishedProductsForSitemap = async () => {
  const config = useRuntimeConfig();
  const apiBase = String(config.public.apiBase || "").replace(/\/$/, "");
  const openApiKey = String(config.public.openApiKey || "");
  const products: ProductSitemapItem[] = [];

  if (!apiBase || !openApiKey) {
    return products;
  }

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
      retry: 1,
      timeout: 12000,
    });

    const list = response?.data?.list || [];
    products.push(...list);

    const total = Number(response?.data?.total || 0);
    if (!list.length || products.length >= total) {
      break;
    }
  }

  return products;
};
