var act_id=queryString('id');
var typeJson = [];//活动下面类别列表
var needVoteStatus = 1; //是否需要投票
var voteButtonStatus = 'none';//投票按钮状态
var actStatus = 1;//活动状态

$(function(){


    // 我的信息展示
    if(checkLogin()){
        $.ajax({
            url: "/user/userinfo",
            type: "POST",
            dataType : 'json',
            data: {},
            async:false,
            success: function (r){
                $(".collection-info-r").show();
                $("#user_head").attr("src",r.head);
                var username=r.username+'<img src="../images/user/sex-'+r.sex+'.png" >';
                $("#user_name").html(username);
            }
        });
    }
    else{
        $(".collection-info-r").hide();
    }





    // 详情展示
    $.ajax({
        url: "/work/autoactivity",
        type: "POST",
        dataType : 'json',
        data: {id:act_id},
        async:false,
        success: function (r) {
            $(".activity-txt-info-txt").eq(0).html(r[0]['title1']);
            $(".banner-pic").html('<img src="' + r[0]['picUrl'] + '"  style="width:1280px;height:284px">');
            $(".activity-txt-info h3").text(r[0]['title']);
            $(".time").text(r[0]['dateBegin'] + " ~ " + r[0]['dateEnd']);
            typeJson = r[0]['typeJson'];

            needVoteStatus = r[0]['needVote'] == 1 ? '' : 'none';
            actStatus = r[0]['status'];
            voteButtonStatus = (needVoteStatus == '' && actStatus == 2) ? '' : 'none';
            var subHtml = ''
            var leftBarHtml = '';
            //根据typeJson拉数据和结果
            for(var i in typeJson){
                //取数据
                leftBarHtml += '<div><a class="scrollA" href="#type'+typeJson[i].id+'">'+typeJson[i].title+'</a></div>';
                subHtml += '<li><a href="javascript:tosubmit('+typeJson[i].type+','+typeJson[i].id+');">'+typeJson[i].title+'</a></li>';
            }
            $('#subtip ul').html(subHtml);
            $('.leftbar').append(leftBarHtml);
            /*
            * 滑动效果
            */
            $('.scrollA').click(function(){
                var position = $($(this).attr('href')).offset();
                $("html, body").animate({scrollTop: position.top}, 1000);
                return false;
            });
            console.log(leftBarHtml);
            //投稿征集中
            if(r[0]['status'] ==1){
            }else{
                $('#btn-1').hide();
            }
        }
    });

    /*
     * 第一遍 拼结构
     */
    var listHtml = '';
    for(var i in typeJson){
        switch (typeJson[i]['type']){
            //音乐
            case '1':
                if(needVoteStatus == ''){
                    var paixuHtml =  '<div class="paixu" style="margin-bottom:10px;margin-top:50px;" id="paixu'+typeJson[i]['id']+'" >' + ' <a  class="on on-1"  href="javascript:musicPage('+typeJson[i]['id']+',2,1);">投稿时间</a>｜ <a href="javascript:musicPage('+typeJson[i]['id']+',2,1);">投稿票数</a></div>';
                }else{
                    var paixuHtml =  '<div class="paixu" style="margin-bottom:10px;margin-top:50px;" id="paixu'+typeJson[i]['id']+'" >' + ' <a  class="on on-1"  href="javascript:musicPage('+typeJson[i]['id']+',2,1);">投稿时间</a></div>';
                }

                if(actStatus == 1){
                    listHtml += '<div class="music-list-box" style="min-height: 300px;" id="type'+typeJson[i]['id']+'">\n' +
                        '        <h4>'+typeJson[i]['title']+'</h4>\n' +
                        paixuHtml +
                        '        <div class="music-list" id="list-normal'+typeJson[i]['id']+'">' +
                        '        </div>\n' +
                        '    </div>';
                }else{
                    listHtml += '<div class="music-list-box" style="min-height: 300px;"  id="type'+typeJson[i]['id']+'">\n' +
                        '        <h4>'+typeJson[i]['title']+'</h4>\n' +
                        '        <div class="music-list" id="list-award'+typeJson[i]['id']+'">\n' +
                        '        </div>\n' +
                        paixuHtml +
                        '        <div class="music-list" id="list-normal'+typeJson[i]['id']+'">' +
                        '        </div>\n' +
                        '    </div>';
                }



                break;
            //文字
            case '2':
                if(needVoteStatus == ''){
                    var paixuHtml =  '<div class="paixu" style="margin-bottom:10px;margin-top:50px;" id="paixu'+typeJson[i]['id']+'" >' + ' <a  class="on on-1"  href="javascript:wordPage('+typeJson[i]['id']+',2,1);">投稿时间</a>｜ <a href="javascript:wordPage('+typeJson[i]['id']+',2,1);">投稿票数</a></div>';
                }else{
                    var paixuHtml =  '<div class="paixu" style="margin-bottom:10px;margin-top:50px;" id="paixu'+typeJson[i]['id']+'" >' + ' <a  class="on on-1"  href="javascript:wordPage('+typeJson[i]['id']+',2,1);">投稿时间</a></div>';
                }


                if(actStatus == 1){
                    listHtml += '<div class="article-list-box" style="min-height: 300px;"  id="type'+typeJson[i]['id']+'">\n' +
                        '        <h4>'+typeJson[i]['title']+'</h4>\n' +
                        paixuHtml +
                        '        <div class="article-list" id="list-normal'+typeJson[i]['id']+'"  >\n' +
                        '            <ul class="article-line">\n' +
                        '        </div>\n' +
                        '    </div>';
                }else{
                    listHtml += '<div class="article-list-box" style="min-height: 300px;"  id="type'+typeJson[i]['id']+'">\n' +
                        '        <h4>'+typeJson[i]['title']+'</h4>\n' +
                        '        <div class="article-list" id="list-award'+typeJson[i]['id']+'">\n' +
                        '        </div>\n' +
                        paixuHtml +
                        '        <div class="article-list" id="list-normal'+typeJson[i]['id']+'"  >\n' +
                        '            <ul class="article-line">\n' +
                        '        </div>\n' +
                        '    </div>';
                }

                break;
            //图片
            case '3':

                if(needVoteStatus == ''){
                    var paixuHtml =  '<div class="paixu" style="margin-bottom:10px;margin-top:50px;" id="paixu'+typeJson[i]['id']+'" >' + ' <a  class="on on-1"  href="javascript:picPage('+typeJson[i]['id']+',2,1);">投稿时间</a>｜ <a href="javascript:picPage('+typeJson[i]['id']+',2,1);">投稿票数</a></div>';
                }else{
                    var paixuHtml =  '<div class="paixu" style="margin-bottom:10px;margin-top:50px;" id="paixu'+typeJson[i]['id']+'" >' + ' <a  class="on on-1"  href="javascript:picPage('+typeJson[i]['id']+',2,1);">投稿时间</a></div>';
                }


                if(actStatus == 1){
                    listHtml += '<div class="paint-list" id="type'+typeJson[i]['id']+'"  ><div style="min-height: 300px;" class="paint-list listAward" id="list-award'+typeJson[i]['id']+'">\n' +

                        '        <h4>'+typeJson[i]['title']+'</h4>\n' +
                        paixuHtml +
                        '    <div class="paint-list" id="list-normal'+typeJson[i]['id']+'">\n' +
                        '        <ul></ul>\n' +
                        '    </div></div></div>';
                }else{
                    listHtml += '<div id="type'+typeJson[i]['id']+'" style="min-height: 300px;"   ><div   class="paint-list listAward" id="list-award'+typeJson[i]['id']+'">\n' +

                        '        <h4>'+typeJson[i]['title']+'</h4>\n' +
                        '        <ul></ul>\n' +
                        '    </div>\n' +
                        paixuHtml +
                        '    <div class="paint-list" id="list-normal'+typeJson[i]['id']+'">\n' +
                        '        <ul></ul>\n' +
                        '    </div></div>';
                }


                break;
        }
        listHtml += '<div class="line" style="height: 1px; background:#d9d9d9; overflow: hidden;margin: 24px 60px"></div>';
    }

    $('.activity-body').append(listHtml);



    //根据typeJson 生成作品列表的html
    for(var i in typeJson){
        switch (typeJson[i]['type']){
            //音乐
            case '1':
                if(actStatus == 2){
                    //先拼接获奖作品
                    var goodWorkList = getworklist(1,typeJson[i]['id'],1);
                    handleMusicHtml(goodWorkList,1,i);
                    $('#moreLinkAward'+typeJson[i]['id']).click(function(){
                        $(this).parent('.music-list').find('ul').show();
                        if(goodWorkList.count>8){
                            $(this).parent('.music-list').find('.pagination-new').show();
                        }
                        $(this).hide();
                    })

                    $app.pager('list-award-page'+typeJson[i]['id'],'musicPage',[typeJson[i]['id'],1],1,goodWorkList.count,goodWorkList.pagesize);
                }


                //拼接普通作品
                var goodWorkList = getworklist(1,typeJson[i]['id'],2);
                if(goodWorkList.count == 0){
                    $('#list-normal'+typeJson[i]['id']).html('<h1 style="height=200px;width=100%;font-size:30px;text-align:center;padding-top:50px;">UP主正在创作中</h1>');
                }else{
                    handleMusicHtml(goodWorkList,2,i);

                    $('#moreLinkNormal'+typeJson[i]['id']).click(function(){
                        $(this).parent('.music-list').find('ul').show();
                        if(goodWorkList.count>8){
                            $(this).parent('.music-list').find('.pagination-new').show();
                        }

                        $(this).hide();
                    })

                    $app.pager('list-normal-page'+typeJson[i]['id'],'musicPage',[typeJson[i]['id'],2],1,goodWorkList.count,goodWorkList.pagesize);
                }
                break;
            //文字
            case '2':
                if(actStatus == 2){
                    //先拼接获奖作品
                    var goodWorkList = getworklist(1,typeJson[i]['id'],1);
                    handleWordHtml(goodWorkList,1,i);
                    $('#moreLinkAward'+typeJson[i]['id']).click(function(){
                        $(this).parent('.article-list').find('ul').show();
                        if(goodWorkList.count>8){
                            $(this).parent('.article-list').find('.pagination-new').show();
                        }

                        $(this).hide();
                    })

                    $app.pager('list-award-page'+typeJson[i]['id'],'wordPage',[typeJson[i]['id'],1],1,goodWorkList.count,goodWorkList.pagesize);

                }

                //拼接普通作品
                var goodWorkList = getworklist(1,typeJson[i]['id'],2);
                handleWordHtml(goodWorkList,2,i);

                if(goodWorkList.count == 0){
                    $('#list-normal'+typeJson[i]['id']).html('<h1 style="height=200px;width=100%;font-size:30px;text-align:center;padding-top:50px;">UP主正在创作中</h1>');
                }else{
                    $('#moreLinkNormal'+typeJson[i]['id']).click(function(){
                        $(this).parent('.article-list').find('ul').show();
                        if(goodWorkList.count>8){
                            $(this).parent('.article-list').find('.pagination-new').show();
                        }
                        $(this).hide();
                    })

                    $app.pager('list-normal-page'+typeJson[i]['id'],'wordPage',[typeJson[i]['id'],2],1,goodWorkList.count,goodWorkList.pagesize);
                }

                $('#moreLinkNormal'+typeJson[i]['id']).click(function(){
                    $(this).parent('.article-list').find('ul').show();
                    if(goodWorkList.count>8){
                        $(this).parent('.article-list').find('.pagination-new').show();
                    }
                    $(this).hide();
                })

                $app.pager('list-normal-page'+typeJson[i]['id'],'wordPage',[typeJson[i]['id'],2],1,goodWorkList.count,goodWorkList.pagesize);

                break;
            //图片
            case '3':
                if(actStatus == 2){
                    //先拼接获奖作品
                    var goodWorkList = getworklist(1,typeJson[i]['id'],1);
                    handlePicHtml(goodWorkList,1,i);
                    $('#moreLinkAward'+typeJson[i]['id']).click(function(){
                        $(this).parent('.paint-list').find('ul').show();
                        if(goodWorkList.count>15){
                            $(this).parent('.paint-list').find('.pagination-new').show();
                        }

                        $(this).hide();
                    })

                    $app.pager('list-award-page'+typeJson[i]['id'],'picPage',[typeJson[i]['id'],1],1,goodWorkList.count,goodWorkList.pagesize);
                }


                //拼接普通作品
                var goodWorkList = getworklist(1,typeJson[i]['id'],2);
                handlePicHtml(goodWorkList,2,i);


                if(goodWorkList.count == 0){
                    $('#list-normal'+typeJson[i]['id']).html('<h1 style="height=200px;width=100%;font-size:30px;text-align:center;padding-top:50px;">UP主正在创作中</h1>');
                }else{
                    $('#moreLinkNormal'+typeJson[i]['id']).click(function(){
                        $(this).parent('.paint-list').find('li').show();
                        if(goodWorkList.count>15){
                            $(this).parent('.paint-list').find('.pagination-new').show();
                        }
                        $(this).hide();
                    })

                    $app.pager('list-normal-page'+typeJson[i]['id'],'picPage',[typeJson[i]['id'],2],1,goodWorkList.count,goodWorkList.pagesize);

                }



                break;
        }
    }






});
// 去提交页面
function tosubmit(a_type,a_type_id){
    if(checkLogin()){
        $.ajax({
            url: "/workofficial/check_user",
            type: "POST",
            dataType : 'json',
            data: {},
            async:false,
            success: function (r){
                if(r.code==0){
                    if(a_type == 1){
                        window.open("/html/post-music.html?aId="+act_id+"&type="+AC_MUSIC+"&typeId="+a_type_id);
                    }
                    else if(a_type == 2){
                        window.open("/html/post-txt.html?aId="+act_id+"&type="+AC_TXT+"&typeId="+a_type_id);
                    }
                    else if(a_type == 3){
                        window.open("/html/post-image.html?aId="+act_id+"&type="+AC_PIC+"&typeId="+a_type_id);
                    }
                }else{
                    systemTip('要发布作品，请先绑定手机号升级成专业用户','/html/user-bind.html');
                }
            }
        });

    }
    else{
        systemTip("您还没有登录哦！","/html/login.html");
    }
}



