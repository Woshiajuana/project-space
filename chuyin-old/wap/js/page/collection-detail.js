var act_id=queryString('id');
var show_limit=0;
$(function(){
	// 详情展示
	$.ajax({
		url: "/work/autoactivity",
		type: "POST",
		dataType : 'json',
		data: {id:act_id},
		async:false,
		success: function (r){
			console.dir(r);
		$(".detail-body .title").html(r[0]['title1']);
		$(".detail-body .time").html(r[0]['title2']);
		$(".detail-body .work").html(r[0]['title3']);
		$(".banner img").attr("src",r[0]['picUrl'])
		$(".main-head h1").text(r[0]['title']);
			if(r[0]['type']==1){
				$(".zg-tab ul li:eq(0) a").attr("href","collection-detail.html?id="+act_id+"&type=1");
				$(".zg-tab ul li:eq(1) a").attr("href","zhengao-img.html?act_id="+act_id+"&type=1");
				$(".zg-tab ul li:eq(2) a").attr("href","zhengao-img-jieguo.html?act_id="+act_id+"&type=1");
			}else if(r[0]['type']==2){
				$(".zg-tab ul li:eq(0) a").attr("href","collection-detail.html?id="+act_id+"&type=2");
				$(".zg-tab ul li:eq(1) a").attr("href","zhengao-img.html?act_id="+act_id+"&type=2");
				$(".zg-tab ul li:eq(2) a").attr("href","zhengao-img-jieguo.html?act_id="+act_id+"&type=2");
			}else{
				$(".zg-tab ul li:eq(0) a").attr("href","collection-detail.html?id="+act_id+"&type=3");
				$(".zg-tab ul li:eq(1) a").attr("href","zhengao-img.html?act_id="+act_id+"&type=3");
				$(".zg-tab ul li:eq(2) a").attr("href","zhengao-img-jieguo.html?act_id="+act_id+"&type=3");
			}
			

		}
	});
});

function showmore(limit){
	var a_type=$("#ac_type").val();
	show_limit+=5;
	$.ajax({
	url: "/workofficial/good_work",
	type: "POST",
	dataType : 'json',
	data: {type:a_type,workid:act_id,limit:show_limit},
	async: true,
	success:function(r){
		
		if(r['type']==5){
		//图片
			var htmlstr="<ul>";
			for(var i in r['list']){
				if(r['list'][i]['workType']==2){
					var d3Class = '<span class="ico-3d"></span>';
				}else{
					var d3Class = '';
				}
				
			htmlstr+='<li><p><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['wLink']+'" target="_blank"><span class="imgbox">'+d3Class+'<img src="'+r['list'][i]['urlMini']+'" style="width:150px"></span></a></p><h3>'+r['list'][i]['title']+'</a></h3><span><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['uLink']+'" target="_blank">'+r['list'][i]['nick']+'</a></span><p>评语：'+r['list'][i]['remark']+'</p></li>';
				}
			htmlstr+='</ul><a  href="javascript:showmore('+show_limit+');" class="addmore">显示更多</a>';
			$("#collection-tabbox-3").html(htmlstr);
		}
		else if(r['type']==4){
		//文字
			var htmlstr="<ul>";
			for(var i in r['list']){
			htmlstr+='<li><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['wLink']+'" target="_blank" ><img src="'+r['list'][i]['urlMini']+'" style="width:150px;height:200px"><h3>'+r['list'][i]['title']+'</a></h3><span><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['uLink']+'" target="_blank">'+r['list'][i]['nick']+'</a></span><p>评语：'+r['list'][i]['remark']+'</p></li>';
				}
			htmlstr+='</ul><a href="javascript:showmore('+show_limit+');" class="addmore">显示更多</a>';
			$("#collection-tabbox-3").html(htmlstr);
		}else{
			//music
		
			var htmlstr="<ul>";
			for(var i in r['list']){
			htmlstr+='<li><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['wLink']+'" target="_blank"><img src="'+r['list'][i]['urlMini']+'" style="width:150px;height:200px"><h3>'+r['list'][i]['title']+'</a></h3><span><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['uLink']+'" target="_blank">'+r['list'][i]['nick']+'</a></span><p>评语：'+r['list'][i]['remark']+'</p></li>';
				}
			htmlstr+='</ul><a href="javascript:showmore('+show_limit+');" class="addmore">显示更多</a>';
			$("#collection-tabbox-3").html(htmlstr);
		}
		if(r.count<=0){
			$(".addmore").hide();
			$("#collection-tabbox-3").html("<center><h3>请耐心等待公布结果</h3></center><br/>");
		}
	}
	});
}

