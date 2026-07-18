<script setup lang="ts">
import { useDesignRequest } from "~/composables/use-design-request";
import { useToast } from "~/composables/use-toast";
import { SITE_URL } from "~/utils/seo";

definePageMeta({ layout: "page" });

usePageSEO({
  title: "发起 POD 定制设计 - 衣设",
  description:
    "选择你喜欢的商品类型和设计风格，衣设团队为你提供印花图案、品牌视觉、包装礼盒、社媒画面等 POD 定制设计服务。",
  keywords:
    "POD定制设计,私人定制,印花图案设计,周边定制,礼品定制,品牌视觉,服装印花设计",
  url: `${SITE_URL}/design`,
  type: "website",
});

const toast = useToast();
const router = useRouter();
const route = useRoute();
const { submitDesignRequest, loading } = useDesignRequest();

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

const productOptions = ["T恤", "卫衣", "鼠标垫", "装饰画", "抱枕", "帆布包", "手机壳", "马克杯"];
const styleOptions = ["印花", "极简", "复古", "国潮", "插画", "轻奢"];
const sceneOptions = ["礼物", "办公用品", "家居装饰", "情侣礼物", "节日礼物", "品牌周边"];
const serviceOptions = ["印花图案", "品牌视觉", "包装礼盒", "社媒画面", "详情页设计", "系列企划"];

const toggleItem = (list: string[], item: string) => {
  const idx = list.indexOf(item);
  if (idx >= 0) {
    list.splice(idx, 1);
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
    hint: "选一个或多个",
    options: productOptions,
    selected: selectedProducts.value,
  },
  {
    label: "设计风格",
    hint: "不确定可以不选",
    options: styleOptions,
    selected: selectedStyles.value,
  },
  {
    label: "使用场景",
    hint: "帮助理解需求",
    options: sceneOptions,
    selected: selectedScenes.value,
  },
  {
    label: "设计服务",
    hint: "可以多选",
    options: serviceOptions,
    selected: selectedServices.value,
  },
]);

