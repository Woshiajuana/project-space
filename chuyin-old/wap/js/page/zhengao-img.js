var act_id=queryString('act_id');
var AC_TYPE=queryString('type');
var pageNum=1;
$(function(){
	$.ajax({
		url: "/work/autoactivity",
		type: "POST",
		dataType : 'json',
		data: {id:act_id},
		async:false,
		success: function (r){
		$(".banner img").attr("src",r[0]['picUrl'])
		$(".main-head h1").text(r[0]['title']);
		}
	});
	$(".zg-tab ul li:eq(0) a").attr("href","collection-detail.html?id="+act_id+"&type="+AC_TYPE);
	$(".zg-tab ul li:eq(1) a").attr("href","zhengao-img.html?act_id="+act_id+"&type="+AC_TYPE);
	$(".zg-tab ul li:eq(2) a").attr("href","zhengao-img-jieguo.html?act_id="+act_id+"&type="+AC_TYPE);
	getworklist(pageNum);
})
function goto_work1(url){
	location.href=url;
}
//作品列表展示
function getworklist(page){
$.ajax({
	url: "/work/acworklist",
	type: "POST",
	dataType : 'json',
	data: {id:act_id,page:page,webType:"wap"},
	async:false,
	success: function (r){
		console.dir(r);
		window.pageNum+=1;
	if(r['type']==1){
		$(".list-music").show();	
		var musiclist='';
		for (var i in r['list']){
				
			musiclist+='<li><a href="javascript:goto_work1('+r['list'][i]['workLink']+');" class="play">'+
	        '</a><span class="timebox">'+r['list'][i]['mLength']+'</span>'+
	        '<a href="javascript:goto_work1('+r['list'][i]['workLink']+');" style="text-decoration:none;color:#999;"><div class="imgbox"><img src="'+r['list'][i]['urlMini']+'"></div>'+
	        '<h3>'+r['list'][i]['title']+'</h3>'+
	        '<p>投票数：'+r['list'][i]['voteCount']+'<a href="'+r['list'][i]['userLink']+'" style="text-decoration:none;color:#999;"> '+r['list'][i]['nick']+'</a></p></li>';
			}
			$(".list-img").hide();
			$("list-txt").hide();
			if(r['list'].length>0){
			$(".list-music").append(musiclist);
			}else{
			$(".addmore").text("没有更多作品了");	
			}
			if(r.count<1){
				$(".list-img").html('<div class="data-null">暂时还没有作品哦！</div>');	
			}
	
		}
	if(r['type']== 2){
		$(".list-txt").show();	
		var txtlist='';
		for (var i in r['list']){
					
			txtlist+='<li><div class="imgbox"><a href="javascript:goto_work1('+r['list'][i]['workLink']+');">'+
	        '<img src="'+r['list'][i]['urlMini']+'" width="100%"></a></div>'+
	        '<a href="javascript:goto_work1('+r['list'][i]['workLink']+');" style="text-decoration:none;color:#999;"><div class="musiclist-info"><h3>'+r['list'][i]['title']+'</a></h3>'+
	        '<p>投票数：'+r['list'][i]['voteCount']+
	        '<a href="'+r['list'][i]['userLink']+'" style="text-decoration:none;color:#999;"> '+r['list'][i]['nick']+'</a></p></div></li>';
			}
		
			$(".list-music").hide();
			$("list-img").hide();
			if(r['list'].length>0){
			$(".txt-list").append(txtlist);
			}else{
			$(".addmore").text("没有更多作品了");	
			}
			if(r.count<1){
				$(".list-txt").html('<div class="data-null">暂时还没有作品哦！</div>');	
			}
	
	}
	if (r['type']==3){
		$(".list-img").show();	
		var piclist='';
		for (var i in r['list']){
			if(r['list'][i]['workType']==1){
				var d3Class='';
			}else{
				var d3Class = '<span class="ico-3d"></span>';
			}			
			piclist+='<li><a href="javascript:goto_work1('+r['list'][i]['workLink']+');">'+d3Class+
	        '<img src="'+r['list'][i]['urlMini']+'" class="showimg"></a>'+
	        '<a class="list-img-a" href="javascript:goto_work1('+r['list'][i]['workLink']+');" style="text-decoration:none;color:#999;"><strong>'+r['list'][i]['title']+'</a></strong>'+
	        '<p class="list-time">投票数：'+r['list'][i]['voteCount']+'</p>'+
	        '<span class="list-user"><a href="'+r['list'][i]['userLink']+'" style="text-decoration:none;color:#999;">'+r['list'][i]['nick']+'</a></span></li>';
			}
			$(".list-music").hide();
			$("list-txt").hide();
			if(r['list'].length>0){
			$(".img-list").append(piclist);
			}else{
			$(".addmore").text("没有更多作品了");	
			}
			if(r.count<1){
				$(".list-img").html('<div class="data-null">暂时还没有作品哦！</div>');	
			}
		}
	}
});
}