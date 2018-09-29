/*
 *  search-list-user.html页面的js
 *  
 */

$(function(){
	page(1);
	//搜索下拉条
	setTimeout(function(){
		$('#search-select img').hide().eq(3).show();
	},500)
	
})

var pageNum = 1;//页数
var pageSize = 15;//条数
var keyWord = decodeURI(queryString('search'));


/*
 * 分页回调
 */
function pageCallback(r){
	if(r.count>0){
		var list = r.list;
		var html = '';
		for(var i in list){
			html += '<li><a href="'+list[i]['link']+'"><img width="100" src="'+list[i]['head']+'"><span>'+list[i]['username']+'</span></a></li>';
		}
		$('.search-user-list').html(html);
		$app.pager('pagination', 'page', '', pageNum, r.count,pageSize);
	}else{
		$('.search-user-list').html('<div class="search-null" style="">很抱歉，暂时无相关结果</div>');
	}
	
}

/*
 * 分页
 */
function page(num){
	pageNum = num;
	if($('.list-order a').eq(0).hasClass('on')){
		pageOrder = 1;
	}else{
		pageOrder = 2;
	}
	userList(pageNum,pageSize,keyWord,pageCallback);
}


