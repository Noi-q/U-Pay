<template>
  <view class="transfer-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="转账"
			:border="false"
      @clickLeft="goBack"
    />
    
    <view class="transfer-content">
      <!-- 选择币种 -->
      <view class="token-selector" @click="showTokenList">
        <view class="token-info">
          <image :src="selectedToken.icon" mode="aspectFit" />
          <view class="token-detail">
            <text class="symbol">{{ selectedToken.symbol }}</text>
            <text class="balance">可用余额: {{ selectedToken.balance }}</text>
          </view>
        </view>
				<uni-icons type="right" color="#999999" size="32rpx"></uni-icons>
      </view>
      
      <!-- 转账表单 -->
      <view class="transfer-form">
        <view class="form-item">
          <text class="label">收款方式</text>
          <view class="payment-tabs">
            <view 
              v-for="(tab, index) in paymentTabs" 
              :key="index"
              class="tab-item"
              :class="{ active: currentTab === index }"
              @click="switchTab(index)"
            >
              {{ tab }}
            </view>
          </view>
        </view>
        
        <view class="form-item">
          <text class="label">{{ currentTab === 0 ? '收款地址' : '收款账号' }}</text>
          <view class="address-input">
            <input 
              class="input" 
              v-model="receiverAddress"
              :placeholder="currentTab === 0 ? '请输入或长按粘贴收款地址' : '请输入收款账号'"
            />
						<!-- #ifdef APP -->
            <text class="scan-btn" v-if="currentTab === 0" @click="scanAddress">
							<uni-icons size="40rpx" type="scan"></uni-icons>
            </text>
						<!-- #endif -->
          </view>
        </view>
        
        <view class="form-item">
          <text class="label">转账数量</text>
          <view class="amount-input">
            <input 
              class="input" 
              type="number"
              v-model="amount"
              placeholder="请输入转账数量"
            />
            <text class="all" @click="setMaxAmount">全部</text>
          </view>
          <view class="amount-info">
            <text>手续费: {{ fee }} {{ selectedToken.symbol }}</text>
            <text>到账数量: {{ actualAmount }} {{ selectedToken.symbol }}</text>
          </view>
        </view>
        
        <view class="form-item">
          <text class="label">备注 (选填)</text>
          <input 
            class="input" 
            v-model="remark"
            placeholder="请输入转账备注"
            maxlength="50"
          />
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
      
      <!-- 转账说明 -->
      <view class="transfer-tips">
        <view class="tip-title">转账说明</view>
        <view class="tip-item" v-for="(tip, index) in tips" :key="index">
          {{ tip }}
        </view>
      </view>
      
      <!-- 转账按钮 -->
      <button 
        class="transfer-btn"
        :class="{ disabled: !isValid }"
        @click="handleTransfer"
      >
        确认转账
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
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const tokenPopup = ref(null)
const paymentTabs = ['链上转账', '平台转账']
const currentTab = ref(0)

const selectedToken = ref({
  symbol: 'USDT',
  icon: '/static/icons/tokens/usdt.png',
  balance: '1000.00'
})

const receiverAddress = ref('')
const amount = ref('')
const remark = ref('')
const verifyCode = ref('')
const counting = ref(false)
const counter = ref(60)

const tokens = ref([
  { symbol: 'USDT', icon: '/static/icons/tokens/usdt.png', balance: '1000.00' },
  { symbol: 'ETH', icon: '/static/icons/tokens/eth.png', balance: '1.5' },
  { symbol: 'BTC', icon: '/static/icons/tokens/btc.png', balance: '0.1' }
])

const tips = ref([
  '1. 链上转账将消耗矿工费，平台转账免手续费',
  '2. 请仔细核对收款地址，错误地址可能导致资产丢失',
  '3. 转账成功后将无法撤销',
  '4. 如遇到问题请联系在线客服'
])

// 手续费计算
const fee = computed(() => {
  if (!amount.value) return '0'
  return currentTab.value === 0 ? '1' : '0'
})

// 实际到账数量
const actualAmount = computed(() => {
  if (!amount.value) return '0'
  const value = parseFloat(amount.value)
  const feeValue = parseFloat(fee.value)
  return (value - feeValue).toFixed(2)
})

// 倒计时文本
const countText = computed(() => {
  return counting.value ? `${counter.value}s` : '获取验证码'
})

// 表单验证
const isValid = computed(() => {
  return receiverAddress.value &&
         amount.value &&
         parseFloat(amount.value) > 0 &&
         parseFloat(amount.value) <= parseFloat(selectedToken.value.balance) &&
         verifyCode.value.length === 6
})

// 切换支付方式
const switchTab = (index) => {
  currentTab.value = index
  receiverAddress.value = ''
}

// 扫描地址
const scanAddress = () => {
  uni.scanCode({
    success: (res) => {
      receiverAddress.value = res.result
    }
  })
}

// 设置最大金额
const setMaxAmount = () => {
  amount.value = selectedToken.value.balance
}

// 发送验证码
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

// 币种选择
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

// 确认转账
const handleTransfer = () => {
  if (!isValid.value) return
  
  uni.showModal({
    title: '确认转账',
    content: `确认转账 ${amount.value} ${selectedToken.value.symbol} 到 ${receiverAddress.value}？`,
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: '转账处理中'
        })
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: '转账成功',
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
.transfer-container {
  min-height: 100vh;
  background: #f5f6fa;
  
  .transfer-content {
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
    
    .transfer-form {
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
				}
				
				.payment-tabs{
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 10rpx;
					border-radius: 12rpx;
					.tab-item{
						text-align: center;
						flex: 1;
						padding: 20rpx 0;
						border-radius: 8rpx;
						background: #f8f9fb;
						color: #666;
						font-size: 28rpx;
						&.active{
							background: #007AFF;
							color: #fff;
						}
					}

				}
        
        .address-input {
          position: relative;
          width: 100%;
          
          .input {
            padding-right: 80rpx;
          }
          
          .scan-btn {
            position: absolute;
            right: 20rpx;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            
            image {
              width: 40rpx;
              height: 40rpx;
            }
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
    
    .transfer-tips {
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
    
    .transfer-btn {
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
  
  .token-list {
    max-height: 60vh;
    
    .token-item {
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
    }
  }
}
</style> 