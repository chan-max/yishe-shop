<script setup lang="ts">
import type { StorefrontPublishedProduct } from "~/composables/use-published-products";
import { useDesignRequest } from "~/composables/use-design-request";
import { useToast } from "~/composables/use-toast";
import { SITE_URL } from "~/utils/seo";

definePageMeta({ layout: "page" });

usePageSEO({
  title: "免费在线设计 & POD 专属按需定制 - 衣设 1s.design",
  description:
    "零门槛免费体验在线设计，选定 T恤、卫衣、帆布包、手机壳等品质载体，实时 3D 效果预览，支持一件按需定制与灵感分享。",
  keywords:
    "免费设计,POD按需定制,在线设计工具,印花设计,专属定制,一件起订,品牌周边,衣设",
  url: `${SITE_URL}/design`,
  type: "website",
});

const toast = useToast();
const route = useRoute();
const { submitDesignRequest, loading } = useDesignRequest();
const { fetchPublishedProducts, getPublishedProductImage } =
  usePublishedProducts();

const referenceProducts = ref<StorefrontPublishedProduct[]>([]);

try {
  referenceProducts.value = await fetchPublishedProducts({
    pageSize: 12,
    random: true,
  });
} catch (error) {
  console.error("获取定制页参考商品失败:", error);
}

const form = reactive({
  name: "",
  description: "",
  phoneNumber: "",
  email: "",
});

const submitted = ref(false);
const selectedProducts = ref<string[]>([]);
const selectedStyles = ref<string[]>([]);
const selectedScenes = ref<string[]>([]);
const selectedServices = ref<string[]>([]);

const productOptions = [
  "T恤",
  "卫衣",
  "鼠标垫",
  "装饰画",
  "抱枕",
  "帆布包",
  "手机壳",
  "马克杯",
];
const styleOptions = ["印花", "极简", "复古", "国潮", "插画", "轻奢"];
const sceneOptions = [
  "礼物",
  "办公用品",
  "家居装饰",
  "情侣礼物",
  "节日礼物",
  "品牌周边",
];
const serviceOptions = [
  "印花图案",
  "品牌视觉",
  "包装礼盒",
  "社媒画面",
  "详情页设计",
  "系列企划",
];

const serviceHighlights = [
  ["商品选择", "先确定设计最终会出现在哪里"],
  ["方向梳理", "把模糊想法整理成可执行 brief"],
  ["视觉设计", "覆盖图案、品牌、包装与传播画面"],
  ["系列延展", "从单件需求继续扩展完整周边"],
];

const deliverySteps = [
  {
    index: "01",
    title: "提交项目方向",
    text: "选择商品、风格、场景和需要的服务，留下基本项目说明。",
  },
  {
    index: "02",
    title: "沟通确认 brief",
    text: "衣设团队根据你的目标补充关键问题，确认载体和视觉边界。",
  },
  {
    index: "03",
    title: "进入设计交付",
    text: "依据确认后的方向推进设计，并输出适合项目使用的结果。",
  },
];

const toggleItem = (list: string[], item: string) => {
  const index = list.indexOf(item);
  if (index >= 0) {
    list.splice(index, 1);
  } else {
    list.push(item);
  }
};

const composedDescription = computed(() => {
  const parts: string[] = [];
  if (selectedProducts.value.length)
    parts.push(`商品类型：${selectedProducts.value.join("、")}`);
  if (selectedStyles.value.length)
    parts.push(`设计风格：${selectedStyles.value.join("、")}`);
  if (selectedScenes.value.length)
    parts.push(`使用场景：${selectedScenes.value.join("、")}`);
  if (selectedServices.value.length)
    parts.push(`需要服务：${selectedServices.value.join("、")}`);
  if (form.description.trim()) parts.push(form.description.trim());
  return parts.join("\n");
});

const handleSubmit = async () => {
  if (!form.name.trim()) {
    toast.warning("请填写项目名称");
    return;
  }

  try {
    await submitDesignRequest({
      name: form.name.trim(),
      description: composedDescription.value || undefined,
      phoneNumber: form.phoneNumber.trim() || undefined,
      email: form.email.trim() || undefined,
    });
    submitted.value = true;
    toast.success("提交成功", "我们会尽快联系你。");
  } catch {
    toast.error("提交失败", "请稍后再试一次。");
  }
};

