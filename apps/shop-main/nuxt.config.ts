import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15201,
    host: '0.0.0.0'
  },
  // shop-main 专属独立 SEO 配置
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://shop-main.1s.design',
    name: process.env.NUXT_PUBLIC_SITE_NAME || '衣设官方工坊 (Shop Main)',
    description: '衣设官方工坊 - 提供服装设计、POD定制商品与专属设计服务'
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || '衣设官方工坊 (Shop Main)',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_main'
    }
  }
})
