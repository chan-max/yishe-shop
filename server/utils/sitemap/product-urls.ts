import type { ProductSitemapItem, SitemapUrl } from "./types";
import { toAbsoluteUrl, toIsoDate } from "./url-utils";

export const buildProductSitemapUrls = (
  products: ProductSitemapItem[],
  now = new Date().toISOString(),
) =>
  products
    .filter(
      (product) =>
        product.id && product.isPublish !== false && product.isActive !== false,
    )
    .map<SitemapUrl>((product) => {
      const images = (product.images || [])
        .map((image) => toAbsoluteUrl(image))
        .filter(Boolean)
        .slice(0, 3)
        .map((image) => ({
          loc: image,
          title: product.name || product.type || "POD 定制商品",
        }));

      return {
        loc: `/product/${product.id}`,
        lastmod: toIsoDate(product.updateTime || product.createTime) || now,
        changefreq: "weekly",
        priority: 0.82,
        ...(images.length ? { images } : {}),
      };
    });
