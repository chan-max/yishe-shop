<script setup lang="ts">
definePageMeta({ layout: "page" });

usePageSEO({
  title: "作品集与灵感库 - 衣设",
  description:
    "看别人怎么把审美做成衣服、周边和系列内容，也顺手看看哪一类表达最像你。",
  keywords: "作品集,灵感库,设计分享,设计展示,POD作品集",
  url: "https://1s.design/portfolio",
  type: "website",
});

const filters = [
  "全部",
  "POD 系列",
  "品牌视觉",
  "包装与周边",
  "艺术家联名",
  "AI 实验",
];
const activeFilter = ref("全部");
const savedBoards = ref<string[]>(["001"]);

const boards = [
  {
    id: "001",
    category: "POD 系列",
    title: "Soft Ritual 家居与穿搭双线系列",
    desc: "同一组花型，从穿出门到摆在家里，都保持同一种安静气质。",
    stats: ["12 张画面", "5 个 SKU", "高收藏"],
  },
  {
    id: "002",
    category: "品牌视觉",
    title: "城市花园香氛首发视觉",
    desc: "适合首发当天就要被拍照、被转发、被记住的那类项目。",
    stats: ["KV + 包装", "适配社媒", "节日企划"],
  },
  {
    id: "003",
    category: "艺术家联名",
    title: "插画家联名餐具与帆布系列",
    desc: "不是简单印上去，而是让作品真的长成一组值得收的东西。",
    stats: ["联名周边", "高识别度", "内容可持续"],
  },
  {
    id: "004",
    category: "AI 实验",
    title: "AI Moodboard to SKU Demo",
    desc: "从一句模糊描述开始，慢慢看到风格、色板和商品方向浮出来。",
    stats: ["Prompt 驱动", "多风格切换", "未来能力"],
  },
];

const articleFeeds = [
  { title: "一张图，怎么慢慢长成一整个系列", tag: "策略", time: "6 分钟" },
  { title: "为什么首页要先让人看懂，再让人下滑", tag: "展示", time: "4 分钟" },
  { title: "工具接进来以后，创作会先变轻哪一步", tag: "工具", time: "7 分钟" },
];

const visibleBoards = computed(() =>
  activeFilter.value === "全部"
    ? boards
    : boards.filter((item) => item.category === activeFilter.value),
);

const toggleSave = (id: string) => {
  if (savedBoards.value.includes(id)) {
    savedBoards.value = savedBoards.value.filter((item) => item !== id);
    return;
  }
  savedBoards.value = [...savedBoards.value, id];
};
</script>

