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
  title: '定制设计报价 - 衣设 yishe',
  meta: [
    {
      name: 'description',
      content: '查看衣设 POD 印花设计、私人定制、品牌周边和创意设计服务报价，选择适合个人、创作者和团队的合作方式。'
    },
    {
      name: 'keywords',
      content: 'POD设计报价,定制设计价格,印花设计服务,私人定制,品牌周边设计,礼品定制,衣设'
    }
  ]
})

// 定价方案数据
const plans = ref([
  {
    id: 1,
    name: '灵感浏览',
    price: '免费',
    period: '',
    description: '适合寻找 POD 方向和图案参考',
    popular: false,
    features: [
      { text: '浏览 POD 商品资源库', available: true },
      { text: '查看印花与图案灵感', available: true },
      { text: '收藏定制商品方向', available: true },
      { text: '基础咨询建议', available: true },
      { text: '专属图案设计', available: false },
      { text: '品牌周边方案', available: false },
      { text: '打样与供应链对接', available: false }
    ],
    buttonText: '开始浏览',
    buttonColor: 'outline',
    detailContent: '灵感浏览适合正在寻找 POD 商品方向的个人和创作者。你可以先从印花图案、服装载体、礼品周边和定制案例里建立风格判断，再决定是否进入专属设计或打样合作。'
  },
  {
    id: 2,
    name: '创作者定制',
    price: '399起',
    period: '项',
    description: '适合个人礼物、店铺上新和小批量周边',
    popular: false,
    features: [
      { text: '1 对 1 需求梳理', available: true },
      { text: 'POD 图案与版面设计', available: true },
      { text: '服装、包袋、杯具等载体建议', available: true },
      { text: '商品展示图与上架素材', available: true },
      { text: '印刷工艺建议', available: true },
      { text: '品牌系列策划', available: false },
      { text: '批量打样跟进', available: false }
    ],
    buttonText: '联系购买',
    buttonColor: 'outline',
    detailContent: '创作者定制面向个人礼物、独立店铺、社群周边和小批量上新。衣设会围绕主题、受众、商品载体和印花工艺输出可落地的图案与展示素材，让想法更快变成可销售、可赠送、可纪念的商品。'
  },
  {
    id: 3,
    name: '品牌合作',
    price: '定制',
    period: '',
    description: '适合品牌活动、IP 衍生和长期内容合作',
    popular: false,
    features: [
      { text: '品牌视觉与 POD 系列规划', available: true },
      { text: '多款商品载体延展', available: true },
      { text: '活动礼品与周边方案', available: true },
      { text: '打样、上新与素材交付节奏', available: true },
      { text: '长期设计内容合作', available: true },
      { text: '专属沟通与项目管理', available: true }
    ],
    buttonText: '联系购买',
    buttonColor: 'outline',
    detailContent: '品牌合作适合活动礼品、IP 衍生、企业文化周边和长期上新计划。服务内容会根据品牌调性、预算、数量、交付时间和渠道场景定制，覆盖创意方向、图案系统、商品组合、展示素材和落地执行建议。'
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
        <h1 class="pricing-title">POD 定制设计服务</h1>
        <p class="pricing-subtitle">
          从私人礼物到品牌周边，按设计深度、商品载体和交付范围匹配合作方式。
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
                原价：{{ plan.originalPrice }}
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
      <h2 class="section-title">服务说明</h2>
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
            <h3 class="faq-question">可以只做一件私人定制吗？</h3>
            <p class="faq-answer">
              可以。衣设支持从单件礼物、纪念款到小批量周边的设计咨询与图案定制。
            </p>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">价格为什么是区间或定制？</h3>
            <p class="faq-answer">
              POD 项目会受到图案复杂度、商品数量、工艺、打样和交付素材影响，确认需求后会给出明确报价。
            </p>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">能直接用于上架销售吗？</h3>
            <p class="faq-answer">
              可以按上架场景交付展示图、详情页素材和基础文案建议，具体授权范围会在合作前确认。
            </p>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">品牌项目需要准备什么？</h3>
            <p class="faq-answer">
              建议准备品牌资料、参考风格、目标用户、商品类型、数量范围和交付时间，方便快速评估方案。
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
