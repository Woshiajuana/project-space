$(function(){
	var data={};
	var tamstemp=new Date().getTime();
	var url="/user/captcha?v="+tamstemp+"&refresh=1";
	$.ajax({
		url:url,
		type:"GET",
		dataType:"json",
		data:{v:tamstemp},
		success: function(r){
			$("#captche_img").attr("src",r.url);
		}
	})
	
	//判断是否已绑定
	$.ajax({
		url: "/user/autoload",
		type: "POST",
		dataType : 'json',
		data: data,
		success: function (r){
			if(r.mobile !="" && r.mobile !=null && r.mobile != undefined){
			//	$("#remove-mobile").val(r.mobile);
				$("#mobile_p").show();
				$("#mobile_bind").hide();
				$("#user_mobile").text(r.countryCode+r.mobile);
				$("#remove-phone").show();
				$("#bind-phone").hide();
			}
			else{
				$("#mobile_p").hide();
				$("#mobile_bind").show();
				$("#remove-phone").hide();
				$("#bind-phone").show();
			}
			if(r.email !="" && r.email !=null && r.email != undefined && r.status !=9){
				$("#remove-email").show();
				$("#bind-email").hide();
				$("#email_1").show();
				$("#email_2").hide();
				$("#user_email").text(r.email);
			}
			else{
				$("#remove-email").hide();
				$("#bind-email").show();
				$("#email_1").hide();
				$("#email_2").show();
				$("#user_email").text(r.email);
			}
		}
	});
	$("#captche_img").click(function(){
		var tamstemp=new Date().getTime();
		var url="/user/captcha?v="+tamstemp+"&refresh=1";
		$.ajax({
			url:url,
			type:"GET",
			dataType:"json",
			data:{v:tamstemp},
			success: function(r){
				$("#captche_img").attr("src",r.url);
			}
		})
	});
	
})	
// 绑定手机
function bindphone(){

	var mobile=$("#user-mobile").val();
	var code=$("#mobile-code").val();
	var countryCode = $('#city-code').text();
	   //校验国内的手机号
		if(countryCode == '+86'){
			if(!(/^1[0-9][0-9]\d{4,8}$/.test(mobile)) || mobile.length != 11){
	    		layer.msg("手机号格式错误");
	    		return;	
	    	}
		}
	   if (!code){
		   layer.msg("请输入验证码");
		   return ;   
	   }
	   if(code.length !=4){
		   layer.msg("验证码长度错误");
		   return ;
	   }
	$.ajax({
		url:"/user/bindmobile",
		type:"POST",
		dataType:"json",
		data:{mobile:mobile,code:code,countryCode:countryCode},
		success:function(r){
			if(r.code==0){
				$.LAYER.close();
				$.LAYER.show({id:'tip-phone-success'});
				 $('#tip-phone-success').find('p').eq(0).text("您绑定的手机号码为:"+r.mobile);
				// setTimeout(location.reload(),2000);
			//	 $("#remove-mobile").val(r.mobile);
					$("#mobile_p").show();
					$("#mobile_bind").hide();
					$("#user_mobile").text(countryCode+mobile);
					$("#remove-phone").show();
					$("#bind-phone").hide();
			}
			else{
				$.LAYER.close();
				$("#user-mobile").val("");
				$("#mobile-code").val("");
				$.LAYER.show({id:'tip-warn'});  
				 $('#tip-warn').find('p').eq(0).text(r.msg);
			}
		}
	});
	
}
//生成验证码
var countdown=60;
function settime1() {
	
    if (countdown == 0) {
        $('#sendmsg1').show();
        $('#sendmsg-again1').hide();
        countdown = 60;
    } else {
        countdown--;
        $('#sendmsg-again1 i').html(countdown)
    }
    setTimeout(function() {
        settime1()
    },1000)
}
/*
 * 发送验证码
 * type 1 是绑定  2是重新绑定
 */
