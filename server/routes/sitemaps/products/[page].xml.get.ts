import {
  PRODUCT_SITEMAP_CHUNK_SIZE,
  fetchPublishedProductSitemapPage,
} from "~/server/utils/sitemap/product-source";
import { buildProductSitemapUrls } from "~/server/utils/sitemap/product-urls";
import { renderSitemapUrlSetXml } from "~/server/utils/sitemap/xml";

const SITEMAP_CACHE_SECONDS = 600;

export default defineCachedEventHandler(
  async (event) => {
    const page = Number(getRouterParam(event, "page"));
    if (!Number.isInteger(page) || page < 1) {
      throw createError({ statusCode: 404, statusMessage: "Sitemap not found" });
    }

    const result = await fetchPublishedProductSitemapPage(
      page,
      PRODUCT_SITEMAP_CHUNK_SIZE,
    );

    const urls = buildProductSitemapUrls(result.products);
    setResponseHeader(event, "Content-Type", "application/xml; charset=UTF-8");
    setResponseHeader(
      event,
      "Cache-Control",
      `public, max-age=0, s-maxage=${SITEMAP_CACHE_SECONDS}, stale-while-revalidate=60`,
    );

    return renderSitemapUrlSetXml(urls);
  },
  {
    name: "product-sitemap-chunk",
    maxAge: SITEMAP_CACHE_SECONDS,
    swr: true,
    staleMaxAge: 3600,
    getKey: (event) => getRequestURL(event).pathname,
  },
);
