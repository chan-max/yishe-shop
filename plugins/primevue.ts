import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Select from 'primevue/select'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Dialog from 'primevue/dialog'
import Card from 'primevue/card'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Calendar from 'primevue/calendar'
import MultiSelect from 'primevue/multiselect'
import SelectButton from 'primevue/selectbutton'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Slider from 'primevue/slider'
import Rating from 'primevue/rating'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Divider from 'primevue/divider'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import Tooltip from 'primevue/tooltip'
import ConfirmationService from 'primevue/confirmationservice'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true,
    unstyled: false,
    pt: {
      select: {
        root: { class: 'p-select' },
        label: { class: 'p-select-label' },
        trigger: { class: 'p-select-trigger' },
        panel: { class: 'p-select-panel' },
        items: { class: 'p-select-items' },
        item: { class: 'p-select-item' }
      }
    }
  })
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.use(ConfirmationService)

  // 注册组件
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('Dropdown', Dropdown)
  nuxtApp.vueApp.component('Select', Select)
  nuxtApp.vueApp.component('DataTable', DataTable)
  nuxtApp.vueApp.component('Column', Column)
  nuxtApp.vueApp.component('Toast', Toast)
  nuxtApp.vueApp.component('Dialog', Dialog)
  nuxtApp.vueApp.component('Card', Card)
  nuxtApp.vueApp.component('Menu', Menu)
  nuxtApp.vueApp.component('Menubar', Menubar)
  nuxtApp.vueApp.component('TabView', TabView)
  nuxtApp.vueApp.component('TabPanel', TabPanel)
  nuxtApp.vueApp.component('Calendar', Calendar)
  nuxtApp.vueApp.component('MultiSelect', MultiSelect)
  nuxtApp.vueApp.component('SelectButton', SelectButton)
  nuxtApp.vueApp.component('Checkbox', Checkbox)
  nuxtApp.vueApp.component('RadioButton', RadioButton)
  nuxtApp.vueApp.component('Slider', Slider)
  nuxtApp.vueApp.component('Rating', Rating)
  nuxtApp.vueApp.component('ProgressBar', ProgressBar)
  nuxtApp.vueApp.component('ProgressSpinner', ProgressSpinner)
  nuxtApp.vueApp.component('Divider', Divider)
  nuxtApp.vueApp.component('Avatar', Avatar)
  nuxtApp.vueApp.component('Badge', Badge)
  nuxtApp.vueApp.component('Tag', Tag)
  nuxtApp.vueApp.component('Chip', Chip)
  nuxtApp.vueApp.directive('tooltip', Tooltip)
}) 