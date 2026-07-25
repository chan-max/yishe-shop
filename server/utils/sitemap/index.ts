import { buildStaticSitemapUrls } from "./static-routes";
import { fetchPublishedProductSitemapPage } from "./product-source";
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

  // 3. 动态商品详情页 SEO 路由 (如 /product/123)
  let productUrls: any[] = [];
  try {
    const { products } = await fetchPublishedProductSitemapPage(1, 1000);
    if (Array.isArray(products) && products.length > 0) {
      productUrls = buildProductSitemapUrls(products, now);
    }
  } catch (error) {
    console.warn("[Sitemap] Product fetch skipped:", error);
  }

  return [...staticUrls, ...categoryUrls, ...productUrls];
};
