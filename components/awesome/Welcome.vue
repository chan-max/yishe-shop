<script lang="ts" setup>
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

onMounted(() => {
  try {
    console.log("aweawe", parseMenuTitle("aweawe"), this);
  } catch (error) {
    console.log("aweawe error", error);
  }
});
</script>

<template>
  <div>
    <!-- 设计需求弹窗 -->
    <v-dialog
      v-model="showDesignModal"
      max-width="600"
      persistent
      class="design-request-dialog"
    >
      <v-card class="rounded-lg">
        <v-card-title class="d-flex justify-space-between align-center pa-6 border-bottom">
          <span class="text-h5 font-weight-bold">提交设计需求</span>
          <v-btn icon variant="text" @click="showDesignModal = false" class="close-btn">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form @submit.prevent="submitDesignRequest" class="design-form">
            <v-text-field
              v-model="designForm.name"
              label="设计名称"
              :error-messages="formErrors.name"
              variant="outlined"
              density="comfortable"
              class="mb-4 form-field"
              bg-color="grey-lighten-4"
              hide-details="auto"
            ></v-text-field>

            <v-textarea
              v-model="designForm.description"
              label="设计需求描述"
              :error-messages="formErrors.description"
              variant="outlined"
              density="comfortable"
              rows="4"
              class="mb-4 form-field"
              :hint="`已输入 ${designForm.description.length}/1000 字符`"
              persistent-hint
              bg-color="grey-lighten-4"
              hide-details="auto"
            ></v-textarea>

            <v-text-field
              v-model="designForm.phoneNumber"
              label="手机号"
              :error-messages="formErrors.phoneNumber"
              variant="outlined"
              density="comfortable"
              class="mb-4 form-field"
              bg-color="grey-lighten-4"
              hide-details="auto"
            ></v-text-field>

            <v-text-field
              v-model="designForm.email"
              label="邮箱"
              :error-messages="formErrors.email"
              variant="outlined"
              density="comfortable"
              class="mb-4 form-field"
              bg-color="grey-lighten-4"
              hide-details="auto"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="elevated"
            @click="submitDesignRequest"
            class="submit-btn"
            size="large"
            min-width="120"
          >
            提交需求
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 提示框 -->
    <v-snackbar v-model="showSuccessToast" color="success" timeout="3000">
      提交成功 - 我们会尽快联系您
    </v-snackbar>

    <v-snackbar v-model="showErrorToast" color="error" timeout="3000">
      提交失败 - 请稍后重试
    </v-snackbar>

    <div class="w-full h-12 bg-black flex items-center justify-center"></div>

    <!-- <div
      class="w-full h-24 mt-[1px]"
      style="background-color: rgba(105, 0, 255, 0.6)"
    ></div> -->
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

    <!-- 设计介绍部分 -->
    <div class="my-16 w-full">
      <h2 class="text-3xl font-bold text-center mb-8">选择您的设计方式</h2>
      <div class="grid grid-cols-1 md:grid-cols-3">
        <!-- 个人定制卡片 -->
        <v-card class="design-card" elevation="0">
          <div class="design-card-content">
            <div class="design-left">
              <div class="design-icon-wrapper">
                <v-icon size="x-large" color="primary">mdi-account-edit</v-icon>
              </div>
            </div>
            <div class="design-right">
              <v-card-title class="text-xl font-bold mb-3">个人定制</v-card-title>
              <v-card-text>
                <p class="text-gray-600">
                  完全由您主导的个性化设计体验。您可以自由选择服装类型、颜色、图案和做工等细节，打造专属于您的独特服装。
                </p>
              </v-card-text>
              <v-card-actions class="pt-4">
                <v-btn
                  variant="tonal"
                  color="black"
                  size="large"
                  class="text-black font-bold text-xl"
                  @click="showDesignModal = true"
                >
                  开始定制
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>

        <!-- 设计师设计卡片 -->
        <v-card class="design-card" elevation="0">
          <div class="design-card-content">
            <div class="design-left">
              <div class="design-icon-wrapper">
                <v-icon size="x-large" color="primary">mdi-palette</v-icon>
              </div>
            </div>
            <div class="design-right">
              <v-card-title class="text-xl font-bold mb-3">设计师设计</v-card-title>
              <v-card-text>
                <p class="text-gray-600">
                  由专业设计师为您量身定制。您只需提供设计灵感和需求，我们的设计师将为您打造独特的服装款式。
                </p>
              </v-card-text>
              <v-card-actions class="pt-4">
                <v-btn
                  variant="tonal"
                  color="black"
                  size="large"
                  class="text-black font-bold text-xl"
                  @click="showDesignModal = true"
                >
                  联系设计师
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>

        <!-- AI设计卡片 -->
        <v-card class="design-card" elevation="0">
          <div class="design-card-content">
            <div class="design-left">
              <div class="design-icon-wrapper">
                <v-icon size="x-large" color="primary">mdi-robot</v-icon>
              </div>
            </div>
            <div class="design-right">
              <v-card-title class="text-xl font-bold mb-3">AI设计</v-card-title>
              <v-card-text>
                <p class="text-gray-600">
                  通过AI技术实现智能设计。只需描述您的需求，AI将全程参与服装设计过程，为您提供专业的设计方案。
                </p>
              </v-card-text>
              <v-card-actions class="pt-4">
                <v-btn
                  variant="tonal"
                  color="black"
                  size="large"
                  class="text-black font-bold text-xl"
                  @click="showDesignModal = true"
                >
                  体验AI设计
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <!-- 商品展示链接部分 -->
    <div class="my-16 w-full bg-gray-50 py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">探索精选商品</h2>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
          发现独特的服装设计，展现您的个性风格。我们精心挑选了各种风格的服装，满足您的不同需求。
        </p>
        <NuxtLink to="/products">
          <v-btn
            color="primary"
            size="x-large"
            variant="elevated"
            class="text-white font-bold text-lg px-8 py-4"
          >
            浏览商品
          </v-btn>
        </NuxtLink>
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

