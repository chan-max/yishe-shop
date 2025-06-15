<script lang="ts" setup>
import { getEnvironmentInfo } from "~/utils/environment";

const { awesome } = useAppConfig();
const { parseMenuRoute, parseMenuTitle } = useNavbarParser();

const props = defineProps({
  withAlert: {
    type: Boolean,
    default: true,
  },
});
const showAlert = ref(
  awesome?.layout?.welcome?.disableInfoReplaceIndexInWelcomePage
    ? !awesome?.layout?.welcome?.disableInfoReplaceIndexInWelcomePage
    : props.withAlert
);

const showDesignModal = ref(false);
const showSuccessToast = ref(false);
const showErrorToast = ref(false);
const designForm = ref({
  name: "",
  description: "",
  phoneNumber: "",
  email: "",
});

// 商品类型定义
interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  tag?: string
  likes: number
}

interface PageResponse {
  list: Product[]
  total: number
  page: number
  pageSize: number
}

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)

// 商品列表
const products = ref<Product[]>([])

// 获取商品列表
const fetchProducts = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const response = await $customFetch<PageResponse>('/product/page', {
      method: 'POST',
      body: {
        currentPage: currentPage.value,
        pageSize: pageSize.value,
      }
    })
    products.value = response.list
    total.value = response.total
    
  } catch (error) {
    console.error('获取商品列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听分页变化
watch([currentPage], () => {
  fetchProducts()
})

// 初始化加载
onMounted(() => {
  fetchProducts()
})

const formErrors = ref({
  name: "",
  description: "",
  phoneNumber: "",
  email: "",
});

const validateForm = () => {
  let isValid = true;
  formErrors.value = {
    name: "",
    description: "",
    phoneNumber: "",
    email: "",
  };

  if (!designForm.value.name.trim()) {
    formErrors.value.name = "请输入设计名称";
    isValid = false;
  } else if (designForm.value.name.length > 50) {
    formErrors.value.name = "设计名称不能超过50个字符";
    isValid = false;
  }

  if (!designForm.value.description.trim()) {
    formErrors.value.description = "请输入设计需求描述";
    isValid = false;
  } else if (designForm.value.description.length < 10) {
    formErrors.value.description = "设计需求描述至少需要10个字符";
    isValid = false;
  } else if (designForm.value.description.length > 1000) {
    formErrors.value.description = "设计需求描述不能超过1000个字符";
    isValid = false;
  }

  // 验证手机号
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!designForm.value.phoneNumber.trim()) {
    formErrors.value.phoneNumber = "请输入手机号";
    isValid = false;
  } else if (!phoneRegex.test(designForm.value.phoneNumber)) {
    formErrors.value.phoneNumber = "请输入有效的手机号";
    isValid = false;
  }

  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!designForm.value.email.trim()) {
    formErrors.value.email = "请输入邮箱";
    isValid = false;
  } else if (!emailRegex.test(designForm.value.email)) {
    formErrors.value.email = "请输入有效的邮箱地址";
    isValid = false;
  }

  return isValid;
};

interface DesignRequestResponse {
  name: string;
  description: string;
  phoneNumber: string;
  email: string;
  userId: string | null;
  id: string;
  createTime: string;
  updateTime: string;
}

interface ApiResponse<T = any> {
  data: T;
  code: number;
  status: boolean;
}

const submitDesignRequest = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const { $customFetch } = useNuxtApp();
    const response = await $customFetch<ApiResponse<DesignRequestResponse>>(
      "/design-request",
      {
        method: "POST",
        body: {
          name: designForm.value.name,
          description: designForm.value.description,
          phoneNumber: designForm.value.phoneNumber,
          email: designForm.value.email,
        },
      }
    );

    showSuccessToast.value = true;

    showDesignModal.value = false;
    // 重置表单
    designForm.value = {
      name: "",
      description: "",
      phoneNumber: "",
      email: "",
    };
    formErrors.value = {
      name: "",
      description: "",
      phoneNumber: "",
      email: "",
    };
  } catch (error) {
    console.error("提交失败:", error);
    showErrorToast.value = true;
  }
};

