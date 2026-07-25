import { buildStaticSitemapUrls } from "./static-routes";
import {
  PRODUCT_SITEMAP_CHUNK_SIZE,
  fetchPublishedProductSitemapPage,
} from "./product-source";

// 默认常用品类保底列表
const DEFAULT_CATEGORY_SLUGS = [
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

  // 1. 静态主路由 (包含 /about, /pricing, /contact 等)
  const staticUrls = buildStaticSitemapUrls(now);

  // 2. 动态收集商品分类与关键词 Set
  const dynamicKeywordsSet = new Set<string>(DEFAULT_CATEGORY_SLUGS);

  try {
    // 快速抽样第 1 页商品用于提取动态品类和 Tag，无需一次性加载全量商品
    const { products } = await fetchPublishedProductSitemapPage(1, 200, false);
    if (Array.isArray(products) && products.length > 0) {
      for (const product of products) {
        if (product.type) {
          dynamicKeywordsSet.add(product.type.trim().toLowerCase());
        }
        if (product.keywords) {
          product.keywords.split(/[,，\s]+/).forEach((k) => {
            const kw = k.trim().toLowerCase();
            if (kw && kw.length >= 2) dynamicKeywordsSet.add(kw);
          });
        }
      }
    }
  } catch (error) {
    console.warn("[Sitemap] Category keywords extraction skipped:", error);
  }

  // 3. 构建全量动态分类/关键词 SEO 路由 (如 /products/mousepad, /products/地毯)
  const categoryUrls = Array.from(dynamicKeywordsSet).map((slug) => {
    let unencoded = slug;
    try {
      unencoded = decodeURIComponent(slug);
    } catch {
      unencoded = slug;
    }
    return {
      loc: `/products/${unencoded}`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.85,
    };
  });

  // 注：所有具体的商品详情页 (/product/:id) 均由 /sitemaps/products/[page].xml 自动分页切块分发，
  // 确保单次 XML 响应体积 < 800KB，绝不导致数据库卡顿或内存过大！
  return [...staticUrls, ...categoryUrls];
};
