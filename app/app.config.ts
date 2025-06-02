/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-02 11:42:30
 * @FilePath: /yishe-nuxt/app/app.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppConfigInput } from 'nuxt/schema'

export default defineAppConfig({
  awesome: {
    name: '衣设 | 开放式的创意服装社区',
    description:
      '开放式的创意服装社区',
    project: {
      links: {
        github: '',
      },
    },
    layout: {
      page: {
        navbar: {
          menus: [
            { type: 'link', title: 'Shop', to: { name: 'shop' } },
            { type: 'link', title: 'Blank', to: { name: 'blank' } },
            { type: 'link', title: 'Post', to: { name: 'post' } },
            { type: 'link', title: 'Test', to: { name: 'test' } },
            {
              type: 'dropdown',
              title: 'Documentations',
              children: [
                {
                  type: 'link',
                  title: 'Components',
                  to: { name: 'docs-components' },
                },
              ],
            },
            {
              type: 'dropdown',
              title: '衣设服装设计 - 开放式的创意服装社区',
              children: [
                {
                  type: 'link',
                  title: '最具创意的开放式服装设计平台',
                  to: { name: 'about' },
                },
              ],
            },
            { type: 'button', title: 'Setting', to: { name: 'setting' } },
            // dynamic title
            // {
            //   type: 'button',
            //   title: (nuxt) =>
            //     (nuxt._appConfig as AppConfigInput)?.awesome?.name || '',
            //   to: (nuxt) => (nuxt._appConfig as AppConfigInput)?.awesome?.name || '',
            // },
          ],
        },
      },
      footer: {
        year: new Date().getFullYear(),
      },
      welcome: {
        title: '最具创意的&nbsp;开放式服装设计平台',
        disableInfoReplaceIndexInWelcomePage: true,
      },
    },
    author: {
      name: 'jackie chan',
      links: {
      },
    },
  },
})
