<template>
  <view class="web-login-container">
    <view class="login-box">
      <view class="login-header">
        <!-- <image src="/static/logo.png" class="logo" @tap="goToHome" /> -->
        <text class="title">欢迎登录</text>
      </view>
      
      <view class="login-form">
        <view class="form-item">
          <input 
            type="text" 
            v-model="formData.account" 
            placeholder="邮箱/手机号"
            placeholder-style="color: #999;"
          />
        </view>
        
        <view class="form-item">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="formData.password" 
            placeholder="请输入密码"
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

        <view class="form-options">
          <view class="remember-me">
            <checkbox-group @change="handleRememberMe">
              <checkbox :checked="rememberMe" color="#1677ff" style="transform:scale(0.7)" />
              <text>记住我</text>
            </checkbox-group>
          </view>
          <text class="forget-password" @tap="goToForgetPassword">忘记密码？</text>
        </view>

        <button 
          class="login-button" 
          :class="{ active: isFormValid }" 
          @tap="handleLogin"
          :disabled="!isFormValid"
        >
          登录
        </button>

        <view class="other-login">
          <view class="divider">
            <text>其他登录方式</text>
          </view>
          <view class="login-methods">
            <image 
              src="/static/icons/security/google.png" 
              @tap="googleLogin" 
              mode="aspectFit"
              class="google-icon"
            />
          </view>
        </view>

        <view class="register-link">
          <text>还没有账号？</text>
          <text class="link" @tap="goToRegister">立即注册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const formData = ref({
  account: '',
  password: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)

// 添加窗口尺寸判断逻辑
const checkScreenSize = () => {
  // 判断当前窗口宽度是否小于768px（平板尺寸）
  if (uni.getSystemInfoSync().windowWidth < 768) {
    uni.redirectTo({
      url: '/pages/login/index'
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
  return formData.value.account && formData.value.password
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  if (!isFormValid.value) return
  // 处理登录逻辑
}

const googleLogin = () => {
  // 处理谷歌登录
}

const goToHome = () => {
  uni.redirectTo({
    url: '/pages/web/index'
  })
}

const goToRegister = () => {
  uni.redirectTo({
    url: '/pages/web/register'
  })
}

const handleRememberMe = () => {
  // 处理记住我逻辑
}

const goToForgetPassword = () => {
  // 处理忘记密码逻辑
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
.web-login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  
  .login-box {
    width: 800rpx;
    background: #fff;
    border-radius: 24rpx;
    padding: 80rpx;
    box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.1);
    
    .login-header {
      text-align: center;
      margin-bottom: 80rpx;
      
      .logo {
        height: 80rpx;
        width: 200rpx;
        margin-bottom: 40rpx;
      }
      
      .title {
        font-size: 48rpx;
        color: #333;
        font-weight: 500;
      }
    }
    
    .login-form {
      .form-item {
        position: relative;
        margin-bottom: 40rpx;
        
        input {
          width: 100%;
          height: 96rpx;
          border: 2rpx solid #ddd;
          border-radius: 12rpx;
          padding: 0 30rpx;
          font-size: 32rpx;
          
          &:focus {
            border-color: #1677ff;
            box-shadow: 0 0 0 4rpx rgba(22, 119, 255, 0.1);
          }
        }
        
        .eye-icon {
          position: absolute;
          right: 30rpx;
          top: 50%;
          transform: translateY(-50%);
          
          .eye-image {
            width: 40rpx;
            height: 40rpx;
          }
        }
      }
      
      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40rpx;
        
        .remember-me {
          display: flex;
          align-items: center;
          
          text {
            font-size: 28rpx;
            color: #666;
            margin-left: 8rpx;
          }
        }
        
        .forget-password {
          font-size: 28rpx;
          color: #1677ff;
        }
      }
      
      .login-button {
        width: 100%;
        height: 96rpx;
        line-height: 96rpx;
        background: #cccccc;
        color: #fff;
        border: none;
        border-radius: 48rpx;
        font-size: 32rpx;
        
        &.active {
          background: #1677ff;
        }
      }
      
      .other-login {
        margin: 60rpx 0;
        
        .divider {
          position: relative;
          text-align: center;
          margin-bottom: 40rpx;
          
          &::before,
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 240rpx;
            height: 2rpx;
            background: #eee;
          }
          
          &::before {
            left: 0;
          }
          
          &::after {
            right: 0;
          }
          
          text {
            background: #fff;
            padding: 0 30rpx;
            color: #999;
            font-size: 28rpx;
          }
        }
        
        .login-methods {
          display: flex;
          justify-content: center;
          
          .google-icon {
            width: 72rpx;
            height: 72rpx;
          }
        }
      }
      
      .register-link {
        text-align: center;
        font-size: 28rpx;
        color: #666;
        
        .link {
          color: #1677ff;
          margin-left: 8rpx;
        }
      }
    }
  }
}
/* #endif */
</style> 