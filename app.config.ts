import { activeSiteConfig } from './sites'
import type { SiteDefinition } from './sites'

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
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    awesome?: NuxtAwesomeAppConfig
    site?: SiteDefinition
  }
}

export default defineAppConfig({
  site: activeSiteConfig,
  awesome: {
    name: activeSiteConfig.brand.fullName,
    description: activeSiteConfig.seo.description,
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
    },
    author: {
      name: activeSiteConfig.brand.author,
      links: {
        website: activeSiteConfig.urls.site,
      },
    },
  } as NuxtAwesomeAppConfig,
  nuxtIcon: {
    aliases: {},
    class: '',
    size: '1em',
  },
})
