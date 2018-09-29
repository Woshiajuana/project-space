$(function(){
	/*
	 * 加载作品数量
	 */
	$.post('/work/collectcount',{uId:queryString('id')},function(r){
		$('.search-nav li a').eq(0).text('音乐（'+r.musicCount+'）');
		$('.search-nav li a').eq(1).text('图片/3D 建模（'+r.picCount+'）');
		$('.search-nav li a').eq(2).text('文字（'+r.txtCount+'）');
	},'json');
	
	/*
	 * 类别选择
	 */
	$('.search-nav li:eq(0)').click(function(e){
		pageCat = WORK_MUSIC;
		page(1);
	})
	$('.search-nav li:eq(1)').click(function(e){
		pageCat = WORK_PIC;
		page(1);
	})
	$('.search-nav li:eq(2)').click(function(e){
		pageCat = WORK_TXT;
		page(1);
	})
	page(1);//加载默认页
	getpiclist();
})

var pageTag = '';//标签
var pageCat = WORK_MUSIC;//默认分类
var pageNum = 1;//页数
var pageSize = 10;//条数




/*
 * 分页
 */
function page(num){
	pageNum = num;
	var listInfo = collectList(pageNum,pageSize);
	if(listInfo.count>0){
		var html = '';
		var list = listInfo['list'];
		if(pageCat == WORK_MUSIC){
			for(var i in list){
				if(listInfo.myself == 1){
					var delHtml = '<a href="javascript:cancelCollect('+pageCat+',\''+list[i]['id']+'\');" class="del">删除</a>'
				}else{
					var delHtml = '';
				}
				
				html += '<ul class="user-music-line">'+
                    '<li class="col-1"><a  target="_blank" style="text-decoration:none;" href="'+list[i]['wLink']+'"><img width="45" height="60" src="'+list[i]['urlMini']+'">'+list[i]['title']+'</a></li>'+
                    '<li class="col-3">'+list[i]['time']+'</li>'+
                    '<li class="col-4">'+list[i]['mLength']+'</li>'+
                    '<li><a target="_blank" class="play" href="'+list[i]['wLink']+'"></a></li>'+
                    '<li class="col-5">'+delHtml+'</li></ul>';
			}
			$('#tabbox-1').html(html);
		}else if(pageCat == WORK_PIC){
			for(var i in list){
				if(list[i]['workType']==1){
					var d3Class = ''; 
				}else{
					var d3Class = '<span class="ico-3d"></span>'; 
				}
				if(listInfo.myself == 1){
					var delHtml = '<a href="javascript:cancelCollect('+pageCat+',\''+list[i]['id']+'\');" class="del">删除</a>'
				}else{
					var delHtml = '';
				}
				html += '<li><p><a href="'+list[i]['wLink']+'"><span class="imgbox">'+d3Class+'<img width="150" src="'+list[i]['urlMini']+'"></span></a></p>'+
                    '<h4>'+list[i]['title']+'</h4>'+
                    '<div>'+list[i]['time']+'</div>'+
                    '<div>'+delHtml+'</div>'+
                '</li>';
			}
			$('#tabbox-2 .user-img-list').html(html);
		}else{
			for(var i in list){
				if(listInfo.myself == 1){
					var delHtml = '<a href="javascript:cancelCollect('+pageCat+',\''+list[i]['id']+'\');" class="del">删除</a>'
				}else{
					var delHtml = '';
				}
				html += '<ul class="user-txt-line">'+
                '<li class="col-1"><a style="text-decoration:none;color:#333;" href="'+list[i]['wLink']+'"><img width="45" height="60" src="'+list[i]['urlMini']+'">'+list[i]['title']+'</a></li>'+
                '<li class="col-3">'+list[i]['time']+'</li>'+
                '<li class="col-4">'+list[i]['content']+'</li>'+
                '<li class="col-5">'+delHtml+'</li></ul>';
			}
			$('#tabbox-3').html(html);
		}
		$app.pager('pagination', 'page', '', pageNum, listInfo,pageSize);
	}else{
		if(pageCat == WORK_MUSIC){
			$('#tabbox-1').html('<h1>收藏列表为空</h1>');
		}else if(pageCat == WORK_PIC){
			$('#tabbox-2 .user-img-list').html('<h1>收藏列表为空</h1>');
		}else{
			$('#tabbox-3').html('<h1>收藏列表为空</h1>');
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
function collectList(page,pageSize){
	var returnJson = {}
	$.ajax({
		url:'../work/collectlist',
		type:'post',
		data:{type:pageCat,page:page,pageSize:pageSize,uId:queryString('id')},
		async:false,
		dataType:'json',
		success:function(r){
			returnJson = r;
		}
	})
	return returnJson;
}

function cancelCollect(type,wId){
	$.ajax({
		url:'../work/cancelcollect',
		type:'post',
		data:{type:type,wId:wId},
		dataType:'json',
		success:function(r){
			if(r.code == 0){
				layer.alert(r.msg);
				page(1);
				$.post('/work/collectcount',{uId:queryString('id')},function(r){
					$('.search-nav li a').eq(0).text('音乐（'+r.musicCount+'）');
					$('.search-nav li a').eq(1).text('图片/3D 建模（'+r.picCount+'）');
					$('.search-nav li a').eq(2).text('文字（'+r.txtCount+'）');
				},'json');
			}else{
				layer.alert(r.msg);
			}
		}
	})
}

