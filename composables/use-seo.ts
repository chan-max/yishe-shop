/**
 * SEO 相关的 composable
 * 用于统一管理页面的 SEO 配置
 */

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  structuredData?: Record<string, any>
}

/**
 * 设置页面 SEO
 * @param config SEO 配置
 */
export function usePageSEO(config: SEOConfig) {
  const siteUrl = 'https://1s.design'
  const defaultImage = `${siteUrl}/logo/logo.svg`
  
  const title = config.title || '衣设服装设计 - 创意印花图案与服装设计平台'
  const description = config.description || '衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。'
  const image = config.image || defaultImage
  const url = config.url || siteUrl
  const type = config.type || 'website'
  
  // 设置 SEO Meta
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: type,
    ogSiteName: '衣设服装设计',
    ogLocale: 'zh_CN',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    keywords: config.keywords,
    author: config.author || '衣设设计团队',
    ...(config.publishedTime && { articlePublishedTime: config.publishedTime }),
    ...(config.modifiedTime && { articleModifiedTime: config.modifiedTime }),
  })
  
  // 设置 canonical URL
  useHead({
    link: [
      { rel: 'canonical', href: url },
    ],
  })
  
  // 添加结构化数据（JSON-LD）
  if (config.structuredData) {
    // 如果 structuredData 是数组，使用 @graph 包装
    const structuredDataToUse = Array.isArray(config.structuredData)
      ? { '@context': 'https://schema.org', '@graph': config.structuredData }
      : config.structuredData
    
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(structuredDataToUse),
        },
      ],
    })
  }
}

/**
 * 生成网站结构化数据
 */
export function useWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '衣设服装设计',
    alternateName: '1s design',
    url: 'https://1s.design',
    description: '衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。',
    inLanguage: 'zh-CN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://1s.design/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * 生成组织结构化数据
 */
export function useOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '衣设服装设计',
    alternateName: '1s design',
    url: 'https://1s.design',
    logo: 'https://1s.design/logo/logo.svg',
    description: '专注于创意印花图案和服装设计的专业平台',
    sameAs: [
      // 可以添加社交媒体链接
      // 'https://weibo.com/...',
      // 'https://www.zhihu.com/...',
    ],
  }
}

/**
 * 生成产品结构化数据
 */
export function useProductStructuredData(product: {
  name: string
  description: string
  image: string
  url: string
  price?: number
  currency?: string
  availability?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    url: product.url,
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency || 'CNY',
        availability: product.availability || 'https://schema.org/InStock',
      },
    }),
    ...(product.category && { category: product.category }),
  }
}

/**
 * 生成文章结构化数据
 */
export function useArticleStructuredData(article: {
  headline: string
  description: string
  image: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author || '衣设设计团队',
    },
    publisher: {
      '@type': 'Organization',
      name: '衣设服装设计',
      logo: {
        '@type': 'ImageObject',
        url: 'https://1s.design/logo/logo.svg',
      },
    },
  }
}

