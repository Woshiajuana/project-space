$(function(){
	/*
	 * 加载作品数量
	 */
	getUserWorkNum();
	getUserInfo(queryString('id'),userCallback);
	/*
	 * 加载最热标签
	 */
	//personalHotTag(WORK_MUSIC,userMainPersonalHotTag);
	/*
	 * 类别选择
	 */
	$('.threetab li:eq(0)').click(function(e){
		pageCat = WORK_MUSIC;
	})
	$('.threetab li:eq(1)').click(function(e){
		pageCat = WORK_PIC;
	})
	$('.threetab li:eq(2)').click(function(e){
		pageCat = WORK_TXT;
	})
	pageCat=WORK_PIC;
	page(imgNum);
	pageCat=WORK_TXT;
	page(txtNum);
	pageCat = WORK_MUSIC;
	page(musicNum);
})

var pageTag = '';//标签
var pageCat = WORK_MUSIC;//默认分类
var musicNum = 1;//页数
var imgNum=1;
var txtNum=1;
var pageSize = 10;//条数


function check_work(url ,state){
//	 if (state==1){
//		 layer.msg("请等待作品审核！");
//		 return ;
//	 }else 
//	if(state == 3){
//		 layer.msg("您的作品未通过审核！");
//		 return ;
//	 }else{
		 //window.location.href=url;
		 window.open(url);
//	 }
}

/*
 * 分页
 */
function userCallback(r){
			if(r.sex==1){
				var sex=2;
			}else{
				var sex=1;
			}
			$(".ta-head h3").text(r.username);
			$(".touxiang img").attr("src",r.head);
			$(".sex-box img").attr("src","../images/sex-user-"+sex+"@1x.png");
			$(".touxiang img").click(function(){
				location.href="./user-edit.html?uid="+queryString('id');
			})
			if(r.location){
			$(".weizhi").text(r.location);
			}else{
				$(".weizhi").text("好像还在火星...");
			}
			if(r.personalDesc){
				$(".ta-head .desc").text(r.personalDesc);
			}else{
		
			$(".ta-head .desc").text("赶紧说点什么吧");	
			}
			
	}
