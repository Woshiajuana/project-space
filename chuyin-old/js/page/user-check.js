var pageNum =1;
$(function(){
	checkbase();
	getselect();
	 User_worklist(pageNum);
})
function User_worklist(pageNum){
		var aid =$(".select-1").find("option:selected").val();
		$.ajax({
			url: "/work/usercheck_worklist",
			type: "POST",
			dataType : 'json',
			data: {aid:aid,page:pageNum},
			async:false,
			success: function (r){	
				var htmlstr="";
				if(r.count>0){
					for (var i in r['list']){
						htmlstr+="<li><img src='"+r['list'][i]['urlMini']+"'> </li>";
						}	
				}else{
						htmlstr+="暂无作品";
				}
				
				$("#lengthid").val(r.count);
				$(".imglist").html(htmlstr);
				$app.pager('userwork_list','User_worklist','',pageNum,r.count,r.pagesize);	
				
				if(r.count<5){
					$("#tishi_span").show();
					$("#submit").addClass("btn-disable");
					}else{
						$("#tishi_span").hide();	
						$("#submit").removeClass("btn-disable");
					}
				
				}
		});
}


$(".select-1").bind("change",function(){
    var aid =$(this).find("option:selected").val();
	$.ajax({
		url: "/work/usercheck_worklist",
		type: "POST",
		dataType : 'json',
		data: {aid:aid,page:pageNum},
		async:false,
		success: function (r){	
			var htmlstr="";
			if(r.count>0){
				for (var i in r['list']){
					htmlstr+="<li><img src='"+r['list'][i]['urlMini']+"'> </li>";
					}
				$("#userwork_list").show();
			}else{
					htmlstr+="暂无作品";
					$("#userwork_list").hide();
			}
			$("#lengthid").val(r.count);
			$(".imglist").html(htmlstr);
			if(r.count<5){

				$("#tishi_span").show();
				$("#submit").addClass("btn-disable");
				}else{
					$("#submit").removeClass("btn-disable");	
					$("#tishi_span").hide();	
				}
			$app.pager('userwork_list','User_worklist','',pageNum,r.count,r.pagesize);	
			
		
		}
	});
});

function send_msg(){
	var aid =$(".select-1").find("option:selected").val();
	var other =  $(".input-2").val();
	var length = $("#lengthid").val();
	if(length < 5){
		systemTip("您的作品数量不够");
		return ;
	}
	$.ajax({
		url: "/user/authentication",
		type: "POST",
		dataType : 'json',
		data: {aid:aid,other:other},
		async:false,
		success: function (r){	
			if(r.code == 3){
				systemTip(r.msg);
				location.href="./user_check_base.html";
			}else if(r.code == 0){
				systemTip(r.msg);
				location.href="./user-main.html";
				
			}else{
				systemTip(r.msg);
			}
		}
	});
}

function getselect(){	
	$.ajax({
		url: "/user/getcateauthen",
		type: "POST",
		dataType : 'json',
		data: {},
		async:false,
		success: function (r){	
			var str ='';
			for(var i in r){
				str+='<option value="'+r[i]['id']+'">'+r[i]['name']+'</option>';
			}
			$(".select-1").html(str);
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
					location.href="./user_check_base.html";
				}
		}
	});
}