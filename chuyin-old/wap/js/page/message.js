/*
 *  message.html
 *  
 */
var offset = 0;
var nums = 5;
var lastOfficicalMsgId;
$(function(){
	if(!checkLogin()){
//		systemTip('请先登录','javascript:toLogin();');
		window.location.href = './login.html';
	}
	getMsgNum();
	getMessages(1);
	getOfficialMsg(1);
	getCommentMsg(1);
})
 
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
					if (GROUP_NUM > 0) {
						$('.msgNum').show();
						if(r.showcount>99){
							$('.msgNum').text("99+");
						}
						else {
							$('.msgNum').text(GROUP_NUM);
						}
					}
					if (MSG_NUM > 0) {
						$('.officialMsgNum').show();
					}
				}
				else {
					getOfficial();
				}
			}
		}
	})
}

/*
 * type
 * 1：系统消息
 * 2：评论消息
 */
function getMessages(pageNum)
{
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	$.ajax({
		url:'/message/getmessages',
		type:'post',
		data:{offset:offset,limit:nums},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			if (r['data'].length !== 0) {
				for (var i=0; i<r['data'].length; i++) {
					if (r['data'][i]['status'] == 1) {
						//已查看
						if (r['data'][i]['type'] == 2) {
							//小组申请信息
							if (r['data'][i]['handleStatus'] == 3) {
								//未处理
								innerHtml += '<li class="yidu" id="msg'+r['data'][i]['id']+'">';
								innerHtml += '<h3>[小组：'+r['data'][i]['groupName']+']小组申请加入消息</h3>';
								innerHtml += '<p class="showtxt">'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'</p>';
								innerHtml += '<div class="btnbox1"><a href="javascript:;" onclick="pushInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</a><a href="javascript:;" onclick="refuseInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')" class="cancel">拒绝</a></div>';
								innerHtml += '<div class="timebox">';
								innerHtml += '<span>'+r['data'][i]['time']+'</span>';
								innerHtml += '<a href="javascript:;" class="open">展开</a>';
								innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
								innerHtml += '</div>';
								innerHtml += '</li>';
							}
							else if (r['data'][i]['handleStatus'] == 1) {
								//已同意
								innerHtml += '<li class="yidu" id="msg'+r['data'][i]['id']+'">';
								innerHtml += '<h3>[小组：'+r['data'][i]['groupName']+']小组申请加入消息</h3>';
								innerHtml += '<p class="showtxt">'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'</p>';
								innerHtml += '<div class="btnbox1"><a href="javascript:;">已同意</a></div>';
								innerHtml += '<div class="timebox">';
								innerHtml += '<span>'+r['data'][i]['time']+'</span>';
								innerHtml += '<a href="javascript:;" class="open">展开</a>';
								innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
								innerHtml += '</div>';
								innerHtml += '</li>';
							}
							else if (r['data'][i]['handleStatus'] == 2) {
								//已拒绝
								innerHtml += '<li class="yidu" id="msg'+r['data'][i]['id']+'">';
								innerHtml += '<h3>[小组：'+r['data'][i]['groupName']+']小组申请加入消息</h3>';
								innerHtml += '<p class="showtxt">'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'</p>';
								innerHtml += '<div class="btnbox1"><a class="cancel" href="javascript:;">已拒绝</a></div>';
								innerHtml += '<div class="timebox">';
								innerHtml += '<span>'+r['data'][i]['time']+'</span>';
								innerHtml += '<a href="javascript:;" class="open">展开</a>';
								innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
								innerHtml += '</div>';
								innerHtml += '</li>';
							}
						}
						else if (r['data'][i]['type'] == 3) {
							//小组转让信息
							if (r['data'][i]['handleStatus'] == 3) {
								//转让消息未处理
								innerHtml += '<li class="yidu" id="msg'+r['data'][i]['id']+'">';
								innerHtml += '<h3>[小组：'+r['data'][i]['groupName']+']转让组消息</h3>';
								innerHtml += '<p class="showtxt">'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'</p>';
								innerHtml += '<div class="btnbox1"><a href="javascript:;" onclick="transfer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</a><a href="javascript:;" onclick="refuseTransfer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')" class="cancel">拒绝</a></div>';
								innerHtml += '<div class="timebox">';
								innerHtml += '<span>'+r['data'][i]['time']+'</span>';
								innerHtml += '<a href="javascript:;" class="open">展开</a>';
								innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
								innerHtml += '</div>';
								innerHtml += '</li>';
							}
							else if (r['data'][i]['handleStatus'] == 4) {
								//转让消息已同意
								innerHtml += '<li class="yidu" id="msg'+r['data'][i]['id']+'">';
								innerHtml += '<h3>[小组：'+r['data'][i]['groupName']+']转让组消息</h3>';
								innerHtml += '<p class="showtxt">'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'</p>';
								innerHtml += '<div class="btnbox1"><a href="javascript:;">已同意</a></div>';
								innerHtml += '<div class="timebox">';
								innerHtml += '<span>'+r['data'][i]['time']+'</span>';
								innerHtml += '<a href="javascript:;" class="open">展开</a>';
								innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
								innerHtml += '</div>';
								innerHtml += '</li>';
							}
							else if (r['data'][i]['handleStatus'] == 5) {
								//转让消息已拒绝
								innerHtml += '<li class="yidu" id="msg'+r['data'][i]['id']+'">';
								innerHtml += '<h3>[小组：'+r['data'][i]['groupName']+']转让组消息</h3>';
								innerHtml += '<p class="showtxt">'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'</p>';
								innerHtml += '<div class="btnbox1"><a class="cancel" href="javascript:;">已拒绝</a></div>';
								innerHtml += '<div class="timebox">';
								innerHtml += '<span>'+r['data'][i]['time']+'</span>';
								innerHtml += '<a href="javascript:;" class="open">展开</a>';
								innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
								innerHtml += '</div>';
								innerHtml += '</li>';
							}
						}
						else {
							//管理员已读消息
							innerHtml += '<li class="yidu" id="msg'+r['data'][i]['id']+'">';
							innerHtml += '<h3>管理员消息</h3>';
							innerHtml += '<p class="showtxt">管理员:'+r['data'][i]['content']+'</p>';
							innerHtml += '<div class="timebox">';
							innerHtml += '<span>'+r['data'][i]['time']+'</span>';
							innerHtml += '<a href="javascript:;" class="open">展开</a>';
							innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
							innerHtml += '</div>';
							innerHtml += '</li>';
						}
					}
					else {
						//未查看
						if (r['data'][i]['type'] == 2) {
							if (r['data'][i]['handleStatus'] == 3) {
								//小组消息未读
								innerHtml += '<li onclick="read('+r['data'][i]['id']+')" id="msg'+r['data'][i]['id']+'">';
								innerHtml += '<h3>[小组：'+r['data'][i]['groupName']+']小组申请加入消息</h3>';
								innerHtml += '<p class="showtxt">'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'</p>';
								innerHtml += '<div class="btnbox1"><a href="javascript:;" onclick="pushInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</a><a href="javascript:;" onclick="refuseInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')" class="cancel">拒绝</a></div>';
								innerHtml += '<div class="timebox">';
								innerHtml += '<span>'+r['data'][i]['time']+'</span>';
								innerHtml += '<a href="javascript:;" class="open">展开</a>';
								innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
								innerHtml += '</div>';
								innerHtml += '</li>';
							}
//							else if (r['data'][i]['handleStatus'] == 1) {
//								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组申请加入消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已同意</dd></a>';
//							}
//							else if (r['data'][i]['handleStatus'] == 2) {
//								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组申请加入消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已拒绝</dd></a>';
//							}
						}
						else if (r['data'][i]['type'] == 3) {
							if (r['data'][i]['handleStatus'] == 3) {
								//转让组消息未读
								innerHtml += '<li onclick="read('+r['data'][i]['id']+')" id="msg'+r['data'][i]['id']+'">';
								innerHtml += '<h3>[小组：'+r['data'][i]['groupName']+']转让组消息</h3>';
								innerHtml += '<p class="showtxt">'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'</p>';
								innerHtml += '<div class="btnbox1"><a href="javascript:;" onclick="transfer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</a><a href="javascript:;" onclick="refuseTransfer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')" class="cancel">拒绝</a></div>';
								innerHtml += '<div class="timebox">';
								innerHtml += '<span>'+r['data'][i]['time']+'</span>';
								innerHtml += '<a href="javascript:;" class="open">展开</a>';
								innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
								innerHtml += '</div>';
								innerHtml += '</li>';
							}
//							else if (r['data'][i]['handleStatus'] == 4) {
//								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']转让组消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已同意</dd></a>';
//							}
//							else if (r['data'][i]['handleStatus'] == 5) {
//								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']转让组消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已拒绝</dd></a>';
//							}
						}
						else {
							//未读管理员消息
							innerHtml += '<li onclick="read('+r['data'][i]['id']+')" id="msg'+r['data'][i]['id']+'">';
							innerHtml += '<h3>管理员消息</h3>';
							innerHtml += '<p class="showtxt">管理员:'+r['data'][i]['content']+'</p>';
							innerHtml += '<div class="timebox">';
							innerHtml += '<span>'+r['data'][i]['time']+'</span>';
							innerHtml += '<a href="javascript:;" class="open">展开</a>';
							innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
							innerHtml += '</div>';
							innerHtml += '</li>';
						}
					}
				}

				if (pageNum <= 1) $('.msgbox2 ul').html(innerHtml);
				if (pageNum > 1) $('.msgbox2 ul li:last').after(innerHtml)
				var tab_num = 33.33;
				$('.tabbox ul li').unbind('click');
				$('.tabbox ul li').click(function () {
			        $('.tabbox ul li').removeClass('on');
			        $(this).addClass('on');
			        $(".bottom-line").css('left',$(this).index()*tab_num +'%');
			        if($(this).index() == 0){
			            $('.plbox').show();
			            $('.msgbox1').hide();
			            $('.msgbox2').hide();
			        }else if($(this).index() == 1){
			            $('.plbox').hide();
			            $('.msgbox1').show();
			            $('.msgbox2').hide();
			        }else{
			            $('.plbox').hide();
			            $('.msgbox1').hide();
			            $('.msgbox2').show();
			        }
			    });
				$('.open').live('click',function () {
			        $(this).hide()
			        $(this).parent().find('.close').show()
			        $(this).parent().parent().find('p').removeClass('showtxt')
			    });
			    $('.close').live('click',function () {
			        $(this).hide()
			        $(this).parent().find('.open').show()
			        $(this).parent().parent().find('p').addClass('showtxt')
			    })
			    
			    $('.addmore').show();
			} 
			else {
				if (pageNum > 1) {
					alertbox('','没有更多消息啦','确定');
				}
				else {
					$('#noMsg').show();
					$('.addmore').hide();
				}
			}
		}
	})
}