/* 设计需求弹窗样式 */
.design-request-dialog {
  .v-card {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  .close-btn {
    transition: all 0.3s ease;
    &:hover {
      transform: rotate(90deg);
    }
  }

  .form-field {
    .v-field {
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }

      &.v-field--focused {
        background-color: #fff;
        box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
      }
    }
  }

  .submit-btn {
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
    }
  }
}

/* 设计卡片样式 */
.design-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  overflow: hidden;
  height: 200px;
  
  .design-card-content {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .design-left {
    flex: 0 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 20px;
  }

  .design-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .design-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    background: rgba(var(--v-theme-primary), 0.05);
  }

  .v-card-title {
    font-size: 1.25rem;
    line-height: 1.3;
    color: rgba(0, 0, 0, 0.87);
    margin-bottom: 4px;
  }

  .v-card-text {
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.95rem;
    line-height: 1.4;
    margin-bottom: 4px;
  }

  .v-card-actions {
    padding-top: 4px !important;
  }

  .v-btn {
    transition: all 0.3s ease;
    align-self: flex-start;
    padding: 0 16px;
    height: 36px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .design-card {
    height: auto;
    
    .design-card-content {
      flex-direction: column;
      padding: 20px;
    }
    
    .design-left {
      flex: none;
      padding-right: 0;
      margin-bottom: 12px;
    }
    
    .design-icon-wrapper {
      width: 60px;
      height: 60px;
    }
    
    .v-card-title {
      font-size: 1.25rem;
      text-align: center;
      margin-bottom: 4px;
    }
    
    .v-card-text {
      text-align: center;
      margin-bottom: 4px;
    }
    
    .v-card-actions {
      padding-top: 4px !important;
    }
    
    .v-btn {
      align-self: center;
    }
  }
}
</style>
