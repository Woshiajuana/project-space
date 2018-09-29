/*
 *  list-music.html页面的js
 *  
 */

var pageTag = '';//标签
var pageCat = '';//分类
var pageNum = 1;//页数
var pageSize = 15;//条数
var pageOrder = 1;//排序，默认时间排序
var keyWord = decodeURI(queryString('search'));
var workType ='';


$(function(){
	if(findInUrl('music') == true){
		getWorkCat(WORK_MUSIC,'musicCat');//作品分类
		pageCallback = pageMusicCallback;
		workType = WORK_MUSIC;
		$('#search-select img').hide().eq(0).show();//搜索下拉条
	}else if(findInUrl('img') == true){
		pageCallback = pagePicCallback;
		getWorkCat(WORK_PIC,'catPic');//作品分类
		workType = WORK_PIC;
		$('#search-select img').hide().eq(2).show();//搜索下拉条
	}else if(findInUrl('txt') == true){
		pageCallback = pageTxtCallback;
		getWorkCat(WORK_TXT,'catTxt');//作品分类
		workType = WORK_TXT;
		$('#search-select img').hide().eq(1).show();//搜索下拉条
	}
	//人物标签
	tagList(workType,listTagCallback)
	
	page(1);
	
	$("#list-orderby a").click(function () {
        $("#list-orderby a").removeClass("on");
        $(this).addClass("on");
        page(1);
    })
    $('#selectbox-1,#selectbox-2').dropkick({
        change: function (value){
        	page(1);
        }
    })
})

/*
 * 标记列表回调
 */
function listTagCallback(r){
	var optionHtml = '';
	for(var i in r){
		optionHtml += '<option value='+r[i]['id']+'>'+r[i]['name']+'</option>';
	}
	$('#selectbox-1').append(optionHtml);
}

/*
 * 音乐分页回调
 */
function pageMusicCallback(r){
	if(r.count>0){
		var list = r.list;
		var html = '';
		for(var i in list){
	
			html += '<ul class="search-music-line"><li class="col-1"><img width="45" src="'+list[i]['urlMini']+'">'+list[i]['title']+'</li>'+
	        '<li class="col-2"><a style="color:#333;text-decoration:none;" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></li> <li class="col-2-1"><span class="erji">'+list[i]['viewCount']+'</span></li><li class="col-3">'+list[i]['time']+'</li><li class="col-4">'+list[i]['mLength']+'</li>'+
	        '<li><a class="play" href="'+list[i]['wLink']+'"></a></li></ul>';
		}
		$('.music-listbox').html(html);
		$app.pager('pagination', 'page', '', pageNum, r.count,pageSize);
	}else{
		$('.music-listbox').html('<div class="search-null" style="">很抱歉，暂时无相关结果</div>');
	}
	
}


/*
 * 图片分页回调
 */
function pagePicCallback(r){
	if(r.count > 0){
		var list = r.list;
		var html = '';
		for(var i in list){
			html += '<li><p><a target="_blank" href="'+list[i]['wLink']+'"><span class="imgbox"><img width="150" src="'+list[i]['urlMini']+'"></span></a></p>'+
	        '<h4><a target="_blank" style="color:#b8c0cc;text-decoration:none;" href="'+list[i]['wLink']+'">'+list[i]['title']+'</a></h4><div><a target="_blank" href="'+list[i]['uLink']+'" style="color:#b8c0cc;text-decoration:none;">'+list[i]['nick']+'</a></div></li>';
		}
		$('.listbox ul').html(html);
		$app.pager('pagination', 'page', '', pageNum, r.count,pageSize);
	}else{
		$('.listbox ul').html('<div class="search-null" style="">很抱歉，暂时无相关结果</div>');
	}
	
}

/*
 * 文字分页回调
 */
function pageTxtCallback(r){
	if(r.count>0){
		var list = r.list;
		var html = '';
		for(var i in list){
			html += '<ul class="txt-line">'+
			'<li class="col-1"><a target="_blank" href="'+list[i]['wLink']+'" style="color:#333;text-decoration:none;"><img width="45" src="'+list[i]['urlMini']+'">'+list[i]['title']+'</a></li>'+
	        '<li class="col-2"><a target="_blank" href="'+list[i]['uLink']+'" style="color:#333;text-decoration:none;">'+list[i]['nick']+'</a></li>'+
	        '<li class="col-3">'+list[i]['time']+'</li> '+
	        '<li class="col-4">'+list[i]['content']+'</li> </ul>';
		}
		$('.txt-listbox').html(html);
		$app.pager('pagination', 'page', '', pageNum, r.count,pageSize);
	}else{
		$('.txt-listbox').html('<div class="search-null" style="">很抱歉，暂时无相关结果</div>');
	}
	
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
	workList(workType,pageOrder,keyWord,pageCat,pageTag,pageNum,pageSize,pageCallback);
}
