import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15202,
    host: '0.0.0.0'
  },
  // shop-a 专属独立 SEO 配置
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://shop-a.1s.design',
    name: process.env.NUXT_PUBLIC_SITE_NAME || 'Shop-A 潮流工作室',
    description: 'Shop-A 潮流灵感设计工作室 - 灵感碰撞与私人专属定制'
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'Shop-A 潮流工作室',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_shopa'
    }
  }
})