function goto_work1(worklink){
    //添加活动id
    worklink += '&actId='+queryString('id');
    window.open(worklink);
}
/*
 * desc作品列表展示
 * @param pageNum 页数
 * @param type 类别
 * @param order 排序类型
 * @param orderby 降序还是升序
 */

function getworklist(pageNum,typeId,goodWork){
    if(goodWork == 1){
        var order = 'voteCount';
        var orderby = 'SORT_DESC';
    }else{
        if($('#paixu'+typeId+' a').eq(0).hasClass('on')){
            var order="time";
        }else{
            var order="voteCount";
        }
        if($('#paixu'+typeId+' a').hasClass("on-2")){
            var orderby='SORT_ASC';
        }else{
            var orderby='SORT_DESC';
        }
    }

    var workList = [];

    $.ajax({
        url: "/work/acworklist2",
        type: "POST",
        dataType : 'json',
        data: {id:act_id,page:pageNum,order:order,orderby:orderby,typeId:typeId,goodWork:goodWork},
        async:false,
        success: function (r){
            workList = r;
        }
    });
    return workList;
}

/*
 * 音乐作品分页
 * @param
 *    @pageNum 分页的页数
 *    @typeId 类型id
 *    @goodWork  优秀作品
 */
function musicPage(typeId,goodWork,pageNum){
    var goodWorkList = getworklist(pageNum,typeId,goodWork);
    var pageHtml = '';
    if(goodWork == 1){
        var tipDisplay = '';
        needVoteStatus = 'none';
        var pageIdName = 'list-award-page'+typeId;
        var divIdName = 'list-award'+typeId;
    }else{
        var tipDisplay = 'none';
        var pageIdName = 'music-list-normal-page'+typeId;
        var divIdName = 'list-normal'+typeId;
    }

    for (var j in goodWorkList.list) {
        var eq = j%2 == 1 ? 'eq': '';
        pageHtml+=' <ul class="music-line '+eq+'" >' +
            '                <li class="tip"  style="display: '+tipDisplay+'"></li>' +
            '                <li class="col-1" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</li>' +
            '                <li class="col-2" style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')">'+goodWorkList.list[j].nick+'</li>' +
            '                <li class="col-2-1">'+goodWorkList.list[j].viewCount+'</li>' +
            '                <li class="col-3">'+goodWorkList.list[j].time+'</li>' +
            '                <li class="col-4"> '+goodWorkList.list[j].mLength+' </li>' +
            '                <li class="col-5"  style="display: '+voteButtonStatus+'">票数：<span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></li>' +
            '                <li class="col-6" ><a style="display: '+voteButtonStatus+'"  href="javascript:collectionVote(\''+goodWorkList.list[j].id+'\',6);">投票</a></li>' +
            '                <li class="play-panel">' +
            '                    <a href="javascript:goto_work1('+goodWorkList.list[j].workLink+')" class="a4"></a></li></ul>';
    }
    pageHtml += '<div class="pagination-new" id="'+pageIdName+'"></div>';
    $('#'+divIdName).html(pageHtml);
    $app.pager(pageIdName,'musicPage',[typeId,goodWork],pageNum,goodWorkList.count,goodWorkList.pagesize);
}



