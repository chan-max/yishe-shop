import { createResolver } from "@nuxt/kit";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_THEME_COLOR,
  SITE_URL,
} from "./utils/seo";

const { resolve } = createResolver(import.meta.url);
const localUser = process.env.USER || process.env.LOGNAME || "local";
const localBuildDir =
  process.env.NUXT_BUILD_DIR || `.data/${localUser}-nuxt/nuxt`;
const localViteCacheDir =
  process.env.NUXT_VITE_CACHE_DIR || `.data/${localUser}-nuxt/vite`;
const localNitroOutputDir = process.env.NITRO_OUTPUT_DIR || ".output";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: ".",
  buildDir: localBuildDir,

  // 兼容日期
  compatibilityDate: "2025-12-21",

  // experimental
  experimental: {
    localLayerAliases: true,
    appManifest: false,
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      title: SITE_NAME,
      meta: [
        {
          name: "description",
          content: SITE_DESCRIPTION,
        },
        {
          name: "keywords",
          content: SITE_KEYWORDS,
        },
        {
          name: "theme-color",
          content: SITE_THEME_COLOR,
        },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        {
          rel: "preload",
          as: "font",
          href: "/main2.ttf",
          type: "font/ttf",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          href: "/logo.ttf",
          type: "font/ttf",
          crossorigin: "anonymous",
        },
      ],
    },
  },

  routeRules: {
    "/search": { redirect: { to: "/products", statusCode: 301 } },
  },

  // typescripts
  // todo: feat/strict-type-check
  // typescript: {
  //   strict: true,
  //   typeCheck: true,
  // },

  // modules
  modules: [
    // chore
    // '@nuxtjs/eslint-module',
    // styling & ui
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    // "nuxt-icon", // 暂时禁用，不兼容 Nuxt 4
    "@nuxtjs/color-mode", // management
    "@pinia/nuxt",
    "@vueuse/nuxt", // contents
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo", // SEO 模块
  ],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    cacheDir: localViteCacheDir,
  },

  css: [resolve("./assets/css/main.css")],

  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
    {
      prefix: "Layout",
      path: resolve("./components/layouts"),
      global: true,
    },
    {
      prefix: "Awesome",
      path: resolve("./components/awesome"),
      global: true,
    },
  ],

  imports: {
    dirs: [resolve("./stores"), "~/stores"],
  },

  // module::pinia
  pinia: {
    storesDirs: ["~/stores/**", "#/stores/**", "@/stores/**"],
  },

  // module::headlessui
  headlessui: {
    prefix: "Headless",
  },

  // module::color-mode
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },

  // module::content
  content: {
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: "github-dark",
    },
  },
  // SEO 配置
  site: {
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    defaultLocale: "zh-CN",
    identity: {
      type: "Organization",
    },
    twitter: "@1sdesign", // 如果有 Twitter 账号
    defaults: {
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "monthly",
      priority: 0.8,
    },
  },

  // 搜索引擎优化配置
  robots: {
    enabled: true,
    disallow: [
      "/admin/",
      "/api/",
      "/temp/",
      "/private/",
      "/test-api",
      "/test-view",
    ],
    allow: ["/"],
    sitemap: "https://1s.design/sitemap.xml",
  },

  // Schema.org 结构化数据配置
  schema: {
    enabled: true,
  },

  sitemap: {
    autoLastmod: true,
    cacheMaxAgeSeconds: 60 * 30,
    exclude: [
      "/admin/**",
      "/api/**",
      "/login",
      "/register",
      "/profile",
      "/favorites",
      "/change-password",
      "/search",
      "/test-api",
      "/test-view",
    ],
    sources: ["/api/__sitemap__/urls"],
    sitemaps: true, // sitemap多文件开关
    defaultSitemapsChunkSize: 1000,
  },

  // OG Image 渲染配置（禁用以提升启动速度）
  ogImage: {
    enabled: false, // 禁用 OG Image 生成功能
  },

  hooks: {},
  devServer: {
    port: 15201,
    host: "0.0.0.0",
  },
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        (process.env.NODE_ENV === "production"
          ? "https://1s.design:1520/api"
          : "http://localhost:1520/api"),
      openApiKey:
        process.env.NUXT_PUBLIC_OPEN_API_KEY ||
        "698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c",
    },
  },

  // prerender configuration
  nitro: {
    output: {
      dir: localNitroOutputDir,
    },
    externals: {
      inline: [/^unhead(\/.*)?$/, /^@unhead\//],
      traceInclude: [
        "node_modules/unhead/dist/**",
        "node_modules/@unhead/vue/node_modules/unhead/dist/**",
      ],
    },
    prerender: {
      failOnError: false,
    },
  },

  // build configuration
  generate: {
    dir: ".output/public",
  },
});
