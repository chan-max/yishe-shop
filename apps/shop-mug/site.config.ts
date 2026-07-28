export default {
  brand: 'MugAtelier',
  seo: {
    title: '手作杯子工坊 · 家居马克杯与创意杯具定制平台 | Mug Atelier',
    description: '手作杯子工坊专注于家居马克杯、创意陶瓷杯与个性印花杯具定制服务，为每一杯温暖注入独特设计。',
    ogTitle: '手作杯子工坊 · 家居马克杯与创意杯具定制',
    ogDescription: '为每一杯温暖注入独特设计，手作陶瓷杯与创意马克杯专属定制。',
    keywords: '马克杯定制, 家居杯子, 手作陶瓷杯, 创意杯具设计, 咖啡杯定制',
  },
  nav: [
    { label: '首页', to: '/' },
    { label: '全部杯具', to: '/search' },
    { label: '咖啡杯', to: '/search?type=咖啡杯' },
    { label: '陶瓷杯', to: '/search?type=陶瓷杯' },
    { label: '联系我们', to: '/contact' },
  ],
  hero: {
    eyebrow: '手作杯具 · Curated Selection',
    title: '发现手作杯具的温度与美感',
    desc: '从晨间第一杯咖啡到深夜的一盏热茶，每一只杯子都承载着生活的温度。探索来自独立设计师的原创杯具，为日常注入仪式感。',
    cta: '浏览全部杯具',
    secondaryCta: '了解更多',
  },
  categories: [
    { name: '咖啡杯', slug: '咖啡杯', desc: '唤醒每一天' },
    { name: '陶瓷杯', slug: '陶瓷杯', desc: '匠心手作' },
    { name: '保温杯', slug: '保温杯', desc: '持久温暖' },
    { name: '马克杯', slug: '马克杯', desc: '个性表达' },
    { name: '茶杯', slug: '茶杯', desc: '静享时光' },
    { name: '玻璃杯', slug: '玻璃杯', desc: '通透之美' },
  ],
  features: [
    { title: '手作匠心', desc: '每一只杯子都经过匠人精心打磨，独特的釉色与纹理让你的杯子成为独一无二的艺术品。', icon: 'craft' },
    { title: '食品级安全', desc: '严选食品级陶瓷与釉料，通过国际安全认证，让每一口都安心。', icon: 'safety' },
    { title: '个性定制', desc: '支持图案、文字、照片定制，打造专属于你的杯具，送礼自用两相宜。', icon: 'custom' },
    { title: '全国包邮', desc: '订单满99元即享全国顺丰包邮，用心包装确保完好送达。', icon: 'shipping' },
  ],
  trustSignals: [
    { value: '10,000+', label: '满意客户' },
    { value: '500+', label: '设计师入驻' },
    { value: '99.8%', label: '好评率' },
    { value: '48h', label: '极速发货' },
  ],
  newsletter: {
    title: '订阅获取新品资讯',
    desc: '第一时间了解新品上市、限时优惠与杯具养护技巧。',
    placeholder: '输入您的邮箱地址',
    cta: '订阅',
  },
  footer: {
    desc: '专注于手作杯具与创意马克杯定制服务，让每一次举杯都成为生活的仪式感。',
    cols: [
      { title: '商品浏览', links: [{ label: '新品到货', to: '/search' }, { label: '咖啡杯', to: '/search?type=咖啡杯' }, { label: '陶瓷杯', to: '/search?type=陶瓷杯' }] },
      { title: '客户服务', links: [{ label: '联系我们', to: '/contact' }, { label: '配送信息', to: '/contact' }, { label: '退换政策', to: '/contact' }] },
      { title: '我的账户', links: [{ label: '登录', to: '/login' }, { label: '收藏夹', to: '/search' }] },
    ],
  },
}