/*
 * 图片作品分页
 *
 */

/*
 * 音乐作品分页
 * @param
 *    @pageNum 分页的页数
 *    @typeId 类型id
 *    @goodWork  优秀作品
 */
function picPage(typeId,goodWork,pageNum){



    var goodWorkList = getworklist(pageNum,typeId,goodWork);
    var pageHtml = '<ul>';
    if(goodWork == 1){
        var tipDisplay = '<span></span>';
        needVoteStatus = 'none';
        var pageIdName = 'list-award-page'+typeId;
        var divIdName = 'list-award'+typeId;
    }else{
        var tipDisplay = '';
        var pageIdName = 'list-normal-page'+typeId;
        var divIdName = 'list-normal'+typeId;
    }

    for (var j in goodWorkList.list) {
        pageHtml += ' <li>\n' +
            '                <div class="imgbox">'+tipDisplay+'<img width="200px" height="250px" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')" src="'+goodWorkList.list[j].urlMini+'" ></div>\n' +
            '                <h3><span style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</span><a style="display:'+voteButtonStatus+'" href="javascript:collectionVote('+goodWorkList.list[j].id+',5);">投票</a></h3>\n' +
            '                <div class="info">\n' +
            '                    <label style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')" >'+goodWorkList.list[j].nick+'</label>\n' +
            '                    <span  style="display: '+voteButtonStatus+'"  >票数： <span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></span>\n' +
            '                </div>\n' +
            '            </li>\n';

    }
    pageHtml+='</ul>';
    pageHtml+= '<div class="pagination-new" id="'+pageIdName+'"></div>';
    $('#'+divIdName).html(pageHtml);
    $app.pager(pageIdName,'picPage',[typeId,goodWork],pageNum,goodWorkList.count,goodWorkList.pagesize);
}


