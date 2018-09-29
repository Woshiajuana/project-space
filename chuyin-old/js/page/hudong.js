var platNum = 0;
var sort = 1;
// var noteTypeArr = ['','','','great','hot','hot'];
var noteTypeArr = ['','','','great','great','great'];
var noteNameArr = ['','','','【精华】','【置顶】','【置顶精华】'];
var offset = 0;
var nums = 20;
var emojiData = [];
var emojiTypeData = [];

function getNoteList(sort, pageNum)
{
    pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
    if (pageNum == 1) {
        offset = 0;
    }
    else {
        offset = (pageNum-1)*nums;
    }
    var data = {};
    data.platNum = platNum;
    data.sort = sort;
    data.offset = offset;
    data.nums = nums;
    $.ajax({
        url:'/hudong/get-note-list',
        type:'post',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
        	if (r.total <= 0) {
        	    $('#page').hide();
        	    $('.null-wrap').show();
                $('.hulist').hide();
            }
            else {
                $('.hulist').show();
                var innerHtml = '';
                var className = '';
                var noteTypeName = '';
                var isHavePic = false;
                var picHtml = '';
                var showContent = '';
                for (var i=0 in r.data) {
                    isHavePic = checkIsHavePic(r['data'][i]['content']);
                    if (isHavePic) {
                        var picShowUrl = getPicShowUrl(r['data'][i]['content']);
                        picHtml = '<a href="javascript:;" class="showimg-ico">\n' +
                            '                    <img width="200" style="z-index: 100" src="'+picShowUrl+'">\n' +
                            '                </a>';
                        // showContent = getShowHtml(r['data'][i]['content']);
                    }
                    else {
                        picHtml = '<a href="javascript:;">\n' +
                            '                </a>';
                        // showContent = r['data'][i]['content'];
                    }
                    showContent = getShowHtml(r['data'][i]['content']);
                    if (r['data'][i]['checkType'] == 3) {
                        //精华帖
                        className = noteTypeArr[r['data'][i]['checkType']];
                        noteTypeName = noteNameArr[r['data'][i]['checkType']];
                    }
                    else {
                        className = noteTypeArr[r['data'][i]['status']];
                        noteTypeName = noteNameArr[r['data'][i]['status']];
                    }
                    if (!platNum) {
                        //首页总列表
                        if (r['data'][i]['publish'] == '1') {
                            innerHtml += '<li class="'+className+'">\n' +
                                '                <h4><span><a target="_blank" style="text-decoration:none" href="list-hudong-detail.html?noteId='+window.btoa(r['data'][i]['noteId'])+'">'+noteTypeName+r['data'][i]['title']+'</a></span> '+picHtml+'</h4>\n' +
                                '                <p>'+showContent+'</p>\n' +
                                '                <div>\n' +
                                '                    <span>楼主：'+r['data'][i]['userName']+'</span>\n' +
                                '                    <span>'+r['data'][i]['checkTime']+'</span>\n' +
                                '                    <span class="yuedu">'+r['data'][i]['viewCount']+'</span>\n' +
                                '                    <span class="txt">来自：<strong>'+r['data'][i]['platName']+'</strong></span>\n' +
                                '                </div>\n' +
                                '                <span class="pl"><i>'+r['data'][i]['commentNum']+'</i>评论</span>\n' +
                                '            </li>';
                        }
                    }
                    else {
                        innerHtml += '<li class="'+className+'">\n' +
                            '                <h4><span><a target="_blank" style="text-decoration:none" href="list-hudong-detail.html?noteId='+window.btoa(r['data'][i]['noteId'])+'">'+noteTypeName+r['data'][i]['title']+'</a></span> '+picHtml+'</h4>\n' +
                            '                <p>'+showContent+'</p>\n' +
                            '                <div>\n' +
                            '                    <span>楼主：'+r['data'][i]['userName']+'</span>\n' +
                            '                    <span>'+r['data'][i]['checkTime']+'</span>\n' +
                            '                    <span class="yuedu">'+r['data'][i]['viewCount']+'</span>\n' +
                            '                    <span class="txt">来自：<strong>'+r['data'][i]['platName']+'</strong></span>\n' +
                            '                </div>\n' +
                            '                <span class="pl"><i>'+r['data'][i]['commentNum']+'</i>评论</span>\n' +
                            '            </li>';
                    }
                }
                $('#page').show();
                $('.hulist').html(innerHtml);
                $('.picshow').hide();
                $app.pager('page', 'getNoteList', [sort], pageNum, r.total,nums);
            }
        }
    });
}

function createNote()
{
    if(!checkLogin()){
        systemTip('请先登录','https://www.poppro.cn/html/login.html');
        return ;
    }
    var data = {};
    data.title = $('#noteTitle').val().trim();
    data.content = $('#noteContent').html();
    data.plateId = $('.gailan .on').attr('num');
    if (!data.title || !data.content) {
        systemTip('发帖标题和内容不能为空');
        return ;
    }
	$.ajax({
		url:'/hudong/create-note',
		type:'post',
		data:data,
		async:false,
		dataType:'json',
		success:function(r){
            console.dir(r);
            if (r.code == 0) {
                systemTip(r.message,window.location.href);
            }
            else {
                systemTip(r.message);
            }
		}
	});
}

