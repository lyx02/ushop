<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avater"></image>
      <view class="nickname">{{userinfo.nickName}}</view>
    </view>
    <!-- 下层区域 -->
    <view class="panel-lsit">
      <!-- No.1 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏店铺</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>收藏商品</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>80</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- No.2 -->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="../../static/my-icons/icon1.png" mode="" class="icon"></image>
            <text>代付款</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon2.png" mode="" class="icon"></image>
            <text>代收款</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon3.png" mode="" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <!-- <image src="../../static/my-icons/icon4.png" mode="" class="icon" ></image> -->
           <image src="../../static/my-icons/icon4.png" mode="" class="icon" @click="allOrder"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- No.3 -->
      <view class="panel">
        <view class="panel-list-item" @click="chooseAddress">
          <text>收货地址</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
        <view class="panel-list-item" @click="customer">
          <text>联系客服</text> 
          <uni-icons type="arrowright"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright"></uni-icons>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
	export default {
    computed: {
      ...mapState('m_user', ['userinfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？'
        }).catch(err => err)
        
        if(succ && succ.confirm) {
          this.updateAddress({})
          this.updateUserInfo({})
          this.updateToken('')
        }
      },
      async chooseAddress() {
         const [err, succ] = await uni.chooseAddress().catch(err => err)
         if (err === null && succ.errMsg === 'chooseAddress:ok') {
           this.updateAddress(succ)
         }
       },
      // gotoCart() {
      //   uni.switchTab({
      //     url: '/pages/cart/cart'
      //   })
      // },
      async customer() {
        const [err, suc] = await uni.showModal({
          title: '客服专线',
          content: '请拨打0754-00000000联系客服'
        }).catch(err => err)
      },
      allOrder() {
        uni.navigateTo({
          url: '../../subpkg/order/order'
        })
      }
    },
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.my-userinfo-container {
  height: 100%;
  background-color: #f4f4f4;
  .top-box {
    height: 400rpx;
    background-color: #C00000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .avater {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid white;
      box-shadow: 0 1px 5px black;
    }
    .nickname {
      color: white;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
  }
}
.panel-lsit {
  padding: 0 10px;
  position: relative;
  top: -10px;
  .panel {
    .panel-title {
      line-height: 45px;
      padding-left: 10px;
      font-size: 15px;
      border-bottom: 1px solid #f4f4f4;
    }
    background-color: white;
    border-radius: 5px;
    margin-bottom: 8px;
    .panel-body {
      display: flex;
      justify-content: space-around;
      .panel-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 0;
        font-size: 13px;
        
        .icon {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
}

.panel-list-item {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  align-items: center;
  padding: 0 15px;
  height: 45px;
}
  
</style>