/*
 * type
 * 1：
 * 2：评论消息
 */
function getOfficialMsg(pageNum)
{
	pageNum = parseInt(pageNum)>0 ? parseInt(pageNum) : 1;
	if (pageNum == 1) {
		offset = 0;
	}
	else {
		offset = (pageNum-1)*nums;
	}
	$.ajax({
		url:'/message/getofficialmsg',
		type:'post',
		data:{offset:offset,limit:nums},
		async:false,
		dataType:'json',
		success:function(r){
			var innerHtml = '';
			if (r['data'].length !== 0) {
				for (var i=0; i<r['data'].length; i++) {
					innerHtml += '<li>';
					innerHtml += '<h3>系统公告</h3>';
					innerHtml += '<p class="showtxt">'+r['data'][i]['content']+'</p>';
					innerHtml += '<div class="timebox">';
					innerHtml += '<span>'+r['data'][i]['updated_at']+'</span>';
					innerHtml += '<a href="javascript:;" class="open">展开</a>';
					innerHtml += '<a href="javascript:;" class="close" style="display: none">收起</a>';
					innerHtml += '</div>';
					innerHtml += '</li>';
				}
				if (pageNum <= 1) $('.msgbox1 ul').html(innerHtml);
				if (pageNum > 1) $('.msgbox1 ul li:last').after(innerHtml);
				var tab_num = 33.33;
				$('.tabbox ul li').unbind('click');
				$('.tabbox ul li').click(function () {
			        $('.tabbox ul li').removeClass('on');
			        $(this).addClass('on');
			        $(".bottom-line").css('left',$(this).index()*tab_num +'%');
			        if($(this).index() == 0){
			            $('.plbox').show();
			            $('.msgbox1').hide();
			            $('.msgbox2').hide();
			        }else if($(this).index() == 1){
			            $('.plbox').hide();
			            $('.msgbox1').show();
			            $('.msgbox2').hide();
			        }else{
			            $('.plbox').hide();
			            $('.msgbox1').hide();
			            $('.msgbox2').show();
			        }
			    });
		        if (pageNum == 1) {
					lastOfficialMsgId = r['data'][0]['id'];
					readOfficialMsg(lastOfficialMsgId);
				}
				$('.addmore').show();
			} 
			else {
				$('.officialMsgNum').hide();
				if (pageNum > 1) {
					alertbox('','没有更多消息啦','确定');
				}
				else {
					$('#noOfficialMsg').show();
					$('.addmore').hide();
				}
			}
		}
	})
}

