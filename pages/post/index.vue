<script lang="ts" setup>
definePageMeta({ layout: "page" });

usePageSEO({
  title: "POD 设计知识库 - 衣设",
  description:
    "衣设知识库聚合 POD 印花教程、图案延展方法、商品化案例、趋势资讯和 AI 设计经验，帮助创作者把灵感变成定制商品。",
  keywords:
    "POD设计知识库,印花教程,图案延展,商品化案例,AI设计,创意趋势,定制商品,衣设",
  url: "https://1s.design/post",
  type: "website",
});

type KnowledgeItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  difficulty: "基础" | "进阶" | "高级";
  tags: string[];
  author: string;
  date: string;
  reads: string;
  saves: string;
  likes: string;
  minutes: string;
  coverTone: string;
  coverLabel: string;
  featured?: boolean;
  hot?: boolean;
  practicePath: string;
  practiceText: string;
};

type LearningPath = {
  title: string;
  description: string;
  target: string;
  action: string;
};

type SkillCluster = {
  title: string;
  intro: string;
  items: string[];
};

const knowledgeItems: KnowledgeItem[] = [
  {
    id: "logo-grid",
    title: "Logo 初稿为什么总显得不专业：先把网格、留白和识别点做对",
    excerpt: "适合品牌新手的入门教程，先用最少的规则把 logo 初稿从“像练习”拉到“像品牌”。",
    category: "Logo",
    difficulty: "基础",
    tags: ["品牌识别", "留白", "图形简化"],
    author: "Yishe Lab",
    date: "2026-03-12",
    reads: "18.2k",
    saves: "2.6k",
    likes: "4.1k",
    minutes: "8 min",
    coverTone: "from-[#eadfce] via-[#f6efe6] to-[#d8e0d7]",
    coverLabel: "Logo Grid",
    featured: true,
    practicePath: "/free-design",
    practiceText: "去免费设计里搭第一版品牌视觉",
  },
  {
    id: "pod-pattern",
    title: "一张图案如何延展成 6 类 POD 商品：从构图比例到实际落位",
    excerpt: "不是单讲图案审美，而是告诉你怎么判断一张设计更适合 T 恤、杯具还是家居品。",
    category: "POD",
    difficulty: "进阶",
    tags: ["POD 商品", "图案延展", "商品映射"],
    author: "衣设商品化团队",
    date: "2026-03-08",
    reads: "13.7k",
    saves: "1.9k",
    likes: "3.5k",
    minutes: "12 min",
    coverTone: "from-[#dfe7de] via-[#f7f4ee] to-[#edd9cf]",
    coverLabel: "Pattern to SKU",
    hot: true,
    practicePath: "/products",
    practiceText: "去 POD 商品库看图案如何继续商品化",
  },
  {
    id: "color-system",
    title: "品牌配色总显脏？一套可直接套用的色彩搭配判断方法",
    excerpt: "从主色、辅助色、背景色和功能色拆开讲，适合品牌页、主图页和详情页统一配色。",
    category: "色彩",
    difficulty: "基础",
    tags: ["色彩搭配", "品牌配色", "视觉统一"],
    author: "Yishe Academy",
    date: "2026-03-05",
    reads: "9.8k",
    saves: "1.4k",
    likes: "2.9k",
    minutes: "7 min",
    coverTone: "from-[#efe2d7] via-[#f8f5ee] to-[#e2e5da]",
    coverLabel: "Color Logic",
    practicePath: "/free-design",
    practiceText: "去免费设计里尝试不同配色方向",
  },
  {
    id: "xiaohongshu-cover",
    title: "爆款封面不是大字就够了：小红书封面节奏的 4 个决定因素",
    excerpt: "适合社媒创作者和品牌运营，从标题层级、视觉焦点和停留感讲封面设计。",
    category: "社媒",
    difficulty: "进阶",
    tags: ["小红书封面", "社媒排版", "内容种草"],
    author: "内容增长组",
    date: "2026-03-01",
    reads: "21.3k",
    saves: "3.2k",
    likes: "5.6k",
    minutes: "10 min",
    coverTone: "from-[#f1ddd5] via-[#fff7f2] to-[#e4e7dc]",
    coverLabel: "Cover Rhythm",
    featured: true,
    practicePath: "/free-design",
    practiceText: "去社媒设计场景里直接试封面系统",
  },
  {
    id: "ai-redraft",
    title: "AI 自动改稿什么时候有用，什么时候只会越改越糟",
    excerpt: "从对话策略、反馈方式和版本管理讲 AI 改稿，适合正在使用生成工具的人。",
    category: "AI",
    difficulty: "高级",
    tags: ["AI 改稿", "Prompt", "版本管理"],
    author: "AI Design Lab",
    date: "2026-02-26",
    reads: "11.4k",
    saves: "1.7k",
    likes: "3.1k",
    minutes: "11 min",
    coverTone: "from-[#dde4df] via-[#f5f2ec] to-[#efe1d8]",
    coverLabel: "AI Redraft",
    hot: true,
    practicePath: "/ai-lab",
    practiceText: "去 AI 实验室继续做生成与改稿",
  },
  {
    id: "home-textile",
    title: "家居图案为什么容易廉价：布艺与空间感之间的 3 个判断逻辑",
    excerpt: "适合抱枕、挂毯、桌布和墙面相关设计，重点在空间里的真实呈现效果。",
    category: "家居",
    difficulty: "进阶",
    tags: ["家居图案", "布艺设计", "空间感"],
    author: "生活方式编辑部",
    date: "2026-02-20",
    reads: "8.2k",
    saves: "1.1k",
    likes: "2.3k",
    minutes: "9 min",
    coverTone: "from-[#e6ddcf] via-[#fbf7f0] to-[#d8e0d6]",
    coverLabel: "Textile Mood",
    practicePath: "/products",
    practiceText: "去 POD 商品库看家居图案如何落地",
  },
  {
    id: "type-hierarchy",
    title: "排版一乱就显得像模板：标题层级和阅读路径到底怎么排",
    excerpt: "不是教软件命令，而是教你怎么让用户读下去，适合详情页、教程页和海报页。",
    category: "排版",
    difficulty: "基础",
    tags: ["排版", "标题层级", "阅读路径"],
    author: "版式研究室",
    date: "2026-02-15",
    reads: "16.1k",
    saves: "2.1k",
    likes: "4.4k",
    minutes: "6 min",
    coverTone: "from-[#ece4da] via-[#ffffff] to-[#dce3d8]",
    coverLabel: "Type System",
    practicePath: "/free-design",
    practiceText: "去免费设计里尝试排版方向",
  },
  {
    id: "trend-report",
    title: "2026 春夏创意趋势：从颜色、题材到更容易成交的商品方向",
    excerpt: "适合想做上新企划的人，用更商业化的视角看趋势，不只是看好不好看。",
    category: "趋势",
    difficulty: "高级",
    tags: ["趋势资讯", "春夏", "商品方向"],
    author: "Yishe Trend",
    date: "2026-02-10",
    reads: "24.5k",
    saves: "4.4k",
    likes: "6.2k",
    minutes: "14 min",
    coverTone: "from-[#dfe6db] via-[#f8f6f0] to-[#f0ddd1]",
    coverLabel: "Trend Watch",
    featured: true,
    hot: true,
    practicePath: "/design",
    practiceText: "去定制设计页把趋势转成真实企划",
  },
];

