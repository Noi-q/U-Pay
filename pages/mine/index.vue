<template>
  <view class="mine-container">
    <!-- 状态栏 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <image 
          class="avatar" 
          :src="userInfo.avatar || '/static/default-avatar.png'" 
          mode="aspectFill"
          @click="changeAvatar"
        />
        <view class="info-content">
          <view class="name-row">
            <text class="nickname">{{ userInfo.nickname || '未设置昵称' }}</text>
            <view class="level-tag">Lv{{ userInfo.level }}</view>
          </view>
          <view class="user-id">ID: {{ userInfo.userId }}</view>
        </view>
      </view>
      <view class="card-actions">
        <view class="action-item" @click="goToSetting">
					<uni-icons style="margin-bottom: 8rpx;" size="48rpx" color="#ffffff" type="settings"></uni-icons>
          <text>设置</text>
        </view>
				<!-- #ifdef APP -->
        <view class="action-item" @click="scanQRCode">
					<uni-icons style="margin-bottom: 8rpx;" size="48rpx" color="#ffffff" type="scan"></uni-icons>
          <text>扫一扫</text>
        </view>
				<!-- #endif -->
        <view class="action-item" @click="goToMessages">
          <uni-icons style="margin-bottom: 8rpx;" size="48rpx" color="#ffffff" type="chat"></uni-icons>
					<text>消息</text>
          <view v-if="hasUnread" class="badge"></view>
        </view>
      </view>
    </view>

    <!-- 资产卡片 -->
    <view class="asset-card">
      <view class="card-header">
        <text class="title">总资产 (USDT)</text>
        <view class="eye-btn" @click="toggleAssetVisibility">
          <image :src="showAsset ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'" mode="aspectFit" />
        </view>
      </view>
      <text class="asset-amount">{{ showAsset ? totalAsset : '******' }}</text>
      <view class="asset-actions">
        <view class="action-item" @click="goToDeposit">
          <image src="/static/icons/mine/deposit.png" mode="aspectFit" />
          <text>充值</text>
        </view>
        <view class="action-item" @click="goToWithdraw">
          <image src="/static/icons/mine/withdraw.png" mode="aspectFit" />
          <text>提现</text>
        </view>
        <view class="action-item" @click="goToTransfer">
          <image src="/static/icons/mine/transfer.png" mode="aspectFit" />
          <text>转账</text>
        </view>
        <view class="action-item" @click="goToRecord">
          <image src="/static/icons/mine/record.png" mode="aspectFit" />
          <text>记录</text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="function-list">
      <view class="list-section">
        <view class="list-item" @click="goToWallet">
          <view class="item-left">
						<!-- <uni-icons size="40rpx" type="wallet-filled"></uni-icons> -->
            <image src="/static/icons/mine/wallet.png" mode="aspectFit" />
            <text>我的资产</text>
          </view>
					<uni-icons size="32rpx" type="right"></uni-icons>
        </view>
        <view class="list-item" @click="goToCards">
          <view class="item-left">
            <image src="/static/icons/mine/cards.png" mode="aspectFit" />
            <text>我的卡券</text>
          </view>
					<uni-icons size="32rpx" type="right"></uni-icons>
        </view>
      </view>

      <view class="list-section">
        <view class="list-item" @click="goToSecurity">
          <view class="item-left">
            <image src="/static/icons/mine/security.png" mode="aspectFit" />
            <text>安全中心</text>
          </view>
					<uni-icons size="32rpx" type="right"></uni-icons>
        </view>
        <view class="list-item" @click="goToAuthentication">
          <view class="item-left">
            <image src="/static/icons/mine/authentication.png" mode="aspectFit" />
            <text>实名认证</text>
          </view>
          <view class="item-right">
            <text class="status" :class="userInfo.authStatus">{{ authStatusText }}</text>
            <uni-icons size="32rpx" type="right"></uni-icons>
          </view>
        </view>
      </view>

      <view class="list-section">
        <view class="list-item" @click="goToInvite">
          <view class="item-left">
            <image src="/static/icons/mine/invite.png" mode="aspectFit" />
            <text>邀请好友</text>
          </view>
					<uni-icons size="32rpx" type="right"></uni-icons>
        </view>
        <view class="list-item" @click="goToHelp">
          <view class="item-left">
            <image src="/static/icons/mine/help.png" mode="aspectFit" />
            <text>帮助中心</text>
          </view>
					<uni-icons size="32rpx" type="right"></uni-icons>
        </view>
        <view class="list-item" @click="goToAbout">
          <view class="item-left">
            <image src="/static/icons/mine/about.png" mode="aspectFit" />
            <text>关于我们</text>
          </view>
					<uni-icons size="32rpx" type="right"></uni-icons>
        </view>
      </view>
    </view>

    <view class="settings">
      <view class="setting-item" @tap="toggleTheme">
        <text>主题设置</text>
        <text>{{ appStore.theme === 'light' ? '浅色' : '深色' }}</text>
      </view>
      
      <view class="setting-item" @tap="handleLogout">
        <text>退出登录</text>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore, useAppStore } from '@/stores'
import { router } from '@/utils'

const userStore = useUserStore()
const appStore = useAppStore()

// 状态栏高度
const statusBarHeight = ref(0)

// 获取用户信息
const userInfo = userStore.userInfo

