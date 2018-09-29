var headUrl;
$(function(){
	//主人态&&客人态	
	var user_id=queryString('id');
	
//		$.ajax({
//			url:'/user/compareid',
//			type:"post",
//			data:{id:user_id},
//			dataType:"json",
//			async:false,
//			success:function(r){
//				alert(r);
//				exit;
//				if(r.code==2){
//					$(".user-info-l").html('<ul><li><a href="user-info.html" class="on">基础资料</a></li></ul>');
//					show_id=r.id;
//				}
//				else{
//				$(".user-info-l").html('<ul><li><a href="user-info.html" class="on">基础资料</a></li><li><a href="user-password.html">修改密码</a></li><li><a href="user-bind.html">关联绑定</a></li></ul>');
//				 show_id=r.id;
//				}
//			}
//		});

	$("#ChinaArea").jChinaArea();
	//完善资料的点击事件
		$.ajax({
			url: "/user/autoload",
			type: "POST",
			dataType : 'json',
			data: {id:user_id},
			async:true,
			success: function (r){
			
				if(r.ismyself==1){
				var title ='';
				$(".user-form input[type='text']").eq(0).val(r.username);
//				if(r.checknamenum>=2 || r.checknamenum<0){
//					if(r.checknamenum<0){
//						title ="您当前积分不足("+r['yearnamenum']['score']+")"
//					}else{
//						title="每年修改两次("+r.checknamenum+"/"+r['yearnamenum']['num']+")";
//					}
//					$(".user-form input[type='text']").eq(0).attr("readonly","readonly");
//					}	
				$(".user-form input[type='text']").eq(0).attr("readonly","readonly");
				$(".user-form input[type='text']").eq(0).after("<span>"+title+"</span>");
				$(".user-form input[type='text']").eq(1).val(r.email);
				$(".user-form input[type='text']").eq(2).val(r.name);	
					$(".user-form input[type='text']").eq(3).val(r.mobile);
					var val=Selectvalue("province",r.province);
					$("#province option[value='"+val+"']").attr("selected","selected");
					$("#province").change();
					var val=Selectvalue("city",r.city);
					$("#city option[value='"+val+"']").attr("selected","selected");
					$("#addr").val(r.addr);
					$("input[name='sex'][value='"+r.sex+"']").attr("checked",true);
					$("input[name='birthday']").val(r.birthday);
					$("input[name='birthday']").attr("readonly","readonly");
					
					$("#personalDesc").val(r.personalDesc);
						if(r['personalDesc']){
							$("#descbox-count i").html(r['personalDesc'].length);
						}
						else{
						$("#descbox-count i").html("0");
						}
					if (isUseH5()) {
						$('.imgbox').html('<img id="user_head" style="width:100px;height:100px" src="'+r.head+'">');
					}
					else {
						$('.uploadify-queue').html('<img id="user_head" style="width:100px;height:100px" src="'+r.head+'">');
					}
					$(".user-form li:eq(0)").css("display","block");
					$(".user-form li:eq(1)").css("display","block");
					$(".user-form li:eq(2)").css("display","block");
					$(".user-form li:eq(3)").css("display","block");
					$(".user-form li:eq(4)").css("display","block");
					$(".user-form li:eq(5)").css("display","block");
					$(".user-form li:eq(6)").css("display","block");
					$(".user-form li:eq(7)").css("display","block");
					$(".submit-btn").show();
					$("#show_xgmm li:eq(1)").css("display","block");
					$("#show_xgmm li:eq(2)").css("display","block");
			}else{
					
					$("#read_username").html(r.username);
					$("#read_email").html(r.email);
					$("#read_nick").html(r.name);
					$("#read_mobile").html(r.mobile);
					$("#read_birthday").html(r.birthday);
					$("#read_personalDesc").html(r.personalDesc);
					$("#ChinaArea").html(r.province+r.city+r.addr);
					if(r.province==null  || r.province ==undefined){
						r.province="";
					}
					if(r.city==null || r.province ==undefined){
						r.city=="";
					}
					if(r.addr==null || r.province==undefined){
						r.addr="";
					}
					if(r.addr != "" || r.province != "" || r.city != ""){
						$("#ChinaArea").html(r.province+r.city+r.addr);
					}
					else{
						$("#ChinaArea").html("未填写");
					}
					if(!r.mobile){
						$("#read_mobile").html("未填写");
					}
					if(!r.name){
						$("#read_nick").html("未填写");
					}
					if(!r.birthday){
						$("#read_birthday").html("未填写");
					}
					if(!r.personalDesc){
						$("#read_personalDesc").html("未填写");
						$("#descbox-count").hide();
					}
					if(r.sex==1){
						$("#read_sex").html("男");
					}
					else{
						$("#read_sex").html("女");
					}
					
//						var val=Selectvalue("province",r.province);
//						$("#province option[value='"+val+"']").attr("selected","selected");
//						$("#province").change();
//						var val=Selectvalue("city",r.city);
//						$("#city option[value='"+val+"']").attr("selected","selected");
					
						//$("#addr").val(r.addr).attr("readonly":"readonly");
						//$("input[name='sex'][value='"+r.sex+"']").prop("checked",true);
						//$("input[name='sex']").attr("readonly","readonly");
						
			//		$("#SWFUpload_0").hide();
					$(".user-form li:eq(0)").css("display","block");
					$(".user-form li:eq(5)").css("display","block");
					$(".user-form li:eq(6)").css("display","block");
					$(".user-form li:eq(7)").css("display","block");
		
					$(".uploadify").hide();
					$(".submit-btn").hide();
					if (isUseH5()) {
						$('.imgbox').html('<img id="user_head" style="width:100px;height:100px" src="'+r.head+'">');
					}
					else {
						$('.uploadify-queue').html('<img id="user_head" style="width:100px;height:100px" src="'+r.head+'">');
					}
					$(".user-info-l").html('<ul><li><a class="on">基础资料</a></li></ul>');
					
				}
		}
	});
	$("#personalDesc").click(function(){
		var textarea=$.trim($("#personalDesc").val());
		if(textarea=='内容不超过100个字'){
		
			$("#personalDesc").val("");
		}
		
	});
	$(".user-form input[type='text']").eq(3).blur(function(){
		var mobile=$(".user-form input[type='text']").eq(3).val();
		
			 
				$.ajax({
					url: "/user/checkmobile",
					type: "POST",
					dataType : 'json',
					data:{mobile:mobile} ,
					success: function (r){
						if(r.code == 2){	
							$("#mobile_error").text(r.msg);
						}else if(r.code == 1){
							
							$("#mobile_error").text(r.msg);
						}
						else{
							$("#mobile_error").text("");
						}
						
					}
				});
		 
	});
	$(".user-form input[type='text']").eq(0).blur(function(){
		var username=$.trim($(".user-form input[type='text']").eq(0).val());
		$.ajax({
			url: "/user/checkmobile",
			type: "POST",
			dataType : 'json',
			data:{username:username} ,
			success: function (r){
				if(r.code == 2){
					
					$("#username_error").text(r.msg);
				}else if(r.code == 1){
					$("#username_error").text(r.msg);
				}
				else{
					$("#username_error").text("");
				}
			}
		});
	});
//	$(".user-form input[type='text']").eq(2).blur(function(){
//		var name=$.trim($(".user-form input[type='text']").eq(2).val());
//		if(name.length=='' || name.length>12){
//			$("#name_error").show();
//			}
//		else{
//			$("#name_error").hide();
//		}
//	});
//	
	
	
});

