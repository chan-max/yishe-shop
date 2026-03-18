<script lang="ts" setup>
definePageMeta({ layout: 'page' })
useHead({
  title: '衣设服装设计 - 平台介绍',
  meta: [
    {
      name: 'description',
      content: '衣设是一个聚合服装设计作品、POD 商品分类、定制服务与工具模块的平台介绍页面。',
    },
  ],
})
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageHeader>
      <LayoutPageTitle text="关于我们" class="capitalize" />
    </LayoutPageHeader>
    <LayoutPageSection>
      <div class="prose dark:prose-invert max-w-none">
        <h2>服装设计与 POD 商品展示平台</h2>
        <p>衣设目前主要围绕以下几个方向整理平台内容：</p>
        <ul>
          <li>展示图案、服装与 POD 商品相关的设计作品</li>
          <li>按商品类型、风格方向和专题内容整理浏览入口</li>
          <li>提供定制设计服务说明与需求提交方式</li>
          <li>预留 AI 设计辅助工具的展示与接入位置</li>
        </ul>
        <p>进入平台后，你可以：</p>
        <ul>
          <li>查看精选作品、案例专题和商品分类</li>
          <li>了解不同类型的定制设计服务</li>
          <li>根据项目方向筛选更合适的内容入口</li>
          <li>持续关注后续开放的工具能力与功能模块</li>
        </ul>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
