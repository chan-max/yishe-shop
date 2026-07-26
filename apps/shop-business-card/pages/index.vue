<template>
  <div class="shop-a-landing bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- 顶部 Header Banner -->
      <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase">
          SHOP-A 独立风尚定制站
        </div>
        
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          灵感碰撞 · 私人专属设计
        </h1>
        
        <p class="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
          欢迎来到 Shop-A 独立站。这里拥有独立的专属页面与排版逻辑，同时无缝继承了底层强大的全量商品数据与交互接口。
        </p>

        <!-- 交互测试按钮 (测试继承自基底的 Toast 与 业务逻辑) -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button 
            type="button" 
            class="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition"
            @click="testToast"
          >
            测试共享 Toast 提示
          </button>
          
          <NuxtLink 
            to="/products" 
            class="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition"
          >
            浏览全量商品库
          </NuxtLink>

          <NuxtLink 
            to="/contact" 
            class="px-5 py-2.5 bg-gray-100 text-gray-800 text-sm font-semibold border border-gray-200 rounded-full hover:bg-gray-200 transition"
          >
            联系专属设计师
          </NuxtLink>
        </div>
      </div>

      <!-- 特色设计分类展示卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-2 hover:border-black transition">
          <div class="text-xs font-bold text-blue-600 uppercase tracking-wider">01 / 热门流派</div>
          <h3 class="text-lg font-bold text-gray-900">卡通与萌宠设计</h3>
          <p class="text-xs text-gray-500 leading-relaxed">
            针对地毯、抱枕、手机壳等家居与随身物品，支持基于原画私人定制同款。
          </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-2 hover:border-black transition">
          <div class="text-xs font-bold text-purple-600 uppercase tracking-wider">02 / 极客极简</div>
          <h3 class="text-lg font-bold text-gray-900">潮牌印花与服饰</h3>
          <p class="text-xs text-gray-500 leading-relaxed">
            卫衣、T恤、帽子与帆布包，高质量数码印花打样，3-5天快速发货。
          </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-2 hover:border-black transition">
          <div class="text-xs font-bold text-emerald-600 uppercase tracking-wider">03 / 1对1 沟通</div>
          <h3 class="text-lg font-bold text-gray-900">设计师私人定制</h3>
          <p class="text-xs text-gray-500 leading-relaxed">
            提供色彩排版修改、载体灵活替换服务，做成独一无二的专属版本。
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/use-toast'

useSeoMeta({
  title: '名片 · 高端商务名片与特种纸名片定制平台',
  ogTitle: '名片 · 高端商务名片与特种纸名片定制平台',
  description: '衣设名片工坊专注于高端商务名片定制、特种纸工艺名片与极简创意名片设计服务。',
  ogDescription: '专为企业精英与设计师打造的高端商务名片定制平台。'
});

useHead({
  title: '名片 · 高端商务名片与特种纸名片定制平台',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const toast = useToast()

const testToast = () => {
  toast.success('Shop-A 测试成功', '这是在 Shop-A 独立站调用的共享 Toast 组件！')
}
</script>
