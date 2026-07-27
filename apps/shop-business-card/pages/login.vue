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
        <NuxtLink to="/register" class="header-auth-link underline-slide">
          注册新账号
        </NuxtLink>
      </div>
    </header>

    <main class="auth-main-container">
      <div class="auth-box">
        <div class="auth-header">
          <span class="auth-badge">ATELIER LOGIN · 账号登录</span>
          <h1 class="auth-title">登录名片设计工坊</h1>
          <p class="auth-subtitle">登录后管理您的 0 元免费设计方案、同款灵感画板与矢量初稿。</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="field-group">
            <label>账号 / 用户名 (USERNAME / EMAIL)</label>
            <input
              v-model="form.username"
              type="text"
              placeholder="请输入您的账号或电子邮箱"
              required
              class="sharp-input"
            />
          </div>

          <div class="field-group">
            <label>密码 (PASSWORD)</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="请输入您的登录密码"
              required
              class="sharp-input"
            />
          </div>

          <div v-if="errorMessage" class="error-box">
            {{ errorMessage }}
          </div>

          <button type="submit" :disabled="loading" class="auth-submit-btn ripple-btn">
            {{ loading ? '正在验证登录…' : '立即登录 (LOGIN)' }}
          </button>

          <div class="auth-footer-links">
            <span>还没有工坊账号？</span>
            <NuxtLink to="/register" class="link-bold">免费注册新账号 ›</NuxtLink>
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
import { usePublicUserStore } from '~/stores/public-user';
import { useToast } from '~/composables/use-toast';

definePageMeta({
  layout: false
});

useSeoMeta({
  title: '登录 - 名片设计工坊 | BUSINESS CARD',
  ogTitle: '登录 - 名片设计工坊',
  description: '登录名片设计工坊，管理您的 0 元免费设计方案与灵感画板。'
});

useHead({
  title: '登录 - 名片设计工坊 | BUSINESS CARD',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📇</text></svg>' }
  ]
});

const router = useRouter();
const publicUserStore = usePublicUserStore();
const toast = useToast();
const loading = ref(false);
const errorMessage = ref('');

const form = ref({
  username: '',
  password: ''
});

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await api.publicUser.login({
      username: form.value.username,
      password: form.value.password
    });

    if (response.code === 0 || response.code === 200 || response.status === true) {
      if (response.data && response.data.token) {
        publicUserStore.setToken(response.data.token);
        try {
          const infoRes = await api.publicUser.getUserInfo();
          if (infoRes.data) {
            publicUserStore.setUserInfo(infoRes.data);
          }
        } catch (e) {}
        toast.success('登录成功', '欢迎回到名片设计工坊。', 1600);
        setTimeout(() => router.push('/'), 1600);
      } else {
        errorMessage.value = '登录失败，请检查账号与密码。';
        toast.error('登录失败', errorMessage.value);
      }
    } else {
      errorMessage.value = response.message || '登录失败，请检查账号与密码。';
      toast.error('登录失败', errorMessage.value);
    }
  } catch (e: any) {
    errorMessage.value = e?.message || '登录失败，请检查账号与密码。';
    toast.error('登录失败', errorMessage.value);
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

@media (max-width: 640px) {
  .gucci-header-inner { padding: 0.85rem 1rem; gap: 0.6rem; }
  .gucci-brand-logo { min-width: 0; max-width: 50vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.82rem; letter-spacing: 0.06em; }
  .back-link, .header-auth-link { font-size: 0.7rem; white-space: nowrap; }
  .auth-main-container { margin: 2rem auto; padding: 0 1rem; }
  .auth-box { padding: 2rem 1.25rem; }
  .auth-title { font-size: 1.45rem; }
  .auth-subtitle { font-size: 0.8rem; line-height: 1.65; }
  .auth-form { gap: 1.35rem; }
  .auth-footer-links { flex-wrap: wrap; line-height: 1.5; }
  .gucci-mini-footer { padding: 2rem 1rem; }
  .footer-logo-small { font-size: 0.82rem; letter-spacing: 0.08em; }
}
</style>
