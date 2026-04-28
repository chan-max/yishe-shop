<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { api } from "../utils/api";
import { getPreviewImageUrl } from "../utils/image";

definePageMeta({ layout: "page" });

usePageSEO({
  title: "衣设 yishe - POD 印花、定制商品与创意设计开放平台",
  description:
    "探索可商用 POD 图案、印花商品、品牌周边、私人定制和创意设计服务。衣设帮助创作者与品牌把视觉灵感转化为真实产品。",
  keywords:
    "POD,印花设计,定制商品,私人定制,创意设计,AI设计,设计师服务,品牌周边,服装印花,图案素材,1s.design",
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
  "POD 印花图库",
  "定制商品灵感",
  "POD 商品定制",
  "私人定制服务",
  "设计师协作",
];
const impactStats = [
  { value: "120+", label: "POD 创意场景" },
  { value: "300+", label: "可定制商品类型" },
  { value: "50+", label: "专业设计服务" },
  { value: "24h", label: "灵感到方案响应" },
];
const storySteps = [
  {
    step: "01",
    title: "发现灵感",
    description:
      "从图案、风格、品类和使用场景进入，快速锁定适合商品化的视觉方向。",
  },
  {
    step: "02",
    title: "形成系列",
    description:
      "围绕同一主题延展服饰、家居、礼品、数码配件和品牌周边。",
  },
  {
    step: "03",
    title: "落成产品",
    description:
      "把设计稿、展示图、商品主图和定制需求接入可执行的 POD 生产链路。",
  },
];
const businessModules = [
  {
    title: "开放式 POD 资源库",
    text: "围绕服饰印花、礼品周边、家居布艺和数字配件组织图案、样机与商品灵感。",
    action: "浏览资源",
    to: "/portfolio",
  },
  {
    title: "品牌与私人定制服务",
    text: "为品牌首发、节日礼赠、个人纪念和创作者周边提供从视觉方向到商品落地的定制方案。",
    action: "发起定制",
    to: "/design",
  },
  {
    title: "AI 辅助创意工作台",
    text: "用生成、扩图、排版和趋势建议加速创意验证，为设计师和创作者保留更大的表达空间。",
    action: "进入工作台",
    to: "/ai-lab",
  },
];
const personalizedModes = [
  {
    name: "品牌刚起步",
    detail:
      "先把 logo、视觉风格、首批商品和社媒物料一起搭出来，形成完整对外形象。",
  },
  {
    name: "想做一波主题企划",
    detail:
      "适合节日活动、品牌联名、限定上新和礼赠套装，一次性生成完整主题表达。",
  },
  {
    name: "创作者想变现",
    detail:
      "把图案、插画和风格内容继续做成可售商品、授权设计和可持续运营的系列作品。",
  },
];
const futureSignals = [
  {
    title: "图案趋势建议",
    desc: "围绕节日、风格、人群和商品品类提供更接近市场的创意方向。",
  },
  {
    title: "商品场景生成",
    desc: "让一张设计稿快速变成商品主图、模特展示图和详情页陈列素材。",
  },
  {
    title: "系列化延展",
    desc: "把一个主题继续扩展成服饰、礼品、家居和社媒内容的完整系列。",
  },
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
    title: "寻找可商用 POD 灵感",
    text: "从图案、品类和风格进入，快速浏览适合上架、礼赠和品牌活动的创意方向。",
    action: "探索",
    path: "/products",
  },
  {
    title: "搭建品牌视觉系列",
    text: "从作品案例理解色彩、图案、包装和商品陈列如何组成统一的品牌表达。",
    action: "看案例",
    path: "/portfolio",
  },
  {
    title: "发起私人定制项目",
    text: "提交礼物、服饰、活动周边或品牌首发需求，由设计服务继续推进落地。",
    action: "定制",
    path: "/design",
  },
];

