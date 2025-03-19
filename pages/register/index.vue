<template>
  <view class="register-container">
		<!-- 状态栏 -->
		<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		
    <view class="nav-bar">
			<uni-icons class="back-icon" type="left" @click="goBack"></uni-icons>
      <text class="nav-title">注册账号</text>
    </view>

    <view class="register-form">
      <view class="form-item">
        <input 
          class="input" 
          type="number" 
          v-model="formData.phone" 
          placeholder="请输入邮箱"
          placeholder-class="placeholder"
        />
        <view class="verify-btn" :class="{ disabled: counting }" @click="sendCode">
          {{ countText }}
        </view>
      </view>

      <view class="form-item">
        <input 
          class="input" 
          type="number" 
          v-model="formData.code" 
          placeholder="请输入验证码"
          placeholder-class="placeholder"
          maxlength="6"
        />
      </view>

      <view class="form-item">
        <input 
          class="input" 
          :type="showPassword ? 'text' : 'password'" 
          v-model="formData.password" 
          placeholder="请设置登录密码"
          placeholder-class="placeholder"
        />
      </view>
			
			<view class="form-item">
			  <input 
			    class="input" 
			    type="number" 
			    v-model="formData.code" 
			    placeholder="填写邀请码(没有则不填)"
			    placeholder-class="placeholder"
			    maxlength="6"
			  />
			</view>

      <text class="password-tip">密码由8-20位字母、数字或符号组成</text>

      <button class="register-btn" :class="{ active: isFormValid }" @click="handleRegister">
        注册
      </button>

      <view class="agreement-section">
        <view class="checkbox" @click="toggleAgreement">
          <view class="checkbox-inner" :class="{ checked: agreed }"></view>
        </view>
        <view class="agreement-text">
          <text class="normal-text">我已阅读并同意</text>
          <text class="link-text" @click.stop="openAgreement">《用户协议》</text>
          <text class="normal-text">和</text>
          <text class="link-text" @click.stop="openPrivacy">《隐私权政策》</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed,onMounted } from 'vue'

const formData = reactive({
  phone: '',
  code: '',
  password: ''
})
// 状态栏高度
const statusBarHeight = ref(0)
const showPassword = ref(false)
const agreed = ref(false)
const counting = ref(false)
const counter = ref(60)

const countText = computed(() => {
  return counting.value ? `${counter.value}秒后重发` : '获取验证码'
})

const isFormValid = computed(() => {
  return formData.phone.length === 11 && 
         formData.code.length === 6 && 
         formData.password.length >= 8 &&
         agreed.value
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleAgreement = () => {
  agreed.value = !agreed.value
}

const startCounter = () => {
  counting.value = true
  counter.value = 60
  const timer = setInterval(() => {
    counter.value--
    if (counter.value <= 0) {
      clearInterval(timer)
      counting.value = false
    }
  }, 1000)
}

const sendCode = () => {
  if (counting.value) return
  if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
    uni.showToast({
      title: '请输入正确的邮箱',
      icon: 'none'
    })
    return
  }
  
  // TODO: 发送验证码逻辑
  startCounter()
}

const handleRegister = () => {
  if (!isFormValid.value) {
    uni.showToast({
      title: '请完善注册信息',
      icon: 'none'
    })
    return
  }
  
  // TODO: 实现注册逻辑
  console.log('注册信息：', formData)
}

const goBack = () => {
  uni.navigateBack()
}

const openAgreement = () => {
  uni.navigateTo({
    url: '/pages/agreement/index'
  })
}

const openPrivacy = () => {
  uni.navigateTo({
    url: '/pages/privacy/index'
  })
}
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight
})
</script>

<style lang="scss">
.register-container {
  min-height: 100vh;
  background-color: #ffffff;
  
  .nav-bar {
    position: relative;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1rpx solid #f5f5f5;
    
    .back-icon {
      position: absolute;
      left: 30rpx;
      font-size: 36rpx;
      color: #333;
    }
    
    .nav-title {
      font-size: 34rpx;
      color: #333;
      font-weight: 500;
    }
  }
  
  .register-form {
    padding: 30rpx;
    
    .form-item {
      position: relative;
      width: 100%;
      margin-bottom: 30rpx;
      
      .input {
        box-sizing: border-box;
        width: 100%;
        height: 88rpx;
        background: #f8f9fb;
        border-radius: 8rpx;
        padding: 0 180rpx 0 20rpx;
        font-size: 28rpx;
      }
      
      .placeholder {
        color: #999;
        font-size: 32rpx;
      }
      
      .verify-btn {
        position: absolute;
        right: 20rpx;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        min-width: 160rpx;
        text-align: center;
        font-size: 28rpx;
        color: #1677ff;
        
        &.disabled {
          color: #999;
        }
      }
      
      .eye-icon {
        padding: 20rpx;
        color: #999;
        font-size: 40rpx;
      }
    }
    
    .password-tip {
      font-size: 24rpx;
      color: #999;
      margin-top: -20rpx;
      margin-bottom: 60rpx;
    }
    
    .register-btn {
      width: 100%;
      height: 88rpx;
      background: #ddecff;
      color: #1677ff;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      
      &.active {
        background: #1677ff;
        color: #fff;
      }
    }
    
    .agreement-section {
      margin-top: 40rpx;
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      
      .checkbox {
        width: 32rpx;
        height: 32rpx;
        border: 1px solid #ddd;
        border-radius: 6rpx;
        margin-right: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .checkbox-inner {
          width: 20rpx;
          height: 20rpx;
          border-radius: 4rpx;
          
          &.checked {
            background-color: #1677ff;
          }
        }
      }
      
      .agreement-text {
        flex: 1;
        font-size: 24rpx;
        
        .normal-text {
          color: #999;
        }
        
        .link-text {
          color: #1677ff;
        }
      }
    }
  }
}
</style> 