import { SITE_URL } from "~/utils/seo";
import {
  PRODUCT_SITEMAP_CHUNK_SIZE,
  fetchPublishedProductSitemapPage,
} from "~/server/utils/sitemap/product-source";
import {
  getProductSitemapUrl,
  renderSitemapIndexXml,
} from "~/server/utils/sitemap/xml";

const SITEMAP_CACHE_SECONDS = 600;

export default defineCachedEventHandler(
  async (event) => {
    const { total = 0 } = await fetchPublishedProductSitemapPage(1, 1, true);
    const productChunkCount = Math.ceil(total / PRODUCT_SITEMAP_CHUNK_SIZE);
    const entries = [
      { loc: `${SITE_URL}/__sitemap__/pages.xml` },
      ...Array.from({ length: productChunkCount }, (_, index) => ({
        loc: getProductSitemapUrl(index + 1),
      })),
    ];

    setResponseHeader(event, "Content-Type", "application/xml; charset=UTF-8");
    setResponseHeader(
      event,
      "Cache-Control",
      `public, max-age=0, s-maxage=${SITEMAP_CACHE_SECONDS}, stale-while-revalidate=60`,
    );

    return renderSitemapIndexXml(entries);
  },
  {
    name: "product-sitemap-index",
    maxAge: SITEMAP_CACHE_SECONDS,
    swr: true,
    staleMaxAge: 3600,
    getKey: (event) => getRequestURL(event).pathname,
  },
);
