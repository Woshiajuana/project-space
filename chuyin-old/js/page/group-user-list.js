/*
 *  group-user-list.html
 *  
 */
var offset = 0;
var nums = 20;
var userNum;
$(function(){
	getUserList(1);
	$('.admininfo').attr('href','user-main.html?id='+leaderId);
	$('.admininfo img').attr('src',leaderHead);
	$('.admininfo p').text(leaderName);
	$('.userlistbox h3').text('小组成员（'+memberNum+'）');
})

function getUserList(pageNum)
{
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	
	$.ajax({
		url:'../group/getuserlist',
		type:'post',
		data:{id:queryString('id'),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
			if (r['data'] !== null) {
				var innerHtml = '';
				if (r['data'].length == 1) userNum = 1;
				for (var i=0; i<r['data'].length; i++) {
					if (isAdmin) {
						innerHtml += '<li class="user-'+window.btoa(r['data'][i]['id'])+'"><img src="'+r['data'][i]['head']+'"><a href="user-main.html?id='+window.btoa(r['data'][i]['id'])+'" style="color:black;text-decoration:none;" title="'+r['data'][i]['username']+'" target="_blank"><p>'+r['data'][i]['username']+'</p></a><span style="cursor:pointer" onclick="deleteUser('+window.atob(queryString('id'))+','+r['data'][i]['id']+')"></span></li>';
					}
					else {
						innerHtml += '<li><img src="'+r['data'][i]['head']+'"><a href="user-main.html?id='+window.btoa(r['data'][i]['id'])+'" style="color:black;text-decoration:none;" title="'+r['data'][i]['username']+'" target="_blank"><p>'+r['data'][i]['username']+'</p></a></li>';
					}
					
				}
				$('#members').html(innerHtml);
				$app.pager('page', 'getUserList', '', pageNum, r.total,nums);
			}
			else {
				//没有成员列表
				$('.search-null').show();
				$('.search-null').text('暂无成员');
			}
			
		}
	})
}

function deleteUser(groupId,userId)
{
	$.ajax({
			url:'../user/userinfo',
			data:{id:window.btoa(userId)},
			type:'post',
			dataType:'json',
			async:false,
			success:function(r) {
				$('.del-userinfo img').attr('src',r.head);
				$('.del-userinfo p').text(r.username);
				$.LAYER.show({id:'tip-user-del'});
			}
		})
	$('.deleteuser').unbind('click');
    $('.deleteuser').click(function(){
    	$.ajax({
			url:'../group/deleteuser',
			data:{groupId:window.btoa(groupId),userId:window.btoa(userId)},
			type:'post',
			dataType:'json',
			async:false,
			success:function(r) {
				$('.user-'+window.btoa(userId)).hide();
		    	if (userNum == 1) {
		    		$('#members').hide();
		    		$('#page').hide();
		    		$('.search-null').show();
		    		$('.search-null').text('暂无成员');
		    	}
				alert(r.message);
				$.LAYER.close();
			}
		})
    })
}

