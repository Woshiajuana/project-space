/*
 *  项目的ajax接口拉取方法
 *  
 */
$(function(){
	$('input[type="password"]').keyup(function(){
	    var str = $(this).val();
	    str = str.replace(/\s+/g,'');
	  $(this).val(str);
	});
})



function getdate(timestamp) {
    var now = new Date(timestamp),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}





/*
 *  退出
 */
function logout(){
	$.ajax({
			url: "/user/logout",
			type: "POST",
			dataType : 'json',
			data: {},
			success: function (res){
				cookie('siteLogin',0,{'path':'/'});
				cookie('siteLogin',0,{'path':'/wap'});
				cookie('infoProblem',{'path':'/'});
				location.href = './main.html';
			}
		});	
}


/*
 * 注册功能
 */
function login(){
	var data = {};
	data.LoginForm = {};
	var email = $.trim($('input[name=email]').val());
	data.LoginForm.email = window.btoa(email);
	var password = $.trim($('input[name=password]').val());
	data.LoginForm.password = window.btoa(password);
	
	$.ajax({
		url: "/user/login",
		type: "POST",
		dataType : 'json',
		data: data,
		success: function (r){
			if(r.code == 0){
				//重置infoProblem的cookie
				cookie('infoProblem',0,{'path':'/'});
				//如果一周保持登录，写cookie的时候1个星期
					cookie('siteLogin',1,{'path':'/'});
					window.location.href ='./usermain.html';
			}else if(r.code == 2)     {
				alert(r.msg);
				window.location.href = './verifyEmail.html';
			}else if(r.code == 3){
				alert('请完善注册信息');
				window.location.href = './reg-submit-info.html';
			}else{
				alert(r.msg); 
			}
		}
	});
}



/*
 * 获取类别列表
 */
function getWorkCat(cat){
	var returnJson = {};
	var data = {};
	data.type = cat;
	$.ajax({
		url: "/work/cat",
		type: "POST",
		dataType : 'json',
		data: data,
		async: false,
		success: function (res){
			var optionHtml = '';
			if(res.length>0){
				for(var i in res){
					optionHtml += '<li value='+res[i]['id']+'>'+res[i]['name']+'</li>';
				}
				}else{
					optionHtml +='<li>暂无分类</li>';
				}
			$('.selectboxlist ul').eq(1).append(optionHtml);
		}
	});
}


/*
 * 获取类别列表
 */
function getWorkInfo(cat,id,callback){
	var data = {};
	data.type = cat;
	data.id = id;
	$.ajax({
		url: "/work/detail",
		type: "POST",
		dataType : 'json',
		data: data,
		async: false,
		success: function (r){
			console.dir(r);
			callback(r);
		}
	});
}

/*
 * 
 */


/*
 * 删除作品
 */
function delWork(type,id,callback){
	layer.confirm('确定要删除该作品吗',function(){
		var returnJson = {};
		var data = {};
		data.type = type;
		data.id = id;
		$.ajax({
			url: "/work/del",
			type: "POST",
			dataType : 'json',
			data: data,
			async: false,
			success: function (r){
				layer.closeAll();
				callback(r);
			}
		});
		},function(){
			
		})
}


/*
 * 编辑作品
 */
function editWork(cat,id){
	//文字作品修改
	if(cat == 1|| cat == 4){
		location.href = '/html/post-txt.html?id='+id+'&type='+cat+'&opt=edit';
	//图片作品修改
	}else if(cat == 2 || cat == 5){
		location.href = '/html/post-image.html?id='+id+'&type='+cat+'&opt=edit';
	//音乐作品修改	
	}else{
		location.href = '/html/post-music.html?id='+id+'&type='+cat+'&opt=edit';
	}
}


/*
 * 获取类别列表
 */
function getUserInfo(id,callback){
	var data = {};
	data.id = id;
	$.ajax({
		url: "/user/userinfo",
		type: "POST",
		dataType : 'json',
		data: data,
		async: false,
		success: function (r){
			callback(r)
			userInfo = r;
		}
	});
}


/*	
 * 作品详情页个人信息
 */
