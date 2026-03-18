<script setup lang="ts">
definePageMeta({ layout: 'page' })

usePageSEO({
  title: '定制设计服务 - 衣设',
  description: '从图案、服装到 POD 商品化策略，快速配置你的个性化设计需求，并预览未来可接入的 AI 协同设计服务。',
  keywords: '定制设计,POD设计服务,个性化设计,服装设计服务,AI设计协同',
  url: 'https://1s.design/design',
  type: 'website',
})

const tracks = [
  {
    id: 'brand',
    name: '品牌首发套组',
    blurb: '适合新品牌冷启动，从视觉方向到首批商品提案一次成型。',
    outputs: ['品牌视觉基调', '首发图案系列', '6 款 POD 商品方案'],
    cycle: '7-12 天',
  },
  {
    id: 'campaign',
    name: '主题企划企划',
    blurb: '面向节日联名、快闪活动、系列上新，强调传播与陈列。',
    outputs: ['主题 KV', '物料延展', '社媒视觉包'],
    cycle: '5-8 天',
  },
  {
    id: 'signature',
    name: '个人艺术家系列',
    blurb: '把创作者个人语言转化为可持续连载的商品体系。',
    outputs: ['艺术家图案整理', '作品集页面', '周边 SKU 组合'],
    cycle: '10-15 天',
  },
]

const packages = [
  {
    name: 'Essentials',
    price: '¥1,980',
    summary: '快速明确方向，适合个人品牌测试。',
    items: ['1 次风格校准', '3 个视觉方向', '1 套商品陈列草图'],
  },
  {
    name: 'Signature',
    price: '¥4,800',
    summary: '完整做出一个可以展示与预售的系列。',
    items: ['品牌故事板', '6-8 个图案提案', '商品视觉与落地页建议'],
    featured: true,
  },
  {
    name: 'Studio Partner',
    price: '定制报价',
    summary: '适合持续合作，把设计内容变成长期栏目。',
    items: ['月度企划共创', '新品节奏规划', 'AI 服务优先内测'],
  },
]

const serviceTags = ['印花图案', '服装廓形', '包装礼盒', '社媒素材', '详情页视觉', '艺术家联名']
const aiFeatures = [
  { title: 'AI 情绪板生成', text: '基于 brief 自动整理材质、色板和参考叙事。' },
  { title: '图案延展建议', text: '从一个主视觉扩展出系列纹样与 SKU 适配版本。' },
  { title: '智能陈列草图', text: '自动生成首屏、详情页、海报等展示构图建议。' },
]

const selectedTrack = ref(tracks[0].id)
const selectedPackage = ref(packages[1].name)
const selectedNeeds = ref<string[]>(['印花图案', '详情页视觉'])
const briefForm = reactive({
  brand: '',
  audience: '',
  tone: '',
  launchWindow: '',
  notes: '',
})

const activeTrack = computed(() => tracks.find(item => item.id === selectedTrack.value) || tracks[0])

const toggleNeed = (item: string) => {
  if (selectedNeeds.value.includes(item)) {
    selectedNeeds.value = selectedNeeds.value.filter(need => need !== item)
    return
  }
  selectedNeeds.value = [...selectedNeeds.value, item]
}

const summaryLines = computed(() => [
  `方向：${activeTrack.value.name}`,
  `套餐：${selectedPackage.value}`,
  `需求：${selectedNeeds.value.length > 0 ? selectedNeeds.value.join(' / ') : '待补充'}`,
])
</script>

