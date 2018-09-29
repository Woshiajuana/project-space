/*
 *  reg.html页面的js
 *  
 */


$(function(){


})


/*
 * 注册功能
 */
function register(){
	var data = {};
	data.SignupForm = {};
	var email = $.trim($('.form-mail input').eq(0).val());
	data.SignupForm.email = window.btoa(email);
	var  password = $.trim($('.form-pwd input').eq(0).val());
	data.SignupForm.password = window.btoa(password);
	var repassword = $.trim($('.form-pwd input').eq(1).val());
	data.SignupForm.repassword = window.btoa(repassword);
	
	
	
	var regex =/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/;
	var regEmail = /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	if(data.SignupForm.email == ''){
		alert('请输入邮箱地址');
	}else if(!regEmail.test(email)){
		alert("请输入正确的Email地址");
	}else if(repassword.length < 6){
		alert('密码不能少于六位');
	}else if(!regex.test(password)){
		alert('密码过于简单，字母+数字或特殊字符');
	}else if(repassword == ''){
		alert('请输入确认密码');
	}else if(data.SignupForm.password != data.SignupForm.repassword){
		alert('密码与确认密码不一致，请重新输入');
	}else{
		$.ajax({
			url: "/user/signup",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					window.location.href = './verifyEmail.html';
				}else{
					alert(r.msg[0]);
				}
			}
		});
	}
}
