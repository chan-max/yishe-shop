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
  },

  // typescripts
  // todo: feat/strict-type-check
  // typescript: {
  //   strict: true,
  //   typeCheck: true,
  // },

  // modules
  modules: [// chore
    '@nuxtjs/eslint-module', // styling & ui
    '@nuxtjs/tailwindcss', 'nuxt-headlessui', 'nuxt-icon', '@nuxtjs/color-mode', // management
    '@pinia/nuxt', '@vueuse/nuxt', // contents,
    // todo: feat/localization
    // '@nuxtjs/i18n'
    '@nuxt/content', '@nuxtjs/sitemap'],

  css: [
    resolve('./assets/scss/_variables.scss'),
    resolve('./assets/scss/app.scss'),
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
      priority: 0.8
    }
    // ...etc
  },
  sitemap: {
    autoLastmod: true,
    cacheMaxAgeSeconds: 1000 * 60 * 60 * 3, // 三个小时的更新频率
    exclude: [], // 排除路径
    sources: [
      // '/api/__sitemap__/urls',
      '/api/sitemap'
    ],
    sitemaps: true, // sitemap多文件开关
    defaultSitemapsChunkSize: 1000,
  },
  hooks: {
  },
})