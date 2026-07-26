import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15202,
    host: '0.0.0.0'
  },
  nitro: {
    output: {
      dir: process.env.NITRO_OUTPUT_DIR || resolve(currentDir, './.output')
    }
  },
  // shop-business-card 专属独立 SEO 配置 (名片专属独立站)
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://card.1s.design',
    name: process.env.NUXT_PUBLIC_SITE_NAME || '衣设名片工坊 (Shop Business Card)',
    description: '衣设名片工坊 - 专注于高端商务名片、创意名片设计与专属定制服务'
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || '衣设名片工坊 (Shop Business Card)',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_card'
    }
  }
})
