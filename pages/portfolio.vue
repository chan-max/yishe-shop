<script setup lang="ts">
definePageMeta({ layout: 'page' })

usePageSEO({
  title: '作品集与灵感库 - 衣设',
  description: '浏览精选设计系列、风格板与创作方向，让作品分享、收藏和发现更像一个完整的设计社区。',
  keywords: '作品集,灵感库,设计分享,设计社区,POD作品集',
  url: 'https://1s.design/portfolio',
  type: 'website',
})

const filters = ['全部', 'POD 系列', '品牌视觉', '包装与周边', '艺术家联名', 'AI 实验']
const activeFilter = ref('全部')
const savedBoards = ref<string[]>(['001'])

const boards = [
  {
    id: '001',
    category: 'POD 系列',
    title: 'Soft Ritual 家居与穿搭双线系列',
    desc: '把柔和花型延展到围巾、睡衣、马克杯与家居布艺。',
    stats: ['12 张画面', '5 个 SKU', '高收藏'],
  },
  {
    id: '002',
    category: '品牌视觉',
    title: '城市花园香氛首发视觉',
    desc: '从主视觉到礼盒版式，适合高频传播和快闪陈列。',
    stats: ['KV + 包装', '适配社媒', '节日企划'],
  },
  {
    id: '003',
    category: '艺术家联名',
    title: '插画家联名餐具与帆布系列',
    desc: '保留手绘线条和留白，让商品更像艺术衍生收藏。',
    stats: ['联名周边', '高识别度', '内容可持续'],
  },
  {
    id: '004',
    category: 'AI 实验',
    title: 'AI Moodboard to SKU Demo',
    desc: '演示从文字 brief 到色板、图案气质与商品建议的前台流程。',
    stats: ['Prompt 驱动', '多风格切换', '未来能力'],
  },
]

const articleFeeds = [
  { title: '如何把一个图案做成系列商品', tag: '策略', time: '6 分钟' },
  { title: 'POD 首页展示为什么要先做叙事顺序', tag: '展示', time: '4 分钟' },
  { title: 'AI 共创会如何改变设计交付', tag: 'AI', time: '7 分钟' },
]

const visibleBoards = computed(() => activeFilter.value === '全部'
  ? boards
  : boards.filter(item => item.category === activeFilter.value))

const toggleSave = (id: string) => {
  if (savedBoards.value.includes(id)) {
    savedBoards.value = savedBoards.value.filter(item => item !== id)
    return
  }
  savedBoards.value = [...savedBoards.value, id]
}
</script>

<template>
  <div class="bg-[#f7f5f2] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1560px] space-y-8">
      <section class="ys-card rounded-[1.75rem] p-6 sm:p-8">
        <div class="minimal-kicker">Portfolio & Discovery</div>
        <div class="mt-4 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 class="max-w-3xl text-[34px] font-semibold leading-[1.15] text-stone-950 sm:text-[44px]">
              让作品不只是“被看见”，还要被保存、被引用、被拿来继续创作。
            </h1>
            <p class="mt-4 max-w-2xl text-[13px] leading-7 text-stone-500">
              这里把作品集做成内容化的灵感库。用户可以筛选方向、保存灵感板，并自然进入定制设计或 AI 服务入口。
            </p>
            <div class="mt-6 flex flex-wrap gap-2">
              <button
                v-for="item in filters"
                :key="item"
                type="button"
                :class="['ys-chip text-[11px]', activeFilter === item ? 'is-active' : '']"
                @click="activeFilter = item"
              >
                {{ item }}
              </button>
            </div>
          </div>
          <div class="grid gap-3 sm:grid-cols-3">
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div class="text-[10px] uppercase tracking-[0.2em] text-stone-400">精选案例</div>
              <div class="mt-2 text-[24px] font-semibold text-stone-950">320+</div>
            </div>
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div class="text-[10px] uppercase tracking-[0.2em] text-stone-400">灵感板保存</div>
              <div class="mt-2 text-[24px] font-semibold text-stone-950">8.6K</div>
            </div>
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div class="text-[10px] uppercase tracking-[0.2em] text-stone-400">实验栏目</div>
              <div class="mt-2 text-[24px] font-semibold text-stone-950">18</div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="Curated Boards"
            title="像逛设计编辑部一样浏览作品方向。"
            description="不只是罗列缩略图，而是把每一组设计内容组织成可理解、可复用、可继续委托的创意板。"
          />
          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <article
              v-for="item in visibleBoards"
              :key="item.id"
              class="ys-card rounded-[1.35rem] p-4"
            >
              <div class="flex items-center justify-between">
                <span class="rounded-full bg-[#faf8f5] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone-500">{{ item.category }}</span>
                <button
                  type="button"
                  :class="['inline-flex h-8 w-8 items-center justify-center rounded-full border text-[11px] transition', savedBoards.includes(item.id) ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-white text-stone-500 hover:-translate-y-0.5 hover:border-stone-300 hover:text-stone-950']"
                  @click="toggleSave(item.id)"
                >
                  <v-icon size="15">{{ savedBoards.includes(item.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                </button>
              </div>
              <div class="mt-4 aspect-[4/3] rounded-[1rem] bg-[linear-gradient(135deg,#ebe6de,#f7f5f2,#d9d1c3)]"></div>
              <h2 class="mt-4 text-[16px] font-semibold text-stone-950">{{ item.title }}</h2>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">{{ item.desc }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span v-for="stat in item.stats" :key="stat" class="rounded-full bg-[#faf8f5] px-3 py-1 text-[11px] text-stone-500">{{ stat }}</span>
              </div>
            </article>
          </div>
        </div>

        <div class="space-y-5">
          <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="Saved Flow"
              title="把收藏行为变成继续转化的起点。"
              description="后端以后可以接真实收藏、分享和委托逻辑，前端先把路径组织出来。"
            />
            <div class="mt-5 space-y-3">
              <div class="rounded-[1.1rem] bg-[#faf8f5] px-4 py-4">
                <div class="text-[14px] font-semibold text-stone-950">保存灵感板</div>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">用户先把作品板加入收藏夹，作为后续定制设计 brief 的参考输入。</p>
              </div>
              <div class="rounded-[1.1rem] bg-[#faf8f5] px-4 py-4">
                <div class="text-[14px] font-semibold text-stone-950">加入项目清单</div>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">把多块灵感板合并成一个项目提案，后续接入工作台和协作流程。</p>
              </div>
              <div class="rounded-[1.1rem] bg-[#faf8f5] px-4 py-4">
                <div class="text-[14px] font-semibold text-stone-950">一键发起定制</div>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">直接带着收藏结果进入定制设计页面，减少用户重新整理需求的成本。</p>
              </div>
            </div>
          </section>

          <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="Editorial Feed"
              title="配套内容流"
              description="用内容把平台从作品展示延伸到方法分享与 AI 趋势教育。"
            />
            <div class="mt-5 space-y-3">
              <article v-for="item in articleFeeds" :key="item.title" class="rounded-[1.1rem] border border-stone-200 bg-white px-4 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]">
                <div class="flex items-center justify-between gap-3">
                  <span class="rounded-full bg-[#faf8f5] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone-500">{{ item.tag }}</span>
                  <span class="text-[11px] text-stone-400">{{ item.time }}</span>
                </div>
                <h3 class="mt-3 text-[14px] font-semibold text-stone-950">{{ item.title }}</h3>
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>