//作品列表展示
function getworklist(pageNum){
$.ajax({
	url: "/work/acworklist",
	type: "GET",
	dataType : 'json',
	data: {id:act_id,page:pageNum},
	async:false,
	success: function (r){
	if(r['type']==1){
		$("#tab-1-box").addClass("");
		var musiclist="";
		$("#tab-2-box").hide();
		$("#tab-3-box").hide();
		for(var i in r['list']){
		musiclist+='<ul class="music-line"><li class="col-1"><a style="color:#333;display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" href="javascript:goto_work1('+r['list'][i]['workLink']+');"><img src="'+r['list'][i]['urlMini']+'" style="width:45px;height:60px;">'+r['list'][i]['title']+'</a></li><li class="col-2"><a href="'+r['list'][i]['userLink']+'" target="_blank">'+r['list'][i]['nick']+'</a></li><li class="col-3">'+r['list'][i]['time']+'</li><li class="col-4">'+r['list'][i]['mLength']+'</li><li><a class="play" href="javascript:goto_work1('+r['list'][i]['workLink']+');"></a></li></ul>';
			}
		if(r['list'].length>0){
		$("#tab-1-box").html(musiclist);
		}else{
			$("#tab-1-box").html("<center><h3>暂时没有作品,快来投一个吧！</h3></center>");
		}
		$("#tab-2-box").hide();
		$("#tab-3-box").hide();
		}
	if(r['type']== 2){
		$("#tab-3-box").show();
		var txtlist="";
		for (var i in r['list']){
		txtlist += '<ul class="user-txt-line"><li class="col-1"><a style="color:#333;display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" href="javascript:goto_work1('+r['list'][i]['workLink']+');"><img  width="45" src="'+r['list'][i]['urlMini']+'">'+r['list'][i]['title']+'</a></li><li class="col-2"><a href="'+r['list'][i]['userLink']+'" target="_blank">'+r['list'][i]['nick']+'</a></li><li class="col-3">'+r['list'][i]['time']+'</li><li class="col-4">'+r['list'][i]['content']+'</li></ul>';
		}
		$("#tab-1-box").hide();
		$("#tab-2-box").hide();
		if(r['list'].length>0){
		$("#tab-3-box").html(txtlist);
		}else{
			$("#tab-3-box").html("<center><h3>暂时没有作品,快来投一个吧！</h3></center>");	
		}
		
	}
	if (r['type']==3){
		$("#tab-2-box").show();	
		var piclist='<ul class="user-img-list">';
		for (var i in r['list']){
			if(r['list'][i]['workType']==1){
				var d3Class='';
			}else{
				var d3Class = '<span class="ico-3d"></span>';
			}
			
		piclist+='<li><p><a style="color:#333;display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" href="javascript:goto_work1('+r['list'][i]['workLink']+');"><span class="imgbox">'+d3Class+'<img src="'+r['list'][i]['urlMini']+'" style="width:150px;"></span></p><h4>'+r['list'][i]['title']+'</a></h4><div><a href="'+r['list'][i]['userLink']+'" target="_blank">'+r['list'][i]['nick']+'</a></div></li>';
		}
		piclist+="</ul>";
		$("#tab-1-box").hide();
		$("#tab-3-box").hide();
		if(r['list'].length>0){
			$("#tab-2-box").html(piclist);
		}else{
			$("#tab-2-box").html("<center><h3>暂时没有作品,快来投一个吧！</h3></center>");
		}
	
	}

	}
});
}
