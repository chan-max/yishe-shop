<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { api } from '~/utils/api'
import { usePublicUserStore } from '~/stores/public-user'
import { useToast } from '~/composables/use-toast'

definePageMeta({ layout: 'page' })

const toast = useToast()
const router = useRouter()
const publicUserStore = usePublicUserStore()

useHead({
  titleTemplate: '',
  title: '我的收藏 - 衣设 yishe',
  meta: [
    { name: 'description', content: '查看和管理收藏的 POD 印花、定制商品和创意设计资源。' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})

const currentPage = ref<number>(1)
const pageSize = ref<number>(20)
const loading = ref<boolean>(false)
const favoriteList = ref<any[]>([])
const total = ref<number>(0)

const isLoggedIn = computed(() => publicUserStore.isLoggedIn)

const fetchFavorites = async () => {
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }

  loading.value = true
  try {
    const response = await api.favorite.getMyFavorites({
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      includeProduct: true,
    })

    if (response.code === 0 || response.status === true || response.code === 200) {
      favoriteList.value = response.data?.list || []
      total.value = response.data?.total || 0
    } else {
      favoriteList.value = []
      total.value = 0
      toast.error(response.message || '获取收藏列表失败')
    }
  } catch (error: any) {
    favoriteList.value = []
    total.value = 0
    if (error.code === 401 || error.statusCode === 401) {
      publicUserStore.clearToken()
      toast.error('登录已过期，请重新登录')
      router.push('/login')
    } else {
      toast.error(error.message || '获取收藏列表失败')
    }
  } finally {
    loading.value = false
  }
}

const removeFavorite = async (productId: string, favoriteId: number) => {
  const confirmed = window.confirm('确定要取消收藏这个商品吗？')
  if (!confirmed) return

  favoriteList.value = favoriteList.value.filter(item => item.id !== favoriteId)
  total.value = Math.max(0, total.value - 1)

  try {
    const response = await api.favorite.remove(productId)
    if (response.code !== 0 && response.status !== true && response.code !== 200) {
      await fetchFavorites()
      toast.error(response.message || '取消收藏失败')
    } else {
      toast.success('已取消收藏')
    }
  } catch (error: any) {
    await fetchFavorites()
    if (error.code === 401 || error.statusCode === 401) {
      publicUserStore.clearToken()
      toast.error('登录已过期，请重新登录')
      router.push('/login')
    } else {
      toast.error(error.message || '取消收藏失败')
    }
  }
}

const goToProductDetail = (productId: string) => {
  navigateTo(`/product/${productId}`)
}

const getProductImage = (product: any) => {
  if (!product || !product.product) return null
  if (Array.isArray(product.product.images) && product.product.images.length > 0) {
    const validImage = product.product.images.find((img: any) => img && typeof img === 'string' && img.trim() !== '' && img.startsWith('http'))
    if (validImage) return validImage
  }
  return null
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.opacity = '0'
  const parent = img.parentElement
  if (parent) {
    const placeholder = parent.querySelector('.image-placeholder') as HTMLElement
    if (placeholder) placeholder.style.display = 'flex'
  }
}

const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.opacity = '1'
  const parent = img.parentElement
  if (parent) {
    const placeholder = parent.querySelector('.image-placeholder') as HTMLElement
    if (placeholder) placeholder.style.display = 'none'
  }
}

const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const pageNumbers = computed(() => {
  const pages: number[] = []
  const maxPages = 7
  const current = currentPage.value
  const totalCount = totalPages.value

  if (totalCount <= maxPages) {
    for (let i = 1; i <= totalCount; i += 1) pages.push(i)
  } else {
    let start = Math.max(1, current - Math.floor(maxPages / 2))
    let end = Math.min(totalCount, start + maxPages - 1)
    if (end - start < maxPages - 1) start = Math.max(1, end - maxPages + 1)
    for (let i = start; i <= end; i += 1) pages.push(i)
  }

  return pages
})

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchFavorites()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }
  fetchFavorites()
})
</script>

