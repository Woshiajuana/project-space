/*
 *  group.html
 *  
 */
var offset = 0;
var nums = 7;
$(function(){
	getGroupList(1,1);
	$('.group-list-search').keydown(function(e){ 
		  if(e.keyCode==13){ 
			  searchGroup(1);
		  } 
	});
	$('.groupsearchbtn').click(function(){
		searchGroup(1);
	})
	//banner展示
//	$.ajax({
//		url: "/work/showbanner",
//		type: "POST",
//		dataType : 'json',
//		data: {},
//		async: true,
//		success:function(r){
//		
//		var htmlstr="";
//		for(var i in r){
//		
//			if(r[i]['url']){
//			htmlstr+="<a href='"+r[i]['url']+"' target='_blank'><div><img src='"+r[i]['picUrl']+"' style='width:340px;height:150px'></div></a>";
//			}
//			else{
//			htmlstr+="<div><img src='"+r[i]['picUrl']+"' style='width:340px;height:150px'></div>";
//			}
//		}
//		
//		$(".sub-advbox").html(htmlstr);
//
//		}
//	});
	// 官方活动展示
	$.ajax({
		url: "/work/shownotify",
		type: "POST",
		dataType : 'json',
		data: {},
		async: true,
		success:function(r){
		var htmlstr="";
	
		for(var i in r){
			if(r[i]['category']=='hd'){
			htmlstr+='<a href="'+r[i]['url']+'" target="_blank"><li><h4>'+r[i]['title']+'</h4><h5 class="'+r[i]['type']+'-ico">专题活动：<span>'+r[i]['stoptime']+'</span> 截止！</h5></li></a>';
			}
			else{
			htmlstr+='<a href="'+r[i]['url']+'" target="_blank"><li><h4>'+r[i]['title']+'</h4><p>'+r[i]['time']+'</p></li></a>';	
			}
		}
		
		$(".main-tg").html(htmlstr);

		}
	});
})

/*
 * type
 * 0:最新创建  1:最近活跃
 */
function getGroupList(type,pageNum)
{
	$('.search-group-list').show();
	$('#page').show();
	$('.search-null').hide();  
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	$.ajax({
		url:'../group/getgrouplist',
		type:'post',
		data:{type:parseInt(type),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
		
			var innerHtml = '';
			if (r['data'] !== null) {
				for (var i=0; i<r['data'].length; i++) {
					innerHtml += '<li>';
					if (r['data'][i]['isLeader'] || r['data'][i]['isJoinIn']) {
						innerHtml += '<a href="group.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank" class="join">点击查看</a>';
					}
					else if (r['data'][i]['groupStatus'] == 2) {
						innerHtml += '<a class="jzjr jzjr-off">禁止加入 </a>';
					}
					else {
						innerHtml += '<a href="javascript:;" onclick="joinInGroup('+r['data'][i]['id']+')" class="join">申请加入</a>';
					}
					innerHtml += '<a target="_blank" href="group.html?id='+window.btoa(r['data'][i]['id'])+'"><img src="'+r['data'][i]['headImg']+'"></a>';
                    innerHtml += '<h3><a target="_blank" style="color:black;text-decoration:none;" href="group.html?id='+window.btoa(r['data'][i]['id'])+'">'+r['data'][i]['name']+'</a></h3><dl><dt>最近更新：</dt><dd>'+r['data'][i]['updated_at']+'</dd></dl><dl><dt>成立时间：</dt><dd>'+r['data'][i]['time']+'</dd></dl>';
                    innerHtml += '<dl><dt>参加人数：</dt><dd>'+r['data'][i]['memberNum']+'人</dd></dl><dl><dt>管理员：</dt><dd>'+r['data'][i]['leaderName']+'</dd></dl><dl><dt>招募：</dt><dd>'+r['data'][i]['recruit']+'</dd></dl></li>';
				}
				$('.search-group-list').html(innerHtml);
				$app.pager('page', 'getGroupList', [type], pageNum, r.total,nums);
			} 
			else {
				$('.search-null').show();
			}
		}
	})
}

