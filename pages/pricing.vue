<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-10-30 08:29:23
 * @FilePath: /yishe-nuxt/pages/pricing.vue
 * @Description: Pricing Page - Choose the perfect plan for you
-->
<script lang="ts" setup>
definePageMeta({ layout: 'page' })

// Page title and meta
useHead({
  titleTemplate: '',
  title: 'Pricing - 1s Design',
  meta: [
    {
      name: 'description',
      content: 'Choose the perfect plan for your design needs. Flexible pricing options for designers of all levels.'
    },
    {
      name: 'keywords',
      content: 'pricing, design plans, subscription, 1s design pricing'
    }
  ]
})

// 定价方案数据
const plans = ref([
  {
    id: 1,
    name: '入门版',
    price: '免费',
    period: '',
    description: '适合初学者和爱好者',
    popular: false,
    features: [
      { text: '最多 10 个项目', available: true },
      { text: '基础模板访问', available: true },
      { text: '社区支持', available: true },
      { text: '5GB 存储空间', available: true },
      { text: '带水印导出', available: true },
      { text: '有限的 AI 工具', available: true },
      { text: '无限项目', available: false },
      { text: '高级模板', available: false },
      { text: '优先支持', available: false },
      { text: '高分辨率无水印导出', available: false }
    ],
    buttonText: '联系购买',
    buttonColor: 'outline',
    detailContent: '入门版是我们为初学者和设计爱好者精心打造的免费方案。虽然功能相对基础，但足以满足学习和探索设计工具的需求。该方案提供最多10个项目的创建空间，5GB存储空间，以及基础模板库的访问权限。导出的作品会带有水印，但对学习和分享来说完全够用。社区支持可以帮助您解决使用过程中的问题，是开始设计之旅的完美起点。'
  },
  {
    id: 2,
    name: '专业版',
    price: '¥99',
    period: '月',
    originalPrice: '¥149',
    description: '为专业设计师打造',
    popular: false,
    features: [
      { text: '无限项目', available: true },
      { text: '所有高级模板', available: true },
      { text: '优先支持', available: true },
      { text: '100GB 存储空间', available: true },
      { text: '高分辨率无水印导出', available: true },
      { text: '完整 AI 工具访问', available: true },
      { text: '高级数据分析', available: true },
      { text: '自定义品牌', available: true },
      { text: '团队协作工具', available: false },
      { text: '无限存储空间', available: false },
      { text: '专属客户经理', available: false }
    ],
    buttonText: '联系购买',
    buttonColor: 'outline',
    detailContent: '专业版专为职业设计师和设计团队打造，提供了完整的设计工具套件和高级功能。该方案支持无限项目创建，100GB存储空间足以满足大部分专业项目的需求。所有高级模板和AI工具都可以无限制使用，大大提升设计效率。高分辨率无水印导出让您的作品可以直接用于商业用途。优先技术支持确保您在使用过程中遇到问题能够快速得到响应。高级数据分析和自定义品牌功能让您能够更好地管理和展示您的设计工作。'
  },
  {
    id: 3,
    name: '企业版',
    price: '定制',
    period: '',
    description: '适合团队和机构',
    popular: false,
    features: [
      { text: '专业版全部功能', available: true },
      { text: '团队协作工具', available: true },
      { text: '无限存储空间', available: true },
      { text: '专属客户经理', available: true },
      { text: '自定义集成', available: true },
      { text: 'SLA 服务保障', available: true },
      { text: '高级安全', available: true },
      { text: '培训与入门指导', available: true }
    ],
    buttonText: '联系购买',
    buttonColor: 'outline',
    detailContent: '企业版是我们为企业级用户提供的定制化解决方案，除了包含专业版的所有功能外，还增加了强大的团队协作和系统集成能力。无限存储空间让您无需担心项目规模限制。专属客户成功经理提供一对一服务，确保您的团队能够充分利用平台的所有功能。强大的团队协作工具支持多人在线协作，权限管理让团队管理更加高效。可以与企业现有系统进行深度集成，实现工作流程的无缝对接。SLA服务保障确保平台稳定性和可用性。企业级安全标准和数据保护机制，让您的数据安全无忧。我们还提供定制化培训和入门指导，帮助您的团队快速上手。对于有特殊需求的企业，我们还支持私有化部署选项。'
  }
])

