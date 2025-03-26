/**
 * 通用工具函数
 */

// 存储相关
export const storage = {
  // 设置永久存储
  set(key, value) {
    uni.setStorageSync(key, value)
  },
  // 获取永久存储
  get(key) {
    return uni.getStorageSync(key)
  },
  // 移除永久存储
  remove(key) {
    uni.removeStorageSync(key)
  },
  // 清空所有存储
  clear() {
    uni.clearStorageSync()
  }
}

// 路由跳转
export const router = {
  // 保留当前页面，跳转到应用内的某个页面
  push(url, params = {}) {
    if (Object.keys(params).length > 0) {
      const queryString = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&')
      url = `${url}?${queryString}`
    }
    uni.navigateTo({ url })
  },
  // 关闭当前页面，跳转到应用内的某个页面
  replace(url, params = {}) {
    if (Object.keys(params).length > 0) {
      const queryString = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&')
      url = `${url}?${queryString}`
    }
    uni.redirectTo({ url })
  },
  // 关闭所有页面，打开到应用内的某个页面
  reLaunch(url) {
    uni.reLaunch({ url })
  },
  // 关闭当前页面，返回上一页面或多级页面
  back(delta = 1) {
    uni.navigateBack({ delta })
  }
}

// 消息提示
export const toast = {
  success(title, duration = 2000) {
    uni.showToast({
      title,
      icon: 'success',
      duration
    })
  },
  error(title, duration = 2000) {
    uni.showToast({
      title,
      icon: 'error',
      duration
    })
  },
  info(title, duration = 2000) {
    uni.showToast({
      title,
      icon: 'none',
      duration
    })
  },
  loading(title = '加载中...') {
    uni.showLoading({
      title,
      mask: true
    })
  },
  hide() {
    uni.hideLoading()
  }
}

// 时间格式化
export const formatDate = {
  // 格式化时间戳
  format(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    format = format.replace(/YYYY/g, year)
    format = format.replace(/MM/g, month.toString().padStart(2, '0'))
    format = format.replace(/DD/g, day.toString().padStart(2, '0'))
    format = format.replace(/HH/g, hour.toString().padStart(2, '0'))
    format = format.replace(/mm/g, minute.toString().padStart(2, '0'))
    format = format.replace(/ss/g, second.toString().padStart(2, '0'))

    return format
  },
  // 相对时间
  fromNow(timestamp) {
    const now = Date.now()
    const diff = now - timestamp
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30
    const year = month * 12

    if (diff < minute) {
      return '刚刚'
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)}分钟前`
    } else if (diff < day) {
      return `${Math.floor(diff / hour)}小时前`
    } else if (diff < month) {
      return `${Math.floor(diff / day)}天前`
    } else if (diff < year) {
      return `${Math.floor(diff / month)}个月前`
    } else {
      return `${Math.floor(diff / year)}年前`
    }
  }
}

// 数字格式化
export const formatNumber = {
  // 格式化金额
  formatMoney(number, decimals = 2) {
    return Number(number).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  // 格式化数字(支持万、亿)
  formatNumber(number) {
    if (number >= 100000000) {
      return (number / 100000000).toFixed(2) + '亿'
    } else if (number >= 10000) {
      return (number / 10000).toFixed(2) + '万'
    } else {
      return number.toString()
    }
  }
}

// 表单验证
export const validate = {
  // 手机号验证
  isMobile(value) {
    return /^1[3-9]\d{9}$/.test(value)
  },
  // 邮箱验证
  isEmail(value) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  },
  // 身份证验证
  isIdCard(value) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  },
  // 密码强度验证(至少包含数字和字母，长度8-20)
  isPassword(value) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(value)
  }
}

// 设备信息
export const device = {
  // 获取系统信息
  getSystemInfo() {
    return uni.getSystemInfoSync()
  },
  // 判断是否是iOS
  isIOS() {
    const sys = uni.getSystemInfoSync()
    return sys.platform === 'ios'
  },
  // 判断是否是Android
  isAndroid() {
    const sys = uni.getSystemInfoSync()
    return sys.platform === 'android'
  },
  // 判断是否是H5
  isH5() {
    return process.env.VUE_APP_PLATFORM === 'h5'
  },
  // 判断是否是小程序
  isMp() {
    return process.env.VUE_APP_PLATFORM === 'mp-weixin'
  }
}

// 防抖函数
export const debounce = (fn, delay = 500) => {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 节流函数
export const throttle = (fn, delay = 500) => {
  let timer = null
  let start = Date.now()
  return function(...args) {
    const now = Date.now()
    const remaining = delay - (now - start)
    if (timer) clearTimeout(timer)
    if (remaining <= 0) {
      fn.apply(this, args)
      start = Date.now()
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        start = Date.now()
      }, remaining)
    }
  }
}

// 深拷贝
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  const clone = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key])
    }
  }
  return clone
}

// 随机数生成
export const random = {
  // 生成指定范围的随机数
  number(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  // 生成指定长度的随机字符串
  string(length = 8) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  }
}

// 剪贴板
export const clipboard = {
  // 复制文本
  copy(text) {
    return new Promise((resolve, reject) => {
      uni.setClipboardData({
        data: text,
        success: () => {
          toast.success('复制成功')
          resolve(true)
        },
        fail: (err) => {
          toast.error('复制失败')
          reject(err)
        }
      })
    })
  },
  // 获取剪贴板内容
  get() {
    return new Promise((resolve, reject) => {
      uni.getClipboardData({
        success: (res) => resolve(res.data),
        fail: reject
      })
    })
  }
}

// 图片处理
export const image = {
  // 选择图片
  choose(count = 1) {
    return new Promise((resolve, reject) => {
      uni.chooseImage({
        count,
        success: resolve,
        fail: reject
      })
    })
  },
  // 预览图片
  preview(urls, current = 0) {
    if (typeof current === 'number') {
      current = urls[current]
    }
    uni.previewImage({
      urls: typeof urls === 'string' ? [urls] : urls,
      current
    })
  },
  // 压缩图片
  compress(src) {
    return new Promise((resolve, reject) => {
      uni.compressImage({
        src,
        quality: 80,
        success: resolve,
        fail: reject
      })
    })
  }
} 