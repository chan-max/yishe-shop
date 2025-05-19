// see all availabe configs here: /blob/v2/app.config.ts
export default defineAppConfig({
  awesome: {
    name: '衣设服装设计 Demo',
    description:
      'a demo from starter template for Nuxt 3 with minimalist themes design, built in components, drawer & menus, and more.',
    author: {
      name: 'jackie chan',
      links: {
      },
    },
    layout: {
      welcome: {
        // if false, in index page will show alert "create file "~/pages/index.vue" to replace this page"
        disableInfoReplaceIndexInWelcomePage: false,
        secondaryActionButton: {
          title: 'See Github',
        }
      }
    },
    project: {
      links: {
        github: '',
      },
    },
  },
})
