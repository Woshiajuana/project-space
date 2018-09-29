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

$(function(){
	
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
		var param = '';
		var url = location.href;
		var s=url.indexOf("?");
		var param=url.substring(s+1);// t就是?后面的东西了
		//如果是作品详情页面，跳到手机端的作品详情
		if(findInUrl('detail-txt.html') == true){
			location.href = '/html/detail-txt.html?'+param;
		}else if(findInUrl('detail-img.html') == true){
			location.href = '/html/detail-img.html?'+param;
		}else if(findInUrl('detail-music.html') == true){
			location.href = '/html/detail-music.html?'+param;
		}else{
			window.location.href = '/html/main.html';
		}
		
		
	}else{
		//wap
		
	}
	
	
	
	$('.footer-ico-2').click(function(){
		systemTip('敬请期待');
	})
	$('.buybtnbox').click(function(){
		systemTip('敬请期待');
	})
	//logo可以点击
	$('.logo').css('cursor','pointer').click(function(){
		//不是首页，跳到首页
		if(findInUrl('main.html') != true){
			location.href = '/html/main.html';
		}
	})
	$(".page-back").click(function(){
		window.history.go(-1);
	})
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
	
	// 分享按钮点击触发事件
	$('.sharebox li').eq(0).click(function(){
		alertbox('温馨提示','请用手机端浏览器自带的分享功能分享给小伙伴吧','确定');
	})
	$('.sharebox li').eq(1).click(function(){
		alertbox('温馨提示','请用手机端浏览器自带的分享功能分享给小伙伴吧','确定');
	})
	$('.sharebox li').eq(2).click(function(){
		var url = escape(location.href);
		var title = encodeURIComponent('我在poppro上看到了超棒的作品！快一起来看看吧！');
		var desc = encodeURIComponent('我在poppro上看到了超棒的作品！快一起来看看吧！');
		window.open('http://connect.qq.com/widget/shareqq/index.html?url='+url+'&title='+title+'&desc='+desc);
	})
	$('.sharebox li').eq(3).click(function(){
		var title = encodeURIComponent($('.main-head h1').text())+encodeURIComponent('我在poppro上看到了超棒的作品！快一起来看看吧！');
		var url = escape(location.href);
		window.open('http://service.weibo.com/share/share.php?pic=&url='+url+'&title='+title);
	})
	
	
})

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
    else if (explorer.indexOf("Safari") >= 0) {
        var ver = explorer.match(/version\/([\d.]+)/)[1];
        return { type: "Safari", version: ver };
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

		if (cookie('siteLogin') != 0&&cookie('siteLogin')!=null){
			return true;
			}else{
			return false;
			}
	return true;
	
}

//   Pinglun 


function comment(){
	if(!checkLogin()){
		alert("您还未登陆，请先登陆");
		location.href="./login.html";
	}
	var content = $('.msgtxt').val();
	if($.trim(content) == ''){
		alert('请输入评论内容');
		return ;
	}
	wType = queryString("type");//作品类型
	$.ajax({
		url:'/comment/send',
		type:'post',
		data:{type:wType,wId:queryString('id'),content:content},
		dataType:'json',
		success:function(r){
			if(r.code == 0){
				alert("评论成功");
				var count=parseInt($(".detail-msg-ico i").text());
					count+=1;
				$(".detail-msg-ico i").text(count);
				$('.msgtxt').val('');
				$('.pl-list').html("");
				commentPage(1);
			}else{
				alert(r.msg);
			}
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
function commentPage(page)
{
	wId = queryString('id');
	wType = queryString("type");
	$.ajax({
		url:'/comment/list',
		type:'post',
		data:{wId:wId,wType:wType,page:page,webType:"wap"},
		async:false,
		dataType:'json',
		success:function(r){
			 if(pageNum==1 && r.count<1){
				 $(".pagebody").html('<div class="data-null">暂时还没有评论哦！</div>');
			 }else{
				 pageNum+=1;
					var html = '';
					for(var i in r['list']){
						var content=filterXss(r['list'][i]['content']);
						html+='<li><img src="'+r['list'][i]['head']+'" onClick="javascript:to_user('+"'"+r['list'][i]['wLink']+"'"+');">'+
			            '<h3><span>'+r['list'][i]['time']+'</span>'+r['list'][i]['nick']+'</h3>'+
			            '<p>'+content+'</p></li>';
					}
					$('.pl-list').append(html);
			 }
			 if(r['list'].length<1){
				$(".addmore").text("没有更多评论了");
			 }
		}
	})
}
function to_user(url){
	location.href=url;
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
	$.getScript('/js/jq.layer.js',function(){
		$.LAYER.show({id:'msg-info'});
	    $(".tip-close").click(
	            function(){$.LAYER.close();}
	    )
	});
}

//   投诉
function to_conplain(){
	var workid=queryString('id');
	var type=queryString('type');
	var content=$(".tousubox textarea").val();
	if(content==""){
		alertbox('温馨提示','内容不能为空','确定');
		return;
	}
	$.ajax({
		url:'/work/to_conplain',
		type:'POST',
		data:{workid:workid,type:type,content:content},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				alertbox('温馨提示','举报成功','确定');
				   $('.tousubox').hide();
			       $('.tousubg').hide();
			       $(".tousubox textarea").val("");
			}else{
				alertbox('温馨提示',r.msg,'确定');
			    $('.tousubox').hide();
		        $('.tousubg').hide();
				$(".tousubox textarea").val("");
			}
		}
	})
}
