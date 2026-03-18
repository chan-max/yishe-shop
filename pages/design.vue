<script setup lang="ts">
definePageMeta({ layout: "page" });

usePageSEO({
  title: "定制设计服务 - 衣设",
  description:
    "把品牌首发、个人风格、副业尝试和联名想法整理成真正能落地的设计项目。",
  keywords: "定制设计,POD设计服务,个性化设计,服装设计服务,创作者副业",
  url: "https://1s.design/design",
  type: "website",
});

const tracks = [
  {
    id: "brand",
    name: "品牌第一轮",
    blurb: "适合刚起步的品牌，把视觉方向、首批商品和对外样子一起定下来。",
    outputs: ["品牌视觉基调", "首发图案系列", "6 款 POD 商品方案"],
    cycle: "7-12 天",
  },
  {
    id: "campaign",
    name: "主题企划",
    blurb: "给节日、联名、快闪和上新做一套能被记住的表达，不会只停在换个封面。",
    outputs: ["主题 KV", "物料延展", "社媒视觉包"],
    cycle: "5-8 天",
  },
  {
    id: "signature",
    name: "个人系列",
    blurb: "把你的个人风格变成一组真的能卖、也愿意反复做下去的东西。",
    outputs: ["艺术家图案整理", "作品集页面", "周边 SKU 组合"],
    cycle: "10-15 天",
  },
];

const packages = [
  {
    name: "Essentials",
    price: "¥1,980",
    summary: "先把方向试出来，适合第一次认真做。",
    items: ["1 次风格校准", "3 个视觉方向", "1 套商品陈列草图"],
  },
  {
    name: "Signature",
    price: "¥4,800",
    summary: "适合做一组可以发布、可以试卖、也可以拿去谈合作的系列。",
    items: ["品牌故事板", "6-8 个图案提案", "商品视觉与落地页建议"],
    featured: true,
  },
  {
    name: "Studio Partner",
    price: "定制报价",
    summary: "适合把上新节奏和审美基调长期交给同一套合作方式。",
    items: ["月度企划共创", "新品节奏规划", "新功能优先体验"],
  },
];

const serviceTags = [
  "印花图案",
  "服装廓形",
  "包装礼盒",
  "社媒画面",
  "详情页视觉",
  "联名企划",
];
const aiFeatures = [
  {
    title: "灵感整理",
    text: "把你脑子里那团还说不清的感觉，先整理成能沟通的方向。",
  },
  {
    title: "图案延展",
    text: "从一张主图、一个词或者一个情绪，慢慢长出完整系列。",
  },
  { title: "陈列草图", text: "提前看看首页、详情页和宣传图大概会长成什么样。" },
];

const selectedTrack = ref(tracks[0].id);
const selectedPackage = ref(packages[1].name);
const selectedNeeds = ref<string[]>(["印花图案", "详情页视觉"]);
const briefForm = reactive({
  brand: "",
  audience: "",
  tone: "",
  launchWindow: "",
  notes: "",
});

const activeTrack = computed(
  () => tracks.find((item) => item.id === selectedTrack.value) || tracks[0],
);

const toggleNeed = (item: string) => {
  if (selectedNeeds.value.includes(item)) {
    selectedNeeds.value = selectedNeeds.value.filter((need) => need !== item);
    return;
  }
  selectedNeeds.value = [...selectedNeeds.value, item];
};

const summaryLines = computed(() => [
  `方向：${activeTrack.value.name}`,
  `套餐：${selectedPackage.value}`,
  `需求：${selectedNeeds.value.length > 0 ? selectedNeeds.value.join(" / ") : "待补充"}`,
]);
</script>