function sendcode(type){
		if(type == 1){
			var mobile=$.trim($("#user-mobile").val());
			var countryCode = $('#city-code').text();
		}else{
			var mobile=$.trim($("#remove-mobile").val());
			var countryCode = $('#city-code1').text();
		}
		
		//校验国内的手机号
		if(countryCode == '+86'){
			if(!(/^1[0-9][0-9]\d{4,8}$/.test(mobile))){
	    		layer.msg("手机号格式错误");
	    		return;	
	    	}
		}
		$.ajax({
			url:"/user/mobilecode",
			type:"POST",
			dataType:"json",
			data:{mobile:mobile,countryCode:countryCode},
			success:function(r){
				if(r.code==0){
					if(type == 1){
						 $('#sendmsg').hide();
					     $('#sendmsg-again').css('display','inline-block');
					     settime();
					}else{
						 $('#sendmsg1').hide();
					     $('#sendmsg-again1').css('display','inline-block');
					     settime1();
					}
					layer.msg(r.msg);
				}
				else{
					layer.msg(r.msg);
				}
			}
		});
}
//解除手机绑定
	function removephone(){
		var mobile=$("#remove-mobile").val();
		var code=$("#remove-code").val();
		var countryCode = $('#city-code1').text();
		
		//校验国内的手机号
		if(countryCode == '+86'){
			if(!(/^1[0-9][0-9]\d{4,8}$/.test(mobile)) || mobile.length != 11){
	    		layer.msg("手机号格式错误");
	    		return;	
	    	}
		}
		 if(!code){
			 layer.msg("请输入验证码");
			   return; 
		 }
		   if(code.length !=4){
			  layer.msg("验证码长度错误");
			   return;
		   }
		$.ajax({
			url:"/user/removemobile",
			type:"POST",
			dataType:"json",
			data:{mobile:mobile,code:code,countryCode:countryCode},
			success:function(r){
				if(r.code==0){
					$.LAYER.close();
					$.LAYER.show({id:'tip-phone-success'});
					 $('#tip-phone-success').find('p').eq(0).text("您绑定的手机号码为:"+r.countryCode+r.mobile);
					// setTimeout(location.reload(),2000);
				//	 $("#remove-mobile").val(r.mobile);
						$("#mobile_p").show();
						$("#mobile_bind").hide();
						$("#user_mobile").text(countryCode+mobile);
						$("#remove-phone").show();
						$("#bind-phone").hide();
				}
				else{
					$.LAYER.close();
					$("#remove-mobile").val("");
					$("#remove-code").val("");
					$.LAYER.show({id:'tip-warn'});  
					 $('#tip-warn').find('p').eq(0).text(r.msg);
				}
			}
		});
	}
 //校验邮箱
function checkemail(){
	var email=$.trim($("#user_email").text());
	if(email !="" && email !=null && email!=undefined){
		$("#tip-email").find('input').eq(0).val(email);
		$("#tip-email").find('input').eq(0).attr('readonly','readonly');
	}
	var tamstemp=new Date().getTime();
	var url="http://www.poppro.cn/user/captcha?v="+tamstemp+"&refresh=1";
	
	$.ajax({
		url:url,
		type:"GET",
		dataType:"json",
		data:{},
		success: function(r){
			$("#captche_img").attr("src",r.url);
		}
	})
} 
function bind_email(){
	var data={};
	data.EmailcodeForm={};
	data.EmailcodeForm.email=$("#tip-email").find('input').eq(0).val();
	data.EmailcodeForm.verifyCode=$("#tip-email").find('input').eq(1).val();
	
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 

	if (!reg.test(data.EmailcodeForm.email)){
		layer.msg("邮箱格式错误请重新输入");
		return;
	}
	if(!data.EmailcodeForm.verifyCode){
		layer.msg("请输入验证码");
	}
	if(data.EmailcodeForm.verifyCode.length>5 || data.EmailcodeForm.verifyCode.length<4){
		layer.msg("验证码长度错误");
		return;
	}
	
	$.ajax({
		url:"/user/checkemailcode",
		type:"POST",
		dataType:"json",
		data:data,
		success:function(r){
			if(r.code==0){
				$.LAYER.close();
				$.LAYER.show({id:'tip-mail-success'});
				$("#your_email").text(data.EmailcodeForm.email);
				
			}
			else{
				alert(r.msg);
			}
		}
		
	});
}
function resendemail(){
	$.LAYER.close({id:'tip-mail-success'});
	$.LAYER.show({id:'tip-email'});
	checkemail();
}
function colse_bind(){
	$.LAYER.close({id:'tip-phone-success'});
}