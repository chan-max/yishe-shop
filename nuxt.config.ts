import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      title: '衣设服装设计 - 开放式的创意服装社区',
      meta: [
        {
          name: 'description',
          content: '衣设是一个开放式的创意服装设计平台，汇聚全球设计师的创意灵感，连接设计师与品牌，打造最具创意的服装设计社区。',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preload', as: 'font', href: '/main2.ttf', type: 'font/ttf', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', href: '/logo.ttf', type: 'font/ttf', crossorigin: 'anonymous' }
      ],
    },
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
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    // management
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // contents
    '@nuxt/content',
    '@nuxtjs/sitemap',
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
    name: '1s',
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
      '/api/captcha/get',
      '/system/tenant/get-by-website'
    ], // 排除路径
    sources: [
      // '/api/__sitemap__/urls',
      '/api/sitemap',
    ],
    sitemaps: true, // sitemap多文件开关
    defaultSitemapsChunkSize: 1000,
  },
  hooks: {
  },
  devServer: {
    port: 15201
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || (process.env.NODE_ENV === 'production' 
        ? 'https://1s.design:1520/api'
        : 'http://localhost:1520/api')
    }
  },
})