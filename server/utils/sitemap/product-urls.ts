import type { ProductSitemapItem, SitemapUrl } from "./types";
import { toAbsoluteUrl, toIsoDate } from "./url-utils";
import { getProductPath } from "~/utils/product-url.ts";
import { isPublishedProduct } from "~/utils/product-indexing.ts";

export const buildProductSitemapUrls = (
  products: ProductSitemapItem[],
  now = new Date().toISOString(),
) =>
  products
    .filter(isPublishedProduct)
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
        loc: getProductPath(product),
        lastmod: toIsoDate(product.updateTime || product.createTime) || now,
        changefreq: "weekly",
        priority: 0.9,
        ...(images.length ? { images } : {}),
      };
    });
