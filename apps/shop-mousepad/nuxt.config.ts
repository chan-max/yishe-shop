import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15216,
    host: '0.0.0.0'
  },
  app: {
    head: {
      title: '鼠标垫工作室 · 专业游戏与办公鼠标垫定制 | PadStudio',
      meta: [
        { name: 'keywords', content: '鼠标垫定制, 游戏鼠标垫, 办公鼠标垫, 大桌垫, 个性鼠标垫, RGB鼠标垫' },
        { name: 'description', content: 'PadStudio 专注于高品质游戏鼠标垫与办公桌垫定制，提供专业级操控体验与个性化设计服务。' },
        { property: 'og:title', content: '鼠标垫工作室 · 专业游戏与办公鼠标垫定制' },
        { property: 'og:description', content: '专业级操控体验，个性化设计服务，让每一次滑动都精准流畅。' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🖱</text></svg>' }
      ]
    }
  },
  nitro: {
    output: {
      dir: process.env.NITRO_OUTPUT_DIR || resolve(currentDir, './.output')
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://pad.1s.design',
    name: '鼠标垫工作室 (PadStudio)',
    description: 'PadStudio - 专注于高品质游戏鼠标垫与办公桌垫定制平台'
  },
  runtimeConfig: {
    public: {
      siteName: '鼠标垫工作室 (PadStudio)',
      openApiKey: process.env.NUXT_PUBLIC_OPEN_API_KEY || '698fa3584d6d4dda04c7a3d2513fb9d076fc7a894f9ef27c',
      adminId: process.env.NUXT_PUBLIC_ADMIN_ID || 'admin_mousepad'
    }
  }
})
