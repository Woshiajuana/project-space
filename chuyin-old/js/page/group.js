/*
 *  group.html
 *  
 */
var isAdmin;
var leaderId;
var leaderHead;
var leaderName;
var memberNum;
var userList;

$(function(){
	var groupId = (queryString('id')) ? queryString('id') : null;
	if (!groupId) window.location.href = 'groups';
	getGroupInfo();
	userList = userListInfo();
	if (userList['data'] !== null) {
		var innerHtml = '';
		for (var i=0; i<userList['data'].length; i++) {
			innerHtml += '<a href="user-main.html?id='+window.btoa(userList['data'][i]['id'])+'" title="'+userList['data'][i]['username']+'" target="_blank"><li><img src="'+userList['data'][i]['head']+'"></li></a>';
		}
		$('.userlist-admin').after(innerHtml);
	}
	else {
		$('.userlist-admin').after('暂无成员');
	}
	showlogs();
	
	$('#afresh').click(function(){
		$.LAYER.close({id:'tip-group-transfer'});
		$.LAYER.show({id:'tip-2'});
	})
	
//	$('#apply').click(function () {
//        $.LAYER.show({id:'tip-1'});
//    })

    $(".tip-close").click(
        function(){$.LAYER.close();}
    )
    
    if(findInUrl('group.html')){
   
    	
    	$.ajax({
    		url:'../group/check_groupuser',
    		type:'get',
    		data:{id:queryString('id')},
    		dataType:'json',
    		async:false,
    		success:function(r){
    			if(r.code==0){
    				 htmlstr= '<li><a href="javascript:;" class="on" id="tab-1">音乐</a></li>'+
    	                '<li><a href="javascript:;" id="tab-2">画作／3D 建模</a></li>'+
    	                '<li><a href="javascript:;" id="tab-3">文字</a></li>'+
    	               '<li><a href="javascript:;" id="tab-4">成果展示</a></li>';
    				 	$(".search-nav").html(htmlstr);
    				    $(".search-nav li a").click(function () {
    				        //console.log($(this).attr('id'))
    				        $(".search-nav li a").removeClass('on')
    				        $(this).addClass('on')

    				        $("#tab-1-box,#tab-2-box,#tab-3-box,#tab-4-box").hide();
    				        //alert($("#"+$(this).attr('id')+"-box").attr('class'))
    				        $("#"+$(this).attr('id')+"-box").show();
    				    });
    				    showchengguo(1);	
    			    	
    			    	page(1);//加载默认页 
    			}else{
    			$(".search-nav").html('<li><a href="javascript:;" id="tab-4" class="on">成果展示</a></li>');
    				showchengguo(1);
    			 $("#tab-4-box").show();
    			 $("#tab-3-box").hide();
    			 $("#tab-1-box").hide();
    			 $("#tab-2-box").hide();
    			}
    		}
    	})
    	
    	 /*
    	 * 小组作品数量
    	 */
    	$.post('/work/groupworknum',{groupId:groupId},function(r){
    		if(r.code==0){
    		$('.search-nav li a').eq(0).text('音乐（'+r.musicCount+'）');
    		$('.search-nav li a').eq(1).text('画作／3D 建模（'+r.picCount+'）');
    		$('.search-nav li a').eq(2).text('文字（'+r.txtCount+'）');
    		}
    	},'json');
    
    }

	/*
	 * 类别选择
	 */
	$('.search-nav li:eq(0)').click(function(e){
		pageCat = WORK_MUSIC;
		page(1);
		//作品分类
	})
	$('.search-nav li:eq(1)').click(function(e){
		pageCat = WORK_PIC;
		page(1);
	})
	$('.search-nav li:eq(2)').click(function(e){
		pageCat = WORK_TXT;
		page(1);
	})
 	$('.search-nav li:eq(3)').click(function(){
			showchengguo(1);	
    	})

	//我要投稿
	var groupId = queryString('id');
	$('.tougao').click(function(){
//		$.post('/user/ifcancreate',{},function(r){
//			if(r.code== 0){
//				location.href = '/html/post-music.html?groupId='+groupId;
//			}else{
////				alert('要发布作品，请先绑定手机号升级成专业用户');
//				systemTip('要发布作品，请先绑定手机号升级成专业用户','/html/user-bind.html');
//				//systemTip('','/html/user-bind.html');
//			}
//		},'json');
		
		if(!checkLogin()){
			systemTip('请先登录','https://www.poppro.cn/html/login.html');
		}else{
			$.post('/user/ifcancreate',{},function(r){
				if(r.code== 0){
					location.href = '/html/post-music.html?groupId='+groupId;
				}else{
					systemTip('要发布作品，请先绑定手机号升级成专业用户');
				}
			},'json');
		}
		
	});
	
	$('.back').click(function(){
		window.location.href = 'group.html?id='+queryString('id');
	})
	
})