function Selectvalue(obj,text) {  
    var val = "";  
    $("#"+obj+" option").each(function () {  
        if ($(this).text() == text) {  
            val = $(this).val();  
            return false;  
        }  
    });  
    return val;  
} 

 // 完善资料

function perfect(){
	var data={};
	data.PerfectForm={};
	data.PerfectForm.username=$.trim($(".user-form input[type='text']").eq(0).val());
	//data.PerfectForm.email=$(".user-form input[type='text']").eq(1).val();
	data.PerfectForm.name=$.trim($(".user-form input[type='text']").eq(2).val());
	data.PerfectForm.mobile=$.trim($(".user-form input[type='text']").eq(3).val());
	data.PerfectForm.province=$.trim($("#province option:selected").text());
	data.PerfectForm.city=$.trim($("#city option:selected").text());
	data.PerfectForm.addr=$.trim($("#addr").val());
	data.PerfectForm.sex=$.trim($("input[name='sex']:checked").val());
	data.PerfectForm.birthday=$.trim($("input[name='birthday']").val());
	data.PerfectForm.personalDesc=$.trim($("#personalDesc").val());
	data.PerfectForm.head=$.trim($("#user_head").attr("src"));
	if(data.PerfectForm.province == "省/直辖市"){
		data.PerfectForm.province="";
	}
	if(data.PerfectForm.city=="城市"){
		data.PerfectForm.city="";
	}
	if(data.PerfectForm.personalDesc=="内容不超过100个字"){
		data.PerfectForm.personalDesc="";
	}
		$.ajax({
			url: "/user/perfect",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					layer.alert(r.msg,
							{
							icon:1,
							yes:function(){
								location.reload();
							}
						});
					
				}else{
					layer.alert(r.msg,
							{
							icon:2,
							yes:function(){
								location.reload();
							}
						});
				}
			}
		});

	
}
