<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { api } from '../utils/api'
import { getPreviewImageUrl } from '../utils/image'

definePageMeta({ layout: 'page' })

usePageSEO({
  title: '衣设服装设计 - 创意 POD 产品设计与分享平台',
  description: '衣设聚合创意图案、服装与 POD 商品设计，让设计师在更克制简约的品牌界面里展示作品、分享灵感并完成商品化表达。',
  keywords: 'POD设计,创意印花,服装设计,图案设计,设计分享,设计师社区,商品设计,视觉品牌',
  url: 'https://1s.design',
  type: 'website',
  structuredData: [useWebsiteStructuredData(), useOrganizationStructuredData()],
})

type FeaturedProduct = {
  id: string
  title: string
  description?: string
  category: string
  image: string
  imageUrl?: string
}

const categoryPills = ['印花图案', '服装设计', '包装与周边', '品牌视觉', '艺术家联名']
const impactStats = [
  { value: '15K+', label: '设计作品' },
  { value: '8K+', label: '创作者' },
  { value: '70+', label: '覆盖地区' },
  { value: '3M+', label: '月度浏览' },
]
const storySteps = [
  { step: '01', title: '发现灵感', description: '从创意图案、系列视觉到服装方向，先建立内容气质。' },
  { step: '02', title: '完成商品化', description: '把设计自然延展到 POD 商品、包装和展示场景。' },
  { step: '03', title: '持续分享', description: '让作品被收藏、被转发，也被看作一个完整品牌表达。' },
]
const businessModules = [
  {
    title: '灵感发现与作品分享',
    text: '把作品集、系列视觉和收藏流组织成更完整的内容入口，让平台先具备社区和分享价值。',
    action: '进入作品集',
    to: '/portfolio',
  },
  {
    title: '个性化定制设计',
    text: '围绕品牌首发、主题企划和艺术家联名，先做成可配置、可预览的服务工作台。',
    action: '配置定制需求',
    to: '/design',
  },
  {
    title: 'AI 设计实验室',
    text: '预留 AI moodboard、图案延展、详情页排版等能力，让未来服务升级有清晰承接面。',
    action: '查看 AI 模块',
    to: '/ai-lab',
  },
]
const personalizedModes = [
  { name: '品牌冷启动', detail: '适合从 0 到 1 的系列与商品首发。' },
  { name: '节日主题企划', detail: '强调速度、传播与陈列统一。' },
  { name: '创作者联名', detail: '把艺术语言延展为可售卖周边。' },
]
const futureSignals = [
  { title: '智能 brief', desc: '把用户输入自动整理成设计任务摘要。' },
  { title: '风格推演', desc: '从关键词生成 moodboard 与色板结构。' },
  { title: '商品映射', desc: '自动推导哪些图案适合哪些 POD SKU。' },
]
const podCategories = [
  { name: 'T 恤 / 卫衣', count: '120+', image: '/discovery/pod-tee.svg', keyword: 'T恤', use: '服装印花', audience: '大众服饰', tone: 'soft' },
  { name: '马克杯 / 水杯', count: '86+', image: '/discovery/pod-mug.svg', keyword: '杯子', use: '礼品周边', audience: '礼赠用户', tone: 'dark' },
  { name: '托特包 / 帆布包', count: '74+', image: '/discovery/pod-bag.svg', keyword: '帆布包', use: '日常配件', audience: '通勤人群', tone: 'line' },
  { name: '手机壳', count: '68+', image: '/discovery/pod-phone.svg', keyword: '手机壳', use: '快消爆款', audience: '年轻用户', tone: 'soft' },
  { name: '抱枕 / 家居布艺', count: '58+', image: '/discovery/pod-pillow.svg', keyword: '抱枕', use: '家居陈列', audience: '家居用户', tone: 'line' },
  { name: '挂毯 / 墙面装饰', count: '42+', image: '/discovery/pod-tapestry.svg', keyword: '挂毯', use: '空间装饰', audience: '生活方式', tone: 'dark' },
  { name: '毛巾 / 织物', count: '35+', image: '/discovery/pod-pillow.svg', keyword: '毛巾', use: '生活方式', audience: '家庭用户', tone: 'soft' },
  { name: '鼠标垫 / 办公周边', count: '29+', image: '/discovery/pod-phone.svg', keyword: '鼠标垫', use: '办公礼赠', audience: '办公人群', tone: 'line' },
]
const styleBoards = [
  { name: '极简高级', image: '/discovery/pod-tee.svg', keyword: '极简', note: '留白、克制、品牌感' },
  { name: '日系留白', image: '/discovery/pod-mug.svg', keyword: '日系', note: '柔和、安静、生活化' },
  { name: '街头潮流', image: '/discovery/pod-bag.svg', keyword: '街头', note: '符号化、视觉冲击' },
  { name: '轻奢礼赠', image: '/discovery/pod-phone.svg', keyword: '轻奢', note: '精致、礼盒、节庆' },
  { name: '可爱治愈', image: '/discovery/pod-pillow.svg', keyword: '可爱', note: '插画感、软萌、温和' },
  { name: '户外自然', image: '/discovery/pod-tapestry.svg', keyword: '户外', note: '自然、露营、旅行' },
]
const hotKeywords = ['联名系列', '新中式图案', '法式花卉', '宠物周边', '情侣礼物', '露营风', '国潮插画', '节日限定', '品牌首发', '艺术家合作', '文创礼盒', 'ins 家居']
const audiences = [
  { name: '品牌主理人', desc: '找适合首发与联名的 POD 商品结构', keywords: ['品牌首发', '联名系列'] },
  { name: '插画师 / 创作者', desc: '把个人视觉语言延展到可售卖周边', keywords: ['艺术家合作', '文创礼盒'] },
  { name: '礼赠采购 / 活动方', desc: '更关注节日礼盒、伴手礼、活动周边', keywords: ['节日限定', '情侣礼物'] },
  { name: '个人消费者', desc: '直接找适合自己审美的图案与商品', keywords: ['法式花卉', 'ins 家居'] },
]
const useCases = [
  { title: '想快速找能做 POD 的商品', text: '先看产品分类，再进入对应商品详情或灵感结果。', action: '浏览商品分类', path: '/products' },
  { title: '我已经知道想要的风格', text: '直接从风格方向进入，减少在商品列表里盲找。', action: '查看风格方向', path: '/portfolio' },
  { title: '我只知道一个模糊需求', text: '先用热搜词和热门用途帮你聚焦，再进入搜索与定制。', action: '去搜索探索', path: '/search' },
]

