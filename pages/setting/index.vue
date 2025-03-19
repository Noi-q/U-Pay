<template>
  <view class="setting-container">
    <uni-nav-bar
      fixed
      status-bar
      left-icon="back"
      title="设置"
			:border="false"
      @clickLeft="goBack"
    />
    
    <!-- 设置列表 -->
    <view class="setting-list">
      <view class="list-section">
        <view class="list-item" @click="goToProfile">
          <text class="item-label">个人资料</text>
          <view class="item-right">
            <text class="value">{{ userInfo.nickname }}</text>
            <image class="arrow" src="/static/icons/arrow-right.png" mode="aspectFit" />
          </view>
        </view>
        
        <view class="list-item" @click="handleOpenLanguagePopup">
          <text class="item-label">语言</text>
          <view class="item-right">
            <text class="value">{{ currentLanguage }}</text>
            <image class="arrow" src="/static/icons/arrow-right.png" mode="aspectFit" />
          </view>
        </view>
        
        <view class="list-item" @click="handleOpenCurrencyPopup">
          <text class="item-label">货币单位</text>
          <view class="item-right">
            <text class="value">USDT</text>
            <image class="arrow" src="/static/icons/arrow-right.png" mode="aspectFit" />
          </view>
        </view>
      </view>
			<!-- #ifdef APP -->
      <view class="list-section">
        <view class="list-item">
          <text class="item-label">消息通知</text>
          <switch 
            :checked="notificationEnabled" 
            @change="toggleNotification"
            color="#1677ff"
          />
        </view>
        
        <view class="list-item">
          <text class="item-label">指纹/面容解锁</text>
          <switch 
            :checked="biometricEnabled" 
            @change="toggleBiometric"
            color="#1677ff"
          />
        </view>
      </view>
			<!-- #endif -->
			<!-- #ifdef APP -->
      <view class="list-section">
        <view class="list-item" @click="clearCache">
          <text class="item-label">清除缓存</text>
          <view class="item-right">
            <text class="value">{{ cacheSize }}</text>
            <image class="arrow" src="/static/icons/arrow-right.png" mode="aspectFit" />
          </view>
        </view>
        
        <view class="list-item" @click="checkUpdate">
          <text class="item-label">检查更新</text>
          <view class="item-right">
            <text class="value">{{ appVersion }}</text>
            <image class="arrow" src="/static/icons/arrow-right.png" mode="aspectFit" />
          </view>
        </view>
      </view>
			<!-- #endif -->
			<!-- 退出登录 -->
			   <view class="logout-btn" @click="handleLogout">
			      退出登录
			    </view>
    </view>
  </view>
	<uni-popup ref="currencyPopup" type="bottom">
		<view class="currency-list-popup">
			<view class="popup-header">
				<text class="title">选择货币单位</text>
				<uni-icons color="#999999" size="40rpx" type="closeempty" @click="closeCurrencyList"></uni-icons>
			</view>
			<scroll-view class="currency-list" scroll-y>
				
			</scroll-view>
		</view>

	</uni-popup>
	<uni-popup ref="languagePopup" type="bottom">
		<view class="language-list-popup">
			<view class="popup-header">
				<text class="title">选择语言</text>
				<uni-icons color="#999999" size="40rpx" type="closeempty" @click="closeCurrencyList"></uni-icons>
			</view>
			<scroll-view class="language-list" scroll-y>
				
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  nickname: '张三'
})
const languagePopup = ref(null)
const currencyPopup = ref(null)
const currentLanguage = ref('简体中文')
const notificationEnabled = ref(true)
const biometricEnabled = ref(false)
const cacheSize = ref('23.5MB')
const appVersion = ref('1.0.0')

const toggleNotification = (e) => {
  notificationEnabled.value = e.detail.value
  // TODO: 保存设置
}

const toggleBiometric = (e) => {
  biometricEnabled.value = e.detail.value
  // TODO: 保存设置
}
const closeCurrencyList = () => {
	currencyPopup.value.close()
}
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确认退出登录？',
    success: (res) => {
      if (res.confirm) {
        // TODO: 退出登录逻辑
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }
    }
  })
}
const handleOpenCurrencyPopup = () => {
	currencyPopup.value.open()
}

const handleOpenLanguagePopup = () => {
	languagePopup.value.open()
}

const clearCache = () => {
  uni.showModal({
    title: '提示',
    content: '确认清除缓存？',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: '清理中'
        })
        setTimeout(() => {
          uni.hideLoading()
          cacheSize.value = '0B'
          uni.showToast({
            title: '清理完成',
            icon: 'success'
          })
        }, 1500)
      }
    }
  })
}

const checkUpdate = () => {
  uni.showLoading({
    title: '检查更新'
  })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '已是最新版本',
      icon: 'none'
    })
  }, 1500)
}

const goBack = () => uni.navigateBack()
const goToProfile = () => uni.navigateTo({ url: '/pages/profile/index' })
</script>

<style lang="scss">
.setting-container {
  min-height: 100vh;
  background: #f5f6fa;
	
	.logout-btn {
	  margin: 60rpx 30rpx;
	  height: 88rpx;
	  line-height: 88rpx;
	  text-align: center;
	  background: #fff;
	  border-radius: 44rpx;
	  font-size: 32rpx;
	  color: #ff4d4f;
	}
  
  .setting-list {
    .list-section {
      background: #fff;
      margin-bottom: 20rpx;
      
      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx;
        border-bottom: 1rpx solid #f5f5f5;
        
        &:last-child {
          border-bottom: none;
        }
        
        .item-label {
          font-size: 28rpx;
          color: #333;
        }
        
        .item-right {
          display: flex;
          align-items: center;
          
          .value {
            font-size: 28rpx;
            color: #999;
            margin-right: 10rpx;
          }
          
          .arrow {
            width: 32rpx;
            height: 32rpx;
          }
        }
        
        switch {
          transform: scale(0.8);
        }
      }
    }
  }
}
.currency-list-popup{
	background: #fff;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	padding: 30rpx;
	.popup-header{
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
}
.language-list-popup{
	background: #fff;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	padding: 30rpx;
	.popup-header{
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
}
</style> 