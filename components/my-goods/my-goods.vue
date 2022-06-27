<template>
	<view class="goods-item">
	  <!-- 左边 -->
	  <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
	    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
	  </view>
	  <!-- 右边 -->
	  <view class="goods-item-right">
	    <view class="goods-name">{{goods.goods_name}}</view>
	    <view class="goods-info-box">
	      <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
        <view class="goods-number1" v-if="showNun1">购买数量： {{goods.goods_count}}</view>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
      },
      // 订单goods数量
      showNun1: {
        type: Boolean,
        default: false
      }
    },
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioClickHandler() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    },
	}
</script>

<style lang="scss">
.goods-item {
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 5px;
    .goods-pic {
      display: block;
      width: 100px;
      height: 100px;
    }
  }
  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .goods-price {
        color: #C00000;
        font-size: 16px;
      }
      .goods-number1 {
        font-size: 13px;
        color: gray;
        margin-right: 10px;
      }
    }
  }
}
</style>