var pageTag = '';//标签
var pageCat = WORK_MUSIC;//默认分类
var pageNum = 1;//页数
var pageSize = 10;//条数

/*
 * 分页
 */
function page(num){
	pageNum = num;
	var listInfo = groupWorkList(pageNum,pageSize);
	if(listInfo.count>0){
		var html = '';
		var list = listInfo['list'];
		if(pageCat == WORK_MUSIC){
			for(var i in list){
			
				html += '<ul class="music-line">'+
                    '<li class="col-1"><a style="text-decoration:none;color:#333;" target="_blank" href="'+list[i]['wLink']+'&groupId='+queryString('id')+'"><img width="45" height="60" src="'+list[i]['urlMini']+'">'+list[i]['title']+'</a></li>'+
                    '<li class="col-2"><a style="text-decoration:none;color:#333;" target="_blank" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></li>'+
                    '<li class="col-3">'+list[i]['time']+'</li>'+
                    '<li class="col-4">'+list[i]['mLength']+'</li>'+
                    '<li><a class="play" href="'+list[i]['wLink']+'"></a></li>'+
                    '</ul>';
			}
			$('#tab-1-box').html(html);
		}else if(pageCat == WORK_PIC){
			for(var i in list){
				if(list[i]['workType'] == 1){
					var d3Class = ''; 
				}else{
					var d3Class = '<span class="ico-3d"></span>'; 
				}
				html += '<li><p><a style="text-decoration:none;color:#333;" target="_blank" href="'+list[i]['wLink']+'&groupId='+queryString('id')+'"><span class="imgbox">'+d3Class+'<img  width="150" src="'+list[i]['urlMini']+'"></span></p>'+
                    '<h4>'+list[i]['title']+'</a></h4>'+
                    '<div>'+list[i]['time']+'</div>'+
                    '<div><a style="text-decoration:none;color:#b8c0cc;" target="_blank" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></div>'+
                '</li>';
			}
			$('#tab-2-box .user-img-list').html(html);
		}else{
			html="<div>";
			for(var i in list){
				html += '<ul class="user-txt-line">'+
                '<li class="col-1"><a href="'+list[i]['wLink']+'" target="_blank"><img width="45" height="60" src="'+list[i]['urlMini']+'"></a><a style="text-decoration:none;color:#333;" target="_blank" href="'+list[i]['wLink']+'&groupId='+queryString('id')+'">'+list[i]['title']+'</a></li>'+
                '<li class="col-2"><a style="text-decoration:none;color:black;" target="_blank" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></li>'+
                '<li class="col-3">'+list[i]['time']+'</li>'+
                '<li class="col-4">'+list[i]['content']+'</li>'+
                '</ul>';
			}
			$('#tab-3-box').html(html);

		}
		$app.pager('pagination', 'page', '', pageNum, listInfo.count,pageSize);
		$("#pagination").show();
	}else{
		$("#pagination").hide();
		if(pageCat == WORK_MUSIC){
			$('#tab-1-box').html('<br/><br/><center><h1>作品列表为空</h1></center>');
		}else if(pageCat == WORK_PIC){
			$('#tab-2-box .user-img-list').html('<br/><br/><center><h1>作品列表为空</h1></center>');
		}else{
			$('#tab-3-box').html('<br/><br/><center><h1>作品列表为空</h1></center>');
		}
	}
}



