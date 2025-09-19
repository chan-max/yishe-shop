<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-09-18 21:32:42
 * @FilePath: /yishe-nuxt/pages/search/index.vue
 * @Description: 搜索页面主入口 - 智能搜索和筛选
-->
<script lang="ts" setup>

// 导入搜索页面组件
import SearchPage from './components/SearchPage.vue'

// 设置页面标题
useHead({
  titleTemplate: '',
  title: '搜索 - 衣设服装设计',
  meta: [
    {
      name: 'description',
      content: '在衣设服装设计平台搜索您想要的服装设计，支持智能筛选和个性化推荐。'
    }
  ]
})
</script>

<template>
  <SearchPage />
</template>
