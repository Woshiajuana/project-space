/*
 *  reg1.html页面的js
 *  
 */


$(function(){
	//拉取用户注册邮箱，并且发送邮件
	$.post('/user/getemail',{},function(r){
		$('.regmail h2').text('验证邮件已发送到你的邮箱，'+r.email);
		//查找邮箱对应的地址
		$('.goto-email').click(function(){
			//拼接邮箱地址
			var email = r.email.split('@');
			window.open('http://mail.'+email[1]);
		})
	},'json');
	if(cookie('hasSendEmail') != 1){
		sendEmail();
	}
	//轮训激活状态，3秒一次
	setInterval(function(){
		$.post('/user/emailstatus',{},function(r){
			if(r.status == 10){
				window.location.href = './reg-2.html';
			}
		},'json');
	},5000);
})

/*
 * 发送验证email邮件
 */

function sendEmail(){
	$.post('/user/sendemail',{},function(r){
		if(r.code == 0){
			systemTip('发送成功，请注意查收');
		}else{
			systemTip('网络繁忙，请稍后再试');
		}
	},'json');	
	var options = {};
	options.expires = 30;
	cookie('hasSendEmail',1,options);
}





