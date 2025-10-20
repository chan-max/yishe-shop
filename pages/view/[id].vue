<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/pages/view/[id].vue
 * @Description: 商品详情查看页面
-->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '@/utils/api'

// 获取运行时配置
const runtimeConfig = useRuntimeConfig()

// 获取路由参数并标准化为字符串（避免为数组或无效值导致请求异常）
const route = useRoute()
const rawId = route.params.id
const id = Array.isArray(rawId) ? String(rawId[0] ?? '') : String(rawId ?? '')

// 响应式数据
const product = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// 图片模态框相关
const showImageModal = ref(false)
const currentImage = ref('')
const currentImageIndex = ref(0)

// 打开图片模态框
const openImageModal = (imageUrl: string, index: number) => {
  currentImage.value = imageUrl
  currentImageIndex.value = index
  showImageModal.value = true
}

// 关闭图片模态框
const closeImageModal = () => {
  showImageModal.value = false
}

// 上一张图片
const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    currentImage.value = productImages.value[currentImageIndex.value]
  }
}

// 下一张图片
const nextImage = () => {
  if (currentImageIndex.value < productImages.value.length - 1) {
    currentImageIndex.value++
    currentImage.value = productImages.value[currentImageIndex.value]
  }
}

// 计算属性 - 获取所有图片
const productImages = computed(() => {
  if (!product.value) return []
  
  const images: string[] = []
  for (let i = 1; i <= 10; i++) {
    const imageUrl = product.value[`image${i}`]
    if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
      images.push(imageUrl)
    }
  }
  return images
})

// 计算属性 - 格式化时间
const formatTime = (timeStr: string) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取商品详情
const fetchProduct = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('正在请求商品ID:', id)
    console.log('API基础URL:', runtimeConfig.public.apiBase)
    
    const response = await api.product.getById(id)
    
    console.log('API响应:', response)
    
    if (response.code === 0 || response.status === true || response.code === 200) {
      product.value = response.data
    } else {
      error.value = response.message || '获取商品信息失败'
    }
  } catch (err: any) {
    console.error('API请求错误:', err)
    error.value = err.message || '网络请求失败'
  } finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  console.log('页面加载，获取到的ID:', id)
  console.log('ID类型:', typeof id)
  console.log('ID是否为空:', !id)
  
  if (id && id !== 'undefined' && id !== 'null') {
    console.log('开始获取商品详情，ID:', id)
    fetchProduct()
  } else {
    console.error('商品ID无效:', id)
    error.value = `商品ID无效: ${id}`
    loading.value = false
  }
})

// 设置页面标题和meta信息
useHead({
  title: computed(() => product.value ? `${product.value.name || '商品详情'} - 衣设服装设计` : '商品详情 - 衣设服装设计'),
  meta: [
    {
      name: 'description',
      content: computed(() => product.value?.description || '查看商品详细信息')
    },
    {
      name: 'keywords',
      content: computed(() => product.value?.keywords || '商品详情,服装设计')
    }
  ]
})
</script>