function getPlatform()
{
    $.ajax({
        url:'/hudong/get-platform-list',
        type:'get',
        data:{},
        async:false,
        dataType:'json',
        success:function(r){
            console.dir(r);
            var innerHtml = '';
            for (var i=0 in r.data) {
                
                innerHtml += '<li onclick="jumpUsePlat('+r['data'][i]['platformId']+')" num="'+r['data'][i]['platformId']+'"><span>'+r['data'][i]['noteNum']+'</span>'+r['data'][i]['title']+'</li>';
                // if (findInUrl('list-hudong-detail.html')) {
                //     innerHtml += '<li onclick="jumpUsePlat('+r['data'][i]['platformId']+')" num="'+r['data'][i]['platformId']+'"><span>'+r['data'][i]['noteNum']+'</span>'+r['data'][i]['title']+'</li>';
                // }
                // else {
                //     innerHtml += '<li num="'+r['data'][i]['platformId']+'"><span>'+r['data'][i]['noteNum']+'</span>'+r['data'][i]['title']+'</li>';
                // }
            }
            $('.gailan').html(innerHtml);
            var platformId = (queryString('platformId'))?queryString('platformId'):'';
            if (findInUrl('list-hudong.html')) {
                if (platformId) {
                    for (var i=0 in r.data) {
                        if (platformId == r['data'][i]['platformId']) {
                            $('#platName').text(r['data'][i]['title']);
                        }
                    }
                    if(!checkLogin()) {
                        $('.add-link,.submit-txt-box').show();
                        $('.submit-txt-box div,.submit-txt-box p,.submit-txt-box h3,.submit-txt-box input').hide();
                        $('.logintip').show();
                    }
                    else {
                        $('.add-link,.submit-txt-box').show();
                    }
                    $('.gailan li').each(function(){
                        if ($(this).attr('num') == platformId) {
                            $(this).addClass('on');
                            platNum = platformId;
                            getNoteList(1);
                        }
                    })
                }
            }
            $('.gailan li').css('cursor', 'pointer');
            // $('.gailan li').unbind('click');
            // $('.gailan li').click(function(){
            //     if(!checkLogin()) {
            //         $('.add-link,.submit-txt-box').show();
            //         $('.submit-txt-box div,.submit-txt-box p,.submit-txt-box h3,.submit-txt-box input').hide();
            //         $('.logintip').show();
            //     }
            //     else {
            //         $('.add-link,.submit-txt-box').show();
            //     }
            //     $('.gailan li').removeClass('on');
            //     $(this).addClass('on');
            //     platNum = $(this).attr('num');
            //     getNoteList(1);
            // })
        }
    });
}

function jumpUsePlat(platform)
{
    window.location.href = 'list-hudong.html?platformId='+platform;
}

function getHotNote()
{
    var platId = queryString('platformId')?queryString('platformId'):0;
    $.ajax({
        url:'/hudong/get-hot-note',
        type:'get',
        data:{platNum:platId},
        async:false,
        dataType:'json',
        success:function(r){
            var innerHtml = '';
            if (r.data.length <= 0) {
                // $('#likePage').hide();
                // $('#likePage').html('<br>');
                $('.hotlist').html('<li>暂无</li>');
            }
            else {
                for (var i=0; i<r.data.length; i++) {
                    innerHtml += '<li>\n' +
                        '                    <a target="_blank" style="text-decoration:none" href="list-hudong-detail.html?noteId='+window.btoa(r['data'][i]['noteId'])+'"><h4>'+r['data'][i]['title']+'</h4></a>\n' +
                        '                    <p><span>'+r['data'][i]['userName']+'</span><span class="pinlun">'+r['data'][i]['commentNum']+'</span><span class="yuedu">'+r['data'][i]['viewCount']+'</span></p>\n' +
                        '                    <strong class="ranking-'+(i+1)+'">'+(i+1)+'</strong>\n' +
                        '                </li>';
                }
                $('.hotlist').html(innerHtml);
            }
        }
    });
}

var likeOffset = 0;
var likeNums = 5;
function getLikeNote(pageNum)
{
    pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
    if (pageNum == 1) {
        likeOffset = 0;
    }
    else {
        likeOffset = (pageNum-1)*likeNums;
    }
    var data = {};
    data.offset = likeOffset;
    data.nums = likeNums;
    $.ajax({
        url:'/hudong/get-like-note',
        type:'get',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            var innerHtml = '';
            if (r.data.length <= 0) {
                // $('#likePage').hide();
                $('#likePage').html('<br>');
                $('.favlist:eq(0)').html('<li>暂无</li>');
            }
            else {
                for (var i=0; i<r.data.length; i++) {
                    innerHtml += '<li>\n' +
                        '                    <span style="cursor: pointer;" onclick="likeNote('+"'"+window.btoa(r['data'][i]['noteId'])+"'"+')" class="fav"></span><a target="_blank" style="text-decoration:none" href="list-hudong-detail.html?noteId='+window.btoa(r['data'][i]['noteId'])+'"><h4>'+r['data'][i]['title']+'</h4></a>\n' +
                        '                    <p><span>'+r['data'][i]['userName']+'</span><span class="pinlun">'+r['data'][i]['commentNum']+'</span><span class="yuedu">'+r['data'][i]['viewCount']+'</span></p>\n' +
                        '                </li>';
                }
                $('#likePage').show();
                $('.favlist:eq(0)').html(innerHtml);
                $app.pager('likePage', 'getLikeNote', '', pageNum, r.total,likeNums,'pagination-1', false);
            }
        }
    });
}

