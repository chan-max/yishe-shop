<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-06-16 23:15:17
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

<style lang="scss">

// 注册字体
@font-face {
  font-family: 'main';
  src: url('/main2.ttf?v=' + var(--version)) format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'logo';
  src: url('/logo.ttf?v=' + var(--version)) format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

// 全局字体设置
:root {
  --version: '1.0.0';
  font-family: 'main', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

</style>

