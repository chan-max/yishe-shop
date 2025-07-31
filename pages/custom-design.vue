<template>
  <div class="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
    <div class="max-w-[1440px] mx-auto">
      <div class="px-2 sm:px-4 py-8">
        <!-- 页面头部 -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-2">私人订制</h2>
          <p class="text-gray-600 mb-4">专属您的独一无二服装设计</p>
        </div>

        <!-- 服务介绍 -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">为什么选择私人订制？</h2>
            <p class="text-gray-600 max-w-3xl mx-auto">
              私人订制让您拥有完全符合个人风格、体型和需求的专属服装，每一件都是独一无二的艺术品。
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-md text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="uil:user-check" class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-3">个性化设计</h3>
              <p class="text-gray-600">根据您的喜好、体型特点和个人风格，量身定制专属服装</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="uil:medal" class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-xl font-semibold mb-3">优质面料</h3>
              <p class="text-gray-600">精选高品质面料，确保舒适度和耐用性，让您穿出自信</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="uil:scissors" class="w-8 h-8 text-purple-600" />
              </div>
              <h3 class="text-xl font-semibold mb-3">精湛工艺</h3>
              <p class="text-gray-600">专业裁缝团队，采用传统手工工艺，确保每一针每一线都完美</p>
            </div>
          </div>
        </div>

        <!-- 订制流程 -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold text-gray-900 text-center mb-12">订制流程</h2>
          
          <div class="relative">
            <!-- 连接线 -->
            <div class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
            
            <div class="grid md:grid-cols-5 gap-8">
              <div class="relative bg-white p-6 rounded-lg shadow-md text-center">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg relative z-10">
                  1
                </div>
                <h3 class="text-lg font-semibold mb-3">需求沟通</h3>
                <p class="text-gray-600 text-sm">与设计师深入沟通，了解您的需求、喜好和预算</p>
              </div>

              <div class="relative bg-white p-6 rounded-lg shadow-md text-center">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg relative z-10">
                  2
                </div>
                <h3 class="text-lg font-semibold mb-3">量体定制</h3>
                <p class="text-gray-600 text-sm">专业量体师为您进行精确测量，确保完美贴合</p>
              </div>

              <div class="relative bg-white p-6 rounded-lg shadow-md text-center">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg relative z-10">
                  3
                </div>
                <h3 class="text-lg font-semibold mb-3">设计确认</h3>
                <p class="text-gray-600 text-sm">设计师提供设计方案，您确认后开始制作</p>
              </div>

              <div class="relative bg-white p-6 rounded-lg shadow-md text-center">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg relative z-10">
                  4
                </div>
                <h3 class="text-lg font-semibold mb-3">精工制作</h3>
                <p class="text-gray-600 text-sm">专业裁缝团队精心制作，确保品质</p>
              </div>

              <div class="relative bg-white p-6 rounded-lg shadow-md text-center">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg relative z-10">
                  5
                </div>
                <h3 class="text-lg font-semibold mb-3">成品交付</h3>
                <p class="text-gray-600 text-sm">成品完成后，安排试穿和调整，确保完美</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 服务类型 -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold text-gray-900 text-center mb-12">订制服务类型</h2>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="uil:tshirt" class="w-8 h-8 text-red-600" />
              </div>
              <h3 class="text-lg font-semibold mb-3">商务正装</h3>
              <p class="text-gray-600 text-sm mb-4">西装、衬衫、裤装等商务场合服装</p>
              <p class="text-blue-600 font-semibold">起价 ¥1,200</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="uil:heart" class="w-8 h-8 text-pink-600" />
              </div>
              <h3 class="text-lg font-semibold mb-3">礼服定制</h3>
              <p class="text-gray-600 text-sm mb-4">晚礼服、婚纱、伴娘服等特殊场合服装</p>
              <p class="text-blue-600 font-semibold">起价 ¥2,500</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="uil:home" class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="text-lg font-semibold mb-3">休闲服装</h3>
              <p class="text-gray-600 text-sm mb-4">日常休闲装、运动装等舒适服装</p>
              <p class="text-blue-600 font-semibold">起价 ¥800</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="uil:star" class="w-8 h-8 text-purple-600" />
              </div>
              <h3 class="text-lg font-semibold mb-3">配饰定制</h3>
              <p class="text-gray-600 text-sm mb-4">领带、围巾、帽子等配饰定制</p>
              <p class="text-blue-600 font-semibold">起价 ¥300</p>
            </div>
          </div>
        </div>

        <!-- 常见问题 -->
        <div class="mb-16">
          <h2 class="text-2xl font-bold text-gray-900 text-center mb-12">常见问题</h2>
          
          <div class="max-w-4xl mx-auto space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">订制周期需要多长时间？</h3>
              <p class="text-gray-600">一般订制周期为15-30天，具体时间取决于服装复杂程度和面料采购情况。</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">可以修改设计吗？</h3>
              <p class="text-gray-600">在制作开始前，您可以随时修改设计方案。制作开始后，修改可能会产生额外费用。</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">如何保证尺寸合适？</h3>
              <p class="text-gray-600">我们提供专业量体服务，并在制作过程中安排试穿，确保最终成品完美贴合。</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-3 text-gray-900">面料可以自选吗？</h3>
              <p class="text-gray-600">我们提供多种面料选择，您也可以自带面料，我们会根据面料特性调整制作工艺。</p>
            </div>
          </div>
        </div>

        <!-- 联系咨询 -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 class="text-2xl font-bold mb-4">开始您的私人订制之旅</h2>
          <p class="text-lg mb-6 opacity-90">联系我们的专业设计师，为您打造专属服装</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              立即咨询
            </button>
            <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              预约量体
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 设置页面元数据
definePageMeta({ layout: 'page' })

// 设置页面标题
useHead({
  title: '私人订制 - 衣设服装设计',
  meta: [
    {
      name: 'description',
      content: '专业私人订制服装服务，为您量身打造独一无二的专属服装。'
    }
  ]
})
</script>

<style scoped>
/* 自定义样式 */
.container {
  max-width: 1200px;
}
</style> 