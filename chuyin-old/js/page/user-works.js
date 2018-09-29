var user_id=queryString('id');
var pageTag = '';//标签
$(function(){
	personalHotTag(AC_MUSIC,userMainPersonalHotTag);
	acuser_pic(1);
	acuser_txt(1);
	acuser_music(1);
	getpiclist();
	$("#tab-2").click(function(){
		pageTag = '';
	personalHotTag(AC_PIC,userMainPersonalHotTag);
		acuser_pic(1);
	});
	$("#tab-1").click(function(){
		pageTag = '';
		personalHotTag(AC_MUSIC,userMainPersonalHotTag);
		acuser_music(1);
	});
	$("#tab-3").click(function(){
		pageTag = '';
		personalHotTag(AC_TXT,userMainPersonalHotTag);
		acuser_txt(1);
	});
	
});

function check_work(url ,state){
//	if(state == 3){
//		 layer.msg("您的作品未通过审核！");
//		 return ;
//	 }else{
		 //window.location.href=url;
	window.open(url);
//	 }
}
//最热标签
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
		if($("#tab-1").hasClass("on")){
			acuser_music(1);
		}else if($("#tab-2").hasClass("on")){
			acuser_pic(1);
		}else{
			acuser_txt(1);
		}
		
	})
}

function acuser_music(pageNum){
	$.ajax({
		url:'/work/user_music',
		type:'get',
		data:{page:pageNum,id:user_id,tag:pageTag},
		async:false,
		dataType:'json',
		success:function(r){
			var htmlstr="";
		for(var i in r['list']){
			htmlstr+='<ul class="user-works-line"><li class="col-1"><a  style="color:#333;text-decoration:none;" href="javascript:check_work('+"'"+r['list'][i]['wLink']+"&actId="+r['list'][i]['actId']+"'"+','+r['list'][i]['state']+')"><img src="'+r['list'][i]['urlMini']+'" style="width:45px;height:60px">'+r['list'][i]['title']+'</a></li><li class="col-3">'+r['list'][i]['time'];
		if(r['myself']==1){
			if(r['list'][i]['state']==1){
				htmlstr+='<span class="user-status-2">审核中</span>';
				}else if (r['list'][i]['state'] ==2){
				htmlstr+='<span class="user-status-1">审核通过</span>';
				}else if(r['list'][i]['state'] ==3 ){
				htmlstr+='<span class="user-status-3">未通过</span>';	
				}else{
				htmlstr+='<span class="user-status-1">优秀作品</span>';	
				}
		}
			htmlstr+='</li><li class="col-4">'+r['list'][i]['mLength']+'</li>';
			htmlstr+='<li><a  class="play" href="javascript:check_work('+"'"+r['list'][i]['wLink']+"&actId="+r['list'][i]['actId']+"'"+','+r['list'][i]['state']+')"></a></li>';
				htmlstr+='</ul>';
		}
		
		$("#tabbox-1").html(htmlstr);
		$("#music_count").html(r.count);
		if(r.count<=0){
			$("#tabbox-1").html('<h1>UP主正在创作中</h1>');
		}
		$app.pager('userwork_page','acuser_music','',pageNum,r.count,r.pagesize);
		}
	})	
}
function acuser_pic(pageNum){
	$.ajax({
		url:'/work/user_pic',
		type:'get',
		data:{page:pageNum,id:user_id,tag:pageTag},
		async:false,
		dataType:'json',
		success:function(r){

		var htmlstr='<ul class="user-img-list">';
		for(var i in r['list']){
			if(r['list'][i]['workType']==1){
				var d3Class ='';
			}else{
				var d3Class = '<span class="ico-3d"></span>'; 
			}
			
			htmlstr+='<li><p><a  style="color:#333;text-decoration:none;" href="javascript:check_work('+"'"+r['list'][i]['wLink']+"&actId="+r['list'][i]['actId']+"'"+','+r['list'][i]['state']+')"><span class="imgbox">'+d3Class+'<img src="'+r['list'][i]['urlMini']+'" style="width:150px;"></span></p><h4>'+r['list'][i]['title']+'</a></h4><div>'+r['list'][i]['time']+'</div>';
		if(r['myself']==1){	
			if(r['list'][i]['state']==1){
			htmlstr+='<div><span class="user-status-2">审核中</span></div>';
			}else if (r['list'][i]['state'] ==2){
			htmlstr+='<div><span class="user-status-1">审核通过</span></div>';
			}else if(r['list'][i]['state'] ==3 ){
			htmlstr+='<div><span class="user-status-3">未通过</span></div>';	
			}else{
			htmlstr+='<div><span class="user-status-1">优秀作品</span></div>';	
			}
		}
			htmlstr+='</li>';
		}
	
		$("#tabbox-2").html(htmlstr);
		$("#pic_count").html(r.count);
		if(r.count<=0){
			$("#tabbox-2").html('<h1>UP主正在创作中</h1>');
		}
		$app.pager('userwork_page','acuser_pic','',pageNum,r.count,r.pagesize);
		}
	})	
}
function acuser_txt(pageNum){
	$.ajax({
		url:'/work/user_txt',
		type:'get',
		data:{page:pageNum,id:user_id,tag:pageTag},
		async:false,
		dataType:'json',
		success:function(r){
			var htmlstr="";
		for(var i in r['list']){
			htmlstr+='<ul class="user-txt-line"><li class="col-1"><a   style="color:#333;text-decoration:none;" href="javascript:check_work('+"'"+r['list'][i]['wLink']+"&actId="+r['list'][i]['actId']+"'"+','+r['list'][i]['state']+')" style="text-decoration:none;color:#999"><img width="45px" src="'+r['list'][i]['urlMini']+'">'+r['list'][i]['title']+'</a></li><li class="col-3">'+r['list'][i]['time'];
		if(r['myself']==1){	
			if(r['list'][i]['state']==1){
				htmlstr+='<span class="user-status-2">审核中</span>';
				}else if (r['list'][i]['state'] ==2){
				htmlstr+='<span class="user-status-1">审核通过</span>';
				}else if(r['list'][i]['state'] ==3 ){
				htmlstr+='<span class="user-status-3">未通过</span>';	
				}else{
				htmlstr+='<span class="user-status-1">优秀作品</span>';	
				}
		}
				htmlstr+='</li><li class="col-4"><a  href="javascript:check_work('+"'"+r['list'][i]['wLink']+"&actId="+r['list'][i]['actId']+"'"+','+r['list'][i]['state']+')" style="text-decoration:none;color:#999">'+r['list'][i]['content']+'</a></li>';
				htmlstr+='</ul>';
		}
		
		$("#tabbox-3").html(htmlstr);
		$("#txt_count").html(r.count);
		if(r.count<=0){
			$("#tabbox-3").html('<h1>UP主正在创作中</h1>');
		}
		$app.pager('userwork_page','acuser_txt','',pageNum,r.count,r.pagesize);
		}
	})	
}