/*
 *  一些页面公用的js
 *  
 */
var WORK_TXT = 1;
var WORK_PIC = 2;
var WORK_MUSIC = 3;
var AC_TXT=4;
var AC_PIC=5;
var AC_MUSIC=6;
var MSG_NUM = 0;
var GROUP_NUM=0;
var PL_NUM=0;

var userInfo = {};

if(cookie('lastPage') == null){
	cookie('lastPage','');
}

$(function(){

	$('.logo').click(function(){
		window.location.href = '/';
	})



	//跳转
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	if(flag == true){
		//pc 
	}else{
		//wap
		var param = '';
		var url = location.href;
		var s=url.indexOf("?");
		var param=url.substring(s+1);// t就是?后面的东西了
		//如果是作品详情页面，跳到手机端的作品详情
		if(findInUrl('detail-txt.html') == true){
			location.href = '/wap/html/detail-txt.html?'+param;
		}else if(findInUrl('detail-img.html') == true){
			location.href = '/wap/html/detail-img.html?'+param;
		}else if(findInUrl('detail-music.html') == true){
			location.href = '/wap/html/detail-music.html?'+param;
		}else{
			window.location.href = '/wap/html/main.html';
		}
	}
	//分享作品
	$(".jiathis_style_32x32").bind("click",function(){
		$.ajax({
			url:'/work/sharework',
			type:'get',
			data:{},
			dataType:'json',
			async:false,
			success:function(r){
				
			}
		})
	})
	
	/*
	 * 输入框点击后清除默认的文字
	 */
	$('input[type=text],textarea').focus(function(){
		  if($(this).val() == ''){
		     $(this).attr('placeholder1',$(this).attr('placeholder'))
		    $(this).attr('placeholder','')
		  }
		}).blur(function(){
		  $(this).attr('placeholder',$(this).attr('placeholder1'))
		})
	//hot字样是否展示
	$.ajax({
		url:'/workofficial/show_hot',
		type:'get',
		data:{},
		dataType:'json',
		async:false,
		success:function(r){
			if(r.code==0){
			$(".navhot").show();	
		//	$(".navhot").width(37).height(17);
			}
			else{
				$(".navhot").hide();		
			}
		}
	})
	
	//底部购买
	$('.footer-ico-2').css("cursor","pointer");
	$('.footer-ico-2').click(function(){

		//window.open('https://item.taobao.com/item.htm?spm=a230r.1.14.26.76bf523mn4NEU&id=557546981640&ns=1&abbucket=1#detail');
	})
	//音乐作品页购买
	$('.buybtnbox').css("cursor","pointer");
	$('.buybtnbox').click(function(){

		//window.open('https://item.taobao.com/item.htm?spm=a230r.1.14.21.76bf523BghgiK&id=557597518442&ns=1&abbucket=1#detail');
	})
//	$('.navbox ul li:eq(6) a').attr('href','javascript:void(0)').attr('title','敬请期待');
	var type=queryString('type');
	if(type==AC_MUSIC || type==AC_PIC || type==AC_TXT){
		$("#toupiao").html("投票");
	}
	//logo可以点击
	$('.logo').css('cursor','pointer').click(function(){
		//不是首页，跳到首页
		if(findInUrl('main.html') != true){
			location.href = '/html/main.html';
		}
	})
	//我要投稿
	$('.t-send-link').attr('href','javascript:touGao();');
	//登录态切换
	if(checkLogin()){
		$.post('/user/userinfo',{},function(r){
            userInfo = r;
			if(r.id == ''){
				cookie('siteLogin',0,{'path':'/'});
				$('.top-login li a').eq(0).hide();
				$('.top-login li').eq(1).html('<span class="t-login-link"><a href="javascript:toLogin();" class="t-login-link link-on">登录</a>／<a href="/html/reg.html" class="t-login-link">注册</a></span>');
			}else{
				$('.top-login li a').eq(0).show();
				$('.top-login li').eq(1).html('<span class="t-login-username"> <i><img src="'+r.head+'"></i><a href="/html/user-main.html">'+r.username+'</a><a href="javascript:logout();">［退出］</a></span>');
				$('.top-login li:eq(1) img').css('cursor','pointer').click(function(){
					location.href = '/html/user-main.html';
				})
				cookie('sessionId',r.sessionId);
			}
		},'json');
		getMsgNum();
	}else{
		//如果是在个人页面,没有登录态跳转到首页
		if((findInUrl('user-bind.html') == true||findInUrl('user-favorite.html') == true||findInUrl('user-group.html') == true||findInUrl('user-info.html') == true||findInUrl('user-main.html') == true||findInUrl('user-password.html') == true||findInUrl('user-works.html')) == true&&queryString('id')==''){
			location.href = 'main.html';
		}
		$('.top-login li a').eq(0).hide();
		//注册页面高亮
		if(findInUrl('reg.html') == true){
			$('.top-login li').eq(1).html('<span class="t-login-link"><a href="javascript:toLogin();" class="t-login-link ">登录</a>／<a href="/html/reg.html" class="t-login-link link-on">注册</a></span>');
		}else{
			$('.top-login li').eq(1).html('<span class="t-login-link"><a href="javascript:toLogin();" class="t-login-link link-on">登录</a>／<a href="/html/reg.html" class="t-login-link">注册</a></span>');
		}
	}
	
	//搜索按钮
	$('.searchboxbody .btn').css('cursor','pointer').click(function(){
		//输入搜索内容
		var content = $('.searchboxbody  .input').val();
		if($.trim(content) == ''&&content!=''){
			systemTip('请输入搜索内容');
			return ;
		}else if(content == ''){
			content = '初音';
		}
		$('#search-select img').each(function(e){
			if($(this).css('display')!='none'){
				content = encodeURI(content);
				//音频
				if(0 == e){
					var searchUrl = 'search-list-music.html?search='+content;
					var searchPageStr = 'search-list-music';
				//文字
				}else if(1 == e){
					var searchUrl = 'search-list-txt.html?search='+content;
					var searchPageStr = 'search-list-txt';
				}else if(2 == e){
					var searchUrl = 'search-list-img.html?search='+content;
					var searchPageStr = 'search-list-img';
				}else if(3 == e){
					var searchUrl = 'search-list-user.html?search='+content;
					var searchPageStr = 'search-list-user';
				}else if(4 == e){
					var searchUrl = 'search-list-group.html?search='+content;
					var searchPageStr = 'search-list-group';
				}
				///搜索页面如果不是本页面,跳到搜索页面
				if(!findInUrl(searchPageStr)){
					location.href = searchUrl;
				}else{
					content = decodeURI(content);
					keyWord = content;
					$('.search-result h3 span').text(keyWord);
					if (!findInUrl('search-list-group.html')) {
						page(1);
					}
					else {
						searchGroup(0,1,content);
					}
				}
			}
		})
	})
	
	//搜索相关页面
	if(findInUrl('search') == true){	
		var searchContent = queryString('search');
		searchContent = decodeURI(searchContent);
		$('.search-result h3 span').text(searchContent);
		
		//搜索页面导航点击事件
		$('.search-nav a').each(function(e){
			var searchUrl  = $(this).attr('href')+'?search='+searchContent;
			$(this).attr('href',searchUrl);
		})
	}
	
	//用户相关页面
	if(findInUrl('user') == true){	
		if (findInUrl('group-user-list') == true) return false;
		var userId = queryString('id');
		getUserInfo(userId,userInfoCallback);
        $('body').append('<div class="UED_hide" id="tip-user-list1">    <div class="showbox showbox-1">        <h2>关注列表</h2>        <div class="usertlistbox usertlistbox-1">            <ul>                <!-- <li>                    <img src="../images/pro-2.jpg">                    <p> </p>                </li> -->            </ul>        </div>        <div class="pagination"  id="pagination1">         </div>    </div>    <a class="tip-close" href="javascript:;"></a></div><div class="UED_hide" id="tip-user-list2">    <div class="showbox showbox-1">        <h2>粉丝列表</h2>        <div class="usertlistbox usertlistbox-1">            <ul>               <!--  <li>                    <img src="../images/pro-2.jpg">                    <p> </p>                </li> -->            </ul>        </div>        <div class="pagination"  id="pagination2">         </div>    </div>    <a class="tip-close" href="javascript:;"></a></div>');
      //关注的关闭按钮
		$(".tip-close").click(
                function(){$.LAYER.close();}
        )
	}
	
	//作品详情页相关
	if(findInUrl('detail-img.html') == true||findInUrl('detail-music.html') == true||findInUrl('detail-txt.html') == true){
		//加载相关视频
		relatedVideoList();
	}
	
	/*
	 * 定期请求，防止session过期
	 * 轮训是5分钟一次，写cookie有效期是10分钟
	 */
	cookie('sessionExist',1, {expires : 300});
	setInterval(function(){
		if(cookie('sessionExist')!=1){
			$.post('/user/session');
			cookie('sessionExist',1, {expires : 300});
		}
	},1000*60);


	//引入页面的轮子开始
    $("<link>")
        .attr({ rel: "stylesheet",
            type: "text/css",
            href: "/css/wheelmenu.css"
        })
        .appendTo("head");
    $.getScript('/js/jquery.wheelmenu.min.js',function(){
    	$('body').append('<a href="#wheel3" class="wheel-button">\n' +
            '</a>\n' +
            '<ul id="wheel3" data-angle="E" class="wheel">\n' +
            '    <li class="item"><a href="javascript:touGao();" class="item-1"></a></li>\n' +
            '    <li class="item"><a href="javascript:toPersonalMessagePage();" class="item-2"></a></li>\n' +
            '    <li class="item"><a href="javascript:gotoPlayer();" class="item-3"></a></li>\n' +
            '    <li class="item"><a href="javascript:scrollToTop();" class="item-4"></a></li>\n' +
            '</ul>');
        $(".wheel-button").wheelmenu({
            trigger: "hover",
            animation: "fly",
            animationSpeed: "fast"
        });
	})

    //引入页面的轮子结束
})

