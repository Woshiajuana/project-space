$(function(){
	$(".lhlogin li:eq(0)").click(function(){
		alert("敬请期待");
	});
	$(".lhlogin li:eq(1)").click(function(){
		$.ajax({
			url:'/user/wxstate',
			type:'post',
			data:{wap:'wap'},
			dataType:'json',
			async:false,
			success:function(r){
			var STATE=r;
			var clientId="1886521423";
			//var redirectUri=encodeURIComponent("http://poppro.cn/user/wblogin");
			var redirectUri="http://www.poppro.cn/user/wblogin";
			var wburl="https://api.weibo.com/oauth2/authorize?client_id="+clientId+
					"&redirect_uri="+redirectUri+"&response_type=code&state="+STATE;
				location.href=wburl;
			}
		})
	})
	$(".lhlogin li:eq(2)").click(function(){

		$.ajax({
			url:'/user/wxstate',
			type:'post',
			data:{wap:'wap'},
			dataType:'json',
			async:false,
			success:function(r){
			var STATE=r;
			var APPID="wx87931a4807a186b8";
			//var REDIRECT_URI=encodeURI("www.poppro.cn/user/wxlogin");
			var REDIRECT_URI=encodeURIComponent("http://www.poppro.cn/user/wxlogin");
			location.href="https://open.weixin.qq.com/connect/qrconnect?appid="+APPID+"&redirect_uri="+REDIRECT_URI+
					"&response_type=code&scope=snsapi_login&state="+STATE+"#wechat_redirect";
			}
		})
	})
})

function checkType(){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid){
			
		}else{
	 
		}
}