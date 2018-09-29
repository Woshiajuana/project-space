$(function(){
	/*
	 * 加载作品数量
	 */
	getUserWorkNum();
	getpiclist();
	/*
	 * 加载最热标签
	 */
	personalHotTag(WORK_MUSIC,userMainPersonalHotTag);
	/*
	 * 类别选择
	 */
	$('.search-nav li:eq(0)').click(function(e){
		pageTag = '';
		pageCat = WORK_MUSIC;
		personalHotTag(pageCat,userMainPersonalHotTag);
		page(1);
	})
	$('.search-nav li:eq(1)').click(function(e){
		pageTag = '';
		pageCat = WORK_PIC;
		personalHotTag(pageCat,userMainPersonalHotTag);
		page(1);
	})
	$('.search-nav li:eq(2)').click(function(e){
		pageTag = '';
		pageCat = WORK_TXT;
		personalHotTag(pageCat,userMainPersonalHotTag);
		page(1);
	})
	page(1);//加载默认页
})

var pageTag = '';//标签
var pageCat = WORK_MUSIC;//默认分类
var pageNum = 1;//页数
var pageSize = 10;//条数


function check_work(url ,state){
//	 if (state==1){
//		 layer.msg("请等待作品审核！");
//		 return ;
//	 }else 
//	if(state == 3){
//		 layer.msg("您的作品未通过审核！");
//		 return ;
//	 }else{
		 //window.location.href=url;
		 window.open(url);
//	 }
}

/*
 * 分页
 */
function page(num){
	pageNum = num;
	
	var listInfo = userWorkList(pageNum,pageSize);
	if(listInfo.count>0){
		var html = '';
		var list = listInfo['list'];
	
		if(pageCat == WORK_MUSIC){
			for(var i in list){
				if(listInfo.myself == 1){
					if(list[i]['state']==1){
					var delHtml = '<span class="user-status-2">审核中</span><a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a>';
					}else if(list[i]['state']==2){
						var delHtml = '<span class="user-status-1">审核通过</span><a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a>';
					}else if(list[i]['state']==3){
						var delHtml = '<span class="user-status-3">未通过</span><a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a>';
					}else{
						var delHtml = '<span class="user-status-1">优秀作品</span><a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a>';
					}
				}else{
					var delHtml = '';
				}
			
				html += '<ul class="user-music-line">'+
                    '<li class="col-1"><a style="color:#333;"   href="javascript:check_work('+"'"+list[i]['wLink']+"'"+','+list[i]['state']+');"><img width="45" height="60" src="'+list[i]['urlMini']+'">'+list[i]['title']+'</a></li>'+
                    '<li class="col-3">'+list[i]['time']+'</li>'+
                    '<li class="col-4">'+list[i]['mLength']+'</li>'+
                    '<li><a class="play"   href="javascript:check_work('+"'"+list[i]['wLink']+"'"+','+list[i]['state']+');"></a></li>'+
                    '<li class="col-5">'+delHtml+'</li></ul>';
			}
			$('#tabbox-1').html(html);
			$("#music_count").html(listInfo.count);
		}else if(pageCat == WORK_PIC){
			html+='<ul class="user-img-list">';
			for(var i in list){
				if(list[i]['workType']==1){
			
					var d3Class = ''; 
				}else{
				
					var d3Class = '<span class="ico-3d"></span>';
				}
				if(listInfo.myself == 1){
					if(list[i]['state']==1){
					var delHtml = '<span class="user-status-2">审核中</span><a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a>';
					}else if(list[i]['state'] == 2){
					var delHtml = '<span class="user-status-1">审核通过</span><a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a>';	
					}else if(list[i]['state'] == 3){
					var delHtml = '<span class="user-status-3">未通过</span><a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a>';
					}else{
					var delHtml = '<span class="user-status-1">优秀作品</span><a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a>';	
					}
					}else{
					var delHtml = '';
				}
				
				
				html+= '<li><p><a  style="color:#333;" href="javascript:check_work('+"'"+list[i]['wLink']+"'"+','+list[i]['state']+');"><span class="imgbox">'+d3Class+'<img width="150" src="'+list[i]['urlMini']+'"></span></p>'+
                    '<h4>'+list[i]['title']+'</a></h4>'+
                    '<div>'+list[i]['time']+'</div>'+
                    '<div>'+delHtml+'</div>'+
                '</li>';
			}
			html+='</ul>';
			$('#tabbox-2').html(html);
			$("#pic_count").html(listInfo.count);
		}else{
			for(var i in list){
				if(listInfo.myself == 1){
					if(list[i]['state']==1 ){
					var delHtml = '<a  href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a><span class="user-status-2">审核中</span>';
					}else if(list[i]['state']== 2){
						var delHtml = '<a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a><span class="user-status-1">审核通过</span>';	
					}else if (list[i]['state']==3){
						var delHtml = '<a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a><span class="user-status-3">未通过</span>';	
					}else{
						var delHtml = '<a href="javascript:delWork('+pageCat+',\''+list[i]['id']+'\',userDelWorkCallback);" class="del">删除</a><span class="user-status-1">优秀作品</span>';
					}
				}else{
					var delHtml = '';
				}
				html += '<ul class="user-txt-line user-txt-line1">'+
                '<li class="col-1"><a  style="color:#333;" href="javascript:check_work('+"'"+list[i]['wLink']+"'"+','+list[i]['state']+');"><img width="45" height="60" src="'+list[i]['urlMini']+'">'+list[i]['title']+'</a></li>'+
                '<li class="col-3">'+list[i]['time']+'</li>'+
                '<li class="col-4">'+list[i]['content']+'</li>'+
                '<li class="col-5">'+delHtml+'</li></ul>';
			}
			$('#tabbox-3').html(html);
			$("#txt_count").html(listInfo.count);
		}
		$app.pager('pagination', 'page', '', pageNum, listInfo.count,pageSize);
	}else{
		if(pageCat == WORK_MUSIC){
			$('#tabbox-1').html('<h1>UP主正在创作中</h1>');
		}else if(pageCat == WORK_PIC){
			$('#tabbox-2').html('<h1>UP主正在创作中</h1>');
		}else{
			$('#tabbox-3').html('<h1>UP主正在创作中</h1>');
		}
	}
}


/*
 * 用户页的最热标签
 */
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

/*
 * 用户作品列表
 */
function userWorkList(page,pageSize,tag){
	var returnJson = {}
	$.ajax({
		url:'../work/userworklist',
		type:'post',
		data:{type:pageCat,page:page,pageSize:pageSize,tag:pageTag,uId:queryString('id')},
		async:false,
		dataType:'json',
		success:function(r){
			returnJson = r;
		}
	})
	return returnJson;
}

/*
 * 用户页的删除作品回调
 */
function userDelWorkCallback(r){
	if(r.code == 0){
		layer.alert(r.msg);
		getUserWorkNum();
		page(1);
		
	}else {
		layer.alert(r.msg);
	}
}
//获取url参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	} 

/*
 * 计算作品数量
 */
function getUserWorkNum(){
	$.post('/work/userworknum',{uId:queryString('id')},function(r){
		$('.search-nav li a').eq(0).text('音乐（'+r.musicCount+'）');
		$('.search-nav li a').eq(1).text('画作/3D 建模（'+r.picCount+'）');
		$('.search-nav li a').eq(2).text('文字（'+r.txtCount+'）');
	},'json');
}

