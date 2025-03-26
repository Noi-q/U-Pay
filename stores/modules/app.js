import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storage } from '@/utils'

// 应用配置模块
export const useAppStore = defineStore('app', () => {
  // 状态
  const theme = ref(storage.get('theme') || 'light')
  const language = ref(storage.get('language') || 'zh-CN')
  const currency = ref(storage.get('currency') || 'CNY')

  // 操作
  const setTheme = (val) => {
    theme.value = val
    storage.set('theme', val)
  }

  const setLanguage = (val) => {
    language.value = val
    storage.set('language', val)
  }

  const setCurrency = (val) => {
    currency.value = val
    storage.set('currency', val)
  }

  return {
    // 状态
    theme,
    language,
    currency,
    // 操作
    setTheme,
    setLanguage,
    setCurrency
  }
}) 