<template>
  <div class="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1240px]">
      <div>
        <div class="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400">收藏夹</div>
        <h1 class="mt-3 text-[28px] font-black uppercase leading-none text-stone-950">已收藏商品</h1>
        <p class="mt-2 text-[13px] leading-6 text-stone-500">查看和管理你保存过的 POD 商品、印花图案和定制灵感。</p>
      </div>

      <div class="mt-8 rounded-[20px] border border-stone-200 bg-white p-4 sm:p-5 lg:p-6">
        <div v-if="loading" class="space-y-3">
          <div v-for="i in 6" :key="i" class="grid gap-3 rounded-[1rem] border border-stone-100 p-3 sm:grid-cols-[120px_1fr]">
            <div class="aspect-[4/3] animate-pulse rounded-[0.9rem] bg-stone-100"></div>
            <div class="space-y-2 py-1">
              <div class="h-3 w-24 animate-pulse rounded bg-stone-100"></div>
              <div class="h-4 w-1/2 animate-pulse rounded bg-stone-100"></div>
              <div class="h-3 w-full animate-pulse rounded bg-stone-100"></div>
              <div class="h-3 w-2/3 animate-pulse rounded bg-stone-100"></div>
            </div>
          </div>
        </div>

        <div v-else-if="favoriteList.length > 0" class="space-y-3">
          <article v-for="favorite in favoriteList" :key="favorite.id" class="group grid gap-4 rounded-[20px] border border-stone-100 p-3 transition duration-200 hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm sm:grid-cols-[120px_1fr] md:grid-cols-[140px_1fr]">
            <div class="cursor-pointer overflow-hidden rounded-[18px] bg-stone-100" @click="goToProductDetail(favorite.productId)">
              <div class="relative aspect-[4/3]">
                <template v-if="getProductImage(favorite)">
                  <img :src="getProductImage(favorite)" :alt="favorite.product?.name || '商品图片'" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" @error="handleImageError($event)" @load="handleImageLoad" />
                  <div class="image-placeholder absolute inset-0 hidden items-center justify-center bg-stone-100 text-[12px] text-stone-400">暂无图片</div>
                </template>
                <div v-else class="absolute inset-0 flex items-center justify-center text-[12px] text-stone-400">暂无图片</div>
              </div>
            </div>

            <div class="flex min-w-0 flex-col justify-between">
              <div>
                <h3 class="mt-2 cursor-pointer text-[15px] font-medium leading-6 text-stone-900 transition duration-200 group-hover:text-stone-700" @click="goToProductDetail(favorite.productId)">
                  {{ favorite.product?.name }}
                </h3>
                <p v-if="favorite.product?.description" class="mt-2 line-clamp-2 cursor-pointer text-[12px] leading-6 text-stone-500 transition duration-200 group-hover:text-stone-600" @click="goToProductDetail(favorite.productId)">
                  {{ favorite.product.description }}
                </p>
              </div>

              <div class="mt-4 flex flex-col gap-3 border-t border-stone-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <span class="text-[11px] text-stone-400">收藏于 {{ new Date(favorite.createTime).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                <div class="flex gap-2">
                  <button class="rounded-xl border border-stone-200 px-4 py-2 text-[12px] text-stone-600 transition duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600" @click="removeFavorite(favorite.productId, favorite.id)">
                    取消收藏
                  </button>
                  <button class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition duration-200" @click="goToProductDetail(favorite.productId)">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="py-20 text-center">
          <Icon name="heroicons:heart" class="mx-auto h-12 w-12 text-stone-300" />
          <p class="mt-4 text-[13px] text-stone-500">暂无收藏</p>
          <NuxtLink to="/products" class="ys-action-btn mt-5 inline-flex rounded-xl px-5 py-3 text-[12px] transition duration-200">
            去逛逛
          </NuxtLink>
        </div>

        <div v-if="!loading && favoriteList.length > 0" class="mt-8 flex flex-col items-center gap-4 border-t border-stone-100 pt-6">
          <div class="text-[11px] text-stone-400">共 {{ total }} 件收藏，第 {{ currentPage }} / {{ totalPages }} 页</div>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1" class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition duration-200 disabled:opacity-35 disabled:hover:border-stone-200 disabled:hover:bg-transparent disabled:hover:text-stone-600">
              上一页
            </button>
            <button v-if="pageNumbers[0] > 1" @click="handlePageChange(1)" class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition duration-200">1</button>
            <span v-if="pageNumbers[0] > 2" class="px-1 text-stone-300">...</span>
            <button v-for="page in pageNumbers" :key="page" @click="handlePageChange(page)" :class="['rounded-xl px-4 py-2 text-[12px] transition duration-200', currentPage === page ? 'ys-action-btn-active' : 'ys-action-btn']">
              {{ page }}
            </button>
            <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="px-1 text-stone-300">...</span>
            <button v-if="pageNumbers[pageNumbers.length - 1] < totalPages" @click="handlePageChange(totalPages)" class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition duration-200">{{ totalPages }}</button>
            <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages" class="ys-action-btn rounded-xl px-4 py-2 text-[12px] transition duration-200 disabled:opacity-35 disabled:hover:border-stone-200 disabled:hover:bg-transparent disabled:hover:text-stone-600">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

button:focus-visible,
a:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(28, 25, 23, 0.08);
}
</style>
