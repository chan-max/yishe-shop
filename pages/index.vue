<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { api } from "../utils/api";
import { getPreviewImageUrl } from "../utils/image";

definePageMeta({ layout: "page" });

usePageSEO({
  title: "衣设 yishe - 免费设计、AI设计、POD商品与创作者服务平台",
  description:
    "衣设把免费设计、POD商品、AI设计、创作者服务和社区内容放在同一个入口，让灵感从设计到商品再到变现形成完整闭环。",
  keywords:
    "免费设计,POD商品,AI设计,设计师服务,创意社区,商品定制,印花设计,1s.design",
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
  "免费设计入口",
  "AI 图案生成",
  "POD 商品定制",
  "设计师接单",
  "创意社区",
];
const impactStats = [
  { value: "120+", label: "免费设计场景" },
  { value: "300+", label: "可延展商品类型" },
  { value: "50+", label: "设计服务能力" },
  { value: "24h", label: "AI 创意响应周期" },
];
const storySteps = [
  {
    step: "01",
    title: "先找方向",
    description: "从免费设计分类、热门风格和真实案例里快速找到你要做的内容方向。",
  },
  {
    step: "02",
    title: "再生成方案",
    description: "可以自己用 AI 先出稿，也可以直接进入定制服务和设计师协作流程。",
  },
  {
    step: "03",
    title: "最后变成商品或服务",
    description: "一个设计可以继续延展成商品、展示页、社媒素材和长期可售的创作资产。",
  },
];
const businessModules = [
  {
    title: "免费设计中心，覆盖企业、电商、个人和社媒场景",
    text: "Logo、海报、主图、详情页、小红书封面、礼品图案、服饰印花都能作为统一入口承接流量。",
    action: "看设计能力",
    to: "/portfolio",
  },
  {
    title: "定制设计与设计师服务，适合更完整的商业需求",
    text: "从品牌视觉、包装、印花系列到活动物料和联名企划，适合需要专业落地的人群。",
    action: "提交需求",
    to: "/design",
  },
  {
    title: "AI 设计实验室，把生成、改稿、配图和营销一并做掉",
    text: "不只是出图，还能做风格推荐、自动排版、设计建议、场景图生成和营销文案辅助。",
    action: "体验 AI",
    to: "/ai-lab",
  },
];
const personalizedModes = [
  {
    name: "品牌刚起步",
    detail: "先把 logo、视觉风格、首批商品和社媒物料一起搭出来，形成完整对外形象。",
  },
  {
    name: "想做一波主题企划",
    detail: "适合节日活动、品牌联名、限定上新和礼赠套装，一次性生成完整主题表达。",
  },
  {
    name: "创作者想变现",
    detail: "把图案、插画和风格内容继续做成可售商品、授权设计和可持续运营的系列作品。",
  },
];
const futureSignals = [
  { title: "AI 设计评分", desc: "给出配色、排版、风格统一度和商业可用性的综合建议，辅助改稿。" },
  { title: "商品场景生成", desc: "让一张设计稿快速变成商品主图、模特展示图和详情页陈列素材。" },
  { title: "趋势与风格推荐", desc: "把热点主题、人群偏好和平台风格趋势转化为可操作的设计方向。" },
];
const podCategories = [
  {
    name: "T 恤 / 卫衣",
    count: "120+",
    image: "/discovery/pod-tee.svg",
    keyword: "T恤",
    use: "服饰印花",
    audience: "品牌上新",
    tone: "soft",
    bg: "#f2ebe2",
    iconBg: "#e9dfd2",
  },
  {
    name: "马克杯 / 水杯",
    count: "86+",
    image: "/discovery/pod-mug.svg",
    keyword: "杯子",
    use: "礼赠周边",
    audience: "企业礼品",
    tone: "dark",
    bg: "#ece7de",
    iconBg: "#dfd6c8",
  },
  {
    name: "托特包 / 帆布包",
    count: "74+",
    image: "/discovery/pod-bag.svg",
    keyword: "帆布包",
    use: "日常周边",
    audience: "通勤消费",
    tone: "line",
    bg: "#f4efe7",
    iconBg: "#e8dfd4",
  },
  {
    name: "手机壳",
    count: "68+",
    image: "/discovery/pod-phone.svg",
    keyword: "手机壳",
    use: "数码配件",
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
    use: "家居延展",
    audience: "空间美学",
    tone: "line",
    bg: "#f3ede6",
    iconBg: "#e5dbcf",
  },
  {
    name: "挂毯 / 墙面装饰",
    count: "42+",
    image: "/discovery/pod-tapestry.svg",
    keyword: "挂毯",
    use: "空间陈列",
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
    use: "生活织物",
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
    audience: "团队定制",
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
    note: "适合品牌视觉和高客单商品",
  },
  {
    name: "日系留白",
    image: "/discovery/pod-mug.svg",
    keyword: "日系",
    note: "适合生活方式和柔和家居",
  },
  {
    name: "街头潮流",
    image: "/discovery/pod-bag.svg",
    keyword: "街头",
    note: "适合服饰系列和个性单品",
  },
  {
    name: "轻奢礼赠",
    image: "/discovery/pod-phone.svg",
    keyword: "轻奢",
    note: "适合企业礼盒和节庆周边",
  },
  {
    name: "可爱治愈",
    image: "/discovery/pod-pillow.svg",
    keyword: "可爱",
    note: "适合女性向和宠物周边",
  },
  {
    name: "户外自然",
    image: "/discovery/pod-tapestry.svg",
    keyword: "户外",
    note: "适合露营、旅行和自然主题系列",
  },
];
const hotKeywords = [
  "免费 Logo",
  "商品主图",
  "详情页设计",
  "小红书封面",
  "新中式图案",
  "法式花卉",
  "情侣礼物",
  "品牌首发",
  "文创礼盒",
  "AI 生成海报",
  "节日限定",
  "设计师接单",
];
const useCases = [
  {
    title: "我想先看平台能做什么设计",
    text: "先从免费设计能力和分类入口看起，快速确认这里是不是能覆盖你的需求。",
    action: "看能力",
    path: "/products",
  },
  {
    title: "我已经知道自己偏什么风格",
    text: "从作品和专题里进入会更快，也更容易找到适合的设计师和商品方向。",
    action: "看风格",
    path: "/portfolio",
  },
  {
    title: "我脑子里已经有个需求",
    text: "可以直接进入定制设计或 AI 实验室，把模糊想法更快转成方案。",
    action: "去转化",
    path: "/design",
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
        description: "从图案、商品到展示图一体化延展的精选系列。",
        category: "精选作品",
        image: "grad1",
      },
      {
        id: "2",
        title: "解构廓形卫衣企划",
        description: "适合品牌首发和潮流上新的完整服饰提案。",
        category: "精选作品",
        image: "grad2",
      },
      {
        id: "3",
        title: "艺术家联名杯具周边",
        description: "让创作内容快速延伸成适合售卖和礼赠的商品。",
        category: "精选作品",
        image: "grad3",
      },
      {
        id: "4",
        title: "包装视觉提案",
        description: "覆盖礼盒、包装、详情展示和品牌感表达。",
        category: "精选作品",
        image: "grad4",
      },
      {
        id: "5",
        title: "秀场海报与社媒素材",
        description: "适合活动传播和品牌话题发酵的内容组合。",
        category: "精选作品",
        image: "grad5",
      },
      {
        id: "6",
        title: "艺术家家居装饰画",
        description: "把平面创作延展到空间陈列和家居消费场景。",
        category: "精选作品",
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
const goToFreeDesign = () => navigateTo("/free-design");
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
            yishe / free design + ai + pod
          </span>
          <h1
            class="mt-6 text-[34px] font-semibold leading-[1.15] text-stone-950 sm:text-[42px] lg:text-[52px]"
          >
            从免费设计开始，把创意一路做成商品与服务。
          </h1>
          <p class="mt-4 max-w-xl text-[13px] leading-7 text-stone-500">
            衣设不只是卖商品，也不只是做设计。这里把免费设计、AI
            创意、POD 商品、设计师服务和社区内容放在同一个入口里。
          </p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <BaseButton
              variant="primary"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToFreeDesign"
              >进入免费设计</BaseButton
            >
            <BaseButton
              variant="outline"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToAiLab"
              >体验 AI 设计</BaseButton
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
                  <div class="aspect-[4/5] overflow-hidden sm:aspect-[16/12] md:h-full md:min-h-[440px] md:aspect-auto">
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
                      One hero product, clearer first screen
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
                        "先用一件商品把平台能力讲清楚，再引导用户继续进入设计、服务和商品链路。"
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
                        保持单商品展示，但让它承担“平台样板间”的角色。
                      </h3>
                      <p class="mt-2 text-[12px] leading-6 text-stone-500">
                        首屏右侧只放一个商品，保证手机、平板和大屏都能稳定适配，同时承接免费设计、AI、商品化和变现的入口认知。
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
          title="保留原有分类结构，但把每个入口讲得更完整。"
          description="仍然是原先的分类浏览方式，只是把它升级成设计能力、商品延展和使用场景的联合入口。"
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
                  把设计、商品、服务和趋势词放进同一个检索入口。
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
            还是原来的流程结构，但升级成完整平台闭环。
          </h2>
          <p class="mt-4 max-w-md text-[13px] leading-7 text-stone-500">
            用户仍然按照原先的阅读节奏理解页面，只是现在会更明确地感知到设计、AI、商品与变现的连续关系。
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
          title="三个入口不变，但每个入口都能承接更强的平台能力。"
          description="保留你原来的三栏结构，只增强里面的功能表达，让用户看到这是一个完整设计生态，而不是单点页面。"
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
            title="左侧还是原来的服务卡，但改成更强的商业化叙事。"
            description="适合品牌、创作者和有项目需求的人，把模糊想法一路做成设计方案、商品体系和可持续运营内容。"
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
              >提交设计需求</BaseButton
            >
            <BaseButton
              variant="secondary"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToPortfolio"
              >先看作品案例</BaseButton
            >
          </div>
        </div>

        <div class="rounded-[1.55rem] bg-white p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="AI Ready"
            title="右侧仍然是 AI 模块，但内容升级为真正可包装的产品能力。"
            description="保留原有信息布局，只把 AI 的价值说清楚: 不只是灵感工具，而是设计生成、优化和商品化助手。"
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
              >进入 AI 实验室</BaseButton
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
              原来的作品区继续保留，用来承接平台可信度。
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
