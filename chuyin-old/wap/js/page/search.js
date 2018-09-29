/*
 *  list-music.html页面的js
 *  
 */

var pageTag = '';//标签
var pageCat = '';//分类
var pageNum = 1;//页数
var pageSize = 15;//条数
var pageOrder = 1;//排序，默认时间排序
var keyWord = '';//关键词
var workType ='';


$(function(){
	$('.fivetab li').eq(0).click(function(){
		$('.selectbox1').show();//作品有标签和类别
		pageType = WORK_MUSIC;
		pageSize = 5;
		pageNum = 1;
		if(!$(this).hasClass('on')){
			console.log(1);
			$('.maskbox1').hide();
			$('.selectboxlist1').hide();
			$('.selectbox1 ul li span').eq(0).text('全部标签');
			$('.selectbox1 ul li span').eq(1).text('全部分类');
			getWorkCatSearch(pageType);
			tagList(pageType,listTagCallback);
			searchPage();
		}
		
		$('.tabbox ul li').removeClass('on');
        $(this).addClass('on');
        $('.selectboxlist1 ul li').removeClass('on');//去掉下拉标签的默认选中
	});
	$('.fivetab li').eq(1).click(function(){
		$('.selectbox1').show();//作品有标签和类别
		pageType = WORK_PIC;
		pageSize = 6;
		pageNum = 1;
		if(!$(this).hasClass('on')){
			console.log(1);
			$('.maskbox1').hide();
			$('.selectboxlist1').hide();
			$('.selectbox1 ul li span').eq(0).text('全部标签');
			$('.selectbox1 ul li span').eq(1).text('全部分类');
			getWorkCatSearch(pageType);
			tagList(pageType,listTagCallback);
			searchPage();
		}
		$('.tabbox ul li').removeClass('on');
        $(this).addClass('on');
        $('.selectboxlist1 ul li').removeClass('on');//去掉下拉标签的默认选中
	});
	$('.fivetab li').eq(2).click(function(){
		$('.selectbox1').show();//作品有标签和类别
		pageType = WORK_TXT;
		pageSize = 6;
		pageNum = 1;
		if(!$(this).hasClass('on')){
			console.log(1);
			$('.maskbox1').hide();
			$('.selectboxlist1').hide();
			$('.selectbox1 ul li span').eq(0).text('全部标签');
			$('.selectbox1 ul li span').eq(1).text('全部分类');
			getWorkCatSearch(pageType);
			tagList(pageType,listTagCallback);
			searchPage();
		}
		$('.tabbox ul li').removeClass('on');
        $(this).addClass('on');
        $('.selectboxlist1 ul li').removeClass('on');//去掉下拉标签的默认选中
	});
	$('.fivetab li').eq(3).click(function(){
		console.log(4);
		$('.selectbox1').hide();//作品有标签和类别
		pageType = 'user';
		if(!$(this).hasClass('on')){
			$('.maskbox1').hide();
			$('.selectboxlist1').hide();
			pageSize = 12;
			pageNum = 1;
			$('.tabbox ul li').removeClass('on');
	        $(this).addClass('on');	
	        searchPage();
		}
		
        
	});
	$('.fivetab li').eq(4).click(function(){
		console.log(5);
		$('.selectbox1').hide();//作品有标签和类别
		pageType = 'group';
		if(!$(this).hasClass('on')){
			$('.maskbox1').hide();
			$('.selectboxlist1').hide();
			pageSize = 5;
			pageNum = 1;
			$('.tabbox ul li').removeClass('on');
	        $(this).addClass('on');
	        searchPage()
		}
		
	});
	
	
	
	
	$('.fivetab li').eq(0).click();//页面默认音乐
})

/*
 * 标记列表回调
 */
