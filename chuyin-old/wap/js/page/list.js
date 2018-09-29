/*
 *  list.html页面的js
 *  
 */


var pageTag = '';//标签
var pageCat = '';//分类
var pageNum = 1;//页数
var pageSize = 4;//条数
var pageOrder = 1;//排序，默认时间排序
var pageType = ''; //分页的类型


$(function(){
	//如果是文本页面
	if(findInUrl('txt') == true){
		pageType = WORK_TXT;
		pageSize = 4;
	}else if(findInUrl('img') == true){
		pageType = WORK_PIC;
		pageSize = 6;
	}else{
		pageSize = 6;
		pageType = WORK_MUSIC;
	}
	getWorkCat(pageType);
	tagList(pageType,listTagCallback);
	//加载默认页
	page(1);
})


/*
 * 标记列表回调
 */
function listTagCallback(res){
	var optionHtml = '';
	if(res.length>0){
		for(var i in res){
			optionHtml += '<li value='+res[i]['id']+'>'+res[i]['name']+'</li>';
		}
		}else{
			optionHtml +='<li>暂无分类</li>';
		}
	$('.selectboxlist ul').eq(0).append(optionHtml);
	setTimeout(function(){
		//导航tab点击
		$('.selectbox ul li').click(function () {
	    	if($('.maskbox1').css('display') == 'none'){
	    		$(this).addClass('on1').siblings().removeClass('on1');
	            var selectBoxIndex = $(this).index();
	            $('.selectboxlist').hide();
	            $('.selectboxlist:eq('+selectBoxIndex+')').show();
	            $('.maskbox1').show();
	    	}else{
	    		//如果点击的不是当前的tab
	    		if($(this).hasClass('.on1')){
	    			$('.selectboxlist').hide();
	        		$('.maskbox1').hide();
	    		}else{
	    			$(this).addClass('on1').siblings().removeClass('on1');
	                var selectBoxIndex = $(this).index();
	                $('.selectboxlist').hide();
	                $('.selectboxlist:eq('+selectBoxIndex+')').show();
	                $('.maskbox1').show();
	    		}
	    		
	    	}
	    });
		//tab展开的列表点击
		$('.selectboxlist ul li').click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			$('.selectbox ul .on1 span').text($(this).text());
			$('.selectboxlist').hide();
			$('.maskbox1').hide();
			//切换类别后，先清空当前数据，再放入新的
			$('.list-txt ul').html('');
			$('.list-img ul').html('');
			$('.list-music').html('');
			page(1);//调用分页
		})
	    $('.maskbox1').click(function () {
	        $('.selectboxlist').hide();
	        $('.maskbox1').hide();
	    })
	},1000);
}


/*
 * 分页回调
 */
function pageCallback(r){
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
		$('.list-music').append(html);
	}
	
	
	if(r.list.length<pageSize){
		$('.addmore').unbind().text('没有更多作品了');
	}else{
		$('.addmore').click(function(){
			++pageNum;
			page(pageNum);
		}).text('点击加载更多');
	}
}

/*
 * 分页
 */
function page(num){
	pageNum = num;
	pageTag = $('.selectboxlist:eq(0) ul .on').attr('value');
	pageCat = $('.selectboxlist:eq(1) ul .on').attr('value');
	pageOrder = $('.selectboxlist:eq(2) ul .on').attr('value');
	workList(pageType,pageOrder,'',pageCat,pageTag,pageNum,pageSize,pageCallback);
}