const featuredProducts = ref<FeaturedProduct[]>([])
const featuredShowcase = computed(() => featuredProducts.value.slice(0, 6))
const heroPrimary = computed(() => featuredProducts.value[0])
const heroSecondary = computed(() => featuredProducts.value.slice(1, 3))

const fetchFeaturedProducts = async () => {
  try {
    const response = await api.productList.getPage({ page: 1, pageSize: 6, isPublish: true, includeRelations: false })
    if (response.code === 0 || response.status === true || response.code === 200) {
      const products = (response.data as any)?.list || []
      featuredProducts.value = products.map((product: any) => {
        const firstImage = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null
        return {
          id: product.id,
          title: product.name || '商品',
          description: product.description || '',
          category: '精选作品',
          image: 'grad1',
          imageUrl: firstImage,
        }
      })
    }
  } catch (error) {
    console.error('获取精选商品失败:', error)
    featuredProducts.value = [
      { id: '1', title: '鎏金花卉印花系列', description: '适合高级女装与围巾延展的精致图案。', category: 'pattern', image: 'grad1' },
      { id: '2', title: '解构廓形卫衣企划', description: '从版型到图案叙事，适合独立品牌首发。', category: 'clothing', image: 'grad2' },
      { id: '3', title: '艺术家联名杯具周边', description: '把平面创作自然转化成可售卖的 POD 商品。', category: 'product', image: 'grad3' },
      { id: '4', title: '包装视觉提案', description: '提升品牌礼盒和包装开箱体验。', category: 'packaging', image: 'grad4' },
      { id: '5', title: '秀场海报与社媒素材', description: '统一活动物料和社交传播视觉。', category: 'campaign', image: 'grad5' },
      { id: '6', title: '艺术家家居装饰画', description: '将作品延伸到更适合陈列与分享的场景。', category: 'decor', image: 'grad6' },
    ]
  }
}

const goToSearch = () => navigateTo('/search')
const goToExplore = () => navigateTo('/products')
const goToProductDetail = (productId: string) => navigateTo(`/product/${productId}`)
const goToCustomDesign = () => navigateTo('/design')
const goToPortfolio = () => navigateTo('/portfolio')
const goToAiLab = () => navigateTo('/ai-lab')
const goToModule = (path: string) => navigateTo(path)
const goToKeyword = (keyword: string) => navigateTo(`/products/${encodeURIComponent(keyword)}`)