//type:
//1 : ie 10以下版本
//2 ： ie 10以上版本
//type : 0 头像  1 缩略图
function handleImg(pic,x,y,width,height,type,callback)
{
	
	$.ajax({
		url:'../group/handleimg',
		type:'post',
		data:{pic:pic,x:x,y:y,width:width,height:height,type:type},
		dataType:'json',
		async:false,
		success:function(r){
			return callback(r);
		}
	})
}

function getExplorerInfo() {
    var explorer = window.navigator.userAgent.toLowerCase();
    //ie 
    if (explorer.indexOf("msie") >= 0) {
        var ver = explorer.match(/msie ([\d.]+)/)[1];
        return { type: "IE", version: ver };
    }
        //firefox 
    else if (explorer.indexOf("firefox") >= 0) {
        var ver = explorer.match(/firefox\/([\d.]+)/)[1];
        return { type: "Firefox", version: ver };
    }
        //Chrome
    else if (explorer.indexOf("chrome") >= 0) {
        var ver = explorer.match(/chrome\/([\d.]+)/)[1];
        return { type: "Chrome", version: ver };
    }
        //Opera
    else if (explorer.indexOf("opera") >= 0) {
        var ver = explorer.match(/opera.([\d.]+)/)[1];
        return { type: "Opera", version: ver };
    }
        //Safari
    else if (explorer.indexOf("safari") >= 0) {
        var ver = explorer.match(/version\/([\d.]+)/)[1];
        return { type: "safari", version: ver };
    }

}

