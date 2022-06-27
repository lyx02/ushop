<template>
	<view class="my-settle-container">
		<!-- 全选 -->
    <label class="radio" @click="changAllState">
      <radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart']),
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      
      changAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
      },
      //点击结算按钮
      settlement() {
        if (!this.checkedCount) return uni.$showMsg('请选择结算商品')
        if (!this.addstr) return uni.$showMsg('请输入收货地址')
        // if (!this.token) return uni.$showMsg('请先登录')    
        if (!this.token) return this.delayNavigate()   
         
         this.payOrder()
      },
      async payOrder() {
        //1.创建订单
        // 1.1组织订单信息对象
        const orderInfo = {
            // order_price: this.checkedGoodsAmount,
            order_price: 0.01,
            consignee_addr: this.addstr,
            goods: this.cart.filter(x => x.goods_state).map(x => ({
              goods_id: x.goods_id, 
              goods_number: x.goods_count, 
              goods_price: x.goods_price
            }))
        }
        // 1.2发起请求创建订单
         const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
         if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        // 1.3得到服务器响应的订单编号
        const orderNumber = res.message.order_number
        // console.log(orderNumber);
        
        // 2. 订单预支付
        // 2.1 发起请求获取订单的支付信息
        const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
        // 2.2 预付订单生成失败
        if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
        // 2.3 得到订单支付相关的必要参数
        const payInfo = res2.message.pay
        // console.log(payInfo);
        
        
        uni.showToast({
          title: '支付成功！',
          icon: 'success'
        })
        
        
        this.tiaozhuan()
      },
      //跳转到订单页面
      tiaozhuan() {
        setTimeout(() => {
          uni.navigateTo({
            url: '../../subpkg/order/order',        
          })
          
        }, 2000)
      },
      //展示倒计时提示消息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请先登录后再结算' + n + '秒后跳转到登录页面',
          mask: true,
          //几秒后自动退出
          duration: 1500,
        })
      },
      //延迟导航跳转
      delayNavigate() {
        this.seconds = 3
        this.showTips(this.seconds)
        //定时器
        this.timer = setInterval(() => {
          this.seconds--
          if(this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              },
              
            })
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      }
    },
		data() {
			return {
				seconds: 3,
        timer: null
			};
		}
	}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount-box {
    .amount {
      color: #c00000;
    }
  }
  .btn-settle {
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
    height: 50px;
    min-width: 100px;
    color: white;
    background-color: #C00000;
    
  }
}
</style>
