import { ref, computed } from 'vue'
import { api } from '~/utils/api'

export interface ProductCategoryItem {
  id: string
  name: string
  enName?: string
  features?: string
  podAdvantages?: string
  designGuidelines?: string
  description?: string
  image?: string
  isActive?: boolean
}

const categories = ref<ProductCategoryItem[]>([])
const loaded = ref(false)
const loading = ref(false)

export function useProductCategory() {
  const fetchCategories = async (force = false) => {
    if (loaded.value && !force) return categories.value
    loading.value = true
    try {
      const res = await api.productCategory.getAll()
      if (res && res.data && Array.isArray(res.data)) {
        categories.value = res.data.filter((cat) => cat.isActive !== false)
        loaded.value = true
      }
    } catch (err) {
      console.warn('[useProductCategory] Error fetching product categories:', err)
    } finally {
      loading.value = false
    }
    return categories.value
  }

  const categoryMap = computed(() => {
    const map = new Map<string, ProductCategoryItem>()
    categories.value.forEach((cat) => {
      if (cat.id) map.set(cat.id, cat)
      if (cat.name) map.set(cat.name.toLowerCase(), cat)
      if (cat.enName) map.set(cat.enName.toLowerCase(), cat)
    })
    return map
  })

  return {
    categories,
    loading,
    loaded,
    fetchCategories,
    categoryMap,
  }
}
