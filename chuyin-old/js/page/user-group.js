/*
 *  group.html
 *  
 */
var offset = 0;
var nums = 5;
var myGroupsNum;
var pushGroupsNum;
$(function(){
	getMyGroup(1);
	getPushGroup(1);

	$('#tab-1').click(function(){
		$('#page').show();
		$('#pushpage').hide();
	})

	$('#tab-2').click(function(){
		$('#page').hide();
		$('#pushpage').show();
	})
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
		url:'../group/getmygroups',
		type:'post',
		data:{userId:queryString('id'),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
		
			myGroupsNum = r.total;
			var innerHtml = '';
			if (pageNum == 1) {
				if (r.type) {
					$('#tab-1').text('我管理的小组（'+r.total+'）');
				}
				else {
					$('#tab-1').text('TA管理的小组（'+r.total+'）');
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
						innerHtml += '<li>';
						if (r['data'][i]['status'] == 0) {
							innerHtml += '<a class="jzjr jzjr-off" style="border: 1px solid orange;color:orange;">审核中 </a>';
						}
						else if (r['data'][i]['status'] == 2) {
							innerHtml += '<a class="jzjr jzjr-off">审核不通过 </a>';
						}
						else {
							innerHtml += '<a href="group.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank" class="join">点击查看</a>';
						}
						innerHtml += '<a href="group.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank"><img src="'+r['data'][i]['headImg']+'"></a><h3><a style="color:black;text-decoration:none;" href="group.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank">'+r['data'][i]['name']+'</a></h3>';
	                    innerHtml += '<dl><dt>最近更新：</dt><dd>'+r['data'][i]['updated_at']+'</dd></dl>';
	                    innerHtml += '<dl><dt>成立时间：</dt><dd>'+r['data'][i]['time']+'</dd></dl>';
	                    innerHtml += '<dl><dt>参加人数：</dt><dd>'+r['data'][i]['memberNum']+'人</dd></dl>';
	                    innerHtml += '<dl><dt>管理员：</dt><dd>'+r['data'][i]['leaderName']+'</dd></dl>';
	                    innerHtml += '<dl><dt>招募：</dt><dd>'+r['data'][i]['recruit']+'</dd></dl></li>';
					}
					$('#tabbox-1 ul').html(innerHtml);
					$('.num i').text(r.haveGroupNum);
					$app.pager('page', 'getMyGroup', '', pageNum, r.total,nums);
				} 
				else {
					$('.search-group-list').hide();
					$('.nodata').show();
					$('#page').hide();
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
		url:'../group/getpushgroups',
		type:'post',
		data:{userId:queryString('id'),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){

			pushGroupsNum = r.total;
			var innerHtml = '';
			if (pageNum == 1) {
				if (r.type) {
					$('#tab-2').text('我加入的小组（'+r.total+'）');
				}
				else {
					$('#tab-2').text('TA加入的小组（'+r.total+'）');
				}
			}
			if (r.total == 0) {
				$('#pushlist').show();
				$('#pushpage').hide();
			}
			else {
				if (r['data'] !== null) {
					for (var i=0; i<r['data'].length; i++) {
						innerHtml += '<li><a href="group.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank" class="join">点击查看</a><a href="group.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank"><img src="'+r['data'][i]['headImg']+'"></a><h3><a style="color:black;text-decoration:none;" href="group.html?id='+window.btoa(r['data'][i]['id'])+'" target="_blank">'+r['data'][i]['name']+'</a></h3>';
	                    innerHtml += '<dl><dt>最近更新：</dt><dd>'+r['data'][i]['updated_at']+'</dd></dl>';
	                    innerHtml += '<dl><dt>成立时间：</dt><dd>'+r['data'][i]['time']+'</dd></dl>';
	                    innerHtml += '<dl><dt>参加人数：</dt><dd>'+r['data'][i]['memberNum']+'人</dd></dl>';
	                    innerHtml += '<dl><dt>管理员：</dt><dd>'+r['data'][i]['leaderName']+'</dd></dl>';
	                    innerHtml += '<dl><dt>招募：</dt><dd>'+r['data'][i]['recruit']+'</dd></dl></li>';
					}

					$('#tabbox-2 ul').html(innerHtml);
					$app.pager('pushpage', 'getPushGroup', '', pageNum, r.total,nums);
				} 
				else {
					$('#pushlist').show();
					$('#pushpage').hide();
				}
			}
		}
	})
}

function check()
{
	$.ajax({
		url:'../group/checkcreate',
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