const categoryOptions = ["全部", "Logo", "POD", "色彩", "社媒", "AI", "家居", "排版", "趋势"];
const difficultyOptions = ["全部", "基础", "进阶", "高级"];
const tagCloud = [
  "色彩搭配",
  "排版",
  "品牌识别",
  "POD 商品",
  "图案延展",
  "小红书封面",
  "AI 改稿",
  "趋势资讯",
  "视觉统一",
  "阅读路径",
  "内容种草",
  "商品映射",
];

const learningPaths: LearningPath[] = [
  {
    title: "品牌起稿路径",
    description: "先梳理识别、色彩和版式，再进入品牌视觉初稿。",
    target: "/free-design",
    action: "进入免费设计",
  },
  {
    title: "商品化验证路径",
    description: "从图案延展到 SKU 映射，适合把知识接入 POD。",
    target: "/products",
    action: "进入 POD 商品库",
  },
  {
    title: "AI 共创路径",
    description: "适合快速试风格、做改稿和趋势推演。",
    target: "/ai-lab",
    action: "进入 AI 工作台",
  },
];

const skillClusters: SkillCluster[] = [
  {
    title: "视觉基础",
    intro: "解决做出来不够像专业设计的问题。",
    items: ["色彩搭配", "排版", "品牌识别", "阅读路径"],
  },
  {
    title: "内容增长",
    intro: "针对封面点击率、种草表达和内容节奏。",
    items: ["小红书封面", "内容种草", "视觉统一"],
  },
  {
    title: "商品转化",
    intro: "把图案和结构接到 POD 商品与商业动作。",
    items: ["POD 商品", "图案延展", "商品映射", "趋势资讯"],
  },
];

