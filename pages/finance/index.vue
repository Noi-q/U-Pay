<template>
  <view class="finance-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="理财产品"
			:border="false"
      @clickLeft="goBack"
    />
    
    <!-- 理财产品列表 -->
    <scroll-view class="product-list" scroll-y>
      <view 
        v-for="(product, index) in products" 
        :key="index"
        class="product-item"
        @click="goToProductDetail(product)"
      >
        <view class="product-info">
          <text class="name">{{ product.name }}</text>
          <text class="desc">{{ product.desc }}</text>
        </view>
        <view class="product-stats">
          <view class="stat-item">
            <text class="label">年化收益率</text>
            <text class="value">{{ product.rate }}%</text>
          </view>
          <view class="stat-item">
            <text class="label">投资期限</text>
            <text class="value">{{ product.term }}天</text>
          </view>
          <view class="stat-item">
            <text class="label">起投金额</text>
            <text class="value">{{ product.minAmount }} USDT</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: '稳健理财',
    desc: '低风险，稳定收益',
    rate: 5.0,
    term: 30,
    minAmount: 100
  },
  {
    id: 2,
    name: '进取理财',
    desc: '中风险，较高收益',
    rate: 8.5,
    term: 90,
    minAmount: 500
  },
  {
    id: 3,
    name: '高收益理财',
    desc: '高风险，高收益',
    rate: 12.0,
    term: 180,
    minAmount: 1000
  }
])

const goToProductDetail = (product) => {
  uni.navigateTo({
    url: `/pages/finance/detail?id=${product.id}`
  })
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.finance-container {
  min-height: 100vh;
  background: #f5f6fa;
  
  .product-list {
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    
    .product-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      
      .product-info {
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
      
      .product-stats {
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