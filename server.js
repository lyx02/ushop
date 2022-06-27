// 运行该模块，进入到目录下  node server即可

// 引用系统模块
const http = require('http');
const url = require('url');
// 这个模块需要安装， npm install -save request
var request = require('request');
// 创建web服务器
const app = http.createServer();
// 当客户端发送请求的时候
app.on('request', (req, res) => {
	let arr = req.url.split('?');
	if(arr && arr.length>0){
		let url=arr[0];
		let codestr=arr[1];
		//从参数中获取code的值
		let code = codestr.split('=')[1];
		if(url && code && url=='/wxlogin'){
			// 这里需要替换成自己的微信小程序appid和appsecret
			// 不知道这两个数据，在哪里，https://mp.weixin.qq.com/ 扫码登录，去查看
			// 这里的appid，一定要与项目的mainfest.json中的微信小程序配置中的appid，以及https://mp.weixin.qq.com/这个登录后的 小程序的appid一致
			const appid='wx149ea5a8d7675a4e';
			const appsecret='5c3bbebf1ded9aad6257df4fb8e41bc7';
			// 参考这个https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html#请求地址
			let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;
			request(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log('微信认证服务器返回的数据',body) // Show the HTML for the baidu homepage
				res.end(body);
			  }
			})
		}
	}
});

// 监听3000端口
app.listen(3000);
console.log('服务器已启动,在代码中，访问http://localhost:3000/wxlogin?code=你获取的code')
