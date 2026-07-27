import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15214,
    host: '0.0.0.0'
  },
  app: {
    head: {
      title: '钥匙链工坊 · 创意钥匙扣与个性小配件定制平台 | Keychain Pop',
      meta: [
        { name: 'keywords', content: '钥匙链定制, 创意钥匙扣, 个性钥匙链, 亚克力钥匙扣, 金属钥匙链, 挂件定制, 包包挂饰' },
        { name: 'description', content: '钥匙链工坊专注于创意钥匙扣、个性亚克力钥匙链与时尚小配件定制服务，让日常配件成为潮流宣言。' },
        { property: 'og:title', content: '钥匙链工坊 · 创意钥匙扣与个性小配件定制' },
        { property: 'og:description', content: '让日常配件成为潮流宣言，创意钥匙链与时尚小配件专属定制。' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔑</text></svg>' }
      ]
    }
  },
  nitro: {
    output: {
      dir: process.env.NITRO_OUTPUT_DIR || resolve(currentDir, './.output')
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://keychain.1s.design',
    name: '钥匙链工坊 (Keychain Pop)',
    description: '钥匙链工坊 - 专注于创意钥匙扣、个性亚克力钥匙链与时尚小配件定制平台'
  },
  runtimeConfig: {
    public: {
      siteName: '钥匙链工坊 (Keychain Pop)',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_keychain'
    }
  }
})
