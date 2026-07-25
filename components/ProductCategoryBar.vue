<template>
  <div class="product-category-bar w-full overflow-x-auto no-scrollbar py-2">
    <div class="flex items-center gap-2 min-w-max">
      <!-- 全部分类按键 -->
      <button
        type="button"
        class="px-4 py-2 text-xs font-medium rounded-full transition-all duration-200"
        :class="[
          !activeCategoryId && !activeKeyword
            ? 'bg-black text-white font-semibold'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
        @click="selectCategory(null)"
      >
        全部分类
      </button>

      <!-- 动态分类标签 -->
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        class="px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5"
        :class="[
          isCategoryActive(cat)
            ? 'bg-black text-white font-semibold'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
        @click="selectCategory(cat)"
      >
        <span>{{ cat.name }}</span>
        <span v-if="cat.enName" class="opacity-60 text-[10px] uppercase font-mono">
          {{ cat.enName }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductCategory, type ProductCategoryItem } from '~/composables/use-product-category'

const props = defineProps<{
  activeCategoryId?: string | null
  activeKeyword?: string | null
}>()

const emit = defineEmits<{
  (e: 'select', category: ProductCategoryItem | null): void
}>()

const { categories, fetchCategories } = useProductCategory()

onMounted(() => {
  fetchCategories()
})

const isCategoryActive = (cat: ProductCategoryItem) => {
  if (props.activeCategoryId && props.activeCategoryId === cat.id) return true
  if (props.activeKeyword) {
    const kw = props.activeKeyword.toLowerCase()
    if (cat.name.toLowerCase() === kw) return true
    if (cat.enName && cat.enName.toLowerCase() === kw) return true
  }
  return false
}

const selectCategory = (cat: ProductCategoryItem | null) => {
  emit('select', cat)
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
