<template>
	<view >
		<!-- <button class="Btn" type='primary'  size="mini" open-type="getUserInfo"  withCredentials="true" lang="zh_CN" @getuserinfo="auth" >授权登录</button> -->
		<uni-search-bar @confirm="search" @input="input" ></uni-search-bar>

		<!-- 比赛 -->
		<tab-game :style="{'display':show_index == 0 ?'block':'none'}" ref="game"></tab-game>
		<!-- 发现 -->
		<view id="moments"  :style="{'display':show_index == 1 ?'block':'none'}"  >
		
			<view class="home-pic">
				<view class="home-pic-base">
					<view class="top-pic">
						<image class="header" src="../../static/index/test/header06.jpg" @tap="test"></image>
					</view>
					<view class="top-name">Liuxy</view>
				</view>
			</view>
		
			<view class="moments__post" v-for="(post,index) in posts" :key="index" :id="'post-'+index">
				<view class="post-left">
					<image class="post_header" :src="post.header_image"></image>
				</view>
		
				<view class="post_right">
					<text class="post-username">{{post.username}}</text>
					<view id="paragraph" class="paragraph">{{post.content.text}}</view>
					<!-- 相册 -->
					<view class="thumbnails">
						<view :class="post.content.images.length === 1?'my-gallery':'thumbnail'" v-for="(image, index_images) in post.content.images" :key="index_images">
							<image class="gallery_img" lazy-load mode="aspectFill" :src="image" :data-src="image" @tap="previewImage(post.content.images,index_images)"></image>
						</view>
					</view>
					<!-- 资料条 -->
					<view class="toolbar">
						<view class="timestamp">{{post.timestamp}}</view>
						<view class="like" @tap="like(index)">
							<image :src="post.islike===0?'../../static/index/islike.png':'../../static/index/like.png'"></image>
						</view>
						<view class="comment" @tap="comment(index)">
							<image src="../../static/index/comment.png"></image>
						</view>
					</view>
					<!-- 赞／评论区 -->
					<view class="post-footer">
						<view class="footer_content">
							<image class="liked" src="../../static/index/liked.png"></image>
							<text class="nickname" v-for="(user,index_like) in post.like" :key="index_like">{{user.username}}</text>
						</view>
						<!-- <view class="footer_content" v-for="(comment,comment_index) in post.comments.comment" :key="comment_index" @tap="reply(index,comment_index)">
							<text class="comment-nickname">{{comment.username}}: <text class="comment-content">{{comment.content}}</text></text>
						</view> -->
					</view>
				</view>
				<!-- 结束 post -->
			</view>
		
	<!-- 		<view class="foot" v-show="showInput">
				<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
				<chat-input @send-message="send_comment" @blur="blur" :placeholder="input_placeholder"></chat-input>
			</view> -->
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		
		<!-- 数据 -->
		<tab-data :style="{'display':show_index == 2? 'block':'none'}"  ref="data"></tab-data>
		<!-- 资讯 -->
		<tab-information :style="{'display':show_index == 3 ?'block':'none'}" ref="information"></tab-information>
		<!-- 个人中心 -->
		<tab-mycenter :style="{'display':show_index == 4 ? 'block':'none'}" ref="mycenter"></tab-mycenter>
		<!-- is_lhp判断是否为刘海屏在main.js里，好像uniapp有一个css变量获取刘海屏的安全区域 -->
		<view class="tabBar" :style="{height:is_lhp?'140rpx':'98rpx'}">
			<!-- 导航的中间圆圈 --> 
			<view class="border_box" :style="{paddingBottom:is_lhp?'40rpx':''}">
				<view class="tabBar_miden_border"></view>
			</view>
			<view class="tabBar_list" :style="{paddingBottom:is_lhp?'40rpx':''}">
				<view v-for="(item) in tab_nav_list" :key="item.id" :class="{'tabBar_item':item.id!=2,'tabBar_item2':item.id==2}" @tap="cut_index(item.id)">
					<image v-if="show_index == item.id"  :src="`../../static/tabBar/${item.id+1}${item.id+1}.png`"></image>
					<image v-else :src="`../../static/tabBar/${item.id+1}.png`"></image>
					<view :class="{'tabBar_name':true,'nav_active':show_index == item.id}">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import tabGame from '@/components/tabBar/game.vue'
	// import tabDiscovery from '@/components/tabBar/discovery.vue'
	import tabInformation from '@/components/tabBar/information.vue'
	import tabData from '@/components/tabBar/Data.vue'
	import tabMycenter from '@/components/tabBar/mycenter.vue'
	import chatInput from '../../components/im-chat/chatinput.vue'; //input框
	import postData from '../../common/index/index.post.data.js';//朋友圈数据
	
	export default {
		components: {
			tabGame,//比赛    0
			// tabDiscovery,//发现    1
			tabInformation,//资讯   2
			tabData,//数据   3
			tabMycenter,//个人中心  4
			uniSearchBar
		},
		data() {
			return {
				posts: postData,//模拟数据
				user_id: 4,
				username: 'Liuxy',
				
				index: '',
				comment_index: '',
				
				input_placeholder: '评论', //占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: false, //评论输入框
				
				screenHeight: '', //屏幕高度(系统)
				platform: '',
				windowHeight: '' ,//可用窗口高度(不计入软键盘)
				
				loadMoreText: "加载中...",
				showLoadMore: false,
				show_index:0,//控制显示那个组件
				tab_nav_list :[{'id':0,'name':'首页'},{'id':1,'name':'动态'},{'id':2,'name':'发布瞬间'},{'id':3,'name':'关注'},{'id':4,'name':'我的'}],//菜单列表
				is_lhp:false
			}
		},
		mounted() {
			
			uni.getStorage({
				key: 'posts',
				success: function (res) {
					console.log(res.data);
					this.posts = res.data;
				}
			});
		
		},
		onShow() {
			uni.onWindowResize((res) => { //监听窗口尺寸变化,窗口尺寸不包括底部导航栏
				if(this.platform === 'ios'){
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				}else{
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
		},
		onLoad() {
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();
			
			this.is_lhp = this.$is_bang
			this.$nextTick(function(){
				// 一定要等视图更新完再调用方法   -----------++++++++++++++++重要
				this.$refs.game.ontrueGetList()//初次加载第一个页面的请求数据
			})
			
			console.log("是否为刘海屏",this.is_lhp ) 
		},
		onHide() {
			uni.offWindowResize(); //取消监听窗口尺寸变化
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() { //监听上拉触底事件
			console.log('onReachBottom');
			this.showLoadMore = true;
			setTimeout(() => {
				//获取数据
				if (this.posts.length < 20){//测试数据
					this.posts = this.posts.concat(this.posts);
				}else{
					this.loadMoreText = "暂无更多";
				}
			}, 1000);
		},
		onPullDownRefresh() { //监听下拉刷新动作
			console.log('onPullDownRefresh');
			// 这里获取数据
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onNavigationBarButtonTap(e) {//监听标题栏点击事件
			if (e.index == 0) {
				this.navigateTo('../publish/publish')
			}
		},
		methods: {
			test(){
				this.navigateTo('../test/test');
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			like(index) {
				if (this.posts[index].islike === 0) {
					this.posts[index].islike = 1;
					this.posts[index].like.push({
						"uid": this.user_id,
						"username": "," + this.username
					});
				} else {
					this.posts[index].islike = 0;
					this.posts[index].like.splice(this.posts[index].like.indexOf({
						"uid": this.user_id,
						"username": "," + this.username
					}), 1);
				}
			},
			comment(index) {
				this.showInput = true; //调起input框
				this.focus = true;
				this.index = index;
			},
			adjust() { //当弹出软键盘发生评论动作时,调整页面位置pageScrollTo
				return;
				uni.createSelectorQuery().selectViewport().scrollOffset(res => {
					var scrollTop = res.scrollTop;
					let view = uni.createSelectorQuery().select("#post-" + this.index);
					view.boundingClientRect(data => {
						console.log("data:" + JSON.stringify(data));
						console.log("手机屏幕高度:" + this.screenHeight);
						console.log("竖直滚动位置" + scrollTop);
						console.log("节点离页面顶部的距离为" + data.top);
						console.log("节点高度为" + data.height);
						console.log("窗口高度为" + this.windowHeight);
			
						uni.pageScrollTo({
							scrollTop: scrollTop - (this.windowHeight - (data.height + data.top + 45)), //一顿乱算
							// scrollTop: 50, 
							duration: 300
						});
					}).exec();
				}).exec();
			},
			reply(index, comment_index) {
				this.is_reply = true; //回复中
				this.showInput = true; //调起input框
				let replyTo = this.posts[index].comments.comment[comment_index].username;
				this.input_placeholder = '回复' + replyTo;
				this.index = index; //post索引
				this.comment_index = comment_index; //评论索引
				this.focus = true;
			},
			blur: function() {
				this.init_input();
			},
			send_comment: function(message) {
			
				if (this.is_reply) {
					var reply_username = this.posts[this.index].comments.comment[this.comment_index].username;
					var comment_content = '回复' + reply_username + ':' + message.content;
				} else {
					var comment_content = message.content;
				}
				this.posts[this.index].comments.total += 1;
				this.posts[this.index].comments.comment.push({
					"uid": this.user_id,
					"username": this.username,
					"content": comment_content //直接获取input中的值
				});
				this.init_input();
			},
			init_input() {
				this.showInput = false;
				this.focus = false;
				this.input_placeholder = '评论';
				this.is_reply = false;
			},
			previewImage(imageList, image_index) {
				var current = imageList[image_index];
				uni.previewImage({
					current: current,
					urls: imageList
				});
			},
			goPublish() {
				uni.navigateTo({
					url: './publish/publish',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			auth(){
				uni.login({
					success(res) {
						console.log(res)
						uni.getUserInfo({
						      provider: 'weixin',
						      success: function (infoRes) {
						        console.log( infoRes);
						      }
						    });
					}
				})
				
			},
			// 切换组件
			cut_index(type){
				console.log('----------------------------------',type)
				this.show_index = type
				if(this.show_index == 0){
					this.$refs.game.ontrueGetList()
				}
				else if(this.show_index == 1){
					// this.$refs.discovery.ontrueGetList()
				}
				else if(this.show_index == 2){
					// this.$refs.data.ontrueGetList()
				}
				else if(this.show_index == 3){
					this.$refs.information.ontrueGetList()
				}
				else if(this.show_index == 4){
					// this.$refs.mycenter.ontrueGetList()
				}
			},
			onPullDownRefresh(){
				uni.showToast({
					title:`第${this.show_index+1}个页面的刷新`
				})
				setTimeout(function(){
					uni.stopPullDownRefresh()
				},2000)
				console.log('下拉刷新四个组件公用的下拉刷新方法,根据在哪个页面下拉执行哪个页面的刷新方方法即可')
				console.log('如果想要自定义刷新的话，插件市场就有一个   非常好用也非常容易入手')
			}
		}
	}
</script>

<style lang="scss" scoped>
		@import url("../../common/index/index.css");
	.tabBar{ width:100%;height: 98rpx;background: #fff;border-top:1px solid #E5E5E5;position: fixed;bottom:0px;left:0px;right:0px;display: flex;align-items: center;justify-content: center;
		.tabBar_list{ width:86%;display: flex;justify-content: space-between;
			image{ width:48rpx;height: 48rpx;margin-bottom:2rpx}
			.tabBar_item{ width:68rpx;display: flex;justify-content: center;align-items: center;flex-direction: column;font-size: 20rpx;color: #969BA3;}
			.tabBar_item2{
				width:100rpx;height:100%;display: flex;justify-content: center;align-items: center;flex-direction: column;font-size: 20rpx;color: #969BA3;margin-top:-20rpx;position: relative;z-index: 101;
				image{ width:68rpx;height: 68rpx;}
			}
		 } 
	}
	.border_box{
		// pointer-events: none; 事件穿透解决z-index层级问题
		width:100%;height: 100rpx;display: flex;justify-content: center;align-items: center;position: fixed;left:0px;bottom:50rpx;z-index: 100;pointer-events: none;
		.tabBar_miden_border{   width:100rpx;height:50rpx;border-top:2rpx solid #E5E5E5;border-radius:50rpx 50rpx 0 0; /* 左上、右上、右下、左下 */background: #fff;}
	}
	.nav_active{color: #007AFF;}
	.tabBar_name{
		font-size: 24upx;
	}
</style>
