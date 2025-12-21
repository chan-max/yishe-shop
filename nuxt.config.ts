import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 兼容日期
  compatibilityDate: '2025-12-21',
  
  // exp
  experimental: {
    localLayerAliases: true,
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: '衣设服装设计 - 创意印花图案与服装设计平台',
      meta: [
        {
          name: 'description',
          content: '衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preload', as: 'font', href: '/main2.ttf', type: 'font/ttf', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', href: '/logo.ttf', type: 'font/ttf', crossorigin: 'anonymous' }
      ],
    },
    // 配置加载指示器
    loadingIndicator: {
      color: '#3b82f6',
      background: 'white',
      throttle: 200,
    },
  },


  // typescripts
  // todo: feat/strict-type-check
  // typescript: {
  //   strict: true,
  //   typeCheck: true,
  // },

  // modules
  modules: [// chore
  // '@nuxtjs/eslint-module',
  // styling & ui
  '@nuxtjs/tailwindcss', 'nuxt-headlessui', 'nuxt-icon', '@nuxtjs/color-mode', // management
  '@pinia/nuxt', '@vueuse/nuxt', // contents
  '@nuxt/content', '@nuxtjs/sitemap', 
  // '@nuxtjs/seo' // 需要先安装 nuxt-og-image: pnpm add nuxt-og-image
  ],

  build: {
    transpile: ['vuetify']
  },

  css: [
    'vuetify/styles',
  ],

  components: [
    {
      prefix: 'Layout',
      path: resolve('./components/layouts'),
      global: true,
    },
    {
      prefix: 'Awesome',
      path: resolve('./components/awesome'),
      global: true,
    },
  ],

  imports: {
    dirs: [resolve('./stores'), '~/stores'],
  },

  // module::pinia
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
  },

  // module::headlessui
  headlessui: {
    prefix: 'Headless',
  },

  // module::color-mode
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

  // module::icon - 配置图标在构建时本地化
  icon: {
    // 使用本地图标集合，避免运行时请求远程图标
    serverBundle: 'local',
  },

  // module::content
  content: {
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: 'github-dark',
    },
  },
  site: {
    url: 'https://1s.design',
    name: '1s design',
    defaults: {
      lastmod: '2025-05-16',
      changefreq: 'monthly',
      priority: 0.8,
    },
  },
  
  sitemap: {

    autoLastmod: true,
    cacheMaxAgeSeconds: 1000 * 60 * 60 * 3, // 三个小时的更新频率
    exclude: [
    ], // 排除路径
    sources: [
      // '/api/__sitemap__/urls',
    ],
    sitemaps: true, // sitemap多文件开关
    defaultSitemapsChunkSize: 1000,
  },
 
  hooks: {
  },
  devServer: {
    port: 15201,
    host: '0.0.0.0'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || (process.env.NODE_ENV === 'production' 
        ? 'https://1s.design:1520/api'
        : 'http://localhost:1520/api')
    }
  },
  
  // prerender configuration
  nitro:{
    prerender: {
      failOnError: false
    },
  }
})