// 资产显示控制
const showAsset = ref(true)
const totalAsset = ref('125,678.90')
const hasUnread = ref(true)

// 认证状态文本
const authStatusText = computed(() => {
  const statusMap = {
    pending: '审核中',
    verified: '已认证',
    unverified: '未认证'
  }
  return statusMap[userInfo.value.authStatus]
})

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight
  
  // 获取用户信息
  getUserInfo()
})

// 方法
const getUserInfo = () => {
  // TODO: 获取用户信息
}

const toggleAssetVisibility = () => {
  showAsset.value = !showAsset.value
}

const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // TODO: 上传头像
      console.log('选择的图片：', res.tempFilePaths[0])
    }
  })
}

const scanQRCode = () => {
  uni.scanCode({
    success: (res) => {
      console.log('扫码结果：', res)
    }
  })
}

// 切换主题
const toggleTheme = () => {
  appStore.setTheme(appStore.theme === 'light' ? 'dark' : 'light')
}

// 退出登录
const handleLogout = () => {
  userStore.logout()
  router.reLaunch('/pages/login/index')
}

// 页面跳转方法
const goToSetting = () => uni.navigateTo({ url: '/pages/setting/index' })
const goToMessages = () => uni.navigateTo({ url: '/pages/notification/index' })
const goToDeposit = () => uni.navigateTo({ url: '/pages/deposit/index' })
const goToWithdraw = () => uni.navigateTo({ url: '/pages/withdraw/index' })
const goToTransfer = () => uni.navigateTo({ url: '/pages/transfer/index' })
const goToRecord = () => uni.navigateTo({ url: '/pages/transaction/history' })
const goToWallet = () => uni.navigateTo({ url: '/pages/property/index' })
const goToCards = () => uni.navigateTo({ url: '/pages/cards/index' })
const goToSecurity = () => uni.navigateTo({ url: '/pages/security/index' })
const goToAuthentication = () => uni.navigateTo({ url: '/pages/verification/index' })
const goToInvite = () => uni.navigateTo({ url: '/pages/invite-friends/index' })
const goToHelp = () => uni.navigateTo({ url: '/pages/help-center/index' })
const goToAbout = () => uni.navigateTo({ url: '/pages/about/index' })
</script>

<style lang="scss">
.mine-container {
  min-height: 100vh;
  background-color: #f5f6fa;
  
  .status-bar {
    background: linear-gradient(to right, #1677ff, #2b85e4);
  }
  
  .user-card {
    background: linear-gradient(to right, #1677ff, #2b85e4);
    padding: 30rpx;
    color: #fff;
    
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;
      
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
        border: 4rpx solid rgba(255, 255, 255, 0.3);
        margin-right: 30rpx;
      }
      
      .info-content {
        flex: 1;
        
        .name-row {
          display: flex;
          align-items: center;
          margin-bottom: 12rpx;
          
          .nickname {
            font-size: 36rpx;
            font-weight: 500;
            margin-right: 20rpx;
          }
          
          .level-tag {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 24rpx;
            padding: 4rpx 16rpx;
            font-size: 24rpx;
          }
        }
        
        .user-id {
          font-size: 26rpx;
          opacity: 0.8;
        }
      }
    }
    
    .card-actions {
      display: flex;
      justify-content: flex-end;
      
      .action-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 40rpx;
        
        image {
          width: 48rpx;
          height: 48rpx;
          margin-bottom: 8rpx;
        }
        
        text {
          font-size: 24rpx;
        }
        
        .badge {
          position: absolute;
          top: -6rpx;
          right: -6rpx;
          width: 16rpx;
          height: 16rpx;
          background: #ff4d4f;
          border-radius: 50%;
        }
      }
    }
  }
  
  .asset-card {
    margin: 30rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .title {
        font-size: 28rpx;
        color: #666;
      }
      
      .eye-btn {
        image {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    
    .asset-amount {
      font-size: 48rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 40rpx;
    }
    
    .asset-actions {
      display: flex;
      justify-content: space-around;
      border-top: 1rpx solid #f5f5f5;
      padding-top: 30rpx;
      
      .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        image {
          width: 56rpx;
          height: 56rpx;
          margin-bottom: 12rpx;
        }
        
        text {
          font-size: 26rpx;
          color: #333;
        }
      }
    }
  }
  
  .function-list {
    margin: 30rpx;
    
    .list-section {
      background: #fff;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      
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
            width: 40rpx;
            height: 40rpx;
            margin-right: 20rpx;
          }
          
          text {
            font-size: 28rpx;
            color: #333;
          }
        }
        
        .item-right {
          display: flex;
          align-items: center;
          
          .status {
            font-size: 26rpx;
            margin-right: 10rpx;
            
            &.pending {
              color: #faad14;
            }
            
            &.verified {
              color: #52c41a;
            }
            
            &.unverified {
              color: #999;
            }
          }
        }
        
        .arrow {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
  
  .settings {
    margin: 30rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    
    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      border-bottom: 1rpx solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      text {
        font-size: 28rpx;
        color: #333;
      }
    }
  }
}

// 适配 H5
/* #ifdef H5 */
.mine-container {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
/* #endif */

// 适配 iOS
/* #ifdef APP-PLUS */
.status-bar {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
/* #endif */
</style>