function readOfficialMsg(msgId)
{
	$.ajax({
		url:'/message/getofficial',
		type:'get',
		data:{},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				$('.officialMsgNum').show();
				readOfficial(msgId);
			}
			else {
				readOfficial(msgId);
			}
		}
	})
}

function readOfficial(msgId)
{
	$.ajax({
		url:'/message/readofficial',
		type:'post',
		data:{id:msgId},
		async:false,
		dataType:'json',
		success:function(r){
	
		}
	})
}

function read(msgId)
{
	$.ajax({
		url:'/message/read',
		type:'post',
		data:{id:msgId},
		async:false,
		dataType:'json',
		success:function(r){
			if($('#msg'+msgId).hasClass('yidu')){	
				//nothing to do...
			}else{
				MSG_NUM--;
				GROUP_NUM--;
				$('#msg'+msgId).addClass('yidu');
			}
			if (r.code == 0) {
				if(GROUP_NUM <= 0){
					//个人消息
					$('.msgNum').hide();
				}
				if (MSG_NUM <= 0) {
					//系统消息
					$('.officialMsgNum').hide();
				}
				else {
					$('.msgNum').show();
					$('.msgNum').text(GROUP_NUM);
				}
			}
		}
	})
}

function pushInGroup(groupId,userId,msgId)
{
	//js base64_encode
	//window.btoa("test")；//"dGVzdA=="
	//window.atob("dGVzdA==");//"test"
	$.ajax({
		url:'/group/pushingroup',
		type:'post',
		data:{groupId:groupId,userId:userId,msgId:msgId},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				alertbox('','操作成功','确定');
				$('#msg'+msgId+' .btnbox1' ).html('<a href="javascript:;">已同意</a>');
			}
			else {
				alertbox('',r.message,'确定');
			}
		}
	})
}

