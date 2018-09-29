/**
 * wenbing.xu
 * @version v1.00
 * Modify-Date:2017-8-7 10:13:14
 */


/*菜单*/
$('.page-menu').click(function () {
    if($(".menubox").length>0){
    	if($('.menubox').css('display') == 'none'){
    		$(".menubox").show();
            $(".menuboxbg").show();
    	}else{
    		$(".menubox").hide();
            $(".menuboxbg").hide();
    	}	
        
    }else{
        $("body").append('<div class="menubox">' +
            '<ul>' +
            '<li><a href="main.html">首页</a></li>' +
            '<li><a href="zhenggao.html">专题活动</a></li>' +
            '<li><a href="groups.html">小组</a></li>' +
            '<li><a href="usermain.html">我的</a></li>' +
            '</ul>' +
            '<ul>' +
            '<li><a href="user-message.html">我的消息</a></li>' +
            '<li><a href="user-guanzhu.html">我的关注</a></li>' +
            '<li><a href="user-shoucang.html">我的收藏</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="maskbox menuboxbg"></div>')
    }
});

$('.menuboxbg').live('click',function () {
    $(".menubox").hide();
    $(".menuboxbg").hide();
});

/*tabbox*/

/*alert*/

function alertbox(_title,_desc,_btntxt) {
    $("body").append('<div class="alertbox">' +
        '<h3>'+_title+'</h3>' +
        '<p>'+_desc+'</p>' +
        '<div class="btnbox"><a href="javascript:;" class="alertbtn" onclick="alertboxclose()">'+_btntxt+'</a></div>' +
        '</div><div class="alertboxbg"></div>')
}
function alertboxclose() {
    $('.alertbox').remove();
    $('.alertboxbg').remove()
}



/*confim*/

function confimbox(_title,_desc,_btntxt,_btntxt_fun,_btntxt2,_btntxt2_fun) {
    $("body").append('<div class="confimbox">' +
        '<h3>'+_title+'</h3>' +
        '<p>'+_desc+'</p>' +
        '<div class="btnbox"><a href="javascript:;" class="cancel" onclick="'+_btntxt_fun+'">'+_btntxt+'</a><a href="javascript:;" class="alertbtn" onclick="'+_btntxt2_fun+'">'+_btntxt2+'</a></div>' +
        '</div><div class="confimboxbg"></div>')
}
function confimboxclose() {
    $('.confimbox').remove();
    $('.confimboxbg').remove()
}

function confimboxnext() {
    $('.confimbox').remove();
    $('.confimboxbg').remove()
}



