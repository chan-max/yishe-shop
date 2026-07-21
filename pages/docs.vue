<template>
  <NuxtLayout name="page">
    <div class="docs-page">
      <!-- 页面 Hero 头部 -->
      <section class="docs-hero">
        <div class="docs-hero-inner">
          <div class="docs-hero-badge">
            <span class="pulse-dot" />
            <span>衣设 开放接口 v1.0.0</span>
          </div>
          <h1 class="docs-hero-title">开放 API 文档中心</h1>
          <p class="docs-hero-desc">
            针对个人独立站与第三方开发者提供标准化的 POD 商品、素材贴纸、自动化 PSD 套图制作与 AI Agent 智能化工具接口。
          </p>
          <div class="docs-hero-tags">
            <span class="tag-chip">HTTPS Only</span>
            <span class="tag-chip">AppKey / Secret 认证</span>
            <span class="tag-chip">JSON & SSE 流式支持</span>
            <span class="tag-chip">CORS 跨域解封</span>
          </div>
        </div>
      </section>

      <!-- 主体内容区域（左侧导航 + 右侧文档） -->
      <div class="docs-container">
        <!-- 左侧目录导航 -->
        <aside class="docs-sidebar">
          <nav class="docs-nav">
            <div class="docs-nav-group-title">基础指引</div>
            <a
              v-for="item in navSection1"
              :key="item.id"
              :href="`#${item.id}`"
              class="docs-nav-link"
              :class="{ active: activeSection === item.id }"
              @click="setActive(item.id)"
            >
              <AppIcon :name="item.icon" class="nav-icon" />
              <span>{{ item.title }}</span>
            </a>

            <div class="docs-nav-group-title">开放接口列表</div>
            <a
              v-for="item in navSection2"
              :key="item.id"
              :href="`#${item.id}`"
              class="docs-nav-link"
              :class="{ active: activeSection === item.id }"
              @click="setActive(item.id)"
            >
              <span class="method-badge" :class="item.method.toLowerCase()">{{ item.method }}</span>
              <span>{{ item.title }}</span>
            </a>
          </nav>
        </aside>

        <!-- 右侧文档正文 -->
        <main class="docs-content">
          <!-- 1. 概览与快速开始 -->
          <section id="overview" class="docs-card">
            <h2 class="card-title">
              <AppIcon name="info" class="card-title-icon" />
              <span>1. 概览与架构</span>
            </h2>
            <div class="card-body">
              <p>
                衣设独立站（<code>yishe-nuxt</code>）通过开放接口与后台管理服务（<code>yishe-admin / design-server</code>）实现无缝对接。你可以使用分配给独立站的 API Key 与 Secret 密钥直接进行数据通信、获取最新商品、提交 POD 图稿以及触发 AI 套图制作。
              </p>
              <div class="env-info-grid">
                <div class="env-info-card">
                  <span class="env-label">基础网关 Base URL</span>
                  <code class="env-code">https://design.1s.com/api</code>
                </div>
                <div class="env-info-card">
                  <span class="env-label">数据传输格式</span>
                  <code class="env-code">application/json (UTF-8)</code>
                </div>
              </div>
            </div>
          </section>

          <!-- 2. 身份验证与密钥 -->
          <section id="auth" class="docs-card">
            <h2 class="card-title">
              <AppIcon name="link" class="card-title-icon" />
              <span>2. 身份验证与密钥认证</span>
            </h2>
            <div class="card-body">
              <p>
                所有开放 API 均需在请求 Header 中携带 API 密钥信息。请在后台系统或系统配置中获取你的 <code>AppKey</code> 和 <code>AppSecret</code>。
              </p>

              <h3 class="sub-title">请求 Header 规范</h3>
              <div class="table-wrapper">
                <table class="doc-table">
                  <thead>
                    <tr>
                      <th>Header 名称</th>
                      <th>示例值</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>x-app-key</code></td>
                      <td><code>app_yishe_open_key_9981</code></td>
                      <td>分配给独立站/应用的唯一身份凭证</td>
                    </tr>
                    <tr>
                      <td><code>x-app-secret</code></td>
                      <td><code>sec_8f9a2b1c4e7...</code></td>
                      <td>私密密钥（严禁客户端公开露布）</td>
                    </tr>
                    <tr>
                      <td><code>Content-Type</code></td>
                      <td><code>application/json</code></td>
                      <td>请求体编码方式</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 代码生成助手小工具 -->
              <div class="code-tester-card">
                <div class="tester-header">
                  <span>💡 交互式 cURL 请求生成器</span>
                </div>
                <div class="tester-form">
                  <div class="input-group">
                    <label>AppKey:</label>
                    <input v-model="userKey" placeholder="输入你的 AppKey" />
                  </div>
                  <div class="input-group">
                    <label>AppSecret:</label>
                    <input v-model="userSecret" type="password" placeholder="输入你的 AppSecret" />
                  </div>
                </div>
                <div class="code-block">
                  <button class="copy-btn" @click="copyCode(curlAuthExample)">
                    {{ copiedCode === curlAuthExample ? '已复制 ✓' : '复制' }}
                  </button>
                  <pre><code>{{ curlAuthExample }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- 3. 商品与分类接口 -->
          <section id="products" class="docs-card">
            <h2 class="card-title">
              <AppIcon name="cube" class="card-title-icon" />
              <span>3. 独立站商品与分类接口</span>
            </h2>
            <div class="card-body">
              <!-- GET /api/public-user/products -->
              <div class="api-endpoint">
                <div class="endpoint-header">
                  <span class="method-badge get">GET</span>
                  <span class="endpoint-path">/api/public-user/products</span>
                  <span class="endpoint-desc">获取开放销售的 POD 商品列表</span>
                </div>

                <h4 class="sub-title">Query 参数</h4>
                <div class="table-wrapper">
                  <table class="doc-table">
                    <thead>
                      <tr>
                        <th>参数名</th>
                        <th>类型</th>
                        <th>必填</th>
                        <th>说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>page</code></td>
                        <td>number</td>
                        <td>否</td>
                        <td>页码（默认 1）</td>
                      </tr>
                      <tr>
                        <td><code>pageSize</code></td>
                        <td>number</td>
                        <td>否</td>
                        <td>每页数量（默认 20，最大 50）</td>
                      </tr>
                      <tr>
                        <td><code>searchText</code></td>
                        <td>string</td>
                        <td>否</td>
                        <td>商品标题/关键词检索</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 class="sub-title">响应示例 (200 OK)</h4>
                <div class="code-block">
                  <button class="copy-btn" @click="copyCode(productsResponseJson)">
                    {{ copiedCode === productsResponseJson ? '已复制 ✓' : '复制' }}
                  </button>
                  <pre><code>{{ productsResponseJson }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. 素材与贴纸接口 -->
          <section id="stickers" class="docs-card">
            <h2 class="card-title">
              <AppIcon name="palette" class="card-title-icon" />
              <span>4. 素材与贴纸接口</span>
            </h2>
            <div class="card-body">
              <div class="api-endpoint">
                <div class="endpoint-header">
                  <span class="method-badge get">GET</span>
                  <span class="endpoint-path">/api/sticker</span>
                  <span class="endpoint-desc">检索公开/素材库图稿贴纸</span>
                </div>
                <h4 class="sub-title">请求示例 (cURL)</h4>
                <div class="code-block">
                  <button class="copy-btn" @click="copyCode(stickerCurlExample)">
                    {{ copiedCode === stickerCurlExample ? '已复制 ✓' : '复制' }}
                  </button>
                  <pre><code>{{ stickerCurlExample }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- 5. PSD 套图与批量制作任务接口 -->
          <section id="psd-sets" class="docs-card">
            <h2 class="card-title">
              <AppIcon name="sparkle" class="card-title-icon" />
              <span>5. 批量套图制作与完成后动作</span>
            </h2>
            <div class="card-body">
              <div class="api-endpoint">
                <div class="endpoint-header">
                  <span class="method-badge post">POST</span>
                  <span class="endpoint-path">/api/sticker-psd-set/batch-by-product-generation-template</span>
                  <span class="endpoint-desc">按独立站配置批量创建套图制作任务（制作完成后自动生成独立站商品）</span>
                </div>

                <h4 class="sub-title">Body 参数 (JSON)</h4>
                <div class="table-wrapper">
                  <table class="doc-table">
                    <thead>
                      <tr>
                        <th>参数名</th>
                        <th>类型</th>
                        <th>必填</th>
                        <th>说明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>stickerIds</code></td>
                        <td>Array&lt;string&gt;</td>
                        <td>是</td>
                        <td>素材贴纸 ID 列表（如 <code>["stk_1001", "stk_1002"]</code>）</td>
                      </tr>
                      <tr>
                        <td><code>productGenerationTemplateIds</code></td>
                        <td>Array&lt;string&gt;</td>
                        <td>是</td>
                        <td>独立站商品配置 ID 或名称（如 <code>["圆形 狗 宠物地垫"]</code>）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 class="sub-title">请求 Body 示例</h4>
                <div class="code-block">
                  <button class="copy-btn" @click="copyCode(batchPsdJsonExample)">
                    {{ copiedCode === batchPsdJsonExample ? '已复制 ✓' : '复制' }}
                  </button>
                  <pre><code>{{ batchPsdJsonExample }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- 6. AI Agent 智能助手接口 -->
          <section id="ai-agent" class="docs-card">
            <h2 class="card-title">
              <AppIcon name="sparkle" class="card-title-icon" />
              <span>6. AI Agent 智能助手 SSE 流式接口</span>
            </h2>
            <div class="card-body">
              <div class="api-endpoint">
                <div class="endpoint-header">
                  <span class="method-badge post">POST</span>
                  <span class="endpoint-path">/api/ai-assistant/runs/stream</span>
                  <span class="endpoint-desc">流式传输 (SSE) 智能助手对话与自动化工具调度</span>
                </div>

                <h4 class="sub-title">JavaScript EventSource / Fetch SSE 客户端代码</h4>
                <div class="code-block">
                  <button class="copy-btn" @click="copyCode(sseJsExample)">
                    {{ copiedCode === sseJsExample ? '已复制 ✓' : '复制' }}
                  </button>
                  <pre><code>{{ sseJsExample }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- 7. 错误代码说明 -->
          <section id="errors" class="docs-card">
            <h2 class="card-title">
              <AppIcon name="warning" class="card-title-icon" />
              <span>7. 错误代码与状态码</span>
            </h2>
            <div class="card-body">
              <div class="table-wrapper">
                <table class="doc-table">
                  <thead>
                    <tr>
                      <th>HTTP 状态码</th>
                      <th>错误 Code</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>200 OK</code></td>
                      <td><code>SUCCESS</code></td>
                      <td>请求执行成功</td>
                    </tr>
                    <tr>
                      <td><code>400 Bad Request</code></td>
                      <td><code>INVALID_PARAMS</code></td>
                      <td>请求参数错误或不存在对应的素材/配置</td>
                    </tr>
                    <tr>
                      <td><code>401 Unauthorized</code></td>
                      <td><code>AUTH_FAILED</code></td>
                      <td>密钥凭证无效或丢失 <code>x-app-key</code></td>
                    </tr>
                    <tr>
                      <td><code>403 Forbidden</code></td>
                      <td><code>PERMISSION_DENIED</code></td>
                      <td>无权访问指定的数据资源</td>
                    </tr>
                    <tr>
                      <td><code>500 Internal Error</code></td>
                      <td><code>SERVER_ERROR</code></td>
                      <td>服务器内部错误</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '#imports'

useHead({
  title: '开放接口文档 - 衣设 POD 平台开放 API',
  meta: [
    { name: 'description', content: '衣设独立站开放 API 文档中心，整理了标准 POD 商品、素材贴纸、套图制作与 AI Agent 的开放接口及密钥对接指南。' }
  ]
})

const activeSection = ref('overview')
const userKey = ref('app_yishe_demo_key')
const userSecret = ref('sec_demo_secret_8899')
const copiedCode = ref('')

const navSection1 = [
  { id: 'overview', title: '概览与架构', icon: 'info' },
  { id: 'auth', title: '身份验证与密钥', icon: 'link' }
]

const navSection2 = [
  { id: 'products', title: '商品与分类', method: 'GET' },
  { id: 'stickers', title: '素材与贴纸', method: 'GET' },
  { id: 'psd-sets', title: '批量套图制作', method: 'POST' },
  { id: 'ai-agent', title: 'AI Agent 流式对话', method: 'POST' },
  { id: 'errors', title: '错误代码说明', method: 'INFO' }
]

function setActive(id: string) {
  activeSection.value = id
}

function copyCode(text: string) {
  navigator.clipboard.writeText(text)
  copiedCode.value = text
  setTimeout(() => {
    copiedCode.value = ''
  }, 2000)
}

const curlAuthExample = computed(() => `curl -X GET "https://design.1s.com/api/public-user/products" \\
  -H "x-app-key: ${userKey.value || 'YOUR_APP_KEY'}" \\
  -H "x-app-secret: ${userSecret.value || 'YOUR_APP_SECRET'}" \\
  -H "Content-Type: application/json"`)

const productsResponseJson = `{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "prod_1001",
        "title": "电动螺丝刀十字螺丝批头 耐用型",
        "price": 9.99,
        "stock": 999,
        "productType": "地垫",
        "psdSetId": "psd_set_8812",
        "coverUrl": "https://img.yishe.com/preview/prod_1001.png"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 20
  }
}`

const stickerCurlExample = `curl -X GET "https://design.1s.com/api/sticker?pageSize=10" \\
  -H "x-app-key: YOUR_APP_KEY" \\
  -H "x-app-secret: YOUR_APP_SECRET"`

const batchPsdJsonExample = `{
  "stickerIds": ["stk_1001", "stk_1002"],
  "productGenerationTemplateIds": ["圆形 狗 宠物地垫"]
}`

const sseJsExample = `// 客户端通过 Fetch SSE 连接 AI 智能助手接口
const response = await fetch("https://design.1s.com/api/ai-assistant/runs/stream", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-app-key": "YOUR_APP_KEY",
    "x-app-secret": "YOUR_APP_SECRET"
  },
  body: JSON.stringify({
    message: "帮我用最新的2张素材，按独立站配置批量建套图",
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log("收到 SSE 数据包:", decoder.decode(value));
}`

onMounted(() => {
  if (window.location.hash) {
    const id = window.location.hash.replace('#', '')
    if (id) activeSection.value = id
  }
})
</script>

<style scoped>
.docs-page {
  min-height: 100vh;
  background: var(--bg-surface, #f8fafc);
  color: var(--text-main, #1e293b);
  padding-bottom: 60px;
}

.docs-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  padding: 56px 24px 48px;
  text-align: center;
}

.docs-hero-inner {
  max-width: 800px;
  margin: 0 auto;
}

.docs-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  font-size: 12px;
  color: #38bdf8;
  margin-bottom: 16px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
}

.docs-hero-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.docs-hero-desc {
  font-size: 15px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 24px;
}

.docs-hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.tag-chip {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}

.docs-container {
  display: flex;
  max-width: 1280px;
  margin: -24px auto 0;
  padding: 0 24px;
  gap: 24px;
}

.docs-sidebar {
  width: 260px;
  flex-shrink: 0;
}

.docs-nav {
  position: sticky;
  top: 90px;
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.docs-nav-group-title {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 16px 0 8px 8px;
}

.docs-nav-group-title:first-child {
  margin-top: 0;
}

.docs-nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #475569;
  text-decoration: none;
  transition: all 0.15s ease;
}

.docs-nav-link:hover,
.docs-nav-link.active {
  background: #f1f5f9;
  color: #0284c7;
  font-weight: 600;
}

.nav-icon {
  width: 16px;
  height: 16px;
  color: #64748b;
}

.docs-nav-link.active .nav-icon {
  color: #0284c7;
}

.docs-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.docs-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  scroll-margin-top: 90px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  padding-bottom: 14px;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 18px;
}

.card-title-icon {
  width: 22px;
  height: 22px;
  color: #0284c7;
}

.sub-title {
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  margin: 18px 0 10px;
}

.card-body {
  font-size: 14px;
  line-height: 1.65;
  color: #334155;
}

.env-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.env-info-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.env-label {
  font-size: 12px;
  color: #64748b;
}

.env-code {
  font-family: monospace;
  font-size: 13px;
  color: #0284c7;
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto;
  margin: 12px 0;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.doc-table th,
.doc-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #f1f5f9;
}

.doc-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #475569;
}

.code-tester-card {
  margin-top: 16px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background: #0f172a;
  color: #f8fafc;
  overflow: hidden;
}

.tester-header {
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
  font-weight: 600;
}

.tester-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.03);
}

.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.input-group label {
  color: #94a3b8;
}

.input-group input {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 4px 8px;
  color: #ffffff;
  font-size: 12px;
  font-family: monospace;
}

.code-block {
  position: relative;
  background: #090d16;
  padding: 14px 16px;
  border-radius: 8px;
  margin-top: 8px;
  overflow-x: auto;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

pre {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #38bdf8;
}

.api-endpoint {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.endpoint-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.method-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.method-badge.get { background: #dcfce7; color: #166534; }
.method-badge.post { background: #e0f2fe; color: #075985; }
.method-badge.info { background: #f1f5f9; color: #475569; }

.endpoint-path {
  font-family: monospace;
  font-weight: 700;
  font-size: 14px;
  color: #0f172a;
}

.endpoint-desc {
  font-size: 13px;
  color: #64748b;
  margin-left: 6px;
}

@media (max-width: 900px) {
  .docs-container {
    flex-direction: column;
  }
  .docs-sidebar {
    width: 100%;
  }
  .docs-nav {
    position: static;
  }
}
</style>
