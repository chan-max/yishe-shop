import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15210,
    host: '0.0.0.0'
  },
  app: {
    head: {
      title: '名画艺廊 · 世界名画复制品与艺术版画定制平台 | Gallery Masters',
      meta: [
        { name: 'keywords', content: '世界名画, 艺术复制品, 名画版画, 油画复制, 博物馆级复刻, 莫奈梵高毕加索, 艺术装饰画' },
        { name: 'description', content: '名画艺廊专注于世界经典名画高品质复制品、博物馆级艺术版画与大师作品定制复刻服务。' },
        { property: 'og:title', content: '名画艺廊 · 世界名画复制品与艺术版画定制' },
        { property: 'og:description', content: '博物馆级品质，将世界经典名画带入您的生活空间。' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>' }
      ]
    }
  },
  nitro: {
    output: {
      dir: process.env.NITRO_OUTPUT_DIR || resolve(currentDir, './.output')
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://painting.1s.design',
    name: '名画艺廊 (Gallery Masters)',
    description: '名画艺廊 - 专注于世界名画复制品、博物馆级艺术版画与大师作品定制复刻平台'
  },
  runtimeConfig: {
    public: {
      siteName: '名画艺廊 (Gallery Masters)',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_painting'
    }
  }
})
