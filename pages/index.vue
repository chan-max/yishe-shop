<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { api } from "../utils/api";
import { getPreviewImageUrl } from "../utils/image";

definePageMeta({ layout: "page" });

usePageSEO({
  title: "衣设 yishe - 把想法穿出去的 POD 设计平台",
  description:
    "衣设把设计灵感、POD 商品、创作工具和分享内容放在同一个地方。不是先学会设计才来，而是先把想法做出来。",
  keywords:
    "POD设计,个性设计,服装设计,图案设计,创意分享,独立设计品牌,商品设计,1s.design",
  url: "https://1s.design",
  type: "website",
  structuredData: [useWebsiteStructuredData(), useOrganizationStructuredData()],
});

type FeaturedProduct = {
  id: string;
  title: string;
  description?: string;
  category: string;
  image: string;
  imageUrl?: string;
};

const categoryPills = [
  "印花图案",
  "服饰单品",
  "周边与礼物",
  "品牌视觉",
  "联名系列",
];
const impactStats = [
  { value: "15K+", label: "正在被看的设计" },
  { value: "8K+", label: "有表达欲的人" },
  { value: "70+", label: "正在发生的城市" },
  { value: "3M+", label: "每月被翻到的次数" },
];
const storySteps = [
  {
    step: "01",
    title: "先逛",
    description: "从风格、品类和别人做过的东西里，先找到一点你愿意靠近的审美。",
  },
  {
    step: "02",
    title: "再动手",
    description: "想认真做，就进定制服务；想先试试，也可以从一件小东西开始。",
  },
  {
    step: "03",
    title: "然后留下来",
    description: "把作品放出来，被人看到，被人记住，慢慢长成你自己的风格。",
  },
];
const businessModules = [
  {
    title: "看看别人都把什么想法穿出去了",
    text: "从作品集、案例和专题里先找感觉。看得越多，越容易知道自己真正想做什么。",
    action: "去翻作品",
    to: "/portfolio",
  },
  {
    title: "把一个念头认真做成系列",
    text: "适合要做品牌首发、联名企划或长期上新的项目，不是随便出图，是把方向做顺。",
    action: "写下想法",
    to: "/design",
  },
  {
    title: "先把灵感摊开，再看它能长成什么",
    text: "这里放的是衣设接下来会接进来的创作工具，让做设计这件事更像日常动作，而不是专业门槛。",
    action: "看看工具",
    to: "/ai-lab",
  },
];
const personalizedModes = [
  {
    name: "品牌刚开始",
    detail: "从第一批上新、第一组视觉到第一件拿得出手的商品，一起定下来。",
  },
  {
    name: "想做一波主题",
    detail: "适合节日、活动、联名或短期上新，重点是让人一眼记住这次表达。",
  },
  {
    name: "有作品想变现",
    detail: "把你原本画出来、拍出来、写出来的东西，慢慢变成能卖的系列。",
  },
];
const futureSignals = [
  { title: "想法整理", desc: "把一堆零散关键词，整理成能继续做下去的方向。" },
  { title: "风格试穿", desc: "先看看同一个概念换几种气质，会不会更像你。" },
  {
    title: "商品落位",
    desc: "判断一张图、一个字或一个情绪，更适合落在哪类商品上。",
  },
];
const podCategories = [
  {
    name: "T 恤 / 卫衣",
    count: "120+",
    image: "/discovery/pod-tee.svg",
    keyword: "T恤",
    use: "服装印花",
    audience: "大众服饰",
    tone: "soft",
    bg: "#f2ebe2",
    iconBg: "#e9dfd2",
  },
  {
    name: "马克杯 / 水杯",
    count: "86+",
    image: "/discovery/pod-mug.svg",
    keyword: "杯子",
    use: "礼品周边",
    audience: "礼赠用户",
    tone: "dark",
    bg: "#ece7de",
    iconBg: "#dfd6c8",
  },
  {
    name: "托特包 / 帆布包",
    count: "74+",
    image: "/discovery/pod-bag.svg",
    keyword: "帆布包",
    use: "日常配件",
    audience: "通勤人群",
    tone: "line",
    bg: "#f4efe7",
    iconBg: "#e8dfd4",
  },
  {
    name: "手机壳",
    count: "68+",
    image: "/discovery/pod-phone.svg",
    keyword: "手机壳",
    use: "日常高频",
    audience: "年轻用户",
    tone: "soft",
    bg: "#eee8e0",
    iconBg: "#e2d8cb",
  },
  {
    name: "抱枕 / 家居布艺",
    count: "58+",
    image: "/discovery/pod-pillow.svg",
    keyword: "抱枕",
    use: "家居陈列",
    audience: "家居用户",
    tone: "line",
    bg: "#f3ede6",
    iconBg: "#e5dbcf",
  },
  {
    name: "挂毯 / 墙面装饰",
    count: "42+",
    image: "/discovery/pod-tapestry.svg",
    keyword: "挂毯",
    use: "空间装饰",
    audience: "生活方式",
    tone: "dark",
    bg: "#efe8dd",
    iconBg: "#e0d5c6",
  },
  {
    name: "毛巾 / 织物",
    count: "35+",
    image: "/discovery/pod-pillow.svg",
    keyword: "毛巾",
    use: "生活方式",
    audience: "家庭用户",
    tone: "soft",
    bg: "#f5efe8",
    iconBg: "#e9dfd3",
  },
  {
    name: "鼠标垫 / 办公周边",
    count: "29+",
    image: "/discovery/pod-phone.svg",
    keyword: "鼠标垫",
    use: "办公礼赠",
    audience: "办公人群",
    tone: "line",
    bg: "#ede7df",
    iconBg: "#e0d6c9",
  },
];
const styleBoards = [
  {
    name: "极简高级",
    image: "/discovery/pod-tee.svg",
    keyword: "极简",
    note: "留白、克制、品牌感",
  },
  {
    name: "日系留白",
    image: "/discovery/pod-mug.svg",
    keyword: "日系",
    note: "柔和、安静、生活化",
  },
  {
    name: "街头潮流",
    image: "/discovery/pod-bag.svg",
    keyword: "街头",
    note: "符号化、视觉冲击",
  },
  {
    name: "轻奢礼赠",
    image: "/discovery/pod-phone.svg",
    keyword: "轻奢",
    note: "精致、礼盒、节庆",
  },
  {
    name: "可爱治愈",
    image: "/discovery/pod-pillow.svg",
    keyword: "可爱",
    note: "插画感、软萌、温和",
  },
  {
    name: "户外自然",
    image: "/discovery/pod-tapestry.svg",
    keyword: "户外",
    note: "自然、露营、旅行",
  },
];
const hotKeywords = [
  "联名系列",
  "新中式图案",
  "法式花卉",
  "宠物周边",
  "情侣礼物",
  "露营风",
  "国潮插画",
  "节日限定",
  "品牌首发",
  "艺术家合作",
  "文创礼盒",
  "ins 家居",
];
const audiences = [
  {
    name: "想做副业的创作者",
    desc: "把自己的风格慢慢变成会有人买单的东西",
    keywords: ["品牌首发", "联名系列"],
  },
  {
    name: "有表达欲的普通人",
    desc: "不用先成为设计师，也能做点像自己的东西",
    keywords: ["艺术家合作", "文创礼盒"],
  },
  {
    name: "挑剔的个性消费者",
    desc: "逛的不是普通商品，而是能说明你是谁的选择",
    keywords: ["法式花卉", "ins 家居"],
  },
  {
    name: "活动与礼赠需求方",
    desc: "想找一批看起来不敷衍、送出去也有记忆点的设计",
    keywords: ["节日限定", "情侣礼物"],
  },
];
const useCases = [
  {
    title: "我想先找一件顺眼的",
    text: "直接去商品列表，先看什么东西会让你停下来。",
    action: "去逛逛",
    path: "/products",
  },
  {
    title: "我已经知道自己偏什么风格",
    text: "从作品和专题里进，比在列表里硬翻更快。",
    action: "看风格",
    path: "/portfolio",
  },
  {
    title: "我脑子里有个模糊的想法",
    text: "先从主题词和分类里缩小范围，再决定要买还是要做。",
    action: "先理一理",
    path: "/products",
  },
];
const discoveryScenes = [
  {
    title: "穿去见朋友",
    description: "适合先看 T 恤、卫衣、托特包这类会直接带出门的东西。",
    keyword: "T恤",
    action: "看穿搭方向",
  },
  {
    title: "放在办公桌上",
    description:
      "从马克杯、鼠标垫、手机壳开始，日常使用频率高，也更容易先试一轮。",
    keyword: "马克杯",
    action: "看桌面小物",
  },
  {
    title: "拿去当礼物",
    description: "如果是送人，优先看礼盒感、轻奢感和容易被记住的周边组合。",
    keyword: "礼物",
    action: "看送礼方向",
  },
];

