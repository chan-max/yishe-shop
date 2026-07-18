/**
 * SEO 相关的 composable
 * 用于统一管理页面的 SEO 配置
 */
import {
  SITE_AUTHOR,
  SITE_DEFAULT_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_LOGO,
  SITE_NAME,
  SITE_OG_NAME,
  SITE_OG_LOCALE,
  SITE_ORGANIZATION_NAME,
  SITE_ROBOTS,
  SITE_SEARCH_URL_TEMPLATE,
  SITE_URL,
} from "~/utils/seo";
import { serializeStructuredData } from "~/utils/structured-data";

type StructuredDataNode = Record<string, any>;

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  structuredData?: StructuredDataNode | StructuredDataNode[];
}

/**
 * 设置页面 SEO
 * @param config SEO 配置
 */
export function usePageSEO(config: SEOConfig) {
  const route = useRoute();
  const title = config.title || SITE_NAME;
  const description = config.description || SITE_DESCRIPTION;
  const image = config.image || SITE_DEFAULT_IMAGE;
  const url =
    config.url ||
    new URL(route.fullPath || route.path || "/", SITE_URL).toString();
  const type = config.type || "website";
  const keywords = config.keywords || SITE_KEYWORDS;

  // 设置 SEO Meta
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: type,
    ogSiteName: SITE_OG_NAME,
    ogLocale: SITE_OG_LOCALE,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    keywords,
    author: config.author || SITE_AUTHOR,
    robots: SITE_ROBOTS,
    ...(config.publishedTime && { articlePublishedTime: config.publishedTime }),
    ...(config.modifiedTime && { articleModifiedTime: config.modifiedTime }),
  });

  // 设置 canonical URL
  useHead({
    link: [{ rel: "canonical", href: url }],
  });

  // 添加结构化数据（JSON-LD）
  if (config.structuredData) {
    const structuredDataToUse = Array.isArray(config.structuredData)
      ? {
          "@context": "https://schema.org",
          "@graph": config.structuredData.map((item) => {
            if (!item || typeof item !== "object" || Array.isArray(item))
              return item;
            const { ["@context"]: _context, ...rest } = item;
            return rest;
          }),
        }
      : config.structuredData;

    useHead({
      script: [
        {
          type: "application/ld+json",
          innerHTML: serializeStructuredData(structuredDataToUse),
        },
      ],
    });
  }
}

/**
 * 生成网站结构化数据
 */
export function useWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_ORGANIZATION_NAME,
    alternateName: SITE_OG_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LOCALE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: SITE_SEARCH_URL_TEMPLATE,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * 生成组织结构化数据
 */
export function useOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_ORGANIZATION_NAME,
    alternateName: SITE_OG_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    description: SITE_DESCRIPTION,
    sameAs: [
      // 可以添加社交媒体链接
      // 'https://weibo.com/...',
      // 'https://www.zhihu.com/...',
    ],
  };
}

/**
 * 生成产品结构化数据
 */
export function useProductStructuredData(product: {
  name: string;
  description: string;
  image: string | string[];
  url: string;
  price?: number;
  currency?: string;
  availability?: string;
  category?: string;
  sku?: string;
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    ...(product.sku && { sku: product.sku }),
    ...(product.brand && {
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
    }),
    ...(product.price && {
      offers: {
        "@type": "Offer",
        url: product.url,
        price: product.price,
        priceCurrency: product.currency || "CNY",
        availability: product.availability || "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    }),
    ...(product.category && { category: product.category }),
  };
}

/**
 * 生成面包屑结构化数据
 */
export function useBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * 生成 ItemList 结构化数据（用于列表页，指向详情页）
 */
export function useItemListStructuredData(items: Array<{
  name: string;
  url: string;
  image?: string;
  position?: number;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: item.position || index + 1,
      url: item.url,
      name: item.name,
      ...(item.image && {
        image: item.image,
      }),
    })),
  };
}

/**
 * 生成文章结构化数据
 */
export function useArticleStructuredData(article: {
  headline: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author || SITE_AUTHOR,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_ORGANIZATION_NAME,
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO,
      },
    },
  };
}
