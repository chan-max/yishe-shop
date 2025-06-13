<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-02 10:07:16
 * @FilePath: /yishe-nuxt/layouts/page.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="overflow-x-hidden">
    <LayoutPageNavbar />
    <LayoutPageContent>
      <slot />
    </LayoutPageContent>
    <LayoutPageFooter class="h-[52px] md:h-[42px]" />
  </div>
</template>

<script setup>
</script>

<style>

@font-face {
  font-family: 'ChillRound';
  src: url('/ChillRoundM.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* 使用示例 */
.font-1 {
  font-family: 'ChillRound', sans-serif;
}
</style>
