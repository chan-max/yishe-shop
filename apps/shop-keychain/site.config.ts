export default {
  brand: 'KEYCHAIN POP',
  emoji: '🔑',
  seo: {
    title: 'KEYCHAIN POP — 创意钥匙链与个性配件定制平台',
    description: '探索数百款创意钥匙链设计，从可爱卡通到极简几何，从金属质感到底层亚克力。满 ¥99 包邮，每周上新。',
    ogTitle: 'KEYCHAIN POP — 创意钥匙链与个性配件',
    ogDescription: '创意钥匙链与个性配件定制平台。精选亚克力、金属、硅胶、木质等材质。',
    keywords: '创意钥匙链, 个性配件定制, 亚克力钥匙链, 金属钥匙扣, 定制挂件',
  },
  nav: [
    { label: '首页', to: '/' },
    { label: '全部配件', to: '/search' },
    { label: '亚克力', to: '/search?type=亚克力' },
    { label: '金属', to: '/search?type=金属' },
    { label: '联系我们', to: '/contact' },
  ],
  hero: {
    eyebrow: 'KEYCHAIN POP · 创意配件工坊',
    title: '把个性挂在钥匙上',
    desc: '从可爱卡通到极简几何，从金属质感到底层亚克力，每一条钥匙链都是你风格的延伸。探索数百款创意设计，或定制专属于你的那一款。',
    cta: '探索全部配件',
  },
  categories: [
    { name: '亚克力', slug: '亚克力' },
    { name: '金属', slug: '金属' },
    { name: '硅胶', slug: '硅胶' },
    { name: '木质', slug: '木质' },
    { name: '皮革', slug: '皮革' },
    { name: '树脂', slug: '树脂' },
  ],
  footer: {
    desc: '创意钥匙链与个性配件定制。每一件都承载着你的独特风格。',
    cols: [
      { title: '快速链接', links: [{ label: '全部商品', to: '/search' }, { label: '关于我们', to: '/about' }, { label: '联系我们', to: '/contact' }] },
      { title: '客户服务', links: [{ label: '常见问题', to: '/contact' }, { label: '配送说明', to: '/contact' }, { label: '退换政策', to: '/contact' }] },
      { title: '联系我们', links: [{ label: 'hi@keychain.1s.design', to: '/contact' }, { label: '中国·上海', to: '/contact' }] },
    ],
  },
}