function getGroupInfo(id)
{
	$.ajax({
		url:'../group/getgroupinfo',
		type:'get',
		data:{id:window.btoa(id)},
		dataType:'json',
		async:false,
		success:function(r){
			$('.applyhead').attr('src',r.headImg);
			$('.applyname').text(r.name);
			$('.applytxt').text(r.groupDesc);
		}
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
		data:{id:window.btoa(id)},
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
				alert(r.message);
//				systemTip(r.message);
			}
		}
	})
	
}

function applyInGroup(groupId,desc)
{
	//js base64_encode
	//window.btoa("test")；//"dGVzdA=="
	//window.atob("dGVzdA==");//"test"
	$.ajax({
		url:'../group/replyingroup',
		type:'post',
		data:{id:groupId,desc:desc},
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
			else if (r.code == 901) {
//				alert(r.message);
				layer.msg(r.message);
//				systemTip(r.message);
			}
			else {
//				alert(r.message);
				layer.msg(r.message);
//				systemTip(r.message);
			}
		}
	})
}

//创建小组前身份校验
function check()
{
	if(!checkLogin()){
		systemTip('请先登录','https://www.poppro.cn/html/login.html');
	}
	$.ajax({
		url:'../group/checkcreate',
		data:{},
		type:'post',
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
//				alert('是专业用户,跳转到创建小组页');
//				systemTip('是专业用户,跳转到创建小组页');
				systemTip('您已经是专业用户了，为您转到创建小组页面','group-add.html');
//				window.location = 'group-add.html';
			}
			else if (r.code == 101) {
//				alert(r.message);
				banTip('您还不是专业用户','user-bind.html');
				//window.location = 'user-bind.html';
			}
			else if (r.code == 901) {
//				alert(r.message);
				systemTip(r.message,'https://www.poppro.cn/html/login.html');
//				window.location = 'login.html';
			}
			else {
//				alert(r.message);
				systemTip(r.message);
			}
		}
	})
}

function searchGroup(pageNum)
{
	$('.search-group-list').html('');
	$('.search-group-list').show();
	$('#page').show();
	$('.search-null').hide();
	var searchStr = $.trim($('.group-list-search').val());
	if (!searchStr) {
		if ($('.list-order li a[class="on"]').text() == '最新创建') {
			getGroupList(0,1);
		}
		else {
			getGroupList(1,1);
		}
		return ;
	}
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	$.ajax({
		url:'../group/searchgroup',
		type:'post',
		data:{searchStr:searchStr,offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			if (r.code == 0) {
				if (r['data'] !== null) {
					for (var i=0; i<r['data'].length; i++) {
						innerHtml += '<li><a href="javascript:;" onclick="joinInGroup('+r['data'][i]['id']+')" class="join">申请加入</a><a target="_blank" href="group.html?id='+window.btoa(r['data'][i]['id'])+'"><img src="'+r['data'][i]['headImg']+'"></a>';
	                    innerHtml += '<h3><a style="color:black;text-decoration:none;" target="_blank" href="group.html?id='+window.btoa(r['data'][i]['id'])+'">'+r['data'][i]['name']+'</a></h3><dl><dt>最近更新：</dt><dd>'+r['data'][i]['updated_at']+'</dd></dl><dl><dt>成立时间：</dt><dd>'+r['data'][i]['time']+'</dd></dl>';
	                    innerHtml += '<dl><dt>参加人数：</dt><dd>'+r['data'][i]['memberNum']+'人</dd></dl><dl><dt>管理员：</dt><dd>'+r['data'][i]['leaderName']+'</dd></dl><dl><dt>招募：</dt><dd>'+r['data'][i]['recruit']+'</dd></dl></li>';
					}
					$('.search-group-list').html(innerHtml);
					$app.pager('page', 'searchGroup','', pageNum, r.total,nums);
				} 
				else {
					$('.search-group-list').hide();
					$('#page').hide();
					$('.search-null').show();
				}
			}
			else if (r.code == 102) {
				$('.search-group-list').hide();
				$('#page').hide();
				$('.search-null').show();
			}
			else {
//				alert(r.message);
				systemTip(r.message);
			}
			
		}
	})
	
	
	
	
	
}