/*
 * 文字作品分页
 */


/*
 * 音乐作品分页
 * @param
 *    @pageNum 分页的页数
 *    @typeId 类型id
 *    @goodWork  优秀作品
 */
function wordPage(typeId,goodWork,pageNum){
    var goodWorkList = getworklist(pageNum,typeId,goodWork);
    var pageHtml = '';
    if(goodWork == 1){
        var tipDisplay = '';
        needVoteStatus = 'none';
        var pageIdName = 'list-award-page'+typeId;
        var divIdName = 'list-award'+typeId;
    }else{
        var tipDisplay = 'none';
        var pageIdName = 'list-normal-page'+typeId;
        var divIdName = 'list-normal'+typeId;
    }

    for (var j in goodWorkList.list) {
        var eq = j%2 == 1 ? 'eq': '';
        pageHtml+=' <ul class="article-line '+eq+'" >' +
            '                <li class="tip"  style="display: '+tipDisplay+'"></li>' +
            '                <li class="col-1" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</li>' +
            '                <li class="col-2" style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')">'+goodWorkList.list[j].nick+'</li>' +
            '                <li class="col-2-1">'+goodWorkList.list[j].viewCount+'</li>' +
            '                <li class="col-3">'+goodWorkList.list[j].time+'</li>' +
            '                <li class="col-5"  style="display: '+voteButtonStatus+'">票数：<span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></li>' +
            '                <li class="col-txt">\n' +goodWorkList.list[j].content+
            '                </li>\n' +
            '                <li class="col-6" ><a style="display: '+voteButtonStatus+'"  href="javascript:collectionVote(\''+goodWorkList.list[j].id+'\',4);">投票</a></li>' +
            '            </ul>';
    }
    pageHtml += '<div class="pagination-new" id="'+pageIdName+'"></div>';
    $('#'+divIdName).html(pageHtml);
    $app.pager(pageIdName,'wordPage',[typeId,goodWork],pageNum,goodWorkList.count,goodWorkList.pagesize);
}


