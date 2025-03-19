import TP from "tp-js-sdk";

export function TPConnect(){
	TP.getWallet({
		walletTypes: ["btc","eth","trx","usdt"],
		switch: true
	}).then((result) => {
		console.log(result)
	}).catch((error) => {
		console.log(error)
	})
}

export function TPIsConnect() {
	return TP.isConnected()
}