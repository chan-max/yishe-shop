import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  // 继承 shop-main (根目录基座) 的所有组件、组合式API与功能
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15202,
    host: '0.0.0.0'
  }
})
