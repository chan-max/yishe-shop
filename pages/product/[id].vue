<template>
  <div class="min-h-screen bg-[#f7f5f2] px-4 py-8 sm:px-6 lg:px-8">
    <div v-if="loading" class="flex min-h-[60vh] items-center justify-center">
      <div class="text-center">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-stone-200 border-t-stone-900"></div>
        <p class="mt-4 text-[12px] text-stone-500">加载中...</p>
      </div>
    </div>

    <div v-else-if="product" class="mx-auto max-w-[1560px]">
      <div class="mb-6 flex items-center justify-between gap-4">
        <BaseButton variant="ghost" size="sm" class="!px-0 !text-[12px] hover:!bg-transparent" @click="router.back()">
          <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </template>
          返回
        </BaseButton>
        <div v-if="favoriteCount !== null" class="text-[11px] text-stone-400">{{ favoriteCount }} 人收藏了此商品</div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section class="rounded-[1.5rem] border border-stone-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 sm:p-5">
          <div class="group relative overflow-hidden rounded-[1.1rem] bg-[#f6f4f1]">
            <button v-if="productImages.length > 1" class="absolute left-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/96 text-stone-600 shadow-[0_8px_18px_rgba(28,25,23,0.05)] transition duration-200 hover:-translate-y-1 hover:scale-105 hover:border-stone-900 hover:bg-stone-900 hover:text-white active:translate-y-0" @click="previousImage" aria-label="上一张图片">
              <Icon name="heroicons:chevron-left" class="h-4 w-4" />
            </button>
            <button v-if="productImages.length > 1" class="absolute right-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white/96 text-stone-600 shadow-[0_8px_18px_rgba(28,25,23,0.05)] transition duration-200 hover:-translate-y-1 hover:scale-105 hover:border-stone-900 hover:bg-stone-900 hover:text-white active:translate-y-0" @click="nextImage" aria-label="下一张图片">
              <Icon name="heroicons:chevron-right" class="h-4 w-4" />
            </button>

            <div class="product-image-container">
              <transition :name="`slide-${slideDirection}`">
                <img v-if="currentImage" :key="currentImage" :src="currentImage" :alt="product.name" class="product-main-image cursor-pointer transition duration-500 group-hover:scale-[1.03]" @error="handleImageError" @click="openImagePreview" />
                <div v-else key="no-image" class="flex h-full w-full items-center justify-center text-[12px] text-stone-400">暂无图片</div>
              </transition>
            </div>
          </div>

          <div v-if="productImages.length > 1" class="mt-4 flex flex-wrap gap-2">
            <button v-for="(img, index) in productImages" :key="index" class="overflow-hidden rounded-[0.9rem] border bg-white p-0.5 transition duration-200 hover:-translate-y-0.5" :class="currentImageIndex === index ? 'border-stone-900 shadow-[0_10px_20px_rgba(28,25,23,0.08)]' : 'border-stone-200 hover:border-stone-300'" @click="currentImageIndex = index">
              <img :src="img" :alt="`${product.name}-${index + 1}`" class="h-16 w-16 object-cover transition duration-300 hover:scale-[1.06] sm:h-20 sm:w-20" />
            </button>
          </div>
        </section>

        <section class="rounded-[1.5rem] border border-stone-200 bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 sm:p-7">
          <div class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Product Detail</div>
          <div class="mt-3 flex items-start justify-between gap-4">
            <h1 class="text-[28px] font-semibold leading-tight text-stone-950 sm:text-[34px]">{{ product.name }}</h1>
            <FavoriteButton :is-favorite="isFavorite" :count="favoriteCount" :show-count="false" @click="toggleFavorite" />
          </div>

          <p v-if="product.description" class="mt-4 text-[13px] leading-7 text-stone-500">{{ product.description }}</p>
          <div v-if="product.createTime" class="mt-4 text-[11px] text-stone-400">{{ formatDate(product.createTime) }}</div>

          <div class="mt-6 grid gap-4 border-t border-stone-100 pt-6 sm:grid-cols-2">
            <div v-if="product.code" class="rounded-[1rem] bg-[#faf8f5] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-[#f6f2eb]">
              <div class="text-[10px] uppercase tracking-[0.2em] text-stone-400">产品代码</div>
              <p class="mt-2 text-[13px] text-stone-900">{{ product.code }}</p>
            </div>

            <div v-if="productKeywords.length > 0" class="rounded-[1rem] bg-[#faf8f5] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-[#f6f2eb] sm:col-span-2">
              <div class="text-[10px] uppercase tracking-[0.2em] text-stone-400">关键词</div>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="keyword in productKeywords" :key="keyword" class="rounded-full border border-stone-200 px-3 py-1 text-[11px] text-stone-500 transition duration-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white">
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-3 border-t border-stone-100 pt-6">
            <BaseButton variant="secondary" size="sm" class="!text-[12px]" @click="copyLink">
              <template #prefix><Icon name="heroicons:link" class="h-4 w-4" /></template>
              复制链接
            </BaseButton>
            <BaseButton variant="secondary" size="sm" class="!text-[12px]" @click="shareProduct">
              <template #prefix><Icon name="heroicons:share" class="h-4 w-4" /></template>
              分享
            </BaseButton>
          </div>
        </section>
      </div>
    </div>

    <div v-else class="flex min-h-[60vh] items-center justify-center">
      <div class="rounded-[1.5rem] border border-stone-200 bg-white px-8 py-10 text-center">
        <Icon name="heroicons:exclamation-triangle" class="mx-auto h-12 w-12 text-stone-300" />
        <h3 class="mt-4 text-[18px] font-medium text-stone-900">商品不存在</h3>
        <p class="mt-2 text-[13px] text-stone-500">抱歉，您查找的商品不存在或已被删除。</p>
        <BaseButton variant="primary" class="mt-6 !text-[12px]" @click="router.push('/products')">返回商品列表</BaseButton>
      </div>
    </div>

    <ImagePreview v-model="isPreviewOpen" :images="productImages" :initial-index="currentImageIndex" :alt="product?.name || '商品图片'" :z-index="9999" @image-change="handlePreviewImageChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { api } from '~/utils/api'
