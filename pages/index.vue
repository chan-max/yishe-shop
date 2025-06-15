<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-15 15:05:54
 * @FilePath: /yishe-nuxt/pages/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
const { awesome } = useAppConfig()
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: awesome?.name || '衣设服装设计' })

</script>

<template>
  <AwesomeWelcome :with-alert="true" />
</template>
