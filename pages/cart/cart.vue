<template>
	<view class="cart-container" v-if="cart.length !== 0">
      <my-address></my-address>  
		<view class="cart-tlite">
		  <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
		</view>
    
    <!-- 循环渲染购物车商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :options="options" @click="swipeItemClickHandler(goods)">
          <my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler" :show-num="true" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <my-settle></my-settle>
	</view>
  <!-- 空白购物车 -->
  <view class="empty-cart" v-else>
    <image src="/static/empty.png" class="empty-img"></image>
    <text class="tip-text">购物车里没有东西~</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'
	export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
		data() {
			return {
				options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
			};
		},
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioChangeHandler(e) {
        // console.log(e);
        this.updateGoodsState(e)
      },
      numberChangeHandler(e) {
        // console.log(e);
        this.updateGoodsCount(e)
      },
      swipeItemClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
    
    
	}
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }
.cart-tlite {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-cart {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
  .empty-img {
    width: 168px;
    height: 168px;
  }
  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
