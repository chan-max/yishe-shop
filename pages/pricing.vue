<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
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
      '最多 10 个项目',
      '基础模板访问',
      '社区支持',
      '5GB 存储空间',
      '带水印导出',
      '有限的 AI 工具'
    ],
    buttonText: '免费开始',
    buttonColor: 'outline'
  },
  {
    id: 2,
    name: '专业版',
    price: '¥99',
    period: '月',
    originalPrice: '¥149',
    description: '为专业设计师打造',
    popular: true,
    features: [
      '无限项目',
      '所有高级模板',
      '优先支持',
      '100GB 存储空间',
      '高分辨率无水印导出',
      '完整 AI 工具访问',
      '高级数据分析',
      '自定义品牌'
    ],
    buttonText: '免费试用',
    buttonColor: 'primary'
  },
  {
    id: 3,
    name: '企业版',
    price: '定制',
    period: '',
    description: '适合团队和机构',
    popular: false,
    features: [
      '专业版全部功能',
      '团队协作工具',
      '无限存储空间',
      '专属客户经理',
      '自定义集成',
      'SLA 服务保障',
      '高级安全',
      '培训与入门指导'
    ],
    buttonText: '联系销售',
    buttonColor: 'outline'
  }
])
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
        <div 
          v-for="plan in plans" 
          :key="plan.id"
          class="pricing-card"
          :class="{ 'popular': plan.popular }"
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="popular-badge">
            最受欢迎
          </div>

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
            <li v-for="(feature, index) in plan.features" :key="index" class="feature-item">
              <v-icon size="20" color="success">mdi-check-circle</v-icon>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA Button -->
          <button 
            :class="['cta-button', `cta-button-${plan.buttonColor}`]"
          >
            {{ plan.buttonText }}
          </button>
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

.pricing-card {
  background: #ffffff;
  border: 2px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  &.popular {
    border-color: var(--primary-color);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
  }
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

// Plan Header
.plan-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.plan-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.price-symbol,
.price-custom {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.price-amount {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.price-custom {
  font-size: 2.5rem;
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
}

// Features List
.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  min-height: 300px;
}

.feature-item {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
  
  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
}

// CTA Button
.cta-button {
  width: 100%;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &.cta-button-primary {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    
    &:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
  }
  
  &.cta-button-outline {
    background: transparent;
    color: var(--text-primary);
    border-color: var(--border-color);
    
    &:hover {
      background: var(--secondary-color);
      border-color: var(--primary-color);
    }
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
    padding: 1.5rem;
  }
  
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>