const leadingsText = computed(() => [
  {
    text: "最具创意的",
    startColor: "#007CF0",
    endColor: "#00DFD8",
    delay: 0,
  },
  {
    text: "开放式服装设计平台",
    startColor: "#7928CA",
    endColor: "#FF0080",
    delay: 2,
  },
  // {
  //   text: titlesText.value[2],
  //   startColor: '#FF4D4D',
  //   endColor: '#F9CB28',
  //   delay: 4,
  // },
]);

const envInfo = getEnvironmentInfo();
console.log(envInfo);

onMounted(() => {
  try {
    console.log("aweawe", parseMenuTitle("aweawe"), this);
  } catch (error) {
    console.log("aweawe error", error);
  }
});

// 过滤条件数据
const filterOptions = {
  price: [
    { value: '0-100', label: '0-100元' },
    { value: '100-300', label: '100-300元' },
    { value: '300-500', label: '300-500元' },
    { value: '500+', label: '500元以上' }
  ],
  style: [
    { value: 'casual', label: '休闲' },
    { value: 'formal', label: '正装' },
    { value: 'sports', label: '运动' },
    { value: 'vintage', label: '复古' }
  ],
  season: [
    { value: 'spring', label: '春季' },
    { value: 'summer', label: '夏季' },
    { value: 'autumn', label: '秋季' },
    { value: 'winter', label: '冬季' }
  ],
  material: [
    { value: 'cotton', label: '棉质' },
    { value: 'wool', label: '羊毛' },
    { value: 'silk', label: '丝绸' },
    { value: 'linen', label: '亚麻' }
  ],
  color: [
    { value: 'black', label: '黑色' },
    { value: 'white', label: '白色' },
    { value: 'red', label: '红色' },
    { value: 'blue', label: '蓝色' }
  ],
  size: [
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' }
  ],
  brand: [
    { value: 'brand1', label: '品牌1' },
    { value: 'brand2', label: '品牌2' },
    { value: 'brand3', label: '品牌3' }
  ],
  discount: [
    { value: 'discount1', label: '9折以上' },
    { value: 'discount2', label: '7-9折' },
    { value: 'discount3', label: '5-7折' },
    { value: 'discount4', label: '5折以下' }
  ]
}

// 选中的过滤条件
const selectedFilters = ref({
  price: '',
  style: '',
  season: '',
  material: '',
  color: '',
  size: '',
  brand: '',
  discount: ''
})
</script>

