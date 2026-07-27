export default {
  brand: '名画艺廊',
  emoji: '🎨',
  seo: {
    title: '名画艺廊 · 世界名画复制品与艺术版画定制平台',
    description: '名画艺廊专注于世界经典名画高品质复制品、博物馆级艺术版画与大师作品定制复刻服务。',
    ogTitle: '名画艺廊 · 世界名画复制品与艺术版画定制',
    ogDescription: '博物馆级品质，将世界经典名画带入您的生活空间。',
    keywords: '名画复制品, 艺术版画, 博物馆级复刻, 装饰画定制, 世界名画',
  },
  nav: [
    { label: '首页', to: '/' },
    { label: '全部作品', to: '/search' },
    { label: '关于艺廊', to: '/about' },
    { label: '定制咨询', to: '/contact' },
  ],
  hero: {
    eyebrow: 'GALLERY MASTERS · EST. 2026',
    title: '将世界名画带入您的空间',
    desc: '博物馆级品质复制品，从莫奈到梵高，从毕加索到达利。每一幅都是对经典的致敬与对品质的执着。',
    cta: '浏览馆藏',
  },
  categories: [
    { name: '印象派', slug: '印象派' },
    { name: '后印象派', slug: '后印象派' },
    { name: '立体主义', slug: '立体主义' },
    { name: '超现实主义', slug: '超现实主义' },
    { name: '古典主义', slug: '古典主义' },
    { name: '现代艺术', slug: '现代艺术' },
  ],
  artists: ['Monet', 'Van Gogh', 'Picasso', 'Dalí', 'Klimt', 'Vermeer', 'Rembrandt', 'Renoir', 'Cézanne', 'Matisse'],
  quality: [
    { num: '01', title: '博物馆级复刻', desc: 'Giclée 微喷技术，色彩还原度 99%。' },
    { num: '02', title: '艺术纸与画布', desc: '300gsm 棉浆艺术纸或亚麻画布。' },
    { num: '03', title: '专业装裱', desc: '实木画框、无酸卡纸装裱。' },
    { num: '04', title: '全球包邮', desc: '专业防震包装，全球免费配送。' },
  ],
  quote: { text: '"艺术的目的不是再现可见，而是使不可见成为可见。"', cite: '— Paul Klee' },
  cta: { title: '寻找您的心仪之作？', desc: '告诉我们您想要的画作，我们为您定制博物馆级复制品。', action: '提交定制需求' },
  footer: {
    desc: '专注于世界经典名画高品质复制品、博物馆级艺术版画与大师作品定制复刻服务。',
    cols: [
      { title: '浏览', links: [{ label: '全部作品', to: '/search' }, { label: '关于艺廊', to: '/about' }, { label: '定制咨询', to: '/contact' }] },
      { title: '支持', links: [{ label: '联系我们', to: '/contact' }, { label: '账户登录', to: '/login' }] },
      { title: '服务', links: [{ label: '品牌故事', to: '/about' }, { label: '艺术家入驻', to: '/about' }] },
    ],
  },
}
