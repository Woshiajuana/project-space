


// 兑换徽章
function getBadge(id){
	$.ajax({
		url: "../user/getbadge",
		type: "POST",
		dataType : 'json',
		async : false,
		data: {id:id},
		success: function (r){
			if(r.code == 0){
				$("#badge"+id).text("已兑换");
				$("#badge"+id).css("background-color","#ccc");
				var score = $(".jf-ico-1 span").text();
				 var nowscore = score - r.score;
				$(".jf-ico-1 span").text(nowscore);
				if($(".user-icon-wrap:eq(1)").find("img").length>0){
					$(".user-icon-wrap").eq(1).append("<img src='"+r.picurl+"' alt=''/>");
				}else{
					$(".user-icon-wrap").eq(1).html("<img src='"+r.picurl+"' alt=''/>");
				}
				
			}
				systemTip(r.msg);
		
		}
	});
}

// 兑换头像框
//function getHead(id){
//	$.ajax({
//		url: "../user/getheadframe",
//		type: "POST",
//		dataType : 'json',
//		async : false,
//		data: {id:id},
//		success: function (r){
//			if(r.code == 0){
//				$("#head"+id).text("已兑换");
//				var score = $(".jf-ico-1 span").text();
//				 var nowscore = score - r.score;
//				$(".jf-ico-1 span").text(nowscore);
//			}
//			systemTip(r.msg);
//		}
//	});
//}
// 显示所有徽章
function showBadge(pageNum){
	$.ajax({
		url: "../user/showbadge",
		type: "POST",
		dataType : 'json',
		async : false,
		data: {pageNum:pageNum},
		success: function (r){
			var htmlstr= '';
			for (var i in r['list']){
				if(r['list'][i]['userbadge'] == '已兑换'){
					var a_str ='<a style="background-color:#ccc;" href="javascript:;">已兑换</a></li><li>';				
				}
				else if(r['list'][i]['userbadge'] == '无法兑换'){
					var a_str ='<a style="background-color:#ccc;" href="javascript:;">限定</a></li><li>';	
				}else{
					var a_str ='<a id="badge'+r['list'][i]['id']+'" href="javascript:getBadge('+r['list'][i]['id']+');">兑换</a></li><li>';
				}
				 htmlstr+='<li title="所需积分:'+r['list'][i]['score']+'"><div><img src="'+r['list'][i]['url']+'" width="150px" height="150px"/></div><h3>'+r['list'][i]['name']+'</h3>'+a_str;
                      
				}	
			$(".exchange-box ul").html(htmlstr);
			$app.pager('pagination-new','showBadge','',pageNum,r.count,r.pagesize);	
		}
	});
}


// 显示所有头像框
function showHeadFrame(pageNum){
	$.ajax({
		url: "../user/showheadframe",
		type: "POST",
		dataType : 'json',
		async : false,
		data: {pageNum:pageNum},
		success: function (r){
			var htmlstr= '';
			for (var i in r['list']){
				if(r['list'][i]['userframe'] == '已兑换'){
					var a_str ='<a href="javascript:;">已兑换</a></li><li>';
				}else{
					var a_str ='<a id="head'+r['list'][i]['id']+'" href="javascript:getHead('+r['list'][i]['id']+');">兑换</a></li><li>';
				}
				 htmlstr+='<li title="所需积分:'+r['list'][i]['score']+'"><div><img src="'+r['list'][i]['url']+'" width="150px" height="150px"/></div><h3>'+r['list'][i]['name']+'</h3>'+a_str;
                      
				}	
			$(".exchange-box ul").html(htmlstr);
			$app.pager('pagination-new','showHeadFrame','',pageNum,r.count,r.pagesize);	
		}
	});
}

