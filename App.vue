<script>

	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		box-sizing: border-box;
	}

	/* 全局输入框样式 */
	input {
		box-sizing: border-box;
	}

	/* 防止内容溢出 */
	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
