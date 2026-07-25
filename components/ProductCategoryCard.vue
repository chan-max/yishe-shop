<template>
  <div class="product-category-card bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <img
          v-if="category.image"
          :src="category.image"
          :alt="category.name"
          class="w-16 h-16 object-cover rounded-xl border border-gray-100 flex-shrink-0"
        />
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <h3 class="text-xl font-bold text-gray-900 tracking-tight">{{ category.name }}</h3>
            <span v-if="category.enName" class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-mono rounded">
              {{ category.enName }}
            </span>
          </div>
          <p v-if="category.description" class="text-xs text-gray-500 leading-relaxed max-w-xl">
            {{ category.description }}
          </p>
        </div>
      </div>

      <NuxtLink
        v-if="category.name"
        :to="`/products/${encodeURIComponent(category.name)}`"
        class="inline-flex items-center justify-center px-4 py-2 bg-black text-white text-xs font-medium rounded-full hover:bg-gray-800 transition"
      >
        浏览该分类商品
      </NuxtLink>
    </div>

    <!-- 扩展分类信息 (POD优势 / 设计准则) -->
    <div v-if="category.podAdvantages || category.designGuidelines || category.features" class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-gray-100 text-xs">
      <div v-if="category.features" class="space-y-1 bg-gray-50 p-3 rounded-lg">
        <span class="font-bold text-gray-900">产品特点</span>
        <p class="text-gray-600 leading-relaxed">{{ category.features }}</p>
      </div>

      <div v-if="category.podAdvantages" class="space-y-1 bg-blue-50/60 p-3 rounded-lg">
        <span class="font-bold text-blue-900">POD 定制优势</span>
        <p class="text-blue-700 leading-relaxed">{{ category.podAdvantages }}</p>
      </div>

      <div v-if="category.designGuidelines" class="space-y-1 bg-amber-50/60 p-3 rounded-lg">
        <span class="font-bold text-amber-900">设计与印花准则</span>
        <p class="text-amber-700 leading-relaxed">{{ category.designGuidelines }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCategoryItem } from '~/composables/use-product-category'

defineProps<{
  category: ProductCategoryItem
}>()
</script>