<template>
  <div class="bg-[#f7f5f2] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[1560px] space-y-8">
      <section class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="ys-card rounded-[1.75rem] p-6 sm:p-8">
          <div class="minimal-kicker">Custom Design Studio</div>
          <h1
            class="mt-4 max-w-3xl text-[34px] font-semibold leading-[1.15] text-stone-950 sm:text-[46px]"
          >
            有些想法，不该只停在草稿里。
          </h1>
          <p class="mt-4 max-w-2xl text-[13px] leading-7 text-stone-500">
            如果你想做品牌、试副业、做一轮联名，或者只是想把自己的审美变成一组像样的商品，这页就是给这种时候用的。
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tag in serviceTags"
              :key="tag"
              class="ys-chip text-[11px]"
              >{{ tag }}</span
            >
          </div>
          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div
                class="text-[10px] uppercase tracking-[0.22em] text-stone-400"
              >
                从想法到初稿
              </div>
              <div class="mt-2 text-[20px] font-semibold text-stone-950">
                5-15 天
              </div>
            </div>
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div
                class="text-[10px] uppercase tracking-[0.22em] text-stone-400"
              >
                最常见的人
              </div>
              <div class="mt-2 text-[20px] font-semibold text-stone-950">
                品牌 / 创作者 / 副业尝试者
              </div>
            </div>
            <div class="ys-soft-card rounded-[1.2rem] p-4">
              <div
                class="text-[10px] uppercase tracking-[0.22em] text-stone-400"
              >
                辅助方式
              </div>
              <div class="mt-2 text-[20px] font-semibold text-stone-950">
                灵感整理 + 共创辅助
              </div>
            </div>
          </div>
        </div>

        <aside class="ys-card rounded-[1.75rem] p-5 sm:p-6">
          <div class="minimal-kicker">Brief Snapshot</div>
          <div class="mt-4 space-y-3">
            <div
              v-for="line in summaryLines"
              :key="line"
              class="rounded-[1rem] bg-[#faf8f5] px-4 py-3 text-[12px] text-stone-600"
            >
              {{ line }}
            </div>
          </div>
          <div
            class="mt-5 rounded-[1.2rem] bg-[#1c1917] px-5 py-5 text-stone-50"
          >
            <div class="text-[10px] uppercase tracking-[0.22em] text-stone-300">
              当前更适合你
            </div>
            <div class="mt-3 text-[22px] font-semibold">
              {{ activeTrack.name }}
            </div>
            <p class="mt-2 text-[12px] leading-6 text-stone-300">
              {{ activeTrack.blurb }}
            </p>
            <div class="mt-4 text-[11px] text-stone-300">
              预计交付周期 {{ activeTrack.cycle }}
            </div>
          </div>
        </aside>
      </section>

      <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
        <BusinessSectionIntro
          kicker="Design Track"
          title="先选这次想把什么做出来。"
          description="不同项目的节奏不一样。有人先做首发，有人先做主题，有人只是想让自己的风格开始赚钱。"
        />
        <div class="mt-6 grid gap-3 lg:grid-cols-3">
          <button
            v-for="item in tracks"
            :key="item.id"
            type="button"
            :class="[
              'rounded-[1.2rem] border p-5 text-left transition duration-200',
              selectedTrack === item.id
                ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-[0_16px_28px_rgba(28,25,23,0.12)]'
                : 'border-stone-200 bg-white hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]',
            ]"
            @click="selectedTrack = item.id"
          >
            <div class="flex items-center justify-between">
              <div class="text-[16px] font-semibold">{{ item.name }}</div>
              <div
                class="text-[11px] uppercase tracking-[0.18em]"
                :class="
                  selectedTrack === item.id
                    ? 'text-stone-300'
                    : 'text-stone-400'
                "
              >
                {{ item.cycle }}
              </div>
            </div>
            <p
              class="mt-3 text-[12px] leading-6"
              :class="
                selectedTrack === item.id ? 'text-stone-300' : 'text-stone-500'
              "
            >
              {{ item.blurb }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="output in item.outputs"
                :key="output"
                :class="[
                  'rounded-full px-3 py-1 text-[11px]',
                  selectedTrack === item.id
                    ? 'bg-white/10 text-stone-200'
                    : 'bg-[#faf8f5] text-stone-500',
                ]"
              >
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
            title="把脑子里的感觉，翻成别人能接住的话。"
            description="不用写得像提案。只要把你想给谁看、想做成什么样、准备什么时候上线说清楚就够了。"
          />
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <BaseInput
              v-model="briefForm.brand"
              label="这次项目叫什么"
              placeholder="例如：晚风工作室 / 夏季小系列"
            />
            <BaseInput
              v-model="briefForm.audience"
              label="你想让谁会想买它"
              placeholder="例如：城市女生、插画控、送礼的人"
            />
            <BaseInput
              v-model="briefForm.tone"
              label="你想要的感觉"
              placeholder="例如：安静、锋利、复古、轻一点的叛逆"
            />
            <BaseInput
              v-model="briefForm.launchWindow"
              label="大概什么时候想上线"
              placeholder="例如：6 月中旬，赶在第一波上新前"
            />
          </div>
          <div class="mt-4">
            <label class="mb-2 block text-[12px] font-medium text-stone-600"
              >这次准备做到哪一步</label
            >
            <div class="flex flex-wrap gap-2">
              <button
                v-for="item in serviceTags"
                :key="item"
                type="button"
                :class="[
                  'ys-chip text-[11px]',
                  selectedNeeds.includes(item) ? 'is-active' : '',
                ]"
                @click="toggleNeed(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>
          <div class="mt-4">
            <label class="mb-2 block text-[12px] font-medium text-stone-600"
              >多说一点也行</label
            >
            <textarea
              v-model="briefForm.notes"
              rows="5"
              class="ys-control w-full px-4 py-3 text-[13px] text-stone-900 focus:outline-none"
              placeholder="比如你最近反复收藏的风格、准备卖给谁、预算大概在哪，或者你只是想做一件会真的穿出去的东西。"
            ></textarea>
          </div>
        </div>

        <div class="space-y-5">
          <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="Package"
              title="合作可以轻一点，也可以做深一点。"
              description="先试一轮，或者直接做完整一套，都可以。重点是不要把方向做散。"
            />
            <div class="mt-5 space-y-3">
              <button
                v-for="item in packages"
                :key="item.name"
                type="button"
                :class="[
                  'w-full rounded-[1.2rem] border p-4 text-left transition duration-200',
                  selectedPackage === item.name
                    ? 'border-stone-900 bg-stone-900 text-stone-50'
                    : 'border-stone-200 bg-white hover:-translate-y-0.5 hover:border-stone-300 hover:bg-[#fcfbf9]',
                ]"
                @click="selectedPackage = item.name"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="text-[15px] font-semibold">{{ item.name }}</h3>
                      <span
                        v-if="item.featured"
                        class="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]"
                        :class="
                          selectedPackage === item.name
                            ? 'text-stone-200'
                            : 'bg-[#faf8f5] text-stone-500'
                        "
                        >Most chosen</span
                      >
                    </div>
                    <p
                      class="mt-2 text-[12px] leading-6"
                      :class="
                        selectedPackage === item.name
                          ? 'text-stone-300'
                          : 'text-stone-500'
                      "
                    >
                      {{ item.summary }}
                    </p>
                  </div>
                  <div class="text-[18px] font-semibold">{{ item.price }}</div>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="line in item.items"
                    :key="line"
                    :class="[
                      'rounded-full px-3 py-1 text-[11px]',
                      selectedPackage === item.name
                        ? 'bg-white/10 text-stone-200'
                        : 'bg-[#faf8f5] text-stone-500',
                    ]"
                  >
                    {{ line }}
                  </span>
                </div>
              </button>
            </div>
          </section>

          <section class="ys-panel rounded-[1.75rem] p-5 sm:p-6">
            <BusinessSectionIntro
              kicker="AI Ready"
              title="工具会帮你省力，但不会替你做决定。"
              description="衣设后面会把这些辅助能力接进来，让起步更轻一点，判断还是留给你自己。"
            />
            <div class="mt-5 grid gap-3">
              <div
                v-for="item in aiFeatures"
                :key="item.title"
                class="rounded-[1.1rem] bg-[#faf8f5] px-4 py-4"
              >
                <div class="text-[14px] font-semibold text-stone-950">
                  {{ item.title }}
                </div>
                <p class="mt-2 text-[12px] leading-6 text-stone-500">
                  {{ item.text }}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>