import ImagePreview from '../components/ImagePreview.vue'
import FavoriteButton from '~/components/FavoriteButton.vue'
import { usePublicUserStore } from '~/stores/public-user'
import { useToast } from '~/composables/use-toast'
import { usePageSEO, useProductStructuredData } from '~/composables/use-seo'

const toast = useToast()

definePageMeta({ layout: 'page' })

const route = useRoute()
const router = useRouter()
const publicUserStore = usePublicUserStore()

usePageSEO({
  title: '商品详情 - 衣设服装设计',
  description: '查看商品详情，发现更多创意设计作品',
  url: `https://1s.design/product/${route.params.id}`,
  type: 'product',
})

const loading = ref(true)
const product = ref<any>(null)
const currentImageIndex = ref(0)
const isPreviewOpen = ref(false)
const isFavorite = ref(false)
const favoriteCount = ref<number | null>(null)
const slideDirection = ref<'next' | 'prev'>('next')

const productImages = computed(() => {
  if (!product.value) return []
  const images: string[] = []
  if (product.value.images && Array.isArray(product.value.images)) {
    product.value.images.forEach((url: string) => {
      if (url && typeof url === 'string' && url.trim() && url.startsWith('http')) images.push(url)
    })
  }
  return images
})

const currentImage = computed(() => {
  if (productImages.value.length === 0) return null
  return productImages.value[currentImageIndex.value] || productImages.value[0]
})

const productKeywords = computed(() => {
  if (!product.value?.keywords) return []
  return product.value.keywords.split(',').map((k: string) => k.trim()).filter((k: string) => k.length > 0)
})

const hasPreviousProduct = computed(() => false)
const hasNextProduct = computed(() => false)
const isLoggedIn = computed(() => publicUserStore.isLoggedIn)

const fetchProductDetail = async () => {
  loading.value = true
  try {
    const response = await api.productList.getById(route.params.id, false)
    if (response.code === 0 || response.status === true || response.code === 200) {
      product.value = response.data
      currentImageIndex.value = 0
      await Promise.all([checkFavoriteStatus(), fetchFavoriteCount()])
    } else {
      product.value = null
    }
  } catch (error) {
    console.error('获取商品详情失败:', error)
    product.value = null
  } finally {
    loading.value = false
  }
}

const checkFavoriteStatus = async () => {
  if (!isLoggedIn.value || !product.value?.id) return
  try {
    const response = await api.favorite.check(product.value.id)
    if (response.code === 0 || response.status === true || response.code === 200) {
      isFavorite.value = response.data === true
    }
  } catch (error) {
    console.error('检查收藏状态失败:', error)
  }
}

const fetchFavoriteCount = async () => {
  if (!product.value?.id) return
  try {
    const response = await api.favorite.getProductCount(product.value.id)
    if (response.code === 0 || response.status === true || response.code === 200) {
      favoriteCount.value = response.data
    }
  } catch (error) {
    console.error('获取收藏数量失败:', error)
  }
}

