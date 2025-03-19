<template>
  <view class="swap-container">
    <!-- 顶部导航 -->
    <view class="nav-tabs">
      <view 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @click="switchTab(index)"
      >
        {{ tab }}
      </view>
    </view>

    <!-- 交易卡片 -->
    <view class="swap-card">
      <!-- From 代币选择 -->
      <view class="token-input-box">
        <view class="token-amount">
          <input 
            type="number" 
            v-model="fromAmount"
            placeholder="0.0"
            @input="handleFromAmountChange"
          />
          <text class="balance">余额: {{ fromBalance }}</text>
        </view>
        <view class="token-select" @click="openTokenList('from')">
          <image class="token-icon" :src="fromToken.icon" mode="aspectFit" />
          <text class="token-symbol">{{ fromToken.symbol }}</text>
          <text class="select-arrow">▼</text>
        </view>
      </view>

      <!-- 交换按钮 -->
      <view class="swap-icon" @click="switchTokens">
        <image src="/static/icons/swap-arrow.png" mode="aspectFit" />
      </view>

      <!-- To 代币选择 -->
      <view class="token-input-box">
        <view class="token-amount">
          <input 
            type="number" 
            v-model="toAmount"
            placeholder="0.0"
            disabled
          />
          <text class="balance">余额: {{ toBalance }}</text>
        </view>
        <view class="token-select" @click="openTokenList('to')">
          <image class="token-icon" :src="toToken.icon" mode="aspectFit" />
          <text class="token-symbol">{{ toToken.symbol }}</text>
          <text class="select-arrow">▼</text>
        </view>
      </view>

      <!-- 交易详情 -->
      <view class="swap-details">
        <view class="detail-item">
          <text>兑换率</text>
          <text>1 {{ fromToken.symbol }} ≈ {{ exchangeRate }} {{ toToken.symbol }}</text>
        </view>
        <view class="detail-item">
          <text>手续费</text>
          <text>{{ fee }} {{ fromToken.symbol }}</text>
        </view>
        <view class="detail-item">
          <text>最小收到</text>
          <text>{{ minReceived }} {{ toToken.symbol }}</text>
        </view>
      </view>

      <!-- 确认按钮 -->
      <button 
        class="confirm-btn"
        :class="{ disabled: !isValid }"
        @click="handleSwap"
      >
        {{ confirmButtonText }}
      </button>
    </view>

    <!-- 底部提示 -->
    <view class="bottom-tips">
      <image src="/static/icons/safe.png" mode="aspectFit" />
      <text>由 TokenPocket 提供安全可靠的闪兑服务</text>
    </view>
  </view>

  <!-- 代币选择弹窗 -->
  <uni-popup ref="tokenPopup" type="bottom">
    <view class="token-list-popup">
      <view class="popup-header">
        <text class="title">选择代币</text>
        <text class="close" @click="closeTokenList">×</text>
      </view>
      <view class="search-box">
				<uni-icons size="32rpx" type="search"></uni-icons>
        <!-- <image src="/static/icons/search.png" mode="aspectFit" /> -->
        <input 
          type="text"
          v-model="searchKey"
          placeholder="搜索代币名称或合约地址"
        />
      </view>
      <scroll-view class="token-list" scroll-y>
        <view 
          v-for="token in filteredTokens" 
          :key="token.symbol"
          class="token-item"
          @click="selectToken(token)"
        >
          <image class="token-icon" :src="token.icon" mode="aspectFit" />
          <view class="token-info">
            <text class="symbol">{{ token.symbol }}</text>
            <text class="name">{{ token.name }}</text>
          </view>
          <text class="balance">{{ token.balance }}</text>
        </view>
      </scroll-view>
    </view>
  </uni-popup>
</template>

<script setup>
import { ref, computed } from 'vue'

// 标签页配置
const tabs = ['闪兑', '跨链']
const currentTab = ref(0)

// 代币数据
const fromToken = ref({
  symbol: 'ETH',
  name: 'Ethereum',
  icon: '/static/icons/tokens/eth.png',
  balance: '0.5',
  decimals: 18
})

const toToken = ref({
  symbol: 'USDT',
  name: 'Tether USD',
  icon: '/static/icons/tokens/usdt.png',
  balance: '1000.00',
  decimals: 6
})

// 输入金额
const fromAmount = ref('')
const toAmount = ref('')

// 计算属性
const fromBalance = computed(() => `${fromToken.value.balance} ${fromToken.value.symbol}`)
const toBalance = computed(() => `${toToken.value.balance} ${toToken.value.symbol}`)
const exchangeRate = ref('1850.65')
const fee = computed(() => fromAmount.value ? (Number(fromAmount.value) * 0.003).toFixed(6) : '0')
const minReceived = computed(() => {
  if (!fromAmount.value) return '0'
  const amount = Number(fromAmount.value) * Number(exchangeRate.value)
  return (amount - amount * 0.005).toFixed(6)
})

const isValid = computed(() => {
  return fromAmount.value && 
         Number(fromAmount.value) > 0 && 
         Number(fromAmount.value) <= Number(fromToken.value.balance)
})

