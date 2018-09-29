var act_id=queryString('act_id');
var AC_TYPE=queryString('type');
var pageNum=0;
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
	showmore(pageNum);
	$(".zg-tab ul li:eq(0) a").attr("href","collection-detail.html?id="+act_id+"&type="+AC_TYPE);
	$(".zg-tab ul li:eq(1) a").attr("href","zhengao-img.html?act_id="+act_id+"&type="+AC_TYPE);
	$(".zg-tab ul li:eq(2) a").attr("href","zhengao-img-jieguo.html?act_id="+act_id+"&type="+AC_TYPE);
})
function goto_work1(url){
  //添加活动id
  url += '&actId='+queryString('id');
	location.href=url;
}
//作品列表展示
function showmore(page){
	$.ajax({
	url: "/workofficial/good_wapwork",
	type: "POST",
	dataType : 'json',
	data: {type:AC_TYPE,workid:act_id,offset:page,webType:"wap"},
	async: true,
	success:function(r){
		console.dir(r);
		pageNum+=5;
		if(r['type']==5){
			$(".zglist-txt").hide();
			$(".list-img").show();
			$(".list-music").hide();
			var htmlstr="";
			for(var i in r['list']){
				if(r['list'][i]['workType']==1){
					var d3Class='';
				}else{
					var d3Class = '<span class="ico-3d"></span>';
				}	
				htmlstr+='<li> <a href="'+r['list'][i]['wLink']+'">'+d3Class+'<img src="'+r['list'][i]['urlMini']+'"></a>'+
				'<div class="jieguo-r"><h3>'+r['list'][i]['title']+'</h3>'+
				 '<p class="list-time"><a style="color:#999;text-decoration:none;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['nick']+'&nbsp;&nbsp;投票数:'+r['list'][i]['voteCount']+'票</a></p>'+
				 '<span class="pingyu">评语:'+r['list'][i]['remark']+'</span> </div></li>';
				}
			if(r['list'].length>0){
				$(".list-img").append(htmlstr);
				
			}else{
				$(".addmore").text("没有更多内容了");
			}
			if(r.count<=0){
				$(".zhenggaolisbox").html('<div class="data-null">请耐心等待结果公布！</div>');
			}
		}
		else if(r['type']==4){
			$(".zglist-txt").show();
			$(".zg-img-jieguo").hide();
			$(".list-music").hide();
			var htmlstr="";
			for(var i in r['list']){
				htmlstr+='<li> <div class="imgbox"><a href="'+r['list'][i]['wLink']+'"><img src="'+r['list'][i]['urlMini']+'"></a> </div>'+
				'<h3>'+r['list'][i]['title']+'</h3>'+
				 '<p> <a style="color:#999;text-decoration:none;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['nick']+'&nbsp;&nbsp;投票数:'+r['list'][i]['voteCount']+'票</a></p>'+
				 '<div class="pingyu">评语:'+r['list'][i]['remark']+' </div></li>';
				}
			if(r['list'].length>0){
				$(".zglist-txt").append(htmlstr);
				
			}else{
				$(".addmore").text("没有更多内容了");
			}
			if(r.count<=0){
				$(".zhenggaolisbox").html('<div class="data-null">请耐心等待结果公布！</div>');
			}
		}else{
			$(".zglist-txt").hide();
			$(".zg-img-jieguo").hide();
			$(".list-music").show();
			var htmlstr="";
			for(var i in r['list']){
				htmlstr+='<li> <a href="'+r['list'][i]['wLink']+'" class="play"></a>'+
				'<span class="timebox">'+r['list'][i]['mLength']+'</span>'+
				'<div class="imgbox"><a href="'+r['list'][i]['wLink']+'"><img src="'+r['list'][i]['urlMini']+'"></a></div>'+
				 '<h3>'+r['list'][i]['title']+'</h3><p><a style="color:#999;text-decoration:none;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['nick']+'&nbsp;&nbsp;投票数:'+r['list'][i]['voteCount']+'票</a></p>'+
				 '<div class="pingyu">评语:'+r['list'][i]['remark']+' </div></li>';
				}
	
			if(r['list'].length>0){
				$(".list-music").append(htmlstr);
				
			}else{
				$(".addmore").text("没有更多内容了");
			}
			if(r.count<=0){
				$(".zhenggaolisbox").html('<div class="data-null">请耐心等待结果公布！</div>');
			}
		}
	
	}
	});
}