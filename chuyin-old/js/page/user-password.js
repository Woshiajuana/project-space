$(function(){

	var data="";
		$.ajax({
			url: "/user/autoload",
			type: "POST",
			dataType : 'json',
			data: data,
			success:function(r){
				if(r.email){
					$(".user-form input[type='text']").eq(0).val(r.email);
				}
			}
			});
		$(".edit-btn").click(function(){
			resetpwd();	
		});
		$(".user-form input[type='password']:eq(0)").blur(function(){
			var pwd=$.trim($(".user-form input[type='password']").eq(0).val());
			if(pwd=='' ||pwd.length<6 || pwd.length>24 ){
				 $("#oldpwd_error").text("原密码输入错误");
				 $("#checkpwd").val("0");
				 return ;
			 }
			else{
				 $("#oldpwd_error").text("");
			}
			$.ajax({
				url: "/user/checkoldpwd",
				type: "POST",
				dataType : 'json',
				data:{pwd:pwd},
				success:function(r){
					if(r.code==1){
						 $("#oldpwd_error").text(r.msg);
						 $("#checkpwd").val("0");
						
					}
					else if(r.code ==0){
						$("#checkpwd").val("1");
					}
				}
				});	
		});
		
		
		$(".user-form input[type='password']:eq(1)").blur(function(){
			var pwd=$.trim($(".user-form input[type='password']").eq(1).val());
			var regex =/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/;
			if(pwd=='' ||pwd.length<6 || pwd.length>24 ){
				 $("#pwd_error").text("密码在6-24位之间");
				 $("#newpwd").val("0");
			 }
			else{
				$("#pwd_error").text("");
				$("#newpwd").val("1");
			}	
			if(!regex.test(pwd)){
				 $("#pwd_error").text('密码过于简单，字母+数字或特殊字符');
				 $("#newpwd").val("0");
			
			}
		});
		$(".user-form input[type='password']:eq(2)").blur(function(){
			var pwd1=$.trim($(".user-form input[type='password']").eq(1).val());
			var pwd2=$.trim($(".user-form input[type='password']").eq(2).val());
			if(pwd1 != pwd2){
				 $("#repwd_error").text("两次密码不一致");
				 $("#renewpwd").val("0");
			}
			else{
				$("#repwd_error").text("");
				$("#renewpwd").val("1");
			}
		});
});

function resetpwd(){
	 var data={};
	 data.ResetPasswordForm={};
	 data.ResetPasswordForm.oldpwd=	$.trim($(".user-form input[type='password']").eq(0).val());
	 data.ResetPasswordForm.password=$.trim($(".user-form input[type='password']").eq(1).val());
	 var repwd=$.trim($(".user-form input[type='password']").eq(2).val());
		var check1=$("#checkpwd").val();
		var check2=$("#newpwd").val();
		var check3=$("#renewpwd").val();
		if(check1 == 0 || check2==0 || check3==0){
			return false;
		}

		$.ajax({
			url: "/user/resetpwd",
			type: "POST",
			dataType : 'json',
			data:data,
			success:function(r){
				if(r.code==0){
					$.LAYER.show({id:'tip-password-success'});
				}
				else{
					alert(r.msg);
				}
			}
			});	
	 
}
function remove_tip(){
	$.LAYER.close({id:'tip-password-success'});
	location.reload();
}