function listTagCallback(res){
	var optionHtml = '<li>全部标签</li>';
	if(res.length>0){
		for(var i in res){
			optionHtml += '<li value='+res[i]['id']+'>'+res[i]['name']+'</li>';
		}
		}else{
			optionHtml +='<li>暂无分类</li>';
		}
	$('.selectboxlist1 ul').eq(0).html(optionHtml);
	setTimeout(function(){
		//导航tab点击
		$('.selectbox1 ul li').click(function () {
	    	if($('.maskbox1').css('display') == 'none'){
	    		$(this).addClass('on1').siblings().removeClass('on1');
	            var selectBoxIndex = $(this).index();
	            $('.selectboxlist1').hide();
	            $('.selectboxlist1:eq('+selectBoxIndex+')').show();
	            $('.maskbox1').show();
	    	}else{
	    		//如果点击的不是当前的tab
	    		if($(this).hasClass('.on1')){
	    			$('.selectboxlist1').hide();
	        		$('.maskbox1').hide();
	    		}else{
	    			$(this).addClass('on1').siblings().removeClass('on1');
	                var selectBoxIndex = $(this).index();
	                $('.selectboxlist1').hide();
	                $('.selectboxlist1:eq('+selectBoxIndex+')').show();
	                $('.maskbox1').show();
	    		}
	    	}
	    });
		//tab展开的列表点击
		$('.selectboxlist1 ul li').click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			$('.selectbox1 ul .on1 span').text($(this).text());
			$('.selectboxlist1').hide();
			$('.maskbox1').hide();
			//切换类别后，先清空当前数据，再放入新的
			$('.list-txt ul').html('');
			$('.list-img ul').html('');
			$('.list-music ul').html('');
			$('.group-list .list').html('');
			$('.guanzhu-list ul').html('');
			searchPage()
		})
	    $('.maskbox1').click(function () {
	        $('.selectboxlist1').hide();
	        $('.maskbox1').hide();
	    })
	},1000);
}

/*
 * 搜索页的分页
 */
function searchPage(){
	//如果是第一页，清空默认数据
	if(pageNum == 1){
		$('.list-txt ul').html('');
		$('.list-img ul').html('');
		$('.list-music ul').html('');
		$('.group-list .list').html('');
		$('.guanzhu-list ul').html('');
	}
	
	
	keyWord = $.trim($('.search-input').val());//关键词
	pageTag = $('.selectboxlist1:eq(0) ul .on').attr('value');
	pageCat = $('.selectboxlist1:eq(1) ul .on').attr('value');
	
	
	//查找不同的数据，不同的分页方法
	if(pageType == WORK_TXT||pageType == WORK_PIC||pageType == WORK_MUSIC){
		workList(pageType,pageOrder,keyWord,pageCat,pageTag,pageNum,pageSize,pageSearchCallback);
	}else if(pageType == 'user'){
		userPage();
	}else if(pageType == 'group'){
		getGroupList();
	}
}
	
/*
 * 搜索功能的回调
 */	
function pageSearchCallback(r){
	var list = r.list;
	var html = '';
	//文字作品
	if(pageType == WORK_TXT){
		for(var i in list){
			html  += '<li>'+
	        ' <div class="imgbox"><a  href="'+list[i]['wLink']+'" style="color:#444444;"><img src="'+list[i]['urlMini']+'" width="100%" ></a></div>'+
	        ' <div class="musiclist-info">'+
	        '<h2>'+list[i]['title']+'</h2>'+
	        '     <h3><a  href="'+list[i]['wLink']+'" style="color:#444444;">'+list[i]['content']+'</a></h3>'+
	        '     <p>'+list[i]['date']+' '+list[i]['nick']+'</p>'+
	        ' </div>'+
	     '</li>';
		}
		$('.list-txt ul').append(html);
	//图片作品
	}else if(pageType == WORK_PIC){
		for(var i in list){
			html  += '<li><a href="'+list[i]['wLink']+'">'+
            '<img src="'+list[i]['urlMini']+'" class="showimg"></a>'+
       ' <strong><a  href="'+list[i]['wLink']+'" style="color:#444444;">'+list[i]['title']+'</a></strong>'+
       ' <p class="list-time">'+list[i]['time']+'</p>'+
        '<span class="list-user">'+list[i]['nick']+'</span></li>';
		}
		$('.list-img ul').append(html);
	//音乐作品
	}else{
		for(var i in list){
			html += '<li><a href="'+list[i]['wLink']+'" class="play"></a>'+
            '<span class="timebox">'+list[i]['mLength']+'</span>'+
            '<div class="imgbox">'+
            '<img src="'+list[i]['urlMini']+'"></div>'+
            '<h3><a  href="'+list[i]['wLink']+'" style="color:#444444;">'+list[i]['title']+'</a></h3>'+
            '<p>'+list[i]['date']+' '+list[i]['nick']+'</p></li>';
		}
		$('.list-music ul').append(html);
	}
	
	
	if(r.list.length<pageSize){
		$('.addmore').unbind().text('没有更多作品了');
	}else{
		$('.addmore').unbind().click(function(){
			++pageNum;
			searchPage(pageNum);
		}).text('点击加载更多');
	}
}
	


