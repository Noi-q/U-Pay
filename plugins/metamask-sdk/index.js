import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK({
	dappMetadata: {
		name: "U Pay",
		url: "https://wwww.u-pay.com"
	},
	infuraAPIKey: ""
})

const provider = MMSDK.getProvider()

// 连接帐户
export async function MMConnect() {
	return new Promise((resolve,reject) => {
		MMSDK.connect().then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}
// 连接帐户并签名
export function MMConnectAndSign() {
	return new Promise((resolve,reject) => {
		MMSDK.connectAndSign({
			msg: "Sign in to U Pay"
		}).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}
// 发送交易
export function MMSendTransaction(fromAddress,toAddress) {
	return new Promise((resolve,reject) => {
		provider.request({
			method: "metamask_batch",
			params: [
				{ method: "eth_accounts" },
				{ method: "eth_chainId" }
			]
			// method: "eth_sendTransaction",
			// params: [
			// 	{
			// 		from: fromAddress,
			// 		to: toAddress,
			// 		value: "0x0",
			// 		gasLimit: "0x5028",
			// 		maxPriorityFeePerGas: "0x3b9aca00",
			// 		maxFeePerGas: "0x2540be400"
			// 	}
			// ]
		}).then((result) => {
			resolve(result)
		}).catch((error) => {
			reject(error)
		})
	})
}