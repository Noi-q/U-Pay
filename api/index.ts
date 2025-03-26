// API 接口管理
import { http } from '@/utils/request'

// 接口返回数据类型定义
interface LoginParams {
  username: string;
  password: string;
}

interface UserInfo {
  id: number;
  username: string;
  avatar: string;
  // ... 其他用户信息字段
}

// 用户相关接口
export const userApi = {
  // 登录
  login(data: LoginParams) {
    return http.post<{ token: string }>('/user/login', data)
  },

  // 获取用户信息
  getUserInfo() {
    return http.get<UserInfo>('/user/info')
  },

  // 更新用户信息
  updateUserInfo(data: Partial<UserInfo>) {
    return http.put('/user/info', data)
  }
}

// 其他模块的接口...
export const otherApi = {
  // ...
} 