function DetailWorkUserInfoCallback(r){
	var html = '<h3><a href="'+r.uLink+'"><img src="'+r.head+'"></a><span><a href="'+r.uLink+'">'+r.username+'</a><img src="../images/user/sex-'+r.sex+'.png" class="sex" ></span></h3>'+
        '<p>'+r.personalDesc+'</p><a href="'+r.uLink+'">查看作者更多作品</a>';
	$('.zuozhe').html(html);
	$('.zuozhe').show();
}


/*
 * 个人页的个人信息回调
 */
function userInfoCallback(r){
	//放头像
	$('.portrait').html('<img class="portrait" src="'+r.head+'" height="120" />');
	//昵称
	$('.user-name').html('<span class="sex-'+r.sex+'">'+r.username+'</span>');
	//如果不是我的个人主页
	if(r.myself != 1){
		var identity = 'TA';
		//关注功能
		//判断是否已经关注过了
		if(ifAttention(queryString('id'))){
			$('.user-rbox h3 a').html('<a href="javascript:cancelAttention();" class="btn-ygz"><span>已关注</span><i>取消关注</i></a>');
		}else{
			$('.user-rbox h3 a').html('<a class="btn-gz" href="javascript:attention();" >关注</a>');
		}
	}else{
		//编辑按钮
		$('.user-rbox h3 a').attr('href','user-info.html');
		var identity = '我';
	}
	$('.user-nav a').eq(0).text(identity+'的主页').attr('href','user-main.html?id='+r.id);
	$('.user-nav a').eq(1).text(identity+'的信息').attr('href','user-info.html?id='+r.id);
	$('.user-nav a').eq(2).text(identity+'的收藏').attr('href','user-favorite.html?id='+r.id);
	$('.user-nav a').eq(3).text(identity+'的小组').attr('href','user-group.html?id='+r.id);
	$('.user-nav a').eq(4).text(identity+'的参赛作品').attr('href','user-works.html?id='+r.id);
	//我的粉丝
	$('.user-count p').eq(0).html('<span>'+r.fansNum+'</span><a href="javascript:showFans();">粉丝</a>');
	//我的关注
	$('.user-count p').eq(1).html('<span>'+r.attentionNum+'</span><a href="javascript:showAttention();">关注</a>');
	//用户昵称
	$('.user-info li:eq(0)').children('span').text(r.username);
	var sex = r.sex == 1 ? '男':'女';
	//性别
	$('.user-info li:eq(1)').children('span').text(sex);
	if (r.location == '') {
		//地址
		$('.user-info li:eq(2)').children('span').text('好像还在火星...');
	}
	else {
		//地址
		$('.user-info li:eq(2)').children('span').text(r.location);
	}
	if (r.personalDesc == '') {
		//详细信息
		$('.user-info li:eq(3)').children('span').text('赶紧说点什么吧');
	}
	else {
		//详细信息
		$('.user-info li:eq(3)').children('span').text(r.personalDesc);
	}
	
		
}


/*
 * 粉丝或者关注者分页
 * 1，粉丝 2，关注
 */
function ftPage(type,pageNum){
	$.ajax({
		url:'/user/fansorattlist',
		type:'post',
		data:{type:parseInt(type),page:pageNum,uId:queryString('id'),webType:'wap'},
		async:false,
		dataType:'json',
		success:function(r){
			if(r.count>0){
				var html = '';
				for(var i in r['list']){
					html+= '<li><a href="'+r['list'][i]['uLink']+'"><img src="'+r['list'][i]['head']+'"><p>'+r['list'][i]['username']+'</p></a></li>'
				}
				$('.guanzhu-list ul').append(html);
				if(r.list.length<pageSize){
					$('.addmore').unbind().text('没有更多数据了');
				}else{
					$('.addmore').click(function(){
						++pageNum;
						ftPage(2,pageNum);
					}).text('点击加载更多');
				}
			}else{
				$('.guanzhu-list ul').html('<h1 style="text-align:center;">您还没有关注任何用户</h1>');
				$('.addmore').hide();
			}
		}
	})
}








/*
 * 判断是否是粉丝
 */
function ifAttention(uId){
	var ifAtt = false;
	$.ajax({
		url: "/user/ifattention",
		type: "POST",
		dataType : 'json',
		async : false,
		data: {'uId':uId},
		success: function (r){
			if(r.attention == 1){
				ifAtt = true;
			}
		}
	});
	return ifAtt;
}

