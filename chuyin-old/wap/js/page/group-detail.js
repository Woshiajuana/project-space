
$(function(){

    	$.ajax({
    		url:'/group/check_groupuser',
    		type:'get',
    		data:{id:queryString('id')},
    		dataType:'json',
    		async:false,
    		success:function(r){
    			if(r.code==0){
    				
    				 htmlstr= '<li class="on" id="tab-1">音乐</li>'+
    	                '<li id="tab-2">画作</li>'+
    	                '<li id="tab-3">文字</li>'+
    	               '<li id="tab-4">成果</li>';
    				 	$(".fourtab").html(htmlstr);    		
    				    showchengguo(pageNum);	
    				    var tab_num =  25;
    				    $('.tabbox ul li').click(function () {
    				        $('.tabbox ul li').removeClass('on');
    				        $(this).addClass('on');
    				        $(".bottom-line").css('left',$(this).index()*tab_num +'%');
    				        if($(this).index() == 0){
    				            $('.list-music').show();
    				            $('.list-img').hide();
    				            $('.list-txt').hide();
    				            $('.zg-img-jieguo').hide();
    				        }else if($(this).index() == 1){
    				            $('.list-music').hide();
    				            $('.list-img').show();
    				            $('.list-txt').hide();
    				            $('.zg-img-jieguo').hide();
    				        }else if($(this).index() == 2){
    				            $('.list-music').hide();
    				            $('.list-img').hide();
    				            $('.list-txt').show();
    				            $('.zg-img-jieguo').hide();
    				        }else{
    				            $('.list-music').hide();
    				            $('.list-img').hide();
    				            $('.list-txt').hide();
    				            $('.zg-img-jieguo').show();
    				        }
    				    });

    			}else{
    			$(".fourtab").html('<li id="tab-4" class="on" name="cg_list">成果</li>');
    			$(".fourtab li").css("width","100%");
    			$(".bottom-line").css('width','100%');
    				showchengguo(pageNum);
    			 $(".zg-img-jieguo").show();
    			 $(".list-music").hide();
    			 $(".list-txt").hide();
    			 $(".list-img").hide();
    			}
    		}
    	})

    	 /*
    	 * 小组作品数量
    	 */
    	$.post('/work/groupworknum',{groupId:queryString('id')},function(r){
    		if(r.code==0){
    		$('.fourtab li').eq(0).text('音乐('+r.musicCount+')');
    		$('.fourtab li').eq(1).text('画作('+r.picCount+')');
    		$('.fourtab li').eq(2).text('文字('+r.txtCount+')');
    		}
    	},'json');
    

	/*
	 * 类别选择
	 */
   
	$('.fourtab li:eq(0)').click(function(e){
		var check=$(this).attr("name");
		if(check != "cg_list"){
			pageCat = WORK_MUSIC;
		}

		//作品分类
	})
	$('.fourtab li:eq(1)').click(function(e){
		pageCat = WORK_PIC;

	})
	$('.fourtab li:eq(2)').click(function(e){
		pageCat = WORK_TXT;

	})
			 if($('.fourtab li:eq(0)').attr("name") != "cg_list"){
				pageCat=WORK_PIC;
				page(imgNum);
				pageCat=WORK_TXT;
				page(txtNum);
				pageCat = WORK_MUSIC;
				page(musicNum);
			 }
	$('.back').click(function(){
		window.location.href = 'group.html?id='+queryString('id');
	})


})

var pageTag = '';//标签
var pageCat = WORK_MUSIC;//默认分类
var pageNum = 1;//页数
var pageSize = 10;//条数
var imgNum=1;
var musicNum=1;
var txtNum=1;

/*
 * 分页
 */
