export default {
  brand: '墙面艺术馆',
  emoji: '🖼️',
  seo: {
    title: '墙面艺术馆 · 家庭装饰画与现代墙面艺术定制平台',
    description: '墙面艺术馆专注于家庭装饰画、现代墙面艺术与个性创意挂画定制服务，为每一面墙注入艺术灵魂。',
    ogTitle: '墙面艺术馆 · 家庭装饰画与现代墙面艺术定制',
    ogDescription: '为每一面墙注入艺术灵魂，现代装饰画与创意挂画专属定制。',
    keywords: '装饰画定制, 墙面艺术, 客厅挂画, 现代艺术画, 创意装饰',
  },
  nav: [
    { label: '首页', to: '/' },
    { label: '全部装饰画', to: '/search' },
    { label: '客厅', to: '/search?type=客厅' },
    { label: '卧室', to: '/search?type=卧室' },
    { label: '联系我们', to: '/contact' },
  ],
  hero: {
    eyebrow: 'WALL ART · CONTEMPORARY LIVING',
    title: '为每一面墙注入艺术灵魂',
    desc: '现代装饰画、抽象艺术与创意挂画定制。从客厅到卧室，从办公室到咖啡馆，让空间讲述你的故事。',
    cta: '探索装饰画',
  },
  categories: [
    { name: '客厅', slug: '客厅' },
    { name: '卧室', slug: '卧室' },
    { name: '办公室', slug: '办公室' },
    { name: '咖啡馆', slug: '咖啡馆' },
    { name: '餐厅', slug: '餐厅' },
    { name: '儿童房', slug: '儿童房' },
  ],
  footer: {
    desc: '专注于家庭装饰画、现代墙面艺术与创意挂画定制服务，为每一面墙注入艺术灵魂。',
    cols: [
      { title: '快速链接', links: [{ label: '新品到货', to: '/search' }, { label: '客厅装饰', to: '/search?type=客厅' }, { label: '卧室装饰', to: '/search?type=卧室' }] },
      { title: '客户服务', links: [{ label: '帮助中心', to: '/contact' }, { label: '配送信息', to: '/contact' }, { label: '退换政策', to: '/contact' }] },
      { title: '关于我们', links: [{ label: '品牌故事', to: '/about' }, { label: '艺术家入驻', to: '/about' }] },
    ],
  },
}