const resetForm = () => {
  form.name = "";
  form.description = "";
  form.phoneNumber = "";
  form.email = "";
  selectedProducts.value.splice(0);
  selectedStyles.value.splice(0);
  selectedScenes.value.splice(0);
  selectedServices.value.splice(0);
  submitted.value = false;
};

interface GuideSection {
  label: string;
  hint: string;
  options: string[];
  selected: string[];
}

const guideSections = computed<GuideSection[]>(() => [
  {
    label: "定制商品",
    hint: "选择一个或多个商品载体",
    options: productOptions,
    selected: selectedProducts.value,
  },
  {
    label: "设计风格",
    hint: "不确定时可以留空",
    options: styleOptions,
    selected: selectedStyles.value,
  },
  {
    label: "使用场景",
    hint: "帮助我们理解真实用途",
    options: sceneOptions,
    selected: selectedScenes.value,
  },
  {
    label: "设计服务",
    hint: "选择希望衣设参与的部分",
    options: serviceOptions,
    selected: selectedServices.value,
  },
]);

const selectedTotal = computed(
  () =>
    selectedProducts.value.length +
    selectedStyles.value.length +
    selectedScenes.value.length +
    selectedServices.value.length,
);

const normalizeQueryValue = (value: unknown) =>
  Array.isArray(value) ? String(value[0] || "") : String(value || "");

const previewProduct = computed(() => {
  const selectedType = selectedProducts.value[0] || "";
  return (
    referenceProducts.value.find((product) =>
      product.type.includes(selectedType),
    ) || referenceProducts.value[0]
  );
});

const previewImage = computed(() => {
  const sourceImage = normalizeQueryValue(route.query.image);
  if (sourceImage) return sourceImage;
  return previewProduct.value
    ? getPublishedProductImage(previewProduct.value, 720)
    : "";
});

const previewTitle = computed(
  () =>
    normalizeQueryValue(route.query.productName) ||
    previewProduct.value?.title ||
    "尚未选择参考商品",
);

const heroProduct = computed(() => referenceProducts.value[0]);
const bottomProduct = computed(
  () => referenceProducts.value[1] || referenceProducts.value[0],
);

const selectionGroups = computed(() =>
  [
    ["商品", selectedProducts.value],
    ["风格", selectedStyles.value],
    ["场景", selectedScenes.value],
    ["服务", selectedServices.value],
  ].filter((item) => (item[1] as string[]).length > 0),
);

const applyProductSource = () => {
  if (normalizeQueryValue(route.query.source) !== "product") return;

  const productName = normalizeQueryValue(route.query.productName);
  const productType = normalizeQueryValue(route.query.productType);
  const keywords = normalizeQueryValue(route.query.keywords)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const productUrl = normalizeQueryValue(route.query.from);

  if (productName && !form.name) {
    form.name = `设计同款：${productName}`;
  }

  const sourceLines = [
    productName ? `参考商品：${productName}` : "",
    productType ? `商品类型：${productType}` : "",
    keywords.length ? `参考关键词：${keywords.join("、")}` : "",
    productUrl ? `参考链接：${productUrl}` : "",
  ].filter(Boolean);

  if (sourceLines.length && !form.description) {
    form.description = sourceLines.join("\n");
  }

  const matchedProduct = productOptions.find(
    (item) =>
      productType.includes(item) ||
      keywords.some((keyword) => keyword.includes(item)),
  );
  if (matchedProduct && !selectedProducts.value.includes(matchedProduct)) {
    selectedProducts.value.push(matchedProduct);
  }

  keywords.forEach((keyword) => {
    const matchedStyle = styleOptions.find((item) => keyword.includes(item));
    if (matchedStyle && !selectedStyles.value.includes(matchedStyle)) {
      selectedStyles.value.push(matchedStyle);
    }
  });
};

applyProductSource();
</script>