function page(num){
	var listInfo = groupWorkList(num,pageSize);
	if(listInfo.count>0){
		var html = '';
		var list = listInfo['list'];
		if(pageCat == WORK_MUSIC){
			for(var i in list){
				html += '<li><a href="'+list[i]['wLink']+'&groupId='+queryString('id')+'" class="play"></a>'+
               '<span class="timebox">'+list[i]['mLength']+'</span><div class="imgbox">'+
               	'<a style="text-decoration:none;color:#999;" href="'+list[i]['wLink']+'&groupId='+queryString('id')+'"><img src="'+list[i]['urlMini']+'"></div>'+
                '<h3>'+list[i]['title']+'</h3></a>'+'<p>'+list[i]['date']+
                ' <a style="text-decoration:none;color:#999;" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></p></li>';                  
			}
			if(list.length>0){
			$('.music-list').append(html);
			musicNum+=1;
			}else{
			$(".list-music .addmore").text("没有更多作品了");
			}
		}else if(pageCat == WORK_PIC){
			for(var i in list){
				if(list[i]['workType'] == 1){
					var d3Class = ''; 
				}else{
					var d3Class = '<span class="ico-3d"></span>'; 
				}
				html+='<li><a href="'+list[i]['wLink']+'&groupId='+queryString('id')+'">'+d3Class+
				'<img src="'+list[i]['urlMini']+'" class="showimg"></a><strong>'+
				'<a style="text-decoration:none;color:#999;" href="'+list[i]['wLink']+'&groupId='+queryString('id')+'">'+list[i]['title']+
				'</a></strong><p class="list-time">'+list[i]['date']+'</p><span class="list-user">'+
				'<a style="text-decoration:none;color:#999;" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></span></li>';				
			}
			if(list.length>0){
				$('.img-list').append(html);
				imgNum+=1;
				}else{
				$(".list-img .addmore").text("没有更多作品了");
				}
		}else{
		
			for(var i in list){
				html += '<li><div class="imgbox"><a href="'+list[i]['wLink']+'&groupId='+queryString('id')+'">'+
				'<img src="'+list[i]['urlMini']+'" width="100%" ></a></div><div class="musiclist-info"><h3>'+
				'<a style="text-decoration:none;color:#999;" href="'+list[i]['wLink']+'&groupId='+queryString('id')+'">'+list[i]['title']+
				'</a></h3><p>'+list[i]['date']+
				' <a style="text-decoration:none;color:#999;" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></p></div></li>';		
			}
			if(list.length>0){
				$('.txt-list').append(html);
				txtNum+=1;
				}else{
				$(".list-txt .addmore").text("没有更多作品了");
				}

		}
	}else{

		if(pageCat == WORK_MUSIC){
			$(".list-music").html("<div class='data-null'>还没发表过作品？！快去投稿吧！</div>");
		}else if(pageCat == WORK_PIC){
			$(".list-img").html("<div class='data-null'>还没发表过作品？！快去投稿吧！</div>");
		}else{
			$(".list-txt").html("<div class='data-null'>还没发表过作品？！快去投稿吧！</div>");
		}
	}
}



/*
 * 用户作品列表
 */
function groupWorkList(page,pageSize,tag){
	var returnJson = {}
	$.ajax({
		url:'/work/groupworklist',
		type:'post',
		data:{type:pageCat,page:page,pageSize:pageSize,tag:pageTag,groupId:queryString('id'),webType:"wap"},
		async:false,
		dataType:'json',
		success:function(r){
			returnJson = r;
		}
	})
	return returnJson;
}

function showchengguo(num){
	var groupId = (queryString('id')) ? queryString('id') : null;
	$.ajax({
		url:'/work/show_finalwork',
		type:'post',
		data:{page:num,groupId:groupId,webType:"wap"},
		async:false,
		dataType:'json',
		success:function(r){
			var htmlstr="";
			for(var i in r['list']){
			htmlstr+='<li><a href="'+r['list'][i]['url']+'"><img src="'+r['list'][i]['urlMini']+'" class="showimg"></a>'+
			'<div class="jieguo-r"><h3><a href="'+r['list'][i]['url']+'" style="text-decoration:none;color:#999;">'+
				r['list'][i]['title']+'</a></h3> <p class="list-time">'+r['list'][i]['date']+
				' <a href="'+r['list'][i]['uLink']+'" style="text-decoration:none;color:#999;">'+r['list'][i]['username']+
				'</a></p><span class="pingyu">'+r['list'][i]['desc']+'</span></div></li>';
			}
			if(r.count<=0){
			$(".zg-img-jieguo").html("<div class='data-null'>还没有成果哦！</div>");
			}
			if(r['list'].length>0){
				pageNum+=1;
			$(".cg-list").append(htmlstr);
			}else{
			$(".zg-img-jieguo .addmore").text("没有更多成果了");
			}
			$("#tab-4").html('成果('+r.count+')');
		}
	});
}