function refuseInGroup(groupId,userId,msgId)
{
	//js base64_encode
	//window.btoa("test")；//"dGVzdA=="
	//window.atob("dGVzdA==");//"test"
	$.ajax({
		url:'/group/refuseingroup',
		type:'post',
		data:{groupId:groupId,userId:userId,msgId:msgId},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				alertbox('','操作成功','确定');
				$('#msg'+msgId+' .btnbox1' ).html('<a href="javascript:;" class="cancel">已拒绝</a>');
			}
		}
	})
}

//同意转让组
function transfer(groupId,userId,msgId)
{
	$.ajax({
		url:'/group/transfer',
		type:'post',
		data:{groupId:groupId,userId:userId,msgId:msgId},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				alertbox('','操作成功','确定');
				$('#msg'+msgId+' .btnbox1' ).html('<a href="javascript:;">已同意</a>');
			}
			else {
				alertbox('',r.message,'确定');
			}
		}
	})
}

function refuseTransfer(groupId,userId,msgId)
{
	//js base64_encode
	//window.btoa("test")；//"dGVzdA=="
	//window.atob("dGVzdA==");//"test"
	$.ajax({
		url:'/group/refusetransfer',
		type:'post',
		data:{groupId:groupId,userId:userId,msgId:msgId},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
				alertbox('','操作成功','确定');
				$('#msg'+msgId+' .btnbox1' ).html('<a href="javascript:;" class="cancel">已拒绝</a>');
			}
		}
	})
}