const activeCategory = ref("全部");
const activeDifficulty = ref("全部");
const activeTags = ref<string[]>(["色彩搭配"]);
const searchValue = ref("");
const visibleCount = ref(6);
const activePreviewId = ref(knowledgeItems[0].id);

const featuredList = computed(() => knowledgeItems.filter((item) => item.featured).slice(0, 3));
const hotList = computed(() => knowledgeItems.filter((item) => item.hot).slice(0, 4));

const filteredList = computed(() => {
  return knowledgeItems.filter((item) => {
    const categoryMatch = activeCategory.value === "全部" || item.category === activeCategory.value;
    const difficultyMatch = activeDifficulty.value === "全部" || item.difficulty === activeDifficulty.value;
    const tagMatch =
      activeTags.value.length === 0 || activeTags.value.every((tag) => item.tags.includes(tag));
    const searchTarget = `${item.title} ${item.excerpt} ${item.tags.join(" ")} ${item.category}`;
    const searchMatch =
      searchValue.value.trim().length === 0 ||
      searchTarget.toLowerCase().includes(searchValue.value.trim().toLowerCase());

    return categoryMatch && difficultyMatch && tagMatch && searchMatch;
  });
});

const visibleList = computed(() => filteredList.value.slice(0, visibleCount.value));
const activePreview = computed(
  () => filteredList.value.find((item) => item.id === activePreviewId.value) || filteredList.value[0] || knowledgeItems[0],
);
const insightStats = computed(() => [
  { label: "当前匹配", value: `${filteredList.value.length} 篇` },
  { label: "高热主题", value: `${hotList.value.length} 组` },
  { label: "转化入口", value: "3 条路径" },
]);
const previewTakeaways = computed(() => activePreview.value?.tags.slice(0, 3) || []);

watch(filteredList, (list) => {
  if (!list.length) return;
  visibleCount.value = Math.max(6, Math.min(visibleCount.value, list.length));
  if (!list.some((item) => item.id === activePreviewId.value)) activePreviewId.value = list[0].id;
}, { immediate: true });

const toggleTag = (tag: string) => {
  if (activeTags.value.includes(tag)) {
    activeTags.value = activeTags.value.filter((item) => item !== tag);
    return;
  }
  activeTags.value = [...activeTags.value, tag];
};

const loadMore = () => {
  visibleCount.value = Math.min(visibleCount.value + 3, filteredList.value.length);
};

const clearFilters = () => {
  activeCategory.value = "全部";
  activeDifficulty.value = "全部";
  activeTags.value = [];
  searchValue.value = "";
};

const goToPath = (path: string) => navigateTo(path);
</script>

