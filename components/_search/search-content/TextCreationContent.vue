<!--
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2025-01-27 11:00:00
 * @LastEditors: chan-max jackieontheway666@gmail.com
 * @LastEditTime: 2025-01-27 11:00:00
 * @FilePath: /yishe-nuxt/components/_search/search-content/TextCreationContent.vue
 * @Description: 文字创作内容组件 - 简洁卡片式展示
-->
<template>
  <div class="text-creation-content">
    <!-- Header Section -->
    <div class="text-creation-header">
      <div class="header-content">
        <!-- 移动端菜单按钮 -->
        <v-btn
          variant="text"
          @click="toggleMobileSidebar"
          class="mobile-menu-btn"
          icon
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        
        <!-- 标题区域 -->
        <div class="title-container">
          <p class="page-subtitle">AI 智能文字生成工具</p>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="text-creation-body">
      <!-- 加载状态 -->
      <LoadingSpinner 
        v-if="loading || !hasInitialized" 
        text="正在加载文字创作内容..."
      />
    
    <!-- 空状态 -->
    <EmptyState 
      v-else-if="textItems.length === 0"
      icon="mdi-text-box-outline"
    />
    
    <!-- 文字内容网格 -->
    <div v-else class="text-grid">
      <div 
        v-for="(item, index) in textItems" 
        :key="item.id"
        class="text-card"
        @click="onItemClick(item)"
      >
        <!-- 文字内容 -->
        <div class="text-content">
          <p class="text-preview">
            {{ item.content }}
          </p>
        </div>
        
        <!-- 操作按钮 -->
        <div class="text-actions">
          <v-btn
            variant="text"
            size="small"
            icon
            @click.stop="onCopyText(item)"
            class="action-btn"
            title="复制"
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
          <v-btn
            variant="text"
            size="small"
            icon
            @click.stop="onLikeText(item)"
            class="action-btn"
            :class="{ 'liked': item.isLiked }"
            title="点赞"
          >
            <v-icon>{{ item.isLiked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          </v-btn>
          <v-btn
            variant="text"
            size="small"
            icon
            @click.stop="onShareText(item)"
            class="action-btn"
            title="分享"
          >
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    
      <!-- 分页 -->
      <ContentPagination
        v-if="textItems.length > 0"
        v-model="currentPage"
        :total="total"
        :page-size="pageSize"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import EmptyState from '../components/EmptyState.vue'
import ContentPagination from '../components/ContentPagination.vue'

// Props for header functionality
const props = defineProps<{
  showMobileSidebar: boolean
}>()

// Emits for header functionality
const emit = defineEmits<{
  'toggle-mobile-sidebar': []
}>()

// Header methods
const toggleMobileSidebar = () => {
  emit('toggle-mobile-sidebar')
}

// 分页相关状态
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const loading = ref(false)
const hasInitialized = ref(false)

// 文字内容数据
const textItems = ref([])

// 获取文字创作内容列表
const fetchTextItems = async () => {
  loading.value = true
  try {
    const { $customFetch } = useNuxtApp()
    const requestBody = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      isPublish: true, // 传入true，代表是公开的内容
    }
    
    const response = await $customFetch("/sentences/page", {
      method: "POST",
      body: requestBody,
    })
    
    // 转换数据格式以适配文字内容显示
    textItems.value = response.list.map(item => ({
      id: item.id,
      title: item.content?.substring(0, 50) + (item.content?.length > 50 ? '...' : '') || '无标题',
      content: item.content || '',
      description: item.description || '',
      category: getCategoryFromContent(item.content),
      language: '中文', // 默认中文，可以根据实际数据调整
      length: getLengthCategory(item.content?.length || 0),
      tags: item.keywords ? item.keywords.split(',').map(k => k.trim()) : ['文字创作'],
      views: Math.floor(Math.random() * 1000) + 100, // 模拟浏览量
      likes: Math.floor(Math.random() * 200) + 20, // 模拟点赞数
      downloads: Math.floor(Math.random() * 100) + 10, // 模拟下载数
      isLiked: false,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString()
    }))
    
    total.value = response.total
    hasInitialized.value = true
  } catch (error) {
    console.error("获取文字创作内容失败:", error)
    hasInitialized.value = true
  } finally {
    loading.value = false
  }
}

// 根据内容判断分类
const getCategoryFromContent = (content: string) => {
  if (!content) return '其他'
  
  const categories = {
    '文案': ['广告', '营销', '推广', '宣传'],
    '标题': ['标题', '题目', '主题'],
    '描述': ['描述', '介绍', '说明'],
    '故事': ['故事', '小说', '情节', '叙述'],
    '诗歌': ['诗', '歌', '韵', '律'],
    '新闻': ['新闻', '报道', '资讯', '消息'],
    '评论': ['评论', '评价', '观点', '看法']
  }
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      return category
    }
  }
  
  return '其他'
}