<template>
  <!-- 设计需求弹窗 -->
  <div
    v-if="showDesignModal"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-2xl p-6 w-full max-w-md transform transition-all duration-300 shadow-2xl hover:shadow-3xl"
    >
      <div class="flex justify-between items-center mb-4">
        <h3
          class="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          提交设计需求
        </h3>
        <button
          @click="showDesignModal = false"
          class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <form @submit.prevent="submitDesignRequest" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">设计名称</label>
          <input
            v-model="designForm.name"
            type="text"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            :class="{ 'border-red-500': formErrors.name }"
            placeholder="请输入设计名称"
          />
          <p v-if="formErrors.name" class="text-red-500 text-sm mt-1">
            {{ formErrors.name }}
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">设计需求描述</label>
          <textarea
            v-model="designForm.description"
            rows="4"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/80 backdrop-blur-sm resize-none"
            :class="{ 'border-red-500': formErrors.description }"
            placeholder="请详细描述您的设计需求，包括：&#10;1. 设计风格偏好&#10;2. 具体用途&#10;3. 特殊要求&#10;4. 参考案例（如有）"
          ></textarea>
          <p v-if="formErrors.description" class="text-red-500 text-sm mt-1">
            {{ formErrors.description }}
          </p>
          <p class="text-gray-500 text-sm mt-1">
            已输入 {{ designForm.description.length }}/1000 字符
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">手机号</label>
          <input
            v-model="designForm.phoneNumber"
            type="tel"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            :class="{ 'border-red-500': formErrors.phoneNumber }"
            placeholder="请输入手机号"
          />
          <p v-if="formErrors.phoneNumber" class="text-red-500 text-sm mt-1">
            {{ formErrors.phoneNumber }}
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">邮箱</label>
          <input
            v-model="designForm.email"
            type="email"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white/80 backdrop-blur-sm"
            :class="{ 'border-red-500': formErrors.email }"
            placeholder="请输入邮箱地址"
          />
          <p v-if="formErrors.email" class="text-red-500 text-sm mt-1">
            {{ formErrors.email }}
          </p>
        </div>

        <div class="flex justify-end pt-4">
          <button
            type="submit"
            class="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            提交需求
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- 提示框 -->
  <AwesomeToast
    v-model:show="showSuccessToast"
    type="success"
    title="提交成功"
    text="我们会尽快联系您"
  />

  <AwesomeToast
    v-model:show="showErrorToast"
    type="danger"
    title="提交失败"
    text="请稍后重试"
  />

  <div class="w-full h-12 bg-black flex items-center justify-center"></div>

  <div
    class="w-full h-24 mt-[1px]"
    style="background-color: rgba(105, 0, 255, 0.6)"
  ></div>
  <!-- <div class="w-full h-12 bg-white"></div> -->
  <!-- <div class="w-full h-80 bg-black"></div> -->

  <LayoutPageWrapper class="flex-1 flex bg-white">
    <LayoutPageSection class="flex-1 flex">
      <div class="flex-1 flex flex-col items-center my-20">
        <h1 class="text-center">
          <span
            v-for="(item, i) in leadingsText"
            :key="i"
            :style="`--content: '${item.text}'; --start-color: ${
              item.startColor
            }; --end-color: ${item.endColor}; --animation-name: anim-fg-${i + 1}`"
            class="animated-text-bg drop-shadow-xl text-6xl sm:text-8xl md:text-8xl lg:text-8xl 2xl:text-8xl block font-black uppercase"
          >
            <span class="animated-text-fg">{{ item.text }}</span>
          </span>
        </h1>
        <div class="px-4 mt-6 text-center max-w-[500px] md:max-w-[600px] text-black">
          {{ awesome?.description || "最具创意的开放式服装设计平台" }}
        </div>
        <div class="flex space-x-4 ml-2 mt-8 justify-center md:justify-start">
          <button
            @click="showDesignModal = true"
            class="border-2 border-black text-black px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-300 font-bold text-xl"
          >
            免费设计
          </button>
        </div>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>

  <!-- 商品列表 -->

  <div class="w-full bg-[#eee]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <!-- 价格区间 -->
        <Dropdown
          v-model="selectedFilters.price"
          :options="filterOptions.price"
          optionLabel="label"
          optionValue="value"
          :placeholder="'价格区间'"
          class="w-full"
        />

        <!-- 风格 -->
        <Dropdown
          v-model="selectedFilters.style"
          :options="filterOptions.style"
          optionLabel="label"
          optionValue="value"
          :placeholder="'风格'"
          class="w-full"
        />

        <!-- 季节 -->
        <Dropdown
          v-model="selectedFilters.season"
          :options="filterOptions.season"
          optionLabel="label"
          optionValue="value"
          :placeholder="'季节'"
          class="w-full"
        />

        <!-- 材质 -->
        <Dropdown
          v-model="selectedFilters.material"
          :options="filterOptions.material"
          optionLabel="label"
          optionValue="value"
          :placeholder="'材质'"
          class="w-full"
        />

        <!-- 颜色 -->
        <Dropdown
          v-model="selectedFilters.color"
          :options="filterOptions.color"
          optionLabel="label"
          optionValue="value"
          :placeholder="'颜色'"
          class="w-full"
        />

        <!-- 尺码 -->
        <Dropdown
          v-model="selectedFilters.size"
          :options="filterOptions.size"
          optionLabel="label"
          optionValue="value"
          :placeholder="'尺码'"
          class="w-full"
        />

        <!-- 品牌 -->
        <Dropdown
          v-model="selectedFilters.brand"
          :options="filterOptions.brand"
          optionLabel="label"
          optionValue="value"
          :placeholder="'品牌'"
          class="w-full"
        />

        <!-- 折扣 -->
        <Dropdown
          v-model="selectedFilters.discount"
          :options="filterOptions.discount"
          optionLabel="label"
          optionValue="value"
          :placeholder="'折扣'"
          class="w-full"
        />
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-[1440px] mx-auto">
      <div class="px-4 py-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 max-w-[1440px] mx-auto">
          <!-- 商品卡片 -->
          <div v-for="product in products" :key="product.id" 
            class="rounded-lg overflow-hidden">
            <!-- 商品图片 -->
            <div class="relative aspect-[4/5]">
              <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover" />
              <!-- 商品标签 -->
              <div v-if="product.tag" class="absolute top-2 left-2 px-2 py-1 text-xs rounded border">
                {{ product.tag }}
              </div>
            </div>
            
            <!-- 商品信息 -->
            <div class="p-3">
              <h3 class="text-sm font-medium mb-1 line-clamp-2">{{ product.name }}</h3>
              <p class="text-xs mb-2 text-gray-600">{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-baseline gap-1">
                  <span class="text-base font-bold">¥{{ product.price }}</span>
                  <span v-if="product.originalPrice" class="text-xs line-through">¥{{ product.originalPrice }}</span>
                </div>
                <div class="flex items-center gap-1 text-xs">
                  <Icon name="heroicons:heart" class="w-3 h-3" />
                  <span>{{ product.likes }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="flex justify-center mt-8">
          <nav class="flex items-center gap-2">
            <button 
              class="px-3 py-1 border rounded"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >上一页</button>
            <button 
              v-for="page in Math.ceil(total / pageSize)" 
              :key="page"
              class="px-3 py-1 border rounded"
              :class="{ 'bg-primary text-white': currentPage === page }"
              @click="currentPage = page"
            >{{ page }}</button>
            <button 
              class="px-3 py-1 border rounded"
              :disabled="currentPage >= Math.ceil(total / pageSize)"
              @click="currentPage++"
            >下一页</button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --padding: 0.05em;
}

@keyframes anim-fg-1 {
  0%,
  16.667%,
  100% {
    opacity: 1;
  }
  33.333%,
  83.333% {
    opacity: 0;
  }
}
@keyframes anim-fg-2 {
  0%,
  16.667%,
  66.667%,
  100% {
    opacity: 0;
  }
  33.333%,
  50% {
    opacity: 1;
  }
}
@keyframes anim-fg-3 {
  0%,
  50%,
  100% {
    opacity: 0;
  }
  66.667%,
  83.333% {
    opacity: 1;
  }
}
.animated-text-bg {
  position: relative;
  display: block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  content: var(--content);
  display: block;
  width: 100%;
  color: theme("colors.slate.800");
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-left: var(--padding);
  padding-right: var(--padding);
  &:before {
    content: var(--content);
    position: absolute;
    display: block;
    width: 100%;
    color: theme("colors.slate.800");
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    padding-left: var(--padding);
    padding-right: var(--padding);
  }
}
.animated-text-fg {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: var(--padding);
  padding-right: var(--padding);
  background-image: linear-gradient(90deg, var(--start-color), var(--end-color));
  position: relative;
  opacity: 0;
  z-index: 1;
  animation: var(--animation-name) 8s infinite;
}
html.dark {
  .animated-text-bg {
    color: theme("colors.gray.100");
    &:before {
      color: theme("colors.gray.100");
    }
  }
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 添加 PrimeVue Dropdown 自定义样式 */
.p-dropdown {
  width: 100%;
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: #d1d5db;
  }

  &.p-focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
  }

  .p-dropdown-label {
    padding: 0.5rem 0.75rem;
    font-size: 0.9em;
    color: #4b5563;
  }

  .p-dropdown-trigger {
    width: 2.5rem;
  }
}

.p-dropdown-panel {
  .p-dropdown-items {
    padding: 0.25rem 0;
  }

  .p-dropdown-item {
    padding: 0.5rem 0.75rem;
    font-size: 0.9em;
    color: #4b5563;
    transition: all 0.15s;

    &:hover {
      background: #f3f4f6;
    }

    &.p-highlight {
      background: #f3f4f6;
      color: var(--primary-color);
    }
  }
}
</style>