<template>
  <main class="design-platform">
    <section class="custom-design-hero">
      <img
        v-if="heroProduct"
        :src="getPublishedProductImage(heroProduct, 1200)"
        :alt="heroProduct.title"
        class="custom-design-hero__image"
      />
      <div class="custom-design-hero__shade" aria-hidden="true"></div>
      <div class="custom-design-hero__content">
        <span>YISHE FREE DESIGN & POD STUDIO</span>
        <h1>免费在线设计，<br />专属 POD 按需定制。</h1>
        <p>
          零门槛体验在线设计工具，选定商品、风格与应用场景，免费创作，一件起订，衣设帮你把灵感落地为品质实物。
        </p>
        <a href="#custom-brief" class="design-button design-button--light">
          开启免费设计
          <AppIcon name="palette" :size="14" aria-hidden="true" />
        </a>
      </div>
    </section>

    <section class="design-capabilities" aria-label="定制服务能力">
      <article v-for="(item, index) in serviceHighlights" :key="item[0]">
        <span>{{ String(index + 1).padStart(2, "0") }}</span>
        <div>
          <strong>{{ item[0] }}</strong>
          <small>{{ item[1] }}</small>
        </div>
      </article>
    </section>

    <section id="custom-brief" class="design-workspace">
      <header class="design-heading">
        <div>
          <span>CUSTOM PROJECT BRIEF</span>
          <h2>用几次选择，告诉我们你想做什么。</h2>
        </div>
        <p>
          选项不需要一次确定得很准确，它们只是帮助团队快速理解你的方向。项目细节会在后续沟通中继续确认。
        </p>
      </header>

      <Transition name="brief-fade" mode="out-in">
        <section v-if="submitted" class="design-success">
          <AppIcon name="check" :size="34" aria-hidden="true" />
          <span>REQUEST RECEIVED</span>
          <h2>需求已收到。</h2>
          <p>衣设团队会根据你留下的联系方式，与你确认项目方向和下一步安排。</p>
          <div>
            <button type="button" @click="resetForm">
              再提交一个项目
              <AppIcon name="reset" :size="13" aria-hidden="true" />
            </button>
            <NuxtLink to="/products">
              继续浏览商品
              <AppIcon name="arrow-right" :size="13" aria-hidden="true" />
            </NuxtLink>
          </div>
        </section>

        <form v-else class="design-form" @submit.prevent="handleSubmit">
          <div class="design-selector">
            <section
              v-for="(section, sectionIndex) in guideSections"
              :key="section.label"
              class="design-option-group"
            >
              <div class="design-option-group__head">
                <span>{{ String(sectionIndex + 1).padStart(2, "0") }}</span>
                <div>
                  <h3>{{ section.label }}</h3>
                  <p>{{ section.hint }}</p>
                </div>
                <strong>{{ section.selected.length }} 已选</strong>
              </div>
              <div class="design-options">
                <button
                  v-for="option in section.options"
                  :key="option"
                  type="button"
                  :class="{ 'is-selected': section.selected.includes(option) }"
                  :aria-pressed="section.selected.includes(option)"
                  @click="toggleItem(section.selected, option)"
                >
                  <AppIcon
                    v-if="section.selected.includes(option)"
                    name="check"
                    :size="12"
                    aria-hidden="true"
                  />
                  {{ option }}
                </button>
              </div>
            </section>
          </div>

          <aside class="design-brief">
            <div class="design-brief__preview">
              <img
                v-if="previewImage"
                :src="previewImage"
                :alt="previewTitle"
              />
              <div v-else class="design-brief__preview-empty">
                暂无可用的商品参考图
              </div>
              <div>
                <span>LIVE BRIEF</span>
                <strong>{{ previewTitle }}</strong>
                <small>{{ selectedTotal }} 个方向已选择</small>
              </div>
            </div>

            <div v-if="selectionGroups.length" class="design-brief__summary">
              <div v-for="group in selectionGroups" :key="String(group[0])">
                <span>{{ group[0] }}</span>
                <p>{{ (group[1] as string[]).join("、") }}</p>
              </div>
            </div>
            <div v-else class="design-brief__empty">
              从左侧选择商品和风格，这里会实时整理你的需求摘要。
            </div>

            <div class="design-fields">
              <label>
                <span>项目名称 <em>*</em></span>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="例如：品牌首发印花系列"
                  required
                />
              </label>

              <label>
                <span>补充说明</span>
                <textarea
                  v-model="form.description"
                  rows="4"
                  placeholder="数量、预算、参考链接、时间要求或其他想法"
                ></textarea>
              </label>

              <div class="design-fields__contact">
                <label>
                  <span>手机号</span>
                  <input
                    v-model="form.phoneNumber"
                    type="tel"
                    placeholder="方便联系你"
                  />
                </label>
                <label>
                  <span>邮箱</span>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="也可以留邮箱"
                  />
                </label>
              </div>
            </div>

            <p class="design-brief__privacy">
              提交即表示你同意衣设团队仅将上述信息用于本次项目沟通。
            </p>

            <button type="submit" class="design-submit" :disabled="loading">
              <AppIcon
                :name="loading ? 'reset' : 'arrow-right'"
                :size="14"
                aria-hidden="true"
              />
              {{ loading ? "正在提交" : "提交定制需求" }}
            </button>
          </aside>
        </form>
      </Transition>
    </section>

    <section class="design-process">
      <header>
        <span>WHAT HAPPENS NEXT</span>
        <h2>提交不是结束，而是项目真正开始。</h2>
      </header>
      <div class="design-process__grid">
        <article v-for="step in deliverySteps" :key="step.index">
          <span>{{ step.index }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </article>
      </div>
    </section>

    <section
      class="design-bottom"
      :class="{ 'design-bottom--text-only': !bottomProduct }"
    >
      <img
        v-if="bottomProduct"
        :src="getPublishedProductImage(bottomProduct, 1000)"
        :alt="bottomProduct.title"
      />
      <div>
        <span>NEED SOME INSPIRATION?</span>
        <h2>还没有明确方向，可以先从商品开始看。</h2>
        <NuxtLink to="/products" class="design-button design-button--dark">
          浏览商品灵感
          <AppIcon name="arrow-right" :size="14" aria-hidden="true" />
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.design-platform {
  --design-ink: #151515;
  --design-mint: #ededed;
  --design-coral: #e7e7e7;
  --design-blue: #f1f1f1;
  overflow: hidden;
  background: #fff;
  color: var(--design-ink);
}

.custom-design-hero {
  position: relative;
  min-height: 420px;
  background: #151515;
  color: #fff;
  isolation: isolate;
}

.custom-design-hero__image,
.custom-design-hero__shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.custom-design-hero__image {
  z-index: -2;
  object-fit: cover;
}

.custom-design-hero__shade {
  z-index: -1;
  background:
    linear-gradient(
      90deg,
      rgba(14, 14, 13, 0.86),
      rgba(14, 14, 13, 0.38) 62%,
      rgba(14, 14, 13, 0.04)
    ),
    linear-gradient(0deg, rgba(14, 14, 13, 0.38), transparent 50%);
}

.custom-design-hero__content {
  display: flex;
  width: var(--ys-container);
  min-height: 420px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3rem 0;
}

.custom-design-hero__content > span,
.design-heading span,
.design-success > span,
.design-process header > span,
.design-bottom > div > span {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.custom-design-hero h1 {
  max-width: 900px;
  margin: 0.8rem 0 0;
  color: #fff;
  font-size: clamp(2.1rem, 4.5vw, 4.2rem);
  font-weight: 850;
  line-height: 0.92;
}

.custom-design-hero p {
  max-width: 610px;
  margin: 1.2rem 0 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(0.88rem, 1.2vw, 1.04rem);
  line-height: 1.8;
}

.design-button {
  display: inline-flex;
  width: max-content;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  min-height: 3rem;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 1.1rem;
  font-size: 0.76rem;
  font-weight: 800;
  text-decoration: none;
}

.custom-design-hero .design-button {
  margin-top: 1.5rem;
}

.design-button--light {
  background: #fff;
  color: #111;
}

.design-button--dark {
  background: #111;
  color: #fff;
}

.design-capabilities {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  background: #151515;
  color: #fff;
}

.design-capabilities article {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 0.7rem;
  min-height: 130px;
  align-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.14);
  padding: 1rem clamp(1rem, 3vw, 2.5rem);
}

.design-capabilities article:last-child {
  border-right: 0;
}

.design-capabilities article > span {
  color: rgba(255, 255, 255, 0.46);
  font-size: 0.66rem;
  font-weight: 800;
}

.design-capabilities strong,
.design-capabilities small {
  display: block;
}

.design-capabilities strong {
  font-size: 0.82rem;
}

.design-capabilities small {
  margin-top: 0.25rem;
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.66rem;
  line-height: 1.5;
}

.design-workspace {
  width: var(--ys-container);
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 7rem) 0;
  scroll-margin-top: 5rem;
}

