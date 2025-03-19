<template>
	<view class="otherWallet-container">
		<uni-nav-bar
		  fixed
		  status-bar
		  left-icon="back"
		  title="其他钱包"
			:border="false"
		  @clickLeft="goBack"
		/>
		<scroll-view class="wallet-list" scroll-y>
			<view v-for="(item,index) in wallets" :key="index" class="wallet-item" @click="connectWallet(item.type)">
				<view class="wallet-item-left">
					<image :src="item.image" mode=""></image>
					<view class="wallet-item-left-address">
						<text>{{item.name}}</text>
						<text>{{item.address[0] || "暂未绑定" }}</text>
					</view>
				</view>
				<view class="wallet-item-right">
					<text v-for="(coin,coinIndex) in item.coin" :key="coinIndex">{{coin.name}}数量：{{coin.num}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
// #ifdef H5
import { MMConnect,MMConnectAndSign,MMSendTransaction } from "@/plugins/metamask-sdk/index.js"
import { TPIsConnect,TPConnect } from "@/plugins/tokenpocket-sdk/index.js"
// #endif
import { ref,reactive,onMounted } from "vue"

let wallets = ref([
	{
		type: "metamask",
		name: "Metamask",
		image: "/static/metamask.webp",
		address: [],
		coin: [
			{
				name: "ETH",
				num: 0
			},
			{
				name: "BNB",
				num: 0
			}
		]
	},
	{
		
		type: "tronlink",
		name: "TronLink",
		image: "/static/tronlink.png",
		address: [],
		coin: [
			{
				name: "USDT",
				num: 0
			},
			{
				name: "TRX",
				num: 0
			}
		]
	},
	{
		
		type: "tokenpocket",
		name: "TokenPocket",
		image: "/static/TP.png",
		address: [],
		coin: [
			{
				name: "USDT",
				num: 0
			},
			{
				name: "TRX",
				num: 0
			}
		]
	}
])
const connectWallet = (type) => {
	// #ifdef H5
	// 连接Metamask钱包
	if(type == "metamask"){
		MMConnect().then((res) => {
			console.log(res)
			wallets.value.forEach((item) => {
				if(item.type == "metamask"){
					item.address = res
					// MMSendTransaction(item.address,"0xC565dA00F72143F40EDCDfcE5f183543F3f6BB4F").then((result) => {
					// 	console.log(result)
					// }).catch((error) => {
					// 	console.log(error)
					// })
				}
			})
		})
	}
	// 连接TokenPocket钱包
	if(type == "tokenpocket"){
		// console.log(TPIsConnect())
		TPConnect()
	}
	// #endif
	
	// #ifdef APP
	uni.showToast({
		title:"暂不支持虚拟卡连接钱包，请耐心等待！",
		icon:"none"
	})
	// #endif
}

const goBack = () => {
  uni.navigateBack()
}



</script>

<style lang="scss">
	.otherWallet-container{
		min-height: 100vh;
		background: #f5f6fa;
		.wallet-list{
			.wallet-item{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				background-color: #ffffff;
				border-bottom: solid 0.5px #f5f6fa;
				padding: 30rpx 30rpx;
				.wallet-item-left{
					display: flex;
					flex-direction: row;
					align-items: center;
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
					.wallet-item-left-address{
						margin-left: 20rpx;
						display: flex;
						flex-direction: column;
						width: 300rpx;
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
						text:nth-of-type(1){
							font-weight: bold;
						}
						text:nth-of-type(2){
							font-size: 20rpx;
							margin-top: 10rpx;
						}
					}
				}
				.wallet-item-right{
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					text{
						font-size: 25rpx;
					}
				}
			}
		}

	}
</style>
