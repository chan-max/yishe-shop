import type { RouteLocationRaw } from 'vue-router'

export interface NuxtAwesomeAppConfig {
  /** title name */
  name?: string
  /** description */
  description?: string

  /** project config */
  project?: {
    /** links */
    links?: {
      /** project github link */
      github?: string
    }
  }

  /** layout config */
  layout?: {
    /** page layout */
    page?: {
      /** navbar */
      navbar?: {
        /** menus in navbar */
        menus?: any[]
      }
    }
    /** footer */
    footer?: {
      /** footer year */
      year?: number
    }
    /** welcome component page */
    welcome?: {
      title?: string
      disableInfoReplaceIndexInWelcomePage?: boolean
      primaryActionButton?: {
        title?: string
        to?: RouteLocationRaw | ((nuxt:any) => RouteLocationRaw)
      }
      secondaryActionButton?: {
        title?: string
        to?: RouteLocationRaw | ((nuxt:any) => RouteLocationRaw)
      }
    }
  }

  /** author config */
  author?: {
    /** author name */
    name?: string
    /** author links */
    links?: {
      /** author github link */
      github?: string
      /** author medium link */
      medium?: string
      /** author website link */
      website?: string
    }
  }

  /** author config */
  disableInfoReplaceIndexInWelcomePage?: boolean
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    awesome?: NuxtAwesomeAppConfig
  }
}

export default defineAppConfig({
  awesome: {
    name: '衣设服装设计',
    description: '专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感',
    project: {
      links: {
        github: '',
      },
    },
    layout: {
      page: {
        navbar: {
          menus: [
            {
              type: 'link',
              title: '首页',
              to: '/'
            }
          ],
        },
      },
      footer: {
        year: new Date().getFullYear(),
      },
      welcome: {
        title: '衣设&nbsp;服装设计',
        disableInfoReplaceIndexInWelcomePage: true,
        primaryActionButton: {
          title: '开始设计',
          // to: '/design',
        },
        secondaryActionButton: {
          title: '加入社区',
          // to: '/community',
        },
      },
    },
    author: {
      name: '衣设设计团队',
      links: {
        website: 'https://1s.design',
      },
    },
    disableInfoReplaceIndexInWelcomePage: false,
  } as NuxtAwesomeAppConfig,
  nuxtIcon: {
    aliases: {},
    class: '',
    size: '1em',
  },
})
