<template>
  <view class="wallet-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="我的资产"
			:border="false"
      @clickLeft="goBack"
    />
    
    <!-- 资产总览 -->
    <view class="asset-overview">
      <view class="total-asset">
        <text class="label">总资产折合 (USDT)</text>
        <view class="amount-row">
          <text class="amount">{{ showAsset ? totalAsset : '******' }}</text>
          <view class="eye-btn" @click="toggleAssetVisibility">
            <image :src="showAsset ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>

    <!-- 币种列表 -->
    <view class="token-list">
      <view 
        class="token-item"
        v-for="token in tokens"
        :key="token.symbol"
        @click="goToTokenDetail(token)"
      >
        <view class="token-info">
          <image :src="token.icon" mode="aspectFit" class="token-icon" />
          <view class="token-detail">
            <text class="symbol">{{ token.symbol }}</text>
            <text class="chain">{{ token.chain }}</text>
          </view>
        </view>
        <view class="token-balance">
          <text class="balance">{{ showAsset ? token.balance : '******' }}</text>
          <text class="value">≈ ${{ showAsset ? token.value : '******' }}</text>
        </view>
      </view>
    </view>

    <!-- 底部按钮组 -->
    <view class="bottom-actions">
      <view class="action-btn deposit" @click="goToDeposit">充值</view>
      <view class="action-btn withdraw" @click="goToWithdraw">提现</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showAsset = ref(true)
const totalAsset = ref('125,678.90')

const tokens = ref([
  {
    symbol: 'USDT',
    chain: 'TRC20',
    icon: '/static/icons/tokens/usdt.png',
    balance: '50,000.00',
    value: '50,000.00'
  },
  {
    symbol: 'ETH',
    chain: 'ERC20',
    icon: '/static/icons/tokens/eth.png',
    balance: '30.5000',
    value: '45,750.00'
  },
  {
    symbol: 'BTC',
    chain: 'BTC',
    icon: '/static/icons/tokens/btc.png',
    balance: '1.2500',
    value: '29,928.90'
  }
])

const toggleAssetVisibility = () => {
  showAsset.value = !showAsset.value
}

const goBack = () => {
  uni.navigateBack()
}

const goToTokenDetail = (token) => {
  uni.navigateTo({
    url: `/pages/token-detail/index?symbol=${token.symbol}`
  })
}

const goToDeposit = () => {
  uni.navigateTo({
    url: '/pages/deposit/index'
  })
}

const goToWithdraw = () => {
  uni.navigateTo({
    url: '/pages/withdraw/index'
  })
}
</script>

<style lang="scss">
.wallet-container {
  min-height: 100vh;
  background: #f5f6fa;
  padding-bottom: 180rpx;
  
  .asset-overview {
    background: linear-gradient(to right, #1677ff, #2b85e4);
    padding: 40rpx 30rpx;
    color: #fff;
    
    .total-asset {
      .label {
        font-size: 28rpx;
        opacity: 0.9;
      }
      
      .amount-row {
        display: flex;
        align-items: center;
        margin-top: 20rpx;
        
        .amount {
          font-size: 48rpx;
          font-weight: 600;
          margin-right: 20rpx;
        }
        
        .eye-btn {
          image {
            width: 40rpx;
            height: 40rpx;
          }
        }
      }
    }
  }
  
  .token-list {
    padding: 20rpx 30rpx;
    
    .token-item {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .token-info {
        display: flex;
        align-items: center;
        
        .token-icon {
          width: 80rpx;
          height: 80rpx;
          margin-right: 20rpx;
        }
        
        .token-detail {
          .symbol {
            font-size: 32rpx;
            font-weight: 500;
            color: #333;
            display: block;
          }
          
          .chain {
            font-size: 24rpx;
            color: #999;
            margin-top: 8rpx;
          }
        }
      }
      
      .token-balance {
        text-align: right;
        
        .balance {
          font-size: 32rpx;
          font-weight: 500;
          color: #333;
          display: block;
        }
        
        .value {
          font-size: 24rpx;
          color: #999;
          margin-top: 8rpx;
          display: block;
        }
      }
    }
  }
  
  .bottom-actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 20rpx 30rpx;
    background: #fff;
    box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
    
    .action-btn {
      flex: 1;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      border-radius: 44rpx;
      font-size: 32rpx;
      margin: 0 10rpx;
      
      &.deposit {
        background: #1677ff;
        color: #fff;
      }
      
      &.withdraw {
        background: #fff;
        color: #1677ff;
        border: 2rpx solid #1677ff;
      }
    }
  }
}
</style> 