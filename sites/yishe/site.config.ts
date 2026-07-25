import type { SiteDefinition } from "../types";
import { homeContent } from "./content/home";

const siteUrl = "https://1s.design";

export const yisheSiteConfig: SiteDefinition = {
  id: "yishe",
  brand: {
    name: "衣设",
    nameEn: "1s.design",
    fullName: "衣设 yishe",
    organizationName: "衣设 yishe",
    author: "衣设设计团队",
    logo: "/logo.png",
    favicon: "/favicon.png",
    defaultImage: "/logo.png",
  },
  urls: {
    site: siteUrl,
    apiBase: "https://1s.design:1520/api",
  },
  locale: "zh-CN",
  social: {
    twitter: "@1sdesign",
  },
  seo: {
    description:
      "衣设（1s.design）是面向品牌与创作者的 POD 创意定制与灵感分享平台。提供免费在线设计工具、丰富印花载体与一件起订专属按需定制服务。",
    twitterDescription:
      "探索 POD 创意设计与灵感分享平台。免费在线创作，轻松把独特灵感变为专属高品质定制实物。",
    keywords:
      "衣设,1s.design,POD,Print on Demand,免费设计,按需定制,创意定制,印花设计,定制平台,创意分享,个性化定制,服装定制,品牌周边",
    themeColor: "#ffffff",
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    home: {
      title: "衣设 1s.design · POD 创意定制与灵感分享平台 | 免费在线设计",
      description:
        "衣设（1s.design）是领先的 POD 创意定制与灵感分享平台。支持免费在线设计、3D 效果预览与一件按需定制，让每个创意即刻品质落地。",
      keywords:
        "衣设,1s.design,POD,Print on Demand,免费设计,按需定制,创意定制,印花设计,定制平台,创意分享",
      url: siteUrl,
      type: "website",
    },
  },
  announcement: {
    enabled: true,
    text: "✨ 免费在线设计 · 专属 POD 按需定制与灵感分享",
    actionLabel: "立即体验",
    actionTo: "/design",
  },
  navigation: [
    { label: "商品库", to: "/products", icon: "box" },
    { label: "免费设计", to: "/design", icon: "palette" },
    { label: "关于我们", to: "/about", icon: "info" },
    { label: "联系我们", to: "/contact", icon: "mail" },
  ],
  footer: {
    newsletterEyebrow: "订阅更新",
    newsletterTitle: "获取最新 POD 创意商品与设计灵感",
    newsletterPlaceholder: "输入邮箱地址",
    newsletterAction: "订阅",
    description:
      "POD 创意定制与灵感分享平台。提供免费在线设计工具、丰富的印花与周边载体，支持一件按需定制与全球交付，让创意自由表达。",
    email: "jackieontheway666@gmail.com",
    groups: {
      探索: [
        { name: "全部商品", href: "/products" },
        { name: "在线设计", href: "/design" },
        { name: "设计灵感", href: "/products/印花" },
        { name: "我的收藏", href: "/favorites" },
      ],
      关于: [
        { name: "关于我们", href: "/about" },
        { name: "联系我们", href: "/contact" },
      ],
    },
  },
  features: {
    announcement: true,
    auth: true,
    favorites: true,
    newsletter: false,
  },
  theme: {
    stylesheet: "./sites/yishe/theme/tokens.css",
  },
  paths: {
    components: "./sites/yishe/components",
  },
  home: homeContent,
};