var groupMemberNum = 0;
function getGroupInfo()
{
	$.ajax({
		url:'../group/getgroupinfo',
		type:'get',
		data:{id:queryString('id')},
		dataType:'json',
		async:false,
		success:function(r){

			if (r.code == 102) {
//				alert(r.message);
				systemTip(r.message);
				window.location.href = 'groups.html';
			}
			else {
				if (r.status == 3) {
					window.location.href = 'groups.html';
				}
                groupMemberNum = r.memberNum;
				$('.header').attr('src',r.headImg);
				if (r.isAuthen) {
					if (r.groupIcon) {
                        $('.groupname').html(r.name+' <img width="20" height="20" src="'+r.groupIcon+'">');
					}
					else {
                        $('.groupname').text(r.name);
					}
				}
				else {
                    $('.groupname').text(r.name);
				}
				// $('.groupname').html('<a style="color:black;text-decoration: none;" href="group.html?id='+queryString('id')+'">'+r.name+'</a>');
				$('.nums').text(r.memberNum);
				$('.creattime').text(r.date);
				$('.updatetime').text(r.updated_at);
				$('.groupnums').text('小组成员（'+r.memberNum+'）');
				$('.recruit').text(r.recruit);
				$('.filetype').text(r.fileType);
				$('.desc').text(r.groupDesc);
				$('.adminhead img').attr('src',r.leaderHead);
				$('.adminnick p').text(r.leaderName);
				$('.adminhead,.adminnick').attr('href','user-main.html?id='+window.btoa(r.leaderId));
				$('.alluser-link').text('查看全部成员（'+r.memberNum+'）');
				$('.alluser-link').attr('href','group-user-list.html?id='+queryString('id'));
				$('.lookmore').attr('href','group-logs-list.html?id='+queryString('id'));
				$('#shareurl').val(window.location);
				isAdmin = r.isAdmin;
				leaderId = window.btoa(r.leaderId);
				leaderHead = r.leaderHead;
				leaderName = r.leaderName;
				memberNum = r.memberNum;
				if (!r.isAdmin) {
					if (r.status !== 1) {
						window.location.href = 'groups.html';
					}
					if (!r.isInGroup) {
						$('.wantaddbox').show();
						$('.tougao').hide();
						if (r.groupStatus == 2) {
							$('#banin').show();
							$('#apply').hide();
						}
						else {
							$('.applyhead').attr('src',r.headImg);
							$('.applyname').text(r.name);
							$('.applytxt').text(r.groupDesc);
							$('#apply').unbind('click');
							$('#apply').click(function(){
								joinInGroup(queryString('id'));
							})
						}
					}
					else {
						$('.wantaddbox').show();
						$('#apply').hide();
						$('.wantaddbox a:eq(0)').hide();
						$('.applyhead').attr('src',r.headImg);
						$('.applyname').text(r.name);
						$('.applytxt').text(r.groupDesc);
						$('#apply').unbind('click');
						$('#apply').click(function(){
							joinInGroup(queryString('id'));
						})
					}
				}
				else {
					if (r.status == 0) {
						$('.adminpanel').html('<a class="jzjr jzjr-off">审核中</a>');
						$('.adminpanel').show();
					}
					else if (r.status == 1) {
						if (r.groupStatus == 0) {
							if (r.isAuthen == 1){
                                $('.adminpanel').html('<a href="javascript:;" class="tougao">我要投稿</a> <a class="jzjr" href="javascript:;">已认证</a><br><br><a class="jzjr" href="javascript:;">禁止加入</a><a href="javascript:;" class="zy" id="transfer">转让组</a>');
                            }
                            else {
                                $('.adminpanel').html('<a href="javascript:;" class="tougao">我要投稿</a> <a class="jzjr" href="javascript:;" onclick="groupCer()">小组认证</a><br><br><a class="jzjr" href="javascript:;">禁止加入</a><a href="javascript:;" class="zy" id="transfer">转让组</a>');
                            }
							$('.adminpanel').show();
							$('#transfer').unbind('click');
							$('#transfer').click(function(){
								checkTransfer(queryString('id'));
							})
							$('.jzjr:eq(1)').unbind('click');
							$('.jzjr:eq(1)').click(function(){
								banInGroup(queryString('id'));
							})
						}
						else if (r.groupStatus == 2) {
							if (r.isAuthen == 1) {
                                $('.adminpanel').html('<a href="javascript:;" class="tougao">我要投稿</a> <a class="jzjr" href="javascript:;">已认证</a><br><br><a class="jzjr" href="javascript:;">允许加入</a><a href="javascript:;" class="zy" id="transfer">转让组</a>');
                            }
                            else {
                                $('.adminpanel').html('<a href="javascript:;" class="tougao">我要投稿</a> <a class="jzjr" href="javascript:;" onclick="groupCer()">小组认证</a><br><br><a class="jzjr" href="javascript:;">允许加入</a><a href="javascript:;" class="zy" id="transfer">转让组</a>');
                            }
							$('.adminpanel').show();
							$('#transfer').unbind('click');
							$('#transfer').click(function(){
								checkTransfer(queryString('id'));
							})
							$('.jzjr').unbind('click');
							$('.jzjr').click(function(){
								allowInGroup(queryString('id'));
							})
						}
					}
					else {
						$('.adminpanel').html('<a class="jzjr jzjr-off">审核不通过</a> <a class="jzjr" href="javascript:;" onclick="deleteGroup()">删除小组</a>');
						$('.adminpanel').show();
					}
				}
			}
		}
	})
}

