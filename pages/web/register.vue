<template>
  <view class="web-register-container">
    <view class="register-box">
      <view class="register-header">
        <!-- <image src="/static/logo.png" class="logo" @tap="goToHome" /> -->
        <text class="title">创建账号</text>
      </view>
      
      <view class="register-form">
        <view class="form-item">
          <input 
            type="text" 
            v-model="formData.email" 
            placeholder="请输入邮箱地址"
            placeholder-style="color: #999;"
          />
        </view>
        
        <view class="form-item">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="formData.password" 
            placeholder="请设置密码"
            placeholder-style="color: #999;"
          />
          <view class="eye-icon" @tap="togglePasswordVisibility">
            <image 
              :src="showPassword ? '/static/icons/eye-on.png' : '/static/icons/eye-off.png'"
              mode="aspectFit"
              class="eye-image"
            />
          </view>
        </view>
        
        <view class="form-item verification">
          <input 
            type="text" 
            v-model="formData.verifyCode" 
            placeholder="请输入验证码"
            placeholder-style="color: #999;"
          />
          <button 
            class="verify-button" 
            :disabled="!canSendCode || counting" 
            @tap="sendVerifyCode"
          >
            {{ counting ? `${countdown}s` : '获取验证码' }}
          </button>
        </view>

        <view class="agreement">
          <checkbox-group @change="handleAgreeTerms">
            <checkbox :checked="agreeTerms" color="#1677ff" style="transform:scale(0.7)" />
            <text class="agreement-text">
              我已阅读并同意
              <text class="link" @tap="showPrivacyPolicy">《服务条款》</text>
              和
              <text class="link" @tap="showUserAgreement">《隐私政策》</text>
            </text>
          </checkbox-group>
        </view>

        <button 
          class="register-button" 
          :class="{ active: isFormValid }" 
          @tap="handleRegister"
          :disabled="!isFormValid"
        >
          注册
        </button>

        <view class="login-link">
          <text>已有账号？</text>
          <text class="link" @tap="goToLogin">立即登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const formData = ref({
  email: '',
  password: '',
  verifyCode: ''
})

const showPassword = ref(false)
const agreeTerms = ref(false)
const counting = ref(false)
const countdown = ref(60)

// 添加窗口尺寸判断逻辑
const checkScreenSize = () => {
  // 判断当前窗口宽度是否小于768px（平板尺寸）
  if (uni.getSystemInfoSync().windowWidth < 768) {
    uni.redirectTo({
      url: '/pages/register/index'
    })
  }
}

// 监听窗口大小变化
const handleResize = () => {
  checkScreenSize()
}

onMounted(() => {
  // 页面加载时检查
  checkScreenSize()
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  // 移除监听
  window.removeEventListener('resize', handleResize)
})

const isFormValid = computed(() => {
  return formData.value.email && 
         formData.value.password && 
         formData.value.verifyCode && 
         agreeTerms.value
})

const canSendCode = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const sendVerifyCode = () => {
  if (!canSendCode.value || counting.value) return
  
  counting.value = true
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      counting.value = false
      countdown.value = 60
    }
  }, 1000)
}

const handleRegister = () => {
  if (!isFormValid.value) return
  // 处理注册逻辑
}

const goToHome = () => {
  uni.redirectTo({
    url: '/pages/web/index'
  })
}

const goToLogin = () => {
  uni.redirectTo({
    url: '/pages/web/login'
  })
}

const handleAgreeTerms = () => {
  agreeTerms.value = !agreeTerms.value
}

const showPrivacyPolicy = () => {
  // 实现显示隐私政策
}

const showUserAgreement = () => {
  // 实现显示用户协议
}
</script>

<style lang="scss">
/* #ifdef H5 */
.mobile-tip {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  color: #666;
}
/* #endif */

/* #ifdef WEB */
.web-register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  
  .register-box {
    width: 800rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 80rpx;
    box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.1);
    
    .register-header {
      text-align: center;
      margin-bottom: 40px;
      
      .logo {
        height: 40px;
        margin-bottom: 20px;
        cursor: pointer;
      }
      
      .title {
        font-size: 24px;
        color: #333;
        font-weight: 500;
      }
    }
    
    .register-form {
      .form-item {
        position: relative;
        margin-bottom: 20px;
        
        input {
          width: 100%;
          height: 48px;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 0 15px;
          font-size: 16px;
          transition: all 0.3s;
          
          &:focus {
            border-color: #1677ff;
            box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
          }
        }
        
        &.verification {
          display: flex;
          gap: 10px;
          
          input {
            flex: 1;
          }
          
          .verify-button {
            width: 200rpx;
            height: 96rpx;
            line-height: 96rpx;
            background: #1677ff;
            color: #fff;
            border: none;
            border-radius: 12rpx;
            font-size: 28rpx;
            
            &:disabled {
              background: #cccccc;
            }
          }
        }
        
        .eye-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          
          .eye-image {
            width: 20px;
            height: 20px;
          }
        }
      }
      
      .agreement {
        margin: 40rpx 0;
        
        .agreement-text {
          font-size: 28rpx;
          color: #666;
          margin-left: 8rpx;
          
          .link {
            color: #1677ff;
          }
        }
      }
      
      .register-button {
        width: 100%;
        height: 48px;
        background: #cccccc;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
        
        &.active {
          background: #1677ff;
          
          &:hover {
            background: #0e5cd0;
          }
        }
      }
      
      .login-link {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #666;
        
        .link {
          color: #1677ff;
          text-decoration: none;
          cursor: pointer;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
/* #endif */
</style> 