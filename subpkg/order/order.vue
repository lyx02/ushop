<uni-goods-nav :fill="" :options="" :button-group="" @click="" @buttonClick="" /><template>
	<view>
		<view class="order-text">
		  <text>订单支付完成</text>
		</view>
    <view class="order-container">
      <view class="order-item" v-for="(goods, i) in cart" :key="i">
        <my-goods :goods="goods" :showNun1="true" v-if="goods.goods_state === true"></my-goods>
      </view>
    </view>
	</view>
</template>

<script>
  import { mapState } from 'vuex'
	export default {
    computed: {
      ...mapState('m_cart', ['cart']),
    },
    methods: {
      
    },
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.order-text {
  height: 50px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #efefef;
}
</style>
