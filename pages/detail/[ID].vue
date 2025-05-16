<script lang="ts" setup>
// 获取动态路由参数
const route = useRoute()
const ID = route.params.ID

// 这里可以根据 ID 去获取对应详情的数据
// 示例代码，模拟获取数据
const fetchDetailData = async (id) => {
  // 这里可以替换成实际的 API 请求
  return {
    title: `详情页面 ${id}`,
    content: `这是详情页面 ${id} 的内容`
  }
}

const detailData = ref(null)

onMounted(async () => {
  detailData.value = await fetchDetailData(ID)
})

// 设置页面元信息，使用和首页相同的布局
definePageMeta({
  layout: 'page'
})
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageHeader>
      <LayoutPageTitle :text="detailData?.title" class="capitalize" />
    </LayoutPageHeader>
    <LayoutPageSection>
      <p>{{ detailData?.content }}</p>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>