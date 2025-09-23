<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-21 19:59:41
 * @FilePath: /yishe-nuxt/layouts/page.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="overflow-x-hidden min-h-screen bg-black">
    <LayoutPageNavbar />
    <LayoutPageContent>
      <slot />
    </LayoutPageContent>
    <LayoutPageFooter />

  </div>
</template>

<script setup>
const route = useRoute()

</script>

<style lang="scss">

</style>

