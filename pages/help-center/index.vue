<template>
  <view class="help-center-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
			:border="false"
      title="帮助中心"
      @clickLeft="goBack"
    />
    <view class="help-content">
      <view class="help-item" v-for="(item, index) in helpTopics" :key="index" @click="goToHelpDetail(item)">
        <text>{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const helpTopics = ref([
  { id: 1, title: '如何注册账号' },
  { id: 2, title: '如何充值' },
  { id: 3, title: '如何提现' }
])

const goBack = () => {
  uni.navigateBack()
}

const goToHelpDetail = (item) => {
  uni.navigateTo({
    url: `/pages/help-center/detail?id=${item.id}`
  })
}
</script>

<style lang="scss">
.help-center-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f6fa, #e6e9f0);
  
  .help-content {
    padding: 20rpx 30rpx;
    
    .help-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
      font-size: 28rpx;
      color: #333;
      transition: transform 0.2s;
      
      &:hover {
        transform: translateY(-5rpx);
        box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.15);
      }
    }
  }
}
</style> 