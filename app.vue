<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-11-08 12:57:53
 * @FilePath: /yishe-nuxt/app.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import { useToast } from '~/composables/use-toast'

const { awesome } = useAppConfig();
const toast = useToast()

// 使用 computed 解包 ref，确保传递的是值而不是 ref 对象
const toastType = computed(() => toast.toastType.value)
const toastTitle = computed(() => toast.toastTitle.value)
const toastText = computed(() => toast.toastText.value)
const toastDuration = computed(() => toast.toastDuration.value)
const showToast = computed({
  get: () => toast.showToast.value,
  set: (val) => { toast.showToast.value = val }
})

// 在 app.vue 或 layout 文件中添加
useHead({
  title: "衣设服装设计 - 创意印花图案与服装设计平台",
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes",
    },
    {
      name: "description",
      content:
        "衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。",
    },
    
    {
      name: "keywords",
      content:
        "衣设服装设计,创意印花,图案设计,服装设计,服装设计师平台,服装设计作品集,服装设计灵感,印花图案,时尚设计",
    },
    { property: "og:title", content: "衣设服装设计 - 创意印花图案与服装设计平台" },
    {
      property: "og:description",
      content:
        "衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://1s.design" },
    { name: "robots", content: "index,follow" },
  ],
})
</script>

<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-900 bg-white"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
    
    <!-- 全局 Toast 消息提示 -->
    <AwesomeToast
      :type="toastType"
      :title="toastTitle"
      :text="toastText"
      :duration="toastDuration"
      v-model:show="showToast"
    />
  </Body>
</template>


<style>
/* 字体声明 */
@font-face {
  font-family: 'main';
  src: url('/main2.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'logo';
  src: url('/logo.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* 全局字体设置 */
:root {
  --version: '1.0.0';
  font-family: 'main', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* 添加测试类 */
.test-font {
  font-family: 'main', sans-serif;
  font-size: 24px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
} 
</style>