const handleImageError = (event: Event, product: FeaturedProduct) => {
  const img = event.target as HTMLImageElement
  if (product.imageUrl) {
    img.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='${product.image}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f5f5f4'/><stop offset='100%' stop-color='%23d6d3d1'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23${product.image})'/></svg>`
  }
}

onMounted(() => {
  fetchFeaturedProducts()
})
</script>

<template>
  <div class="bg-[#f7f5f2] text-stone-950">
    <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="mx-auto grid max-w-[1560px] gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
        <div class="max-w-2xl pt-2">
          <span class="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-stone-500 transition hover:-translate-y-[1px] hover:text-stone-900">
            Creative POD Product Design & Sharing
          </span>
          <h1 class="mt-6 text-[34px] font-semibold leading-[1.15] text-stone-950 sm:text-[42px] lg:text-[52px]">
            简约、克制地展示设计，让作品本身成为视觉中心。
          </h1>
          <p class="mt-4 max-w-xl text-[13px] leading-7 text-stone-500">
            衣设把创意图案、服装设计、POD 商品化和分享表达放进一个更轻、更扁平的界面里，减少多余装饰，把内容、图片和节奏本身做精。
          </p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <BaseButton variant="primary" size="lg" class="!px-6 !py-2.5 !text-[12px]" @click="goToExplore">探索精选作品</BaseButton>
            <BaseButton variant="outline" size="lg" class="!px-6 !py-2.5 !text-[12px]" @click="goToSearch">开始创作与分享</BaseButton>
          </div>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="pill in categoryPills" :key="pill" class="cursor-default rounded-full bg-white px-3 py-1 text-[11px] text-stone-500 transition hover:-translate-y-[1px] hover:bg-stone-900 hover:text-white">{{ pill }}</span>
          </div>
        </div>

        <div class="rounded-[1.35rem] bg-white p-3 sm:p-4">
          <div class="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <article class="group rounded-[1rem] bg-[#f6f4f1] p-4 transition duration-200 hover:-translate-y-[2px] hover:bg-[#f3efe9] sm:p-5">
              <div v-if="heroPrimary" class="grid h-full grid-rows-[auto_1fr_auto] gap-4">
                <div class="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-stone-400">
                  <span>{{ heroPrimary.category }}</span>
                  <span>Featured</span>
                </div>
                <div class="overflow-hidden rounded-[0.9rem] bg-stone-200">
                  <div class="aspect-[16/11] overflow-hidden">
                    <img v-if="heroPrimary.imageUrl" :src="getPreviewImageUrl(heroPrimary.imageUrl, { width: 900, quality: 80, format: 'webp' }) || undefined" :alt="heroPrimary.title" class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" @error="handleImageError($event, heroPrimary)" />
                    <div v-else class="h-full w-full bg-[linear-gradient(135deg,#e7e5e4,#f5f5f4,#d6d3d1)]"></div>
                  </div>
                </div>
                <div>
                  <h2 class="text-[18px] font-semibold leading-7 text-stone-950 sm:text-[20px]">{{ heroPrimary.title }}</h2>
                  <p class="mt-2 line-clamp-2 text-[12px] leading-6 text-stone-500">{{ heroPrimary.description || '更轻量的品牌画册式内容展示。' }}</p>
                  <button class="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] text-stone-600 transition duration-200 hover:-translate-y-[1px] hover:bg-stone-950 hover:text-white" @click="goToProductDetail(heroPrimary.id)">
                    查看作品
                    <v-icon size="14" class="transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">mdi-arrow-top-right</v-icon>
                  </button>
                </div>
              </div>
            </article>

            <div class="grid gap-3">
              <article class="rounded-[1rem] bg-[#f6f4f1] p-4 transition duration-200 hover:-translate-y-[2px] hover:bg-[#f3efe9]">
                <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">Creative POD House</div>
                <h2 class="mt-3 text-[18px] font-semibold leading-7 text-stone-950">更轻的比例，更统一的配色，更细的组件细节。</h2>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">首屏右侧高度已经收下来，避免压过左侧主文案，让整体阅读节奏更稳。</p>
              </article>

              <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <article v-for="product in heroSecondary" :key="product.id" class="group cursor-pointer rounded-[1rem] bg-[#f6f4f1] p-2.5 transition duration-200 hover:-translate-y-[2px] hover:bg-[#f3efe9]" @click="goToProductDetail(product.id)">
                  <div class="grid grid-cols-[88px_1fr] gap-3">
                    <div class="overflow-hidden rounded-[0.8rem] bg-stone-200">
                      <div class="aspect-square overflow-hidden">
                        <img v-if="product.imageUrl" :src="getPreviewImageUrl(product.imageUrl, { width: 320, quality: 80, format: 'webp' }) || undefined" :alt="product.title" class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]" @error="handleImageError($event, product)" />
                        <div v-else class="h-full w-full bg-[linear-gradient(135deg,#e7e5e4,#f5f5f4,#d6d3d1)]"></div>
                      </div>
                    </div>
                    <div class="min-w-0 py-1">
                      <div class="text-[10px] uppercase tracking-[0.2em] text-stone-400">{{ product.category }}</div>
                      <div class="mt-1 line-clamp-2 text-[13px] font-medium leading-6 text-stone-900">{{ product.title }}</div>
                      <p class="mt-1 line-clamp-2 text-[11px] leading-5 text-stone-500">{{ product.description || '更干净的小型作品卡片。' }}</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto max-w-[1560px] rounded-[1.7rem] bg-white p-5 sm:p-6 lg:p-7">
        <BusinessSectionIntro
          kicker="POD Discovery Hub"
          title="从商品、风格到使用场景，把 POD 线索整理得更清楚。"
          description="把常见的 POD 品类、风格方向、适用人群与热门主题放在同一处浏览，查找路径更直接，设计方向也更容易聚焦。"
        />

        <div class="mt-6 space-y-5">
          <section>
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-[16px] font-semibold text-stone-950">POD 产品分类</h3>
              <button class="ys-quiet-link text-[11px]" @click="goToExplore">查看全部商品</button>
            </div>
            <div class="mt-4">
              <div class="flex flex-wrap gap-2.5">
                <button
                  v-for="(item, index) in podCategories"
                  :key="item.name"
                  type="button"
                  class="group relative w-full min-w-0 overflow-hidden rounded-[1rem] border border-stone-200 bg-white p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9] sm:w-[calc(50%-0.3125rem)] lg:w-[calc(25%-0.46875rem)]"
                  @click="goToKeyword(item.keyword)"
                >
                  <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-stone-200 transition duration-200 group-hover:bg-stone-400"></div>
                  <div class="flex items-start gap-2.5">
                    <div class="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[0.8rem] bg-[#f7f4ee]">
                      <img :src="item.image" :alt="item.name" class="h-[30px] w-[30px] object-contain opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-start justify-between gap-2">
                        <div class="text-[13px] font-medium leading-5 text-stone-900">{{ item.name }}</div>
                        <span class="text-[10px] uppercase tracking-[0.14em] text-stone-400">0{{ index + 1 }}</span>
                      </div>
                      <div class="mt-1 text-[11px] text-stone-400">{{ item.use }}</div>
                    </div>
                  </div>
                  <div class="mt-2.5 flex flex-wrap gap-1.5">
                    <span class="rounded-full bg-[#f6f3ee] px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-stone-500">{{ item.count }}</span>
                    <span class="rounded-full bg-[#f6f3ee] px-2.5 py-1 text-[10px] text-stone-500">{{ item.audience }}</span>
                  </div>
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 class="text-[16px] font-semibold text-stone-950">风格方向</h3>
            <div class="mt-4">
              <div class="flex flex-wrap gap-2.5">
                <button
                  v-for="(item, index) in styleBoards"
                  :key="item.name"
                  type="button"
                  class="group w-full min-w-0 rounded-[1rem] border border-stone-200 bg-white text-left transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9] sm:w-[calc(50%-0.3125rem)] lg:w-[calc(25%-0.46875rem)]"
                  @click="goToKeyword(item.keyword)"
                >
                  <div class="relative flex h-[82px] items-center justify-center overflow-hidden rounded-t-[1rem] bg-[#f6f4f1]">
                    <div class="absolute left-2 top-2 z-[1] rounded-full bg-white/85 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em] text-stone-500">
                      0{{ index + 1 }}
                    </div>
                    <img :src="item.image" :alt="item.name" class="h-[38px] w-[38px] object-contain transition duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div class="px-3 py-3">
                    <div class="text-[13px] font-medium text-stone-900">{{ item.name }}</div>
                    <div class="mt-1 text-[11px] text-stone-400">{{ item.note }}</div>
                  </div>
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 class="text-[16px] font-semibold text-stone-950">适用人群</h3>
            <div class="mt-4">
              <div class="flex flex-wrap gap-2.5">
                <button
                  v-for="(item, index) in audiences"
                  :key="item.name"
                  type="button"
                  class="group w-full min-w-0 rounded-[1rem] border border-stone-200 bg-white px-3 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9] sm:w-[calc(50%-0.3125rem)] lg:w-[calc(25%-0.46875rem)]"
                  @click="goToKeyword(item.keywords[0])"
                >
                  <div class="flex items-center justify-between gap-2">
                    <div class="text-[13px] font-medium text-stone-900">{{ item.name }}</div>
                    <span class="text-[10px] uppercase tracking-[0.14em] text-stone-400">0{{ index + 1 }}</span>
                  </div>
                  <p class="mt-2 text-[11px] leading-6 text-stone-500">{{ item.desc }}</p>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <span v-for="tag in item.keywords" :key="tag" class="rounded-full bg-[#f6f3ee] px-2.5 py-1 text-[10px] text-stone-500">{{ tag }}</span>
                  </div>
                </button>
              </div>
            </div>
          </section>

          <section class="rounded-[1.2rem] bg-[#faf8f5] p-4 sm:p-5">
            <div class="text-[11px] uppercase tracking-[0.18em] text-stone-400">热搜词与入口词</div>
            <div class="mt-4">
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="item in hotKeywords"
                  :key="item"
                  type="button"
                  class="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[11px] text-stone-500 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:text-stone-900"
                  @click="goToKeyword(item)"
                >
                  {{ item }}
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 class="text-[16px] font-semibold text-stone-950">常用浏览方式</h3>
            <div class="mt-4">
              <div class="flex flex-wrap gap-2.5">
                <button
                  v-for="(item, index) in useCases"
                  :key="item.title"
                  type="button"
                  class="group w-full min-w-0 rounded-[1rem] border border-stone-200 bg-white p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9] sm:w-[calc(50%-0.3125rem)] lg:w-[calc(25%-0.46875rem)]"
                  @click="goToModule(item.path)"
                >
                  <div class="flex items-center justify-between gap-2">
                    <div class="text-[13px] font-medium text-stone-950">{{ item.title }}</div>
                    <span class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-[#faf8f5] text-stone-500">
                      <v-icon size="12">mdi-compass-outline</v-icon>
                    </span>
                  </div>
                  <p class="mt-2 text-[11px] leading-6 text-stone-500">{{ item.text }}</p>
                  <div class="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-stone-400">
                    0{{ index + 1 }}
                    <span class="normal-case tracking-normal text-stone-500">{{ item.action }}</span>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto grid max-w-[1560px] gap-3 md:grid-cols-4">
        <div v-for="item in impactStats" :key="item.label" class="rounded-[1rem] bg-white px-5 py-4 transition duration-200 hover:-translate-y-[2px] hover:bg-[#fcfbf9]">
          <dt class="text-[10px] uppercase tracking-[0.22em] text-stone-400">{{ item.label }}</dt>
          <dd class="mt-2 text-[24px] font-semibold text-stone-950">{{ item.value }}</dd>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto grid max-w-[1560px] gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <span class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Workflow</span>
          <h2 class="mt-3 text-[28px] font-semibold leading-[1.25] text-stone-950">保留叙事，但整体更轻、更小、更平衡。</h2>
          <p class="mt-4 max-w-md text-[13px] leading-7 text-stone-500">把风格集中在版式、间距和图片陈列，不再依赖大量边框、重叠分隔和视觉噪声。</p>
        </div>
        <div class="grid gap-3 md:grid-cols-3">
          <article v-for="item in storySteps" :key="item.step" class="rounded-[1rem] bg-white p-5 transition duration-200 hover:-translate-y-[2px] hover:bg-[#fcfbf9]">
            <span class="text-[10px] uppercase tracking-[0.22em] text-stone-400">{{ item.step }}</span>
            <h3 class="mt-3 text-[18px] font-semibold text-stone-950">{{ item.title }}</h3>
            <p class="mt-3 text-[12px] leading-6 text-stone-500">{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto max-w-[1560px] rounded-[1.6rem] bg-white p-5 sm:p-6 lg:p-7">
        <BusinessSectionIntro
          kicker="Business Modules"
          title="围绕设计分享、定制服务与创作工具整理网站结构。"
          description="让作品浏览、定制委托与实验性功能各自有清晰位置，阅读和跳转都会更自然。"
        />
        <div class="mt-6 grid gap-3 xl:grid-cols-3">
          <article v-for="item in businessModules" :key="item.title" class="ys-card rounded-[1.2rem] p-5">
            <div class="text-[16px] font-semibold text-stone-950">{{ item.title }}</div>
            <p class="mt-3 text-[12px] leading-6 text-stone-500">{{ item.text }}</p>
            <button class="mt-5 inline-flex items-center gap-2 rounded-full bg-[#faf8f5] px-3 py-1.5 text-[11px] text-stone-600 transition duration-200 hover:-translate-y-[1px] hover:bg-stone-900 hover:text-white" @click="goToModule(item.to)">
              {{ item.action }}
              <v-icon size="14">mdi-arrow-top-right</v-icon>
            </button>
          </article>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto grid max-w-[1560px] gap-5 xl:grid-cols-[1fr_1fr]">
        <div class="rounded-[1.55rem] bg-white p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="Personalized Studio"
            title="把定制设计的内容与合作方式展示得更清楚。"
            description="从品牌首发到联名企划，把常见的委托方向拆开陈列，方便快速判断合适的设计路径。"
          />
          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <div v-for="item in personalizedModes" :key="item.name" class="rounded-[1rem] bg-[#faf8f5] p-4">
              <div class="text-[14px] font-semibold text-stone-950">{{ item.name }}</div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">{{ item.detail }}</p>
            </div>
          </div>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <BaseButton variant="primary" size="lg" class="!px-6 !py-2.5 !text-[12px]" @click="goToCustomDesign">开始配置定制需求</BaseButton>
            <BaseButton variant="secondary" size="lg" class="!px-6 !py-2.5 !text-[12px]" @click="goToPortfolio">先看灵感案例</BaseButton>
          </div>
        </div>

        <div class="rounded-[1.55rem] bg-white p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="AI Ready"
            title="把实验性设计工具预留在合适的位置。"
            description="先把界面结构、浏览方式和说明文字整理好，后续接入生成式能力时会更顺畅。"
          />
          <div class="mt-6 grid gap-3">
            <div v-for="item in futureSignals" :key="item.title" class="rounded-[1rem] bg-[#faf8f5] p-4">
              <div class="text-[14px] font-semibold text-stone-950">{{ item.title }}</div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">{{ item.desc }}</p>
            </div>
          </div>
          <div class="mt-6">
            <BaseButton variant="outline" size="lg" class="!px-6 !py-2.5 !text-[12px]" @click="goToAiLab">查看 AI 设计实验室</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
      <div class="mx-auto max-w-[1560px]">
        <div class="flex items-end justify-between gap-6">
          <div>
            <span class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Selected Works</span>
            <h2 class="mt-3 text-[28px] font-semibold leading-[1.25] text-stone-950">更轻的内容陈列，更小的卡片尺度。</h2>
          </div>
          <NuxtLink to="/products" class="hidden text-[11px] text-stone-500 transition hover:text-stone-950 sm:inline-flex sm:items-center sm:gap-2">
            查看全部
            <v-icon size="15" class="transition duration-200 hover:translate-x-0.5">mdi-arrow-right</v-icon>
          </NuxtLink>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <article v-for="product in featuredShowcase" :key="product.id" class="group cursor-pointer rounded-[1rem] bg-white p-3 transition duration-200 hover:-translate-y-[3px] hover:bg-[#fcfbf9]" @click="goToProductDetail(product.id)">
            <div class="overflow-hidden rounded-[0.9rem] bg-stone-100">
              <div class="aspect-[4/5] overflow-hidden">
                <img v-if="product.imageUrl" :src="getPreviewImageUrl(product.imageUrl, { width: 760, quality: 80, format: 'webp' }) || undefined" :alt="product.title" class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" @error="handleImageError($event, product)" />
                <div v-else class="h-full w-full bg-[linear-gradient(135deg,#e7e5e4,#f5f5f4,#d6d3d1)]"></div>
              </div>
            </div>
            <div class="mt-3 flex items-start justify-between gap-3">
              <div>
                <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">{{ product.category }}</div>
                <h3 class="mt-1 text-[14px] font-medium leading-6 text-stone-900">{{ product.title }}</h3>
                <p class="mt-1 line-clamp-2 text-[12px] leading-6 text-stone-500">{{ product.description || '以更干净的陈列方式展示设计作品。' }}</p>
              </div>
              <button class="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f6f4f1] text-stone-500 transition duration-200 group-hover:bg-stone-900 group-hover:text-white" @click.stop="goToProductDetail(product.id)">
                <v-icon size="14" class="transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">mdi-arrow-top-right</v-icon>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
