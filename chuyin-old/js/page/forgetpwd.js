function sendemail(){
	var data={};
	data.PasswordResetRequestForm={};
	data.PasswordResetRequestForm.email=$.trim($("#user_email").val());
	data.PasswordResetRequestForm.verifyCode=$.trim($("#verify_code").val());

	var regEmail = /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	if(!regEmail.test(data.PasswordResetRequestForm.email)){
		alert("请输入正确的Email地址");
		return;
	}else{
		$.ajax({
			url: "/user/checkforgetemail",
			type: "POST",
			dataType : 'json',
			data:{email:data.PasswordResetRequestForm.email},
			success: function (r){
				if(r.code == 0){
					$.ajax({
						url: "/user/forget_pwd",
						type: "POST",
						dataType : 'json',
						data:data,
						success: function (r){
							if(r.code == 0){	
								$.ajax({
									url: "/user/sendforgetemail",
									type: "POST",
									dataType : 'json',
									data:{email:data.PasswordResetRequestForm.email},
									success: function (r){
										if(r.code == 0){
										layer.alert(r.msg,
										{
											icon:1,
											yes:function(){
											var email = r.email.split('@');
											window.open('http://mail.'+email[1]);
											}
										});
										}else{
										layer.alert(r.msg);
										return;
										}
									}
									});
							}else{
							alert(r.msg);
							return;
							}
						}
						});
				}else{
				alert(r.msg);
				return;
				}
			}
		});
	}
	
		
		
}	