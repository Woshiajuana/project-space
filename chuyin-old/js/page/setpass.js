	var a_token=queryString('token');

	function resetPass(){
		var password=$.trim($("#password").val());
		var repassword=$.trim($("#repassword").val());
		var regex =/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/;
		if(password==""){
			alert("请输入密码,密码不能为空格");
			return;
		}
		if (!regex.test(password) || password.length<6 || password.length>20){
			alert('密码过于简单，字母+数字或特殊字符');
			return;
		}
		if(password != repassword){
			alert("两次密码输入不一致");
			return;
		}
		$.ajax({
			url: "/user/resetemailpwd",
			type: "POST",
			dataType : 'json',
			data:{token:a_token,password:password},
			success:function(r){
				if(r.code==0){
					layer.alert(r.msg,
							{
								icon:1,
								yes:function(){
									window.location.href="https://www.poppro.cn/html/login.html";
								}
							});
				}
				else{
			layer.alert(r.msg);
				}
			}
			});	
	}