// 根据长度判断分类
const getLengthCategory = (length: number) => {
  if (length <= 20) return '短句'
  if (length <= 100) return '中等'
  if (length <= 500) return '长文'
  return '超长'
}


// 复制文字
const onCopyText = async (item: any) => {
  try {
    await navigator.clipboard.writeText(item.content)
    // 这里可以添加复制成功的提示
    console.log('文字已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
  }
}

// 点赞文字
const onLikeText = (item: any) => {
  item.isLiked = !item.isLiked
  if (item.isLiked) {
    item.likes += 1
  } else {
    item.likes -= 1
  }
}

// 分享文字
const onShareText = (item: any) => {
  // 这里可以实现分享功能
  console.log('分享文字:', item.title)
}

// 点击文字项
const onItemClick = (item: any) => {
  console.log('点击文字项:', item)
  // 这里可以添加跳转到详情页的逻辑
}

// 监听分页变化
watch(currentPage, () => {
  fetchTextItems()
})

// 初始化加载
onMounted(() => {
  fetchTextItems()
})
</script>

<style lang="scss" scoped>
@use './content-areas.scss';

.text-creation-content {
  /* Header Styles */
  .text-creation-header {
    background: var(--bg-primary);
    position: fixed;
    top: 0;
    left: 240px;
    right: 0;
    z-index: 1001;
    box-shadow: 0 2px 8px var(--shadow-primary);
    backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .header-content {
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 56px;
    position: relative;
  }

  .mobile-menu-btn {
    display: none;
    color: var(--text-secondary) !important;
    position: absolute;
    left: 1rem;
    
    &:hover {
      color: var(--text-primary) !important;
      background: var(--bg-hover) !important;
    }
  }

  .title-container {
    text-align: center;
    flex: 1;
  }

  .page-subtitle {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 400;
  }

  /* Content body styles */
  .text-creation-body {
    margin-top: 56px; /* 为固定头部留出空间 */
    padding: 1rem 0;
  }
  
  .text-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .text-card {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 16px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: auto;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
      border-color: var(--theme-primary);
      
      &::before {
        opacity: 1;
      }
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }
  
  .text-content {
    flex: 1;
    margin-bottom: 1rem;
    
    .text-preview {
      font-size: 1rem;
      line-height: 1.7;
      color: var(--text-primary);
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      word-wrap: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
    }
  }
  
  .text-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-secondary);
    
    .action-btn {
      color: var(--text-tertiary) !important;
      min-width: 36px;
      height: 36px;
      border-radius: 8px;
      transition: all 0.2s ease;
      
      &:hover {
        color: var(--text-primary) !important;
        background: var(--bg-hover) !important;
        transform: scale(1.05);
      }
      
      &.liked {
        color: #ef4444 !important;
        background: rgba(239, 68, 68, 0.1) !important;
      }
    }
  }
}

/* 平板适配 */
@media (max-width: 1024px) {
  .text-creation-content {
    .text-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .text-creation-content {
    padding: 0.5rem 0;
    
    .text-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .text-card {
      padding: 1.25rem;
    }
    
    .text-content {
      .text-preview {
        font-size: 0.95rem;
        line-height: 1.6;
      }
    }
    
    .text-actions {
      padding-top: 0.75rem;
      
      .action-btn {
        min-width: 32px;
        height: 32px;
      }
    }
  }
}

/* 小屏幕适配 */
@media (max-width: 480px) {
  .text-creation-content {
    .text-card {
      padding: 1rem;
    }
    
    .text-content {
      .text-preview {
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .text-creation-header {
    left: 200px;
  }
}

@media (max-width: 900px) {
  .text-creation-header {
    left: 180px;
  }
}

@media (max-width: 768px) {
  .text-creation-header {
    left: 0;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .header-content {
    padding: 0.75rem 1rem;
    min-height: 60px;
    gap: 0.75rem;
  }
  
  .title-container {
    margin-left: 3rem; /* 为移动端菜单按钮留出空间 */
  }
  
  .page-subtitle {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0.625rem 0.75rem;
    min-height: 56px;
    gap: 0.5rem;
  }
  
  .page-subtitle {
    font-size: 0.75rem;
  }
}
</style>