var myOffset = 0;
var myNums = 5;
function getMyNote(pageNum)
{
    pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
    if (pageNum == 1) {
        myOffset = 0;
    }
    else {
        myOffset = (pageNum-1)*myNums;
    }
    var data = {};
    data.offset = myOffset;
    data.nums = myNums;
    $.ajax({
        url:'/hudong/get-my-note',
        type:'get',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            var innerHtml = '';
            if (r.data.length <= 0) {
                // $('#myPageList').hide();
                $('#myPageList').html('<br>');
                $('.favlist:eq(1)').html('<li>暂无</li>');
            }
            else {
                for (var i=0; i<r.data.length; i++) {
                    innerHtml += '<li>\n' +
                        '                    <span class="fav delete-icon" style="cursor: pointer;" onclick="delNote('+"'"+window.btoa(r['data'][i]['noteId'])+"'"+')" ></span>\n' +
                        '                    <h4><a target="_blank" style="text-decoration:none;color: black;" href="list-hudong-detail.html?noteId='+window.btoa(r['data'][i]['noteId'])+'">'+r['data'][i]['title']+'</a></h4>\n' +
                        '                    <p><span>板块：'+r['data'][i]['platName']+'</span><span class="pinlun">'+r['data'][i]['commentNum']+'</span><span class="yuedu">'+r['data'][i]['viewCount']+'</span></p>\n' +
                        '                </li>';

                }
                $('#myPageList').show();
                $('.favlist:eq(1)').html(innerHtml);
                $app.pager('myPageList', 'getMyNote', '', pageNum, r.total,myNums,'pagination-1', false);
            }

        }
    });
}

function getNoteInfo()
{
    var noteId = queryString('noteId');
    $.ajax({
        url:'/hudong/get-note-info',
        type:'get',
        data:{noteId:noteId},
        async:false,
        dataType:'json',
        success:function(r){
            console.dir(r);
            if (r.code == 0) {
                var infoHtml = '<a target="_blank" href="user-main.html?id='+window.btoa(r['data']['info']['userId'])+'"><img style="width: 100px;height: 100px;" src="'+r['data']['info']['headUrl']+'"></a>\n';
                infoHtml += '<img class="landlord-icon" src="../images/landlord-type-icon.png">';
                if (r['data']['info']['badge'].length > 0) {
                    if (r['data']['info']['badge'] != '暂无') {
                        for (var i = 0; i < r['data']['info']['badge'].length; i++) {
                            if (r['data']['info']['badge'][i] != null) {
                                infoHtml += '<span><img src="'+r['data']['info']['badge'][i]+'"></span>';
                            }
                        }
                    }
                }
                $('#adminInfo').html(infoHtml);
                $('#noteTitle').html(r['data']['info']['title']);
                // $('#adminNick').html('<a style="text-decoration: none;color: #999" href="user-main.html?id='+window.btoa(r['data']['info']['userId'])+'">'+r['data']['info']['userName']+'</a> <span>Lv.'+r['data']['info']['level']+'</span>');
                // $('#adminNick').unbind('click');
                // $('#adminNick').click(function(){
                //     window.open('user-main.html?id='+window.btoa(r['data']['info']['userId']));
                // })

                var innerHtml = '<a style="text-decoration: none;color: #999" href="user-main.html?id='+window.btoa(r['data']['info']['userId'])+'">'+r['data']['info']['userName']+'</a>';
                innerHtml += '<img class="sex-icon" src="../images/user/sex-'+r['data']['info']['sex']+'.png" alt="">';
                innerHtml += ' <span>Lv.'+r['data']['info']['level']+'</span>';
                if (r['data']['info']['signLogo']) {
                    innerHtml += '<img class="personal-icon" src="'+r['data']['info']['signLogo']+'" alt="">';
                }
                $('#adminNick').html(innerHtml);

                $('#adminTime').text(r['data']['info']['time']);
                $('#adminContent').html(r['data']['info']['content']);
                $('#likeNum').text(r['data']['info']['likeCount']);
                $('#yuedu').text(r['data']['info']['viewCount']);
                $('#noteCommentNum').text(r['data']['info']['commentNum']);
                $('.fav').text(r['data']['info']['likeCount']);
                $('.num i').text(r['data']['info']['commentNum']);
                $('#commentNum').text(r['data']['info']['commentNum']+' 条评论');
                $('.gailan li').each(function(i){
                    var platId = $(this).attr('num');
                    if (platId == r['data']['info']['plateId']) {
                        $(this).addClass('on');
                        $('#platName').text(r['data']['info']['platName']);
                    }
                })
                if (r['data']['info']['isLike']) {
                    $('#likeNum').addClass('on');
                }
                else {
                    $('#likeNum').removeClass('on');
                }
                if (r['data']['info']['isReply'] == '0') {
                    $('.textarea-1').attr('contenteditable',false);
                    $('.textarea-1').html('本帖子不可回复');
                    // systemTip('公告贴，不能回复');
                    // return ;
                }
            }
            else {
                systemTip(r.message);
            }
        }
    });
}