function deleteGroup()
{
	$.LAYER.show({id:'tip-group-del'});
    $('.deletegroup').click(function(){
    	$.ajax({
			url:'../group/deletegroup',
			data:{groupId:queryString('id')},
			type:'post',
			dataType:'json',
			async:false,
			success:function(r) {
				if (r.code == 0) {
					$.LAYER.close();
					layer.alert(r.message);
					window.location.href = 'groups.html';
				}
				else {
					layer.alert(r.message);
				}
				
			}
		})
    })
}

function joinInGroup(id)
{
	if(!checkLogin()){
		systemTip('请先登录','https://www.poppro.cn/html/login.html');
		return ;
	}
	$('.applydesc').val('');
	$.ajax({
		url:'../group/checkjoinin',
		type:'post',
		data:{id:id},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				getGroupInfo(id);
				$.LAYER.show({id:'tip-1'});
			    $(".tip-close").click(
			        function(){$.LAYER.close();}
			    )
			    $('.applyin').unbind('click');
			    $('.applyin').click(function(){
					var applydesc = $.trim($('.applydesc').val());
					if (applydesc == '') {
						alert('先说说你的本领吧');
//						systemTip('先说说你的本领吧');
					}
					else {
						applyInGroup(id,applydesc);
					}
			    })
			}
			else {
				layer.alert(r.message);
//				systemTip(r.message);
			}
		}
	})
	
}

function userListInfo()
{
	var returnJson = {}
	$.ajax({
		url:'../group/getuserlist',
		type:'post',
		data:{id:queryString('id')},
		async:false,
		dataType:'json',
		success:function(r){
			returnJson = r;
		}
	})
	return returnJson;
}

function showlogs()
{
	$.ajax({
		url:'../group/getgrouplogs',
		type:'post',
		data:{id:queryString('id')},
		async:false,
		dataType:'json',
		success:function(r){
			if (r['data']) {
				var innerHtml = '';
				var result = [];
				for (var i=0; i<r['data'].length; i++) {
					result = r['data'][i].split('|');
					innerHtml += '<li><span>'+result[1]+'</span>'+result[0]+'</li>';
				}
				$('.logs').html(innerHtml);
			}
			else {
				$('.logs').html('暂无动态');
			}
			
		}
	})
}

