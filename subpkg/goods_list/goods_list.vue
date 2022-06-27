<template>
	<view>
		<view class="goods-list">
		  <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isloading: false
			};
		},
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      console.log(options);
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb) {
        this.isloading = true
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isloading =false
        
        cb && cb()
        if(res.meta.status !== 200) return uni.$showMsg()
        //赋值
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      onReachBottom() {
        if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
        if(this.isloading) return
        //页码+1
        this.queryObj.pagenum += 1
        this.getGoodsList()
      },
      onPullDownRefresh() {
        this.queryObj.pagenum = 1
        this.goodsList = []
        this.total = 0
        this.isloading = false
        
        //重新发起请求
        this.getGoodsList(() => uni.stopPullDownRefresh())
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
