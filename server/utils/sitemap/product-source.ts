import type {
  ProductSitemapItem,
  ProductSitemapPageResponse,
} from "./types";

export const PRODUCT_SITEMAP_CHUNK_SIZE = 5000;

export const fetchPublishedProductSitemapPage = async (
  requestedPage = 1,
  requestedPageSize = PRODUCT_SITEMAP_CHUNK_SIZE,
  includeTotal = false,
) => {
  const config = useRuntimeConfig();
  const apiBase = String(config.public.apiBase || "").replace(/\/$/, "");
  const openApiKey = String(config.public.openApiKey || "");
  const page = Math.max(1, Math.trunc(Number(requestedPage) || 1));
  const pageSize = Math.min(
    PRODUCT_SITEMAP_CHUNK_SIZE,
    Math.max(
      1,
      Math.trunc(Number(requestedPageSize) || PRODUCT_SITEMAP_CHUNK_SIZE),
    ),
  );

  if (!apiBase || !openApiKey) {
    throw new Error("[Sitemap] Missing apiBase or openApiKey");
  }

  const response = await $fetch<ProductSitemapPageResponse>(
    `${apiBase}/product/sitemap-page`,
    {
      method: "POST",
      headers: {
        "x-open-api-key": openApiKey,
      },
      body: {
        page,
        pageSize,
        includeTotal,
      },
      retry: 2,
      timeout: 15000,
    },
  );

  const data = response?.data;
  if (!data) {
    throw new Error(`[Sitemap] Invalid product page response for page ${page}`);
  }

  return {
    products: (data.list || []) as ProductSitemapItem[],
    total:
      typeof data.total === "number"
        ? Math.max(0, Number(data.total))
        : undefined,
    page: Math.max(1, Number(data.page || page)),
    pageSize: Math.max(1, Number(data.pageSize || pageSize)),
  };
};
