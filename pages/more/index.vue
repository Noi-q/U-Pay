<template>
  <view class="more-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="更多"
			:border="false"
      @clickLeft="goBack"
    />
    <view class="more-content">
      <view class="more-item" @click="navigateTo('settings')">
        <text>设置</text>
      </view>
      <view class="more-item" @click="navigateTo('about')">
        <text>关于我们</text>
      </view>
      <view class="more-item" @click="navigateTo('help')">
        <text>帮助中心</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const goBack = () => {
  uni.navigateBack()
}

const navigateTo = (page) => {
  uni.navigateTo({
    url: `/pages/${page}/index`
  })
}
</script>

<style lang="scss">
.more-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f6fa, #e6e9f0);
  
  .more-content {
    padding: 20rpx 30rpx;
    
    .more-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
      text-align: center;
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