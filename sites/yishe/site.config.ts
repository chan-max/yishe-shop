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
      "衣设是面向品牌、创作者和个体用户的 POD 创意设计开放平台，聚合印花图案、定制商品、视觉素材、AI 辅助创作和设计师服务。",
    twitterDescription:
      "发现可商用的 POD 图案、定制商品灵感和创意设计服务，把私人表达转化为真实产品。",
    keywords:
      "衣设,yishe,POD,Print on Demand,印花设计,定制商品,私人定制,图案素材,服装印花,创意设计,AI设计,设计师服务,品牌视觉,周边定制,礼品定制",
    themeColor: "#ffffff",
    robots:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    home: {
      title: "衣设 1s.design - POD 印花、定制商品与创意设计开放平台",
      description:
        "衣设聚合 POD 印花图案、定制商品、品牌周边、私人定制和创意设计灵感，帮助创作者与品牌把视觉想法转化为真实产品。",
      keywords:
        "POD,印花设计,定制商品,私人定制,创意设计,图案素材,服装印花,品牌周边,按需定制,1s.design",
      url: siteUrl,
      type: "website",
    },
  },
  announcement: {
    enabled: true,
    text: "注册衣设，探索 POD 印花定制与创意设计商品。",
    actionLabel: "立即探索",
    actionTo: "/products",
  },
  navigation: [
    { label: "商品", to: "/products", icon: "box" },
    { label: "定制设计", to: "/design", icon: "palette" },
    { label: "开放文档", to: "/docs", icon: "book" },
    { label: "关于我们", to: "/about", icon: "info" },
    { label: "联系我们", to: "/contact", icon: "mail" },
  ],
  footer: {
    newsletterEyebrow: "订阅更新",
    newsletterTitle: "获取最新 POD 商品与设计灵感",
    newsletterPlaceholder: "输入邮箱地址",
    newsletterAction: "订阅",
    description:
      "POD 印花、定制商品与创意设计开放平台。为创作者、品牌和个人定制需求提供可浏览、可延展的商品灵感与开放 API 对接机制。",
    email: "jackieontheway666@gmail.com",
    groups: {
      商品: [
        { name: "全部商品", href: "/products" },
        { name: "定制设计", href: "/design" },
        { name: "设计灵感", href: "/products/印花" },
        { name: "收藏夹", href: "/favorites" },
      ],
      开发者: [
        { name: "开放接口文档", href: "/docs" },
        { name: "密钥与认证", href: "/docs#auth" },
        { name: "AI Agent 工具", href: "/docs#ai-agent" },
      ],
      了解: [
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