<template>
  <div class="bg-[#f7f5f2] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1560px] space-y-8">
      <section class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="ys-card rounded-[1.75rem] p-6 sm:p-8">
          <div class="minimal-kicker">Custom Design Studio</div>
          <h1 class="mt-4 max-w-3xl text-[34px] font-semibold leading-[1.15] text-stone-950 sm:text-[46px]">
            不只是接单，而是把你的设计方向、商品结构和分享表达一起做完整。
          </h1>
          <p class="mt-4 max-w-2xl text-[13px] leading-7 text-stone-500">
            从品牌首发、主题企划到艺术家联名，把常见的设计委托方式整理成清晰的服务页，方便先浏览方向，再细化需求。
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="tag in serviceTags" :key="tag" class="ys-chip text-[11px]">{{ tag }}</span>
          </div>
          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">平均周期</div>
              <div class="mt-2 text-[20px] font-semibold text-stone-950">5-15 天</div>
            </div>
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">适配对象</div>
              <div class="mt-2 text-[20px] font-semibold text-stone-950">品牌 / 创作者</div>
            </div>
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">未来能力</div>
              <div class="mt-2 text-[20px] font-semibold text-stone-950">AI 共创</div>
            </div>
          </div>
        </div>

        <aside class="ys-card rounded-[1.75rem] p-5 sm:p-6">
          <div class="minimal-kicker">Brief Snapshot</div>
          <div class="mt-4 space-y-3">
            <div v-for="line in summaryLines" :key="line" class="rounded-[1rem] bg-[#faf8f5] px-4 py-3 text-[12px] text-stone-600">
              {{ line }}
            </div>
          </div>
          <div class="mt-5 rounded-[1.2rem] bg-[#1c1917] px-5 py-5 text-stone-50">
            <div class="text-[10px] uppercase tracking-[0.22em] text-stone-300">推荐合作方式</div>
            <div class="mt-3 text-[22px] font-semibold">{{ activeTrack.name }}</div>
            <p class="mt-2 text-[12px] leading-6 text-stone-300">{{ activeTrack.blurb }}</p>
            <div class="mt-4 text-[11px] text-stone-300">预计交付周期 {{ activeTrack.cycle }}</div>
          </div>
        </aside>
      </section>

      <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
        <BusinessSectionIntro
          kicker="Design Track"
          title="先确定合作模型，再展开具体设计需求。"
          description="每一种轨道都对应不同的输出重点。品牌首发更看完整度，主题企划更看传播速度，个人艺术家系列更看表达辨识度。"
        />
        <div class="mt-6 grid gap-3 lg:grid-cols-3">
          <button
            v-for="item in tracks"
            :key="item.id"
            type="button"
            :class="['rounded-[1.2rem] border p-5 text-left transition duration-200', selectedTrack === item.id ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-[0_16px_28px_rgba(28,25,23,0.12)]' : 'border-stone-200 bg-white hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]']"
            @click="selectedTrack = item.id"
          >
            <div class="flex items-center justify-between">
              <div class="text-[16px] font-semibold">{{ item.name }}</div>
              <div class="text-[11px] uppercase tracking-[0.18em]" :class="selectedTrack === item.id ? 'text-stone-300' : 'text-stone-400'">{{ item.cycle }}</div>
            </div>
            <p class="mt-3 text-[12px] leading-6" :class="selectedTrack === item.id ? 'text-stone-300' : 'text-stone-500'">{{ item.blurb }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="output in item.outputs" :key="output" :class="['rounded-full px-3 py-1 text-[11px]', selectedTrack === item.id ? 'bg-white/10 text-stone-200' : 'bg-[#faf8f5] text-stone-500']">
                {{ output }}
              </span>
            </div>
          </button>
        </div>
      </section>

      <section class="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="Service Config"
            title="把设计需求整理成一份完整的委托摘要。"
            description="先确认品牌名、受众、视觉气质与交付模块，页面阅读和填写都会更直观。"
          />
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <BaseInput v-model="briefForm.brand" label="品牌 / 项目名" placeholder="例如：晚风工作室" />
            <BaseInput v-model="briefForm.audience" label="目标受众" placeholder="例如：城市女性、插画收藏者" />
            <BaseInput v-model="briefForm.tone" label="视觉气质" placeholder="例如：克制、文艺、轻奢" />
            <BaseInput v-model="briefForm.launchWindow" label="上线时间" placeholder="例如：6 月中旬首发" />
          </div>
          <div class="mt-4">
            <label class="mb-2 block text-[12px] font-medium text-stone-600">需要的模块</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="item in serviceTags"
                :key="item"
                type="button"
                :class="['ys-chip text-[11px]', selectedNeeds.includes(item) ? 'is-active' : '']"
                @click="toggleNeed(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>
          <div class="mt-4">
            <label class="mb-2 block text-[12px] font-medium text-stone-600">补充说明</label>
            <textarea v-model="briefForm.notes" rows="5" class="ys-control w-full px-4 py-3 text-[13px] text-stone-900 focus:outline-none" placeholder="可以描述你的产品主题、参考风格、预算区间或想要的传播场景。"></textarea>
          </div>
        </div>

        <div class="space-y-5">
          <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="Package"
              title="选择合作深度"
              description="从轻量提案到长期合作，把不同深度的设计支持放在同一套阅读节奏里。"
            />
            <div class="mt-5 space-y-3">
              <button
                v-for="item in packages"
                :key="item.name"
                type="button"
                :class="['w-full rounded-[1.2rem] border p-4 text-left transition duration-200', selectedPackage === item.name ? 'border-stone-900 bg-stone-900 text-stone-50' : 'border-stone-200 bg-white hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]']"
                @click="selectedPackage = item.name"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="text-[15px] font-semibold">{{ item.name }}</h3>
                      <span v-if="item.featured" class="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]" :class="selectedPackage === item.name ? 'text-stone-200' : 'bg-[#faf8f5] text-stone-500'">Recommended</span>
                    </div>
                    <p class="mt-2 text-[12px] leading-6" :class="selectedPackage === item.name ? 'text-stone-300' : 'text-stone-500'">{{ item.summary }}</p>
                  </div>
                  <div class="text-[18px] font-semibold">{{ item.price }}</div>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-for="line in item.items" :key="line" :class="['rounded-full px-3 py-1 text-[11px]', selectedPackage === item.name ? 'bg-white/10 text-stone-200' : 'bg-[#faf8f5] text-stone-500']">
                    {{ line }}
                  </span>
                </div>
              </button>
            </div>
          </section>

          <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="AI Ready"
              title="这里预留图案延展与版式辅助工具。"
              description="后续接入生成与分析能力时，可以自然补进现有的设计流程，不会打断页面结构。"
            />
            <div class="mt-5 grid gap-3">
              <div v-for="item in aiFeatures" :key="item.title" class="rounded-[1.1rem] bg-[#faf8f5] px-4 py-4">
                <div class="text-[14px] font-semibold text-stone-950">{{ item.title }}</div>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">{{ item.text }}</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>
