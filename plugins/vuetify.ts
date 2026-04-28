import { createVuetify } from 'vuetify'
import { VBtn, VAvatar, VIcon } from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VBtn,
      VAvatar,
      VIcon,
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#1867C0',
            secondary: '#5CBBF6',
          },
        },
      },
    },
  })

  app.vueApp.use(vuetify)
}) 