// 跳转到详细介绍锚点
const scrollToDetails = (planId: number) => {
  const element = document.getElementById(`plan-detail-${planId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 跳转到联系我们页面
const goToContact = () => {
  navigateTo('/contact')
}
</script>

<template>
  <div class="pricing-page">
    <div class="pricing-container">
      <!-- Hero Section -->
      <section class="pricing-hero">
        <h1 class="pricing-title">简单透明的定价</h1>
        <p class="pricing-subtitle">
          为您的设计之旅选择最合适的方案。所有付费方案均提供 14 天免费试用。
        </p>
      </section>

      <!-- Pricing Cards -->
      <section class="pricing-cards">
        <template v-for="plan in plans" :key="plan.id">
          <div class="pricing-card-wrapper">
            <div class="pricing-card">
          <!-- Top Color Bar -->
          <div 
            class="card-top-bar"
            :class="`bar-${plan.buttonColor}`"
          ></div>

          <!-- Card Content -->
          <div class="card-content">
            <!-- Plan Header -->
            <div class="plan-header">
              <h3 class="plan-name">{{ plan.name }}</h3>
              <p class="plan-description">{{ plan.description }}</p>
              
              <div class="plan-price">
                <span v-if="plan.price === '定制'" class="price-custom">{{ plan.price }}</span>
                <template v-else>
                  <span v-if="plan.price !== '免费'" class="price-symbol">¥</span>
                  <span class="price-amount">{{ plan.price }}</span>
                  <span v-if="plan.period" class="price-period">/{{ plan.period }}</span>
                </template>
              </div>
              
              <div v-if="plan.originalPrice" class="price-original">
                原价：{{ plan.originalPrice }}/月
              </div>
            </div>

            <!-- Features List -->
            <ul class="features-list">
              <li 
                v-for="(feature, index) in plan.features" 
                :key="index" 
                class="feature-item"
                :class="{ 'feature-unavailable': !feature.available }"
              >
                <div 
                  class="feature-icon"
                  :class="feature.available ? 'icon-available' : 'icon-unavailable'"
                >
                  <svg
                    v-if="feature.available"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="check-icon"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    class="cross-icon"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
                <span>{{ feature.text }}</span>
              </li>
            </ul>

            <!-- Details Link -->
            <div class="details-link-wrapper">
              <button 
                @click="scrollToDetails(plan.id)"
                class="details-link"
              >
                <span>详情</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="details-icon"
                >
                  <path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="card-button-wrapper">
            <button 
              @click="goToContact"
              :class="['cta-button', `cta-button-${plan.buttonColor}`]"
            >
              {{ plan.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </section>

    <!-- Plan Details Section -->
    <section class="plan-details-section">
      <h2 class="section-title">套餐详细介绍</h2>
      <div class="plan-details-container">
        <div
          v-for="plan in plans"
          :key="plan.id"
          :id="`plan-detail-${plan.id}`"
          class="plan-detail-item"
        >
          <h3 class="plan-detail-title">
            <span class="plan-detail-name">{{ plan.name }}</span>
            <span class="plan-detail-price">
              <span v-if="plan.price === '定制'">{{ plan.price }}</span>
              <template v-else>
                <span v-if="plan.price !== '免费'" class="price-symbol">¥</span>
                <span>{{ plan.price }}</span>
                <span v-if="plan.period">/{{ plan.period }}</span>
              </template>
            </span>
          </h3>
          <p class="plan-detail-content">{{ plan.detailContent }}</p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
        <h2 class="section-title">常见问题</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3 class="faq-question">我可以稍后更改套餐吗？</h3>
            <p class="faq-answer">
              可以，您可以随时升级或降级套餐。更改将在下个计费周期生效。
            </p>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">你们接受哪些支付方式？</h3>
            <p class="faq-answer">
              我们接受所有主流信用卡、支付宝、微信支付，以及国际用户的 PayPal。
            </p>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">有免费试用吗？</h3>
            <p class="faq-answer">
              有的！所有付费方案都提供 14 天免费试用。无需信用卡即可开始。
            </p>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">可以退款吗？</h3>
            <p class="faq-answer">
              我们提供 30 天退款保证。如果您不满意，请联系我们的支持团队。
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// CSS Variables
:root {
  --primary-color: #2563eb;
  --secondary-color: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --border-color: #e2e8f0;
  --success-color: #10b981;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.pricing-page {
  min-height: 100vh;
  background: #ffffff;
  padding: 3rem 0;
  
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
}

.pricing-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Hero Section
.pricing-hero {
  text-align: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
}

.pricing-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.pricing-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
}

// Pricing Cards
.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
}

.pricing-card-wrapper {
  display: flex;
  flex-direction: column;
}

.pricing-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: scale(1.05);
  }
}

.card-top-bar {
  height: 4px;
  width: 100%;
  
  &.bar-primary {
    background: var(--primary-color);
  }
  
  &.bar-outline {
    background: #e5e7eb;
  }
}

.card-content {
  padding: 2rem;
  flex: 1;
}

.card-button-wrapper {
  padding: 1rem;
  padding-top: 0;
}

// Details Link
.details-link-wrapper {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.details-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1d4ed8;
  }
  
  .details-icon {
    width: 1rem;
    height: 1rem;
  }
}

// Plan Details Section
.plan-details-section {
  margin-top: 5rem;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
}

.plan-details-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
  }
}

.plan-detail-item {
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  scroll-margin-top: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.plan-detail-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.plan-detail-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.plan-detail-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  
  .price-symbol {
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
}

.plan-detail-content {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.9375rem;
  }
}

// Plan Header
.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-name {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.plan-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.price-symbol,
.price-custom {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
}

.price-amount {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: -0.03em;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.price-custom {
  font-size: 2rem;
  font-weight: 700;
}

.price-period {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.price-original {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: line-through;
  margin-top: 0.5rem;
}

// Features List
.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  
  &.feature-unavailable {
    color: var(--text-muted);
  }
  
  .feature-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.icon-available {
      .check-icon {
        width: 1rem;
        height: 1rem;
        stroke: #10b981;
        stroke-width: 3;
      }
    }
    
    &.icon-unavailable {
      .cross-icon {
        width: 1rem;
        height: 1rem;
        stroke: #ef4444;
        stroke-width: 3;
      }
    }
  }
  
  span {
    flex: 1;
  }
}

// CTA Button
.cta-button {
  width: 100%;
  padding: 0.625rem 1.25rem;
  border-radius: 0.6rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  &.cta-button-primary {
    background-color: #171717;
    color: white;
    
    &:hover {
      background-color: #262626;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(12, 102, 237, 0.2);
    }
    
    &:active {
      background-color: #171717;
      transform: translateY(0);
    }
  }
  
  &.cta-button-outline {
    background-color: #171717;
    color: white;
    
    &:hover {
      background-color: #262626;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(12, 102, 237, 0.2);
    }
    
    &:active {
      background-color: #171717;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
}

// FAQ Section
.faq-section {
  margin-top: 5rem;
  
  @media (max-width: 768px) {
    margin-top: 3rem;
  }
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.faq-item {
  padding: 1.5rem;
  background: var(--secondary-color);
  border-radius: 12px;
}

.faq-question {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.faq-answer {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

// Responsive
@media (max-width: 768px) {
  .pricing-container {
    padding: 0 1rem;
  }
  
  .pricing-card {
    border-radius: 12px;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-button-wrapper {
    padding: 0.75rem;
    padding-top: 0;
  }
  
  .plan-header {
    margin-bottom: 1.5rem;
  }
  
  .plan-name {
    font-size: 1.625rem;
  }
  
  .features-list {
    margin-bottom: 1.25rem;
  }
  
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>

