import type { ProductSitemapItem, SitemapUrl } from "./types";
import { toIsoDate } from "./url-utils";

const SEARCH_KEYWORD_LIMIT = 120;
const MIN_KEYWORD_LENGTH = 2;
const MAX_KEYWORD_LENGTH = 32;

const splitKeywordText = (value?: string) =>
  String(value || "")
    .split(/[,，、;；\n\r\t|/]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeKeyword = (value?: string) => {
  const keyword = String(value || "")
    .trim()
    .replace(/\s+/g, " ");

  if (
    keyword.length < MIN_KEYWORD_LENGTH ||
    keyword.length > MAX_KEYWORD_LENGTH ||
    /^https?:\/\//i.test(keyword) ||
    /^[0-9a-f-]{24,}$/i.test(keyword)
  ) {
    return "";
  }

  return keyword;
};

export const buildSearchSitemapUrls = (
  products: ProductSitemapItem[],
  now = new Date().toISOString(),
) => {
  const keywordMap = new Map<string, { count: number; lastmod: string }>();

  for (const product of products) {
    if (!product.id || product.isPublish === false || product.isActive === false) {
      continue;
    }

    const lastmod = toIsoDate(product.updateTime || product.createTime) || now;
    const keywordCandidates = [
      product.type,
      ...splitKeywordText(product.tags),
      ...splitKeywordText(product.keywords),
      ...splitKeywordText(product.searchKeywords),
    ];

    for (const candidate of keywordCandidates) {
      const keyword = normalizeKeyword(candidate);
      if (!keyword) continue;

      const current = keywordMap.get(keyword);
      keywordMap.set(keyword, {
        count: (current?.count || 0) + 1,
        lastmod:
          current && current.lastmod > lastmod ? current.lastmod : lastmod,
      });
    }
  }

  return Array.from(keywordMap.entries())
    .sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]))
    .slice(0, SEARCH_KEYWORD_LIMIT)
    .map<SitemapUrl>(([keyword, meta]) => ({
      loc: `/products/${keyword}`,
      lastmod: meta.lastmod,
      changefreq: "weekly",
      priority: meta.count >= 3 ? 0.76 : 0.68,
    }));
};