const featuredProducts = ref<FeaturedProduct[]>([]);
const featuredShowcase = computed(() => featuredProducts.value.slice(0, 6));
const heroPrimary = computed(() => featuredProducts.value[0]);
const heroFallback: FeaturedProduct = {
  id: "hero-placeholder",
  title: "POD 花卉印花系列",
  description: "适合服饰、帆布包、杯具和家居布艺延展的高识别度图案方向。",
  category: "POD Selection",
  image: "grad1",
};
const heroDisplay = computed(() => heroPrimary.value || heroFallback);

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
        description: "适合服饰、礼品和家居商品延展的高识别度印花方向。",
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
        description: "把插画内容延展为杯具、餐具和礼赠周边。",
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
    <section class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div
        class="mx-auto grid max-w-[1560px] gap-10 xl:grid-cols-[0.96fr_1.04fr] xl:items-center"
      >
        <div class="max-w-2xl pt-2 lg:pr-4">
          <span
            class="ys-chip cursor-default rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-stone-500"
          >
            yishe / pod resources + custom design
          </span>
          <h1
            class="mt-6 text-[34px] font-semibold leading-[1.15] text-stone-950 sm:text-[42px] lg:text-[52px]"
          >
            像浏览设计素材一样，发现可以真正做成商品的 POD 灵感。
          </h1>
          <p class="mt-4 max-w-xl text-[14px] leading-8 text-stone-500">
            衣设聚合印花图案、定制商品、品牌周边和创意设计服务，让每个想法都能找到适合的产品载体。
          </p>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <BaseButton
              variant="primary"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToFreeDesign"
              >探索 POD 资源</BaseButton
            >
            <BaseButton
              variant="outline"
              size="lg"
              class="!px-6 !py-2.5 !text-[12px]"
              @click="goToAiLab"
              >打开创意工作台</BaseButton
            >
          </div>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="pill in categoryPills"
              :key="pill"
              class="ys-chip cursor-default rounded-full px-3 py-1 text-[11px]"
              >{{ pill }}</span
            >
          </div>
        </div>

        <div class="ys-section-shell p-3 sm:p-4 lg:p-5">
          <div class="grid gap-4">
            <article
              class="group rounded-[1.25rem] bg-[#f6f2eb] p-4 sm:p-5 lg:p-6"
            >
              <div
                class="grid gap-5 md:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] md:items-stretch"
              >
                <div class="overflow-hidden rounded-[1rem] bg-[#e6dfd3]">
                  <div
                    class="min-h-[360px] overflow-hidden sm:min-h-[420px] md:h-full md:min-h-[440px]"
                  >
                    <img
                      v-if="heroDisplay.imageUrl"
                      :src="
                        getPreviewImageUrl(heroDisplay.imageUrl, {
                          width: 900,
                          quality: 80,
                          format: 'webp',
                        }) || undefined
                      "
                      :alt="heroDisplay.title"
                      class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      @error="handleImageError($event, heroDisplay)"
                    />
                    <div
                      v-else
                      class="flex h-full min-h-[360px] w-full items-center justify-center bg-[linear-gradient(135deg,#e7e5e4,#f5f5f4,#d6d3d1)] sm:min-h-[420px] md:min-h-[440px]"
                    >
                      <div
                        class="rounded-full border border-white/70 bg-white/60 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-stone-500"
                      >
                        Featured Preview
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex h-full flex-col gap-4">
                  <div
                    class="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-stone-400"
                  >
                    <span>{{ heroDisplay.category }}</span>
                    <span>Featured</span>
                  </div>
                  <div
                    class="ys-flat-block rounded-[1rem] bg-white/70 p-4 sm:p-5"
                  >
                    <div
                      class="text-[10px] uppercase tracking-[0.22em] text-stone-400"
                    >
                      Featured POD concept
                    </div>
                    <h2
                      class="mt-3 text-[20px] font-semibold leading-8 text-stone-950 sm:text-[24px]"
                    >
                      {{ heroDisplay.title }}
                    </h2>
                    <p
                      class="mt-3 text-[13px] leading-7 text-stone-500 sm:text-[14px]"
                    >
                      {{
                        heroDisplay.description ||
                        "从图案到商品展示，一套适合继续定制、上架和传播的视觉方案。"
                      }}
                    </p>
                  </div>
                  <div
                    class="ys-flat-block flex flex-1 flex-col justify-between rounded-[1.05rem] bg-[#efe8df] p-4 sm:p-5"
                  >
                    <div>
                      <h3
                        class="text-[16px] font-semibold leading-7 text-stone-950"
                      >
                        从一件样品，看见一整套可延展的 POD 商品系列。
                      </h3>
                      <p class="mt-2 text-[12px] leading-6 text-stone-500">
                        同一图案可以延伸到服饰、礼品、家居和品牌物料，适合个人表达，也适合商业企划。
                      </p>
                    </div>
                    <button
                      class="ys-quiet-link mt-4 inline-flex w-fit rounded-full bg-white/78 px-3 py-1.5 text-[11px] text-stone-600 hover:bg-white"
                      @click="
                        heroDisplay.id !== 'hero-placeholder' &&
                        goToProductDetail(heroDisplay.id)
                      "
                    >
                      看这件
                      <v-icon size="14" class="transition duration-200"
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

    <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="mx-auto max-w-[1560px] space-y-5">
        <BusinessSectionIntro
          kicker="POD Discovery Hub"
          title="按商品载体浏览 POD 创意资源。"
          description="从 T 恤、杯具、帆布包、手机壳到家居布艺，快速找到适合印花、定制和上架的设计方向。"
        />

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="item in podCategories"
            :key="item.name"
            type="button"
            class="group flex min-h-[196px] flex-col justify-between rounded-[1.25rem] border border-white/40 px-5 py-5 text-left transition duration-200 sm:px-6"
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

        <div class="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <section class="ys-section-shell px-5 py-5 sm:px-6">
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-[15px] font-semibold text-stone-950">风格方向</h3>
              <button class="ys-quiet-link text-[11px]" @click="goToPortfolio">
                去翻作品
              </button>
            </div>
            <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <button
                v-for="item in styleBoards"
                :key="item.name"
                type="button"
                class="ys-flat-block flex items-center gap-3 rounded-[1rem] px-3 py-3 text-left"
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

          <div class="grid gap-4">
            <section class="ys-section-shell px-5 py-5 sm:px-6">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-[15px] font-semibold text-stone-950">
                  从你的目标开始
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
                  class="ys-flat-block rounded-[1rem] px-4 py-4 text-left"
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

            <section class="ys-section-shell px-5 py-5 sm:px-6">
              <div>
                <h3 class="text-[15px] font-semibold text-stone-950">
                  大家最近在翻这些
                </h3>
                <p class="mt-1 text-[11px] text-stone-400">
                  热门图案、礼赠主题、品牌首发和私人定制灵感都可以直接进入结果页。
                </p>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <button
                  v-for="item in hotKeywords"
                  :key="item"
                  type="button"
                  class="ys-chip rounded-full px-3 py-1.5 text-[11px] text-stone-600"
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

    <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="mx-auto grid max-w-[1560px] gap-4 md:grid-cols-4">
        <div
          v-for="item in impactStats"
          :key="item.label"
          class="ys-flat-block rounded-[1.05rem] px-5 py-5"
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

    <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div
        class="mx-auto grid max-w-[1560px] gap-6 lg:grid-cols-[0.72fr_1.28fr]"
      >
        <div>
          <span class="text-[10px] uppercase tracking-[0.24em] text-stone-400"
            >Workflow</span
          >
          <h2
            class="mt-3 text-[28px] font-semibold leading-[1.25] text-stone-950"
          >
            从灵感发现到商品落地，每一步都为创作者和品牌服务。
          </h2>
          <p class="mt-4 max-w-md text-[13px] leading-7 text-stone-500">
            先找到视觉方向，再判断适合的商品载体，最后形成可展示、可定制、可销售的完整方案。
          </p>
        </div>
        <div class="grid gap-4 md:grid-cols-3">
          <article
            v-for="item in storySteps"
            :key="item.step"
            class="ys-flat-block rounded-[1.05rem] p-5"
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

    <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="ys-section-shell mx-auto max-w-[1560px] p-5 sm:p-6 lg:p-7">
        <BusinessSectionIntro
          kicker="Business Modules"
          title="资源、定制和创意工具，共同组成开放式设计平台。"
          description="面向 POD 卖家、独立品牌、社媒创作者和个人用户，提供从素材发现到设计服务的完整入口。"
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
              class="ys-chip mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px]"
              @click="goToModule(item.to)"
            >
              {{ item.action }}
              <v-icon size="14">mdi-arrow-top-right</v-icon>
            </button>
          </article>
        </div>
      </div>
    </section>

    <section class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div class="mx-auto grid max-w-[1560px] gap-6 xl:grid-cols-[1fr_1fr]">
        <div class="ys-section-shell p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="Personalized Studio"
            title="私人定制与品牌企划，可以从一个图案开始。"
            description="适合纪念礼物、品牌首发、活动周边和创作者 IP，把想法转化为可生产、可传播的商品系列。"
          />
          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            <div
              v-for="item in personalizedModes"
              :key="item.name"
              class="ys-flat-block rounded-[1rem] p-4"
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

        <div class="ys-section-shell p-5 sm:p-6">
          <BusinessSectionIntro
            kicker="AI Ready"
            title="AI 辅助灵感生成，服务于真实商品设计。"
            description="用 AI 更快试风格、扩主题、做场景展示，再把结果交给定制服务或 POD 商品库继续完善。"
          />
          <div class="mt-6 grid gap-3">
            <div
              v-for="item in futureSignals"
              :key="item.title"
              class="ys-flat-block rounded-[1rem] p-4"
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
              >进入创意工作台</BaseButton
            >
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
      <div class="mx-auto max-w-[1560px]">
        <div class="flex items-end justify-between gap-6">
          <div>
            <span class="text-[10px] uppercase tracking-[0.24em] text-stone-400"
              >Selected Works</span
            >
            <h2
              class="mt-3 text-[28px] font-semibold leading-[1.25] text-stone-950"
            >
              精选图案、商品样机和定制案例，让灵感更容易落地。
            </h2>
          </div>
          <NuxtLink
            to="/products"
            class="ys-quiet-link hidden text-[11px] sm:inline-flex sm:items-center sm:gap-2"
          >
            去看更多
            <v-icon size="15" class="transition duration-200"
              >mdi-arrow-right</v-icon
            >
          </NuxtLink>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="product in featuredShowcase"
            :key="product.id"
            class="ys-flat-block group cursor-pointer rounded-[1.05rem] p-3 sm:p-4"
            @click="goToProductDetail(product.id)"
          >
            <div class="overflow-hidden rounded-[0.95rem] bg-stone-100">
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
                class="ys-icon-btn mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full transition duration-200 group-hover:bg-white group-hover:text-stone-900"
                @click.stop="goToProductDetail(product.id)"
              >
                <v-icon size="14" class="transition duration-200"
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