//查找url中的某个字符串是否存在
function findInUrl(str){
	url = location.href;
	return url.indexOf(str) == -1 ? false : true;
}
// 查找指定url
function findInUrl1(str,url){
	return url.indexOf(str) == -1 ? false : true;
}
function getMsgNum()
{
	$.ajax({
		url:'/message/getmsgnum',
		type:'get',
		data:{},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
	
				if (r['data']['msgNum'] > 0) {
					$('.t-msg-link span').css('height','16px');
					$('.t-msg-link span').css('width','16px');
					$('.t-msg-link span').show();
					$('.t-msg-link span').text(r['data']['msgNum']);
					MSG_NUM = r['data']['msgNum']; 
					GROUP_NUM = r['data']['grmsg'];
					
				}
				else {
					getOfficial();
				}
			}
		}
	})
}

function getOfficial()
{	
	$.ajax({
		url:'/message/getofficial',
		type:'get',
		data:{},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				$('.t-msg-link span').css('height','10px');
				$('.t-msg-link span').css('width','10px');
				$('.t-msg-link span').show();
				$('.t-msg-link span').text('');
				if (findInUrl('message')) {
					$('#officialMsg').css('height','10px');
					$('#officialMsg').css('width','10px');
					$('#officialMsg').css('padding',0);
					$('#officialMsg').show();
				}
			}
		}
	})
}


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



