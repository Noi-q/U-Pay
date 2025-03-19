<template>
  <view class="card-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="none"
      title="我的卡片"
			:border="false"
    />
    
    <!-- 卡片轮播 -->
    <swiper
      class="card-swiper"
      :current="currentCardIndex"
      @change="handleCardChange"
      :indicator-dots="cards.length > 1"
      indicator-color="rgba(255, 255, 255, 0.3)"
      indicator-active-color="#fff"
    >
      <swiper-item 
        v-for="(card, index) in cards" 
        :key="card.id"
        class="card-item"
      >
        <view class="virtual-card" :class="card.type.toLowerCase()">
          <view class="card-header">
            <image :src="card.logo" mode="aspectFit" class="card-logo" />
            <text class="card-status" :class="card.status">{{ card.statusText }}</text>
          </view>
          
          <view class="card-info">
            <text class="card-number">{{ showCardInfo ? formatCardNumber(card.number) : '****  ****  ****  ' + card.number.slice(-4) }}</text>
            <view class="info-row">
              <view class="info-item">
                <text class="label">持卡人</text>
                <text class="value">{{ showCardInfo ? card.holder : '****' }}</text>
              </view>
              <view class="info-item">
                <text class="label">有效期</text>
                <text class="value">{{ showCardInfo ? card.expiry : '**/**' }}</text>
              </view>
              <view class="info-item">
                <text class="label">CVV</text>
                <text class="value">{{ showCardInfo ? card.cvv : '***' }}</text>
              </view>
            </view>
          </view>
          
          <view class="card-balance">
            <text class="label">可用余额</text>
            <view class="amount-row">
              <text class="currency">$</text>
              <text class="amount">{{ showCardInfo ? card.balance : '*****' }}</text>
              <view class="eye-btn" @click="toggleCardInfo">
                <image :src="showCardInfo ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'" mode="aspectFit" />
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <!-- 快捷操作 -->
    <view class="quick-actions">
      <view class="action-item" @click="handleDeposit">
        <image src="/static/icons/card/deposit.png" mode="aspectFit" />
        <text>充值</text>
      </view>
      <view class="action-item" @click="handleWithdraw">
        <image src="/static/icons/card/withdraw.png" mode="aspectFit" />
        <text>提现</text>
      </view>
      <view class="action-item" @click="handleFreeze">
        <image src="/static/icons/card/freeze.png" mode="aspectFit" />
        <text>{{ currentCard.frozen ? '解冻' : '冻结' }}</text>
      </view>
      <view class="action-item" @click="showCardDetails">
        <image src="/static/icons/card/wallet.png" mode="aspectFit" />
        <text>钱包</text>
      </view>
    </view>

    <!-- 交易记录 -->
    <view class="transaction-section">
      <view class="section-header">
        <text class="title">交易记录</text>
        <text class="more" @click="goToTransactionHistory">查看全部</text>
      </view>
      
      <view class="transaction-list">
        <view 
          v-for="(item, index) in transactions" 
          :key="index"
          class="transaction-item"
          @click="showTransactionDetail(item)"
        >
          <view class="left">
            <image :src="item.icon" mode="aspectFit" />
            <view class="info">
              <text class="merchant">{{ item.merchant }}</text>
              <text class="time">{{ item.time }}</text>
            </view>
          </view>
          <view class="right">
            <text class="amount" :class="item.type">{{ item.amount }}</text>
            <text class="status" :class="item.status">{{ item.statusText }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 授权记录 -->
    <view class="auth-section">
      <view class="section-header">
        <text class="title">授权记录</text>
        <text class="more" @click="goToAuthHistory">查看全部</text>
      </view>
      
      <view class="auth-list">
        <view 
          v-for="(item, index) in authorizations" 
          :key="index"
          class="auth-item"
          @click="showAuthDetail(item)"
        >
          <view class="left">
            <image :src="item.icon" mode="aspectFit" />
            <view class="info">
              <text class="merchant">{{ item.merchant }}</text>
              <text class="time">{{ item.time }}</text>
            </view>
          </view>
          <view class="right">
            <text class="amount">${{ item.amount }}</text>
            <text class="status" :class="item.status">{{ item.statusText }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 卡片信息显示控制
const showCardInfo = ref(false)
const currentCardIndex = ref(0)

// 卡片数据
const cards = ref([
  {
    id: 1,
    type: 'VISA',
    logo: '/static/icons/card/visa.png',
    number: '4532015112830456',
    holder: 'ZHANG SAN',
    expiry: '12/25',
    cvv: '123',
    balance: '5,000.00',
    status: 'active',
    statusText: '正常',
    frozen: false
  },
  {
    id: 2,
    type: 'MASTERCARD',
    logo: '/static/icons/card/mastercard.png',
    number: '5436728112830456',
    holder: 'ZHANG SAN',
    expiry: '06/26',
    cvv: '456',
    balance: '3,500.00',
    status: 'active',
    statusText: '正常',
    frozen: false
  }
])

// 当前卡片
const currentCard = computed(() => cards.value[currentCardIndex.value])

// 交易记录
const transactions = ref([
  {
    merchant: 'Amazon.com',
    time: '2024-03-18 15:30',
    amount: '-$99.99',
    type: 'expense',
    status: 'success',
    statusText: '已完成',
    icon: '/static/icons/card/shopping.png'
  },
  {
    merchant: 'Card Deposit',
    time: '2024-03-18 14:20',
    amount: '+$1,000.00',
    type: 'income',
    status: 'success',
    statusText: '已完成',
    icon: '/static/icons/card/deposit.png'
  }
])

// 授权记录
const authorizations = ref([
  {
    merchant: 'Netflix',
    time: '2024-03-18 13:15',
    amount: '15.99',
    status: 'pending',
    statusText: '待确认',
    icon: '/static/icons/card/subscription.png'
  },
  {
    merchant: 'Spotify',
    time: '2024-03-18 12:00',
    amount: '9.99',
    status: 'success',
    statusText: '已授权',
    icon: '/static/icons/card/subscription.png'
  }
])

// 方法
const formatCardNumber = (number) => {
  return number.match(/.{1,4}/g).join('  ')
}

const toggleCardInfo = () => {
  showCardInfo.value = !showCardInfo.value
}

const handleCardChange = (e) => {
  currentCardIndex.value = e.detail.current
}

const handleDeposit = () => {
  uni.navigateTo({
    url: `/pages/card/deposit?id=${currentCard.value.id}`
  })
}

const handleWithdraw = () => {
  uni.navigateTo({
    url: `/pages/card/withdraw?id=${currentCard.value.id}`
  })
}

const handleFreeze = () => {
  uni.showModal({
    title: '提示',
    content: `确认${currentCard.value.frozen ? '解冻' : '冻结'}该卡片？`,
    success: (res) => {
      if (res.confirm) {
        // TODO: 调用冻结/解冻接口
        currentCard.value.frozen = !currentCard.value.frozen
      }
    }
  })
}

const showCardDetails = () => {
  uni.navigateTo({
    url: `/pages/other-wallet/index`
  })
}

const showTransactionDetail = (item) => {
  uni.navigateTo({
    url: `/pages/card/transaction-detail?id=${item.id}`
  })
}

const showAuthDetail = (item) => {
  uni.navigateTo({
    url: `/pages/card/auth-detail?id=${item.id}`
  })
}

const goToTransactionHistory = () => {
  uni.navigateTo({
    url: `/pages/card/transaction-history?id=${currentCard.value.id}`
  })
}

const goToAuthHistory = () => {
  uni.navigateTo({
    url: `/pages/card/auth-history?id=${currentCard.value.id}`
  })
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.card-container {
  min-height: 100vh;
  background: #f5f6fa;
  
  .card-swiper {
    width: 100%;
    height: 460rpx;
    padding: 30rpx;
    box-sizing: border-box;
    
    .card-item {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 4rpx;
    }
  }
  
  .virtual-card {
    height: 100%;
    border-radius: 20rpx;
    padding: 30rpx;
    color: #fff;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    
    &.visa {
      background: linear-gradient(135deg, #1677ff, #2b85e4);
    }
    
    &.mastercard {
      background: linear-gradient(135deg, #ff4d4f, #ff7875);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;
      
      .card-logo {
        height: 60rpx;
        width: 100rpx;
      }
      
      .card-status {
        font-size: 24rpx;
        padding: 4rpx 16rpx;
        border-radius: 20rpx;
        background: rgba(255, 255, 255, 0.2);
        
        &.frozen {
          background: rgba(255, 77, 79, 0.2);
        }
      }
    }
    
    .card-info {
      
      .card-number {
        font-size: 36rpx;
        letter-spacing: 2rpx;
        margin-bottom: 30rpx;
        display: block;
      }
      
      .info-row {
        display: flex;
        justify-content: space-between;
        
        .info-item {
          .label {
            font-size: 24rpx;
            opacity: 0.8;
            display: block;
            margin-bottom: 8rpx;
          }
          
          .value {
            font-size: 28rpx;
          }
        }
      }
    }
    
    .card-balance {
      .label {
        font-size: 24rpx;
        opacity: 0.8;
        display: block;
        margin-bottom: 8rpx;
      }
      
      .amount-row {
        display: flex;
        align-items: center;
        
        .currency {
          font-size: 32rpx;
          margin-right: 8rpx;
        }
        
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
  
  .quick-actions {
    display: flex;
    justify-content: space-around;
    background: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      image {
        width: 56rpx;
        height: 56rpx;
        margin-bottom: 12rpx;
      }
      
      text {
        font-size: 26rpx;
        color: #333;
      }
    }
  }
  
  .transaction-section,
  .auth-section {
    background: #fff;
    margin-bottom: 20rpx;
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #f5f5f5;
      
      .title {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
      }
      
      .more {
        font-size: 26rpx;
        color: #999;
      }
    }
    
    .transaction-list,
    .auth-list {
      .transaction-item,
      .auth-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx;
        border-bottom: 1rpx solid #f5f5f5;
        
        &:last-child {
          border-bottom: none;
        }
        
        .left {
          display: flex;
          align-items: center;
          
          image {
            width: 80rpx;
            height: 80rpx;
            margin-right: 20rpx;
          }
          
          .info {
            .merchant {
              font-size: 28rpx;
              color: #333;
              margin-bottom: 8rpx;
              display: block;
            }
            
            .time {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
        
        .right {
          text-align: right;
          
          .amount {
            font-size: 32rpx;
            font-weight: 500;
            display: block;
            margin-bottom: 8rpx;
            
            &.expense {
              color: #333;
            }
            
            &.income {
              color: #52c41a;
            }
          }
          
          .status {
            font-size: 24rpx;
            
            &.success {
              color: #52c41a;
            }
            
            &.pending {
              color: #faad14;
            }
            
            &.failed {
              color: #ff4d4f;
            }
          }
        }
      }
    }
  }
}

// 适配 iOS
/* #ifdef APP-PLUS */
.card-container {
  .card-swiper {
    .card-item {
      transform: translateY(0);
    }
  }
}
/* #endif */

// 适配 H5
/* #ifdef H5 */
.card-container {
  .card-swiper {
    height: 480rpx;
  }
}
/* #endif */

// 适配安卓
/* #ifdef APP-PLUS-ANDROID */
.card-container {
  .card-swiper {
    .virtual-card {
      transform: translateZ(0);
    }
  }
}
/* #endif */
</style>