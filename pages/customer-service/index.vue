<template>
  <view class="customer-service-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="客服中心"
			:border="false"
      @clickLeft="goBack"
    />
    <view class="service-content">
      <view class="service-item" @click="contactSupport('online')">
        <text>在线客服</text>
      </view>
      <view class="service-item" @click="contactSupport('phone')">
        <text>电话客服</text>
      </view>
      <view class="service-item" @click="contactSupport('email')">
        <text>邮件客服</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const goBack = () => {
  uni.navigateBack()
}

const contactSupport = (method) => {
  // 根据不同的联系方法进行处理
  console.log(`Contacting support via ${method}`)
}
</script>

<style lang="scss">
.customer-service-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f6fa, #e6e9f0);
  
  .service-content {
    padding: 20rpx 30rpx;
    
    .service-item {
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