function pushInGroup(touristId)
{
	if(!checkLogin()){
		systemTip('请先登录','https://www.poppro.cn/html/login.html');
	}
	//js base64_encode
	//window.btoa("test")；//"dGVzdA=="
	//window.atob("dGVzdA==");//"test"
	$.ajax({
		url:'../group/pushingroup',
		type:'post',
		data:{id:queryString('id'),touristId:touristId},
		dataType:'json',
		async:false,
		success:function(r){
		}
	})
}

function applyInGroup(groupId,desc)
{
	if(!checkLogin()){
		systemTip('请先登录','https://www.poppro.cn/html/login.html');
	}
	$.ajax({
		url:'../group/replyingroup',
		type:'post',
		data:{id:window.atob(groupId),desc:desc},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				layer.msg('申请成功');
//				alert('申请成功');
//				systemTip('申请成功');
				$('.applydesc').val('');
				$.LAYER.close();
			}
			else {
				layer.msg(r.message);
//				alert(r.message);
//				systemTip(r.message);
			}
		}
	})
}

//禁止加入小组
function banInGroup(groupId)
{
	if(!checkLogin()){
		systemTip('请先登录','https://www.poppro.cn/html/login.html');
	}
	var r=confirm("确认设置小组状态为禁止成员加入？")
	if (r) {
		$.ajax({
			url:'../group/baningroup',
			type:'post',
			data:{id:groupId},
			dataType:'json',
			async:false,
			success:function(r){
//				alert(r.message);
				systemTip(r.message);
				location.reload();
			}
		})
	}
}

//允许加入小组
function allowInGroup(groupId)
{
	if(!checkLogin()){
		systemTip('请先登录','https://www.poppro.cn/html/login.html');
	}
	var r=confirm("确认设置小组状态为允许成员加入？")
	if (r) {
		$.ajax({
			url:'../group/allowingroup',
			type:'post',
			data:{id:groupId},
			dataType:'json',
			async:false,
			success:function(r){
//				alert(r.message);
				systemTip(r.message);
				location.reload();
			}
		})
	}
}

function copy()
{
	var e=document.getElementById("shareurl");
	e.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
//	alert("已复制好，可贴粘。");
	systemTip("已复制好，可贴粘。");
}

/*
 * 用户作品列表
 */
function groupWorkList(page,pageSize,tag){
	var returnJson = {}
	$.ajax({
		url:'../work/groupworklist',
		type:'post',
		data:{type:pageCat,page:page,pageSize:pageSize,tag:pageTag,groupId:queryString('id')},
		async:false,
		dataType:'json',
		success:function(r){
			returnJson = r;
		}
	})
	return returnJson;
}

function checkTransfer(id)
{
	if(!checkLogin()){
		systemTip('请先登录','https://www.poppro.cn/html/login.html');
		return ;
	}
	if (userList['total'] == 0) {
//		alert('暂无成员，无法转让');
		systemTip('暂无成员，无法转让');
		return ;
	}
	if (userList['data'] !== null) {
		var innerHtml = '';
		for (var i=0; i<userList['data'].length; i++) {
			innerHtml += '<li><img src="'+userList['data'][i]['head']+'"><p>'+userList['data'][i]['username']+'</p>';
			innerHtml += '<a href="javascript:;" onclick="replyTransfer('+"'"+id+"'"+','+"'"+window.btoa(userList['data'][i]['id'])+"'"+','+"'"+userList['data'][i]['username']+"'"+','+"'"+userList['data'][i]['head']+"'"+')">转让给TA</a></li>';
		}
		$('.usertlistbox ul').html(innerHtml);
	}
	$.LAYER.show({id:'tip-2'});
}