/*
 * 处理音乐作品
 */
function handleMusicHtml(goodWorkList,goodWork,i){
    var listHtml = '';
    if(goodWork == 1){
        var tipDisplay = '';
        needVoteStatus = 'none';
        var moreLinkName = 'moreLinkAward'+typeJson[i]['id'];
        var pageIdName = 'list-award-page'+typeJson[i]['id'];
    }else{
        var tipDisplay = 'none';
        var moreLinkName = 'moreLinkNormal'+typeJson[i]['id'];
        var pageIdName = 'list-normal-page'+typeJson[i]['id'];
    }
//作品为空
    if(goodWorkList.count==0){
        //do nothing

        //作品数量小于等于5
    }else if(goodWorkList.count<=5){
        for (var j in goodWorkList.list) {
            var eq = j%2 == 1 ? 'eq': '';

            listHtml+=' <ul class="music-line '+eq+'" >' +
                '                <li class="tip"  style="display: '+tipDisplay+'"></li>' +
                '                <li class="col-1" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</li>' +
                '                <li class="col-2" style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')">'+goodWorkList.list[j].nick+'</li>' +
                '                <li class="col-2-1">'+goodWorkList.list[j].viewCount+'</li>' +
                '                <li class="col-3">'+goodWorkList.list[j].time+'</li>' +
                '                <li class="col-4"> '+goodWorkList.list[j].mLength+' </li>' +
                '                <li class="col-5"  style="display: '+voteButtonStatus+'">票数：<span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></li>' +
                '                <li class="col-6" ><a style="display: '+voteButtonStatus+'"  href="javascript:collectionVote(\''+goodWorkList.list[j].id+'\',6);">投票</a></li>' +
                '                <li class="play-panel">' +
                '                    <a href="javascript:goto_work1('+goodWorkList.list[j].workLink+')" class="a4"></a></li></ul>';
        }
        //作品数量大于5
    }else{
        for (var j in goodWorkList.list) {
            if(j>4){
                var display='none';
            }else{
                var display='';
            }
            var eq = j%2 == 1 ? 'eq': '';
            listHtml+=' <ul class="music-line '+eq+'" style="display:'+display+'">' +
                '                <li class="tip" style="display: '+tipDisplay+'"></li>' +
                '                <li class="col-1" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</li>' +
                '                <li class="col-2" style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')">'+goodWorkList.list[j].nick+'</li>' +
                '                <li class="col-2-1">'+goodWorkList.list[j].viewCount+'</li>' +
                '                <li class="col-3">'+goodWorkList.list[j].time+'</li>' +
                '                <li class="col-4"> '+goodWorkList.list[j].mLength+' </li>' +
                '                <li class="col-5"  style="display: '+voteButtonStatus+'">票数：<span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></li>' +
                '                <li class="col-6" ><a style="display: '+voteButtonStatus+'"  href="javascript:collectionVote(\''+goodWorkList.list[j].id+'\',6);">投票</a></li>' +
                '                <li class="play-panel">' +
                '                    <a href="javascript:goto_work1('+goodWorkList.list[j].workLink+')" class="a4"></a></li></ul>';
        }
    }

    if(goodWorkList.count>5){
        listHtml += '<p class="more-link" id="'+moreLinkName+'"><a href="javascript:;">更多作品</a></p>';
    }

    listHtml += '<div class="pagination-new" id="'+pageIdName+'" style="display: none;"></div>';
    if(goodWork == 1){
        $('#list-award'+typeJson[i]['id']).html(listHtml);
    }else{
        $('#list-normal'+typeJson[i]['id']).html(listHtml);
    }
}



