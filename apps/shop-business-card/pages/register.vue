<template>
  <div class="gucci-auth-wrapper">
    <header class="gucci-header">
      <div class="gucci-header-inner">
        <NuxtLink to="/" class="back-link underline-slide">
          ‹ 返回名片工坊首页
        </NuxtLink>
        <NuxtLink to="/" class="gucci-brand-logo">
          名 片 设 计 工 坊 · B U S I N E S S  C A R D
        </NuxtLink>
        <NuxtLink to="/login" class="header-auth-link underline-slide">
          直接登录
        </NuxtLink>
      </div>
    </header>

    <main class="auth-main-container">
      <div class="auth-box">
        <div class="auth-header">
          <span class="auth-badge">FREE REGISTER · 免费注册账号</span>
          <h1 class="auth-title">注册名片设计工坊</h1>
          <p class="auth-subtitle">专为个人与小微企业提供 0 元免费名片设计服务，注册即可保存专属设计画板。</p>
        </div>

        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="field-group">
            <label>注册账号 (USERNAME)</label>
            <input
              v-model="form.username"
              type="text"
              placeholder="请输入您的账号名称"
              required
              class="sharp-input"
            />
          </div>

          <div class="field-group">
            <label>设置密码 (PASSWORD)</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="请设置 6 位以上登录密码"
              required
              class="sharp-input"
            />
          </div>

          <div class="field-group">
            <label>确认密码 (CONFIRM PASSWORD)</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入您的登录密码"
              required
              class="sharp-input"
            />
          </div>

          <div v-if="errorMessage" class="error-box">
            {{ errorMessage }}
          </div>

          <button type="submit" :disabled="loading" class="auth-submit-btn ripple-btn">
            {{ loading ? '正在提交注册…' : '立即注册 (CREATE ACCOUNT)' }}
          </button>

          <div class="auth-footer-links">
            <span>已有名片工坊账号？</span>
            <NuxtLink to="/login" class="link-bold">立即登录 ›</NuxtLink>
          </div>
        </form>
      </div>
    </main>

    <footer class="gucci-mini-footer">
      <div class="footer-logo-small">名 片 设 计 工 坊 · B U S I N E S S  C A R D</div>
      <p>© 2026 名片设计工坊 Business Card Design Atelier. 保留所有权利。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from '~/utils/api';

definePageMeta({
  layout: false
});

useSeoMeta({
  title: '注册账号 - 名片设计工坊 | BUSINESS CARD',
  ogTitle: '注册账号 - 名片设计工坊',
  description: '免费注册名片设计工坊账号，享受个人与小微企业 0 元免费名片设计服务。'
});

useHead({
  title: '注册账号 - 名片设计工坊 | BUSINESS CARD',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const router = useRouter();
const loading = ref(false);
const errorMessage = ref('');

const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
});

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = '两次输入的密码不一致，请重试。';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const res = await api.publicUser.register({
      account: form.value.username,
      password: form.value.password,
      name: form.value.username
    });

    if (res.code === 0 || res.code === 200) {
      alert('注册成功！正在跳转至登录页面…');
      router.push('/login');
    } else {
      errorMessage.value = res.message || '注册失败，该账号可能已被占用。';
    }
  } catch (e: any) {
    errorMessage.value = e?.message || '注册失败，该账号可能已被占用。';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.gucci-auth-wrapper {
  background: #ffffff;
  color: #000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", Didot, "Times New Roman", serif;
}

input, select, textarea, button, .auth-submit-btn {
  border-radius: 0 !important;
}

.ripple-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.ripple-btn:active {
  transform: scale(0.96) !important;
}

.sharp-input {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.sharp-input:focus {
  border-bottom-color: #d4a337 !important;
  box-shadow: 0 2px 8px rgba(212, 163, 55, 0.2);
}

.underline-slide {
  position: relative;
  text-decoration: none !important;
}

.underline-slide::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #000000;
  transition: width 0.3s ease;
}

.underline-slide:hover::after {
  width: 100%;
}

.gucci-header {
  border-bottom: 1px solid #e5e5e5;
  background: #ffffff;
}

.gucci-header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-link, .header-auth-link {
  color: #000000;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
}

.gucci-brand-logo {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #000000;
  text-decoration: none;
}

.auth-main-container {
  max-width: 520px;
  width: 100%;
  margin: 4rem auto;
  padding: 0 1.5rem;
}

.auth-box {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  padding: 3rem 2.5rem;
}

.auth-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.auth-badge {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #d4a337;
  display: block;
  margin-bottom: 0.5rem;
}

.auth-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}

.auth-subtitle {
  font-size: 0.85rem;
  color: #666666;
  line-height: 1.5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
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

.field-group input {
  border: none;
  border-bottom: 1px solid #cccccc;
  padding: 0.75rem 0;
  font-size: 0.95rem;
  outline: none;
  background: none;
}

.error-box {
  background: #fdf2f2;
  border: 1px solid #f8b4b4;
  color: #9b1c1c;
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
}

.auth-submit-btn {
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 1.1rem;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  margin-top: 0.5rem;
}

.auth-submit-btn:hover {
  background: #222222;
}

.auth-footer-links {
  text-align: center;
  font-size: 0.82rem;
  color: #666666;
  display: flex;
  justify-content: center;
  gap: 0.35rem;
}

.link-bold {
  color: #000000;
  font-weight: 800;
  text-decoration: underline;
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
