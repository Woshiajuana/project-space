var offset = 0;
var nums = 5;
var searchStr;
$(function(){
	searchGroup(0,1,'');
	//搜索下拉条
	setTimeout(function(){
		$('#search-select img').hide().eq(4).show();
	},500)
})

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
					}
					else {
						applyInGroup(id,applydesc);
					}
			    })
			}
			else {
				alert(r.message);
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
				alert('申请成功');
				$('.applydesc').val('');
				$.LAYER.close();
			}
			else if (r.code == 901) {
				alert(r.message);
			}
			else {
				alert(r.message);
			}
		}
	})
}

//创建小组前身份校验
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
				alert('是专业用户,跳转到创建小组页');
				window.location = 'group-add.html';
			}
			else {
				alert(r.message);
			}
		}
	})
}

/*
 * type
 * 0:最新创建  1:最近活跃
 */
function searchGroup(type,pageNum,searchStr)
{
	var searchStr = (searchStr == '')?decodeURI($.trim(queryString('search'))):searchStr;
	if (!searchStr) {
		$('.search-null').show();
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
		data:{searchStr:searchStr,offset:offset,nums:nums,type:type},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			if (r.code == 0) {
				if (r['data'] !== null) {
					$('.search-group-list').show();
					$('#page').show();
					$('.search-null').hide();
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
				alert(r.message);
			}
			
		}
	})
	
	
	
	
	
}

