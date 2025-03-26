import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storage } from '@/utils'

// 用户模块
export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(storage.get('token') || '')
  const userInfo = ref(storage.get('userInfo') || {})
  const isLogin = computed(() => !!token.value)

  // 操作
  const setToken = (val) => {
    token.value = val
    storage.set('token', val)
  }

  const setUserInfo = (val) => {
    userInfo.value = val
    storage.set('userInfo', val)
  }

  const logout = () => {
    token.value = ''
    userInfo.value = {}
    storage.remove('token')
    storage.remove('userInfo')
  }

  return {
    // 状态
    token,
    userInfo,
    isLogin,
    // 操作
    setToken,
    setUserInfo,
    logout
  }
}) 