function getCommentMsg(pageNum){
	$.ajax({
		url:'/comment/getcomment',
		type:'get',
		data:{page:pageNum},
		dataType:'json',
		async:false,
		success:function(r){
			if(r.count<=0){
				$('.threetab li:eq(0) i').hide();
				$(".plbox").html(' <div class="data-null">还没有评论哦，快点赢得关注度，多做些作品吧~</div>');
			}else{
				var htmlstr='';
				for(var i in r['list']){
					//未查看评论
					if(r['list'][i]['status']==2){
						var hrefLink = 'javascript:showzp('+r['list'][i]['workId']+','+r['list'][i]['id']+','+r['list'][i]['workType']+');';
					}
					//已查看评论
					else{
						var hrefLink = 'javascript:showzp_not('+r['list'][i]['workId']+','+r['list'][i]['id']+','+r['list'][i]['workType']+');';
					}
					htmlstr += '<li>'+
	                '<img src="'+r['list'][i]['fromhead']+'" name="'+r['list'][i]['headlink']+'">'+
	                '<h3>'+r['list'][i]['fromname']+'<span>'+r['list'][i]['time_before']+'</span></h3>'+
	                '<p><a style="color:#999;" href="'+hrefLink+'">回复了你：'+r['list'][i]['content']+'</a></p>'+
	                '</li>';
				}
				$(".plbox ul").html(htmlstr);
				if(r.showcount>99){
					$('.threetab li:eq(0) i').text("99+");
				}
				else if (r.showcount==0){
					$('.threetab li:eq(0) i').hide();
				}else{
					$('.threetab li:eq(0) i').text(r.showcount);
				}
				if(r.list.length<pageSize){
					$('.addmore').text('已无更多评论')
				}
				$('.addmore').show();
			}
		}
	});
}
function showzp(workid,id,type){
	$.ajax({
		url:'/comment/getbaseid',
		type:'get',
		data:{workid:workid,type:type,id:id},
		dataType:'json',
		async:false,
		success:function(r){
		window.open(r);
		}
	})
	
}
function showzp_not(workid,id,type){
	$.ajax({
		url:'/comment/getbaseid',
		type:'get',
		data:{workid:workid,type:type},
		dataType:'json',
		async:false,
		success:function(r){
		window.open(r);
		}
	});
	
}

var CommentPageNum = 1;
var officialPageNum = 1;
var msgPageNum = 1;
var pageSize = 8;
function addMore()
{
	var index = $('.threetab li[class="on"]').index();
	if (index == 0) {
		//评论
		CommentPageNum++;
		getCommentMsg(CommentPageNum);
	}
	else if (index == 1) {
		//系统消息
		officialPageNum++;
		getOfficialMsg(officialPageNum);
	}
	else if (index == 2) {
		//个人消息
		msgPageNum++;
		getMessages(msgPageNum);
	}
}

