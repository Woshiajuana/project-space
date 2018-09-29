var zloffset=1;
var pxoffset=1;
var jsoffset=1;

$(function(){
	acPage(zloffset);
	pxPage(pxoffset);
	endPage(jsoffset);
	$.ajax({
		url: "/work/showcollectionkv",
		type: "POST",
		dataType : 'json',
		data: {},
		async: false,
		success:function(r){
			console.dir(r);
			var htmlstr="";
		for(var i in r){
	
			if(r[i]['wapUrl'] && r[i]['wapUrl'] !="http://"){
				htmlstr+='<div class="swiper-slide">'+
                '<a href="'+r[i]['wapUrl']+'"><img src="'+r[i]['picMiniUrl']+'"></div></a>';
			}else{
				htmlstr+='<div class="swiper-slide">'+
                '<img src="'+r[i]['picMiniUrl']+'"></div>';
			}
		}

		$(".swiper-wrapper").html(htmlstr);
	    var mySwiper = new Swiper('.swiper-container', {
	        autoplay: 5000,//可选选项，自动滑动
	        loop:true,
	    })

	    var tab_num = 33.33;
		}
	});
//	$(".slides li").css('cursor','pointer').click(function(){
//		var url=$(this).attr("name");
//		window.open(url);
//	});
})
function acPage(offset){
	$.ajax({
		url:'/work/activityzjlist',
		type:'get',
		data:{page:offset},
		async:false,
		dataType:'json',
		success:function(r){
			window.zloffset+=1;
			var htmlstr='';
			console.dir(r);
		for( var i in r.list){

			htmlstr+='<li><span class="imgbox">'+
				'<a href="'+r['list'][i]['wLink']+'" style="text-decoration:none;color:#999;"><img src="'+r['list'][i]['picMiniUrl']+'"></a>'+
	              '</span><div class="zhenggao-r"><span class="flag-2">征集中</span>'+
	              '<h4><a href="'+r['list'][i]['wLink']+'" style="text-decoration:none;color:#999;">'+r['list'][i]['title']+'</a></h4>'+
	               '<p class="leixing"><img src="../images/collection-'+r['list'][i]['type']+'.png" >'+r['list'][i]['desc']+'</p><p>'+r['list'][i]['endTime']+'征集截止</p></div></li>';
			}
			if(r.count<=0){
				$(".tabmain-1").html('<div class="data-null">暂时还没有活动哦！</div>');
			}else{
				$(".tabmain-1 .zhenggaolist").append(htmlstr);
			}
			if(r['list'].length<=0){
				$(".tabmain-1 .addmore").text("没有更多内容了");
			}
		}
	});
}
function pxPage(pxoffset){
	$.ajax({
		url:'/work/activitypxlist',
		type:'get',
		data:{page:pxoffset},
		async:false,
		dataType:'json',
		success:function(r){
		var htmlstr="";
		window.pxoffset+=1;
		for( var i in r.list){
		htmlstr+='<li><span class="imgbox">'+
		'<a href="'+r['list'][i]['wLink']+'" style="text-decoration:none;color:#999;"><img src="'+r['list'][i]['picMiniUrl']+'"></a>'+
        '</span><div class="zhenggao-r"><span class="flag-1">评选中</span>'+
        '<h4><a href="'+r['list'][i]['wLink']+'" style="text-decoration:none;color:#999;">'+r['list'][i]['title']+'</a></h4>'+
         '<p class="leixing"><img src="../images/collection-'+r['list'][i]['type']+'.png" >'+r['list'][i]['desc']+'</p><p>'+r['list'][i]['endTime']+'评选结束</p></div></li>';
			}
			if(r.count<=0){
				$(".tabmain-2").html('<div class="data-null">暂时还没有活动哦！</div>');
			}else{
				$(".tabmain-2 .zhenggaolist").append(htmlstr);
			}
			if(r['list'].length<=0){
				$(".tabmain-2 .addmore").text("没有更多内容了");
			}
		}
	});
}
function endPage(jsoffset){
	$.ajax({
		url:'/work/activityendlist',
		type:'get',
		data:{page:jsoffset},
		async:false,
		dataType:'json',
		success:function(r){
		var htmlstr="";
		window.jsoffset+=1;
		for( var i in r.list){
			htmlstr+='<li><span class="imgbox">'+
			'<a href="'+r['list'][i]['wLink']+'" style="text-decoration:none;color:#999;"><img src="'+r['list'][i]['picMiniUrl']+'"></a>'+
	        '</span><div class="zhenggao-r"><span class="flag-1">已结束</span>'+
	        '<h4><a href="'+r['list'][i]['wLink']+'" style="text-decoration:none;color:#999;">'+r['list'][i]['title']+'</h4></a>'+
	         '<p class="leixing"><img src="../images/collection-'+r['list'][i]['type']+'.png" >'+r['list'][i]['desc']+'</p><p>'+'活动已结束...</p></div></li>';
			}
			if(r.count<=0){
				$(".tabmain-3").html('<div class="data-null">暂时还没有活动哦！</div>');
			}else{
				$(".tabmain-3 .zhenggaolist").append(htmlstr);
			}	
			if(r['list'].length<=0){
				$(".tabmain-3 .addmore").text("没有更多内容了");
			}
			
		}
	});
}