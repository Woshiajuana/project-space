/*
 *  reg1.html页面的js
 *  
 */


$(function(){
	//拉取用户注册邮箱，并且发送邮件
	$.post('/user/getemail',{},function(r){
		$('.mail-tip').html('验证码已发送到您的邮箱：<span>'+r.email+'</span>');
		//查找邮箱对应的地址
//		$('.goto-email').click(function(){
//			//拼接邮箱地址
//			var email = r.email.split('@');
//			window.open('http://mail.'+email[1]);
//		})
	},'json');
	if(cookie('hasSendEmail') != 1){
		sendEmail();
	}
	//轮训激活状态，3秒一次
//	setInterval(function(){
//		$.post('/user/emailstatus',{},function(r){
//			if(r.status == 10){
//				window.location.href = './reg-2.html';
//			}
//		},'json');
//	},5000);
})

/*
 * 发送验证email邮件
 */

function sendEmail(){
	$.post('/user/sendwapemail',{},function(r){
		if(r.code == 0){
		}else{
		}
	},'json');	
	var options = {};
	options.expires = 30;
	cookie('hasSendEmail',1,options);
}
function sendCode(){
	var code=$.trim($(".form-msg input").val());
		if(code==""){
			return;
		}
	$.post('/user/checkwapcode',{verifycode:code},function(r){
		if(r.code == 0){
			alert(r.msg);
			location.href="./reg-submit-info.html";
		}else{
			alert(r.msg);
		}
	},'json');	
}




