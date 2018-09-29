/*
 *  list-txt.html页面的js
 *  
 */

$(function(){
	getWorkCat(WORK_TXT,'catTxt');
	//人物标签
	tagList(WORK_TXT,listTagCallback);
	page(1);
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
})

var pageTag = '';//标签
var pageCat = '';//分类
var pageNum = 1;//页数
var pageSize = 15;//条数
var pageOrder = 1;//排序，默认时间排序
/*
 * 标记列表回调
 */
function listTagCallback(r){
	var optionHtml = '';
	for(var i in r){
		optionHtml += '<option value='+r[i]['id']+'>'+r[i]['name']+'</option>';
	}
	optionHtml += '<option value=7>其他</option>';
	$('#selectbox-1').append(optionHtml);
}


/*
 * 分页回调
 */
function pageCallback(r){
	var list = r.list;
	var html = '';
	for(var i in list){
		html += '<ul class="txt-line">'+
		'<li class="col-1"><a target="_blank" href="'+list[i]['wLink']+'" style="color:#333;"><img width="45" src="'+list[i]['urlMini']+'"></a><a href="'+list[i]['wLink']+'" style="color:#333;">'+list[i]['title']+'</li></a>'+
        '<li class="col-2"><a target="_blank" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></li>'+
        '<li class="col-3">'+list[i]['time']+'</li> '+
        '<li class="col-4"><a target="_blank" href="'+list[i]['wLink']+'">'+list[i]['content']+'</a></li> </ul>';
	}
	$('.txt-listbox').html(html);
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
	workList(WORK_TXT,pageOrder,'',pageCat,pageTag,pageNum,pageSize,pageCallback);
}


