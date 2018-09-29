/*
 *  group-user-list.html
 *  
 */
var offset = 0;
var nums = 10;
$(function(){
	getlogs(1);
})

function getlogs(pageNum)
{
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	
	$.ajax({
		url:'../group/getgrouplogs',
		type:'post',
		data:{id:queryString('id'),offset:offset,nums:nums},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			var result = [];
			if (r['data']) {
				for (var i=0; i<r['data'].length; i++) {
				result = r['data'][i].split('|');
				innerHtml += '<li><span>'+result[1]+'</span>'+result[0]+'</li>';
				}
				$('#logList').html(innerHtml);
				$app.pager('page', 'getlogs', '', pageNum, r.total,nums);
			} 
			else {
				$('.search-null').show();
				$('.search-null').text('暂无动态');
			}
			
		}
	})
}

