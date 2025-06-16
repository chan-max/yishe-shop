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
  <v-dialog
    v-model="showDesignModal"
    max-width="500"
    persistent
  >
    <v-card class="rounded-lg">
      <v-card-title class="d-flex justify-space-between align-center pa-4">
        <span class="text-h5 font-weight-bold">提交设计需求</span>
        <v-btn
          icon
          variant="text"
          @click="showDesignModal = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-4">
        <v-form @submit.prevent="submitDesignRequest">
          <v-text-field
            v-model="designForm.name"
            label="设计名称"
            :error-messages="formErrors.name"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          ></v-text-field>

          <v-textarea
            v-model="designForm.description"
            label="设计需求描述"
            :error-messages="formErrors.description"
            variant="outlined"
            density="comfortable"
            rows="4"
            class="mb-4"
            :hint="`已输入 ${designForm.description.length}/1000 字符`"
            persistent-hint
          ></v-textarea>

          <v-text-field
            v-model="designForm.phoneNumber"
            label="手机号"
            :error-messages="formErrors.phoneNumber"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          ></v-text-field>

          <v-text-field
            v-model="designForm.email"
            label="邮箱"
            :error-messages="formErrors.email"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="elevated"
          @click="submitDesignRequest"
        >
          提交需求
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 提示框 -->
  <v-snackbar
    v-model="showSuccessToast"
    color="success"
    timeout="3000"
  >
    提交成功 - 我们会尽快联系您
  </v-snackbar>

  <v-snackbar
    v-model="showErrorToast"
    color="error"
    timeout="3000"
  >
    提交失败 - 请稍后重试
  </v-snackbar>

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
          <v-btn
            @click="showDesignModal = true"
            variant="tonal"
            color="black"
            size="large"
            class="text-black font-bold text-xl"
          >
            免费设计
          </v-btn>
        </div>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>

  <!-- 商品列表 -->

  <div class="w-full bg-[#eee]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <!-- 价格区间 -->
        <v-select
          v-model="selectedFilters.price"
          :items="filterOptions.price"
          item-title="label"
          item-value="value"
          label="价格区间"
          variant="outlined"
          density="comfortable"
          hide-details
          class="w-full"
        />

        <!-- 风格 -->
        <v-select
          v-model="selectedFilters.style"
          :items="filterOptions.style"
          item-title="label"
          item-value="value"
          label="风格"
          variant="outlined"
          density="comfortable"
          hide-details
          class="w-full"
        />

        <!-- 季节 -->
        <v-select
          v-model="selectedFilters.season"
          :items="filterOptions.season"
          item-title="label"
          item-value="value"
          label="季节"
          variant="outlined"
          density="comfortable"
          hide-details
          class="w-full"
        />

        <!-- 材质 -->
        <v-select
          v-model="selectedFilters.material"
          :items="filterOptions.material"
          item-title="label"
          item-value="value"
          label="材质"
          variant="outlined"
          density="comfortable"
          hide-details
          class="w-full"
        />

        <!-- 颜色 -->
        <v-select
          v-model="selectedFilters.color"
          :items="filterOptions.color"
          item-title="label"
          item-value="value"
          label="颜色"
          variant="outlined"
          density="comfortable"
          hide-details
          class="w-full"
        />

        <!-- 尺码 -->
        <v-select
          v-model="selectedFilters.size"
          :items="filterOptions.size"
          item-title="label"
          item-value="value"
          label="尺码"
          variant="outlined"
          density="comfortable"
          hide-details
          class="w-full"
        />

        <!-- 品牌 -->
        <v-select
          v-model="selectedFilters.brand"
          :items="filterOptions.brand"
          item-title="label"
          item-value="value"
          label="品牌"
          variant="outlined"
          density="comfortable"
          hide-details
          class="w-full"
        />

        <!-- 折扣 -->
        <v-select
          v-model="selectedFilters.discount"
          :items="filterOptions.discount"
          item-title="label"
          item-value="value"
          label="折扣"
          variant="outlined"
          density="comfortable"
          hide-details
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
          <v-pagination
            v-model="currentPage"
            :length="Math.ceil(total / pageSize)"
            :total-visible="7"
            rounded="circle"
            color="primary"
          ></v-pagination>
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

/* 删除 PrimeVue Dropdown 相关样式 */
</style>