/*
 * 关注
 */
function attention(){
	if(!checkLogin()){
		systemTip('您还没有登录哦！','javascript:toLogin();');
		return ;
	}
	var uId = queryString('id');
	$.ajax({
		url: "/user/attention",
		type: "POST",
		dataType : 'json',
		async : false,
		data: {'uId':uId},
		success: function (r){
			systemTip(r.msg);
			$('.user-rbox h3 a').html('<a href="javascript:cancelAttention();" class="btn-ygz"><span>已关注</span><i>取消关注</i></a>');
		}
	});
}


/*
 * 取消关注
 */
function cancelAttention(uId){
	var uId = queryString('id');
	$.ajax({
		url: "/user/cancelattention",
		type: "POST",
		dataType : 'json',
		async : false,
		data: {'uId':uId},
		success: function (r){
			systemTip(r.msg);
			$('.user-rbox h3 a').html('<a class="btn-gz" href="javascript:attention();">关注</a>');
		}
	});
}

/*
 * 获取个人经常使用标签
 */
function personalHotTag(type,callback){
	var data = {};
	data.type = type;
	try{
		if(queryString('opt') != ''){
			data.uId = queryString('id');
		}else{
			data.uId = '';
		}
	}catch(e){
		
	}
	$.ajax({
		url: "/tag/personalhottag",
		type: "POST",
		dataType : 'json',
		async : false,
		data: data,
		success: function (r){
			callback(r);
		}
	});
}


/*
 * type
 * 1 时间，2查看数量
 */
function workList(type,orderType,keyWord,cat,tag,page,pageSize,callback)
{
	$.ajax({
		url:'/work/list',
		type:'post',
		data:{type:parseInt(type),orderType:orderType,page:page,pageSize:pageSize,keyWord:keyWord,cat:cat,tag:tag,webType:"wap"},
		async:false,
		dataType:'json',
		success:function(r){
			callback(r)
		}
	})
}



/*
 * type
 * 1 时间，2查看数量
 */
function getWorkList(type,orderType,keyWord,cat,tag,page,pageSize)
{
	var returnJson = {};
	$.ajax({
		url:'/work/list',
		type:'post',
		data:{type:parseInt(type),orderType:orderType,page:page,pageSize:pageSize,keyWord:keyWord,cat:cat,tag:tag,workType:"wap"},
		async:false,
		dataType:'json',
		success:function(r){
			returnJson = r;
		}
	})
	return returnJson;
}


///*
// * 给作品投票
// */
//function comment(){
//	if(!checkLogin()){
//		systemTip('您还没有登录哦！','javascript:toLogin();');
//		return ;
//	}
//	var content = $('.send-pl textarea').val();
//	if($.trim(content) == ''){
//		systemTip('请输入评论内容');
//		return ;
//	}
//	wType = workType;//作品类型
//	$.ajax({
//		url:'/comment/send',
//		type:'post',
//		data:{type:wType,wId:queryString('id'),content:content},
//		dataType:'json',
//		success:function(r){
//			if(r.code == 0){
//				systemTip(r.msg+"!请等待审核");
//				$('.send-pl textarea').val('');
//				commentPage(1);
//			}else{
//				systemTip(r.msg);
//			}
//		}
//	})
//}



/*
// * type
// * 1 评论列表
// */
//function commentPage(page)
//{
//	wId = queryString('id');
//	wType = workType;
//	$.ajax({
//		url:'/comment/list',
//		type:'post',
//		data:{wId:wId,wType:wType,page:page},
//		async:false,
//		dataType:'json',
//		success:function(r){
//			var html = '';
//			for(var i in r['list']){
//				if(r.myself == 1){
//					delHtml = '<a href="javascript:delComment('+r['list'][i]['id']+');">删除</a>';
//				}else{
//					delHtml = '';
//				}
//				html+='<li><img class="go_userurl" name="'+r['list'][i]['wLink']+'" src="'+r['list'][i]['head']+'">'+
//                '<div>'+delHtml+
//                '<span>'+r['list'][i]['nick']+'</span>'+
//                '<p>'+r['list'][i]['content']+'</p>'+r['list'][i]['time']+'</div></li>';
//			}
//			$('.pinglun-list').html(html);
//			$(".go_userurl").click(function(){
//				var url=$(this).attr("name");
//				window.open(url);
//			});
//			$('.detail-box-l .detail-desc-box-title').text('评论（'+r.count+'）');
//		}
//	})
//}