.design-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.5fr);
  gap: clamp(2rem, 7vw, 7rem);
  align-items: end;
  margin-bottom: clamp(2rem, 5vw, 4rem);
}

.design-heading h2,
.design-success h2,
.design-process h2,
.design-bottom h2 {
  max-width: 900px;
  margin: 0.65rem 0 0;
  font-size: clamp(2.2rem, 4.8vw, 4.9rem);
  line-height: 1.02;
}

.design-heading > p {
  margin: 0;
  color: #666;
  font-size: 0.82rem;
  line-height: 1.8;
}

.design-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.48fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}

.design-selector {
  border-top: 1px solid #d8d8d8;
}

.design-option-group {
  border-bottom: 1px solid #d8d8d8;
  padding: 1.5rem 0;
}

.design-option-group__head {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  gap: 0.8rem;
  align-items: start;
}

.design-option-group__head > span,
.design-option-group__head > strong {
  color: #777;
  font-size: 0.66rem;
  font-weight: 800;
}

.design-option-group__head h3 {
  margin: 0;
  font-size: 1rem;
}

.design-option-group__head p {
  margin: 0.25rem 0 0;
  color: #777;
  font-size: 0.68rem;
}

.design-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.1rem;
  padding-left: 48px;
}

.design-options button {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  min-height: 2.5rem;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  background: #fff;
  color: #333;
  padding: 0 0.85rem;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
}

