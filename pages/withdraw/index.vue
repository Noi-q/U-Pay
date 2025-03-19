<template>
  <view class="withdraw-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="提现"
			:border="false"
      @clickLeft="goBack"
    />
    
    <view class="withdraw-content">
      <!-- 选择币种 -->
      <view class="token-selector" @click="showTokenList">
        <view class="token-info">
          <image :src="selectedToken.icon" mode="aspectFit" />
          <view class="token-detail">
            <text class="symbol">{{ selectedToken.symbol }}</text>
            <text class="balance">可用余额: {{ selectedToken.balance }}</text>
          </view>
        </view>
				<uni-icons size="28rpx" color="#999999" type="right"></uni-icons>
      </view>
      
      <!-- 提现表单 -->
      <view class="withdraw-form">
        <view class="form-item">
          <text class="label">提现网络</text>
          <view class="network-selector" @click="showNetworkList">
            <text>{{ selectedNetwork.name }}</text>
						<uni-icons size="28rpx" color="#999999" type="right"></uni-icons>
          </view>
        </view>
        
        <view class="form-item">
          <text class="label">提现地址</text>
          <input 
            class="input" 
            v-model="withdrawAddress"
            placeholder="请输入或长按粘贴提现地址"
          />
        </view>
        
        <view class="form-item">
          <text class="label">提现数量</text>
          <view class="amount-input">
            <input 
              class="input" 
              type="number"
              v-model="amount"
              placeholder="请输入提现数量"
            />
            <text class="all" @click="setMaxAmount">全部</text>
          </view>
          <view class="amount-info">
            <text>手续费: {{ selectedNetwork.fee }}&nbsp;</text>
            <text>到账数量: {{ actualAmount }}</text>
          </view>
        </view>
        
        <view class="form-item">
          <text class="label">安全验证</text>
          <view class="verify-input">
            <input 
              class="input" 
              type="number"
              v-model="verifyCode"
              placeholder="请输入验证码"
              maxlength="6"
            />
            <text 
              class="send-code" 
              :class="{ disabled: counting }"
              @click="sendCode"
            >
              {{ countText }}
            </text>
          </view>
        </view>
      </view>
      
      <!-- 提现说明 -->
      <view class="withdraw-tips">
        <view class="tip-title">提现说明</view>
        <view class="tip-item" v-for="(tip, index) in tips" :key="index">
          {{ tip }}
        </view>
      </view>
      
      <!-- 提现按钮 -->
      <button 
        class="withdraw-btn"
        :class="{ disabled: !isValid }"
        @click="handleWithdraw"
      >
        确认提现
      </button>
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
            <view class="token-detail">
              <text class="symbol">{{ token.symbol }}</text>
              <text class="balance">可用余额: {{ token.balance }}</text>
            </view>
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
import { ref, computed } from 'vue'

const tokenPopup = ref(null)
const networkPopup = ref(null)

const selectedToken = ref({
  symbol: 'USDT',
  icon: '/static/icons/tokens/usdt.png',
  balance: '1000.00'
})

const selectedNetwork = ref({
  id: 1,
  name: 'TRC20',
  fee: '1 USDT'
})

const withdrawAddress = ref('')
const amount = ref('')
const verifyCode = ref('')
const counting = ref(false)
const counter = ref(60)

const tokens = ref([
  { symbol: 'USDT', icon: '/static/icons/tokens/usdt.png', balance: '1000.00' },
  { symbol: 'ETH', icon: '/static/icons/tokens/eth.png', balance: '1.5' },
  { symbol: 'BTC', icon: '/static/icons/tokens/btc.png', balance: '0.1' }
])

const networks = ref([
  { id: 1, name: 'TRC20', fee: '1 USDT' },
  { id: 2, name: 'ERC20', fee: '10 USDT' },
  { id: 3, name: 'BEP20', fee: '0.5 USDT' }
])

const tips = ref([
  '1. 请仔细核对提现地址，错误地址可能导致资产丢失',
  '2. 最小提现金额为 10 USDT',
  '3. 提现到账时间一般为 10-30 分钟',
  '4. 如遇到问题请联系在线客服'
])