const normalizeQueryValue = (value: unknown) =>
  Array.isArray(value) ? String(value[0] || "") : String(value || "");

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
    (item) => productType.includes(item) || keywords.some((keyword) => keyword.includes(item)),
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
  <div class="min-h-[80dvh] bg-white">
    <div
      class="mx-auto w-full px-4 py-8 sm:px-6"
      style="max-width: var(--ys-container)"
    >
      <div class="mb-6">
        <div class="text-[10px] font-bold tracking-[0.12em] text-stone-400">
          定制设计服务
        </div>
        <h2 class="mt-2 text-[28px] font-black leading-none text-stone-950">
          发起定制
        </h2>
        <p class="mt-1.5 max-w-lg text-[12px] leading-5 text-stone-500">
          选择你喜欢的商品和风格，补充联系方式，衣设团队会联系你确认方向。
        </p>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="submitted" class="mx-auto max-w-md">
          <div
            class="rounded-xl border border-stone-200 bg-white px-6 py-8 text-center"
          >
            <div
              class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100"
            >
              <span aria-hidden="true">✓</span>
            </div>
            <h3 class="text-[16px] font-bold text-stone-950">需求已收到</h3>
            <p class="mt-1 text-[12px] leading-5 text-stone-500">
              衣设团队会尽快通过你留下的联系方式与你沟通。
            </p>
            <div class="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                class="text-[11px] font-semibold text-stone-900 underline-offset-4 hover:underline"
                @click="resetForm"
              >
                再提交一个
              </button>
              <NuxtLink
                to="/products"
                class="text-[11px] font-semibold text-stone-400 underline-offset-4 hover:text-stone-900 hover:underline"
              >
                看看商品
              </NuxtLink>
            </div>
          </div>
        </div>

        <form
          v-else
          class="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]"
          @submit.prevent="handleSubmit"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              v-for="section in guideSections"
              :key="section.label"
              class="flex flex-col rounded-xl border border-stone-200 px-5 py-4"
            >
              <div class="mb-3 flex items-baseline justify-between">
                <span class="text-[13px] font-bold text-stone-900">
                  {{ section.label }}
                </span>
                <span class="text-[10px] text-stone-400">
                  {{ section.hint }}
                </span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="item in section.options"
                  :key="item"
                  type="button"
                  class="rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition-colors"
                  :class="
                    section.selected.includes(item)
                      ? 'bg-stone-950 text-white'
                      : 'border border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-800'
                  "
                  @click="toggleItem(section.selected, item)"
                >
                  {{ item }}
                </button>
              </div>
            </div>
          </div>

          <div class="lg:sticky lg:top-24 lg:self-start">
            <div
              class="rounded-xl border border-stone-200 bg-white px-5 py-5 sm:px-6"
            >
              <div class="space-y-4">
                <div>
                  <label
                    class="mb-2 block text-[12px] font-medium text-stone-600"
                  >
                    项目名称 <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="品牌首发印花系列、节日限定礼盒"
                    required
                    class="block w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-[13px] text-stone-900 outline-none transition placeholder:text-stone-400 hover:border-stone-400 focus:border-stone-900 focus:shadow-[0_0_0_4px_rgba(68,64,60,0.08)]"
                  />
                </div>
                <div>
                  <label
                    class="mb-2 block text-[12px] font-medium text-stone-600"
                  >
                    补充说明
                  </label>
                  <textarea
                    v-model="form.description"
                    rows="3"
                    placeholder="风格偏好、数量、预算、参考链接，或其他想法"
                    class="block w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3 text-[13px] text-stone-900 outline-none transition placeholder:text-stone-400 hover:border-stone-400 focus:border-stone-900 focus:shadow-[0_0_0_4px_rgba(68,64,60,0.08)]"
                  ></textarea>
                </div>
                <div>
                  <label
                    class="mb-2 block text-[12px] font-medium text-stone-600"
                    >手机号</label
                  >
                  <input
                    v-model="form.phoneNumber"
                    type="tel"
                    placeholder="方便联系你"
                    class="block w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-[13px] text-stone-900 outline-none transition placeholder:text-stone-400 hover:border-stone-400 focus:border-stone-900 focus:shadow-[0_0_0_4px_rgba(68,64,60,0.08)]"
                  />
                </div>
                <div>
                  <label
                    class="mb-2 block text-[12px] font-medium text-stone-600"
                    >邮箱</label
                  >
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="也可以留邮箱"
                    class="block w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-[13px] text-stone-900 outline-none transition placeholder:text-stone-400 hover:border-stone-400 focus:border-stone-900 focus:shadow-[0_0_0_4px_rgba(68,64,60,0.08)]"
                  />
                </div>
                <p class="text-[11px] text-stone-400">
                  手机号和邮箱至少填一个，方便我们联系你。
                </p>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="mt-4 flex w-full items-center justify-center rounded-full bg-stone-950 py-2.5 text-[12px] font-bold tracking-[0.08em] text-stone-50 transition-colors hover:bg-stone-800 disabled:opacity-50"
              >
                <svg
                  v-if="loading"
                  class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ loading ? "提交中…" : "提交设计需求" }}
              </button>
            </div>

            <div class="mt-4 grid grid-cols-3 gap-3">
              <div class="rounded-lg border border-stone-100 px-3 py-2.5">
                <div class="text-[10px] font-bold text-stone-400">01</div>
                <div class="mt-1 text-[11px] font-bold text-stone-900">
                  提交需求
                </div>
                <p class="mt-0.5 text-[10px] leading-4 text-stone-500">
                  选商品和风格
                </p>
              </div>
              <div class="rounded-lg border border-stone-100 px-3 py-2.5">
                <div class="text-[10px] font-bold text-stone-400">02</div>
                <div class="mt-1 text-[11px] font-bold text-stone-900">
                  沟通确认
                </div>
                <p class="mt-0.5 text-[10px] leading-4 text-stone-500">
                  确认方向载体
                </p>
              </div>
              <div class="rounded-lg border border-stone-100 px-3 py-2.5">
                <div class="text-[10px] font-bold text-stone-400">03</div>
                <div class="mt-1 text-[11px] font-bold text-stone-900">
                  设计交付
                </div>
                <p class="mt-0.5 text-[10px] leading-4 text-stone-500">
                  输出成品文件
                </p>
              </div>
            </div>
          </div>
        </form>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 180ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
