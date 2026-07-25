import { buildStaticSitemapUrls } from "./static-routes";
import {
  PRODUCT_SITEMAP_CHUNK_SIZE,
  fetchPublishedProductSitemapPage,
} from "./product-source";
import { buildProductSitemapUrls } from "./product-urls";

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

  // 1. 静态主路由
  const staticUrls = buildStaticSitemapUrls(now);

  // 2. 动态收集全量商品的品类与关键词Set
  const dynamicKeywordsSet = new Set<string>(DEFAULT_CATEGORY_SLUGS);

  // 3. 动态全量商品详情页 SEO 路由 (覆盖数据库所有已上架商品)
  let productUrls: any[] = [];
  try {
    let page = 1;
    const pageSize = PRODUCT_SITEMAP_CHUNK_SIZE;
    let hasMore = true;

    while (hasMore && page <= 50) { // 最高支持 50,000 条商品全量索引
      const { products, total } = await fetchPublishedProductSitemapPage(page, pageSize, true);
      if (Array.isArray(products) && products.length > 0) {
        // 提取商品中的真实品类 type 和关键词 keywords / tags
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

  // 4. 构建全量动态分类/关键词 SEO 路由 (如 /products/mousepad, /products/帆布包)
  const categoryUrls = Array.from(dynamicKeywordsSet).map((slug) => ({
    loc: `/products/${encodeURIComponent(slug)}`,
    lastmod: now,
    changefreq: "weekly",
    priority: 0.85,
  }));

  return [...staticUrls, ...categoryUrls, ...productUrls];
};