function replyTransfer(groupId, userId, userName, userHead)
{
	$.LAYER.close({id:'tip-2'});
	$('.selectedbox span').html('<i><img src="'+userHead+'"></i>'+userName);
	$.LAYER.show({id:'tip-group-transfer'});
	$('#subtransfer').unbind('click');
	$('#subtransfer').click(function(){
		var content = $.trim($('#transfertxt').val());
		if (content == '') {
			layer.msg('写几句话吧');
//			alert('写几句话吧');
//			systemTip('写几句话吧');
			return ;
		}
		$.ajax({
			url:'../group/replytransfer',
			type:'post',
			data:{id:groupId, userId:userId, content:content},
			async:false,
			dataType:'json',
			success:function(r){
				if (r.code == 0) {
					layer.msg('转让组申请成功');
//					alert('转让组申请成功');
					$.LAYER.close({id:'tip-group-transfer'});
//					systemTip('转让组申请成功');
				}
				else {
//					alert(r.message);
					layer.msg(r.message);
//					systemTip(r.message);
				}
			}
		})
	})
	
}
//校验管理员
function check_leader(){
	$.ajax({
		url:'../group/check_leader',
		type:'get',
		data:{leader_id:leaderId},
		async:false,
		dataType:'json',
		success:function(r){
			if(r.code==0){
			     $.LAYER.show({id:'tip-addcg'});
			}else{
//				alert(r.msg);
				systemTip(r.msg);
			}
		}
	});
}
function add_workurl(){
	var groupId = (queryString('id')) ? queryString('id') : null;
	var workurl=$(".addcgbox input[type='text']").eq(0).val();
	var preg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
	if(workurl.indexOf("id")>=0 && preg.test(workurl)){
	var workid=workurl.match(/id=(.*?)(?=&|$)/)[1];
	}else{
		layer.msg("作品链接错误");
		return ;
	}
	
	
		if(findInUrl1('detail-txt.html',workurl)){
		var type=WORK_TXT;
		}else if(findInUrl1('detail-img.html',workurl)){
		var type=WORK_PIC;
		}else if(findInUrl1('detail-music.html',workurl)){
		var type=WORK_MUSIC;
		}else{
			layer.msg("作品链接错误");
			return ;
		}
	

	
		$.ajax({
			url:'../group/check_groupwork',
			type:'POST',
			data:{workid:workid,type:type,groupId:groupId},
			async:false,
			dataType:'json',
			success:function(r){
				if(r.code == 1){
					alert(r.msg);  
					location.reload();
				}else{
						if(type==1){
						var html='<label><img src="../images/search-ico-2.jpg">文字</label>';
						$(".selectbox").html(html);
						}else if(type==2){
						var html='<label><img src="../images/search-ico-3.jpg">画作／3D 建模</label>';
						$(".selectbox").html(html);
						}else {
						var html='<label><img src="../images/search-ico-1.jpg">音乐</label>';
						$(".selectbox").html(html);
						}
						$("#work_title").html(r.title);
						$(".btnbox").show();
						if(r.desc){
						$("#textarea-1").val(r.desc);
						
						$("#descbox-count").html("<i>"+r.desc.length+"</i>/200");
						}else{
							$("#descbox-count").html("<i>"+0+"</i>/200");	
						}
						$(".input-1").attr({ readonly: 'true' });
				}
		
			}
		});
	
}

function to_submit(){
	var workurl=$(".addcgbox input[type='text']").eq(0).val();
	var a_title=$("#work_title").text();
	var a_desc=$("#textarea-1").val();
	var a_workid=workurl.match(/id=(.*?)(?=&|$)/)[1];
	var groupId = (queryString('id')) ? queryString('id') : null;
	if(workurl.indexOf("txt")>=0 ){
	var type=1;
	}else if(workurl.indexOf("img")>=0){
	var type=2;
	}else{
	var type=3;
	}
	$.ajax({
			url:'../group/save_chengguo',
			type:'POST',
			data:{workid:a_workid,title:a_title,desc:a_desc,type:type,groupId:groupId,workurl:workurl},
			async:false,
			dataType:'json',
			success:function(r){
				if(r.code==0){
					alert(r.msg);
					location.reload();
					$(".addcgbox input[type='text']").eq(0).val("");
					$("#textarea-1").val("");
				}else{
					alert(r.msg);
					$(".addcgbox input[type='text']").eq(0).val("");
					$("#textarea-1").val("");
					location.reload();
				}
			}
	})
}
// 成果展示

