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
          <NuxtLink to="/search" class="header-icon-link">搜索设计灵感</NuxtLink>
        </div>
      </div>
    </header>

    <main class="gucci-contact-container">
      <section class="contact-hero">
        <span class="sub-tag">FREE DESIGN FOR INDIVIDUALS & STARTUPS</span>
        <h1 class="main-heading">个人与小微企业 0 元免费名片设计申请</h1>
        <p class="heading-lead">
          无隐形消费、无门槛限制。资深名片设计师免费为您调整文字排版、Logo 矢量适配与 24K 烫金工艺打样建议。
        </p>
      </section>

      <div class="contact-grid">
        <!-- VIP Free Design Form -->
        <div class="form-card">
          <h2 class="card-title">0 元免费名片设计申请表</h2>
          <p class="form-sub font-serif">填写真实联系方式与文字需求，资深设计师将于 24 小时内为您出具免费矢量设计方案。</p>

          <form @submit.prevent="submitForm" class="appointment-form">
            <div class="field-group">
              <label>您的姓名 / 称呼 (FULL NAME)</label>
              <input v-model="form.name" type="text" placeholder="例如：张总 / Alexander / 个人创作者" required />
            </div>

            <div class="field-group">
              <label>团队 / 公司名称 / 品牌 (COMPANY & BRAND)</label>
              <input v-model="form.company" type="text" placeholder="例如：个人独立工作室 / 极客风尚科技" required />
            </div>

            <div class="field-group">
              <label>联系电话 / 电子邮箱 (CONTACT FOR PROOF)</label>
              <input v-model="form.email" type="text" placeholder="手机号或邮箱，用于接收 24小时免费矢量稿" required />
            </div>

            <div class="field-group">
              <label>期望的名片设计风格 (PREFERRED STYLE)</label>
              <select v-model="form.craft">
                <option value="letterpress">600g 棉纸活字凹版风格 (Letterpress)</option>
                <option value="gold-foil">24K 浮雕烫金/黑金高定风格 (Gold Foil)</option>
                <option value="metal-steel">钛钢拉丝极客精印风格 (Metal Steel)</option>
                <option value="custom">莫兰迪色系 / 触感特种纸风格 (Specialty Paper)</option>
              </select>
            </div>

            <div class="field-group">
              <label>详细文字排版要求或 Logo 文件说明</label>
              <textarea v-model="form.notes" rows="4" placeholder="请填写真实的名片文字（姓名、职务、电话、地址、网址）或对排版风格的具体想法…"></textarea>
            </div>

            <button type="submit" class="submit-btn-black" :disabled="requestLoading">
              {{ requestLoading ? '正在提交申请…' : '立即提交 0 元免费设计申请' }}
            </button>
            <p v-if="submitSuccess" class="submit-success" role="status">{{ submitSuccess }}</p>
            <p v-if="submitError" class="submit-error" role="alert">{{ submitError }}</p>
          </form>
        </div>

        <!-- Atelier Information -->
        <div class="info-card">
          <div class="info-block">
            <h3 class="info-title">免费设计承诺与保障</h3>
            <p>1. <strong>0 元免费出稿</strong>：为个人创作者与初创团队免费提供 1对1 矢量排版稿。</p>
            <p>2. <strong>24 小时极速交付</strong>：提交需求后 24 小时内免费交付 PDF / SVG 高清试样。</p>
            <p>3. <strong>全网风格设计同款</strong>：支持发送全网任意喜欢的名片参考图，免费为您设计同款。</p>
          </div>

          <div class="info-block">
            <h3 class="info-title">设计师热线与服务邮箱</h3>
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
              <span>设计邮箱：freedesign@businesscard.1s.design</span>
            </p>
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
import { useDesignRequest } from '~/composables/use-design-request';

definePageMeta({
  layout: 'default'
});

useSeoMeta({
  title: '个人与小微企业 0 元免费名片设计申请 | 名片设计工坊',
  ogTitle: '0 元免费名片设计申请 | BUSINESS CARD',
  description: '名片设计工坊专为个人与小微企业提供 0 元免费名片设计申请，24 小时免费交付矢量排版与同款设计稿。',
  ogDescription: '专为个人与小微企业提供 0 元免费名片设计申请。'
});

useHead({
  title: '个人与小微企业 0 元免费名片设计申请 | 名片设计工坊',
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
const { submitDesignRequest, loading: requestLoading } = useDesignRequest();
const submitSuccess = ref('');
const submitError = ref('');

const submitForm = async () => {
  submitSuccess.value = '';
  submitError.value = '';
  const contact = form.value.email.trim();

  try {
    const response = await submitDesignRequest({
      name: `${form.value.name.trim()} / ${form.value.company.trim()}`,
      description: `期望风格：${form.value.craft}\n${form.value.notes.trim()}`,
      ...(contact.includes('@') ? { email: contact } : { phoneNumber: contact })
    });

    if (response.code === 0 || response.code === 200 || response.status === true) {
      submitSuccess.value = '申请已提交，设计师会尽快与您联系。';
      form.value = { name: '', company: '', email: '', craft: 'letterpress', notes: '' };
    } else {
      submitError.value = response.message || '提交失败，请稍后重试。';
    }
  } catch (error: any) {
    submitError.value = error?.message || '提交失败，请稍后重试。';
  }
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
  max-width: 1440px;
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
  letter-spacing: 0.12em;
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

.submit-btn-black:disabled {
  cursor: wait;
  opacity: 0.55;
}

.submit-success,
.submit-error {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.5;
}

.submit-success { color: #286342; }
.submit-error { color: #9b1c1c; }

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
  margin: 0 0 0.5rem;
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

@media (max-width: 640px) {
  .gucci-header-inner { padding: 0.85rem 1rem; gap: 0.6rem; }
  .header-center { min-width: 0; flex: 1; text-align: center; }
  .gucci-brand-logo { display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.82rem; letter-spacing: 0.06em; }
  .back-link, .header-icon-link { font-size: 0.7rem; white-space: nowrap; }
  .gucci-contact-container { padding: 2.5rem 1rem; }
  .contact-hero { margin-bottom: 2.5rem; }
  .main-heading { font-size: 1.5rem; line-height: 1.45; letter-spacing: 0.02em; }
  .heading-lead { font-size: 0.82rem; line-height: 1.7; }
  .contact-grid { gap: 1.5rem; }
  .form-card, .info-card { padding: 1.5rem 1.1rem; }
  .card-title { font-size: 1rem; line-height: 1.5; }
  .form-sub { font-size: 0.78rem; line-height: 1.65; }
  .field-group input, .field-group select, .field-group textarea { font-size: 0.86rem; }
  .submit-btn-black { width: 100%; font-size: 0.78rem; letter-spacing: 0.06em; }
  .gucci-mini-footer { padding: 2rem 1rem; }
  .footer-logo-small { font-size: 0.82rem; letter-spacing: 0.08em; }
}
</style>
