<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
    <button type="primary" class="btn-login" @tap="auth">一键登录</button>
    <view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
	export default {
		data() {
			return {
				
        
        message: {
            user_id: 23,
            user_email_code: null,
            is_active: null,
            user_sex: "男",
            user_qq: "",
            user_tel: "",
            user_xueli: "本科",
            user_hobby: "",
            user_introduce: null,
            create_time: 1562221487,
            update_time: 1562221487,
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
          },
			};
		},
    computed: {
      ...mapState('m_user', ['redirectInfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      //授权后获取用户基本信息
      getUserInfo() {
        // let this = that
        //--------------------------start---------------
        // uni.login({
        // 	provider: 'weixin',
        // 	success: (res) => {
        // 		this.wxLogin(res.code)
        // 	},
        // 	fail: (fail) => {
        // 		console.log(fail)
        // 	}
        // })
        //------------------end-----------------------------
        // console.log(e);
        // if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您已取消授权')
        // this.updateUserInfo(e.detail.userInfo)
        // this.getToken()
        // console.log(e.detail.userInfo);
        // console.log(e.detail);
        //-------------------end2--------------------------
        let that = this
        uni.getUserProfile({
          desc:'登录', 
          success(res) {
            console.log(res);
            that.updateUserInfo(res.userInfo)
            // console.log(this);
          },
          fail(err) {
            console.log(err);
          }
        })
        
        this.getToken()
        this.navigateBack()
      },
      navigateBack() {
        if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      },
      auth() {
        this.getUserInfo()
      },
      
      
      
      async getToken(info) {
       const [err, res] = await uni.login().catch(err => err)
       if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
       //------------------------------------------start------------------------------------
       // const query = {
       //   code: res.code,
       //   encryptedData: info.encryptedData,
       //   iv: info.iv,
       //   rawData: info.rawData,
       //   signature: info.signature
       // }
       // console.log(query);
       // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
       //-------------------------------------------end---------------------------------
       // console.log(loginResult.meta);
       // console.log(loginResult);
       // if (loginResult.meta !== 200) return uni.$showMsg('登录失败')
       uni.$showMsg('登录成功')
       this.updateToken(this.message.token)
       
       
      },
      
      // wxLogin(code) {
      // 	console.log('走自己的微信登录服务器', code)
      // 	uni.request({
      // 		url: 'http://localhost:3000/wxlogin?code=' + code, //仅为示例，并非真实接口地址。
      // 		success: (res) => {
      // 			console.log('微信登录成功后的消息',res);
      // 			uni.showToast({
      // 				title:'微信登录成功',
      // 				icon:'none'
      // 			})
      // 		}
      // 	});
      // },
      
      
      
    }
	}
</script>

<style lang="scss">
.login-container {
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #C00000;
  }
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
