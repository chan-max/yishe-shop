<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-05-18 15:26:10
 * @FilePath: /yishe-nuxt/app.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
const { awesome } = useAppConfig();

// 在 app.vue 或 layout 文件中添加
useHead({
  title: "1s.design - 专业服装设计在线平台",
  meta: [
    {
      name: "description",
      content:
        "1s.design是专业的服装设计在线平台，提供服装设计作品展示、设计师交流、设计灵感获取等服务。",
    },
    {
      name: "keywords",
      content:
        "1s.design,服装设计,在线服装设计,服装设计师平台,服装设计作品集,服装设计灵感",
    },
    { property: "og:title", content: "1s.design - 专业服装设计在线平台" },
    {
      property: "og:description",
      content:
        "1s.design是专业的服装设计在线平台，提供服装设计作品展示、设计师交流、设计灵感获取等服务。",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://1s.design" },
    { name: "robots", content: "index,follow" },
  ],
})
</script>

<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
