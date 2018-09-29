/*
 *  group.html
 *  
 */
var offset = 0;
var nums = 10;
var myGroupsNum;
var pushGroupsNum;
$(function(){
	getMyGroup(1);
	getPushGroup(1);
//
//	$('#tab-1').click(function(){
//		$('#page').show();
//		$('#pushpage').hide();
//	})
//
//	$('#tab-2').click(function(){
//		$('#page').hide();
//		$('#pushpage').show();
//	})
})

/*
 * 我管理的小组
 */
function getMyGroup(pageNum)
{
	$('.search-group-list').show();
	// $('#page').show();
	$('.search-null').hide();  
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	$.ajax({
		url:'/group/getmygroups',
		type:'post',
		data:{userId:queryString('id'),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
		
			myGroupsNum = r.total;
			var innerHtml = '';
			if (pageNum == 1) {
				if (r.type) {
					$('.tabbox li:eq(0)').text('我管理的小组（'+r.total+'）');
				}
				else {
					$('.tabbox li:eq(0)').text('TA管理的小组（'+r.total+'）');
				}
			}
			if (myGroupsNum == 0) {
				$('.search-group-list').hide();
			}
			if (r.total == 0) {
				$('.nodata').show();
				$('#page').hide();
			}
			else {
				if (r['data'] !== null) {
					for (var i=0; i<r['data'].length; i++) {
						innerHtml += '<a href="groups-detail.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank"><div class="groupbox">';
						innerHtml += '<div class="imgbox"><img src="'+r['data'][i]['headImg']+'" style="width: 100%"></div>';
						innerHtml += '<h3>'+r['data'][i]['name']+'</h3>';
						innerHtml += '<ul>';
						innerHtml += ' <li>最近更新：<span class="blue">'+r['data'][i]['updated_at']+'</span></li>';
						innerHtml += '<li>成立时间：<span class="blue">'+r['data'][i]['time']+'</span></li>';
						innerHtml += '<li>参与人数：<span class="blue">'+r['data'][i]['memberNum']+'人</span></li>';
						innerHtml += '<li>管理员：  '+r['data'][i]['leaderName']+'</li>';
						innerHtml += '<li>招募：'+r['data'][i]['recruit']+'</li>';
						innerHtml += '</ul>';
						innerHtml += '<span class="arrw-r"></span>';
						innerHtml += '</div></a>';
					}
					$('.group-list').html(innerHtml);
					//$app.pager('page', 'getMyGroup', '', pageNum, r.total,nums);
				} 
				else {
					$('#no-msg').show();
					$('#group-list-2').hide();
				}
			}
		}
	})
}


/*
 * 我加入的小组
 */
function getPushGroup(pageNum)
{
	$('.search-null').hide();  
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	$.ajax({
		url:'/group/getpushgroups',
		type:'post',
		data:{userId:queryString('id'),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
			pushGroupsNum = r.total;
			var innerHtml = '';
			if (pageNum == 1) {
				if (r.type) {
					$('.tabbox li:eq(1)').text('我加入的小组（'+r.total+'）');
				}
				else {
					$('.tabbox li:eq(1)').text('TA加入的小组（'+r.total+'）');
				}
			}
			if (r.total == 0) {
				$('#pushlist').show();
				$('#pushpage').hide();
			}
			else {
				if (r['data'] !== null) {
					for (var i=0; i<r['data'].length; i++) {
						innerHtml += '<a href="groups-detail.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank"><div class="groupbox">';
						innerHtml += '<div class="imgbox"><img src="'+r['data'][i]['headImg']+'" style="width: 100%"></div>';
						innerHtml += '<h3>'+r['data'][i]['name']+'</h3>';
						innerHtml += '<ul>';
						innerHtml += ' <li>最近更新：<span class="blue">'+r['data'][i]['updated_at']+'</span></li>';
						innerHtml += '<li>成立时间：<span class="blue">'+r['data'][i]['time']+'</span></li>';
						innerHtml += '<li>参与人数：<span class="blue">'+r['data'][i]['memberNum']+'人</span></li>';
						innerHtml += '<li>管理员：  '+r['data'][i]['leaderName']+'</li>';
						innerHtml += '<li>招募：'+r['data'][i]['recruit']+'</li>';
						innerHtml += '</ul>';
						innerHtml += '<span class="arrw-r"></span>';
						innerHtml += '</div></a>';
					}
					$('.group-list-2').html(innerHtml);
				} 
				else {
					$('#no-msg-2').show();
					$('#group-list').hide();
				}
			}
		}
	})
}

function check()
{
	$.ajax({
		url:'/group/checkcreate',
		data:{},
		type:'post',
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
//				alert('是专业用户,跳转到创建小组页');
				systemTip('您已经是专业用户了，为您转到创建小组页面','group-add.html');
//				window.location = 'group-add.html';
			} 
			else if (r.code == 101) {
//				alert(r.message);
				banTip('您还不是专业用户','user-bind.html');
				//window.location = 'user-bind.html';
			}
			else {
//				alert(r.message);
				systemTip(r.message);
			}
		}
	})
}


