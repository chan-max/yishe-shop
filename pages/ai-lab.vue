<script setup lang="ts">
definePageMeta({ layout: "page" });

usePageSEO({
  title: "AI 设计实验室 - 衣设",
  description:
    "这里放的是衣设接下来会接进来的创作辅助工具，用来帮你更快把感觉落成画面。",
  keywords: "创作工具,设计实验室,情绪板生成,图案延展,版式辅助",
  url: "https://1s.design/ai-lab",
  type: "website",
});

const workflows = [
  {
    id: "moodboard",
    name: "灵感整理板",
    intro: "把一句模糊的话，先翻成能看懂的色板、材质和气质。",
    points: ["风格关键词整理", "色彩气氛归纳", "参考材质补全"],
  },
  {
    id: "pattern",
    name: "图案延展台",
    intro: "从一张主图或一个概念，慢慢长出一组能落到商品上的系列。",
    points: ["主次纹样展开", "尺寸适配建议", "商品画面预览"],
  },
  {
    id: "layout",
    name: "版式草稿区",
    intro: "先把首页、详情页和宣传图的阅读顺序搭出来，再决定细节。",
    points: ["首屏结构建议", "信息层级整理", "不同尺寸延展"],
  },
];

const activeWorkflow = ref(workflows[0].id);
const prompts = [
  "法式花园感的春季围巾与香氛礼盒系列",
  "偏艺术家联名的餐具与桌布组合，要留白感",
  "年轻女性向的轻运动卫衣图案，适合社媒传播",
];
const selectedPrompt = ref(prompts[0]);

const outputModules = [
  {
    title: "想法输入区",
    text: "你可以只说一个场景、一种情绪，或者一句很主观的话。",
  },
  { title: "画面整理区", text: "把色板、图案、材质和版式慢慢拉到一个方向上。" },
  { title: "商品落图区", text: "再往下就是它会落在哪件东西上，怎么被人看到。" },
];

const roadmap = [
  {
    phase: "Now",
    title: "先把入口和动作做顺",
    desc: "先让人愿意点进来，愿意试一下，而不是先被工具吓退。",
  },
  {
    phase: "Next",
    title: "再把辅助能力接进来",
    desc: "让整理灵感、延展图案和搭画面这几步先轻下来。",
  },
  {
    phase: "Later",
    title: "最后再做协作空间",
    desc: "把草稿、修改、确认和上线都放在同一条线上。",
  },
];

const activeItem = computed(
  () =>
    workflows.find((item) => item.id === activeWorkflow.value) || workflows[0],
);
</script>

<template>
  <div class="bg-[#f7f5f2] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1560px] space-y-8">
      <section class="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div class="ys-card rounded-[1.75rem] p-6 sm:p-8">
          <div class="minimal-kicker">AI Design Lab</div>
          <h1
            class="mt-4 max-w-3xl text-[34px] font-semibold leading-[1.14] text-stone-950 sm:text-[46px]"
          >
            工具应该让人更敢动手，而不是更像在上课。
          </h1>
          <p class="mt-4 max-w-2xl text-[13px] leading-7 text-stone-500">
            这里放的是衣设接下来会用到的创作辅助模块。它们的作用不是替你设计，而是先把起步这一步变轻。
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="ys-chip text-[11px]">AI 情绪板</span>
            <span class="ys-chip text-[11px]">图案延展</span>
            <span class="ys-chip text-[11px]">详情页版式</span>
            <span class="ys-chip text-[11px]">SKU 建议</span>
          </div>
        </div>

        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <div class="minimal-kicker">Try a direction</div>
          <div class="mt-4 space-y-2">
            <button
              v-for="item in prompts"
              :key="item"
              type="button"
              :class="[
                'w-full rounded-[1rem] border px-4 py-3 text-left text-[12px] transition duration-200',
                selectedPrompt === item
                  ? 'border-stone-900 bg-stone-900 text-stone-50'
                  : 'border-stone-200 bg-white text-stone-600 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]',
              ]"
              @click="selectedPrompt = item"
            >
              {{ item }}
            </button>
          </div>
          <div class="mt-5 rounded-[1.2rem] bg-[#faf8f5] p-4">
            <div class="text-[10px] uppercase tracking-[0.18em] text-stone-400">
              假设你就从这句话开始
            </div>
            <p class="mt-3 text-[13px] leading-7 text-stone-600">
              {{ selectedPrompt }}
            </p>
          </div>
        </div>
      </section>

      <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
        <BusinessSectionIntro
          kicker="Workflow Engine"
          title="每个工具，都只解决一件具体的小事。"
          description="先把灵感理顺，再把图案做开，最后把页面搭好。这样工具才真的有用。"
        />
        <div class="mt-6 grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
          <div class="space-y-3">
            <button
              v-for="item in workflows"
              :key="item.id"
              type="button"
              :class="[
                'w-full rounded-[1.2rem] border px-5 py-5 text-left transition duration-200',
                activeWorkflow === item.id
                  ? 'border-stone-900 bg-stone-900 text-stone-50'
                  : 'border-stone-200 bg-white hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]',
              ]"
              @click="activeWorkflow = item.id"
            >
              <div class="text-[15px] font-semibold">{{ item.name }}</div>
              <p
                class="mt-2 text-[12px] leading-6"
                :class="
                  activeWorkflow === item.id
                    ? 'text-stone-300'
                    : 'text-stone-500'
                "
              >
                {{ item.intro }}
              </p>
            </button>
          </div>
          <div class="rounded-[1.35rem] bg-[#faf8f5] p-5 sm:p-6">
            <div class="text-[10px] uppercase tracking-[0.22em] text-stone-400">
              当前模块
            </div>
            <h2 class="mt-3 text-[26px] font-semibold text-stone-950">
              {{ activeItem.name }}
            </h2>
            <p class="mt-3 text-[13px] leading-7 text-stone-500">
              {{ activeItem.intro }}
            </p>
            <div class="mt-6 grid gap-3 sm:grid-cols-3">
              <div
                v-for="point in activeItem.points"
                :key="point"
                class="rounded-[1rem] bg-white px-4 py-4 text-[12px] leading-6 text-stone-600"
              >
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
            title="以后大概会长这样"
            description="真正接进来以后，页面不用大改，只是把示意区换成你的真实结果。"
          />
          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <div
              v-for="item in outputModules"
              :key="item.title"
              class="ys-card rounded-[1.2rem] p-4"
            >
              <div class="text-[14px] font-semibold text-stone-950">
                {{ item.title }}
              </div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>

        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="Roadmap"
            title="不是一下子做满，而是一步一步接进去"
            description="先让人敢用，再让结果好用，最后再谈复杂协作。"
          />
          <div class="mt-6 space-y-3">
            <div
              v-for="item in roadmap"
              :key="item.phase"
              class="rounded-[1.2rem] bg-white px-4 py-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="text-[15px] font-semibold text-stone-950">
                  {{ item.title }}
                </div>
                <span
                  class="rounded-full bg-[#faf8f5] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone-500"
                  >{{ item.phase }}</span
                >
              </div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
