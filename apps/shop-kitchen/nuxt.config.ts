import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15208,
    host: '0.0.0.0'
  },
  app: {
    head: {
      title: '厨房设计工坊 · 创意厨具与厨房用品定制平台 | Kitchen Studio',
      meta: [
        { name: 'keywords', content: '厨房设计, 厨具定制, 创意厨房用品, 围裙定制, 隔热垫设计, 厨房装饰, 烘焙工具定制' },
        { name: 'description', content: '厨房设计工坊专注于创意厨具、个性厨房用品与家居烹饪配件定制服务，让厨房也成为艺术空间。' },
        { property: 'og:title', content: '厨房设计工坊 · 创意厨具与厨房用品定制' },
        { property: 'og:description', content: '让厨房也成为艺术空间，创意厨具与个性厨房用品专属定制。' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍳</text></svg>' }
      ]
    }
  },
  nitro: {
    output: {
      dir: process.env.NITRO_OUTPUT_DIR || resolve(currentDir, './.output')
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://kitchen.1s.design',
    name: '厨房设计工坊 (Kitchen Studio)',
    description: '厨房设计工坊 - 专注于创意厨具、个性厨房用品与家居烹饪配件定制平台'
  },
  runtimeConfig: {
    public: {
      siteName: '厨房设计工坊 (Kitchen Studio)',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_kitchen'
    }
  }
})