var replyOffset = 0;
var replyNums = 15;
function getReplyList(pageNum)
{
    if (pageNum > 1) {
        $('.hasheaderbox').hide();
    }
    else {
        $('.hasheaderbox').show();
    }
    pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
    if (pageNum == 1) {
        replyOffset = 0;
    }
    else {
        replyOffset = (pageNum-1)*replyNums;
    }
    var data = {};
    data.noteId = queryString('noteId');
    data.offset = replyOffset;
    data.nums = replyNums;
    $.ajax({
        url:'/hudong/get-reply-list',
        type:'get',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            if (r.code == 0) {
                console.dir(r);
                if (r.data.length > 0) {
                    var innerHtml = '';
                    var showName = '';
                    var insideNum = 0;
                    var signHtml = '';
                    var likeReplyClass = '';
                    for (var i=0; i<r.data.length; i++) {
                        likeReplyClass = (r['data'][i]['isLikeReply'])?'active':'';
                        innerHtml += '<div class="pinlunlistlist-box">\n' +
                            '                    <div class="userinfo">\n' +
                            '                        <a target="_blank" href="user-main.html?id='+window.btoa(r['data'][i]['userInfo']['id'])+'"><img src="'+r['data'][i]['userInfo']['head']+'"></a>\n';
                        if (r['data'][i]['isAdmin']) {
                            innerHtml += '<img class="landlord-icon" src="../images/landlord-type-icon.png">';
                        }
                        if (r['data'][i]['userInfo']['badge'].length > 0) {
                            if (r['data'][i]['userInfo']['badge'] != '暂无') {
                                for (var j = 0; j < r['data'][i]['userInfo']['badge'].length; j++) {
                                    if (r['data'][i]['userInfo']['badge'][j] != null) {
                                        innerHtml += '<span><img src="'+r['data'][i]['userInfo']['badge'][j]+'"></span>';
                                    }
                                }
                            }
                        }

                        if (r['data'][i]['userInfo']['signLogo']) {
                            signHtml = '<img class="personal-icon" src="'+r['data'][i]['userInfo']['signLogo']+'" alt="">';
                        }
                        else {
                            signHtml = '';
                        }

                        innerHtml += '           </div>\n' +
                            '                    <div class="list-con"><h4 class="title"><a style="cursor: pointer" onclick="jumpToUser('+r['data'][i]['userInfo']['id']+')">'+r['data'][i]['userInfo']['username']+'</a> <img class="sex-icon" src="../images/user/sex-'+r['data'][i]['userInfo']['sex']+'.png" alt=""><span>Lv.'+r['data'][i]['userInfo']['level']+'</span>'+signHtml+'</h4>\n'+
                            '                    <p class="txt">'+r['data'][i]['content']+'</p>\n' +
                            '                    <div class="time"><span>#'+r['data'][i]['sortNum']+'</span><span>'+r['data'][i]['time']+'</span><span class="pinlun" style="cursor: pointer" onclick="showFirstReply($(this),'+r['data'][i]['replyId']+')">'+r['data'][i]['insideReplyNum']+'</span><span style="cursor: pointer" onclick="likeReply('+r['data'][i]['replyId']+',$(this))" class="reply-like '+likeReplyClass+'">'+r['data'][i]['replyLikeNum']+'</span><span></span>';
                        if (r['data'][i]['isShowDel']) {
                            innerHtml += '<span class="delete-msg" style="cursor: pointer" onclick="delReply('+r['data'][i]['replyId']+')"> 删除</span>';
                        }
                        if (r['data'][i]['isAdmin']) {
                            innerHtml += '<span class="matser-text"> 楼主</span>';
                        }
                        innerHtml +='</div></div><ul id="ulReply'+r['data'][i]['replyId']+'">\n';
                        // if (count(r['data'][i]['list']) > 0) {
                        //     for (var j=0; j<count(r['data'][i]['list']); j++) {
                        //         showName = (r['data'][i]['list'][j]['replyToUserName'])?r['data'][i]['list'][j]['userName']+' @ '+r['data'][i]['list'][j]['replyToUserName']:r['data'][i]['list'][j]['userName'];
                        //         innerHtml +=
                        //             '                        <li><span class="name">'+showName+':</span> '+r['data'][i]['list'][j]['content']+'\n' +
                        //             '                            <p class="time" style="cursor: pointer" onclick="showReply($(this))">'+r['data'][i]['list'][j]['time']+'<span class="pinlun">回复</span></p>\n' +
                        //             '                            <span class="headerimg"><img src="'+r['data'][i]['list'][j]['userHead']+'"></span>\n' +
                        //             '                            <div class="logintip" style="display: none">您尚未登录，请先行【<a href="javascript:;">注册/登录</a>】</div>\n' +
                        //             '                            <div class="sub-pinlun-submint" style="display: none">\n' +
                        //             '                                <span class="subheaderimg"><img src="'+r['data'][i]['list'][j]['userHead']+'"></span>\n' +
                        //             '                                <div class="sub-pinlun-submint-box">\n' +
                        //             '                                    <div class="headerbox"><a href="javascript:;" class="face">表情</a></div>\n' +
                        //             '                                    <!--<textarea>请填写帖子内容</textarea>-->\n' +
                        //             '                                    <p contentEditable="true" style="overflow:scroll;" class="textarea-1" placeholder="请填写回复内容"></p>\n' +
                        //             '                                </div>\n' +
                        //             '                                <div class="btnbox">\n' +
                        //             '                                    <a href="javascript:;" onclick="insideSecReply($(this))">发表</a>\n' +
                        //             '                                </div>\n' +
                        //             '                            </div>\n' +
                        //             '                        </li>\n';
                        //     }
                        // }
                        innerHtml +='</ul>';
                        if (r['data'][i]['insideReplyNum'] > 0) {
                            innerHtml += '<div class="pagination-3" id="insideReply_'+r['data'][i]['replyId']+'">\n' +
                            '             </div><br>\n';
                        }
                        innerHtml +=
                            '                    <div class="logintip" style="display: none">您尚未登录，请先行【<a href="login.html">注册/登录</a>】</div>\n' +
                            '                    <div class="sub-pinlun-submint" style="display: none">\n' +
                            '                        <span class="subheaderimg"><img src="'+r['data'][i]['userInfo']['head']+'"></span>\n' +
                            '                        <div class="sub-pinlun-submint-box">\n' +
                            '                            <div class="headerbox"><a href="javascript:;" id="'+r['data'][i]['replyId']+'" class="face">表情</a>' +
                            '                               <div class="bqbox">' +
                            '                                   <div class="bqbox-inner">' +
                            '                                       <div class="bqbox-inner-con">' +
                            '                                           <ul>' +
                            '                                           </ul>' +
                            '                                       </div>' +
                            '                                   </div>' +
                            '                                   <a class="close" href="javascript:;">X</a>' +
                            '                                   <div class="bqbox-tab">' +
                            '                                       <div class="bqbox-tab-inner">' +
                            '                                           <ul class="bqbox-tab-con">' +
                            '                                           </ul>' +
                            '                                       </div>' +
                            '                                   </div>' +
                            '                               </div>' +
                            '                            </div>\n' +
                            '                            <p contentEditable="true" id="insideText_'+r['data'][i]['replyId']+'" style="overflow:scroll;height: 60px;" class="textarea-1" placeholder="请填写回复内容"></p>\n' +
                            '                        </div>\n' +
                            '                        <div class="btnbox">\n' +
                            '                            <a href="javascript:;" onclick="insideReply($(this), '+r['data'][i]['replyId']+')">发表</a>\n' +
                            '                        </div>\n' +
                            '                    </div>\n' +
                            '                    </div>';
                    }
                    $('.pinlunlistlist').html(innerHtml);
                    $(".face").unbind('click');
                    $(".face").click(
                        function () {
                            var isShow = $(this).parent().parent().find(".bqbox").css('display');
                            if (isShow == 'none') {
                                $('.bqbox').hide();
                                $(this).parent().parent().find(".bqbox").show();
                            }
                            else {
                                $(this).parent().parent().find(".bqbox").hide();
                            }

                            var id = ($(this).attr('id'))?$(this).attr('id'):'';
                            var innerHtml = '';
                            var addClass = '';
                            for (var i=0; i<emojiTypeData.length; i++) {
                                addClass = (i == 0) ? 'active':'';
                                innerHtml += '<li class="bqbox-tab-item '+addClass+'" onclick="showEmojiList('+emojiTypeData[i]['id']+','+id+')">\n' +
                                    '                                            <img width="20" height="20" src="'+emojiTypeData[i]['typeImgUrl']+'">\n' +
                                    '                                        </li>';
                            }
                            $('.bqbox-tab-con').html(innerHtml);
                            showEmojiList(emojiTypeData[0]['id'],id);
                            $('.bqbox-tab-con li').click(function(){
                                $('.bqbox-tab-con li').removeClass('active');
                                $(this).addClass('active');
                            })
                        }
                    );
                    $('.bqbox a.close').click(function () {
                        $(this).parent().hide();
                    });
                    for (var i=0; i<r.data.length; i++) {
                        if (count(r['data'][i]['list']) > 0) {
                            getInsideReplyList(r['data'][i]['replyId'], 1);
                        }
                    }
                    if (r.isReply == '0') {
                        $('.textarea-1').attr('contenteditable',false);
                        $('.textarea-1').html('本帖子不可回复');
                    }
                    $('#page').show();
                    $app.pager('page', 'getReplyList', '', pageNum, r.total,replyNums);
                    $appJump.pager('topPage', 'getReplyList', '', pageNum, r.total,replyNums,'pagination-2',true,true,r.commentNum);
                }
            }
            else {
                $('.pinlunlistlist').html('');
                $('#page').hide();
            }
        }
    });
}

