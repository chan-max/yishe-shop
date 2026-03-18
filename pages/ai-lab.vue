<script setup lang="ts">
definePageMeta({ layout: 'page' })

usePageSEO({
  title: 'AI 设计实验室 - 衣设',
  description: '整理情绪板、图案延展与版式辅助等实验性设计工具，让未来的生成式能力与现有设计流程更自然地结合。',
  keywords: 'AI设计,设计实验室,情绪板生成,图案延展,智能排版',
  url: 'https://1s.design/ai-lab',
  type: 'website',
})

const workflows = [
  { id: 'moodboard', name: 'Moodboard Engine', intro: '把 brief 转成气质板、色板和材质建议。', points: ['风格关键词识别', '色彩气质归纳', '材质参考生成'] },
  { id: 'pattern', name: 'Pattern Extend', intro: '从 1 个主图案扩展到完整系列，适配不同商品尺寸。', points: ['主次纹样生成', '尺寸适配', '商品场景预览'] },
  { id: 'layout', name: 'Smart Layout', intro: '为首页、详情页、海报和社媒图自动推荐版式结构。', points: ['首屏布局建议', '模块层级优化', '投放尺寸延展'] },
]

const activeWorkflow = ref(workflows[0].id)
const prompts = [
  '法式花园感的春季围巾与香氛礼盒系列',
  '偏艺术家联名的餐具与桌布组合，要留白感',
  '年轻女性向的轻运动卫衣图案，适合社媒传播',
]
const selectedPrompt = ref(prompts[0])

const outputModules = [
  { title: 'Prompt 输入区', text: '让品牌方、设计师、运营共同定义方向。' },
  { title: '视觉推演区', text: '输出 moodboard、色板、图案、版式建议。' },
  { title: '商品映射区', text: '把结果转换成 SKU、详情页与展示物料。' },
]

const roadmap = [
  { phase: 'Now', title: '界面与交互草案', desc: '先把浏览逻辑、阅读顺序和功能区块整理清楚。' },
  { phase: 'Next', title: '模型接入', desc: '接文字生成、图像理解和风格延展能力。' },
  { phase: 'Later', title: '设计协作工作台', desc: '把生成结果、人工修订、客户反馈放在同一空间。' },
]

const activeItem = computed(() => workflows.find(item => item.id === activeWorkflow.value) || workflows[0])
</script>

<template>
  <div class="bg-[#f7f5f2] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1560px] space-y-8">
      <section class="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div class="ys-card rounded-[1.75rem] p-6 sm:p-8">
          <div class="minimal-kicker">AI Design Lab</div>
          <h1 class="mt-4 max-w-3xl text-[34px] font-semibold leading-[1.14] text-stone-950 sm:text-[46px]">
            先把 AI 服务想对，再把它接进平台。
          </h1>
          <p class="mt-4 max-w-2xl text-[13px] leading-7 text-stone-500">
            重点不是堆功能，而是把情绪板整理、图案延展和版式建议这些真正对设计流程有帮助的能力安排在合适的位置。
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="ys-chip text-[11px]">AI 情绪板</span>
            <span class="ys-chip text-[11px]">图案延展</span>
            <span class="ys-chip text-[11px]">详情页版式</span>
            <span class="ys-chip text-[11px]">SKU 建议</span>
          </div>
        </div>

        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <div class="minimal-kicker">Demo Prompt</div>
          <div class="mt-4 space-y-2">
            <button
              v-for="item in prompts"
              :key="item"
              type="button"
              :class="['w-full rounded-[1rem] border px-4 py-3 text-left text-[12px] transition duration-200', selectedPrompt === item ? 'border-stone-900 bg-stone-900 text-stone-50' : 'border-stone-200 bg-white text-stone-600 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]']"
              @click="selectedPrompt = item"
            >
              {{ item }}
            </button>
          </div>
          <div class="mt-5 rounded-[1.2rem] bg-[#faf8f5] p-4">
            <div class="text-[10px] uppercase tracking-[0.18em] text-stone-400">当前模拟输入</div>
            <p class="mt-3 text-[13px] leading-7 text-stone-600">{{ selectedPrompt }}</p>
          </div>
        </div>
      </section>

      <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
        <BusinessSectionIntro
          kicker="Workflow Engine"
          title="把 AI 能力拆成真正能落地的服务模块。"
          description="每个模块都能单独上线，也能组合成一个完整的设计协同流程。"
        />
        <div class="mt-6 grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
          <div class="space-y-3">
            <button
              v-for="item in workflows"
              :key="item.id"
              type="button"
              :class="['w-full rounded-[1.2rem] border px-5 py-5 text-left transition duration-200', activeWorkflow === item.id ? 'border-stone-900 bg-stone-900 text-stone-50' : 'border-stone-200 bg-white hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]']"
              @click="activeWorkflow = item.id"
            >
              <div class="text-[15px] font-semibold">{{ item.name }}</div>
              <p class="mt-2 text-[12px] leading-6" :class="activeWorkflow === item.id ? 'text-stone-300' : 'text-stone-500'">{{ item.intro }}</p>
            </button>
          </div>
          <div class="rounded-[1.35rem] bg-[#faf8f5] p-5 sm:p-6">
            <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">Selected Module</div>
            <h2 class="mt-3 text-[26px] font-semibold text-stone-950">{{ activeItem.name }}</h2>
            <p class="mt-3 text-[13px] leading-7 text-stone-500">{{ activeItem.intro }}</p>
            <div class="mt-6 grid gap-3 sm:grid-cols-3">
              <div v-for="point in activeItem.points" :key="point" class="rounded-[1rem] bg-white px-4 py-4 text-[12px] leading-6 text-stone-600">
                {{ point }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="Future Surface"
            title="未来界面结构"
            description="等模型接入后，可以直接把这些区域替换成真实结果，不需要重做页面骨架。"
          />
          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <div v-for="item in outputModules" :key="item.title" class="ys-card rounded-[1.2rem] p-4">
              <div class="text-[14px] font-semibold text-stone-950">{{ item.title }}</div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">{{ item.text }}</p>
            </div>
          </div>
        </div>

        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="Roadmap"
            title="产品演进路线"
            description="先用前台体验验证价值，再逐步把 AI 能力嵌进去。"
          />
          <div class="mt-6 space-y-3">
            <div v-for="item in roadmap" :key="item.phase" class="rounded-[1.2rem] bg-white px-4 py-4">
              <div class="flex items-center justify-between gap-3">
                <div class="text-[15px] font-semibold text-stone-950">{{ item.title }}</div>
                <span class="rounded-full bg-[#faf8f5] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone-500">{{ item.phase }}</span>
              </div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
