/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-05-16 06:58:19
 * @FilePath: /yishe-nuxt/nuxt.schema.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NuxtAwesomeAppConfig } from './app.config'

export default defineNuxtSchema({
  appConfig: {
    awesome: {
      name: '衣设服装设计',
      description: '开放式的创意服装社区',
      project: {
        links: {
          github: 'https://github.com/viandwi24/nuxt3-awesome-starter',
        },
      },
      layout: {
        page: {
          navbar: {
            menus: [],
          },
        },
        footer: {
          year: 2023,
        },
        welcome: {
          title: '最具创意的开放式服装设计平台',
          disableInfoReplaceIndexInWelcomePage: true,
        },
      },
      author: {
        name: 'viandwi24',
        links: {
          github: 'https://github.com/viandwi24',
          medium: 'https://viandwi24.medium.com',
          website: 'https://viandwi24.site',
        },
      },
    } as NuxtAwesomeAppConfig,
  },
})
