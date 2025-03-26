// API 接口管理
import { http } from '@/utils/request'

// 用户相关接口
export const userApi = {
  // 登录
  login(data) {
    return http.post('/user/login', data)
  },

  // 获取用户信息
  getUserInfo() {
    return http.get('/user/info')
  },

  // 更新用户信息
  updateUserInfo(data) {
    return http.put('/user/info', data)
  }
}

// 其他模块的接口...
export const otherApi = {
  // ...
} 