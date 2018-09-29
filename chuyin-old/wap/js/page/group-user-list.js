/*
 *  group-user-list.html
 *  
 */
var offset = 0;
var nums = 20;
var userNum;
var isAdmin;
$(function(){
	getUserList(1);
	
	$.ajax({
		url:'/group/getgroupinfo',
		type:'get',
		data:{id:queryString('id')},
		dataType:'json',
		async:false,
		success:function(r){
			memberNum = r.memberNum;
			isAdmin = r.isAdmin;
			if (memberNum <= 1) {
				$('.groupuser-list h3').text('0人');
			}else {
				$('.groupuser-list h3').text((memberNum-1)+'人');
			}
		}
	})
	
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
		url:'/group/getuserlist',
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
						innerHtml += '<li>';
						innerHtml += '<a href="usermain.html?id='+window.btoa(r['data'][i]['id'])+'">';
						innerHtml += '<img src="'+r['data'][i]['head']+'" >';
						innerHtml += '<span>'+r['data'][i]['username']+'</span>';
						innerHtml += '</a><i onclick="deleteUser('+window.atob(queryString('id'))+','+r['data'][i]['id']+')"></i>';
						innerHtml += '</li>';
					}
					else {
						innerHtml += '<li>';
						innerHtml += '<a href="usermain.html?id='+window.btoa(r['data'][i]['id'])+'">';
						innerHtml += '<img src="'+r['data'][i]['head']+'" >';
						innerHtml += '<span>'+r['data'][i]['username']+'</span>';
						innerHtml += '</a>';
						innerHtml += '</li>';
					}
				}
				$('#members').html(innerHtml);
			}
			else {
				//没有成员列表
				$('.data-null').show();
			}
			
		}
	})
}

function confimboxnext(groupId,userId) {
    $.ajax({
		url:'/group/deleteuser',
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
			$('.confimbox').remove();
		    $('.confimboxbg').remove();
		}
	})
}

function deleteUser(groupId,userId)
{
	$.ajax({
			url:'/user/userinfo',
			data:{id:window.btoa(userId)},
			type:'post',
			dataType:'json',
			async:false,
			success:function(r) {
				confimbox('删除成员','确认删除成员：'+r.username,'取消','confimboxclose()','确认','confimboxnext('+groupId+','+userId+')');
			}
		})
}

