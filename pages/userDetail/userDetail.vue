<template>
	<view class="userDetail">
		<view class="top_nav">
			<view class="user_image">
				<image src="../../static/discovery/user.jpg" mode=""></image>
			</view>
			<view class="user_message">
				<view class="top">
					<view class="left">彭凯</view>
					<view class="right">
						<view class="btn">
							收藏
						</view>
					</view>
				</view>
				<view class="center">
					<view class="left">会员ID：</view>
					<view class="right">2003121214</view>
				</view>
				<view class="bottom">
					<view class="item">33岁</view>
					<view class="item">33岁</view>
					<view class="item">33岁</view>
				</view>
			</view>
		</view>
		<view class="adress">
			目前的所在地：霞山区建设街道
		</view>
		<view class="con-image">
			<image src="../../static/discovery/user.jpg" mode=""></image>
			<image src="../../static/discovery/user.jpg" mode=""></image>
			<image src="../../static/discovery/user.jpg" mode=""></image>
			<image src="../../static/discovery/user.jpg" mode=""></image>
			<image src="../../static/discovery/user.jpg" mode=""></image>
			<image src="../../static/discovery/user.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="less">
	.userDetail {
		.top_nav {
			display: flex;
			// background: red;
			width: calc(100vw - 30upx);
			margin: 30upx auto 30upx;

			.user_image {
				border-radius: 50%;

				image {
					border-radius: 50%;
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
					align-items: center;
					justify-content: space-between;
				}
			}

		}

		.adress {
			padding: 30upx;
			font-size: 24upx;
			border-bottom: 1upx solid rgb(161, 178, 190);
			border-top: 1upx solid rgb(161, 178, 190);
		}
		.con-image{
			
				// width: calc(100% - 20px);
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin: 20upx 0;
				image {
					border-radius: 20upx;
					padding: 4upx 10upx;
					height: 180upx;
					// width: 180upx;
					
					flex: 1;
					// width: 3;
				}
			
		}
	}
</style>
