<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
    <!-- 头像 -->
    <view class="touxiang" v-if="JSON.stringify(userinfo) !== '{}'">
      <image :src="userinfo.avatarUrl" class="touBox"></image>
        
      </view>
    <!-- 头像end -->
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
		  <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
		</view>

    
	</view>
</template>

<script>
  import { mapState } from 'vuex'
	export default {
    props: {
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        default: 18
      }
    },
		data() {
			return {
				
			};
		},
    methods: {
      searchBoxHandler() {
        console.log(123);
        this.$emit('click')
      }
    },
    computed: {
      ...mapState('m_user', ['userinfo'])
    }
	}
</script>

<style lang="scss">
  .my-search-container {
    height: 50px;
    // background-color: #C00000;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 0 10px;
      
    .my-search-box {
      background-color: #FFFFFF;
      height: 36px;
      // border-radius: 18px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .placeholder {
        font-size: 15px;
        margin-left: 5px;
      }
    }
    .touxiang {
      margin: 0 8px 0 0;
      .touBox {
        display: block;
        height: 36px;
        width: 36px;
        background-color: pink;
        border-radius: 18px;
      }
    }
  }
</style>
