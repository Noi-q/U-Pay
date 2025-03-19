<template>
  <view class="invite-friends-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="邀请好友"
			:border="false"
      @clickLeft="goBack"
    />
    
    <!-- 邀请奖励展示 -->
    <view class="reward-section">
      <view class="reward-header">
        <text class="title">邀请奖励</text>
        <text class="subtitle">邀请好友注册并完成实名认证</text>
      </view>
      <view class="reward-cards">
        <view class="reward-card">
          <text class="amount">20 USDT</text>
          <text class="desc">邀请人奖励</text>
        </view>
        <view class="reward-card">
          <text class="amount">10 USDT</text>
          <text class="desc">受邀人奖励</text>
        </view>
      </view>
    </view>

    <!-- 邀请数据统计 -->
    <view class="stats-section">
      <view class="stat-item">
        <text class="value">{{ inviteStats.total }}</text>
        <text class="label">累计邀请</text>
      </view>
      <view class="stat-item">
        <text class="value">{{ inviteStats.pending }}</text>
        <text class="label">待认证</text>
      </view>
      <view class="stat-item">
        <text class="value">{{ inviteStats.reward }} USDT</text>
        <text class="label">累计奖励</text>
      </view>
    </view>

    <!-- 邀请方式 -->
    <view class="invite-methods">
      <view class="method-item" @click="copyInviteCode">
        <image class="method-icon" src="/static/icons/invite/code.png" />
        <text class="method-name">邀请码</text>
        <text class="method-value">{{ inviteCode }}</text>
        <text class="copy-btn">复制</text>
      </view>
      <view class="method-item" @click="copyInviteLink">
        <image class="method-icon" src="/static/icons/invite/link.png" />
        <text class="method-name">邀请链接</text>
        <text class="method-value">{{ inviteLink }}</text>
        <text class="copy-btn">复制</text>
      </view>
    </view>

    <!-- 分享按钮 -->
    <button class="share-button" @click="showShareOptions">
      立即邀请
    </button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const inviteStats = ref({
  total: 0,
  pending: 0,
  reward: 0
})

const inviteCode = ref('UPay10001')
const inviteLink = ref('https://upay.com/i/UPay10001')

const goBack = () => {
  uni.navigateBack()
}

const copyInviteCode = () => {
  uni.setClipboardData({
    data: inviteCode.value,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success'
      })
    }
  })
}

const copyInviteLink = () => {
  uni.setClipboardData({
    data: inviteLink.value,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success'
      })
    }
  })
}

const showShareOptions = () => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
}
</script>

<style lang="scss">
.invite-friends-container {
  min-height: 100vh;
  background: #f5f7fa;
  
  .reward-section {
    background: linear-gradient(135deg, #1677ff, #0e5cd0);
    padding: 40rpx 30rpx;
    color: #fff;
    
    .reward-header {
      text-align: center;
      margin-bottom: 40rpx;
      
      .title {
        font-size: 36rpx;
        font-weight: 500;
        margin-bottom: 10rpx;
        display: block;
      }
      
      .subtitle {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }
    
    .reward-cards {
      display: flex;
      justify-content: space-between;
      
      .reward-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12rpx;
        padding: 30rpx;
        flex: 1;
        margin: 0 10rpx;
        text-align: center;
        
        .amount {
          font-size: 40rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
          display: block;
        }
        
        .desc {
          font-size: 24rpx;
          opacity: 0.8;
        }
      }
    }
  }
  
  .stats-section {
    background: #fff;
    display: flex;
    padding: 30rpx 0;
    margin-bottom: 20rpx;
    
    .stat-item {
      flex: 1;
      text-align: center;
      border-right: 1rpx solid #eee;
      
      &:last-child {
        border-right: none;
      }
      
      .value {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 8rpx;
        display: block;
      }
      
      .label {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
  
  .invite-methods {
    background: #fff;
    padding: 0 30rpx;
    
    .method-item {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 1rpx solid #eee;
      
      &:last-child {
        border-bottom: none;
      }
      
      .method-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
      
      .method-name {
        font-size: 28rpx;
        color: #333;
        margin-right: 20rpx;
      }
      
      .method-value {
        flex: 1;
        font-size: 28rpx;
        color: #666;
      }
      
      .copy-btn {
				// width: 100rpx;
        font-size: 28rpx;
        color: #1677ff;
        padding: 10rpx 20rpx;
      }
    }
  }
  
  .share-button {
    position: fixed;
    bottom: 40rpx;
    left: 30rpx;
    right: 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    background: #1677ff;
    color: #fff;
    font-size: 32rpx;
    border-radius: 45rpx;
    text-align: center;
    
    &:active {
      opacity: 0.9;
    }
  }
}
</style> 