/*
 * 处理音乐作品
 */
function handlePicHtml(goodWorkList,goodWork,i){
    var listHtml = '';
    if(goodWork == 1){
        var tipDisplay = '<span></span>';
        needVoteStatus = 'none';
        var moreLinkName = 'moreLinkAward'+typeJson[i]['id'];
        var pageIdName = 'list-award-page'+typeJson[i]['id'];
    }else{
        var tipDisplay = '';
        var moreLinkName = 'moreLinkNormal'+typeJson[i]['id'];
        var pageIdName = 'list-normal-page'+typeJson[i]['id'];
    }
    console.log('tipdisplay'+tipDisplay);
    //作品为空
    if(goodWorkList.count==0){
        //do nothing

        //作品数量小于等于5
    }else if(goodWorkList.count<=5){
        for (var j in goodWorkList.list) {
            listHtml += ' <li style="display:'+display+'">\n' +
                '                <div class="imgbox">'+tipDisplay+'<img width="200px" height="250px" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')" src="'+goodWorkList.list[j].urlMini+'" ></div>\n' +
                '                <h3><span style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</span><a style="display:'+voteButtonStatus+'" href="javascript:collectionVote('+goodWorkList.list[j].id+',5);">投票</a></h3>\n' +
                '                <div class="info">\n' +
                '                    <label style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')" >'+goodWorkList.list[j].nick+'</label>\n' +
                '                    <span  style="display: '+voteButtonStatus+'"  >票数： <span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></span>\n' +
                '                </div>\n' +
                '            </li>\n';
        }



        //作品数量大于5
    }else{
        for (var j in goodWorkList.list) {
            if(j>4){
                var display='none';
            }else{
                var display='';
            }
            listHtml += ' <li style="display:'+display+'">\n' +
                '                <div class="imgbox">'+tipDisplay+'<img width="200px" height="250px" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')" src="'+goodWorkList.list[j].urlMini+'" ></div>\n' +
                '                <h3><span style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</span><a style="display:'+voteButtonStatus+'" href="javascript:collectionVote('+goodWorkList.list[j].id+',5);">投票</a></h3>\n' +
                '                <div class="info">\n' +
                '                    <label style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')" >'+goodWorkList.list[j].nick+'</label>\n' +
                '                    <span  style="display: '+voteButtonStatus+'"  >票数： <span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></span>\n' +
                '                </div>\n' +
                '            </li>\n';
        }
    }


    if(goodWork == 1){
        $('#list-award'+typeJson[i]['id']+' ul').html(listHtml);
        if(goodWorkList.count>5){
            listHtml = '<p class="more-link" id="'+moreLinkName+'"><a href="javascript:;">更多作品</a></p>';
            listHtml += '<div class="pagination-new" id="'+pageIdName+'" style="display: none;"></div>';

        }else{
            listHtml = '<div class="pagination-new" id="'+pageIdName+'" style="display: none;"></div>';
        }
        $('#list-award'+typeJson[i]['id']).append(listHtml);


    }else{
        $('#list-normal'+typeJson[i]['id']+' ul').html(listHtml);
        if(goodWorkList.count>5){
            listHtml = '<p class="more-link" id="'+moreLinkName+'"><a href="javascript:;">更多作品</a></p>';
            listHtml += '<div class="pagination-new" id="'+pageIdName+'" style="display: none;"></div>';
            $('#list-normal'+typeJson[i]['id']).append(listHtml);
        }else {
            listHtml = '<div class="pagination-new" id="'+pageIdName+'" style="display: none;"></div>';
            $('#list-normal'+typeJson[i]['id']).append(listHtml);
        }
    }
}




