// 环境变量
const BASE_URL = {
  development: 'http://dev-api.example.com', // 开发环境
  production: 'https://api.example.com', // 生产环境
  test: 'http://test-api.example.com' // 测试环境
}

// 获取当前环境
const ENV = process.env.NODE_ENV || 'development'

// 创建请求实例
const request = (options) => {
  // 请求前的配置处理
  const token = uni.getStorageSync('token')
  const header = {
    'Content-Type': 'application/json',
    ...options.header
  }

  // 如果需要认证，添加token
  if (options.auth !== false && token) {
    header['Authorization'] = `Bearer ${token}`
  }

  // 显示加载提示
  if (options.loading !== false) {
    uni.showLoading({
      title: '加载中...',
      mask: true
    })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      url: `${BASE_URL[ENV]}${options.url}`,
      header,
      success: (res) => {
        const response = res.data
        
        // 请求成功
        if (response.code === 200) {
          resolve(response.data)
        } 
        // token失效
        else if (response.code === 401) {
          uni.removeStorageSync('token')
          uni.showModal({
            title: '提示',
            content: '登录已过期，请重新登录',
            showCancel: false,
            success: () => {
              uni.reLaunch({
                url: '/pages/login/index'
              })
            }
          })
          reject(response)
        } 
        // 其他错误
        else {
          if (options.errorTip !== false) {
            uni.showToast({
              title: response.message || '请求失败',
              icon: 'none'
            })
          }
          reject(response)
        }
      },
      fail: (err) => {
        if (options.errorTip !== false) {
          uni.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none'
          })
        }
        reject(err)
      },
      complete: () => {
        if (options.loading !== false) {
          uni.hideLoading()
        }
      }
    })
  })
}

// 封装常用请求方法
export const http = {
  get(url, data, options = {}) {
    return request({
      url,
      data,
      method: 'GET',
      ...options
    })
  },

  post(url, data, options = {}) {
    return request({
      url,
      data,
      method: 'POST',
      ...options
    })
  },

  put(url, data, options = {}) {
    return request({
      url,
      data,
      method: 'PUT',
      ...options
    })
  },

  delete(url, data, options = {}) {
    return request({
      url,
      data,
      method: 'DELETE',
      ...options
    })
  }
} 