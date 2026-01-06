<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-04-03 05:45:40
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-12-21 01:39:43
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

// 全局 SEO 配置 - 使用 @nuxtjs/seo 提供的 composables
useSeoMeta({
  title: "衣设服装设计 - 创意印花图案与服装设计平台",
  description: "衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。",
  keywords: "衣设服装设计,创意印花,图案设计,服装设计,服装设计师平台,服装设计作品集,服装设计灵感,印花图案,时尚设计,服装设计服务,设计师社区",
  author: "衣设设计团队",
  language: "zh-CN",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  
  // Open Graph
  ogTitle: "衣设服装设计 - 创意印花图案与服装设计平台",
  ogDescription: "衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感，提供服装设计作品展示、设计师交流、设计灵感获取等服务。",
  ogType: "website",
  ogUrl: "https://1s.design",
  ogImage: "https://1s.design/logo/logo.svg",
  ogSiteName: "衣设服装设计",
  ogLocale: "zh_CN",
  
  // Twitter Card
  twitterCard: "summary_large_image",
  twitterTitle: "衣设服装设计 - 创意印花图案与服装设计平台",
  twitterDescription: "衣设是一个专注于创意印花图案和服装设计的专业平台，汇聚全球设计师的创意灵感。",
  twitterImage: "https://1s.design/logo/logo.svg",
  
  // 其他 SEO 标签
  "theme-color": "#000000",
  "apple-mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "black-translucent",
})

// 额外的 head 配置
useHead({
  htmlAttrs: {
    lang: 'zh-CN',
  },
  link: [
    { rel: 'canonical', href: 'https://1s.design' },
  ],
})
</script>

<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-900 bg-white"
  >
    <!-- 页面加载进度条 -->
    <NuxtLoadingIndicator 
      color="#3b82f6" 
      height="3" 
      :throttle="200"
    />
    
    <NuxtLayout>
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

/* 自定义 NuxtLoadingIndicator 进度条样式 */
#nuxt-loading-indicator {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899) !important;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 5px rgba(59, 130, 246, 0.3) !important;
}
</style>