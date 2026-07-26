import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15204,
    host: '0.0.0.0'
  },
  app: {
    head: {
      title: '衣设春联工坊 · 祥龙迎春名家手写与烫金春联定制平台',
      meta: [
        { name: 'keywords', content: '春联定制, 对联设计, 烫金门联, 楹联大吉, 万年红宣纸, 名家书法春联, 企业大门联' },
        { name: 'description', content: '衣设春联工坊专注于传世名家手写对联、烫金企业门联与创意新春楹联定制，采用特级万年红宣纸与耐候金墨。' },
        { property: 'og:title', content: '衣设春联工坊 · 祥龙迎春名家春联定制' },
        { property: 'og:description', content: '传承千年书香气韵 尊享专属名家手写与金字春联定制。' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏮</text></svg>' }
      ]
    }
  },
  nitro: {
    output: {
      dir: process.env.NITRO_OUTPUT_DIR || resolve(currentDir, './.output')
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://couplets.1s.design',
    name: '衣设春联工坊 (Shop Couplets)',
    description: '衣设春联工坊 - 专注于传统春联、烫金门联、企业定制楹联与创意手写对联设计定制平台'
  },
  runtimeConfig: {
    public: {
      siteName: '衣设春联工坊 (Shop Couplets)',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_couplets'
    }
  }
})
