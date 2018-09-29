/*
 *  reg2.html页面的js
 *  
 */


$(function(){
	$('.form-user input').keyup(function(){
	    var str = $(this).val();
	    str = str.replace(/\s+/g,'');
	  $(this).val(str);
	});
	
	$('.form-user input').val(decodeURI(queryString('username')));
	$('.form-sex select').val(queryString('sex'));
})


/*
 * 注册的后一步
 */
function register1(){
	var data = {};
	data.SignupForm1 = {};
	data.SignupForm1.username = $.trim($('.form-user input').val());
	data.SignupForm1.sex =$.trim($('.form-sex select option:selected').val());
	data.SignupForm1.birthday = $.trim($('#datapicker').val());
	$.ajax({
		url: "/user/signup1",
		type: "POST",
		dataType : 'json',
		data: data,
		success: function (r){
			if(r.code == 0){
				cookie('siteLogin',1);
				cookie('infoProblem',0,{});
				location.href="./usermain.html";
			}else{
				alert(r.msg);
			}
		}
	});
}