<template>
  <div class="bg-[#f7f5f2] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1560px] space-y-8">
      <section class="ys-card rounded-[1.75rem] p-6 sm:p-8">
        <div class="minimal-kicker">Portfolio & Discovery</div>
        <div class="mt-4 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1
              class="max-w-3xl text-[34px] font-semibold leading-[1.15] text-stone-950 sm:text-[44px]"
            >
              这里放的不是灵感碎片，是别人已经做出来的表达。
            </h1>
            <p class="mt-4 max-w-2xl text-[13px] leading-7 text-stone-500">
              你可以在这里看别人怎么把想法穿出去、摆出来、卖出去。喜欢哪种感觉，就顺着往下走。
            </p>
            <div class="mt-6 flex flex-wrap gap-2">
              <button
                v-for="item in filters"
                :key="item"
                type="button"
                :class="[
                  'ys-chip text-[11px]',
                  activeFilter === item ? 'is-active' : '',
                ]"
                @click="activeFilter = item"
              >
                {{ item }}
              </button>
            </div>
          </div>
          <div class="grid gap-3 sm:grid-cols-3">
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div
                class="text-[10px] uppercase tracking-[0.2em] text-stone-400"
              >
                正在被反复翻看的
              </div>
              <div class="mt-2 text-[24px] font-semibold text-stone-950">
                320+
              </div>
            </div>
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div
                class="text-[10px] uppercase tracking-[0.2em] text-stone-400"
              >
                被顺手存下来的
              </div>
              <div class="mt-2 text-[24px] font-semibold text-stone-950">
                8.6K
              </div>
            </div>
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div
                class="text-[10px] uppercase tracking-[0.2em] text-stone-400"
              >
                还在继续长的栏目
              </div>
              <div class="mt-2 text-[24px] font-semibold text-stone-950">
                18
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="Curated Boards"
            title="先看别人怎么做，通常比空想更有用。"
            description="每组内容都不是孤立的一张图，而是一种完整的方向。你能看到它适合谁，会出现在哪种生活里。"
          />
          <div class="mt-6 grid gap-3 sm:grid-cols-2">
            <article
              v-for="item in visibleBoards"
              :key="item.id"
              class="ys-card rounded-[1.15rem] p-4"
            >
              <div class="flex items-center justify-between">
                <span
                  class="rounded-full bg-[#faf8f5] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone-500"
                  >{{ item.category }}</span
                >
                <button
                  type="button"
                  :class="[
                    'inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] transition',
                    savedBoards.includes(item.id)
                      ? 'ys-action-btn-active'
                      : 'ys-action-btn hover:-translate-y-0.5',
                  ]"
                  @click="toggleSave(item.id)"
                >
                  <v-icon size="15">{{
                    savedBoards.includes(item.id)
                      ? "mdi-heart"
                      : "mdi-heart-outline"
                  }}</v-icon>
                </button>
              </div>
              <div
                class="mt-4 aspect-[4/3] rounded-[0.95rem] border border-stone-200 bg-[linear-gradient(135deg,#ebe6de,#f7f5f2,#d9d1c3)]"
              ></div>
              <h2 class="mt-4 text-[16px] font-semibold text-stone-950">
                {{ item.title }}
              </h2>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">
                {{ item.desc }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="stat in item.stats"
                  :key="stat"
                  class="rounded-full border border-stone-200 bg-[#faf8f5] px-3 py-1 text-[11px] text-stone-500"
                  >{{ stat }}</span
                >
              </div>
            </article>
          </div>
        </div>

        <div class="space-y-5">
          <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="Saved Flow"
              title="看见喜欢的，就先留一下。"
              description="先存起来，晚点回来看。很多项目不是第一次看到就下决定，但会在第二次、第三次确认自己要什么。"
            />
            <div class="mt-5 space-y-3">
              <div class="rounded-[1.1rem] border border-stone-200 bg-[#faf8f5] px-4 py-4">
                <div class="text-[14px] font-semibold text-stone-950">
                  保存灵感板
                </div>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">
                  先留住那种你说不清、但知道自己喜欢的感觉。
                </p>
              </div>
              <div class="rounded-[1.1rem] border border-stone-200 bg-[#faf8f5] px-4 py-4">
                <div class="text-[14px] font-semibold text-stone-950">
                  加入项目清单
                </div>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">
                  把几块气质相近的内容放在一起，方向就会慢慢清楚。
                </p>
              </div>
              <div class="rounded-[1.1rem] border border-stone-200 bg-[#faf8f5] px-4 py-4">
                <div class="text-[14px] font-semibold text-stone-950">
                  一键发起定制
                </div>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">
                  等你准备好了，可以直接把这些感觉带进下一步合作里。
                </p>
              </div>
            </div>
          </section>

          <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="Editorial Feed"
              title="顺手读一点，也许会更快想明白。"
              description="不是教程腔，更像把做这些东西时真正会碰到的问题说清楚。"
            />
            <div class="mt-5 space-y-3">
              <article
                v-for="item in articleFeeds"
                :key="item.title"
                class="rounded-[1.1rem] border border-stone-200 bg-white px-4 py-4 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]"
              >
                <div class="flex items-center justify-between gap-3">
                  <span
                    class="rounded-full bg-[#faf8f5] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-stone-500"
                    >{{ item.tag }}</span
                  >
                  <span class="text-[11px] text-stone-400">{{
                    item.time
                  }}</span>
                </div>
                <h3 class="mt-3 text-[14px] font-semibold text-stone-950">
                  {{ item.title }}
                </h3>
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>
