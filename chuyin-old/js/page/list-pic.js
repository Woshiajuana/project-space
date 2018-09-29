/*
 *  list-pic.html页面的js
 *  
 */



$(function(){
	//获取分类
	getWorkCat(WORK_PIC,'catPic');
	//人物标签
	tagList(WORK_PIC,listTagCallback);
	//分页
	page(1);

	//banner展示
	$.ajax({
		url: "/work/showbanner",
		type: "POST",
		dataType : 'json',
		data: {},
		async: true,
		success:function(r){
		
		var htmlstr="";
		for(var i in r){
		
			if(r[i]['url']){
			htmlstr+="<a href='"+r[i]['url']+"' target='_blank'><div><img src='"+r[i]['picUrl']+"' style='width:340px;height:150px'></div></a>";
			}else{
			htmlstr+="<div><img src='"+r[i]['picUrl']+"' style='width:340px;height:150px'></div>";
			}
		}
		
		$(".sub-advbox").html(htmlstr);

		}
	});
	// 官方活动展示
	$.ajax({
		url: "/work/shownotify",
		type: "POST",
		dataType : 'json',
		data: {},
		async: true,
		success:function(r){
		var htmlstr="";
	
		for(var i in r){
			if(r[i]['category']=='hd'){
			htmlstr+='<a href="'+r[i]['url']+'" target="_blank"><li><h4>'+r[i]['title']+'</h4><h5 class="'+r[i]['type']+'-ico">专题活动：<span>'+r[i]['stoptime']+'</span> 截止！</h5></li></a>';
			}
			else{
			htmlstr+='<a href="'+r[i]['url']+'" target="_blank"><li><h4>'+r[i]['title']+'</h4><p>'+r[i]['time']+'</p></li></a>';	
			}
		}
		
		$(".main-tg").html(htmlstr);

		}
	});
})

var pageTag = '';//标签
var pageCat = '';//分类
var pageNum = 1;//页数
var pageSize = 25;//条数
var pageOrder = 1;//排序，默认时间排序
/*
 * 标记列表回调
 */
function listTagCallback(r){
	var optionHtml = '';
	for(var i in r){
		optionHtml += '<option value='+r[i]['id']+'>'+r[i]['name']+'</option>';
	}
	optionHtml += '<option value=14 >其他</option>';
	$('#selectbox-1').append(optionHtml);
}

/*
 * 分页回调
 */
function pageCallback(r){
	var list = r.list;
	var html = '';
	for(var i in list){
		if(list[i]['workType'] == 1){
			var d3Class = ''; 
		}else{
			var d3Class = '<span class="ico-3d"></span>'; 
		}
		//如果昵称为空
		if(list[i]['nick'] == ''){
			list[i]['nick'] = '&nbsp;&nbsp;';
		}
		html += '<li><p><a target="_blank" href="'+list[i]['wLink']+'"><span class="imgbox">'+d3Class+'<img width="150" src="'+list[i]['urlMini']+'"></span></a></p>'+
        '<h4><a target="_blank" href="'+list[i]['wLink']+'">'+list[i]['title']+'</a></h4><div><a href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></div></li>';
	}
	$('.listbox ul').html(html);
	$app.pager('pagination', 'page', '', pageNum, r.count,pageSize);
}

/*
 * 分页
 */
function page(num){
	pageNum = num;
	pageTag = $('#selectbox-1').val();
	pageCat = $('#selectbox-2').val();
	if($('.list-order a').eq(0).hasClass('on')){
		pageOrder = 1;
	}else{
		pageOrder = 2;
	}
	workList(WORK_PIC,pageOrder,'',pageCat,pageTag,pageNum,pageSize,pageCallback);
}