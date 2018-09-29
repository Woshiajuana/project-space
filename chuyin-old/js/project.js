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
function logout(type){
	$.ajax({
			url: "/user/logout",
			type: "POST",
			dataType : 'json',
			data: {},
			success: function (res){
				cookie('siteLogin',0,{'path':'/'});
				cookie('infoProblem',0,{'path':'/'});
				location.href = '/html/main.html';
				if(type == 1){
					window.close();
				}
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
	data.LoginForm.rememberMe = $('input[name=rememberMe]')[0].checked == true ? 1 : 0;
	
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
				if($('input[name="rememberMe"]')[0].checked == true){
					cookie('siteLogin',1,{expires:3600*24*7,'path':'/'});
				}else{
					cookie('siteLogin',1,{'path':'/'});
				}
				//如果上个页面是空页面或者登录页面，注册页面，返回首页
					if(cookie('lastPage') == ''||cookie('lastPage').indexOf('reg')>-1||cookie('lastPage').indexOf('login.html')>-1){
						window.location.href ='./user-main.html';
					}else{
						window.location.href =cookie('lastPage');
					}
			}else if(r.code == 2)     {
				systemTip(r.msg);
				window.location.href = './reg-1.html';
			}else if(r.code == 3){
				systemTip('请完善注册信息');
				if($('input[name="rememberMe"]')[0].checked == true){
					cookie('infoProblem',1,{expires:3600*24*7,'path':'/'});
				}else{
					cookie('infoProblem',1,{'path':'/'});
				}
				window.location.href = './reg-2.html';
			}else{
				systemTip(r.msg[0]); 
			}
		}
	});
}



/*
 * 获取类别列表
 */
