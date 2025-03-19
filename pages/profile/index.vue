<template>
  <view class="profile-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="个人资料"
      :border="false"
      @clickLeft="goBack"
    />
    
    <!-- 用户资料列表 -->
    <view class="profile-list">
      <!-- 头像 -->
      <view class="profile-item" @click="changeAvatar">
        <text class="item-label">头像</text>
        <view class="item-content avatar-content">
          <image class="avatar" :src="userInfo.avatar || '/static/default-avatar.png'" mode="aspectFill" />
          <image class="arrow-icon" src="/static/icons/arrow-right.png" />
        </view>
      </view>
      
      <!-- 昵称 -->
      <view class="profile-item" @click="editNickname">
        <text class="item-label">昵称</text>
        <view class="item-content">
          <text class="item-value">{{ userInfo.nickname }}</text>
          <image class="arrow-icon" src="/static/icons/arrow-right.png" />
        </view>
      </view>
      
      <!-- 用户ID -->
      <view class="profile-item">
        <text class="item-label">用户ID</text>
        <view class="item-content">
          <text class="item-value">{{ userInfo.userId }}</text>
          <text class="copy-btn" @click="copyUserId">复制</text>
        </view>
      </view>
      
      <!-- 实名认证 -->
      <view class="profile-item" @click="goToVerification">
        <text class="item-label">实名认证</text>
        <view class="item-content">
          <text class="item-value" :class="userInfo.isVerified ? 'verified' : 'unverified'">
            {{ userInfo.isVerified ? '已认证' : '未认证' }}
          </text>
          <image class="arrow-icon" src="/static/icons/arrow-right.png" />
        </view>
      </view>
      
      <!-- 手机号码 -->
      <view class="profile-item" @click="editPhone">
        <text class="item-label">手机号码</text>
        <view class="item-content">
          <text class="item-value">{{ userInfo.phone || '未绑定' }}</text>
          <image class="arrow-icon" src="/static/icons/arrow-right.png" />
        </view>
      </view>
      
      <!-- 邮箱地址 -->
      <view class="profile-item" @click="editEmail">
        <text class="item-label">邮箱地址</text>
        <view class="item-content">
          <text class="item-value">{{ userInfo.email || '未绑定' }}</text>
          <image class="arrow-icon" src="/static/icons/arrow-right.png" />
        </view>
      </view>
      
      <!-- 谷歌验证 -->
      <view class="profile-item" @click="setupGoogle2FA">
        <text class="item-label">谷歌验证</text>
        <view class="item-content">
          <text class="item-value" :class="userInfo.hasGoogle2FA ? 'verified' : 'unverified'">
            {{ userInfo.hasGoogle2FA ? '已开启' : '未开启' }}
          </text>
          <image class="arrow-icon" src="/static/icons/arrow-right.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  avatar: '',
  nickname: 'DuPay User',
  userId: 'DP88888888',
  isVerified: false,
  phone: '',
  email: '',
  hasGoogle2FA: false
})

const goBack = () => {
  uni.navigateBack()
}

const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      // 处理头像上传逻辑
      console.log('Selected image:', res.tempFilePaths[0])
    }
  })
}

const editNickname = () => {
  uni.navigateTo({
    url: '/pages/mine/edit-nickname'
  })
}

const copyUserId = () => {
  uni.setClipboardData({
    data: userInfo.value.userId,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success'
      })
    }
  })
}

const goToVerification = () => {
  if (!userInfo.value.isVerified) {
    uni.navigateTo({
      url: '/pages/verification/index'
    })
  }
}

const editPhone = () => {
  uni.navigateTo({
    url: '/pages/mine/edit-phone'
  })
}

const editEmail = () => {
  uni.navigateTo({
    url: '/pages/mine/edit-email'
  })
}

const setupGoogle2FA = () => {
  uni.navigateTo({
    url: '/pages/security/google-auth'
  })
}
</script>

<style lang="scss">
.profile-container {
  min-height: 100vh;
  background: #f5f7fa;
  
  .profile-list {
    background: #fff;
    margin-top: 20rpx;
    
    .profile-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx;
      border-bottom: 1rpx solid #eee;
      
      &:last-child {
        border-bottom: none;
      }
      
      .item-label {
        font-size: 28rpx;
        color: #333;
      }
      
      .item-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        
        .avatar {
          width: 80rpx;
          height: 80rpx;
          border-radius: 40rpx;
          margin-right: 20rpx;
        }
        
        .item-value {
          font-size: 28rpx;
          color: #666;
          margin-right: 20rpx;
          
          &.verified {
            color: #52c41a;
          }
          
          &.unverified {
            color: #999;
          }
        }
        
        .copy-btn {
          font-size: 28rpx;
          color: #1677ff;
          padding: 10rpx 20rpx;
        }
        
        .arrow-icon {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
}
</style> 