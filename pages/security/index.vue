<template>
  <view class="security-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="安全中心"
			:border="false"
      @clickLeft="goBack"
    />
    
    <!-- 安全等级 -->
    <view class="security-level">
      <view class="level-info">
        <text class="label">安全等级</text>
        <text class="level">{{ securityLevel }}</text>
      </view>
      <view class="progress-bar">
        <view 
          class="progress" 
          :style="{ width: `${securityScore}%` }"
          :class="securityClass"
        ></view>
      </view>
      <text class="tip">{{ securityTip }}</text>
    </view>

    <!-- 安全项目列表 -->
    <view class="security-list">
      <view class="list-item" @click="goToLoginPassword">
        <view class="item-left">
          <image src="/static/icons/security/password.png" mode="aspectFit" />
          <view class="item-info">
            <text class="title">登录密码</text>
            <text class="desc">用于登录账号，建议定期更换</text>
          </view>
        </view>
        <view class="item-right">
          <text class="status">已设置</text>
					<uni-icons type="right" size="32rpx"></uni-icons>
        </view>
      </view>

      <view class="list-item" @click="goToPayPassword">
        <view class="item-left">
          <image src="/static/icons/security/pay-password.png" mode="aspectFit" />
          <view class="item-info">
            <text class="title">支付密码</text>
            <text class="desc">用于转账、提现等操作，请妥善保管</text>
          </view>
        </view>
        <view class="item-right">
          <text class="status" :class="{ unset: !hasPayPassword }">
            {{ hasPayPassword ? '已设置' : '未设置' }}
          </text>
					<uni-icons type="right" size="32rpx"></uni-icons>
        </view>
      </view>

      <view class="list-item" @click="goToPhoneVerify">
        <view class="item-left">
          <image src="/static/icons/security/phone.png" mode="aspectFit" />
          <view class="item-info">
            <text class="title">手机验证</text>
            <text class="desc">{{ phoneNumber || '未绑定手机号' }}</text>
          </view>
        </view>
        <view class="item-right">
          <text class="status" :class="{ unset: !phoneNumber }">
            {{ phoneNumber ? '已绑定' : '未绑定' }}
          </text>
					<uni-icons type="right" size="32rpx"></uni-icons>
        </view>
      </view>

      <view class="list-item" @click="goToEmailVerify">
        <view class="item-left">
          <image src="/static/icons/security/email.png" mode="aspectFit" />
          <view class="item-info">
            <text class="title">邮箱验证</text>
            <text class="desc">{{ emailAddress || '未绑定邮箱' }}</text>
          </view>
        </view>
        <view class="item-right">
          <text class="status" :class="{ unset: !emailAddress }">
            {{ emailAddress ? '已绑定' : '未绑定' }}
          </text>
					<uni-icons type="right" size="32rpx"></uni-icons>
        </view>
      </view>

      <view class="list-item" @click="goToGoogleAuth">
        <view class="item-left">
          <image src="/static/icons/security/google.png" mode="aspectFit" />
          <view class="item-info">
            <text class="title">谷歌验证</text>
            <text class="desc">用于提供双重验证保护</text>
          </view>
        </view>
        <view class="item-right">
          <text class="status" :class="{ unset: !hasGoogleAuth }">
            {{ hasGoogleAuth ? '已开启' : '未开启' }}
          </text>
					<uni-icons type="right" size="32rpx"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 安全信息
const hasPayPassword = ref(true)
const phoneNumber = ref('138****8888')
const emailAddress = ref('exa***@example.com')
const hasGoogleAuth = ref(false)

// 计算安全等级
const securityScore = computed(() => {
  let score = 60 // 基础分（登录密码）
  if (hasPayPassword.value) score += 10
  if (phoneNumber.value) score += 10
  if (emailAddress.value) score += 10
  if (hasGoogleAuth.value) score += 10
  return score
})

const securityLevel = computed(() => {
  if (securityScore.value >= 90) return '高'
  if (securityScore.value >= 70) return '中'
  return '低'
})

const securityClass = computed(() => {
  if (securityScore.value >= 90) return 'high'
  if (securityScore.value >= 70) return 'medium'
  return 'low'
})

const securityTip = computed(() => {
  if (securityScore.value >= 90) return '您的账户安全级别很高'
  if (securityScore.value >= 70) return '建议开启谷歌验证提升安全性'
  return '建议完善安全设置提升账户安全'
})

// 页面跳转方法
const goBack = () => uni.navigateBack()
const goToLoginPassword = () => uni.navigateTo({ url: '/pages/security/login-password' })
const goToPayPassword = () => uni.navigateTo({ url: '/pages/security/pay-password' })
const goToPhoneVerify = () => uni.navigateTo({ url: '/pages/security/phone-verify' })
const goToEmailVerify = () => uni.navigateTo({ url: '/pages/security/email-verify' })
const goToGoogleAuth = () => uni.navigateTo({ url: '/pages/security/google-auth' })
</script>

<style lang="scss">
.security-container {
  min-height: 100vh;
  background: #f5f6fa;
  
  .security-level {
    background: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .level-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .label {
        font-size: 28rpx;
        color: #666;
      }
      
      .level {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
      }
    }
    
    .progress-bar {
      height: 8rpx;
      background: #f0f0f0;
      border-radius: 4rpx;
      margin-bottom: 16rpx;
      
      .progress {
        height: 100%;
        border-radius: 4rpx;
        transition: width 0.3s ease;
        
        &.high {
          background: #52c41a;
        }
        
        &.medium {
          background: #faad14;
        }
        
        &.low {
          background: #ff4d4f;
        }
      }
    }
    
    .tip {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .security-list {
    background: #fff;
    
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .item-left {
        display: flex;
        align-items: center;
        
        image {
          width: 48rpx;
          height: 48rpx;
          margin-right: 20rpx;
        }
        
        .item-info {
          .title {
            font-size: 28rpx;
            color: #333;
            margin-bottom: 8rpx;
          }
          
          .desc {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
      
      .item-right {
        display: flex;
        align-items: center;
        
        .status {
          font-size: 26rpx;
          color: #52c41a;
          margin-right: 10rpx;
          
          &.unset {
            color: #ff4d4f;
          }
        }
        
        .arrow {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
}
</style> 