<template>
	<view class="home-container">
		<!-- 顶部状态栏 -->
		<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
		
		<!-- 头部导航 -->
		<view class="header">
			<view class="header-left">
				<image class="avatar" src="" mode="aspectFill" />
				<text class="welcome">Hi, {{ userInfo.nickname || '用户' }}</text>
			</view>
			<view class="header-right">
				<view class="notification" @click="goToNotification">
					<uni-icons size="48rpx" color="#ffffff" type="notification"></uni-icons>
					<view v-if="hasUnread" class="badge"></view>
				</view>
				<!-- #ifdef APP -->
				<view class="scan" @click="scanQRCode">
					<uni-icons size="48rpx" color="#ffffff" type="scan"></uni-icons>
				</view>
				<!-- #endif -->
			</view>
		</view>

		<!-- 资产卡片 -->
		<view class="asset-card">
			<view class="card-header">
				<text class="title">总资产 (USDT)</text>
				<view class="eye-btn" @click="toggleAssetVisibility">
					<image :src="showAsset ? '/static/icons/eye-open.png' : '/static/icons/eye-close.png'" mode="aspectFit" />
				</view>
			</view>
			<view class="asset-amount">
				<text class="amount">{{ showAsset ? totalAsset : '******' }}</text>
				<text class="unit">≈ ${{ showAsset ? usdAmount : '******' }}</text>
			</view>
			<view class="card-actions">
				<view class="action-item" @click="goToDeposit">
					<image src="/static/icons/mine/deposit.png" mode="aspectFit" />
					<text>充值</text>
				</view>
				<view class="action-item" @click="goToWithdraw">
					<image src="/static/icons/mine/withdraw.png" mode="aspectFit" />
					<text>提现</text>
				</view>
				<view class="action-item" @click="goToTransfer">
					<image src="/static/icons/mine/transfer.png" mode="aspectFit" />
					<text>转账</text>
				</view>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="menu-grid">
			<view class="menu-item" v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(item)">
				<image :src="item.icon" mode="aspectFit" />
				<text>{{ item.name }}</text>
			</view>
		</view>

		<!-- 交易记录 -->
		<view class="transaction-list">
			<view class="list-header">
				<text class="title">交易记录</text>
				<text class="more" @click="goToTransactionHistory">查看全部</text>
			</view>
			<view class="list-content">
				<view v-if="transactions.length === 0" class="empty-state">
					<image src="/static/icons/empty.png" mode="aspectFit" />
					<text>暂无交易记录</text>
				</view>
				<view v-else class="transaction-item" v-for="(item, index) in transactions" :key="index" @click="viewTransaction(item)">
					<view class="left">
						<image :src="item.icon" mode="aspectFit" />
						<view class="info">
							<text class="type">{{ item.type }}</text>
							<text class="time">{{ item.time }}</text>
						</view>
					</view>
					<view class="right">
						<text class="amount" :class="item.status">{{ item.amount }}</text>
						<text class="status">{{ item.statusText }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 状态栏高度
const statusBarHeight = ref(0)

// 用户信息
const userInfo = ref({
	nickname: '张三',
	avatar: ''
})

// 资产显示控制
const showAsset = ref(true)
const totalAsset = ref('125,678.90')
const usdAmount = ref('125,678.90')

// 未读消息标记
const hasUnread = ref(true)

// 菜单项配置
const menuItems = ref([
	{ name: '闪兑', icon: '/static/icons/menu/swap.png', path: '/pages/swap/index' },
	{ name: '跨链', icon: '/static/icons/menu/bridge.png', path: '/pages/bridge/index' },
	{ name: '收款', icon: '/static/icons/menu/receive.png', path: '/pages/receive/index' },
	{ name: '商家', icon: '/static/icons/menu/merchant.png', path: '/pages/merchant/index' },
	{ name: '理财', icon: '/static/icons/menu/finance.png', path: '/pages/finance/index' },
	{ name: '卡券', icon: '/static/icons/menu/card.png', path: '/pages/cards/index' },
	{ name: '客服', icon: '/static/icons/menu/service.png', path: '/pages/customer-service/index' },
	{ name: '更多', icon: '/static/icons/menu/more.png', path: '/pages/more/index' }
])

// 交易记录
const transactions = ref([
	{
		type: 'USDT 充值',
		time: '2024-03-18 15:30',
		amount: '+500.00',
		status: 'success',
		statusText: '已完成',
		icon: '/static/icons/transaction/deposit.png'
	},
	{
		type: 'ETH 闪兑',
		time: '2024-03-18 14:20',
		amount: '-0.5',
		status: 'pending',
		statusText: '处理中',
		icon: '/static/icons/transaction/swap.png'
	}
])

// 生命周期
onMounted(() => {
	// 获取状态栏高度
	const systemInfo = uni.getSystemInfoSync()
	statusBarHeight.value = systemInfo.statusBarHeight
	
	// 获取用户信息
	getUserInfo()
	
	
	// 获取交易记录
	getTransactionList()
})

// 方法
const toggleAssetVisibility = () => {
	showAsset.value = !showAsset.value
}

const getUserInfo = () => {
	// TODO: 获取用户信息
}

const getTransactionList = () => {
	// TODO: 获取交易记录
}

const handleMenuClick = (item) => {
	uni.navigateTo({
		url: item.path
	})
}

const goToNotification = () => {
	uni.navigateTo({
		url: '/pages/notification/index'
	})
}

const scanQRCode = () => {
	uni.scanCode({
		success: (res) => {
			console.log('扫码结果：', res)
		}
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

const goToTransfer = () => {
	uni.navigateTo({
		url: '/pages/transfer/index'
	})
}

const goToTransactionHistory = () => {

}

const viewTransaction = (item) => {
	uni.navigateTo({
		url: `/pages/transaction/detail?id=${item.id}`
	})
}

</script>

<style lang="scss">
.home-container {
	min-height: 100vh;
	background-color: #f5f6fa;
	
	.status-bar {
		background: #1677ff;
	}
	
	.header {
		background: #1677ff;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.header-left {
			display: flex;
			align-items: center;
			
			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 40rpx;
				margin-right: 20rpx;
			}
			
			.welcome {
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
			}
		}
		
		.header-right {
			display: flex;
			align-items: center;
			
			.notification, .scan {
				position: relative;
				margin-left: 40rpx;
				
				image {
					width: 48rpx;
					height: 48rpx;
				}
				
				.badge {
					position: absolute;
					top: -6rpx;
					right: -6rpx;
					width: 16rpx;
					height: 16rpx;
					background: #ff4d4f;
					border-radius: 50%;
				}
			}
		}
	}
	
	.asset-card {
		margin: 30rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
		
		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			.title {
				font-size: 28rpx;
				color: #666;
			}
			
			.eye-btn {
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		
		.asset-amount {
			margin-bottom: 40rpx;
			
			.amount {
				font-size: 48rpx;
				font-weight: 600;
				color: #333;
				margin-right: 20rpx;
			}
			
			.unit {
				font-size: 28rpx;
				color: #999;
			}
		}
		
		.card-actions {
			display: flex;
			justify-content: space-around;
			border-top: 1rpx solid #f5f5f5;
			padding-top: 30rpx;
			
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
	}
	
	.menu-grid {
		margin: 30rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30rpx;
		
		.menu-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			
			image {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 16rpx;
			}
			
			text {
				font-size: 26rpx;
				color: #333;
			}
		}
	}
	
	.transaction-list {
		margin: 30rpx;
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		
		.list-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
			
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
		
		.empty-state {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 60rpx 0;
			
			image {
				width: 160rpx;
				height: 160rpx;
				margin-bottom: 20rpx;
			}
			
			text {
				font-size: 28rpx;
				color: #999;
			}
		}
		
		.transaction-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
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
					.type {
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
					margin-bottom: 8rpx;
					display: block;
					
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
				
				.status {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
}

// 适配 H5
/* #ifdef H5 */
.home-container {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
/* #endif */

// 适配 iOS
/* #ifdef APP-PLUS */
.status-bar {
	padding-top: constant(safe-area-inset-top);
	padding-top: env(safe-area-inset-top);
}
/* #endif */
</style>
