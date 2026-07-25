import type { SiteHomeContent } from "../../types";

export const homeContent: SiteHomeContent = {
  copy: {
    creatorFallback: "衣设创作者",
    srTitle: "衣设 1s.design - POD 创意定制与灵感分享开放平台",
    hero: {
      brand: "YISHE",
      eyebrow: "1s.design · POD CREATIVE PLATFORM",
      title: "灵感即刻具象 · 免费设计与专属 POD 定制",
      description:
        "面向全球创作者与品牌主理人的 POD 创意定制与分享平台。无需专业门槛，免费体验在线设计工具与海量灵感素材，支持一件按需定制，让独特想法蜕变为高品质实物。",
      primaryAction: { label: "免费在线设计", to: "/design" },
      secondaryAction: { label: "探索 POD 创意商品", to: "/products" },
    },
    finder: {
      eyebrow: "FREE DESIGN & CUSTOMIZATION",
      title: "选定品质载体，开启免费定制创作。",
      description:
        "精选潮流服饰、家居软装、数码配件与生活用品等多元 POD 载体，支持免费在线创作与 3D 实时效果预览。",
    },
    featureFallbackDescription:
      "从一个创意想法出发，免费延伸为服饰印花、高档礼赠与品牌周边，赋予灵感可触可感的品质生活方式。",
    runway: {
      eyebrow: "CREATIVE SHARING & POD",
      title: "分享独特灵感，让每一个想法闪耀生命力。",
      description:
        "不仅是按需定制工具，更是创意汇聚与分享的社区平台。支持私人纪念、品牌周边与创作成果自由展示与交流。",
    },
    editorialsAriaLabel: "衣设专题",
    journey: {
      ariaLabel: "使用衣设的流程",
      eyebrow: "HOW IT WORKS",
      title: "简单三步，把灵感变成品质实物",
    },
    universe: {
      ariaLabel: "按主题探索 POD 商品",
      eyebrow: "POD UNIVERSE",
      title: "每一个灵感主题，都有专属的商品宇宙。",
    },
    collection: {
      ariaLabel: "商品系列陈列",
      eyebrow: "PRODUCT GALLERY",
      title: "多元商品形态，等待被你的创意点亮。",
    },
    feed: {
      eyebrow: "COMMUNITY SELECTION",
      title: "来自灵感社区的高光创作",
    },
  },
  fallbackProducts: [
    {
      id: "pod-print-series",
      title: "Botanical Print Capsule",
      description: "适合服饰、帆布包、杯具与家居布艺延展的植物印花系列。",
      category: "POD PRINT",
      type: "印花图案",
      creator: "林小溪",
      likes: 3280,
    },
    {
      id: "custom-gift-set",
      title: "Creator Gift Collection",
      description: "面向节日礼赠、品牌活动与私人纪念的定制商品企划。",
      category: "CUSTOM GIFT",
      type: "定制礼物",
      creator: "Studio W",
      likes: 2560,
    },
    {
      id: "home-textile-art",
      title: "Home Textile Art",
      description: "可延展到抱枕、挂毯、装饰画和软装织物的图案方向。",
      category: "HOME DECOR",
      type: "家居布艺",
      creator: "Artisan Lab",
      likes: 1890,
    },
    {
      id: "streetwear-drop",
      title: "Streetwear Drop",
      description: "适合 T 恤、卫衣、帽衫和潮流周边上新的视觉系列。",
      category: "APPAREL",
      type: "服饰印花",
      creator: "潮研所",
      likes: 5120,
    },
  ],
  categoryTiles: [
    { label: "服饰印花", keyword: "T恤" },
    { label: "礼赠周边", keyword: "杯子" },
    { label: "家居生活", keyword: "抱枕" },
    { label: "数码配件", keyword: "手机壳" },
    { label: "生活方式", keyword: "帆布包" },
  ],
  productFinderGroups: [
    { key: "apparel", label: "T 恤", keyword: "T恤", hint: "免费设计 / 服饰印花" },
    { key: "hoodie", label: "连帽衫", keyword: "卫衣", hint: "按需定制 / 潮流卫衣" },
    { key: "bags", label: "帆布包", keyword: "帆布包", hint: "灵感分享 / 随身周边" },
    { key: "digital", label: "手机壳", keyword: "手机壳", hint: "专属表达 / 数码配件" },
    { key: "mousepad", label: "鼠标垫", keyword: "鼠标垫", hint: "桌面美学 / 定制垫" },
    { key: "poster", label: "装饰画", keyword: "装饰画", hint: "艺术陈列 / 海报画架" },
  ],
  modules: [
    {
      key: "apparel",
      eyebrow: "WEARABLE IDEAS",
      title: "服饰印花与潮流单品",
      keyword: "T恤",
      text: "提供免费在线设计工具，让 T 恤、连帽衫成为可穿上街的个人态度表达，一件起订。",
      href: "/products/T恤",
      limit: 6,
    },
    {
      key: "digital",
      eyebrow: "DAILY TECH",
      title: "手机壳与数码配件",
      keyword: "手机壳",
      text: "让随身设备承载你的独家视觉与品牌识别，支持在线实时预览与按需定制。",
      href: "/products/手机壳",
      limit: 6,
    },
    {
      key: "bags",
      eyebrow: "CITY GOODS",
      title: "帆布包与生活出行",
      keyword: "帆布包",
      text: "把创意从屏幕带到街头，让一只帆布包成为灵感分享与品牌美学的移动载体。",
      href: "/products/帆布包",
      limit: 6,
    },
    {
      key: "mousepad",
      eyebrow: "DESK CULTURE",
      title: "鼠标垫与桌面美学",
      keyword: "鼠标垫",
      text: "将个性插画、品牌视觉与艺术签名打造成高品质桌面装备，免费在线排版。",
      href: "/products/鼠标垫",
      limit: 6,
    },
  ],
  editorials: [
    { title: "FREE DESIGN STUDIO", subtitle: "免费在线设计，人人都是设计师", href: "/design" },
    { title: "PRINT ON DEMAND", subtitle: "一件起订，工业级高质量按需定制", href: "/products" },
    { title: "CREATOR SHARING", subtitle: "分享灵感成果，连接全球创作者社区", href: "/products" },
  ],
  journeySteps: [
    {
      title: "1. 挑选商品载体",
      text: "探索丰富的高品质 POD 商品库（T恤、连帽衫、帆布包、手机壳、鼠标垫等）。",
    },
    {
      title: "2. 免费在线设计",
      text: "免费使用图形编辑器，上传图像、应用矢量素材或 AI 创作，实时高精 3D 预览。",
    },
    {
      title: "3. 专属按需交付",
      text: "支持一件起订与分享展示，工业级高精印花快速制作并快递送达。",
    },
  ],
};