var insideOffset = 0;
var insideNums = 5;
function getInsideReplyList(parentReplyId, pageNum)
{
    pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
    if (pageNum == 1) {
        insideOffset = 0;
    }
    else {
        insideOffset = (pageNum-1)*insideNums;
    }
    var data = {};
    data.parentReplyId = parentReplyId;
    data.offset = insideOffset;
    data.nums = insideNums;
    $.ajax({
        url:'/hudong/get-inside-reply-list',
        type:'get',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            console.dir(r);
            if (r.code == 0) {
                if (r.data.list.length > 0) {
                    var innerHtml = '';
                    var showName = '';
                    var showAdminTag = '';
                    var likeReplyClass = '';
                    for (var i=0; i<count(r.data.list); i++) {
                        likeReplyClass = (r['data']['list'][i]['isLikeReply'])?'active':'';
                        showName = (r['data']['list'][i]['replyToUserName'])?r['data']['list'][i]['userName']+' @ '+r['data']['list'][i]['replyToUserName']:r['data']['list'][i]['userName'];
                        innerHtml +=
                            '                        <li><span class="name">'+showName+':</span> '+r['data']['list'][i]['content']+'<br>\n' +
                            '                            <span class="time" style="cursor: pointer">'+r['data']['list'][i]['time']+'<span class="pinlun" onclick="showReply($(this),'+r['data']['list'][i]['replyId']+')">回复</span><span style="cursor: pointer" onclick="likeReply('+r['data']['list'][i]['replyId']+',$(this))"  class="reply-like '+likeReplyClass+'">'+r['data']['list'][i]['replyLikeNum']+'</span>';
                        if (r['data']['list'][i]['isShowDel']) {
                            innerHtml += '<span class="delete-msg" style="cursor: pointer" onclick="delReply('+r['data']['list'][i]['replyId']+')"> 删除</span>';
                        }
                        if (r['data']['list'][i]['isAdmin']) {
                            innerHtml += '<span class="matser-text"> 楼主</span>';
                            showAdminTag = '<img class="landlord-icon" src="../images/landlord-type-icon.png"></span>';
                        }
                        innerHtml += '\n</p>\n' +
                            '                            <span class="headerimg"><a target="_blank" href="user-main.html?id='+window.btoa(r['data']['list'][i]['userId'])+'"><img src="'+r['data']['list'][i]['userHead']+'"></a>';
                        if (r['data']['list'][i]['isAdmin']) {
                            innerHtml += '<img class="landlord-icon" src="../images/landlord-type-icon.png"></span>';
                        }
                        else {
                            innerHtml += '</span>';
                        }
                        innerHtml +=   '                            <div class="logintip" style="display: none">您尚未登录，请先行【<a href="login.html">注册/登录</a>】</div>\n' +
                            '                            <div class="sub-pinlun-submint" style="display: none">\n' +
                            '                                <span class="subheaderimg"><img src="'+r['data']['list'][i]['userHead']+'"></span>\n' +
                            '                                <div class="sub-pinlun-submint-box">\n' +
                            '                                    <div class="headerbox"><a href="javascript:;" id="'+r['data']['list'][i]['replyId']+'" class="face">表情</a>' +
                            '                                    <div class="bqbox">' +
                            '                                       <div class="bqbox-inner">' +
                            '                                           <div class="bqbox-inner-con">' +
                            '                                               <ul>' +
                            '                                               </ul>' +
                            '                                           </div>' +
                            '                                       </div>' +
                            '                                       <a class="close" href="javascript:;">X</a>' +
                            '                                       <div class="bqbox-tab">' +
                            '                                           <div class="bqbox-tab-inner">' +
                            '                                               <ul class="bqbox-tab-con">' +
                            '                                               </ul>' +
                            '                                           </div>' +
                            '                                       </div>' +
                            '                                    </div>' +
                            '                                    </div>\n' +
                            '                                    <!--<textarea>请填写帖子内容</textarea>-->\n' +
                            '                                    <p contentEditable="true" id="insideText_'+r['data']['list'][i]['replyId']+'" style="overflow:scroll;height: 60px;" class="textarea-1" placeholder="请填写回复内容"></p>\n' +
                            '                                </div>\n' +
                            '                                <div class="btnbox">\n' +
                            '                                    <a href="javascript:;" onclick="insideSecReply($(this),'+parentReplyId+','+r['data']['list'][i]['userId']+','+r['data']['list'][i]['replyId']+')">发表</a>\n' +
                            '                                </div>\n' +
                            '                            </div>\n' +
                            '                        </li>\n';
                    }
                    $('#ulReply'+parentReplyId).html(innerHtml);
                    $(".face").unbind('click');
                    $(".face").click(
                        function () {
                            var isShow = $(this).parent().parent().find(".bqbox").css('display');
                            if (isShow == 'none') {
                                $('.bqbox').hide();
                                $(this).parent().parent().find(".bqbox").show();
                            }
                            else {
                                $(this).parent().parent().find(".bqbox").hide();
                            }

                            var id = ($(this).attr('id'))?$(this).attr('id'):'';
                            var innerHtml = '';
                            var addClass = '';
                            for (var i=0; i<emojiTypeData.length; i++) {
                                addClass = (i == 0) ? 'active':'';
                                innerHtml += '<li class="bqbox-tab-item '+addClass+'" onclick="showEmojiList('+emojiTypeData[i]['id']+','+id+')">\n' +
                                    '                                            <img width="20" height="20" src="'+emojiTypeData[i]['typeImgUrl']+'">\n' +
                                    '                                        </li>';
                            }
                            $('.bqbox-tab-con').html(innerHtml);
                            showEmojiList(emojiTypeData[0]['id'],id);
                            $('.bqbox-tab-con li').click(function(){
                                $('.bqbox-tab-con li').removeClass('active');
                                $(this).addClass('active');
                            })
                        }
                    );
                    if (r['data']['isReply'] == '0') {
                        $('.textarea-1').attr('contenteditable',false);
                        $('.textarea-1').html('本帖子不可回复');
                        $('.btnbox').html('');
                    }
                    $('.bqbox a.close').click(function () {
                        $(this).parent().hide();
                    });
                    $app.pager('insideReply_'+parentReplyId, 'getInsideReplyList', [parentReplyId], pageNum, r.data.total,insideNums,'pagination-3',false);
                }
            }
            else {
                systemTip(r.message);
            }
        }
    });
}