const featuredProducts = ref<FeaturedProduct[]>([]);
const featuredShowcase = computed(() => featuredProducts.value.slice(0, 6));
const heroPrimary = computed(() => featuredProducts.value[0]);

const fetchFeaturedProducts = async () => {
  try {
    const response = await api.productList.getPage({
      page: 1,
      pageSize: 6,
      isPublish: true,
      includeRelations: false,
    });
    if (
      response.code === 0 ||
      response.status === true ||
      response.code === 200
    ) {
      const products = (response.data as any)?.list || [];
      featuredProducts.value = products.map((product: any) => {
        const firstImage =
          Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : null;
        return {
          id: product.id,
          title: product.name || "商品",
          description: product.description || "",
          category: "精选作品",
          image: "grad1",
          imageUrl: firstImage,
        };
      });
    }
  } catch (error) {
    console.error("获取精选商品失败:", error);
    featuredProducts.value = [
      {
        id: "1",
        title: "鎏金花卉印花系列",
        description: "适合高级女装与围巾延展的精致图案。",
        category: "pattern",
        image: "grad1",
      },
      {
        id: "2",
        title: "解构廓形卫衣企划",
        description: "适合独立品牌首发的卫衣系列方案。",
        category: "clothing",
        image: "grad2",
      },
      {
        id: "3",
        title: "艺术家联名杯具周边",
        description: "把平面创作自然转化成可售卖的 POD 商品。",
        category: "product",
        image: "grad3",
      },
      {
        id: "4",
        title: "包装视觉提案",
        description: "提升品牌礼盒和包装开箱体验。",
        category: "packaging",
        image: "grad4",
      },
      {
        id: "5",
        title: "秀场海报与社媒素材",
        description: "统一活动物料和社交传播视觉。",
        category: "campaign",
        image: "grad5",
      },
      {
        id: "6",
        title: "艺术家家居装饰画",
        description: "将作品延伸到更适合陈列与分享的场景。",
        category: "decor",
        image: "grad6",
      },
    ];
  }
};

