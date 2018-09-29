var act_id=queryString('id');
var show_limit=0;
$(function(){
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
			}
			else{
			htmlstr+="<div><img src='"+r[i]['picUrl']+"' style='width:340px;height:150px'></div>";
			}
		}
		
		$(".sub-advbox").html(htmlstr);

		}
	});
	
	// 我的信息展示
if(checkLogin()){
	$.ajax({
		url: "/user/userinfo",
		type: "POST",
		dataType : 'json',
		data: {},
		async:false,
		success: function (r){
		$(".collection-info-r").show();
		$("#user_head").attr("src",r.head);
		var username=r.username+'<img src="../images/user/sex-'+r.sex+'.png" >';
		$("#user_name").html(username);			
		}
	});
	}
	else{
		$(".collection-info-r").hide();
	}
	// 详情展示
	$.ajax({
		url: "/work/autoactivity",
		type: "POST",
		dataType : 'json',
		data: {id:act_id},
		async:false,
		success: function (r){
		$(".collection-box").eq(0).html(r[0]['title1']);
		$(".collection-box").eq(1).html(r[0]['title2']);
		$(".collection-box").eq(2).html(r[0]['title3']);
		$("#ac_picurl").html('<img src="'+r[0]['picUrl']+'"  style="width:910px;height:312px">');
		$("#activity_title").html(r[0]['title']);
		$("#ac_type").val(r[0]['type']);
			if(r[0]['status'] ==1){
				$("#goto_sub").hide();
			}else{
				$("#goto_sub").show();
			}
		}
	});
	getworklist(1);
	showmore(show_limit);
});
// 去提交页面
function tosubmit(){

		var a_type=$("#ac_type").val();
		if(checkLogin()){
			$.ajax({
				url: "/workofficial/check_user",
				type: "POST",
				dataType : 'json',
				data: {},
				async:false,
				success: function (r){
					if(r.code==0){
						if(a_type == 1){
							window.open("./post-music.html?aId="+act_id+"&type="+AC_MUSIC);
							}
							else if(a_type == 2){
							window.open("./post-txt.html?aId="+act_id+"&type="+AC_TXT);
							}
							else if(a_type == 3){
							window.open("./post-image.html?aId="+act_id+"&type="+AC_PIC);
							}
					}else{
						systemTip('要发布作品，请先绑定手机号升级成专业用户','/html/user-bind.html');
					}
				}
			});
			
		}
		else{
			systemTip("您还没有登录哦！","/html/login.html");
		}
}
function showmore(limit){
	var a_type=$("#ac_type").val();
	$.ajax({
	url: "/workofficial/good_work",
	type: "POST",
	dataType : 'json',
	data: {type:a_type,workid:act_id,limit:show_limit},
	async: true,
	success:function(r){
	if(r['list'].length>0){	
		if(r['type']==5){
		//图片
			var htmlstr="";
			for(var i in r['list']){
				if(r['list'][i]['workType']==2){
					var d3Class = '<span class="ico-3d"></span>';
				}else{
					var d3Class = '';
				}
				
			htmlstr+='<li><p><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['wLink']+'" target="_blank"><span class="imgbox">'+d3Class+'<img src="'+r['list'][i]['urlMini']+'" style="width:150px"></span></a></p><h3>'+r['list'][i]['title']+'</a></h3><span><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['uLink']+'" target="_blank">'+r['list'][i]['nick']+'</a>&nbsp;&nbsp;投票数:'+r['list'][i]['voteCount']+'票</span><p>评语：'+r['list'][i]['remark']+'</p></li>';
				}
			$(".result-work").append(htmlstr);
		}
		else if(r['type']==4){
		//文字
			var htmlstr="";
			for(var i in r['list']){
			htmlstr+='<li><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['wLink']+'" target="_blank" ><img src="'+r['list'][i]['urlMini']+'" style="width:150px;height:200px"><h3>'+r['list'][i]['title']+'</a></h3><span><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['uLink']+'" target="_blank">'+r['list'][i]['nick']+'</a>&nbsp;&nbsp;投票数:'+r['list'][i]['voteCount']+'票</span><p>评语：'+r['list'][i]['remark']+'</p></li>';
				}
			
			$(".result-work").append(htmlstr);
		}else{
			//music
		
			var htmlstr="";
			for(var i in r['list']){
			htmlstr+='<li><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['wLink']+'" target="_blank"><img src="'+r['list'][i]['urlMini']+'" style="width:150px;height:200px"><h3>'+r['list'][i]['title']+'</a></h3><span><a style="color:#333;text-decoration:none;" href="'+r['list'][i]['uLink']+'" target="_blank">'+r['list'][i]['nick']+'</a>&nbsp;&nbsp;投票数:'+r['list'][i]['voteCount']+'票</span><p>评语：'+r['list'][i]['remark']+'</p></li>';
				}
			$(".result-work").append(htmlstr);
			
		}
		show_limit+=5;
	}else{
		$("#collection-tabbox-3 .addmore").text("没有更多内容了");
	}
		
		if(r.count<=0){
			$(".addmore").hide();
			$("#collection-tabbox-3").html("<center><h3>请耐心等待公布结果</h3></center><br/>");
		}
	}
	});
}
function goto_work1(worklink){
	  //添加活动id
    worklink += '&actId='+queryString('id');
		window.open(worklink);
}
//作品列表展示
function getworklist(pageNum){
	if($('.paixu a').eq(0).hasClass('on')){
		var order="time";
	}else{
		var order="voteCount";
	}
	if($('.paixu a').hasClass("on-2")){
		var orderby='SORT_ASC';
	}else{
		var orderby='SORT_DESC';
	}



		$.ajax({
			url: "/work/acworklist",
			type: "POST",
			dataType : 'json',
			data: {id:act_id,page:pageNum,order:order,orderby:orderby},
			async:false,
			success: function (r){
			if(r['type']==1){
				
				$("#tab-1-box").addClass("");
				var musiclist="";
				$("#tab-2-box").hide();
				$("#tab-3-box").hide();
				for(var i in r['list']){
				    if(r['list'][i]['urlMini'].indexOf('http') == -1){
                        r['list'][i]['urlMini'] = 'https://poppro.cn/'+r['list'][i]['urlMini'];
                    }

				musiclist+='<ul class="music-line"><li class="col-1"><a style="color:#333;display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" href="javascript:goto_work1('+r['list'][i]['workLink']+');"><img src="'+r['list'][i]['urlMini']+'" style="width:45px;height:60px;">'+r['list'][i]['title']+'</a></li><li class="col-2"><a href="'+r['list'][i]['userLink']+'" target="_blank">'+r['list'][i]['nick']+'</a></li><li class="col-3">'+r['list'][i]['time']+'&nbsp;&nbsp;投票数:'+r['list'][i]['voteCount']+'票</li><li class="col-4">'+r['list'][i]['mLength']+'</li><li><a class="play" href="javascript:goto_work1('+r['list'][i]['workLink']+');"></a></li></ul>';
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
                    if(r['list'][i]['urlMini'].indexOf('http') == -1){
                        r['list'][i]['urlMini'] = 'https://poppro.cn/'+r['list'][i]['urlMini'];
                    }
				txtlist += '<ul class="user-txt-line"><li class="col-1"><a style="color:#333;display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" href="javascript:goto_work1('+r['list'][i]['workLink']+');"><img  width="45" src="'+r['list'][i]['urlMini']+'">'+r['list'][i]['title']+'</a></li><li class="col-2"><a href="'+r['list'][i]['userLink']+'" target="_blank">'+r['list'][i]['nick']+'</a></li><li class="col-3">'+r['list'][i]['time']+'&nbsp;&nbsp;投票数:'+r['list'][i]['voteCount']+'票</li><li class="col-4">'+r['list'][i]['content']+'</li></ul>';
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
                    if(r['list'][i]['urlMini'].indexOf('http') == -1){
                        r['list'][i]['urlMini'] = 'https://poppro.cn/'+r['list'][i]['urlMini'];
                    }
					if(r['list'][i]['workType']==1){
						var d3Class='';
					}else{
						var d3Class = '<span class="ico-3d"></span>';
					}
					
				piclist+='<li><p><a style="color:#333;display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" href="javascript:goto_work1('+r['list'][i]['workLink']+');"><span class="imgbox">'+d3Class+'<img src="'+r['list'][i]['urlMini']+'" style="width:150px;"></span></p><h4>'+r['list'][i]['title']+'</a></h4><div><a href="'+r['list'][i]['userLink']+'" target="_blank">'+r['list'][i]['nick']+'</a><span style="display:block">投票数：'+r['list'][i]['voteCount']+'</span></div></li>';
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
			
				$app.pager('page_list','getworklist','',pageNum,r.count,r.pagesize);	
			}
		});
}