<template>
  <div class="knowledge-page px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1680px] space-y-8">
      <section class="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div class="knowledge-panel bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(241,234,224,0.92))] p-6 lg:p-8">
          <div class="minimal-kicker">Knowledge Center</div>
          <div class="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 class="max-w-[12ch] font-[var(--ys-font-display),Georgia,serif] text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.9] text-[#243127]">
                POD 印花、视觉趋势与商品化知识库。
              </h1>
              <p class="mt-4 max-w-3xl text-[0.95rem] leading-8 text-[#5f695f]">
                学习图案延展、商品映射、品牌视觉、AI 辅助创作和上新企划，把设计知识直接连接到定制商品和创意资产。
              </p>
            </div>

            <div class="grid gap-3">
              <div v-for="item in insightStats" :key="item.label" class="rounded-[1.4rem] bg-[#f7f3ec] p-4">
                <span class="text-[0.72rem] text-[#708072]">{{ item.label }}</span>
                <strong class="mt-2 block text-[1.05rem] text-[#243127]">{{ item.value }}</strong>
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <BaseButton variant="primary" size="lg" @click="goToPath('/free-design')">开始学习并实践</BaseButton>
            <BaseButton variant="outline" size="lg" @click="activePreviewId = featuredList[0]?.id || knowledgeItems[0].id">查看编辑精选</BaseButton>
          </div>
        </div>

        <div class="knowledge-panel bg-[linear-gradient(160deg,#ebe0d1,#dde5dc)] p-4">
          <div class="min-h-[20rem] rounded-[1.7rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.68),transparent_50%),linear-gradient(135deg,#f8f3eb,#dfe5db)] p-6 flex flex-col justify-end">
            <div class="w-fit rounded-full bg-white/80 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-[#677467]">Issue 03</div>
            <strong class="mt-4 block max-w-[14ch] font-[var(--ys-font-display),Georgia,serif] text-[clamp(1.9rem,4vw,3rem)] leading-[1.02] text-[#223127]">
              {{ featuredList[0]?.title }}
            </strong>
            <p class="mt-3 max-w-xl text-[0.82rem] leading-7 text-[#5b655d]">{{ featuredList[0]?.excerpt }}</p>
          </div>

          <div class="mt-3 grid gap-3">
            <button
              v-for="item in featuredList"
              :key="item.id"
              type="button"
              :class="[
                'flex items-center justify-between gap-4 rounded-[1.15rem] px-4 py-4 text-left transition duration-300',
                activePreviewId === item.id ? 'bg-white shadow-sm translate-x-1' : 'bg-white/70 hover:bg-white hover:translate-x-1',
              ]"
              @click="activePreviewId = item.id"
            >
              <span class="text-[0.72rem] text-[#708072]">{{ item.category }}</span>
              <strong class="text-[0.92rem] text-[#243127]">{{ item.coverLabel }}</strong>
            </button>
          </div>
        </div>
      </section>

      <section class="knowledge-workbench">
        <aside class="filter-panel">
          <div class="panel-title">筛选器</div>
          <div class="filter-group">
            <span class="filter-label">设计类型</span>
            <div class="token-wrap">
              <button
                v-for="item in categoryOptions"
                :key="item"
                type="button"
                :class="['filter-token', activeCategory === item ? 'is-active' : '']"
                @click="activeCategory = item"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <span class="filter-label">难度等级</span>
            <div class="token-wrap">
              <button
                v-for="item in difficultyOptions"
                :key="item"
                type="button"
                :class="['filter-token', activeDifficulty === item ? 'is-active' : '']"
                @click="activeDifficulty = item"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <span class="filter-label">热门标签</span>
            <div class="token-wrap">
              <button
                v-for="item in tagCloud"
                :key="item"
                type="button"
                :class="['filter-token', activeTags.includes(item) ? 'is-active' : '']"
                @click="toggleTag(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <div class="filter-group">
            <span class="filter-label">搜索知识</span>
            <input v-model="searchValue" class="knowledge-input" type="text" placeholder="搜索教程、技巧、案例或标签" />
          </div>

          <button class="reset-button" @click="clearFilters">重置筛选</button>

          <div class="filter-group">
            <span class="filter-label">学习路径</span>
            <div class="path-stack">
              <button
                v-for="item in learningPaths"
                :key="item.title"
                type="button"
                class="path-link"
                @click="goToPath(item.target)"
              >
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
                <span>{{ item.action }}</span>
              </button>
            </div>
          </div>
        </aside>

        <main class="content-stage">
          <section class="featured-strip">
            <div class="section-head">
              <div>
                <div class="minimal-kicker">Editorial Dossier</div>
                <h2>精选知识专题</h2>
              </div>
              <span>优先读这些，能最快建立页面价值感和专业感</span>
            </div>
            <div class="mt-5 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
              <button
                type="button"
                class="overflow-hidden rounded-[1.7rem] border border-[#2d3a3114] bg-white/90 text-left transition duration-300 hover:-translate-y-0.5"
                @click="activePreviewId = featuredList[0]?.id || knowledgeItems[0].id"
              >
                <div :class="['min-h-[20rem] rounded-b-[4rem] bg-gradient-to-br px-4 py-4', featuredList[0]?.coverTone]">
                  <span class="inline-flex rounded-full bg-white/85 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-[#5c675d]">{{ featuredList[0]?.coverLabel }}</span>
                </div>
                <div class="p-5">
                  <div class="flex flex-wrap gap-2 text-[0.72rem] text-[#708072]">
                    <span>{{ featuredList[0]?.category }}</span>
                    <span>{{ featuredList[0]?.difficulty }}</span>
                  </div>
                  <h3 class="mt-3 font-[var(--ys-font-display),Georgia,serif] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] text-[#243127]">{{ featuredList[0]?.title }}</h3>
                  <p class="mt-3 max-w-2xl text-[0.84rem] leading-8 text-[#5d685d]">{{ featuredList[0]?.excerpt }}</p>
                </div>
              </button>

              <div class="grid gap-4">
                <button
                  v-for="item in featuredList.slice(1)"
                  :key="item.id"
                  type="button"
                  class="grid gap-4 rounded-[1.45rem] border border-[#2d3a3114] bg-white/85 p-4 text-left transition duration-300 hover:-translate-y-0.5"
                  @click="activePreviewId = item.id"
                >
                  <div :class="['min-h-[8.5rem] rounded-[1.2rem] bg-gradient-to-br px-4 py-4', item.coverTone]">
                    <span class="inline-flex rounded-full bg-white/85 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-[#5c675d]">{{ item.coverLabel }}</span>
                  </div>
                  <div>
                    <div class="flex flex-wrap gap-2 text-[0.72rem] text-[#708072]">
                      <span>{{ item.category }}</span>
                      <span>{{ item.minutes }}</span>
                    </div>
                    <strong class="mt-2 block text-[1rem] leading-7 text-[#243127]">{{ item.title }}</strong>
                  </div>
                </button>
              </div>
            </div>
          </section>

          <section class="knowledge-list-section">
            <div class="section-head">
              <div>
                <div class="minimal-kicker">Knowledge Feed</div>
                <h2>教程与案例流</h2>
              </div>
              <span>{{ filteredList.length }} 篇内容匹配当前条件，按阅读路径连续浏览</span>
            </div>

            <div v-if="visibleList.length" class="mt-5 grid gap-4">
              <article
                v-for="(item, index) in visibleList"
                :key="item.id"
                :class="['story-node', activePreviewId === item.id ? 'is-highlight' : '']"
                @mouseenter="activePreviewId = item.id"
              >
                <div class="hidden pt-4 lg:flex">
                  <span class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#2d3a3114] bg-white/90 text-[0.86rem] text-[#6a766c]">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                </div>

                <button type="button" class="story-entry" @click="activePreviewId = item.id">
                  <div class="story-line"></div>
                  <div class="p-5 pl-6">
                    <div class="flex flex-wrap items-center justify-between gap-3">
                      <div class="flex flex-wrap gap-2">
                        <span class="rounded-full bg-[#f4efe6] px-3 py-1.5 text-[0.68rem] text-[#617061]">{{ item.category }}</span>
                        <span class="rounded-full bg-[#f4efe6] px-3 py-1.5 text-[0.68rem] text-[#617061]">{{ item.difficulty }}</span>
                      </div>
                      <div class="flex flex-wrap gap-2 text-[0.72rem] text-[#708072]">
                        <span>{{ item.author }}</span>
                        <span>{{ item.date }}</span>
                        <span>{{ item.minutes }}</span>
                      </div>
                    </div>

                    <div class="mt-4 grid gap-4 xl:grid-cols-[1fr_12rem] xl:items-start">
                      <h3 class="text-[1.2rem] leading-8 text-[#243127]">{{ item.title }}</h3>
                      <div :class="['min-h-[8rem] rounded-[1.3rem_1.3rem_3rem_3rem] bg-gradient-to-br px-4 py-4', item.coverTone]">
                        <span class="inline-flex rounded-full bg-white/85 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-[#5c675d]">{{ item.coverLabel }}</span>
                      </div>
                    </div>

                    <p class="mt-4 text-[0.83rem] leading-8 text-[#5d675d]">{{ item.excerpt }}</p>

                    <div class="mt-4 flex flex-wrap items-start justify-between gap-3">
                      <div class="flex flex-wrap gap-2">
                        <span v-for="tag in item.tags" :key="tag" class="rounded-full bg-[#f4efe6] px-3 py-1.5 text-[0.68rem] text-[#617061]">{{ tag }}</span>
                      </div>
                      <div class="flex flex-wrap gap-2 text-[0.72rem] text-[#708072]">
                        <span>{{ item.reads }} 阅读</span>
                        <span>{{ item.saves }} 收藏</span>
                        <span>{{ item.likes }} 点赞</span>
                      </div>
                    </div>
                  </div>
                </button>

                <button class="stream-action lg:self-stretch" @click="goToPath(item.practicePath)">
                  {{ item.practiceText }}
                </button>
              </article>
            </div>

            <div v-else class="empty-state">
              <strong>当前没有匹配内容</strong>
              <p>可以切换标签、放宽难度或直接重置筛选条件。</p>
            </div>

            <div v-if="visibleList.length < filteredList.length" class="mt-5 text-center">
              <BaseButton variant="secondary" size="lg" @click="loadMore">继续展开知识流</BaseButton>
            </div>
          </section>

          <section class="skill-map">
            <div class="section-head">
              <div>
                <div class="minimal-kicker">Skill Map</div>
                <h2>技能地图</h2>
              </div>
              <span>让知识从孤立文章，变成可导航的学习版图</span>
            </div>
            <div class="mt-5 grid gap-4 xl:grid-cols-3">
              <article
                v-for="item in skillClusters"
                :key="item.title"
                class="rounded-[1.55rem] border border-[#2d3a3114] bg-[linear-gradient(160deg,rgba(255,255,255,0.88),rgba(239,233,224,0.78))] p-4"
              >
                <strong class="text-[0.95rem] text-[#243127]">{{ item.title }}</strong>
                <p class="mt-2 text-[0.78rem] leading-7 text-[#627062]">{{ item.intro }}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <button
                    v-for="tag in item.items"
                    :key="tag"
                    type="button"
                    :class="[
                      'rounded-full px-4 py-3 text-[0.75rem] transition duration-300',
                      activeTags.includes(tag) ? 'bg-[linear-gradient(135deg,#243127,#60705e)] text-white' : 'bg-[#f7f3ec] text-[#526050] hover:-translate-y-0.5',
                    ]"
                    @click="toggleTag(tag)"
                  >
                    {{ tag }}
                  </button>
                </div>
              </article>
            </div>
          </section>
        </main>

        <aside class="preview-panel">
          <div class="preview-card">
            <div class="panel-title">阅读预览舱</div>
            <div v-if="activePreview" class="preview-body">
              <div :class="['preview-cover', activePreview.coverTone]">
                <span>{{ activePreview.coverLabel }}</span>
              </div>
              <div class="preview-meta-row">
                <span>{{ activePreview.category }}</span>
                <span>{{ activePreview.difficulty }}</span>
              </div>
              <h3>{{ activePreview.title }}</h3>
              <p>{{ activePreview.excerpt }}</p>
              <div class="preview-stat-grid">
                <div><span>阅读</span><strong>{{ activePreview.reads }}</strong></div>
                <div><span>收藏</span><strong>{{ activePreview.saves }}</strong></div>
                <div><span>点赞</span><strong>{{ activePreview.likes }}</strong></div>
              </div>
              <div class="preview-takeaways">
                <span v-for="item in previewTakeaways" :key="item">{{ item }}</span>
              </div>
              <div class="preview-action-list">
                <button class="preview-action">收藏</button>
                <button class="preview-action">点赞</button>
                <button class="preview-action">分享</button>
              </div>
              <button class="practice-button" @click="goToPath(activePreview.practicePath)">
                {{ activePreview.practiceText }}
              </button>
            </div>
          </div>

          <div class="preview-card warm">
            <div class="panel-title">热点雷达</div>
            <div class="hot-list">
              <button
                v-for="item in hotList"
                :key="item.id"
                type="button"
                class="hot-item"
                @click="activePreviewId = item.id"
              >
                <strong>{{ item.title }}</strong>
                <span>{{ item.reads }} 阅读</span>
              </button>
            </div>
          </div>
        </aside>
      </section>

      <section class="footer-cta">
        <div class="footer-cta-copy">
          <div class="minimal-kicker">Practice Now</div>
          <h2>从知识继续走向设计实践，再走向商品化。</h2>
          <p>学到这里不必停住。你可以直接进入设计灵感、AI 工作台或 POD 商品库，把刚刚吸收的知识变成真实动作。</p>
        </div>
        <div class="footer-cta-actions">
          <BaseButton variant="primary" size="lg" @click="goToPath('/free-design')">进入设计灵感</BaseButton>
          <BaseButton variant="outline" size="lg" @click="goToPath('/ai-lab')">进入 AI 工作台</BaseButton>
          <BaseButton variant="secondary" size="lg" @click="goToPath('/products')">进入 POD 商品库</BaseButton>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.knowledge-page {
  position: relative;
  background:
    radial-gradient(circle at 10% 10%, rgba(196, 138, 106, 0.1), transparent 20rem),
    radial-gradient(circle at 90% 16%, rgba(139, 154, 135, 0.12), transparent 24rem),
    linear-gradient(180deg, #f8f5ef, #f1ece4);
}

.knowledge-page::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

.knowledge-panel {
  border: 1px solid rgba(36, 49, 39, 0.08);
  border-radius: 1.8rem;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 20px 40px -28px rgba(45, 58, 49, 0.18);
}

.story-node {
  display: grid;
  gap: 0.8rem;
}

@media (min-width: 1024px) {
  .story-node {
    grid-template-columns: auto minmax(0, 1fr) minmax(16rem, 0.46fr);
    align-items: start;
  }
}

.story-entry {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(45, 58, 49, 0.08);
  border-radius: 1.7rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(244, 239, 231, 0.94));
  text-align: left;
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.story-entry:hover,
.story-node.is-highlight .story-entry {
  transform: translateY(-2px);
  box-shadow: 0 24px 34px -24px rgba(45, 58, 49, 0.24);
}

.story-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0.35rem;
  background: linear-gradient(180deg, #8c9a84, #c27b66);
}

.stream-action {
  border-radius: 1.2rem;
  padding: 0.95rem 1rem;
  background: linear-gradient(180deg, #243127, #556553);
  color: #fff;
  font-size: 0.82rem;
  text-align: left;
}

.knowledge-hero,
.knowledge-workbench,
.footer-cta {
  display: grid;
  gap: 1rem;
}

@media (min-width: 1200px) {
  .knowledge-hero {
    grid-template-columns: minmax(0, 1.08fr) minmax(20rem, 0.92fr);
  }
}

@media (min-width: 1450px) {
  .knowledge-workbench {
    grid-template-columns: minmax(18rem, 0.74fr) minmax(0, 1.5fr) minmax(20rem, 0.76fr);
  }
}

.hero-copy,
.hero-showcase,
.filter-panel,
.content-stage,
.preview-card,
.footer-cta {
  border: 1px solid rgba(36, 49, 39, 0.08);
  border-radius: 1.8rem;
  background: rgba(255, 255, 255, 0.82);
}

.hero-copy,
.hero-showcase,
.filter-panel,
.content-stage,
.preview-card,
.footer-cta {
  padding: 1.35rem;
}

.hero-copy {
  background: linear-gradient(145deg, rgba(255,255,255,0.92), rgba(243,236,228,0.86));
}

.hero-copy h1 {
  margin-top: 0.8rem;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 0.98;
  color: #223127;
}

.hero-copy p {
  margin-top: 1rem;
  max-width: 38rem;
  font-size: 0.95rem;
  line-height: 1.95;
  color: #5f695f;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.4rem;
}

.hero-showcase {
  display: grid;
  gap: 0.9rem;
  background: linear-gradient(160deg, #e9dfd2, #dfe6dd);
}

.showcase-primary {
  border-radius: 1.4rem;
  padding: 1.2rem;
  background: rgba(255,255,255,0.82);
}

.showcase-kicker,
.filter-label,
.panel-title {
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #7f857b;
}

.showcase-primary strong {
  display: block;
  margin-top: 0.7rem;
  font-family: var(--ys-font-display);
  font-size: 1.8rem;
  line-height: 1.08;
  color: #243127;
}

.showcase-primary p {
  margin-top: 0.85rem;
  font-size: 0.82rem;
  line-height: 1.8;
  color: #5d685e;
}

.showcase-stats {
  display: grid;
  gap: 0.8rem;
}

@media (min-width: 640px) {
  .showcase-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.showcase-stat {
  border-radius: 1.2rem;
  padding: 1rem;
  background: rgba(255,255,255,0.7);
}

.showcase-stat span {
  display: block;
  font-size: 0.72rem;
  color: #718074;
}

.showcase-stat strong {
  display: block;
  margin-top: 0.45rem;
  font-size: 1.1rem;
  color: #243127;
}

.filter-panel,
.content-stage,
.preview-panel {
  display: grid;
  gap: 1rem;
}

@media (min-width: 1450px) {
  .filter-panel,
  .preview-panel {
    position: sticky;
    top: 6rem;
    align-self: start;
  }
}

.filter-group {
  display: grid;
  gap: 0.75rem;
}

.token-wrap,
.skill-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.filter-token,
.skill-tag {
  border-radius: 999px;
  padding: 0.7rem 0.9rem;
  background: #faf8f5;
  font-size: 0.75rem;
  color: #59645a;
}

.filter-token.is-active,
.skill-tag.is-active {
  background: linear-gradient(135deg, #263328, #5d6d5c);
  color: #fff;
}

.knowledge-input {
  width: 100%;
  border: 1px solid rgba(36,49,39,0.1);
  border-radius: 1rem;
  background: #faf8f5;
  padding: 0.95rem 1rem;
  font-size: 0.78rem;
  outline: none;
}

.reset-button,
.preview-action,
.practice-button,
.wb-link {
  border-radius: 1rem;
}

.path-stack {
  display: grid;
  gap: 0.75rem;
}

.path-link {
  border-radius: 1.25rem;
  padding: 0.95rem;
  background: linear-gradient(145deg, rgba(239, 234, 224, 0.96), rgba(255, 255, 255, 0.86));
  text-align: left;
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.path-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 28px -22px rgba(45, 58, 49, 0.26);
}

.path-link strong {
  color: #243127;
}

.path-link p {
  margin-top: 0.45rem;
  font-size: 0.78rem;
  line-height: 1.7;
  color: #627062;
}

.path-link span {
  display: inline-flex;
  margin-top: 0.7rem;
  font-size: 0.74rem;
  color: #c27b66;
}

.reset-button {
  padding: 0.9rem 1rem;
  background: #263328;
  color: #fff;
  font-size: 0.82rem;
}

.section-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: end;
}

.section-head h2 {
  margin-top: 0.7rem;
  font-size: 1.9rem;
  color: #223127;
}

.section-head span {
  font-size: 0.76rem;
  color: #718074;
}

.featured-grid,
.knowledge-grid {
  display: grid;
  gap: 0.9rem;
  margin-top: 1rem;
}

@media (min-width: 900px) {
  .featured-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .knowledge-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .knowledge-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.featured-card,
.knowledge-card {
  overflow: hidden;
  border: 1px solid rgba(36,49,39,0.08);
  border-radius: 1.5rem;
  background: rgba(255,255,255,0.82);
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.featured-card:hover,
.knowledge-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--ys-shadow-md);
}

.featured-cover,
.knowledge-cover,
.preview-cover {
  position: relative;
  min-height: 10rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-image: linear-gradient(135deg, var(--tw-gradient-stops));
}

.featured-cover span,
.knowledge-cover span,
.preview-cover span {
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
  background: rgba(255,255,255,0.82);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #59645a;
}

.featured-meta,
.knowledge-card-body {
  padding: 1rem;
}

.featured-meta strong,
.knowledge-card-body h3,
.preview-body h3 {
  display: block;
  font-size: 1.05rem;
  line-height: 1.45;
  color: #243127;
}

.featured-meta p,
.knowledge-card-body p,
.preview-body p {
  margin-top: 0.6rem;
  font-size: 0.8rem;
  line-height: 1.75;
  color: #5d685e;
}

.knowledge-hover {
  position: absolute;
  inset: auto 0.8rem 0.8rem 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 0.5rem;
}

.knowledge-hover-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.knowledge-hover-tags span,
.knowledge-hover-link {
  border-radius: 999px;
  padding: 0.4rem 0.7rem;
  background: rgba(255,255,255,0.82);
  font-size: 0.68rem;
  color: #5d685e;
}

.knowledge-card-top,
.preview-meta-row,
.knowledge-stats,
.knowledge-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.meta-pill {
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  background: #f6f1ea;
  font-size: 0.68rem;
  color: #647064;
}

.knowledge-card-footer {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.9rem;
}

.knowledge-meta,
.knowledge-stats {
  font-size: 0.72rem;
  color: #738077;
}

.empty-state,
.load-more-wrap {
  margin-top: 1rem;
  text-align: center;
}

.empty-state {
  border-radius: 1.5rem;
  padding: 2rem 1rem;
  background: rgba(255,255,255,0.72);
}

.skill-cloud {
  margin-top: 1rem;
}

.preview-card.warm {
  background: linear-gradient(135deg, rgba(239,232,223,0.94), rgba(255,255,255,0.86));
}

.preview-body {
  display: grid;
  gap: 1rem;
}

.preview-cover {
  min-height: 12rem;
  border-radius: 1.3rem;
}

.preview-stat-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.preview-stat-grid div {
  border-radius: 1rem;
  padding: 0.85rem 0.8rem;
  background: rgba(255,255,255,0.84);
}

.preview-stat-grid span {
  display: block;
  font-size: 0.68rem;
  color: #7c867d;
}

.preview-stat-grid strong {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.96rem;
  color: #243127;
}

.preview-action-list {
  display: flex;
  gap: 0.6rem;
}

.preview-takeaways {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.preview-takeaways span {
  border-radius: 999px;
  padding: 0.55rem 0.78rem;
  background: rgba(239, 233, 224, 0.96);
  font-size: 0.72rem;
  color: #5c685d;
}

.preview-action {
  flex: 1;
  padding: 0.8rem;
  background: #faf8f5;
  font-size: 0.75rem;
  color: #5b665c;
}

.practice-button {
  padding: 0.95rem 1rem;
  background: #263328;
  color: #fff;
  font-size: 0.82rem;
  text-align: left;
}

.hot-list {
  display: grid;
  gap: 0.75rem;
}

.hot-item {
  padding: 0.95rem 0;
  text-align: left;
  border-bottom: 1px solid rgba(36,49,39,0.08);
}

.hot-item strong {
  display: block;
  font-size: 0.88rem;
  line-height: 1.6;
  color: #243127;
}

.hot-item span {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.72rem;
  color: #79857c;
}

.footer-cta {
  align-items: center;
}

@media (min-width: 1100px) {
  .footer-cta {
    grid-template-columns: minmax(0, 1.08fr) minmax(20rem, 0.92fr);
  }
}

.footer-cta-copy h2 {
  margin-top: 0.75rem;
  font-size: 2rem;
  color: #223127;
}

.footer-cta-copy p {
  margin-top: 0.85rem;
  max-width: 40rem;
  font-size: 0.9rem;
  line-height: 1.9;
  color: #5e695f;
}

.footer-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
