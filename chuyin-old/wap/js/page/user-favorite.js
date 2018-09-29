var pageTag = '';//标签
var pageCat = WORK_MUSIC;//默认分类
var pageNum = 1;//页数
var pageSize = 10;//条数


$(function(){
	if(!checkLogin()){
		window.location.href = 'login.html';
		return ;
	}
	/*
	 * 加载作品数量
	 */
	$.post('/work/collectcount',{uId:queryString('id')},function(r){
		$('.threetab li ').eq(0).text('音乐（'+r.musicCount+'）');
		$('.threetab li ').eq(1).text('画作/3D 建模（'+r.picCount+'）');
		$('.threetab li ').eq(2).text('文字（'+r.txtCount+'）');
	},'json');
	
	/*
	 * 类别选择
	 */
	$('.threetab li:eq(0)').click(function(e){
		pageCat = WORK_MUSIC;
		pageSize = 10;
		$('.submusiclist ul').html('');
		page(1);//加载默认页
	})
	$('.threetab li:eq(1)').click(function(e){
		pageCat = WORK_PIC;
		pageSize = 12;
		$('.subimglist ul').html('');
		page(1);//加载默认页
	})
	$('.threetab li:eq(2)').click(function(e){
		pageCat = WORK_TXT;
		pageSize = 3;
		$('.subtxtlist ul').html('');
		page(1);//加载默认页
	})
	page(1);//加载默认页
})






/*
 * 分页
 */
function page(num){
	pageNum = num;
	var listInfo = collectList(pageNum);
	if(listInfo.count>0){
		var html = '';
		var list = listInfo['list'];
		if(pageCat == WORK_MUSIC){
			for(var i in list){
				html += '<li><div class="imgbox"><a href="'+list[i]['wLink']+'"><img src="'+list[i]['urlMini']+'"></a></div>'+
				'<div class="musiclist-info"><h3><a href="'+list[i]['wLink']+'" style="color:#444444;">'+list[i]['title']+'</a></h3>'+
				 '<p>'+list[i]['mLength']+' '+list[i]['nick']+'</p></div>'+
				'<a href="'+list[i]['wLink']+'" class="play"></a></li>';
			}
		
			$('.submusiclist ul').append(html);
		}else if(pageCat == WORK_PIC){
			for(var i in list){
				if(list[i]['workType']==1){
					var d3Class = ''; 
				}else{
					var d3Class = '<span class="ico-3d"></span>'; 
				}
				html  += '<li><a href="'+list[i]['wLink']+'">'+
				d3Class+'<img src="'+list[i]['urlMini']+'" class="showimg"></a>'+
		       ' <strong><a  href="'+list[i]['wLink']+'" style="color:#444444;">'+list[i]['title']+'</a></strong>'+
		       ' <p>'+list[i]['date']+'</p>'+
		        '<span class="main-user">'+list[i]['nick']+'</span></li>';
			}
			$('.subimglist ul').append(html);
		}else{
			for(var i in list){
				html  += '<li>'+
		        ' <div class="imgbox"><a  href="'+list[i]['wLink']+'" style="color:#444444;"><img src="'+list[i]['urlMini']+'" width="100%" ></a></div>'+
		        ' <div class="musiclist-info">'+
		        '<h3><a  href="'+list[i]['wLink']+'" style="color:#444444;">'+list[i]['title']+'</a></h3>'+
		        '     <h3><a  href="'+list[i]['wLink']+'" style="color:#444444;">'+list[i]['content']+'</a></h3>'+
		        '     <p>'+list[i]['date']+' '+list[i]['nick']+'</p>'+
		        ' </div>'+
		     '</li>';
			}
	
			$('.subtxtlist ul').append(html);
			
		}
		if(list.length<pageSize){
			$('.addmore').unbind().text('没有更多作品了');
		}else{
			$('.addmore').click(function(){
				++pageNum;
				page(pageNum);
			}).text('点击加载更多');
		}
	}else{
		var htmlNoFile = '<div class="data-null">朋友还没收藏作品，快去找找喜欢的作品吧！</div>'
		if(pageCat == WORK_MUSIC){
			$('.submusiclist').html(htmlNoFile);
		}else if(pageCat == WORK_PIC){
			$('.subimglist').html(htmlNoFile);
		}else{
			$('.subtxtlist').html(htmlNoFile);
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
function collectList(page){
	var returnJson = {}
	$.ajax({
		url:'/work/collectlist',
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

