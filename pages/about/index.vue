<template>
  <view class="about-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="关于我们"
			:border="false"
      @clickLeft="goBack"
    />
    <view class="about-content">
      <text class="about-text">我们是一个致力于提供优质服务的团队...</text>
    </view>
  </view>
</template>

<script setup>
const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.about-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f6fa, #e6e9f0);
  
  .about-content {
    padding: 20rpx 30rpx;
    
    .about-text {
      font-size: 28rpx;
      color: #333;
      line-height: 1.6;
    }
  }
}
</style> 