function getEmojiList(callback)
{
    $.get('/hudong/get-emoji-list',{},function(r){
        return callback(r);
    },'json')
}

function addEmoji(id,imgUrl)
{
    var addHtml = '<img width="50" height="50" src="'+imgUrl+'">';
    document.getElementById('insideText_'+id).focus();
    insertHtmlAtCaret(addHtml);
}

function addFirstEmoji(imgUrl)
{
    var addHtml = '<img width="50" height="50" src="'+imgUrl+'">';
    if (findInUrl('list-hudong.html')) {
        document.getElementById('noteContent').focus();
        insertHtmlAtCaret(addHtml);
    }
    else {
        document.getElementById('replyContent').focus();
        insertHtmlAtCaret(addHtml);
    }
}

function checkIsHavePic(content)
{
    var str = content;
    //匹配图片（g表示匹配所有结果i表示区分大小写）
    var imgReg = /<img.*?(?:>|\/>)/gi;
    //匹配src属性
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = str.match(imgReg);
    if (!arr) return false;
    for (var i = 0; i < arr.length; i++) {
        var src = arr[i].match(srcReg);
        //获取图片地址
        if(src[1]){
            if (src[1].indexOf("uploads/emoji/") == -1) {
                return true;
                break;
            }
        }
    }
    return false;
}

