export default {
  brand: '厨房设计工坊',
  emoji: '🍳',
  seo: {
    title: '厨房设计工坊 · 创意厨具与厨房用品定制平台',
    description: '厨房设计工坊专注于创意厨具、个性厨房用品与家居烹饪配件定制服务，让厨房也成为艺术空间。',
    ogTitle: '厨房设计工坊 · 创意厨具与厨房用品定制',
    ogDescription: '让厨房也成为艺术空间，创意厨具与个性厨房用品专属定制。',
    keywords: '厨房用品定制, 创意厨具, 围裙定制, 砧板设计, 厨房装饰',
  },
  nav: [
    { label: '首页', to: '/' },
    { label: '全部厨具', to: '/search' },
    { label: '围裙', to: '/search?type=围裙' },
    { label: '砧板', to: '/search?type=砧板' },
    { label: '联系我们', to: '/contact' },
  ],
  hero: {
    eyebrow: '厨房美学 · Kitchen Aesthetics',
    title: '让厨房，成为灵感发生地',
    desc: '从围裙到砧板，从隔热垫到调料罐，每一件厨具都可以是艺术品。探索来自独立设计师的创意厨房用品。',
    cta: '探索厨房好物',
  },
  categories: [
    { name: '围裙', slug: '围裙' },
    { name: '砧板', slug: '砧板' },
    { name: '隔热垫', slug: '隔热垫' },
    { name: '调料罐', slug: '调料罐' },
    { name: '餐垫', slug: '餐垫' },
    { name: '厨房毛巾', slug: '厨房毛巾' },
  ],
  footer: {
    desc: '专注于创意厨具与个性厨房用品定制服务，让每一次烹饪都成为生活的仪式感。',
    cols: [
      { title: '快速链接', links: [{ label: '新品到货', to: '/search' }, { label: '围裙定制', to: '/search?type=围裙' }, { label: '砧板设计', to: '/search?type=砧板' }] },
      { title: '客户服务', links: [{ label: '帮助中心', to: '/contact' }, { label: '配送信息', to: '/contact' }, { label: '退换政策', to: '/contact' }] },
      { title: '关于我们', links: [{ label: '品牌故事', to: '/about' }, { label: '设计师入驻', to: '/about' }] },
    ],
  },
}