/*
 * 处理文字作品
 */
function handleWordHtml(goodWorkList,goodWork,i){
    var listHtml = '';
    if(goodWork == 1){
        var tipDisplay = '';
        needVoteStatus = 'none';
        var moreLinkName = 'moreLinkAward'+typeJson[i]['id'];
        var pageIdName = 'list-award-page'+typeJson[i]['id'];
    }else{
        var tipDisplay = 'none';
        var moreLinkName = 'moreLinkNormal'+typeJson[i]['id'];
        var pageIdName = 'list-normal-page'+typeJson[i]['id'];
    }
//作品为空
    if(goodWorkList.count==0){
        //do nothing

        //作品数量小于等于5
    }else if(goodWorkList.count<=5){
        for (var j in goodWorkList.list) {
            var eq = j%2 == 1 ? 'eq': '';
            listHtml+=' <ul class="article-line '+eq+'" >' +
                '                <li class="tip"  style="display: '+tipDisplay+'"></li>' +
                '                <li class="col-1" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</li>' +
                '                <li class="col-2" style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')">'+goodWorkList.list[j].nick+'</li>' +
                '                <li class="col-2-1">'+goodWorkList.list[j].viewCount+'</li>' +
                '                <li class="col-3">'+goodWorkList.list[j].time+'</li>' +
                '                <li class="col-5"  style="display: '+voteButtonStatus+'">票数：<span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></li>' +
                '                <li class="col-txt">\n' +goodWorkList.list[j].content+
                '                </li>\n' +
                '                <li class="col-6" ><a style="display: '+voteButtonStatus+'"  href="javascript:collectionVote(\''+goodWorkList.list[j].id+'\',4);">投票</a></li>' +
                '            </ul>';
        }



        //作品数量大于5
    }else{
        for (var j in goodWorkList.list) {
            if(j>4){
                var display='none';
            }else{
                var display='';
            }
            var eq = j%2 == 1 ? 'eq': '';
            listHtml+=' <ul class="article-line '+eq+'" style="display:'+display+'" '+eq+'>' +
                '                <li class="tip"  style="display: '+tipDisplay+'"></li>' +
                '                <li class="col-1" style="cursor: pointer;" onclick="goto_work1('+goodWorkList.list[j].workLink+')">'+goodWorkList.list[j].title+'</li>' +
                '                <li class="col-2" style="cursor: pointer;" onclick="goto_work1(\''+goodWorkList.list[j].userLink+'\')">'+goodWorkList.list[j].nick+'</li>' +
                '                <li class="col-2-1">'+goodWorkList.list[j].viewCount+'</li>' +
                '                <li class="col-3">'+goodWorkList.list[j].time+'</li>' +
                '                <li  class="col-5" style="display: '+voteButtonStatus+'">票数：<span id="vote'+goodWorkList.list[j].id+'" >'+goodWorkList.list[j].voteCount+'</span></li>' +
                '                <li  class="col-txt">\n' +goodWorkList.list[j].content+
                '                </li>\n' +
                '                <li class="col-6" ><a style="display: '+voteButtonStatus+'"  href="javascript:collectionVote(\''+goodWorkList.list[j].id+'\',4);">投票</a></li>' +
                '            </ul>';
        }
    }

    if(goodWorkList.count>5){
        listHtml += '<p class="more-link" id="'+moreLinkName+'"><a href="javascript:;">更多作品</a></p>';
    }
    listHtml += '<div class="pagination-new" id="'+pageIdName+'" style="display: none;"></div>';
    if(goodWork == 1){
        $('#list-award'+typeJson[i]['id']).html(listHtml);
    }else{
        $('#list-normal'+typeJson[i]['id']).html(listHtml);
    }
}



/*
 * 给作品投票
 */
function collectionVote(id,type){
    if(!checkLogin()){
        systemTip('您还没有登录哦！','javascript:toLogin();');
        return ;
    }
    var data = {};
    data.wId = id;
    data.type = type;
    data.actId = queryString('id');
    $.ajax({
        url:'/work/vote',
        type:'post',
        data:data,
        dataType:'json',
        success:function(r){
            if(r.code == 0){
                var num = parseInt($('#vote'+id).text());
                num +=r.count;
                $('#vote'+id).text(num);
            }
            systemTip(r.msg);
        }
    })
}