const confirmButtonText = computed(() => {
  if (!fromAmount.value) return '输入金额'
  if (Number(fromAmount.value) > Number(fromToken.value.balance)) return '余额不足'
  return '确认兑换'
})

// 代币列表
const tokenList = ref([
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '/static/icons/tokens/eth.png',
    balance: '0.5'
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    icon: '/static/icons/tokens/usdt.png',
    balance: '1000.00'
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: '/static/icons/tokens/bnb.png',
    balance: '2.5'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '/static/icons/tokens/usdc.png',
    balance: '500.00'
  }
])

// 搜索相关
const searchKey = ref('')
const filteredTokens = computed(() => {
  if (!searchKey.value) return tokenList.value
  const key = searchKey.value.toLowerCase()
  return tokenList.value.filter(token => 
    token.symbol.toLowerCase().includes(key) || 
    token.name.toLowerCase().includes(key)
  )
})

// 方法
const switchTab = (index) => {
  currentTab.value = index
}

const handleFromAmountChange = () => {
  if (!fromAmount.value) {
    toAmount.value = ''
    return
  }
  toAmount.value = (Number(fromAmount.value) * Number(exchangeRate.value)).toFixed(6)
}

const switchTokens = () => {
  const temp = { ...fromToken.value }
  fromToken.value = { ...toToken.value }
  toToken.value = temp
  fromAmount.value = ''
  toAmount.value = ''
}

// Token 选择相关
const tokenPopup = ref(null)
const selectingType = ref('') // 'from' or 'to'

const openTokenList = (type) => {
  selectingType.value = type
  tokenPopup.value.open()
}

const closeTokenList = () => {
  tokenPopup.value.close()
  searchKey.value = ''
}

const selectToken = (token) => {
  if (selectingType.value === 'from') {
    if (token.symbol === toToken.value.symbol) {
      switchTokens()
    } else {
      fromToken.value = { ...token }
    }
  } else {
    if (token.symbol === fromToken.value.symbol) {
      switchTokens()
    } else {
      toToken.value = { ...token }
    }
  }
  closeTokenList()
}

const handleSwap = () => {
  if (!isValid.value) return
  // TODO: 实现兑换逻辑
  uni.showLoading({
    title: '交易处理中'
  })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '兑换成功',
      icon: 'success'
    })
  }, 2000)
}
</script>

<style lang="scss">
.swap-container {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx;
  
  .nav-tabs {
    display: flex;
    background: #fff;
    border-radius: 12rpx;
    padding: 10rpx;
    margin-bottom: 20rpx;
    
    .tab-item {
      flex: 1;
      text-align: center;
      padding: 20rpx 0;
      font-size: 28rpx;
      color: #666;
      border-radius: 8rpx;
      
      &.active {
        background: #007AFF;
        color: #fff;
      }
    }
  }
  
  .swap-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    
    .token-input-box {
      position: relative;
      width: 100%;
      background: #f8f9fb;
      border-radius: 16rpx;
      padding: 20rpx;
      box-sizing: border-box;
      
      .token-amount {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        input {
          box-sizing: border-box;
          width: 70%;
          font-size: 36rpx;
          font-weight: 500;
          padding: 0 20rpx;
        }
        
        .balance {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .token-select {
        display: flex;
        align-items: center;
        
        .token-icon {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
        }
        
        .token-symbol {
          font-size: 28rpx;
          font-weight: 500;
          margin-right: 10rpx;
        }
        
        .select-arrow {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
    
    .swap-icon {
      display: flex;
      justify-content: center;
      margin: 20rpx 0;
      
      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
    
    .swap-details {
      margin: 30rpx 0;
      
      .detail-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16rpx;
        font-size: 26rpx;
        color: #666;
      }
    }
    
    .confirm-btn {
      width: 100%;
      height: 88rpx;
      background: #007AFF;
      color: #fff;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      
      &.disabled {
        background: #ccc;
      }
    }
  }
  
  .bottom-tips {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30rpx;
    
    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 10rpx;
    }
    
    text {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.token-list-popup {
  background: #fff;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 30rpx;
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .title {
      font-size: 32rpx;
      font-weight: 500;
    }
    
    .close {
      font-size: 40rpx;
      color: #999;
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
      box-sizing: border-box;
      flex: 1;
      font-size: 28rpx;
      min-width: 0;
      padding: 0 20rpx;
    }
  }
  
  .token-list {
    max-height: 60vh;
    
    .token-item {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1px solid #f5f6fa;
      
      .token-icon {
        width: 60rpx;
        height: 60rpx;
        margin-right: 20rpx;
      }
      
      .token-info {
        flex: 1;
        
        .symbol {
          font-size: 28rpx;
          font-weight: 500;
        }
        
        .name {
          font-size: 24rpx;
          color: #999;
					margin-left: 5rpx;
        }
      }
      
      .balance {
        font-size: 28rpx;
        color: #666;
      }
    }
  }
}
</style> 