function getWorkCatSearch(cat){
	var returnJson = {};
	var data = {};
	data.type = cat;
	$.ajax({
		url: "/work/cat",
		type: "POST",
		dataType : 'json',
		data: data,
		async: false,
		success: function (res){
			var optionHtml = '<li>全部分类</li>';
			if(res.length>0){
				for(var i in res){
					optionHtml += '<li value='+res[i]['id']+'>'+res[i]['name']+'</li>';
				}
				}else{
					optionHtml +='<li>暂无分类</li>';
				}
			$('.selectboxlist1 ul').eq(1).html(optionHtml);
		}
	});
}

/*
 * 搜索按钮点击
 */
function search(){
	$('.list-txt ul').html('');
	$('.list-img ul').html('');
	$('.list-music ul').html('');
	$('.group-list .list').html('');
	$('.guanzhu-list ul').html('');
	pageNum = 1;
	searchPage();
}


/*
 * 查找用户的分页
 */
function userPage(){
	userList(pageNum,pageSize,keyWord,userPageCallback);
}

/*
 * 用户搜索页回调方法
 */
function userPageCallback(r){
	var list = r.list;
	var html = '';
	//文字作品
	for(var i in list){
		var html = '';
		for(var i in list){
			html+= '<li><a href="'+list[i]['link']+'"><img src="'+list[i]['head']+'"><p>'+list[i]['username']+'</p></a></li>'
		}
	}
	$('.guanzhu-list ul').append(html);
	if(r.list.length<pageSize){
		$('.addmore').unbind().text('没有更多用户了');
	}else{
		$('.addmore').unbind().click(function(){
			++pageNum;
			searchPage();
		}).text('点击加载更多');
	}
}


/*
 * type
 * 0:最新创建  1:最近活跃
 */
/*
 * type
 * 0:最新创建  1:最近活跃
 */
function getGroupList()
{
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*pageSize;
	}
	$.ajax({
		url:'/group/getgrouplist',
		type:'post',
		data:{type:0,offset:offset,nums:pageSize},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			for (var i=0; i<r['data'].length; i++) {
				innerHtml += '<a href="groups-detail.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank"><div class="groupbox">';
				innerHtml += '<div class="imgbox"><img src="'+r['data'][i]['headImg']+'" style="width: 100%"></div>';
				innerHtml += '<h3>'+r['data'][i]['name']+'</h3>';
				innerHtml += '<ul>';
				innerHtml += '<li>最近更新：<span class="blue">'+r['data'][i]['updated_at']+'</span></li>';
				innerHtml += '<li>成立时间：<span class="blue">'+r['data'][i]['time']+'</span></li>';
				innerHtml += '<li>参与人数：<span class="blue">'+r['data'][i]['memberNum']+'人</span></li>';
				innerHtml += '<li>管理员：  '+r['data'][i]['leaderName']+'</li>';
				innerHtml += '<li>招募：'+r['data'][i]['recruit']+'</li>';
				innerHtml += '</ul>';
				innerHtml += '<span class="arrw-r"></span>';
				innerHtml += '</div></a>';
			}
			$('.group-list .list').append(innerHtml);
			if(r['data'].length<pageSize){
				$('.addmore').unbind().text('没有更多小组了');
			}else{
				$('.addmore').unbind().click(function(){
					++pageNum;
					searchPage();
				}).text('点击加载更多');
			}
		}
	})
}
	
	




