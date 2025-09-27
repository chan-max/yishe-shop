<template>
  <div class="home-content">
    <!-- Header Section -->
    <div class="home-header">
      <div class="header-content">
        <h1 class="page-title">Home Dashboard</h1>
        
        <div class="search-filter-container">
          <div class="search-container">
            <div class="search-box">
              <v-icon class="search-icon">mdi-magnify</v-icon>
              <input
                v-model="searchQuery"
                class="search-input"
                type="text"
                placeholder="Search anything..."
                @input="handleSearchInput(($event.target as HTMLInputElement).value)"
                @keydown.enter="performSearch"
                @focus="showSuggestions = true"
                @blur="handleBlur"
              />
              <v-btn
                v-if="searchQuery"
                variant="text"
                class="clear-btn"
                @click="clearSearch"
                icon
                size="small"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            
            <!-- Search suggestions -->
            <div v-if="showSuggestions" class="search-suggestions">
              <div
                v-for="suggestion in filteredSuggestions"
                :key="suggestion"
                class="suggestion-item"
                @click="selectSuggestion(suggestion)"
              >
                <v-icon class="suggestion-icon">mdi-magnify</v-icon>
                <span class="suggestion-text">{{ suggestion }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="home-body">
      <div class="home-placeholder">
        <div class="placeholder-content">
          <v-icon class="placeholder-icon" size="64" color="var(--text-tertiary)">
            mdi-home-outline
          </v-icon>
          <h2 class="placeholder-title">Welcome Home</h2>
          <p class="placeholder-description">
            This is the home page content. You can add your dashboard, statistics, or any other home-related content here.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
const props = defineProps<{
  searchQuery: string
  showSuggestions: boolean
  showMobileSidebar: boolean
}>()

// Emits
const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:showSuggestions': [value: boolean]
  'perform-search': []
  'clear-search': []
  'select-suggestion': [suggestion: string]
  'handle-blur': []
  'toggle-mobile-sidebar': []
}>()

// Local state
const searchQuery = ref(props.searchQuery)
const showSuggestions = ref(props.showSuggestions)

// Search suggestions
const searchSuggestions = ref([
  'dashboard', 'analytics', 'reports', 'settings', 'profile', 'notifications', 'help', 'support'
])

// Computed
const filteredSuggestions = computed(() => {
  if (!searchQuery.value.trim()) {
    return searchSuggestions.value.slice(0, 8)
  }
  
  return searchSuggestions.value
    .filter(suggestion => 
      suggestion.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .slice(0, 8)
})

// Methods
const handleSearchInput = (value: string) => {
  emit('update:searchQuery', value)
  showSuggestions.value = true
  // 移除实时搜索，只在点击搜索按钮或回车时搜索
}

const clearSearch = () => {
  searchQuery.value = ''
  showSuggestions.value = false
  emit('update:searchQuery', '')
  emit('clear-search')
}

const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion
  showSuggestions.value = false
  emit('update:searchQuery', suggestion)
  emit('select-suggestion', suggestion)
}

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
    emit('update:showSuggestions', false)
    emit('handle-blur')
  }, 200)
}
</script>

<style scoped>
.home-content {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.home-header {
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

.page-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  flex-shrink: 0;
}

.search-filter-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 600px;
  margin: 0 auto;
}

.search-container {
  flex: 1;
  position: relative;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--input-bg);
  border: none;
  border-radius: 50px;
  padding: 0.25rem 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  height: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: var(--input-bg-hover);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:focus-within {
    background: var(--input-bg-focus);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
  }
}

.search-icon {
  color: var(--text-tertiary);
  margin-right: 0.75rem;
  margin-left: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  .search-box:hover & {
    color: var(--text-secondary);
  }
  
  .search-box:focus-within & {
    color: var(--text-primary);
  }
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  height: 100%;
  min-height: auto;
  max-height: none;
  resize: none; /* 禁止调整大小 */
  overflow: hidden; /* 隐藏溢出内容 */
  
  &::placeholder {
    color: var(--text-muted);
    font-weight: 400;
    transition: color 0.3s ease;
  }
  
  &:focus {
    color: var(--text-primary);
    
    &::placeholder {
      color: var(--text-tertiary);
    }
  }
}

.clear-btn {
  color: var(--text-tertiary);
  margin-left: 0.375rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  padding: 0.125rem;
  border-radius: 50%;
  min-width: 24px;
  height: 24px;
  
  &:hover {
    color: var(--text-primary);
    opacity: 1;
    background: var(--bg-hover);
  }
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-secondary);
  border-radius: 12px;
  margin-top: 0.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px var(--shadow-primary);
  z-index: 1003;
  overflow: hidden;
}

.suggestion-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-secondary);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: var(--bg-hover);
  }
}

.suggestion-icon {
  color: var(--text-muted);
  margin-right: 0.75rem;
  font-size: 1rem;
}

.suggestion-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 400;
}

/* Content Styles */
.home-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 56px; /* 为固定头部留出空间 */
}

.home-placeholder {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

.placeholder-content {
  .placeholder-icon {
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }
  
  .placeholder-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  .placeholder-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .home-header {
    left: 200px;
  }
}

@media (max-width: 900px) {
  .home-header {
    left: 180px;
  }
}

@media (max-width: 768px) {
  .home-header {
    left: 0;
  }
  
  .header-content {
    padding: 0.75rem 1rem;
    min-height: 60px;
    gap: 0.75rem;
  }
  
  .page-title {
    font-size: 1.1rem;
  }
  
  .search-box {
    padding: 0.5rem 0.75rem;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0.625rem 0.75rem;
    min-height: 56px;
    gap: 0.5rem;
  }
  
  .page-title {
    font-size: 1rem;
  }
  
  .search-box {
    padding: 0.375rem 0.5rem;
    height: 28px;
  }
}
</style>
