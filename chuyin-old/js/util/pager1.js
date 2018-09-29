/**
 * @fileOverview app jslib 邀请链接类
 * @param {String} divName 分页导航渲染到的dom对象ID
 * @param {String} funName 点击页码需要执行后台查询数据的JS函数
 * @param {Object} params 后台查询数据函数的参数，参数顺序就是该对象的顺序，当前页面一定要设置在里面的
 * @param {String} total 后台返回的总记录数
 * @param {Boolean} pageSize 每页显示的记录数，默认是10
 * @author bondli@tencent.com
 * @copyright Copyright (c) 2010-2011 tencent Inc. All rights reserved.
 * @version 1.4.2
 */

/*
 * $app.pager($config)
 */




var $app = {};
$app.pager = function(divId, funName, params, curPage, total, pageSize){
	var output = '<div class="pagination">';
	var pageSize = parseInt(pageSize)>0 ? parseInt(pageSize) : 10;
	if(parseInt(total) == 0 || parseInt(total) == 'NaN') return;
	var totalPage = Math.ceil(total/pageSize);
	var curPage = parseInt(curPage)>0 ? parseInt(curPage) : 1;
	
	//从参数对象中解析出来各个参数
	var param_str = '';
	for(o in params){
	    if(typeof params[o] == 'string'){
	       param_str += '\'' + params[o] + '\',';
	    }
	    else{
	       param_str += params[o] + ',';
	    }
	}
	//设置起始页码
	if (totalPage > 10) {
		if ((curPage - 3) > 0 && curPage < totalPage - 3) {
			var start = curPage - 3;
			var end = curPage + 3;
		}
		else if (curPage >= (totalPage - 3)) {
			var start = totalPage - 10;
			var end = totalPage;
		}
		else {
			var start = 1;
			var end = 10;
		}
    }
    else {
        var start = 1;
        var end = totalPage;
    }
    
    //首页控制
	if(curPage>1){
		output += '<a href="javascript:'+funName+'(' + param_str + '1);" title="第一页" class="page-start">«</a>';
	}
	else
	{
		// output += '<span class="page-disabled">«</span> ';
	}
	//上一页菜单控制
	if(curPage>1){
		output += '<a href="javascript:'+funName+'(' + param_str + (curPage-1)+');" title="上一页" class="page-start">‹</a>';
	}
	else{
		// output += '<span class="page-disabled">‹</span>';
	}
	//页码展示
	for (i = start; i <= end; i++) {
		if (i == curPage) {
			output += '<a href="javascript:;" class="on">' + curPage + '</a>';
		}
		else {
			output += '<a href="javascript:'+funName+'(' + param_str + i + ')">' + i + '</a>';
		}
	}
	//下一页菜单控制
    if(totalPage>1 && curPage<totalPage){
    	output += '<a title="下一页" href="javascript:'+funName+'('+param_str + (curPage+1)+');" class="page-end">›</a>';
    }
    else{
    	// output += '<span class="page-disabled">›</span>';
    }
    //最后页控制
    if(curPage<totalPage){
    	output += '<a title="下一页" href="javascript:'+funName+'('+param_str + totalPage+');" class="page-end">»</a>';
    }
    else{
    	// output += '<span class="page-disabled">»</span>';
    }
    
    output += '</div>';
    //渲染到dom中
    $('#'+divId)[0].innerHTML = output;
    // $app.G(divId).innerHTML = output;
};
