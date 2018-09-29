/*
 *  reg2.html页面的js
 *  
 */


$(function(){
	//注册按钮的点击事件
	$('.goto-finish').click(function(){
		register1();
	});
	$('input[name="name"]').keyup(function(){
	    var str = $(this).val();
	    str = str.replace(/\s+/g,'');
	  $(this).val(str);
	});

		$('input[name="name"]').val(decodeURI(queryString('username')));
		$("input[name='sex'][value="+queryString('sex')+"]").attr("checked",true);  
	
})


/*
 * 注册的后一步
 */
function register1(){
	var data = {};
	data.SignupForm1 = {};
	data.SignupForm1.username = $.trim($('input[name="name"]').val());
	data.SignupForm1.sex =$.trim($("input[name='sex']:checked").val());
	data.SignupForm1.birthday = $.trim($('#datepicker').val());

	$.ajax({
		url: "/user/signup1",
		type: "POST",
		dataType : 'json',
		data: data,
		success: function (r){
			if(r.code == 0){
				cookie('siteLogin',1,{'path':'/'});
				cookie('infoProblem',0,{'path':'/'});
				window.location.href = './reg-3.html';
			}else{
				systemTip(r.msg);
			}
		}
	});
}






