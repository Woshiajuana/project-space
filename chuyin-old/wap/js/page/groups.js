/*
 *  group.html
 *  
 */
var offset = 0;
var nums = 4;
$(function(){
	getGroupList(0,1);
	getGroupList(1,1);
})

/*
 * type
 * 0:最新创建  1:最近活跃
 */
function getGroupList(type,pageNum)
{
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	$.ajax({
		url:'/group/getgrouplist',
		type:'post',
		data:{type:parseInt(type),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			if (r['data'] !== null) {
				for (var i=0; i<r['data'].length; i++) {
					innerHtml += '<a href="groups-detail.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank"><div class="groupbox">';
					innerHtml += '<div class="imgbox"><img src="'+r['data'][i]['headImg']+'" style="width: 100%"></div>';
					innerHtml += '<h3>'+r['data'][i]['name']+'</h3>';
					innerHtml += '<ul>';
					innerHtml += '<li>最近更新：<span class="blue">'+r['data'][i]['updated_at']+'</span></li>';
					innerHtml += '<li>成立时间：<span class="blue">'+r['data'][i]['time']+'</span></li>';
					innerHtml += '<li>参与人数：<span class="blue">'+r['data'][i]['memberNum']+'人</span></li>';
					innerHtml += '<li>管理员：  '+r['data'][i]['leaderName']+'</li>';
					innerHtml += '<li>招募：'+r['data'][i]['recruit']+'</li>';
					innerHtml += '</ul>';
					innerHtml += '<span class="arrw-r"></span>';
					innerHtml += '</div></a>';
				}
				if (type == 0) $('.group-list1').html(innerHtml);
				if (type == 1) $('.group-list2').html(innerHtml);
				$('.addmore').show();
			} 
			else {
				$('#no-msg').show();
				$('.addmore').hide();
			}
		}
	})
}

var newPageNum = 1;
var hotPageNum = 1;
function addMore()
{
	var index = $('.tabbox li[class="on"]').index();
	if (index == 0) {
		//最新创建
		newPageNum++;
		addGroupList(0,newPageNum)
	}
	else if (index == 1) {
		//最近活跃
		hotPageNum++;
		addGroupList(1,hotPageNum)
	}
}

function addGroupList(type,pageNum)
{
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	$.ajax({
		url:'/group/getgrouplist',
		type:'post',
		data:{type:parseInt(type),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			if (r['data'] !== null) {
				for (var i=0; i<r['data'].length; i++) {
					innerHtml += '<a href="groups-detail.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank"><div class="groupbox">';
					innerHtml += '<div class="imgbox"><img src="'+r['data'][i]['headImg']+'" style="width: 100%"></div>';
					innerHtml += '<h3>'+r['data'][i]['name']+'</h3>';
					innerHtml += '<ul>';
					innerHtml += '<li>最近更新：<span class="blue">'+r['data'][i]['updated_at']+'</span></li>';
					innerHtml += '<li>成立时间：<span class="blue">'+r['data'][i]['time']+'</span></li>';
					innerHtml += '<li>参与人数：<span class="blue">'+r['data'][i]['memberNum']+'人</span></li>';
					innerHtml += '<li>管理员：  '+r['data'][i]['leaderName']+'</li>';
					innerHtml += '<li>招募：'+r['data'][i]['recruit']+'</li>';
					innerHtml += '</ul>';
					innerHtml += '<span class="arrw-r"></span>';
					innerHtml += '</div></a>';
				}
				if (type == 0) $('.group-list1 a:last').append(innerHtml);
				if (type == 1) $('.group-list2 a:last').append(innerHtml);
			} 
			else {
				alert('没有更多啦');
			}
		}
	})
}


function getGroupInfo(id)
{
	$.ajax({
		url:'/group/getgroupinfo',
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
		systemTip('请先登录','/html/login.html');
		return ;
	}
	$('.applydesc').val('');
	$.ajax({
		url:'/group/checkjoinin',
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
		url:'/group/replyingroup',
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
		systemTip('请先登录','/html/login.html');
	}
	$.ajax({
		url:'/group/checkcreate',
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
				systemTip(r.message,'login.html');
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
		url:'/group/searchgroup',
		type:'post',
		data:{searchStr:searchStr,offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			if (r.code == 0) {
				if (r['data'] !== null) {
					for (var i=0; i<r['data'].length; i++) {
						innerHtml += '<a href="groups-detail.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank"><div class="groupbox">';
						innerHtml += '<div class="imgbox"><img src="'+r['data'][i]['headImg']+'" style="width: 100%"></div>';
						innerHtml += '<h3>'+r['data'][i]['name']+'</h3>';
						innerHtml += '<ul>';
						innerHtml += '<li>最近更新：<span class="blue">'+r['data'][i]['updated_at']+'</span></li>';
						innerHtml += '<li>成立时间：<span class="blue">'+r['data'][i]['time']+'</span></li>';
						innerHtml += '<li>参与人数：<span class="blue">'+r['data'][i]['memberNum']+'人</span></li>';
						innerHtml += '<li>管理员：  '+r['data'][i]['leaderName']+'</li>';
						innerHtml += '<li>招募：'+r['data'][i]['recruit']+'</li>';
						innerHtml += '</ul>';
						innerHtml += '<span class="arrw-r"></span>';
						innerHtml += '</div></a>';
					}
					$('.group-list1').html(innerHtml);
//					$app.pager('page', 'searchGroup','', pageNum, r.total,nums);
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
				alert(r.message);
			}
			
		}
	})
	
	
	
	
	
}

