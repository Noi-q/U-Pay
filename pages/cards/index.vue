<template>
  <view class="cards-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="我的卡券"
			:border="false"
      @clickLeft="goBack"
    />
    
    <!-- 卡券列表 -->
    <scroll-view class="coupon-list" scroll-y>
      <view 
        v-for="(coupon, index) in coupons" 
        :key="index"
        class="coupon-item"
        :class="coupon.status"
        @click="goToCouponDetail(coupon)"
      >
        <view class="coupon-info">
          <text class="name">{{ coupon.name }}</text>
          <text class="desc">{{ coupon.desc }}</text>
        </view>
        <view class="coupon-stats">
          <view class="stat-item">
            <text class="label">有效期至</text>
            <text class="value">{{ coupon.expiry }}</text>
          </view>
          <view class="stat-item">
            <text class="label">状态</text>
            <text class="value">{{ coupon.statusText }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const coupons = ref([
  {
    id: 1,
    name: '充值优惠券',
    desc: '充值满1000减50',
    expiry: '2024-12-31',
    status: 'active',
    statusText: '可用'
  },
  {
    id: 2,
    name: '提现优惠券',
    desc: '提现手续费减免',
    expiry: '2024-06-30',
    status: 'used',
    statusText: '已使用'
  },
  {
    id: 3,
    name: '理财优惠券',
    desc: '理财收益加成',
    expiry: '2024-03-31',
    status: 'expired',
    statusText: '已过期'
  }
])

const goToCouponDetail = (coupon) => {
  uni.navigateTo({
    url: `/pages/cards/detail?id=${coupon.id}`
  })
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.cards-container {
  min-height: 100vh;
  background: #f5f6fa;
  
  .coupon-list {
    padding: 20rpx 30rpx;
    box-sizing: border-box; // 确保内边距不会导致溢出
    
    .coupon-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      box-sizing: border-box; // 确保内边距不会导致溢出
      
      &.active {
        border-left: 8rpx solid #52c41a;
      }
      
      &.used {
        border-left: 8rpx solid #faad14;
      }
      
      &.expired {
        border-left: 8rpx solid #ff4d4f;
      }
      
      .coupon-info {
        margin-bottom: 20rpx;
        
        .name {
          font-size: 32rpx;
          font-weight: 500;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .desc {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .coupon-stats {
        display: flex;
        justify-content: space-between;
        
        .stat-item {
          text-align: center;
          
          .label {
            font-size: 24rpx;
            color: #999;
            margin-bottom: 8rpx;
            display: block;
          }
          
          .value {
            font-size: 28rpx;
            font-weight: 500;
            color: #333;
          }
        }
      }
    }
  }
}
</style> 