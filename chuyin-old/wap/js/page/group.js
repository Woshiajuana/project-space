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
			$('#tab-2-box .user-img-list').html('<br/><br/><<center><h1>作品列表为空</h1></center>');
		}else{
			$('#tab-3-box').html('<br/><br/><<center><h1>作品列表为空</h1></center>');
		}
	}
}




function getGroupInfo()
{
	$.ajax({
		url:'/group/getgroupinfo',
		type:'get',
		data:{id:queryString('id')},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 102) {
				alert(r.message);
				window.location.href = 'groups.html';
			}
			else {
				if (r.status == 3) {
					window.location.href = 'groups.html';
				}
				$('.header').attr('src',r.headImg);
				$('.groupname').html('<a style="color:white;text-decoration: none;" href="javascript:;">'+r.name+'</a>');
				$('.nums').text('成员：'+r.memberNum);
				$('.nums').attr('href','groups-user.html?id='+queryString('id'));
				$('.creattime').text('成立时间：'+r.date);
				$('.group-desc-box h3').text('成立时间：'+r.date);
				$('.updatetime').text('更新时间：'+r.updated_at);
				$('.recruit').html('<span>招募</span> '+r.recruit);
				$('.groupdesc').text(r.groupDesc);
				$('.group-top-linkbox a:eq(0)').click(function(){$('.allpagetip').show();})
				$('.adminnick').html('<span>管理员</span> '+r.leaderName);
				$('.adminhead,.adminnick').attr('href','user-main.html?id='+window.btoa(r.leaderId));
				$('.alluser-link').text('查看全部成员（'+r.memberNum+'）');
				$('.alluser-link').attr('href','group-user-list.html?id='+queryString('id'));
				$('.lookmore').attr('href','group-logs-list.html?id='+queryString('id'));
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
						if (r.groupStatus == 2) {
							$('#showMsg').text('禁止加入');
							$('#showMsg').show();
							$('#applyIn').hide();
						}
						else {
							$('#applyIn').show();
							$('#applyIn').unbind('click');
							$('#applyIn').click(function(){
								joinInGroup(queryString('id'));
							})
						}
					}
					else {
						$('#haveIn').show();
					}
				}
				else {
					if (r.status == 0) {
						$('#showMsg').text('审核中');
						$('#showMsg').show();
					}
					else if (r.status == 1) {
						if (r.groupStatus == 0) {
							//$('#haveIn').show();
						}
						else if (r.groupStatus == 1) {
							$('#showMsg').text('转让中');
							$('#showMsg').show();
						}
						else if (r.groupStatus == 2) {
							$('#showMsg').text('禁止加入');
							$('#showMsg').show();
						}
					}
					else {
						$('#showMsg').text('审核不通过');
						$('#showMsg').show();
					}
				}
			}
		}
	})
}

function joinInGroup(id)
{
	if(!checkLogin()){
		alertbox('','请先登录','确定');
		return ;
	}
	$('.applydesc').val('');
	$.ajax({
		url:'/group/checkjoinin',
		type:'post',
		data:{id:id},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				getGroupInfo(id);
				showbox();
			    $(".tip-close").click(
			        function(){$.LAYER.close();}
			    )
			    $('.applyin').unbind('click');
			    $('.applyin').click(function(){
					var applydesc = $.trim($('.applydesc').val());
					if (applydesc == '') {
						alert('先说说你的本领吧');
					}
					else {
						applyInGroup(id,applydesc);
					}
			    })
			}
			else {
				alertbox('',r.message,'确定');
			}
		}
	})
	
}

function userListInfo()
{
	var returnJson = {}
	$.ajax({
		url:'/group/getuserlist',
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

function pushInGroup(touristId)
{
	if(!checkLogin()){
		alertbox('','请先登录','确定');
		return ;
	}
	//js base64_encode
	//window.btoa("test")；//"dGVzdA=="
	//window.atob("dGVzdA==");//"test"
	$.ajax({
		url:'/group/pushingroup',
		type:'post',
		data:{id:queryString('id'),touristId:touristId},
		dataType:'json',
		async:false,
		success:function(r){
		}
	})
}

function showbox()
{
	$('.tousubox').show();
	$('.tousubg').show();
}

function closebox()
{
	$('.tousubox').hide();
	$('.tousubg').hide();
}

function applyInGroup(groupId,desc)
{
	if(!checkLogin()){
		alert('请先登录');
		return ;
	}
	$.ajax({
		url:'/group/replyingroup',
		type:'post',
		data:{id:window.atob(groupId),desc:desc},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				alertbox('','申请成功','确定');
				$('.applydesc').val('');
				closebox();
			}
			else {
				alertbox('',r.message,'确定');
			}
		}
	})
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
		url:'/work/groupworklist',
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

//校验管理员
function check_leader(){
	$.ajax({
		url:'/group/check_leader',
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
			url:'/group/check_groupwork',
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
			url:'/group/save_chengguo',
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
		url:'/group/delete_chengguo',
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
		type:'get',
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
					html+='<span><img src="../images/collection-1.png"><i>音乐</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p>'+r['list'][i]['desc']+'</p>	<div class="btnbox"><a href="javascript:delete_cg('+r['list'][i]['id']+')">删除</a></div> </li>';
					}else if( r['list'][i]['type'] == 2){
					 html+='<span><img src="../images/collection-3.png"><i>画作／3D 建模</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p>'+r['list'][i]['desc']+'</p>	<div class="btnbox"><a href="javascript:delete_cg('+r['list'][i]['id']+')">删除</a></div> </li>';
					}else{
						html+='<span><img src="../images/collection-2.png"><i>文字</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p>'+r['list'][i]['desc']+'</p> 	<div class="btnbox"><a href="javascript:delete_cg('+r['list'][i]['id']+')">删除</a></div></li>';
					}
				}else{
			
					if(r['list'][i]['type']==3){
						html+='<span><img src="../images/collection-1.png"><i>音乐</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p>'+r['list'][i]['desc']+'</p> </li>';
						}else if( r['list'][i]['type'] == 2){
						 html+='<span><img src="../images/collection-3.png"><i>画作／3D 建模</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p>'+r['list'][i]['desc']+'</p></li>';
						}else{
							html+='<span><img src="../images/collection-2.png"><i>文字</i><a style="text-decoration:none;color:#333;" href="'+r['list'][i]['uLink']+'">'+r['list'][i]['username']+'</a></span> <p>'+r['list'][i]['desc']+'</p></li>';
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
