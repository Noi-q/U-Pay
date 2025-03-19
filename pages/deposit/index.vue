<template>
  <view class="deposit-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="充值"
			:border="false"
      @clickLeft="goBack"
    />
    
    <view class="deposit-content">
      <!-- 选择币种 -->
      <view class="token-selector" @click="showTokenList">
        <view class="token-info">
          <image :src="selectedToken.icon" mode="aspectFit" />
          <text>{{ selectedToken.symbol }}</text>
        </view>
				<uni-icons size="28rpx" color="#999999" type="right"></uni-icons>
      </view>
      
      <!-- 充值地址 -->
      <view class="address-card">
        <view class="card-header">
          <text class="title">充值地址</text>
          <view class="network-selector" @click="showNetworkList">
            <text>{{ selectedNetwork.name }}</text>
						<uni-icons size="28rpx" color="#999999" type="right"></uni-icons>
          </view>
        </view>
        
        <view class="address-content">
          <text class="address">{{ depositAddress }}</text>
          <view class="copy-btn" @click="copyAddress">复制</view>
        </view>
        
        <view class="qr-code">
					<l-qrcode style="width: 300rpx; height: 300rpx;" value="http://lime.qcoon.cn" />
        </view>
      </view>
      
      <!-- 充值说明 -->
      <view class="deposit-tips">
        <view class="tip-title">充值说明</view>
        <view class="tip-item" v-for="(tip, index) in tips" :key="index">
          {{ tip }}
        </view>
      </view>
    </view>
    
    <!-- 币种选择弹窗 -->
    <uni-popup ref="tokenPopup" type="bottom">
      <view class="popup-content">
        <view class="popup-header">
          <text>选择币种</text>
          <text class="close" @click="closeTokenPopup">×</text>
        </view>
        <scroll-view scroll-y class="token-list">
          <view 
            class="token-item"
            v-for="token in tokens"
            :key="token.symbol"
            @click="selectToken(token)"
          >
            <image :src="token.icon" mode="aspectFit" />
            <text>{{ token.symbol }}</text>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
    
    <!-- 网络选择弹窗 -->
    <uni-popup ref="networkPopup" type="bottom">
      <view class="popup-content">
        <view class="popup-header">
          <text>选择网络</text>
          <text class="close" @click="closeNetworkPopup">×</text>
        </view>
        <scroll-view scroll-y class="network-list">
          <view 
            class="network-item"
            v-for="network in networks"
            :key="network.id"
            @click="selectNetwork(network)"
          >
            <text>{{ network.name }}</text>
            <text class="fee">手续费: {{ network.fee }}</text>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onReady } from '@dcloudio/uni-app';


const tokenPopup = ref(null)
const networkPopup = ref(null)

const selectedToken = ref({
  symbol: 'USDT',
  icon: '/static/icons/tokens/usdt.png'
})

const selectedNetwork = ref({
  id: 1,
  name: 'TRC20',
  fee: '1 USDT'
})

const depositAddress = ref('TRx1234567890123456789012345678901234')

const tokens = ref([
  { symbol: 'USDT', icon: '/static/icons/tokens/usdt.png' },
  { symbol: 'ETH', icon: '/static/icons/tokens/eth.png' },
  { symbol: 'BTC', icon: '/static/icons/tokens/btc.png' }
])

const networks = ref([
  { id: 1, name: 'TRC20', fee: '1 USDT' },
  { id: 2, name: 'ERC20', fee: '10 USDT' },
  { id: 3, name: 'BEP20', fee: '0.5 USDT' }
])

const tips = ref([
  '1. 请确认您选择的网络正确，否则可能导致资产丢失',
  '2. 充值金额最小为 10 USDT',
  '3. 充值到账时间一般为 10-30 分钟',
  '4. 如遇到问题请联系在线客服'
])

const generateQRCode = () => {

}

onReady(() => {
  generateQRCode()
})

const showTokenList = () => {
  tokenPopup.value.open()
}

const closeTokenPopup = () => {
  tokenPopup.value.close()
}

const selectToken = (token) => {
  selectedToken.value = token
  closeTokenPopup()
}

const showNetworkList = () => {
  networkPopup.value.open()
}

const closeNetworkPopup = () => {
  networkPopup.value.close()
}

const selectNetwork = (network) => {
  selectedNetwork.value = network
  closeNetworkPopup()
  // TODO: 获取新的充值地址
}

const copyAddress = () => {
  uni.setClipboardData({
    data: depositAddress.value,
    success: () => {
      uni.showToast({
        title: '地址已复制',
        icon: 'success'
      })
    }
  })
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.deposit-container {
  min-height: 100vh;
  background: #f5f6fa;
  
  .deposit-content {
    padding: 30rpx;
    
    .token-selector {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      
      .token-info {
        display: flex;
        align-items: center;
        
        image {
          width: 60rpx;
          height: 60rpx;
          margin-right: 20rpx;
        }
        
        text {
          font-size: 32rpx;
          font-weight: 500;
        }
      }
      
      .arrow {
        color: #999;
        font-size: 32rpx;
      }
    }
    
    .address-card {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 30rpx;
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;
        
        .title {
          font-size: 32rpx;
          font-weight: 500;
        }
        
        .network-selector {
          display: flex;
          align-items: center;
          
          text {
            font-size: 28rpx;
            color: #666;
            
            &.arrow {
              margin-left: 10rpx;
              color: #999;
            }
          }
        }
      }
      
      .address-content {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        background: #f8f9fb;
        border-radius: 8rpx;
        padding: 20rpx;
        box-sizing: border-box;
        margin-bottom: 30rpx;
        
        .address {
          flex: 1;
          font-size: 28rpx;
          color: #333;
          margin-right: 20rpx;
          word-break: break-all;
        }
        
        .copy-btn {
          flex-shrink: 0;
          padding: 10rpx 30rpx;
          background: #1677ff;
          color: #fff;
          border-radius: 30rpx;
          font-size: 24rpx;
        }
      }
      
      .qr-code {
        display: flex;
        justify-content: center;
        padding: 30rpx 0;
      }
    }
    
    .deposit-tips {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      
      .tip-title {
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 20rpx;
      }
      
      .tip-item {
        font-size: 26rpx;
        color: #666;
        line-height: 1.6;
        margin-bottom: 10rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

.popup-content {
  background: #fff;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f5f5f5;
    
    text {
      font-size: 32rpx;
      
      &.close {
        color: #999;
        font-size: 40rpx;
      }
    }
  }
  
  .token-list, .network-list {
    max-height: 60vh;
    
    .token-item, .network-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #f5f5f5;
      
      image {
        width: 60rpx;
        height: 60rpx;
        margin-right: 20rpx;
      }
      
      text {
        font-size: 28rpx;
        
        &.fee {
          margin-left: auto;
          color: #999;
        }
      }
    }
  }
}

.search-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background: #f5f6fa;
  border-radius: 12rpx;
  padding: 20rpx;
  box-sizing: border-box;
  
  image {
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx;
    flex-shrink: 0;
  }
  
  input {
    flex: 1;
    font-size: 28rpx;
    min-width: 0;
  }
}
</style> 