import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15204,
    host: '0.0.0.0'
  },
  dataDir: resolve(currentDir, './.data-couplet'),
  nitro: {
    output: {
      dir: process.env.NITRO_OUTPUT_DIR || resolve(currentDir, './.output')
    }
  },
  // shop-couplet 专属独立 SEO 配置 (对联/春联专属独立站)
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://couplet.1s.design',
    name: process.env.NUXT_PUBLIC_SITE_NAME || '衣设春联工坊 (Shop Couplet)',
    description: '衣设春联工坊 - 专注于传统春联、烫金门联、企业定制楹联与创意手写对联设计定制平台'
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || '衣设春联工坊 (Shop Couplet)',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_couplet'
    }
  }
})