.design-options button:hover {
  border-color: #888;
}

.design-options button.is-selected {
  border-color: #151515;
  background: #151515;
  color: #fff;
}

.design-brief {
  position: sticky;
  top: 5.5rem;
  overflow: hidden;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  background: #fff;
}

.design-brief__preview {
  position: relative;
  min-height: 270px;
  overflow: hidden;
  background: #f1f1ef;
}

.design-brief__preview::after {
  content: "";
  position: absolute;
  inset: 30% 0 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.74), transparent);
}

.design-brief__preview img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.design-brief__preview > div:not(.design-brief__preview-empty) {
  position: absolute;
  z-index: 1;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  color: #fff;
}

.design-brief__preview-empty {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #777;
  font-size: 0.7rem;
}

.design-brief__preview span,
.design-brief__preview strong,
.design-brief__preview small {
  display: block;
}

.design-brief__preview span {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.design-brief__preview strong {
  margin-top: 0.25rem;
  font-size: 1.2rem;
}

.design-brief__preview small {
  margin-top: 0.2rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.66rem;
}

.design-brief__summary,
.design-brief__empty,
.design-fields,
.design-brief__privacy {
  margin-right: 1rem;
  margin-left: 1rem;
}

.design-brief__summary {
  display: grid;
  gap: 0.65rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e5e5;
}

.design-brief__summary div {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  gap: 0.5rem;
}

.design-brief__summary span {
  color: #888;
  font-size: 0.64rem;
  font-weight: 800;
}

.design-brief__summary p {
  margin: 0;
  color: #333;
  font-size: 0.68rem;
  line-height: 1.55;
}

.design-brief__empty {
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
  color: #777;
  font-size: 0.68rem;
  line-height: 1.6;
}

.design-fields {
  display: grid;
  gap: 0.85rem;
  padding-top: 1rem;
}

.design-fields label > span {
  display: block;
  margin-bottom: 0.38rem;
  color: #555;
  font-size: 0.66rem;
  font-weight: 700;
}

.design-fields em {
  color: var(--design-coral);
  font-style: normal;
}

.design-fields input,
.design-fields textarea {
  display: block;
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  background: #fff;
  padding: 0.75rem 0.8rem;
  color: #151515;
  font-size: 0.74rem;
  outline: 0;
}

.design-fields input:focus,
.design-fields textarea:focus {
  border-color: #151515;
  box-shadow: 0 0 0 3px rgba(21, 21, 21, 0.08);
}

.design-fields textarea {
  min-height: 104px;
  resize: vertical;
}

.design-fields__contact {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.design-brief__privacy {
  color: #929292;
  font-size: 0.58rem;
  line-height: 1.55;
}

.design-submit {
  display: flex;
  width: calc(100% - 2rem);
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin: 0.8rem 1rem 1rem;
  border: 0;
  border-radius: 4px;
  background: #151515;
  color: #fff;
  font-size: 0.76rem;
  font-weight: 800;
  cursor: pointer;
}

.design-submit:disabled {
  cursor: wait;
  opacity: 0.55;
}

.design-success {
  display: grid;
  max-width: 700px;
  min-height: 430px;
  margin: 0 auto;
  place-items: center;
  align-content: center;
  background: var(--design-mint);
  padding: 2rem;
  text-align: center;
}

.design-success > span {
  margin-top: 1rem;
}

.design-success h2 {
  font-size: clamp(2.4rem, 6vw, 5rem);
}

.design-success p {
  max-width: 480px;
  margin: 1rem auto 0;
  color: rgba(0, 0, 0, 0.62);
  font-size: 0.8rem;
  line-height: 1.7;
}

.design-success > div {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.design-success button,
.design-success a {
  display: inline-flex;
  min-height: 2.7rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #151515;
  border-radius: 4px;
  background: transparent;
  color: #151515;
  padding: 0 0.9rem;
  font-size: 0.7rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
}

.design-process {
  background: var(--design-blue);
  padding: clamp(4rem, 8vw, 7rem) var(--ys-container-pad);
}

.design-process header {
  max-width: 900px;
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.design-process__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: rgba(0, 0, 0, 0.18);
}

.design-process article {
  display: grid;
  min-height: 280px;
  align-content: space-between;
  background: var(--design-blue);
  padding: clamp(1.2rem, 3vw, 2rem);
}

.design-process article > span {
  font-size: 0.68rem;
  font-weight: 800;
}

.design-process article h3 {
  margin: auto 0 0;
  font-size: clamp(1.3rem, 2.6vw, 2.5rem);
  line-height: 1.08;
}

.design-process article p {
  margin: 0.65rem 0 0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.76rem;
  line-height: 1.7;
}

.design-bottom {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.72fr);
  min-height: 420px;
  background: var(--design-coral);
}

.design-bottom--text-only {
  grid-template-columns: 1fr;
}

.design-bottom > img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
}

.design-bottom > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 6vw, 6rem);
}

