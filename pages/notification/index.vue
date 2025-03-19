<template>
  <view class="notification-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="消息通知"
			:border="false"
      @clickLeft="goBack"
    />
    
    <scroll-view scroll-y class="notification-list">
      <view v-if="notifications.length === 0" class="empty-state">
        <image src="/static/icons/empty.png" mode="aspectFit" />
        <text>暂无消息通知</text>
      </view>
      
      <view 
        v-else 
        v-for="(item, index) in notifications" 
        :key="index"
        class="notification-item"
        :class="{ unread: !item.read }"
        @click="readNotification(item)"
      >
        <view class="notification-icon">
          <image :src="item.icon" mode="aspectFit" />
        </view>
        <view class="notification-content">
          <view class="notification-header">
            <text class="title">{{ item.title }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
          <text class="message">{{ item.message }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([
  {
    id: 1,
    title: '充值成功通知',
    message: '您已成功充值 500 USDT',
    time: '2024-03-18 15:30',
    read: false,
    icon: '/static/icons/notification/deposit.png'
  },
  {
    id: 2,
    title: '系统通知',
    message: '系统将于今晚24点进行维护升级，期间服务可能短暂受影响',
    time: '2024-03-18 14:20',
    read: true,
    icon: '/static/icons/notification/system.png'
  }
])

const goBack = () => {
  uni.navigateBack()
}

const readNotification = (item) => {
  item.read = true
  // TODO: 调用接口更新消息状态
}
</script>

<style lang="scss">
.notification-container {
  min-height: 100vh;
  background: #f5f6fa;
  
  .notification-list {
    height: calc(100vh - 88rpx);
    padding: 20rpx;
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 200rpx 0;
      
      image {
        width: 200rpx;
        height: 200rpx;
        margin-bottom: 30rpx;
      }
      
      text {
        font-size: 28rpx;
        color: #999;
      }
    }
    
    .notification-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      
      &.unread {
        background: #f0f9ff;
        
        &::before {
          content: '';
          width: 12rpx;
          height: 12rpx;
          background: #1677ff;
          border-radius: 50%;
          position: absolute;
          right: 40rpx;
          margin-top: 10rpx;
        }
      }
      
      .notification-icon {
        margin-right: 20rpx;
        
        image {
          width: 80rpx;
          height: 80rpx;
        }
      }
      
      .notification-content {
        flex: 1;
        
        .notification-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16rpx;
          
          .title {
            font-size: 32rpx;
            font-weight: 500;
            color: #333;
          }
          
          .time {
            font-size: 24rpx;
            color: #999;
          }
        }
        
        .message {
          font-size: 28rpx;
          color: #666;
          line-height: 1.5;
        }
      }
    }
  }
}
</style> 