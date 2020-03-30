<template>
	<view class="main">
		<view class="top_nav">
			<view class="user_image">
				<image src="../../static/discovery/user.jpg" mode=""></image>
			</view>
			<view class="user_message">
				<view class="top">
					<view class="left">彭凯</view>
					<view class="right">
						<view class="btn">
							编辑资料
						</view>
					</view>
				</view>
				<view class="center">
					<view class="left">会员ID：</view>
					<view class="right">2003121214</view>
				</view>
				<view class="bottom">
					<view class="left">平台：</view>
					<view class="right">廉江相亲网</view>
				</view>
			</view>
		</view>

		<view class="menu">
			<view class="item">
				<view>0</view>
				<view>我的收藏</view>
			</view>
			<view class="item">
				<view>0</view>
				<view>访客</view>
			</view>
		</view>
		<view class="open">
			<image src="../../static/img/bg-nav.png" mode="widthFix"></image>
		</view>
		<view class="menu-nav">
			<view class="item">
				<view>0</view>
				<view>相亲卡</view>
			</view>
			<view class="item">
				<view>0</view>
				<view>去置顶</view>
			</view>
			<view class="item">
				<view>0</view>
				<view>手机认证</view>
			</view>
			<view class="item">
				<view>0</view>
				<view>实名认证</view>
			</view>
		</view>
		<view class="line"></view>
		<uni-list>
			<uni-list-item title="是否显示手机号"></uni-list-item>
			<uni-list-item title="我的活动"></uni-list-item>
		</uni-list>

	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.main {
		display: flex;
		flex-direction: column;

		.top_nav {
			display: flex;
			// background: red;
			width: calc(100vw - 60upx);
			// width: 100vw;
			padding: 15px 15px 0;

			.user_image {
				image {
					width: 120upx;
					height: 120upx;
				}
			}

			.user_message {
				width: 100%;
				flex: 1;
				min-height: 120upx;
				padding: 0 30upx;
				font-size: 28upx;
				// background: red;

				.top {
					display: flex;
					justify-content: space-between;

					.right {
						.btn {
							padding: 0 20upx;
							background: rgb(255, 255, 255);
							border: 1px solid #C0C0C0;
							border-radius: 20px;
						}
					}

				}

				.center {
					display: flex;
				}

				.bottom {
					display: flex;
				}
			}

		}

		.open {
			// background: red;
			width: calc(100vw - 60upx);
			height: 120upx;
			margin: 0 auto;

			image {
				width: 100%;
				height: 100% !important;
			}
		}

		.menu {
			display: flex;
			align-items: center;
			font-size: 26upx;

			.item {
				display: flex;
				align-items: center;
				flex-direction: column;
				flex: 1;
				padding: 30upx;

			}
		}

		.menu-nav {
			display: flex;
			align-items: center;
			font-size: 30upx;

			.item {
				display: flex;
				align-items: center;
				flex-direction: column;
				flex: 1;
				padding: 30upx;

			}
		}

		.line {
			width: 100vw;
			height: 30upx;
			background: rgb(242, 242, 242);
		}
	}
</style>