//	function to_pl(){
////		var type=queryString('type');
////		var id=queryString('id');
////		location.href="./detail-pl.html?id="+id+"&type="+type;
//	}
/*
 * 删除评论功能
 */
function delComment(id){
	$.ajax({
		url:'/comment/del',
		type:'post',
		data:{id:id},
		async:false,
		dataType:'json',
		success:function(r){
			systemTip(r.msg);
			if(r.code == 0){
				commentPage(1);
			}
		}
	})
}



/*
 * 人物标签
 */
function tagList(type,callback){
	$.ajax({
		url:'/tag/personaltag',
		type:'post',
		data:{type:type},
		async:false,
		dataType:'json',
		success:function(r){
			callback(r)
		}
	})
}


/*
 * 用户列表
 */
function userList(page,pageSize,keyWord,callback){
	$.ajax({
		url:'/user/list',
		type:'post',
		data:{page:page,pageSize:pageSize,keyWord:keyWord,webType:'wap'},
		async:false,
		dataType:'json',
		success:function(r){
			callback(r)
		}
	})
}



/*
 * 给作品投票
 */
function vote(type,callback){
	if(!checkLogin()){
		alertbox('温馨提示','请先登录','确定');
		return ;
	}
  
  var data = {type:queryString('type'),wId:queryString('id')};
  if(queryString('actId')!=null&&queryString('actId')!=''){
    data.actId=queryString('actId');
  }
	$.ajax({
		url:'/work/vote',
		type:'post',
		data:data,
		dataType:'json',
		success:function(r){
			callback(r);
		}
	})
}


/*
 * 作品详情页投票回调
 */
function detailVoteCallback(r){
	if(r.code == 0){
		var num = parseInt($(".ico-detail-top-1").text());
		num +=r.count;
		$('.ico-detail-top-1').text(num);
	}
	alertbox('',r.msg,'确定');
}


/*
 * 收藏功能
 */
function collect(callback){
	if(!checkLogin()){
		alertbox('温馨提示','请先登录','确定');
		return ;
	}
	
	$.ajax({
		url:'/work/collect',
		type:'post',
		data:{type:queryString('type'),wId:queryString('id')},
		dataType:'json',
		success:function(r){
			callback(r);
		}
	})
}


/*
 * 浏览
 */
function view(type){
	$.ajax({
		url:'/work/view',
		type:'post',
		data:{type:type,wId:queryString('id')},
		dataType:'json',
		success:function(r){
			
		}
	})
}
/*
 * 作品详情页投票回调
 */
function detailCollectCallback(r){
	if(r.code == 0){
		var num = parseInt($(".ico-detail-top-2").text());
		num +=1;
		$('.ico-detail-top-2').text(num);
	}
	alertbox('',r.msg,'确定');
}


function workDetailUserInfoCallback(r){
	var html = '<h3><a style="text-decoration:none;" href="other-works.html?id="><img src="'+r['head']+'"><span>'+r['username']+'</a><img src="../images/user/sex-'+r['sex']+'.png" class="sex" ></span></h3>'+
                '<p>'+r['personalDesc']+'</p>'+
                '<a href="other-works.html?id=">查看作者更多作品</a>';
	$('.zuozhe').html(html);
}






//查找url中的某个字符串是否存在
function findInUrl(str){
	url = location.href;
	return url.indexOf(str) == -1 ? false : true;
}

//获取url参数
function queryString(key){
	var val = (document.location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',null])[1];
	if(val == null){
		val = '';
	}
    return val;
}




/*
 * 到注册页面
 */
function toLogin(){
	cookie('lastPage',location.href,{'path':'/'});
	location.href = './login.html';
}

/*
 * 检测代码
 */
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?da21fa43efdeffa93b170df2505ab0fd";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