function getPicShowUrl(content)
{
    var str = content;
    //匹配图片（g表示匹配所有结果i表示区分大小写）
    var imgReg = /<img.*?(?:>|\/>)/gi;
    //匹配src属性
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var arr = str.match(imgReg);
    // alert('所有已成功匹配图片的数组：'+arr);
    var picArr = new Array();
    for (var i = 0; i < arr.length; i++) {
        var src = arr[i].match(srcReg);
        //获取图片地址
        if(src[1]){
            if (src[1].indexOf("uploads/emoji/") == -1) {
                picArr.push(src[1]);
            }
            // alert('已匹配的图片地址'+(i+1)+'：'+src[1]);
        }
        //当然你也可以替换src属性
        // if (src[0]) {
        //     var t = src[0].replace(/src/i, "href");
        //     //alert(t);
        // }
    }
    return picArr[0];
}

function getShowHtml(content)
{
    var str = content;
    // //匹配图片（g表示匹配所有结果i表示区分大小写）
    // var imgReg = /<img.*?(?:>|\/>)/gi;
    str = str.replace(new RegExp(/<img.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<p.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<\/p.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<h1.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<\/h1.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<h2.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<\/h2.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<h3.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<\/h3.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<h4.*?(?:>|\/>)/,'gi'),'');
    str = str.replace(new RegExp(/<\/h5.*?(?:>|\/>)/,'gi'),'');
    return str;
}

function insideReply(e, replyId)
{
    if(!checkLogin()){
        systemTip('请先登录','https://www.poppro.cn/html/login.html');
        return ;
    }
    var data = {};
    data.noteId = queryString('noteId');
    data.parentReplyId = replyId;
    data.content = e.parent().parent().children('.sub-pinlun-submint-box').children('p').html();
    if (!data.content) {
        systemTip('回复内容不能为空');
        return ;
    }
    $.ajax({
        url:'/hudong/inside-reply',
        type:'post',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            console.dir(r);
            if (r.code == 0) {
                showMsgTip(r.message, window.location.href);
                // layer.msg(r.message);
                // systemTip(r.message);
                // window.location.reload();
            }
            else {
                systemTip(r.message);
            }
        }
    });
}

function insideSecReply(e, replyId, replyUserId, insideReplyId)
{
    if(!checkLogin()){
        systemTip('请先登录','https://www.poppro.cn/html/login.html');
        return ;
    }
    var data = {};
    data.noteId = queryString('noteId');
    data.parentReplyId = replyId;
    data.parentReplyUserId = replyUserId;
    data.insideReplyId = insideReplyId;
    data.content = e.parent().parent().children('.sub-pinlun-submint-box').children('p').html();
    if (!data.content) {
        systemTip('发帖标题和内容不能为空');
        return ;
    }
    $.ajax({
        url:'/hudong/inside-sec-reply',
        type:'post',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            console.dir(r);
            if (r.code == 0) {
                showMsgTip(r.message, window.location.href);
                // systemTip(r.message);
                // layer.msg(r.message);
                // window.location.reload();
            }
            else {
                systemTip(r.message);
            }
        }
    });
}

function reply()
{
    if(!checkLogin()){
        systemTip('请先登录','https://www.poppro.cn/html/login.html');
        return ;
    }
    var data = {};
    data.noteId = queryString('noteId');
    data.content = $('#replyContent').html();
    data.plateId = $('.gailan .on').attr('num');
    if (!data.content) {
        systemTip('回复内容不能为空');
        return ;
    }
    $.ajax({
        url:'/hudong/reply',
        type:'post',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            console.dir(r);
            if (r.code == 0) {
                // layer.msg(r.message);
                // systemTip(r.message);
                showMsgTip(r.message, window.location.href);
                // window.location.reload();
            }
            else {
                systemTip(r.message);
            }
        }
    });
}

function likeNote(noteId)
{
    if(!checkLogin()){
        systemTip('请先登录','https://www.poppro.cn/html/login.html');
        return ;
    }
    var data = {};
    data.noteId = noteId;
    $.ajax({
        url:'/hudong/like-note',
        type:'post',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            console.dir(r);
            if (r.code == 0) {
                // systemTip(r.message);
                layer.msg(r.message);
                // window.location.reload();
                if (r.message == '收藏成功') {
                    $('#likeNum').addClass('on')
                }
                else {
                    $('#likeNum').removeClass('on')
                }
                $('#likeNum').text(r['data']['likeNum']);
            }
            else {
                systemTip(r.message);
            }
        }
    });
}

function showFirstReply(e,id)
{
    var isShow = e.parent().parent().parent().children('.sub-pinlun-submint').css('display');
    if (isShow == 'none') {
        if(!checkLogin()){
            e.parent().parent().parent().children('.logintip').show();
            e.parent().parent().next('.pagination-3').show();
        }
        else {
            $('.sub-pinlun-submint').hide();
            $('.bqbox').hide();
            e.parent().parent().parent().children('.sub-pinlun-submint').show();

            var innerHtml = '';
            var addClass = '';
            for (var i=0; i<emojiTypeData.length; i++) {
                addClass = (i == 0) ? 'active':'';
                innerHtml += '<li class="bqbox-tab-item '+addClass+'" onclick="showEmojiList('+emojiTypeData[i]['id']+','+id+')">\n' +
                    '                                            <img width="20" height="20" src="'+emojiTypeData[i]['typeImgUrl']+'">\n' +
                    '                                        </li>';
            }
            // $('#insideText_'+id).prev().children('.bqbox').children('.bqbox-tab-con').html(innerHtml);
            $('.bqbox-tab-con').html(innerHtml);
            showEmojiList(emojiTypeData[0]['id'], id);
            $('.bqbox-tab-con li').click(function(){
                $('.bqbox-tab-con li').removeClass('active');
                $(this).addClass('active');
            })

            // $('#insideText_'+id).prev().children('.bqbox').children('ul').html(innerHtml);
            e.parent().parent().next('.pagination-3').show();
        }
    }
    else {
        if(!checkLogin()){
            e.parent().parent().parent().children('.logintip').hide();
            e.parent().parent().next('.pagination-3').hide();
        }
        else {
            e.parent().parent().parent().children('.sub-pinlun-submint').hide();
            e.parent().parent().next('.pagination-3').hide();
        }
    }

}

