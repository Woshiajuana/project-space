$(function(){
	var email=queryString('email');
		if(email){
			$(".mail-tip").html("验证码已发送到邮箱：<span>"+email+"</span>");
		}
		
})

function sendEmail(){
	var email=$.trim($(".form-mail input").val());
	//var regex =/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/;
	var regEmail = /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	if(!regEmail.test(email)){
		alert("请输入正确的邮箱");
		return;
	}
	$.post('/user/sendwapemail',{email:email},function(r){
		if(r.code == 0){
			alert(r.msg);
			location.href="./forgot-pwd-2.html?email="+email;
		}else{
			alert(r.msg);
		}
	},'json');	
	var options = {};
	options.expires = 30;
	cookie('hasSendEmail',1,options);
}

function sendCode(){
	var email=$.trim($(".mail-tip span").text());
	var code=$.trim($(".form-msg input").val());
	var password=$.trim($(".form-pwd input").val());
	var repassword=$.trim($(".form-repwd input").val());
	var regex =/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/;
	if(code==""){
		alert("请输入验证码  ")
	}else if(password.length < 6){
		alert('密码不能少于六位');
	}else if(!regex.test(password)){
		alert('密码过于简单，字母+数字或特殊字符');
	}else if(repassword == ''){
		alert('请输入确认密码');
	}else if(password !=repassword){
		alert('密码与确认密码不一致，请重新输入');
	}else{
				$.post('/user/checkwapcode',{verifycode:code,pwd:password,mail:email},function(r){
					if(r.code == 0 || r.code == 3){
						alert("重置成功！");
						window.location.href="./usermain.html";
					}else{
						alert(r.msg);
						}
					},'json');	
	}
}