function checkLogin(){
	if(cookie('infoProblem') == 1&&findInUrl('reg.html') == false){
		if(findInUrl('reg-2.html') == true){
			//alert('请完善注册信息');
		}else{
			alert('请完善注册信息');
			window.location.href = './reg-2.html';
		}
		return false;
	}else{
		if (cookie('siteLogin') != 0&&cookie('siteLogin')!=null){
			return true;
			}else{
			return false;
			}
	}
	return true;
	
}



/*
 *	系统提示弹层
 */
function systemTip(msg,url){
	if($.trim(url) == ''){
		url = 'javascript:$.LAYER.close()';
	}
	if($('#msg-info').length<1){
		$('body').append('<div class="UED_hide" id="msg-info">'+
		        '<div class="showbox showbox-4">'+
		           ' <h2>系统提示</h2>'+
		         '   <div class="applybox">'+
		        '       <div class="groupinfo">'+
		           '         <p style="text-align:center;">'+msg+'</p>'+
		            '    </div>'+
		           '     <div class="btnbox">'+
		            '        <a href="'+url+'">确定</a>'+
		           '     </div>'+
		         '   </div>'+
		        '</div>'+
		        '<a class="tip-close" href="javascript:;"></a>'+
		   '</div>');
	}else{
		$('#msg-info p').text(msg);
		$('#msg-info a').attr('href',url);
	}
	$.getScript('/js/jq.layer.js',function(){
		$.LAYER.show({id:'msg-info'});
	    $(".tip-close").click(
	            function(){$.LAYER.close();}
	    )
	});
}

function showMsgTip(msg,url){
    if($.trim(url) == ''){
        url = 'javascript:$.LAYER.close()';
    }
    if($('#msg-info').length<1){
        $('body').append('<div class="UED_hide" id="msg-info">'+
            '<div class="showbox showbox-4">'+
            ' <h2>系统提示</h2>'+
            '   <div class="applybox">'+
            '       <div class="groupinfo">'+
            '         <p style="text-align:center;">'+msg+'</p>'+
            '    </div>'+
            '     <div class="btnbox">'+
            '        <a href="'+url+'">确定</a>'+
            '     </div>'+
            '   </div>'+
            '</div>'+
            '</div>');
    }else{
        $('#msg-info p').text(msg);
        $('#msg-info a').attr('href',url);
    }
    $.getScript('/js/jq.layer.js',function(){
        $.LAYER.show({id:'msg-info'});
        $(".tip-close").click(
            function(){$.LAYER.close();}
        )
    });
}

/*
 *	系统提示弹层
 */
function banTip(msg,url){
	if($.trim(url) == ''){
		url = 'javascript:$.LAYER.close()';
	}
	if($('#msg-info').length<1){
		$('body').append('<div class="UED_hide" id="msg-info">'+
		        '<div class="showbox showbox-4">'+
		           ' <h2>系统提示</h2>'+
		         '   <div class="applybox">'+
		        '       <div class="groupinfo">'+
		           '         <p style="text-align:center;">'+msg+'</p>'+
		            '    </div>'+
		           '     <div class="btnbox">'+
		            '        <a href="'+url+'">立即绑定</a>'+
		           '     </div>'+
		         '   </div>'+
		        '</div>'+
		        '<a class="tip-close" href="javascript:;"></a>'+
		   '</div>');
	}else{
		$('#msg-info p').text(msg);
		$('#msg-info a').attr('href',url);
	}
	$.getScript('../js/jq.layer.js',function(){
		$.LAYER.show({id:'msg-info'});
	    $(".tip-close").click(
	            function(){$.LAYER.close();}
	    )
	});
}

/*
 * 我要投稿按钮
 */