const toggleFavorite = async () => {
  if (!product.value?.id) return
  if (!isLoggedIn.value) {
    router.push('/login')
    return
  }

  const previousFavoriteState = isFavorite.value
  const previousCount = favoriteCount.value
  isFavorite.value = !isFavorite.value

  if (isFavorite.value) {
    favoriteCount.value = favoriteCount.value !== null ? favoriteCount.value + 1 : 1
  } else if (favoriteCount.value !== null && favoriteCount.value > 0) {
    favoriteCount.value -= 1
  }

  try {
    if (previousFavoriteState) {
      const response = await api.favorite.remove(product.value.id)
      if (response.code !== 0 && response.status !== true && response.code !== 200) {
        isFavorite.value = previousFavoriteState
        favoriteCount.value = previousCount
        toast.error(response.message || '取消收藏失败')
      }
    } else {
      const response = await api.favorite.create({ productId: product.value.id })
      if (response.code !== 0 && response.status !== true && response.code !== 200) {
        isFavorite.value = previousFavoriteState
        favoriteCount.value = previousCount
        if (response.code === 409) toast.warning('该商品已收藏')
        else toast.error(response.message || '收藏失败')
      }
    }
  } catch (error: any) {
    isFavorite.value = previousFavoriteState
    favoriteCount.value = previousCount
    if (error.code === 401 || error.statusCode === 401) {
      publicUserStore.clearToken()
      toast.error('登录已过期，请重新登录')
      router.push('/login')
    } else if (error.code === 500 || error.statusCode === 500) {
      toast.error(error.message || '服务器错误，请稍后重试')
    } else {
      toast.error(error.message || '操作失败，请稍后重试')
    }
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

const previousImage = () => {
  if (productImages.value.length > 0) {
    slideDirection.value = 'prev'
    currentImageIndex.value = (currentImageIndex.value - 1 + productImages.value.length) % productImages.value.length
  }
}

const nextImage = () => {
  if (productImages.value.length > 0) {
    slideDirection.value = 'next'
    currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length
  }
}

const copyLink = async () => {
  try {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    toast.success('复制成功', '链接已复制到剪贴板')
  } catch (error) {
    console.error('复制链接失败:', error)
  }
}

const shareProduct = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.value?.name || '商品详情',
        text: product.value?.description || '',
        url: window.location.href,
      })
    } catch (error) {
      console.error('分享失败:', error)
    }
  } else {
    copyLink()
  }
}

const navigateToPrevious = () => {}
const navigateToNext = () => {}

const openImagePreview = () => {
  if (productImages.value.length === 0) return
  isPreviewOpen.value = true
}

const handlePreviewImageChange = (index: number) => {
  currentImageIndex.value = index
}

watch(() => product.value, (newProduct) => {
  if (newProduct) {
    const productImage = productImages.value[0] || 'https://1s.design/logo/logo.svg'
    const productUrl = `https://1s.design/product/${newProduct.id}`
    const productDescription = newProduct.description || newProduct.name || '查看商品详情'

    usePageSEO({
      title: `${newProduct.name || '商品详情'} - 衣设服装设计`,
      description: productDescription,
      keywords: productKeywords.value.join(',') || '服装设计,创意印花,图案设计',
      image: productImage,
      url: productUrl,
      type: 'product',
      structuredData: useProductStructuredData({
        name: newProduct.name || '商品',
        description: productDescription,
        image: productImage,
        url: productUrl,
        category: '创意商品',
      }),
    })
  }
}, { immediate: true })

watch(() => route.params.id, () => {
  if (route.params.id) fetchProductDetail()
}, { immediate: true })
</script>

<style scoped>
.product-image-container {
  position: relative;
  aspect-ratio: 1 / 1;
}

.product-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<style scoped>
.product-image-container {
  width: 100%;
  min-height: 480px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}

.product-image-container > * {
  grid-area: 1 / 1;
  max-width: 100%;
  max-height: 100%;
}

.product-main-image {
  width: auto;
  height: auto;
  max-height: 72vh;
  max-width: 100%;
  display: block;
  object-fit: contain;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.25s ease-in-out;
}

.slide-next-enter-from { transform: translateX(100%); }
.slide-next-enter-to { transform: translateX(0%); }
.slide-next-leave-from { transform: translateX(0%); }
.slide-next-leave-to { transform: translateX(-100%); }
.slide-prev-enter-from { transform: translateX(-100%); }
.slide-prev-enter-to { transform: translateX(0%); }
.slide-prev-leave-from { transform: translateX(0%); }
.slide-prev-leave-to { transform: translateX(100%); }
</style>