.design-bottom h2 {
  font-size: clamp(1.7rem, 3.2vw, 2.8rem);
}

.design-bottom .design-button {
  margin-top: 1.5rem;
}

.brief-fade-enter-active,
.brief-fade-leave-active {
  transition: opacity 180ms ease;
}

.brief-fade-enter-from,
.brief-fade-leave-to {
  opacity: 0;
}

@media (max-width: 940px) {
  .design-form,
  .design-bottom {
    grid-template-columns: 1fr;
  }

  .design-brief {
    position: static;
  }

  .design-bottom > img {
    min-height: 460px;
  }
}

@media (max-width: 700px) {
  .custom-design-hero {
    min-height: 400px;
  }

  .custom-design-hero__image {
    object-position: 58% center;
  }

  .custom-design-hero__shade {
    background: linear-gradient(
      0deg,
      rgba(12, 12, 11, 0.9),
      rgba(12, 12, 11, 0.2) 82%
    );
  }

  .custom-design-hero__content {
    min-height: 400px;
    padding: 2.5rem 0;
  }

  .custom-design-hero h1 {
    font-size: clamp(2.2rem, 10vw, 3.2rem);
  }

  .design-capabilities {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .design-capabilities article {
    min-height: 115px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  }

  .design-heading,
  .design-process__grid {
    grid-template-columns: 1fr;
  }

  .design-heading {
    align-items: start;
    gap: 1rem;
  }

  .design-heading h2,
  .design-process h2 {
    font-size: clamp(2.1rem, 10vw, 3.4rem);
  }

  .design-bottom h2 {
    font-size: clamp(1.7rem, 8vw, 2.5rem);
  }

  .design-option-group__head {
    grid-template-columns: 32px minmax(0, 1fr) auto;
  }

  .design-options {
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.45rem;
  }

  .design-fields__contact {
    grid-template-columns: 1fr;
  }

  .design-process article {
    min-height: 230px;
  }

  .design-bottom,
  .design-bottom > img {
    min-height: 0;
  }

  .design-bottom > img {
    aspect-ratio: 1 / 0.9;
  }
}
</style>