function touGao(){
		if(cookie('infoProblem') == 1){
			if(findInUrl('reg-2.html') == true){
				alert('请完善注册信息');
			}else{
				alert('请完善注册信息');
				window.location.href = './reg-2.html';
			}
			return ;
		}
	if(!checkLogin()){
		systemTip('您还没有登录哦！','javascript:toLogin();');
		return ;
	}
	$.post('/user/ifcancreate',{},function(r){
		if(r.code== 0){
			location.href = '/html/post-music.html';
		}else{
			systemTip('要发布作品，请先绑定手机号升级成专业用户','/html/user-bind.html');
		}
	},'json');

}
//   投诉
function to_conplain(){
	var workid=queryString('id');
	var type=queryString('type');
	var content=$("#conplain_content").val();
	if(content==""){
		layer.msg("投诉内容不能为空");
		return;
	}
	$.ajax({
		url:'../work/to_conplain',
		type:'POST',
		data:{workid:workid,type:type,content:content},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				layer.msg(r.msg,{icon:1});
				 $.LAYER.close({id:'tip-group-transfer'});
				 $("#conplain_content").val("");
			}else{
				layer.msg(r.msg,{icon:2});
				 $.LAYER.close({id:'tip-group-transfer'});
				 $("#conplain_content").val("");
			}
		}
	})
}
function colse_conplain(){
	 $.LAYER.close({id:'tip-group-transfer'});
}

function getExplorerInfo() {
	 var explorer = window.navigator.userAgent.toLowerCase() ;
	 //ie 
	 if (explorer.indexOf("msie") >= 0) {
	    var ver=explorer.match(/msie ([\d.]+)/)[1];
	    return {type:"IE",version:ver};
	 }
	 //firefox 
	 else if (explorer.indexOf("firefox") >= 0) {
	    var ver=explorer.match(/firefox\/([\d.]+)/)[1];
	    return {type:"Firefox",version:ver};
	 }
	 //Chrome
	 else if(explorer.indexOf("chrome") >= 0){
	    var ver=explorer.match(/chrome\/([\d.]+)/)[1];
	     return {type:"Chrome",version:ver};
	 }
	 //Opera
	 else if(explorer.indexOf("opera") >= 0){
	 var ver=explorer.match(/opera.([\d.]+)/)[1];
	 return {type:"Opera",version:ver};
	 }
	 //Safari
	 else if(explorer.indexOf("safari") >= 0){
	 var ver=explorer.match(/version\/([\d.]+)/)[1];
	 return {type:"safari",version:ver};
	 }
	 //IE  8.0
}

function isUseH5()
{
	// if (getExplorerInfo().type != "IE") {
	// 	return true;
	// }
	// else {
	// 	if (getExplorerInfo().version == '7.0') return false;
	// 	if (getExplorerInfo().version == '8.0') return false;
	// 	if (getExplorerInfo().version == '9.0') return false;
	// 	if (getExplorerInfo().version == '10.0') return false;
	// }

    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return false;
        } else if(fIEVersion == 8) {
            return false;
        } else if(fIEVersion == 9) {
            return false;
        } else if(fIEVersion == 10) {
            return false;
        } else {
            return false;//IE版本<=7
        }
    } else if(isEdge) {
        return true;//edge
    } else if(isIE11) {
        return true; //IE11
    }else{
        return true;//不是ie浏览器
    }
}

/*
 * 到个人信息页
 */
function toPersonalMessagePage(){
	if(checkLogin()){
		window.location.href = '/html/message.html';
	}else{
		systemTip('请先登录','javascript:toLogin();');
	}
}

/*
 * 到音乐播放面
 */
function gotoPlayer(){
    if(checkLogin()){
        window.location.href = '/player/view/player.html';
    }else{
        systemTip('请先登录','javascript:toLogin();');
    }
}

var isTop = false;
var Time1 = '';
/*
 * 滑动到顶部
 */
function scrollToTop(){
    //设置定时器
    Time1 = setInterval(function(){
        var osTop = document.body.scrollTop||document.documentElement.scrollTop;
        //ceil向上取整，floor向下取整
        var speed = Math.ceil(osTop/2);
        //做一个变换速度的回到顶部效果
        document.body.scrollTop = document.documentElement.scrollTop = osTop - speed;
        if(osTop <= 0){
            //清除定时器
            clearInterval(Time1);
        }
        isTop = true ;
    },100)

}


window.onscroll = function(){
    //获取页面可视区高度和滚动高度
    var osTop = document.body.scrollTop||document.documentElement.scrollTop;
    //这两个获取滚动的方法可以兼容多种浏览器
    var clientHeight = document.documentElement.clientHeight;
    if (!isTop) {
        clearInterval(Time1);
    }
    isTop = false;
}


