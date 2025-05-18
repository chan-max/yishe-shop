<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-05-17 05:43:26
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-05-17 07:05:51
 * @FilePath: /yishe-nuxt/pages/detail/[ID].vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
import { api } from '@/utils/api'
import { useUserStore } from '~/stores/user'

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

// 使用示例：
const response = await api.hello.get()

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