function showReply(e,id)
{
    var isShow = e.parent().children('.sub-pinlun-submint').css('display');
    if (isShow == 'none') {
        if(!checkLogin()){
            e.parent().children('.logintip').show();
        }
        else {
            $('.sub-pinlun-submint').hide();
            $('.bqbox').hide();
            e.parent().children('.sub-pinlun-submint').show();

            var innerHtml = '';
            var addClass = '';
            for (var i=0; i<emojiTypeData.length; i++) {
                addClass = (i == 0) ? 'active':'';
                innerHtml += '<li class="bqbox-tab-item '+addClass+'" onclick="showEmojiList('+emojiTypeData[i]['id']+','+id+')">\n' +
                    '                                            <img width="20" height="20" src="'+emojiTypeData[i]['typeImgUrl']+'">\n' +
                    '                                        </li>';
            }
            $('#insideText_'+id).prev().children('.bqbox').children('ul').html(innerHtml);
            $('.bqbox-tab-con').html(innerHtml);
            showEmojiList(emojiTypeData[0]['id'], id);
            $('.bqbox-tab-con li').click(function(){
                $('.bqbox-tab-con li').removeClass('active');
                $(this).addClass('active');
            })
        }
    }
    else {
        if(!checkLogin()){
            e.parent().children('.logintip').hide();
        }
        else {
            e.parent().children('.sub-pinlun-submint').hide();
        }
    }
}

function count(o){
    var t = typeof o;
    if(t == 'string'){
        return o.length;
    }else if(t == 'object'){
        var n = 0;
        for(var i in o){
            n++;
        }
        return n;
    }
    return false;
}

function insertHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

function viewNote()
{
    var data = {};
    data.noteId = queryString('noteId');
    $.post('/hudong/view-note',data,function(r){
        if (r.code == 0) {
            // $('#yuedu').text(r['data']['viewNum']);
        }
    },'json')
}

function delReply(replyId)
{
    var result = confirm('确认删除该条回复？');
    if(result){
        var data = {};
        data.replyId = replyId;
        $.post('/hudong/del-reply',data,function(r){
            if (r.code == 0) {
                layer.msg(r.message);
                window.location.reload();
            }
            else {
                layer.msg(r.message);
            }
        },'json')
    }
}

function delNote(noteId)
{
    var result = confirm('确认删除该帖？');
    if(result){
        var data = {};
        data.noteId = noteId;
        $.post('/hudong/del-note',data,function(r){
            if (r.code == 0) {
                layer.msg(r.message);
                window.location.reload();
            }
            else {
                layer.msg(r.message);
            }
        },'json')
    }
}

function likeReply(replyId, e)
{
    if(!checkLogin()){
        systemTip('请先登录','https://www.poppro.cn/html/login.html');
        return ;
    }
    var data = {};
    data.replyId = replyId;
    $.ajax({
        url:'/hudong/like-reply',
        type:'post',
        data:data,
        async:false,
        dataType:'json',
        success:function(r){
            console.dir(r);
            if (r.code == 0) {
                // systemTip(r.message);
                layer.msg(r.message);
                // window.location.reload();
                if (r.message == '收藏成功') {
                    e.addClass('active')
                }
                else {
                    e.removeClass('active')
                }
                e.text(r['data']['likeNum']);
            }
            else {
                systemTip(r.message);
            }
        }
    });
}

function getEmojiTypeList()
{
    $.get('/hudong/get-emoji-type-list',{},function(r){
        if (r.data.length > 0) {
            emojiTypeData = r.data;
            var innerHtml = '';
            var addClass = '';
            for (var i=0; i<r.data.length; i++) {
                addClass = (i == 0) ? 'active':'';
                innerHtml += '<li class="bqbox-tab-item '+addClass+'" onclick="showEmojiList('+r['data'][i]['id']+')">\n' +
                    '                                            <img width="20" height="20" src="'+r['data'][i]['typeImgUrl']+'">\n' +
                    '                                        </li>';
            }
            $('.bqbox-tab-con').html(innerHtml);
            showEmojiList(r['data'][0]['id']);
            $('.bqbox-tab-con li').click(function(){
                $('.bqbox-tab-con li').removeClass('active');
                $(this).addClass('active');
            })
        }
        else {
            $('.bqbox-tab-con').html('暂无');
        }
    },'json')
}

function showEmojiList(typeId,id='')
{
    $.get('/hudong/get-emoji-list',{typeId:typeId},function(r){
        if (r.data.length > 0) {
            emojiData = r.data;
            var innerHtml = '';
            for (var i=0; i<r.data.length; i++) {
                if (id) {
                    innerHtml += '<li><a href="javascript:;" onclick="addEmoji('+id+','+"'"+r['data'][i]['imgUrl']+"'"+')"><img width="50" height="50" src="'+r['data'][i]['imgUrl']+'"> </a></li>';
                }
                else {
                    innerHtml += '<li><a href="javascript:;" onclick="addFirstEmoji('+"'"+r['data'][i]['imgUrl']+"'"+')"><img width="50" height="50" src="'+r['data'][i]['imgUrl']+'"> </a></li>';
                }
            }
            $('.bqbox-inner-con ul').html(innerHtml);
        }
        else {
            $('.bqbox-inner-con ul').html('');
        }
    },'json')
}

function jumpToUser(userId)
{
    window.open('user-main.html?id='+window.btoa(userId));
}