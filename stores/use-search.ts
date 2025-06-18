import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  // 搜索关键词
  const searchKeyword = ref('')
  
  // 设置搜索关键词
  const setSearchKeyword = (keyword: string) => {
    searchKeyword.value = keyword
  }
  
  // 清空搜索关键词
  const clearSearchKeyword = () => {
    searchKeyword.value = ''
  }
  
  return {
    searchKeyword,
    setSearchKeyword,
    clearSearchKeyword
  }
}) 