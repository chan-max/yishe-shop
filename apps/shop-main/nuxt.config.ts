import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  // 继承 根目录基座 的所有底层组件与功能
  extends: [resolve(currentDir, '../../')],
  devServer: {
    port: 15201,
    host: '0.0.0.0'
  }
})
