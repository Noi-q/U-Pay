<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/icons/tokens/usdt.png" mode="aspectFit" />
      <text class="title">U Pay</text>
      <text class="subtitle">让支付更简单</text>
    </view>

    <view class="login-form">
      <view class="form-item">
        <input 
          class="input" 
          type="text" 
          v-model="formData.username" 
          placeholder="账号/手机号码"
          placeholder-class="placeholder"
        />
      </view>

      <view class="form-item password-item">
        <input 
          class="input" 
          :type="showPassword ? 'text' : 'password'" 
          v-model="formData.password" 
          placeholder="请输入密码"
          placeholder-class="placeholder"
        />
        <text class="eye-icon" @click="togglePassword">
          {{ showPassword ? '👁️' : '👁️‍🗨️' }}
        </text>
      </view>

      <button class="login-btn" @click="handleLogin">登 录</button>

      <view class="quick-actions">
        <text @click="forgotPassword">忘记密码</text>
        <text @click="register">注册账号</text>
      </view>

      <view class="divider">
        <text class="divider-text">其他登录方式</text>
      </view>

      <view class="social-login">
        <view class="social-btn google-btn" @click="handleGoogleLogin">
          <image src="/static/icons/security/google.png" mode="aspectFit" class="social-icon" />
          <text>Google 登录</text>
        </view>
      </view>
    </view>

    <view class="footer">
      <text class="agreement">登录即代表您同意</text>
      <text class="link">《用户协议》</text>
      <text class="agreement">和</text>
      <text class="link">《隐私政策》</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showPassword = ref(false)
const formData = reactive({
  username: '',
  password: ''
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  if (!formData.username || !formData.password) {
    uni.showToast({
      title: '请输入账号和密码',
      icon: 'none'
    })
    return
  }
  
  // TODO: 实现登录逻辑
  console.log('登录信息：', formData)
	uni.switchTab({
		url: "/pages/index/index"
	})
}

const handleGoogleLogin = () => {
  // TODO: 实现 Google 登录逻辑
  console.log('Google 登录')
}

const forgotPassword = () => {
  uni.navigateTo({
    url: '/pages/forgot-password/index'
  })
}

const register = () => {
  uni.navigateTo({
    url: '/pages/register/index'
  })
}
</script>

<style lang="scss">
.login-container {
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  
  .login-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 120rpx 0 80rpx;
    
    .logo {
      width: 120rpx;
      height: 120rpx;
    }
    
    .title {
      font-size: 40rpx;
      color: #333;
      margin-top: 20rpx;
      font-weight: 500;
    }

    .subtitle {
      font-size: 28rpx;
      color: #999;
      margin-top: 16rpx;
    }
  }
  
  .login-form {
    padding: 0 40rpx;
    
    .form-item {
      position: relative;
      border-bottom: 1px solid #eee;
      
      .input {
        box-sizing: border-box;
        width: 100%;
        height: 100rpx;
        font-size: 32rpx;
        color: #333;
        padding: 0 80rpx 0 20rpx;
      }
      
      .placeholder {
        color: #999;
        font-size: 32rpx;
      }
    }

    .password-item {
      margin-top: 20rpx;
      
      .eye-icon {
        position: absolute;
        right: 20rpx;
        top: 50%;
        transform: translateY(-50%);
        font-size: 40rpx;
        color: #999;
        z-index: 1;
      }
    }
    
    .login-btn {
      width: 100%;
      height: 88rpx;
      background: #1677ff;
      color: #fff;
      border-radius: 44rpx;
      font-size: 32rpx;
      margin-top: 80rpx;
      font-weight: 500;
      
      &:active {
        opacity: 0.9;
      }
    }
    
    .quick-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
      padding: 0 20rpx;
      
      text {
        color: #1677ff;
        font-size: 28rpx;
        
        &:active {
          opacity: 0.7;
        }
      }
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 60rpx 0 40rpx;
      
      &::before,
      &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #eee;
      }
      
      .divider-text {
        color: #999;
        font-size: 24rpx;
        padding: 0 30rpx;
      }
    }

    .social-login {
      display: flex;
      justify-content: center;
      
      .social-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20rpx;
        
        .social-icon {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 16rpx;
        }
        
        text {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 40rpx;
    left: 0;
    right: 0;
    text-align: center;
    
    .agreement {
      font-size: 24rpx;
      color: #999;
    }
    
    .link {
      font-size: 24rpx;
      color: #1677ff;
    }
  }
}
</style> 