function getWorkCat(cat,className){
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
		if(className != "upload-type"){
			if(res.length>0){
			for(var i in res){
				optionHtml += '<option value='+res[i]['id']+'>'+res[i]['name']+'</option>';
				}
			}else{
				optionHtml += '<option value='+0+'>'+'暂无分类'+'</option>';
			}
		}else{
			
			if(res.length>0){
				for(var i in res){
					optionHtml += '<input type="radio" name="upload-type" id="upload-type-btn'+res[i]['id']+'" value='+res[i]['id']+'><label>'+res[i]['name']+'</label>';
					}
				}else{
					optionHtml +='<label>暂无分类</label>';
				}
		}
			$('.'+className).append(optionHtml);
			//下拉条宽度
			if(cat == 1){
				setTimeout(function(){
					$('#dk1-selectbox-2 #dk1-combobox').css('width','150px');
					$('#dk1-selectbox-2 .dk-select-options').css('width','150px');
				},500)
			}else if(cat == 2){
				setTimeout(function(){
					$('#dk1-selectbox-2 #dk1-combobox').css('width','180px');
					$('#dk1-selectbox-2 .dk-select-options').css('width','180px');
				},500)
			}else{
				setTimeout(function(){
					$('#dk1-selectbox-2 #dk1-combobox').css('width','150px');
					$('#dk1-selectbox-2 .dk-select-options').css('width','150px');
				},500)
			}
			if(findInUrl('list') == true){
				setTimeout(function(){
					$('#dk0-selectbox-1 #dk0-combobox').css('width','140px');
					$('#dk0-selectbox-1 .dk-select-options').css('width','140px');
				},500)
			}
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
	if(queryString('opt') == 'edit'){
		data.opt = 'edit';
	}
	$.ajax({
		url: "/work/detail",
		type: "POST",
		dataType : 'json',
		data: data,
		async: false,
		success: function (r){
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
	var namestr =r.username+'<img class="sex-icon" src="../images/user_v2/sex-'+r.sex+'.png" alt="">'+'<span>Lv.'+r.lv+'</span>';
	if(r.authenurl !=''){
		namestr+='<img class="personal-icon" src="'+r.authenurl+'" alt="">';
	}
	$('.user-name').html(namestr);
	
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
	
	if(r.myself == 1){
		$('.user-nav a').eq(5).text(identity+'的积分').attr('href','user_integral.html?id='+r.id);
	}else{
		$('.user-nav li').remove();
	}
	//我的粉丝
	$('.user-count p').eq(0).html('<span>'+r.fansNum+'</span><a href="javascript:showFans();">粉丝</a>');
	//我的关注
	$('.user-count p').eq(1).html('<span>'+r.attentionNum+'</span><a href="javascript:showAttention();">关注</a>');
	//用户昵称
	$('.user-info li:eq(0)').children('span').text(r.username);
	var sex = r.sex == 1 ? '男':'女';
	//性别
	$('.user-info li:eq(1)').children('span').text(sex);
	if (r.location == '' || r.location == 'null' || r.location ==null ) {
		//地址
		$('.user-info li:eq(2)').children('span').text('好像还在火星...');
	}
	else {
		//地址
		$('.user-info li:eq(2)').children('span').text(r.location);
	}
	if (r.personalDesc == '' || r.personalDesc == 'null' || r.personalDesc == null) {
		//详细信息
		$('.user-info li:eq(3)').children('span').text('赶紧说点什么吧');
	}
	else {
		//详细信息
		$('.user-info li:eq(3)').children('span').text(r.personalDesc);
	}
	if(r.score && r.score != 'null'){
		$(".jf-ico-1").html('<label>我的积分：</label><span>'+r.score+'</span>');
		$(".jf-ico-2").html("<label>我的等级:</label><span title='"+r['levelproportion']['schedule']+"'><i style='width:"+r['levelproportion']['proportion']+";'></i></span><strong>Lv."+r.lv+"</strong>");
	}
	if(r['proportion']){
		 $(".jf-cate ul li:eq(0)").html('<p title="'+r['proportion'].loginschedule+'"><span class="ico-1">签到</span></p><i style="background: #ff99b8;width: '+r['proportion'].loginproportion+'"></i>');
		 $(".jf-cate ul li:eq(1)").html('<p title="'+r['proportion'].visityschedule+'"><span class="ico-2">欣赏</span></p><i style="background: #7ae673;width: '+r['proportion'].visityproportion+'"></i>');
		 $(".jf-cate ul li:eq(2)").html('<p title="'+r['proportion'].commentschedule+'"><span class="ico-3">评论</span></p><i style="background: #f2b00a;width: '+r['proportion'].commentproportion+'"></i>');
		 $(".jf-cate ul li:eq(3)").html('<p title="'+r['proportion'].voteschedule+'"><span class="ico-4">点赞</span></p><i style="background: #a879c9;width: '+r['proportion'].voteproportion+'"></i>');
		 $(".jf-cate ul li:eq(4)").html('<p title="'+r['proportion'].shareschedule+'"><span class="ico-5">转发</span></p><i style="background: #57d9bf;width: '+r['proportion'].shareproportion+'"></i>');
	}
	if(r.authenti>=0 && r.authenti !=null && r.authenti !='null'){
		$('.user-info li:eq(0)').children('a').attr("href","javascript:;");
		$('.user-info li:eq(0)').children('a').text("已认证");
		$('.user-info li:eq(0)').children('a').css("color","#ccc");
		
	}
}



/*
 * 展示粉丝列表
 */
function　showFans(){
	ftPage(1,1);
	$.LAYER.show({id:'tip-user-list2'});
}




/*
 * 展示关注列表
 */
function showAttention(){
	ftPage(2,1);
	$.LAYER.show({id:'tip-user-list1'});
}

/*
 * 粉丝或者关注者分页
 * 1，粉丝 2，关注
 */
function ftPage(type,pageNum){
	$.ajax({
		url:'/user/fansorattlist',
		type:'post',
		data:{type:parseInt(type),page:pageNum,uId:queryString('id')},
		async:false,
		dataType:'json',
		success:function(r){
			if(type == 1){
				var listType = 2;
			}else{
				var listType = 1;
			}
			if(r.count>0){
				var html = '';
				for(var i in r['list']){
					html+= '<li><a href="'+r['list'][i]['uLink']+'"><img src="'+r['list'][i]['head']+'"><p>'+r['list'][i]['username']+'</p></a></li>'
				}
				$('#tip-user-list'+listType+' .usertlistbox ul').html(html);
				
			}else{
				if(type == 1){
					$('#tip-user-list'+listType+' .usertlistbox ul').html('<h1>您还没有粉丝</h1>');
				}else{
					$('#tip-user-list'+listType+' .usertlistbox ul').html('<h1>您还没有关注任何用户</h1>');
				}
			}
			var params = [];
			params[0] = type;
			$app.pager('pagination'+listType, 'ftPage', params, pageNum, r.count,15);
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
			if(findInUrl('user-main.html') == true){
				data.uId = queryString('id');
			}else{
				data.uId = '';
			}
			
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
		data:{type:parseInt(type),orderType:orderType,page:page,pageSize:pageSize,keyWord:keyWord,cat:cat,tag:tag},
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
		data:{type:parseInt(type),orderType:orderType,page:page,pageSize:pageSize,keyWord:keyWord,cat:cat,tag:tag},
		async:false,
		dataType:'json',
		success:function(r){
			returnJson = r;
		}
	})
	return returnJson;
}


/*
 * 给作品投票
 */
function comment(){
	if(!checkLogin()){
		systemTip('您还没有登录哦！','javascript:toLogin();');
		return ;
	}
	var content = $('.send-pl textarea').val();
	if($.trim(content) == ''){
		systemTip('请输入评论内容');
		return ;
	}
	wType = workType;//作品类型
	$.ajax({
		url:'/comment/send',
		type:'post',
		data:{type:wType,wId:queryString('id'),content:content},
		dataType:'json',
		success:function(r){
			if(r.code == 0){
				systemTip("评论成功");
				$('.send-pl textarea').val('');
				commentPage(1);
			}else{
				systemTip(r.msg);
			}
		}
	})
}



/*
 * type
 * 1 评论列表
 */
function commentPage(page)
{
	wId = queryString('id');
	wType = workType;
	$.ajax({
		url:'/comment/list',
		type:'post',
		data:{wId:wId,wType:wType,page:page},
		async:false,
		dataType:'json',
		success:function(r){
			var html = '';
			for(var i in r['list']){
				if(r.myself == 1){
					delHtml = '<a href="javascript:delComment('+r['list'][i]['id']+');">删除</a>';
				}else{
					delHtml = '';
				}
				var content=filterXss(r['list'][i]['content']);
				html+='<li><img class="go_userurl" name="'+r['list'][i]['wLink']+'" src="'+r['list'][i]['head']+'">'+
                '<div>'+delHtml+
                '<span>'+r['list'][i]['nick']+'</span>'+
                '<p>'+content+'</p>'+r['list'][i]['time']+'</div></li>';
			}
			
			$('.pinglun-list').html(html);
			$(".go_userurl").click(function(){
				var url=$(this).attr("name");
				window.open(url);
			});
			$('.detail-box-l .detail-desc-box-title').text('评论（'+r.count+'）');
			$app.pager('pagination', 'commentPage', '', page, r.count,10);
		}
	})
}
//过滤
		function filterXss(str){
		    var string = str.replace(/\&/g, "&amp;")
						    .replace(/</g,  "&lt;")
						    .replace(/>/g,  "&gt;")
						    .replace(/"/g,  "&quot;")
						    .replace(/'/g,  "&#39;")
						    .replace(/,/g,  "&#44;")
						    .replace(/\(/g, "&#40;")
						    .replace(/\)/g, "&#41;")
						    .replace(/\?/g, "&#63;")
						    .replace(/\*/g, "&#42;")				
						    .replace(/\\/g, "&#92;")    					
						    .replace(/\+/g, "&#43;")
						    .replace(/\-/g, "&#45;");						   
		    return string;
		}

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
		data:{page:page,pageSize:pageSize,keyWord:keyWord},
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
		systemTip('您还没有登录哦！','javascript:toLogin();');
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

function viewaddscore(type,id){
	$.ajax({
		url:'/work/scorework',
		type:'post',
		data:{type:type,id:id},
		dataType:'json',
		success:function(r){
		//	console.dir(r);
		}
	})
}
/*
 * 作品详情页投票回调
 */
function detailVoteCallback(r){
	if(r.code == 0){
		var num = parseInt($('#voteNum').text());
		num +=r.count;
		$('#voteNum').text(num);
	}
	systemTip(r.msg);
}


/*
 * 收藏功能
 */
function collect(callback){
	if(!checkLogin()){
		systemTip('您还没有登录哦！','javascript:toLogin();');
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
function view(type,wId){
	if(wId == null){
		wId = queryString('id');
	}
	$.ajax({
		url:'/work/view',
		type:'post',
		data:{type:type,wId:wId},
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
		var num = parseInt($('#collectNum').text());
		num +=1;
		$('#collectNum').text(num);
	}
	systemTip(r.msg);
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

//获取当前url
function getUrl(){
	if(findInUrl('sh.act.qq.com') == true){
		return 'http://sh.act.qq.com/ufs/';
	}else{
		return 'http://ufs.act.qq.com/';
	}
}


/*
 * 获取关联视频的url
 */
function getRelatedVideoUrl(){
	var data = {};
	data.url = $('.videoUrl').val();
	if($.trim(data.url) == ''){
		layer.msg('请输入作品url',{icon:2});
		return ;
	}
	$.ajax({
		url:'/work/getrelatedvideotitle',
		type:'post',
		data:data,
		dataType:'json',
		success:function(r){
			if(r.code == 0){
				$('.videoTitle').text(r.title);
				if(r.from == 1){
					$('.videoFrom').text('bilibili视频');
				}else{
					$('.videoFrom').text('AcFun视频');
				}
				layer.msg('添加成功',{icon:1});
			}else{
				layer.msg(r.msg,{icon:2});
			}
		}
	})
}

/*
 * 添加关联视频
 */
function addRelatedVideo(){
	var data = {};
	data.wId = queryString('id');
	data.title = $('.videoTitle').text();
	data.type = workType;
	data.url = $('.videoUrl').val();
	$.ajax({
		url:'/work/addrelatedvideo',
		type:'post',
		data:data,
		dataType:'json',
		success:function(r){
			if(r.code == 0){
				$.LAYER.close();
				systemTip('关联视频成功');
				relatedVideoList();
				$('.videoUrl').val('');
				$('.videoTitle').text('');
				$('.videoFrom').text('');
			
			}else{
				layer.msg(r.msg,{icon:2});
			}
		}
	})
}

/*
 * 取消关联视频
 */
function cancelRelatedVideo(){
	$('.videoUrl').val('');
	$('.videoTitle').text('');
	$('.videoFrom').text('');
	$.LAYER.close();
}

/*
 * 加载相关视频
 */
function relatedVideoList(){
	var data = {};
	data.wId = queryString('id');
	data.type = workType;
	$.ajax({
		url:'/work/getrelatedvideolist',
		type:'post',
		data:data,
		dataType:'json',
		success:function(r){
			//视频数量
			$('.videoNum').text(r.count);
			var html = '';
			if(r.count>0){
					
					for(var i in r.list){
						if(r.myself == 1){
							var delHtml = '<a class="del" href="javascript:delRelatedVideo('+r.list[i]['workId']+','+r.list[i]['type']+','+r.list[i]['id']+')">[删除]</a>';
						}else{
							var delHtml = '';
						}
						if(r.list[i]['from'] == 1){
							var videoFrom = 'bilibili视频';
						}else{
							var videoFrom = 'acFun视频';
						}
						html+='<li>'+
                        '<div>'+
                            '<p><a target="_blank" style="text-decoration:none;color:black;" href="'+r.list[i].videoUrl+'">'+r.list[i].title+'<a></p>'+
                            '<span>'+videoFrom+'</span>'+delHtml
                        '</div>'+
                        '</li>';
					}
					$('.detail-r-list').html(html);
			}else{
				$('.detail-r-list').html('');
			}
		}
	})
}

/*
 * 删除关联视频
 */
function delRelatedVideo(wId,type,id){
	var data = {};
	data.wId = wId;
	data.type = type;
	data.id = id;
	$.ajax({
		url:'/work/delrelatedvideo',
		type:'post',
		data:data,
		dataType:'json',
		success:function(r){
			if(r.code == 0){
				systemTip('删除成功');
				relatedVideoList();
			}else{
				systemTip(r.msg);
			}
		}
	})
}


/*
 * 下载功能
 */
function download(){
	if(!checkLogin()){
		systemTip('您还没有登录哦！','javascript:toLogin();');
		return ;
	}
	window.open('/work/download?type='+queryString('type')+'&wId='+queryString('id'));
}


/*
 * 到注册页面
 */
function toLogin(){
	cookie('lastPage',location.href,{'path':'/'});
	location.href = '/html/login.html';
}

/*
 * 添加到播放列表
 * 作品id
 * type  1 添加到开头 ，2添加到末尾
 */
function addPlayList(wId,type){
	var data = {};
	data.wId = wId;
	data.type = type;
	var returnJson = {};
    $.ajax({
        url:'/work/addmusiclist',
        async:false,
        type:'post',
        data:data,
        dataType:'json',
        success:function(r){
            returnJson = r;
        }
    })
	return returnJson;
}

/*
 * 添加到播放列表。并播放
 */

function  removeMusicList(wIdArr){
    var data = {};
    data.wId = wIdArr;
    var returnJson = {};
    $.ajax({
        url:'/work/removemusiclist',
        async:false,
        type:'post',
        data:data,
        dataType:'json',
        success:function(r){
            returnJson = r;
        }
    })
    return returnJson;
}

/*
 * 获取音乐列表
 */
function getMusicList(){
    var data = {};
    $.ajax({
        url:'/work/getmusiclist',
		async:false,
        type:'post',
        data:data,
        dataType:'json',
        success:function(r){
			data = r;
        }
    })
	return data;
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




function cookie(name, value, options){
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 1000));
            }
            else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    }
    else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}

function getpiclist(){
	$.ajax({
		url: "../user/getuserpic",
		type: "POST",
		dataType : 'json',
		async : false,
		data: {id:queryString('id')},
		success: function (r){
			var badgestr = '';
			var groupstr = '';
			if(r.badge !='暂无' && r.badge){
				for(var i in r.badge){
					badgestr += "<img src='"+r.badge[i]+"'  alt=''/>"	;
				}
			}else{
					badgestr +='暂无显示徽章';
			}
			if(r.group.length>0){
					for(var i in r.badge){
						groupstr += "<img src='"+r.group[i]+"' alt=''/>";
					}
			}else{
					groupstr +="暂无标示";
				}
			if(r.myself===0){
				$(".user-info li").eq(0).find("a").hide();
			}else{
				if($(".user-info li:eq(5)").find("a").length<=0){
					$(".user-icon-wrap:eq(1)").after('<a style="float:right;" href="javascript:havelist();">管理</a>');
				}
				
			//	badgestr += '<a style="float:right;" href="javascript:havelist();">管理</a>';
				
			}
		
		$(".user-icon-wrap").eq(1).html(badgestr);
		$(".user-icon-wrap").eq(0).html(groupstr);
		}
	});
}