const countText = computed(() => {
  return counting.value ? `${counter.value}s` : '获取验证码'
})

const actualAmount = computed(() => {
  if (!amount.value) return '0'
  const fee = parseFloat(selectedNetwork.value.fee)
  return (parseFloat(amount.value) - fee).toFixed(2)
})

const isValid = computed(() => {
  return withdrawAddress.value &&
         amount.value &&
         parseFloat(amount.value) >= 10 &&
         parseFloat(amount.value) <= parseFloat(selectedToken.value.balance) &&
         verifyCode.value.length === 6
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
}

const setMaxAmount = () => {
  amount.value = selectedToken.value.balance
}

const startCounter = () => {
  counting.value = true
  counter.value = 60
  const timer = setInterval(() => {
    counter.value--
    if (counter.value <= 0) {
      clearInterval(timer)
      counting.value = false
    }
  }, 1000)
}

const sendCode = () => {
  if (counting.value) return
  // TODO: 发送验证码
  startCounter()
}

const handleWithdraw = () => {
  if (!isValid.value) return
  uni.showModal({
    title: '确认提现',
    content: `确认提现 ${amount.value} ${selectedToken.value.symbol} 到地址 ${withdrawAddress.value}？`,
    success: (res) => {
      if (res.confirm) {
        // TODO: 提现逻辑
        uni.showLoading({
          title: '提现处理中'
        })
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: '提现申请已提交',
            icon: 'success'
          })
          uni.navigateBack()
        }, 2000)
      }
    }
  })
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.withdraw-container {
  min-height: 100vh;
  background: #f5f6fa;
  
  .withdraw-content {
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
        
        .token-detail {
          .symbol {
            font-size: 32rpx;
            font-weight: 500;
            display: block;
          }
          
          .balance {
            font-size: 24rpx;
            color: #999;
          }
        }
      }
      
      .arrow {
        color: #999;
        font-size: 32rpx;
      }
    }
    
    .withdraw-form {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 30rpx;
      
      .form-item {
        position: relative;
        width: 100%;
        margin-bottom: 30rpx;
        
        .input {
          box-sizing: border-box;
          width: 100%;
          height: 88rpx;
          background: #f8f9fb;
          border-radius: 8rpx;
          font-size: 28rpx;
          padding: 0 20rpx;
					margin-top: 20rpx;
        }
				.label{
					font-size: 28rpx;
					font-weight: 500;
					// margin-bottom: 20rpx;
				}
        .network-selector{
					margin-top: 20rpx;
					padding: 20rpx 30rpx;
					background: #f8f9fb;
					border-radius: 8rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					text{
						font-size: 28rpx;
						color: #666666;
						font-weight: 500;
					}
				}
        .amount-input {
          position: relative;
          width: 100%;
          
          .input {
            padding-right: 100rpx;
          }
          
          .all {
            position: absolute;
            right: 20rpx;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            color: #1677ff;
            font-size: 28rpx;
          }
        }
				.amount-info{
					margin-top: 10rpx;
					font-size: 25rpx;
				}
        
        .verify-input {
          position: relative;
          width: 100%;
          
          .input {
            padding-right: 180rpx;
          }
          
          .send-code {
            position: absolute;
            right: 20rpx;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            min-width: 160rpx;
            text-align: center;
            color: #1677ff;
            font-size: 28rpx;
            
            &.disabled {
              color: #999;
            }
          }
        }
      }
    }
    
    .withdraw-tips {
      background: #fff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 30rpx;
      
      .tip-title {
        font-size: 28rpx;
        font-weight: 500;
        margin-bottom: 20rpx;
      }
      
      .tip-item {
        font-size: 24rpx;
        color: #666;
        line-height: 1.6;
        margin-bottom: 10rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    
    .withdraw-btn {
      width: 100%;
      height: 88rpx;
      background: #1677ff;
      color: #fff;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      margin-top: 60rpx;
      
      &.disabled {
        background: #ccc;
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
      
      .token-detail {
        flex: 1;
        
        .symbol {
          font-size: 28rpx;
          font-weight: 500;
          display: block;
        }
        
        .balance {
          font-size: 24rpx;
          color: #999;
        }
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
</style> 