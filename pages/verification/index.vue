<template>
  <view class="verification-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="实名认证"
			:border="false"
      @clickLeft="goBack"
    />
    
    <!-- 认证状态提示 -->
    <view class="verify-status">
      <image class="status-icon" src="/static/icons/verify-pending.png" />
      <text class="status-text">请完成实名认证，认证后可进行充值提现等操作</text>
    </view>

    <!-- 表单区域 -->
    <view class="verification-content">
      <view class="form-group">
        <view class="form-item">
          <text class="label">真实姓名</text>
          <input 
            type="text" 
            v-model="formData.name"
            placeholder="请输入您的真实姓名" 
            placeholder-class="placeholder"
          />
        </view>
        <view class="form-item">
          <text class="label">身份证号码</text>
          <input 
            type="idcard" 
            v-model="formData.idCard"
            placeholder="请输入您的身份证号码" 
            placeholder-class="placeholder"
          />
        </view>
      </view>

      <!-- 提示信息 -->
      <view class="tips">
        <view class="tip-item">
          <text class="dot">•</text>
          <text class="tip-text">请确保身份信息准确无误，实名认证通过后将无法修改</text>
        </view>
        <view class="tip-item">
          <text class="dot">•</text>
          <text class="tip-text">您的信息将被严格保密，仅用于身份验证</text>
        </view>
      </view>

      <!-- 提交按钮 -->
      <button 
        class="submit-button" 
        :class="{ 'button-active': isFormValid }"
        :disabled="!isFormValid"
        @click="submitVerification"
      >
        确认提交
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  name: '',
  idCard: ''
})

// 表单验证
const isFormValid = computed(() => {
  return formData.value.name.length >= 2 && formData.value.idCard.length === 18
})

const goBack = () => {
  uni.navigateBack()
}

const submitVerification = () => {
  if (!isFormValid.value) return
  
  uni.showLoading({
    title: '提交中...'
  })
  
  // 模拟提交
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
  }, 1500)
}
</script>

<style lang="scss">
.verification-container {
  min-height: 100vh;
  background: #f7f7f7;
  
  .verify-status {
    background: #fff;
    padding: 40rpx 30rpx;
    display: flex;
    align-items: center;
    // margin-top: 88rpx;
    
    .status-icon {
      width: 80rpx;
      height: 80rpx;
      margin-right: 20rpx;
    }
    
    .status-text {
      font-size: 28rpx;
      color: #333;
      flex: 1;
      line-height: 1.5;
    }
  }

  .verification-content {
    padding: 0 30rpx;
    
    .form-group {
      background: #fff;
      border-radius: 12rpx;
      margin-top: 20rpx;
      padding: 0 30rpx;
      
      .form-item {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #eee;
        
        &:last-child {
          border-bottom: none;
        }
        
        .label {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 20rpx;
          display: block;
        }
        
        input {
          width: 100%;
          font-size: 32rpx;
          color: #333;
          
          &::placeholder {
            color: #999;
          }
        }
      }
    }
    
    .tips {
      padding: 30rpx 0;
      
      .tip-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10rpx;
        
        .dot {
          color: #999;
          margin-right: 10rpx;
        }
        
        .tip-text {
          font-size: 24rpx;
          color: #999;
          line-height: 1.5;
          flex: 1;
        }
      }
    }
    
    .submit-button {
      width: 100%;
      height: 90rpx;
      line-height: 90rpx;
      background: #cccccc;
      color: #fff;
      font-size: 32rpx;
      border-radius: 45rpx;
      margin-top: 40rpx;
      
      &.button-active {
        background: #1677ff;
      }
    }
  }
}
</style> 