function delete_cg(id){
if(confirm("确定要删除该成果吗？")){
	$.ajax({
		url:'../group/delete_chengguo',
		type:'POST',
		data:{id:id},
		async:false,
		dataType:'json',
		success:function(r){
			if(r.code==0){
				alert(r.msg);
				location.reload();
			}else{
				alert(r.msg);
				location.reload();
			}
		}
		}); 
	}
}
function showchengguo(pageNum){
	var groupId = (queryString('id')) ? queryString('id') : null;
	$.ajax({
		url:'/work/show_finalwork',
		type:'POST',
		data:{page:pageNum,groupId:groupId},
		async:false,
		dataType:'json',
		success:function(r){
			if(r['myself']==1){
				$("#add-chengguo").show();
			}else{
				$("#add-chengguo").hide();
			}
			var html="";
			for(var i in r['list']){
				if(r['list'][i]['workType'] == 2){
					var d3Class = '<span class="ico-3d"></span>'; 
				}else{
					var d3Class = ''; 
				}
				html+='<li><a style="text-decoration:none;color:#333;" target="_blank" href="'+r['list'][i]['url']+'&groupId='+queryString('id')+'"><span class="imgbox">'+d3Class+'<img src="'+r['list'][i]['urlMini']+'" class="bigimg" width="190px"></span>'+
                '<h3>'+r['list'][i]['title']+'</a></h3>';
			if(r['myself']==1){
					
					if(r['list'][i]['type']==3){
					html+='<span><img src="../images/collection-1.png"><i>音乐</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p title="'+r['list'][i]['desc']+'">'+r['list'][i]['desc']+'</p>	<div class="btnbox"><a href="javascript:delete_cg('+r['list'][i]['id']+')">删除</a></div> </li>';
					}else if( r['list'][i]['type'] == 2){
					 html+='<span><img src="../images/collection-3.png"><i>画作／3D 建模</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p title="'+r['list'][i]['desc']+'">'+r['list'][i]['desc']+'</p>	<div class="btnbox"><a href="javascript:delete_cg('+r['list'][i]['id']+')">删除</a></div> </li>';
					}else{
						html+='<span><img src="../images/collection-2.png"><i>文字</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p title="'+r['list'][i]['desc']+'">'+r['list'][i]['desc']+'</p> 	<div class="btnbox"><a href="javascript:delete_cg('+r['list'][i]['id']+')">删除</a></div></li>';
					}
				}else{
			
					if(r['list'][i]['type']==3){
						html+='<span><img src="../images/collection-1.png"><i>音乐</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p title="'+r['list'][i]['desc']+'">'+r['list'][i]['desc']+'</p> </li>';
						}else if( r['list'][i]['type'] == 2){
						 html+='<span><img src="../images/collection-3.png"><i>画作／3D 建模</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p title="'+r['list'][i]['desc']+'">'+r['list'][i]['desc']+'</p></li>';
						}else{
							html+='<span><img src="../images/collection-2.png"><i>文字</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p title="'+r['list'][i]['desc']+'">'+r['list'][i]['desc']+'</p></li>';
						}
				}
			}
		
			$app.pager('pagination','showchengguo','',pageNum,r.count,r.pagesize);
			if(r.count>0){
			$("#show_finalwork").html(html);
			$("#pagination").show();
			}else{
				$("#show_finalwork").html("<center><h3>该小组尚未创建成果哦</h3></center>");	
				$("#pagination").hide();
			}
			$("#tab-4").html('成果展示（'+r.count+'）');
		}
	});
}

function groupCer()
{
	if ((groupMemberNum-1) <= 2) {
        systemTip('小组成员人数大于2人，才可进行认证');
        return ;
	}
	window.location.href = 'team_check_base.html?id='+queryString('id');
}
