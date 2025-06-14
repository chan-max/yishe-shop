/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-06-15 06:53:27
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-15 06:55:15
 * @FilePath: /yishe-nuxt/server/api/sitemap.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default defineEventHandler(async (event) => {
  // 返回网站的所有路由
  return [
    {
      url: '/',
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString()
    },
    {
      url: '/shop',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString()
    },
    {
      url: '/post',
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString()
    },
    {
      url: '/about',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    },
    {
      url: '/setting',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString()
    }
  ]
}) 