const goToSearch = () => navigateTo("/products");
const goToExplore = () => navigateTo("/products");
const goToProductDetail = (productId: string) =>
  navigateTo(`/product/${productId}`);
const goToCustomDesign = () => navigateTo("/design");
const goToPortfolio = () => navigateTo("/portfolio");
const goToAiLab = () => navigateTo("/ai-lab");
const goToModule = (path: string) => navigateTo(path);
const goToKeyword = (keyword: string) =>
  navigateTo(`/products/${encodeURIComponent(keyword)}`);

const handleImageError = (event: Event, product: FeaturedProduct) => {
  const img = event.target as HTMLImageElement;
  if (product.imageUrl) {
    img.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='${product.image}' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23f5f5f4'/><stop offset='100%' stop-color='%23d6d3d1'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23${product.image})'/></svg>`;
  }
};

onMounted(() => {
  fetchFeaturedProducts();
});
</script>

<template>
  <div class="bg-[#f7f5f2] text-stone-950">
    <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div
        class="mx-auto grid max-w-[1560px] gap-8 xl:grid-cols-[0.96fr_1.04fr] xl:items-center"
      >
        <div class="max-w-2xl pt-2">
          <span
            class="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-stone-500 transition hover:-translate-y-[1px] hover:text-stone-900"
          >
            yishe / 1s.design
          </span>
          <h1
            class="mt-6 text-[34px] font-semibold leading-[1.15] text-stone-950 sm:text-[42px] lg:text-[52px]"
          >
            有些想法，适合穿在身上。
          </h1>
          <p class="mt-4 max-w-xl text-[13px] leading-7 text-stone-500">
            衣设把灵感、商品、创作和分享放在一起。不是先学会设计才来，而是先做一件你真的会穿出去的东西。
          </p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <BaseButton
              variant="primary"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToExplore"
              >先做一件看看</BaseButton
            >
            <BaseButton
              variant="outline"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToSearch"
              >先去逛逛</BaseButton
            >
          </div>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="pill in categoryPills"
              :key="pill"
              class="ys-chip cursor-default rounded-full px-3 py-1 text-[11px] transition hover:-translate-y-[1px]"
              >{{ pill }}</span
            >
          </div>
        </div>

        <div class="rounded-[1.35rem] bg-white p-3 sm:p-4 lg:p-5">
          <div class="grid gap-4">
            <article
              class="group rounded-[1.1rem] bg-[#f6f4f1] p-4 transition duration-200 hover:-translate-y-[2px] hover:bg-[#f3efe9] sm:p-5 lg:p-6"
            >
              <div
                v-if="heroPrimary"
                class="grid gap-4 md:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] md:items-stretch"
              >
                <div class="overflow-hidden rounded-[0.9rem] bg-stone-200">
                  <div class="aspect-[4/5] sm:aspect-[16/12] md:h-full md:min-h-[440px] md:aspect-auto overflow-hidden">
                    <img
                      v-if="heroPrimary.imageUrl"
                      :src="
                        getPreviewImageUrl(heroPrimary.imageUrl, {
                          width: 900,
                          quality: 80,
                          format: 'webp',
                        }) || undefined
                      "
                      :alt="heroPrimary.title"
                      class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      @error="handleImageError($event, heroPrimary)"
                    />
                    <div
                      v-else
                      class="h-full w-full bg-[linear-gradient(135deg,#e7e5e4,#f5f5f4,#d6d3d1)]"
                    ></div>
                  </div>
                </div>
                <div class="flex h-full flex-col gap-4">
                  <div
                    class="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-stone-400"
                  >
                    <span>{{ heroPrimary.category }}</span>
                    <span>Featured</span>
                  </div>
                  <div class="rounded-[1rem] bg-white/70 p-4 sm:p-5">
                    <div
                      class="text-[10px] uppercase tracking-[0.22em] text-stone-400"
                    >
                      A place for personal taste
                    </div>
                    <h2
                      class="mt-3 text-[20px] font-semibold leading-8 text-stone-950 sm:text-[24px]"
                    >
                      {{ heroPrimary.title }}
                    </h2>
                    <p
                      class="mt-3 text-[13px] leading-7 text-stone-500 sm:text-[14px]"
                    >
                      {{
                        heroPrimary.description ||
                        "先看到画面，再决定这是不是你会带走的那件。"
                      }}
                    </p>
                  </div>
                  <div
                    class="flex flex-1 flex-col justify-between rounded-[1rem] border border-white/70 bg-[#efe8df] p-4 sm:p-5"
                  >
                    <div>
                      <h3
                        class="text-[16px] font-semibold leading-7 text-stone-950"
                      >
                        不是在挑一件现成商品，是在找哪件更像你。
                      </h3>
                      <p class="mt-2 text-[12px] leading-6 text-stone-500">
                        右侧只保留一件代表商品，让首屏信息更聚焦，在平板和小屏下也更容易保持完整比例。
                      </p>
                    </div>
                    <button
                      class="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] text-stone-600 transition duration-200 hover:-translate-y-[1px] hover:bg-stone-950 hover:text-white"
                      @click="goToProductDetail(heroPrimary.id)"
                    >
                      看这件
                      <v-icon
                        size="14"
                        class="transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >mdi-arrow-top-right</v-icon
                      >
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto max-w-[1560px] space-y-4">
        <BusinessSectionIntro
          kicker="POD Discovery Hub"
          title="每一种分类，都单独放出来看。"
          description="不再堆成一整片分类墙。每个模块只讲一种使用场景，读起来更轻，也更像扁平化电商首页。"
        />

        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="item in podCategories"
            :key="item.name"
            type="button"
            class="group flex min-h-[188px] flex-col justify-between rounded-[1.2rem] px-5 py-5 text-left transition duration-200 hover:-translate-y-[1px]"
            :style="{ backgroundColor: item.bg }"
            @click="goToKeyword(item.keyword)"
          >
            <div class="flex items-start justify-between gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-[1rem]"
                :style="{ backgroundColor: item.iconBg }"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="h-6 w-6 object-contain transition duration-200 group-hover:scale-[1.04]"
                />
              </div>
              <div
                class="text-[10px] uppercase tracking-[0.18em] text-stone-400"
              >
                {{ item.count }}
              </div>
            </div>

            <div class="mt-6">
              <div class="text-[15px] font-semibold leading-6 text-stone-950">
                {{ item.name }}
              </div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">
                {{ item.use }}
              </p>
            </div>

            <div class="mt-6 flex items-center justify-between gap-3">
              <div class="text-[11px] text-stone-400">{{ item.audience }}</div>
              <div
                class="text-[10px] uppercase tracking-[0.16em] text-stone-500"
              >
                {{ item.use }}
              </div>
            </div>
          </button>
        </div>

        <div class="grid gap-3 xl:grid-cols-[1.05fr_0.95fr]">
          <section class="rounded-[1.2rem] bg-[#f6f1e8] px-5 py-5">
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-[15px] font-semibold text-stone-950">风格方向</h3>
              <button class="ys-quiet-link text-[11px]" @click="goToPortfolio">
                去翻作品
              </button>
            </div>
            <div class="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              <button
                v-for="item in styleBoards"
                :key="item.name"
                type="button"
                class="flex items-center gap-3 rounded-[1rem] bg-[#fbf8f3] px-3 py-3 text-left transition duration-200 hover:bg-white"
                @click="goToKeyword(item.keyword)"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-[0.85rem] bg-[#efe7db]"
                >
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="h-5 w-5 object-contain"
                  />
                </div>
                <div class="min-w-0">
                  <div class="text-[12px] font-medium text-stone-900">
                    {{ item.name }}
                  </div>
                  <div class="mt-0.5 text-[10px] text-stone-400">
                    {{ item.note }}
                  </div>
                </div>
              </button>
            </div>
          </section>

          <div class="grid gap-3">
            <section class="rounded-[1.2rem] bg-[#f3ede4] px-5 py-5">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-[15px] font-semibold text-stone-950">
                  从哪开始都行
                </h3>
                <button class="ys-quiet-link text-[11px]" @click="goToSearch">
                  去逛商品
                </button>
              </div>
              <div class="mt-4 grid gap-2.5">
                <button
                  v-for="item in useCases"
                  :key="item.title"
                  type="button"
                  class="rounded-[1rem] bg-[#fbf8f3] px-4 py-4 text-left transition duration-200 hover:bg-white"
                  @click="goToModule(item.path)"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div class="text-[12px] font-medium text-stone-900">
                      {{ item.title }}
                    </div>
                    <div
                      class="text-[10px] uppercase tracking-[0.16em] text-stone-400"
                    >
                      {{ item.action }}
                    </div>
                  </div>
                  <div class="mt-2 text-[11px] leading-6 text-stone-500">
                    {{ item.text }}
                  </div>
                </button>
              </div>
            </section>

            <section class="rounded-[1.2rem] bg-[#f8f3eb] px-5 py-5">
              <div>
                <h3 class="text-[15px] font-semibold text-stone-950">
                  大家最近在翻这些
                </h3>
                <p class="mt-1 text-[11px] text-stone-400">
                  先从词开始，比先想完整需求更轻。
                </p>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <button
                  v-for="item in hotKeywords"
                  :key="item"
                  type="button"
                  class="rounded-full bg-[#fbf8f3] px-3 py-1.5 text-[11px] text-stone-600 transition duration-200 hover:bg-white hover:text-stone-950"
                  @click="goToKeyword(item)"
                >
                  {{ item }}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div class="mx-auto grid max-w-[1560px] gap-3 md:grid-cols-4">
        <div
          v-for="item in impactStats"
          :key="item.label"
          class="rounded-[1rem] border border-stone-200 bg-white px-5 py-4 transition duration-200 hover:border-stone-300 hover:bg-[#fcfbf9]"
        >
          <dt class="text-[10px] uppercase tracking-[0.22em] text-stone-400">
            {{ item.label }}
          </dt>
          <dd class="mt-2 text-[24px] font-semibold text-stone-950">
            {{ item.value }}
          </dd>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div
        class="mx-auto grid max-w-[1560px] gap-5 lg:grid-cols-[0.72fr_1.28fr]"
      >
        <div>
          <span class="text-[10px] uppercase tracking-[0.24em] text-stone-400"
            >Workflow</span
          >
          <h2
            class="mt-3 text-[28px] font-semibold leading-[1.25] text-stone-950"
          >
            表达这件事，不该搞得太重。
          </h2>
          <p class="mt-4 max-w-md text-[13px] leading-7 text-stone-500">
            所以衣设把路径做得很轻。先看，先试，先留下一个像你的东西，再慢慢往前走。
          </p>
        </div>
        <div class="grid gap-3 md:grid-cols-3">
          <article
            v-for="item in storySteps"
            :key="item.step"
            class="rounded-[1rem] border border-stone-200 bg-white p-5 transition duration-200 hover:border-stone-300 hover:bg-[#fcfbf9]"
          >
            <span
              class="text-[10px] uppercase tracking-[0.22em] text-stone-400"
              >{{ item.step }}</span
            >
            <h3 class="mt-3 text-[18px] font-semibold text-stone-950">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-[12px] leading-6 text-stone-500">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div
        class="mx-auto max-w-[1560px] rounded-[1.6rem] bg-white p-5 sm:p-6 lg:p-7"
      >
        <BusinessSectionIntro
          kicker="Business Modules"
          title="三个入口，对应三种靠近衣设的方式。"
          description="有人先逛，有人先做，有人先找工具。都可以，重点是别把灵感晾太久。"
        />
        <div class="mt-6 grid gap-3 xl:grid-cols-3">
          <article
            v-for="item in businessModules"
            :key="item.title"
            class="ys-card rounded-[1.2rem] p-5"
          >
            <div class="text-[16px] font-semibold text-stone-950">
              {{ item.title }}
            </div>
            <p class="mt-3 text-[12px] leading-6 text-stone-500">
              {{ item.text }}
            </p>
            <button
              class="ys-chip mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] transition duration-200 hover:-translate-y-[1px]"
              @click="goToModule(item.to)"
            >
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
            title="想认真做一轮，就把它做得像回事。"
            description="适合品牌、创作者或正在试副业的人，把一个模糊念头整理成能展示、能上架、也能继续卖的系列。"
          />
          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <div
              v-for="item in personalizedModes"
              :key="item.name"
              class="rounded-[1rem] border border-stone-200 bg-[#faf8f5] p-4"
            >
              <div class="text-[14px] font-semibold text-stone-950">
                {{ item.name }}
              </div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">
                {{ item.detail }}
              </p>
            </div>
          </div>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <BaseButton
              variant="primary"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToCustomDesign"
              >把刚刚那个想法写下来</BaseButton
            >
            <BaseButton
              variant="secondary"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToPortfolio"
              >先看别人怎么做</BaseButton
            >
          </div>
        </div>

        <div class="rounded-[1.55rem] bg-white p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="AI Ready"
            title="工具是用来帮你动手，不是替你决定审美。"
            description="衣设会把该有的辅助能力接进来，但最后留下来的，还是你的判断和态度。"
          />
          <div class="mt-6 grid gap-3">
            <div
              v-for="item in futureSignals"
              :key="item.title"
              class="rounded-[1rem] border border-stone-200 bg-[#faf8f5] p-4"
            >
              <div class="text-[14px] font-semibold text-stone-950">
                {{ item.title }}
              </div>
              <p class="mt-2 text-[12px] leading-6 text-stone-500">
                {{ item.desc }}
              </p>
            </div>
          </div>
          <div class="mt-6">
            <BaseButton
              variant="outline"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToAiLab"
              >看看工具会怎么帮忙</BaseButton
            >
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
      <div class="mx-auto max-w-[1560px]">
        <div class="flex items-end justify-between gap-6">
          <div>
            <span class="text-[10px] uppercase tracking-[0.24em] text-stone-400"
              >Selected Works</span
            >
            <h2
              class="mt-3 text-[28px] font-semibold leading-[1.25] text-stone-950"
            >
              这些东西，被带走以后才算完整。
            </h2>
          </div>
          <NuxtLink
            to="/products"
            class="hidden text-[11px] text-stone-500 transition hover:text-stone-950 sm:inline-flex sm:items-center sm:gap-2"
          >
            去看更多
            <v-icon
              size="15"
              class="transition duration-200 hover:translate-x-0.5"
              >mdi-arrow-right</v-icon
            >
          </NuxtLink>
        </div>

        <div class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="product in featuredShowcase"
            :key="product.id"
            class="group cursor-pointer rounded-[1rem] border border-stone-200 bg-white p-3 transition duration-200 hover:border-stone-300 hover:bg-[#fcfbf9]"
            @click="goToProductDetail(product.id)"
          >
            <div class="overflow-hidden rounded-[0.9rem] bg-stone-100">
              <div class="aspect-[4/5] overflow-hidden">
                <img
                  v-if="product.imageUrl"
                  :src="
                    getPreviewImageUrl(product.imageUrl, {
                      width: 760,
                      quality: 80,
                      format: 'webp',
                    }) || undefined
                  "
                  :alt="product.title"
                  class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  @error="handleImageError($event, product)"
                />
                <div
                  v-else
                  class="h-full w-full bg-[linear-gradient(135deg,#e7e5e4,#f5f5f4,#d6d3d1)]"
                ></div>
              </div>
            </div>
            <div class="mt-3 flex items-start justify-between gap-3">
              <div>
                <div
                  class="text-[10px] uppercase tracking-[0.22em] text-stone-400"
                >
                  {{ product.category }}
                </div>
                <h3
                  class="mt-1 text-[14px] font-medium leading-6 text-stone-900"
                >
                  {{ product.title }}
                </h3>
                <p
                  class="mt-1 line-clamp-2 text-[12px] leading-6 text-stone-500"
                >
                  {{
                    product.description ||
                    "看上去轻一点，穿出去的时候才会更像你自己。"
                  }}
                </p>
              </div>
              <button
                class="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#f6f4f1] text-stone-500 transition duration-200 group-hover:bg-stone-900 group-hover:text-white"
                @click.stop="goToProductDetail(product.id)"
              >
                <v-icon
                  size="14"
                  class="transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >mdi-arrow-top-right</v-icon
                >
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
