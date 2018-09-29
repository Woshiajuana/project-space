
$(function(){
    if(!checkLogin()){
        layer('请先登录');
        window.location.href = 'login.html';
    }
    else {
        isAuthen();
    }
})

function isAuthen()
{
    var groupId = queryString('id');
    if (!groupId) {
        showMsgTip('来源错误', 'main.html');
    }
    $.get('/group/is-authen',{groupId:groupId},function(r){
        if (r.isAuthen) {
            showMsgTip('该小组已认证', 'group.html?id='+groupId);
        }
    },'json')
}

function getCerBaseInfo()
{
    var id = queryString('id');
    var isShow = (queryString('back'))?queryString('back'):0;
    $.get('/group/get-cer-base-info',{groupId:id},function(r){
        if (r.code == 0) {
            if (isShow) {
                //渲染
                $('#groupName').val(r['data']['groupname']);
                $('#groupLeaderName').val(r['data']['adminname']);
                $('#mobile').val(r['data']['mobile']);
                $('#IDType').val(r['data']['cardtype']);
                $('#idCard').val(r['data']['card']);
                $('#groupLogoShow').show();
                $('#groupLogoShow').attr('src',r['data']['picurl']);
            }
            else {
                window.location.href = 'team_check.html?id='+queryString('id');
            }
        }
        else {
            //nothing to do
        }
    },'json')
}

var regTel = /^(((17[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(147))+\d{8})$/;
var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
function saveCertificationBase()
{
    var data = {};
    data.groupId = queryString('id');
    data.groupName = $('#groupName').val().trim();
    data.groupLeaderName = $('#groupLeaderName').val().trim();
    data.mobile = $('#mobile').val().trim();
    data.idType = $('#IDType').val();
    data.idCard = $('#idCard').val().trim();
    data.groupLogo = $('#groupLogoShow').attr('src');

    if (!data.groupName || !data.groupLeaderName || !data.mobile || !data.idType || !data.idCard || !data.groupLogo) {
        systemTip('请先补全信息');
        return ;
    }

    if (!regTel.test(data.mobile)) {
        systemTip('手机号码格式不正确');
        return ;
    }
    if (!regIdCard.test(data.idCard)) {
        systemTip('身份证号格式不正确');
        return ;
    }

    $.post('/group/save-certification-base',data,function(r){
        if (r.code == 0) {
            window.location.href = 'team_check.html?id='+queryString('id');
        }
        else {
            systemTip(r.message);
        }
    },'json')
}

function updateCerBaseInfo()
{
    var data = {};
    data.groupId = queryString('id');
    data.groupName = $('#groupName').val().trim();
    data.groupLeaderName = $('#groupLeaderName').val().trim();
    data.mobile = $('#mobile').val().trim();
    data.idType = $('#IDType').val();
    data.idCard = $('#idCard').val().trim();
    data.groupLogo = $('#groupLogoShow').attr('src');

    if (!data.groupName || !data.groupLeaderName || !data.mobile || !data.idType || !data.idCard || !data.groupLogo) {
        systemTip('请先补全信息');
        return ;
    }

    if (!regTel.test(data.mobile)) {
        systemTip('手机号码格式不正确');
        return ;
    }
    if (!regIdCard.test(data.idCard)) {
        systemTip('身份证号格式不正确');
        return ;
    }

    $.post('/group/update-cer-base-info',data,function(r){
        if (r.code == 0) {
            window.location.href = 'team_check.html?id='+queryString('id');
        }
        else {
            systemTip(r.message);
        }
    },'json')
}

var offset = 0;
var nums = 8;
var cerUserList = [];
function getUserList(pageNum)
{
    pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
    if (pageNum == 1) {
        offset = 0;
    }
    else {
        offset = (pageNum-1)*nums;
    }

    $.ajax({
        url:'/group/get-group-user-list',
        type:'post',
        data:{id:queryString('id'),offset:offset,nums:nums},
        async:false,
        dataType:'json',
        success:function(r){
            var innerHtml = '';
            for (var i=0; i<r['data'].length; i++) {
                if ($.inArray(r['data'][i]['id'].toString(), r['agreeUser']) !== -1) {
                    innerHtml += '<li userId="'+r['data'][i]['id']+'" title="'+r['data'][i]['username']+'"><span></span><img width="64" src="'+r['data'][i]['head']+'"></li>';
                }
                else {
                    innerHtml += '<li userId="'+r['data'][i]['id']+'" title="'+r['data'][i]['username']+'"><img width="64" src="'+r['data'][i]['head']+'"></li>';
                }
            }
            $('.userlist').html(innerHtml);
            // $('.userlist li').click(function(){
            //     var str = $(this).html();
            //     if (str.indexOf("<span></span>") == -1) {
            //         cerUserList.push(parseInt($(this).attr('userId')));
            //         $(this).html('<span></span>'+str);
            //     }
            //     else {
            //         cerUserList.splice(cerUserList.indexOf(parseInt($(this).attr('userId'))), 1);
            //         $(this).html(str.replace(/<span><\/span>/, ""));
            //     }
            // })
            $app.pager('cerPage', 'getUserList', '', pageNum, r.total,nums,'pagination-new');
        }
    })
}

function submitGroupCer()
{
    var data = {};
    data.groupId = queryString('id');
    $.post('/group/submit-group-cer',data,function(r){
        if (r.code == 0) {
            systemTip(r.message);
        }
        else {
            systemTip(r.message);
        }
    },'json');
}

function groupCertification()
{
    var data = {};
    data.groupId = queryString('id');
    data.userList = cerUserList;
    data.type = $('#groupCerType').val();

    if (!data.userList || !data.type) {
        systemTip('请先补全信息');
        return ;
    }

    $.post('/group/group-certification',data,function(r){
        if (r.code == 0) {
            systemTip(r.message);
        }
        else {
            systemTip(r.message);
        }
    },'json');
}

function sendGroupMemberCer()
{
    var data = {};
    data.groupId = queryString('id');
    data.userList = cerUserList;
    data.type = $('#groupCerType').val();

    if (!data.userList || !data.type) {
        systemTip('请先补全信息');
        return ;
    }

    $.post('/group/send-group-member-cer',data,function(r){
        if (r.code == 0) {
            systemTip(r.message);
        }
        else {
            systemTip(r.message);
        }
    },'json');
}

function getGroupCerSign()
{
    $.get('/group/get-group-cer-sign',{groupId:queryString('id')},function(r){
        if (r.sign == 'submit') {
            $('#submit').show();
            $('#groupCerType').val(r.type);
            $('#submit').unbind('click');
            $('#submit').click(function(){
                submitGroupCer();
            })
        }
        else if (r.sign == 'send'){
            $('#saveCer').show();
            $('#saveCer').unbind('click');
            $('#saveCer').click(function(){
                sendGroupMemberCer();
            })
        }
        else if (r.sign == 'success'){
            systemTip(r.message);
            showMsgTip(r.message, 'group.html?id='+queryString('id'));
        }
        else {
            $('#submit').addClass('btn-disable');
            $('#submit').show();
            $('#groupCerType').val(r.type);
            $('#submit').unbind('click');
            $('.btn-disable:eq(1)').hide();
        }
    },'json')
}

function getCerTypeList()
{
    $.get('/group/get-cer-type-list',{},function(r){
        var innerHtml = '';
        for (var i=0; i<r['data'].length; i++) {
            innerHtml += '<option value="'+r['data'][i]['name']+'">'+r['data'][i]['name']+'</option>';
        }
        $('#groupCerType').html(innerHtml);
    },'json')
}





