<script lang="ts" setup>
definePageMeta({ layout: 'page' })
useHead({
  title: '衣设服装设计 - 开放式的创意服装社区',
  meta: [
    {
      name: 'description',
      content: '衣设是一个开放式的创意服装设计平台，汇聚全球设计师的创意灵感，连接设计师与品牌，打造最具创意的服装设计社区。',
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
        <h2>最具创意的开放式服装设计平台</h2>
        <p>衣设是一个开放式的创意服装设计平台，我们致力于：</p>
        <ul>
          <li>汇聚全球设计师的创意灵感</li>
          <li>连接设计师与品牌</li>
          <li>打造最具创意的服装设计社区</li>
          <li>推动服装设计行业的创新发展</li>
        </ul>
        <p>在这里，你可以：</p>
        <ul>
          <li>展示你的设计作品</li>
          <li>获取设计灵感</li>
          <li>与同行交流经验</li>
          <li>寻找商业合作机会</li>
        </ul>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