function page(num){
	var listInfo = userWorkList(num,pageSize);
		var html = '';
		var list = listInfo['list'];
		if(pageCat == WORK_MUSIC){
			for(var i in list){
				if(listInfo.myself == 1){
					if(list[i]['state']==1){
					var delHtml = '<span class="status-2">审核中</span>';
					}else if(list[i]['state']==2){
						var delHtml = '<span class="status-1">审核通过</span>';
					}else if(list[i]['state']==3){
						var delHtml = '<span class="status-3">未通过</span>';
					}else{
						var delHtml = '<span class="status-1">优秀作品</span>';
					}
				}else{
					var delHtml = '';
				}
				
				html += '<li>'+
				'<div class="imgbox"><a style="text-decoration:none;color:#999;" href="'+list[i]['wLink']+'"><img width="100%" src="'+list[i]['urlMini']+'"></a></div>'+
				'<div class="musiclist-info musiclist-info-1"><h3><a style="text-decoration:none;color:#999;" href="'+list[i]['wLink']+'">'+list[i]['title']+'</a></h3>'+
				'<p>'+list[i]['mLength']+'</p>'+'</div>'+'<a href="'+list[i]['wLink']+'" class="play"></a>'+delHtml+'</li>';	
			}
			if(list.length>0){
			$('.list-music').append(html);
			musicNum+=1;
			}else{
				$(".submusiclist .addmore").text("没有更多内容了");
			}
				if(listInfo.count<=0){
					$(".submusiclist").html("<div class='data-null'>UP主正在创作中！</div>");
				}
		}else if(pageCat == WORK_PIC){
			html+='';
			for(var i in list){
				if(list[i]['workType']==1){
					var d3Class = ''; 
				}else{
					var d3Class = '<span class="ico-3d"></span>';
				}
				if(listInfo.myself == 1){
					if(list[i]['state']==1){
					var delHtml = '<span class="status-2">审核中</span>';
					}else if(list[i]['state']==2){
						var delHtml = '<span class="status-1">审核通过</span>';
					}else if(list[i]['state']==3){
						var delHtml = '<span class="status-3">未通过</span>';
					}else{
						var delHtml = '<span class="status-1">优秀作品</span>';
					}
				}else{
					var delHtml = '';
				}
				
				html+= '<li><a style="text-decoration:none;color:#999;" href="'+list[i]['wLink']+'">'+d3Class+
				'<img src="'+list[i]['urlMini']+'" class="showimg">'+'<strong>'+list[i]['title']+'</strong></a>'+
				'<p>'+list[i]['date']+'</p><span class="main-user">'+delHtml+'</span></li>';
				
			}
				if(list.length>0){
					$('.list-img').append(html);
					imgNum+=1;
				}else{
					$(".subimglist .addmore").text("没有更多内容了");
				}
				if(listInfo.count<=0){
					$(".subimglist").html("<div class='data-null'>UP主正在创作中！</div>");
				}
		}else{
			for(var i in list){
				if(listInfo.myself == 1){
					if(list[i]['state']==1){
						var delHtml = '<span class="status-2">审核中</span>';
						}else if(list[i]['state']==2){
							var delHtml = '<span class="status-1">审核通过</span>';
						}else if(list[i]['state']==3){
							var delHtml = '<span class="status-3">未通过</span>';
						}else{
							var delHtml = '<span class="status-1">优秀作品</span>';
						}
					}else{
						var delHtml = '';
					}
				html+= '<li><a style="text-decoration:none;color:#999;" href="'+list[i]['wLink']+'"><div class="imgbox">'+
				'<img src="'+list[i]['urlMini']+'" width="100%"></div>'+'<div class="musiclist-info musiclist-info-1">'+
				'<h3>'+list[i]['title']+'</h3></a>'+
				'<p>'+list[i]['date']+'</p></div>'+delHtml+'</li>';
			}
			if(list.length>0){
				$('.list-txt').append(html);
				txtNum+=1;
			}else{
				$(".subtxtlist .addmore").text("没有更多内容了");
			}
			if(listInfo.count<=0){
				$(".subtxtlist").html("<div class='data-null'>UP主正在创作中！</div>");
			}
		}
		
}


/*
 * 用户页的最热标签
 */
//function userMainPersonalHotTag(r){
//	var html = '';
//	for(var i in r){
//		html += '<li><a href="javascript:void(0);" tId="'+r[i].id+'">'+r[i].name+'</a></li>';
//	}
//	$('.user-taglist').html(html);
//	$('.user-taglist a').click(function(){
//		if($(this).hasClass('on')){
//			$(this).removeClass('on');
//			pageTag = '';
//		}else{
//			$('.user-taglist a').removeClass('on');
//			$(this).addClass('on');
//			pageTag = $(this).attr('tId');
//		}
//		page(1);
//	})
//}

/*
 * 用户作品列表
 */
function userWorkList(page,pageSize,tag){
	var returnJson = {}
	$.ajax({
		url:'/work/userworklist',
		type:'post',
		data:{type:pageCat,page:page,pageSize:pageSize,tag:pageTag,uId:queryString('id')},
		async:false,
		dataType:'json',
		success:function(r){
			returnJson = r;
		}
	})
	return returnJson;
}

/*
 * 用户页的删除作品回调
 */
function userDelWorkCallback(r){
	if(r.code == 0){
		layer.alert(r.msg);
		getUserWorkNum();
		page(1);
		
	}else {
		layer.alert(r.msg);
	}
}
//获取url参数
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	} 

/*
 * 计算作品数量
 */
function getUserWorkNum(){
	$.post('/work/userworknum',{uId:queryString('id')},function(r){
		$('.threetab li').eq(0).text('音乐('+r.musicCount+')');
		$('.threetab li').eq(1).text('画作/3D 建模('+r.picCount+')');
		$('.threetab li').eq(2).text('文字('+r.txtCount+')');
	},'json');
}
