var pageNum =1;
$(function(){
	checkbase();
})


function send_msg(){
	var cardtype =$(".select-1").find("option:selected").text();
	var truename =  $("#truename").val();
	var mobile = $("#mobile").val();
	var name  = $("#name").val();
	var card = $("#card").val();
	var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
	var cardreg = /^[0-9a-zA-Z]+$/;
    if (!reg.test(mobile)) {
    	systemTip("手机号格式不正确");
		return;
    }
	if(!truename || truename == ''){
		systemTip("请填写真实姓名");
		return;
	}
	if(!name || name == ''){
		systemTip("请填写用户名");
		return;
	}
	if(!card || card == ''){
		systemTip("请填写证件号码");
		return;
	}
    if (!cardreg.test(card)) {
    	systemTip("证件号只可输入数字和字母");
		return;
    }
	$.ajax({
		url: "/user/baseauthen",
		type: "POST",
		dataType : 'json',
		data: {cardtype:cardtype,truename:truename,mobile:mobile,name:name,card:card},
		async:false,
		success: function (r){	
				if(r.code == 0){
					location.href="./user_check.html";
				}else{
					alert(r.msg);
				}
		}
	});
	
}
function checkbase(){
	$.ajax({
		url: "/user/checkbase",
		type: "POST",
		dataType : 'json',
		data: {},
		async:false,
		success: function (r){	
				if(r.code == 1){
					
				}else{
					console.dir(r);
					$(".select1").val(r.cardtype);
					 $("#truename").val(r.truename);
					$("#mobile").val(r.mobile);
					 $("#name").val(r.name);
					$("#card").val(r.card);
				}
		}
	});
}