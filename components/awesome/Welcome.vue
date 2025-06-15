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
const designForm = ref({
  style: "",
  requirements: "",
  contact: "",
  email: "",
});

const submitDesignRequest = async () => {
  try {
    // TODO: 实现发送到后台的逻辑
    console.log("提交设计需求:", designForm.value);
    showDesignModal.value = false;
  } catch (error) {
    console.error("提交失败:", error);
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
</script>

<template>
  <!-- 设计需求弹窗 -->
  <div
    v-if="showDesignModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold">提交设计需求</h3>
        <button
          @click="showDesignModal = false"
          class="text-gray-500 hover:text-gray-700"
        >
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <form @submit.prevent="submitDesignRequest" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">设计风格</label>
          <input
            v-model="designForm.style"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="例如：简约、复古、运动等"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">具体需求</label>
          <textarea
            v-model="designForm.requirements"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="请详细描述您的设计需求..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">联系方式</label>
          <input
            v-model="designForm.contact"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="您的手机号或微信号"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">邮箱</label>
          <input
            v-model="designForm.email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="您的邮箱地址"
          />
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            提交需求
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="w-full h-12 bg-black flex items-center justify-center"></div>

  <div
    class="w-full h-24 mt-[1px]"
    style="background-color: rgba(105, 0, 255, 0.6)"
  ></div>
  <!-- <div class="w-full h-12 bg-white"></div> -->
  <!-- <div class="w-full h-80 bg-black"></div> -->

  <LayoutPageWrapper class="flex-1 flex bg-black">
    <LayoutPageSection class="flex-1 flex">
      <div class="flex-1 flex flex-col items-center my-20">
        <h1 class="text-center ">
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
        <div class="px-4 mt-6 text-center max-w-[500px] md:max-w-[600px] text-white">
          {{ awesome?.description || "最具创意的开放式服装设计平台" }}
        </div>
        <div class="flex space-x-4 ml-2 mt-8 justify-center md:justify-start">
          <button
            class="border-2 border-white text-white px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-300 font-bold text-xl"
          >
            免费设计
          </button>
        </div>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>


  <div style="height: 1200px;">
  
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
  color: theme("colors.slate.300");
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
    color: theme("colors.slate.300");
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
</style>
