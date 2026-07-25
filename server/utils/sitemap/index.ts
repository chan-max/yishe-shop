import { buildStaticSitemapUrls } from "./static-routes";
import {
  PRODUCT_SITEMAP_CHUNK_SIZE,
  fetchPublishedProductSitemapPage,
} from "./product-source";
import { buildProductSitemapUrls } from "./product-urls";

const CATEGORY_SLUGS = [
  "tshirt",
  "hoodie",
  "mousepad",
  "badge",
  "blanket",
  "poster",
  "pillow",
  "cup",
  "apron",
  "socks",
  "tote",
  "puzzle",
  "phonecase",
  "springfestival",
];

export const buildSitemapUrls = async () => {
  const now = new Date().toISOString();

  // 1. 静态主路由
  const staticUrls = buildStaticSitemapUrls(now);

  // 2. 动态分类与关键词 SEO 路由 (如 /products/mousepad, /products/tshirt 等)
  const categoryUrls = CATEGORY_SLUGS.map((slug) => ({
    loc: `/products/${slug}`,
    lastmod: now,
    changefreq: "weekly",
    priority: 0.85,
  }));

  // 3. 动态全量商品详情页 SEO 路由 (覆盖数据库所有已上架商品)
  let productUrls: any[] = [];
  try {
    let page = 1;
    const pageSize = PRODUCT_SITEMAP_CHUNK_SIZE;
    let hasMore = true;

    while (hasMore && page <= 50) { // 最高支持 50,000 条商品全量索引
      const { products, total } = await fetchPublishedProductSitemapPage(page, pageSize, true);
      if (Array.isArray(products) && products.length > 0) {
        const mapped = buildProductSitemapUrls(products, now);
        productUrls.push(...mapped);
        
        if (total && productUrls.length >= total) {
          hasMore = false;
        } else if (products.length < pageSize) {
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false;
      }
    }
  } catch (error) {
    console.warn("[Sitemap] Product fetch error:", error);
  }

  return [...staticUrls, ...categoryUrls, ...productUrls];
};