function cancel(){
	 $.LAYER.close({id:'tip-warn-1'});
}
function havelist(){
	gethave();
	$(".badgelist li").click(function(){
	str =$(this).html();
	if( $(this).find("span").length == 0){
		$(this).find("img").after("<span></span>");
	
	}else{
		$(this).find("img").next().remove("span");
	}
})

	$(".headlist li").click(function(){
		 str =$(this).html();
		if( $(this).find("span").length == 0){
			$(this).find("img").after("<span></span>");
		
		}else{
			$(this).find("img").next().remove("span");
		}
	})
    $.LAYER.show({id:'tip-warn-1'});
}
// 获取自己拥有的头像框和徽章列表
function gethave(){
	$.ajax({
		url: "../user/gethavelist",
		type: "POST",
		dataType : 'json',
		async : false,
		data: {},
		success: function (r){
			var badgestr = '';
			var headstr = '';
			console.dir(r);
			if(r.badge){
				var badge = r.badge;
				console.dir(r);
				for(var i in badge){
					if(IsInArray(r.showbadge,badge[i].id)){ 
						badgestr+='<li value ="'+badge[i].id+'"><img src="'+badge[i].url+'" width="50px" height="50px"><span></span></li>';
					}else{
						badgestr+='<li value ="'+badge[i].id+'"><img src="'+badge[i].url+'" width="50px" height="50px"></li>';
					}
				}
			}else{
					badgestr ='您尚未 拥有徽章请先兑换！';
			}
//			if(r.headframe){
//				var headframe = r.headframe;
//				for(var i in headframe){
//					if(r.showframe == headframe[i].id){
//						headstr+='<li value="'+headframe[i].id+'"><img src="'+headframe[i].url+'" width="50px" height="50px"><span></span></li>';
//					}else{
//						headstr+='<li value="'+headframe[i].id+'"><img src="'+headframe[i].url+'" width="50px" height="50px"></li>';
//					}
//				}
//			}else{
//				headstr ='您尚未 拥有头像框请先兑换！';
//			}
//			$(".headlist").html(headstr);
			$(".badgelist").html(badgestr);
		}
	});
}
//提交选中的显示徽章
function sendshowlist(){
		var length = $(".badgelist li").length;
		var arr =[];
		for(var j=0; j<length; j++){
			if($(".badgelist li").eq(j).find("span").length != 0){
				arr.push($(".badgelist li").eq(j).attr("value"));
			}
		}
		$.ajax({
			url: "../user/changebadge",
			type: "POST",
			dataType : 'json',
			async : true,
			data: {arr:arr},
			success: function (r){
				if(r.code==0){
					var b_str = '';
					if(r.arr.length>0){
					
						for(var i in r.arr){
							b_str += "<img src='"+r.arr[i]+"' alt =''/>"	;
						}
					}else{
						 b_str ='暂无显示徽章';
					}
					 
					 $(".user-icon-wrap").eq(1).html(b_str);
						if($(".user-info li:eq(5)").find("a").length<=0){
							$(".user-icon-wrap:eq(1)").after('<a style="float:right;" href="javascript:havelist();">管理</a>');
						}
						alert("操作成功");	
					 $.LAYER.close({id:'tip-warn-1'});
				}else{
					alert(r.msg);
				}

			}
		});
		
}
// 判断数组是否含有某个值
function IsInArray(arr,val){ 
	 
	　　var testStr=','+arr.join(",")+","; 
	 
	　　return testStr.indexOf(","+val+",")!=-1; 
	 
	} 

//  全选按钮 

	$(".tipbox-new-footer span").click(function(){
		var length = $(".badgelist li").length;
		if($(this).hasClass("select")){
				$(this).removeClass("select");
				for(var i=0; i<length; i++){
					if($(".badgelist li").eq(i).find("span").length != 0){
						$(".badgelist li").eq(i).find("img").next().remove("span");
					}
				}
		}else{
			$(this).addClass("select");
			for(var i=0; i<length; i++){
				if($(".badgelist li").eq(i).find("span").length == 0){
					$(".badgelist li").eq(i).append("<span></span>");
				}
			}
		}
	})

function gettask(id){
		$.ajax({
			url: "../user/showtask",
			type: "POST",
			dataType : 'json',
			async : false,
			data: {id:id},
			success: function (r){
				var htmlstr='';
				
				for(var i in r){
					var liststr='';
					htmlstr+='<p class="pop-con-prompt">'+r[i]['desc']+'</p>';	
					htmlstr+='<ul class="pop-con-list">';
						for(var j in r[i]){
							if(j==0){
								htmlstr+='<div class="pop-con-head"><font color="white"><span>'+r[i][j]['name']+'</span><span>'+r[i][j]['value']+'</span></font></div>';
							}else if(j=='desc'){
								
							}else{
								liststr+= '<li><span>'+r[i][j]['name']+'</span><span>'+r[i][j]['value']+'</span></li>';					
							}
						
						}	
					
					htmlstr+=liststr+'</ul>';
				}
				$(".pop-con").html(htmlstr);
			}
		});
	}
	
	function hidediv(){
		$(".pop-wrap").hide();
	}
	function showdiv(){
		$(".pop-wrap").show();
	}

	
	
	function userMainPersonalHotTag(r){
		var html = '';
		for(var i in r){
			html += '<li><a href="javascript:void(0);" tId="'+r[i].id+'">'+r[i].name+'</a></li>';
		}
		$('.user-taglist').html(html);
		$('.user-taglist a').click(function(){
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				pageTag = '';
			}else{
				$('.user-taglist a').removeClass('on');
				$(this).addClass('on');
				pageTag = $(this).attr('tId');
			}
			page(1);
		})
	}
