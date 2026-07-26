<template>
  <div class="gucci-page-wrapper">
    <!-- Header Navigation -->
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <div class="header-left">
          <NuxtLink to="/" class="back-link">
            ‹ 返回名片工坊首页
          </NuxtLink>
        </div>
        <div class="header-center">
          <NuxtLink to="/" class="gucci-brand-logo">
            名 片 设 计 工 坊 · B U S I N E S S  C A R D
          </NuxtLink>
        </div>
        <div class="header-right">
          <NuxtLink to="/search" class="header-icon-link">搜索名片</NuxtLink>
        </div>
      </div>
    </header>

    <main class="gucci-contact-container">
      <section class="contact-hero">
        <span class="sub-tag">ATELIER SERVICES · 定制服务</span>
        <h1 class="main-heading">预约 1对1 资深名片设计师</h1>
        <p class="heading-lead">
          提交您的品牌视觉规范或名片文字需求，资深名片大师将为您提供专业的特种纸张搭配、活字排字与 24K 烫金试样指导。
        </p>
      </section>

      <div class="contact-grid">
        <!-- VIP Appointment Form -->
        <div class="form-card">
          <h2 class="card-title">预约设计师沟通与打样</h2>
          <p class="form-sub font-serif">填写您的联系方式与名片需求，我们将于 24 小时内为您出具免费矢量排版方案。</p>

          <form @submit.prevent="submitForm" class="appointment-form">
            <div class="field-group">
              <label>您的姓名 (FULL NAME)</label>
              <input v-model="form.name" type="text" placeholder="例如：张总 / Alexander" required />
            </div>

            <div class="field-group">
              <label>公司名称 / 职务 (COMPANY & TITLE)</label>
              <input v-model="form.company" type="text" placeholder="例如：极客风尚科技 · 创始人兼 CEO" required />
            </div>

            <div class="field-group">
              <label>联系电话 / 电子邮箱 (CONTACT)</label>
              <input v-model="form.email" type="text" placeholder="手机号或邮箱，方便发送矢量试样稿" required />
            </div>

            <div class="field-group">
              <label>意向工艺与纸张 (PREFERRED CRAFT)</label>
              <select v-model="form.craft">
                <option value="letterpress">600g 棉纸活字凹版压印 (Letterpress)</option>
                <option value="gold-foil">24K 浮雕烫金/烫银工艺 (Gold Foil)</option>
                <option value="metal-steel">钛钢/金属拉丝极客名片 (Metal Steel)</option>
                <option value="custom">申请全套特种纸纸样盒 (Sample Kit)</option>
              </select>
            </div>

            <div class="field-group">
              <label>详细排版要求或品牌 Logo 说明</label>
              <textarea v-model="form.notes" rows="4" placeholder="请简述名片文字内容、期望的风格（如极简双色、黑金高定）或 Logo 矢量文件情况…"></textarea>
            </div>

            <button type="submit" class="submit-btn-black">
              提交预约打样需求
            </button>
          </form>
        </div>

        <!-- Atelier Information -->
        <div class="info-card">
          <div class="info-block">
            <h3 class="info-title">名片工坊工匠工坊地址</h3>
            <p>名片工坊高定艺术中心<br />上海 / 北京 / 深圳 专属打样中心</p>
            <p class="contact-line">
              <svg class="info-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>服务热线：400-888-CARD</span>
            </p>
            <p class="contact-line">
              <svg class="info-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>设计邮箱：concierge@businesscard.1s.design</span>
            </p>
          </div>

          <div class="info-block">
            <h3 class="info-title">工作与打样时间</h3>
            <p>周一至周五: 09:00 – 19:00</p>
            <p>周六至周日: 10:00 – 18:00 (设计师 1对1 专场预约)</p>
          </div>

          <div class="info-block">
            <h3 class="info-title">24小时矢量初稿承诺</h3>
            <p>所有提交的设计打样需求，名片工坊资深设计师均会在 24 小时内免费出具高清 PDF / SVG 矢量初稿供您审核确认。</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="gucci-mini-footer">
      <div class="footer-logo-small">名 片 设 计 工 坊 · B U S I N E S S  C A R D</div>
      <p>© 2026 名片设计工坊 Business Card Design Atelier. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: '预约高定服务 · 1对1设计师 | BUSINESS CARD',
  ogTitle: '预约高定服务 · BUSINESS CARD',
  description: '预约 1对1 名片设计师，探讨特种纸冲压与 24K 烫金工艺。',
  ogDescription: '预约 1对1 名片设计师服务。'
});

useHead({
  title: '预约高定服务 · 1对1设计师 | BUSINESS CARD',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const form = ref({
  name: '',
  company: '',
  email: '',
  craft: 'letterpress',
  notes: ''
});

const submitForm = () => {
  alert(`感谢您，${form.value.name}！您的名片打样与设计预约（${form.value.company}）已成功提交。资深设计师将在 24 小时内联系您并发送矢量初稿。`);
  form.value = { name: '', company: '', email: '', craft: 'letterpress', notes: '' };
};
</script>

<style scoped>
.gucci-page-wrapper {
  background: #ffffff;
  color: #000000;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Didot, "Times New Roman", serif;
}

input, select, textarea, button, .submit-btn-black {
  border-radius: 0 !important;
}

.gucci-header {
  border-bottom: 1px solid #e5e5e5;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.gucci-header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-link, .header-icon-link {
  color: #000000;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.gucci-brand-logo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #000000;
  text-decoration: none;
}

.gucci-contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.contact-hero {
  text-align: center;
  margin-bottom: 4rem;
}

.sub-tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #888888;
  display: block;
  margin-bottom: 0.5rem;
}

.main-heading {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0 0 1rem;
}

.heading-lead {
  max-width: 700px;
  margin: 0 auto;
  font-size: 0.95rem;
  color: #555555;
  line-height: 1.6;
}

.contact-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 3.5rem;
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.form-card {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  padding: 2.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0 0 0.35rem;
}

.form-sub {
  font-size: 0.85rem;
  color: #666666;
  margin-bottom: 2rem;
}

.appointment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-group label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #000000;
}

.field-group input, .field-group select, .field-group textarea {
  border: none;
  border-bottom: 1px solid #cccccc;
  padding: 0.65rem 0;
  font-size: 0.9rem;
  outline: none;
  font-family: inherit;
  background: none;
  border-radius: 0 !important;
}

.field-group input:focus, .field-group select:focus, .field-group textarea:focus {
  border-bottom-color: #000000;
}

.submit-btn-black {
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 1.1rem;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s ease;
  border-radius: 0 !important;
}

.submit-btn-black:hover {
  background: #222222;
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background: #fafafa;
  padding: 2.5rem;
  border: 1px solid #eeeeee;
}

.info-title {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin: 0 0 0.75rem;
}

.info-block p {
  font-size: 0.88rem;
  color: #555555;
  line-height: 1.6;
  margin: 0 0 0.35rem;
}

.contact-line {
  color: #000000 !important;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-svg {
  width: 16px;
  height: 16px;
  stroke: #000000;
}

.gucci-mini-footer {
  border-top: 1px solid #e5e5e5;
  padding: 2.5rem 1rem;
  text-align: center;
  font-size: 0.78rem;
  color: #888888;
}

.footer-logo-small {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #000000;
  margin-bottom: 0.5rem;
}
</style>