<template>
  <div class="product-view-page">
    <!-- 路径ID常显区域 -->
    <div class="route-id">路径ID: {{ id }}</div>
    <!-- 调试信息 -->
    <div class="debug-info" style="background: #f0f0f0; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-family: monospace;">
      <h4>调试信息:</h4>
      <p>当前ID: {{ id }}</p>
      <p>ID类型: {{ typeof id }}</p>
      <p>API基础URL: {{ runtimeConfig.public.apiBase }}</p>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">正在加载商品信息...</p>
        <p class="loading-text">商品ID: {{ id }}</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-container">
      <div class="error-content">
        <div class="error-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="35" stroke="#e5e7eb" stroke-width="2" fill="#f9fafb"/>
            <path d="M30 30L50 50M50 30L30 50" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h2 class="error-title">加载失败</h2>
        <p class="error-message">{{ error }}</p>
        <div class="error-debug" style="background: #f9f9f9; padding: 1rem; margin: 1rem 0; border-radius: 4px; font-family: monospace; font-size: 0.875rem;">
          <p><strong>调试信息:</strong></p>
          <p>商品ID: {{ id }}</p>
          <p>API URL: {{ runtimeConfig.public.apiBase }}/product-image-2d/{{ id }}</p>
          <p>错误详情: {{ error }}</p>
        </div>
        <button @click="fetchProduct" class="retry-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
          重新加载
        </button>
      </div>
    </div>

    <!-- 商品详情内容 -->
    <div v-else-if="product" class="product-content">
      <!-- 商品头部信息 -->
      <div class="product-header">
        <div class="product-info">
          <h1 class="product-title">{{ product.name || '未命名商品' }}</h1>
          <div class="product-meta">
            <span class="product-code" v-if="product.code">商品代码: {{ product.code }}</span>
            <span class="product-status" :class="`status-${product.publishStatus}`">
              {{ 
                product.publishStatus === 'draft' ? '草稿' :
                product.publishStatus === 'pending_social_media' ? '待发布' :
                product.publishStatus === 'published_social_media' ? '已发布' :
                product.publishStatus === 'archived' ? '已归档' : '未知状态'
              }}
            </span>
            <span class="product-visibility" :class="{ 'public': product.isPublic, 'private': !product.isPublic }">
              {{ product.isPublic ? '公开' : '私有' }}
            </span>
          </div>
        </div>
        <div class="product-actions">
          <NuxtLink to="/search" class="action-btn secondary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            返回搜索
          </NuxtLink>
        </div>
      </div>

      <!-- 商品描述 -->
      <div v-if="product.description" class="product-description">
        <h3 class="section-title">商品描述</h3>
        <p class="description-text">{{ product.description }}</p>
      </div>

      <!-- 商品关键词 -->
      <div v-if="product.keywords" class="product-keywords">
        <h3 class="section-title">关键词</h3>
        <div class="keywords-list">
           <span 
             v-for="keyword in product.keywords.split(',').filter((k: string) => k.trim())" 
             :key="keyword.trim()"
             class="keyword-tag"
           >
            {{ keyword.trim() }}
          </span>
        </div>
      </div>

      <!-- 商品图片展示 -->
      <div v-if="productImages.length > 0" class="product-images">
        <h3 class="section-title">商品图片</h3>
        <div class="images-grid">
           <div 
             v-for="(imageUrl, index) in productImages" 
             :key="index"
             class="image-item"
             @click="openImageModal(imageUrl, index)"
           >
            <img 
              :src="imageUrl" 
              :alt="`${product.name} - 图片 ${index + 1}`"
              class="product-image"
              loading="lazy"
            />
            <div class="image-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 12c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-3-10c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="product-details">
        <h3 class="section-title">详细信息</h3>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">商品ID</span>
            <span class="detail-value">{{ product.id }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">素材ID</span>
            <span class="detail-value">{{ product.materialId }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">模板组ID</span>
            <span class="detail-value">{{ product.templateGroup2DId }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">创建时间</span>
            <span class="detail-value">{{ formatTime(product.createTime) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">更新时间</span>
            <span class="detail-value">{{ formatTime(product.updateTime) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">图片数量</span>
            <span class="detail-value">{{ productImages.length }} 张</span>
          </div>
        </div>
      </div>
    </div>

     <!-- 图片预览模态框 -->
     <div v-if="showImageModal" class="image-modal">
       <div class="modal-overlay" @click="closeImageModal"></div>
       <div class="modal-content">
         <button class="close-btn" @click="closeImageModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <img :src="currentImage" :alt="`${product?.name} - 预览`" class="modal-image" />
        <div class="modal-nav">
          <button @click="prevImage" class="nav-btn prev" :disabled="currentImageIndex === 0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          <span class="image-counter">{{ currentImageIndex + 1 }} / {{ productImages.length }}</span>
          <button @click="nextImage" class="nav-btn next" :disabled="currentImageIndex === productImages.length - 1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-view-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  padding: 2rem;
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 路径ID常显样式 */
.route-id {
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background: #eef2ff;
  color: #1e3a8a;
  border: 1px solid #c7d2fe;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
}

/* 加载状态 */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: #6b7280;
  font-size: 1rem;
}

/* 错误状态 */
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.error-content {
  text-align: center;
  max-width: 400px;
}

.error-icon {
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

/* 商品内容 */
.product-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* 商品头部 */
.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.product-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.product-code {
  color: #6b7280;
  font-size: 0.875rem;
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
}

.product-status {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
}

.status-draft { background: #fef3c7; color: #92400e; }
.status-pending_social_media { background: #dbeafe; color: #1e40af; }
.status-published_social_media { background: #d1fae5; color: #065f46; }
.status-archived { background: #f3f4f6; color: #374151; }

.product-visibility {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
}

.public { background: #d1fae5; color: #065f46; }
.private { background: #fef2f2; color: #991b1b; }

.product-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.action-btn.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.action-btn.secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

/* 章节标题 */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

/* 商品描述 */
.product-description {
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.description-text {
  color: #374151;
  line-height: 1.7;
  font-size: 1rem;
}

/* 关键词 */
.product-keywords {
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword-tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* 商品图片 */
.product-images {
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.image-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

/* 商品详情 */
.product-details {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
}

.detail-label {
  font-weight: 500;
  color: #374151;
}

.detail-value {
  color: #6b7280;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.875rem;
}

/* 图片模态框 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  display: block;
}

.modal-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f9fafb;
}

.nav-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #2563eb;
}

.nav-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.image-counter {
  font-weight: 500;
  color: #374151;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-view-page {
    padding: 1rem;
  }
  
  .product-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
  }
  
  .product-title {
    font-size: 1.5rem;
  }
  
  .product-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .product-description,
  .product-keywords,
  .product-images,
  .product-details {
    padding: 1.5rem;
  }
  
  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .product-header {
    padding: 1rem;
  }
  
  .product-title {
    font-size: 1.25rem;
  }
  
  .product-description,
  .product-keywords,
  .product-images,
  .product-details {
    padding: 1rem;
  }
  
  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>

