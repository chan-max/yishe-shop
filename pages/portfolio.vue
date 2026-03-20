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

const filters = ["全部", "POD 系列", "品牌视觉", "包装与周边", "艺术家联名", "AI 实验"];
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

const visibleBoards = computed(() =>
  activeFilter.value === "全部" ? boards : boards.filter((item) => item.category === activeFilter.value),
);

const leadBoard = computed(() => visibleBoards.value[0] || boards[0]);
const leadNotes = [
  "先定情绪方向，再决定它适合长成哪一类商品。",
  "不是只看一张图，而是看它能不能延展成系列。",
  "好的作品集，应该同时回答审美和落地两个问题。",
];

const toggleSave = (id: string) => {
  if (savedBoards.value.includes(id)) {
    savedBoards.value = savedBoards.value.filter((item) => item !== id);
    return;
  }
  savedBoards.value = [...savedBoards.value, id];
};
</script>

<template>
  <div class="portfolio-page">
    <section class="portfolio-hero">
      <div class="minimal-kicker">Portfolio & Discovery</div>
      <div class="portfolio-hero__grid">
        <div class="portfolio-hero__copy">
          <p class="portfolio-label">Curated Selection</p>
          <h1>作品集应该像策展，不应该像一堆项目缩略图。</h1>
          <p>
            所以这页改成更像编辑台和收藏墙的结构。你先判断哪种审美路径更像你，再继续往下看项目怎么长成系列、商品和内容。
          </p>
        </div>

        <div class="portfolio-hero__panel">
          <span>本周主推</span>
          <strong>{{ leadBoard.title }}</strong>
          <p>{{ leadBoard.desc }}</p>
        </div>
      </div>
    </section>

    <section class="portfolio-filter">
      <button
        v-for="item in filters"
        :key="item"
        type="button"
        :class="['portfolio-filter__item', activeFilter === item ? 'is-active' : '']"
        @click="activeFilter = item"
      >
        {{ item }}
      </button>
    </section>

    <section class="portfolio-stage">
      <div class="portfolio-stage__lead">
        <div class="portfolio-stage__meta">
          <span class="portfolio-label">Lead Board</span>
          <h2>{{ leadBoard.title }}</h2>
          <p>{{ leadBoard.desc }}</p>
        </div>
        <div class="portfolio-stage__stats">
          <span v-for="stat in leadBoard.stats" :key="stat">{{ stat }}</span>
        </div>
      </div>

      <div class="portfolio-stage__notes">
        <div class="portfolio-stage__note" v-for="item in leadNotes" :key="item">
          {{ item }}
        </div>
      </div>
    </section>

    <section class="portfolio-grid">
      <article v-for="item in visibleBoards" :key="item.id" class="portfolio-card">
        <div class="portfolio-card__head">
          <span>{{ item.category }}</span>
          <button type="button" class="portfolio-card__save" @click="toggleSave(item.id)">
            <v-icon size="15">{{ savedBoards.includes(item.id) ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
          </button>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <div class="portfolio-card__stats">
          <span v-for="stat in item.stats" :key="stat">{{ stat }}</span>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.portfolio-page {
  padding: 0;
  background:
    radial-gradient(circle at top right, rgba(203, 162, 122, 0.14), transparent 24rem),
    linear-gradient(180deg, #f5eee5 0%, #efeee8 100%);
}

.portfolio-hero,
.portfolio-filter,
.portfolio-stage,
.portfolio-grid {
  width: min(1560px, calc(100% - 2rem));
  margin: 0 auto;
}

.portfolio-hero {
  padding: 0.95rem 0 0.85rem;
}

.portfolio-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.54fr) minmax(18.5rem, 0.46fr);
  gap: 0.8rem;
  padding-top: 0.8rem;
  align-items: stretch;
}

.portfolio-label,
.portfolio-card__head span,
.portfolio-hero__panel span {
  color: rgba(34, 49, 39, 0.5);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.portfolio-hero__copy h1 {
  max-width: min(100%, 15.5em);
  margin-top: 0.55rem;
  color: #1f2b25;
  font-size: clamp(1.32rem, 2vw, 2.04rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.portfolio-hero__copy {
  display: grid;
  align-content: center;
  min-height: 11.5rem;
}

.portfolio-hero__copy p:last-child {
  max-width: 38rem;
  margin-top: 0.68rem;
  color: #59655c;
  font-size: 0.76rem;
  line-height: 1.68;
}

.portfolio-hero__panel {
  display: grid;
  align-content: start;
  gap: 0.42rem;
  min-height: 11.5rem;
  padding: 0.88rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.34);
}

.portfolio-hero__panel strong {
  color: #223127;
  font-size: 0.94rem;
  line-height: 1.35;
}

.portfolio-hero__panel p {
  color: #59655c;
  font-size: 0.72rem;
  line-height: 1.6;
}

.portfolio-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.65rem 0 0.82rem;
  border-top: 1px solid rgba(34, 49, 39, 0.08);
  border-bottom: 1px solid rgba(34, 49, 39, 0.08);
}

.portfolio-filter__item,
.portfolio-stage__stats span,
.portfolio-card__stats span {
  padding: 0.54rem 0.7rem;
  border: 1px solid rgba(34, 49, 39, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.36);
  color: #223127;
  font-size: 0.64rem;
}

.portfolio-filter__item.is-active {
  background: #223127;
  color: #f4efe7;
  border-color: #223127;
}

.portfolio-stage {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.14fr);
  gap: 0.95rem;
  padding: 0.95rem 0 0.8rem;
  align-items: stretch;
}

.portfolio-stage__lead {
  display: grid;
  align-content: space-between;
  gap: 0.8rem;
  padding: 0.95rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.3);
}

.portfolio-stage__meta h2 {
  margin-top: 0.55rem;
  color: #1f2b25;
  font-size: clamp(1.26rem, 2.2vw, 2.15rem);
  line-height: 1.04;
  font-weight: 800;
}

.portfolio-stage__meta p {
  max-width: 27rem;
  margin-top: 0.62rem;
  color: #5b665d;
  font-size: 0.74rem;
  line-height: 1.64;
}

.portfolio-stage__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.portfolio-stage__notes {
  display: grid;
  gap: 0.55rem;
  align-content: stretch;
}

.portfolio-stage__note {
  padding: 0.9rem 0.95rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.34);
  color: #223127;
  font-size: 0.74rem;
  line-height: 1.62;
  display: flex;
  align-items: center;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
  padding: 0.2rem 0 2rem;
  align-items: stretch;
}

.portfolio-card {
  display: grid;
  align-content: start;
  gap: 0.02rem;
  padding: 0.8rem;
  border-radius: 0.98rem;
  background: rgba(255, 255, 255, 0.34);
  min-height: 12rem;
}

.portfolio-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.portfolio-card__save {
  width: 1.85rem;
  height: 1.85rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: #223127;
}

.portfolio-card h3 {
  margin-top: 0.5rem;
  color: #223127;
  font-size: 0.84rem;
  line-height: 1.42;
}

.portfolio-card p {
  margin-top: 0.42rem;
  color: #5b665d;
  font-size: 0.7rem;
  line-height: 1.58;
}

.portfolio-card__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
  margin-top: auto;
  padding-top: 0.75rem;
}

.portfolio-card__stats span {
  border: 0;
  background: rgba(255, 255, 255, 0.56);
  color: #5b665d;
  font-size: 0.6rem;
}

@media (max-width: 1100px) {
  .portfolio-hero__grid,
  .portfolio-stage,
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
}
</style>
