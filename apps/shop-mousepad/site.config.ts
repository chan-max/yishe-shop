export default {
  brand: 'PadStudio',
  seo: {
    title: 'PadStudio · 为精准而生的鼠标垫',
    description: 'PadStudio 将工艺与科技融合，打造像素级精准、触感细腻的专业鼠标垫。从电竞竞技到日常办公，每一块都经得起考验。',
    ogTitle: 'PadStudio · 为精准而生的鼠标垫',
    ogDescription: '工艺与科技的融合，每一次滑动都精准流畅。',
    keywords: '鼠标垫定制, 游戏鼠标垫, 办公鼠标垫, 大桌垫, 个性鼠标垫, RGB鼠标垫',
  },
  nav: [
    { label: '首页', to: '/' },
    { label: '全部鼠标垫', to: '/search' },
    { label: '游戏鼠标垫', to: '/search?type=游戏鼠标垫' },
    { label: '办公桌垫', to: '/search?type=办公桌垫' },
    { label: '联系我们', to: '/contact' },
  ],
  hero: {
    title: '精准操控\n从一块好垫开始',
    desc: '高密度织物表面，像素级追踪。电竞竞技到日常办公，每一块都经得起考验。',
    cta: '浏览鼠标垫',
    secondaryCta: '定制专属',
  },
  categories: [
    { name: '游戏鼠标垫', slug: '游戏鼠标垫', desc: '电竞级响应速度' },
    { name: '办公桌垫', slug: '办公桌垫', desc: '优雅桌面美学' },
    { name: '超大桌垫', slug: '超大桌垫', desc: '全桌覆盖体验' },
    { name: 'RGB灯效垫', slug: 'RGB灯效垫', desc: '炫彩灯光氛围' },
    { name: '无线充电垫', slug: '无线充电垫', desc: '一垫多用' },
    { name: '定制印花垫', slug: '定制印花垫', desc: '专属个性设计' },
  ],
  features: [
    { title: '纳米级操控', desc: '高密度微纤维编织表面，提供像素级精准追踪与丝滑滑动体验。', icon: 'precision' },
    { title: '锁边工艺', desc: '高密度激光锁边，永不脱线，经受数百万次摩擦依然如新。', icon: 'durability' },
    { title: '防滑底胶', desc: '天然橡胶底面，强力吸附桌面，激烈操作纹丝不动。', icon: 'grip' },
    { title: '个性定制', desc: '支持全彩UV印花定制，让你的鼠标垫成为桌面上独一无二的风景。', icon: 'custom' },
  ],
  specs: [
    { label: '操控速度', value: '9.2', unit: '/10' },
    { label: '控制力', value: '8.8', unit: '/10' },
    { label: '耐久度', value: '9.5', unit: '/10' },
    { label: '静音指数', value: '9.0', unit: '/10' },
  ],
  trustSignals: [
    { value: '50,000+', label: '玩家选择' },
    { value: '200+', label: '设计图案' },
    { value: '4.9', label: '平均评分' },
    { value: '24h', label: '极速发货' },
  ],
  newsletter: {
    title: '订阅获取新品与优惠',
    desc: '第一时间了解新品上市、限时折扣与外设评测。',
    placeholder: '输入您的邮箱地址',
    cta: '订阅',
  },
  footer: {
    desc: '专注于高品质鼠标垫与桌垫定制服务，让每一次操控都成为享受。',
    cols: [
      { title: '商品浏览', links: [{ label: '新品到货', to: '/search' }, { label: '游戏鼠标垫', to: '/search?type=游戏鼠标垫' }, { label: '办公桌垫', to: '/search?type=办公桌垫' }] },
      { title: '客户服务', links: [{ label: '联系我们', to: '/contact' }, { label: '配送信息', to: '/contact' }, { label: '退换政策', to: '/contact' }] },
      { title: '我的账户', links: [{ label: '登录', to: '/login' }, { label: '收藏夹', to: '/search' }] },
    ],
  },
}
