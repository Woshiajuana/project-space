/*
 *  message.html
 *  
 */
var offset = 0;
var nums = 5;
var lastOfficicalMsgId;
$(function(){
	if(!checkLogin()){
		systemTip('请先登录','javascript:toLogin();');
	}
	if (GROUP_NUM > 0) {
		$('#groupMsg').show();
		$('#groupMsg').text(GROUP_NUM);
	}
	$("#page_pl").hide();
	$("#msglist-btn-2").click(function(){
		$("#page_pl").show();
	})
	$("#msglist-btn-1").click(function(){
		$("#page_pl").hide();
	})
	$("#msglist-btn-3").click(function(){
		$("#page_pl").hide();
	})
	getMessages(1);
	getOfficialMsg(1);
	getCommentMsg(1);
	$(".comment_list li a").click(function(){
		if($(this).hasClass('dis')){		
		}else{
		var newcount=$("#showcount").html();	
		 	newcount--;
		 	MSG_NUM--;
			$('.t-msg-link span').text(MSG_NUM);
		if(MSG_NUM<=0){
			$('.t-msg-link span').hide();
		}
		 $("#showcount").html(newcount);
		 if(newcount==0){
			 $("#showcount").hide();
		 }
		 $(this).addClass('dis');
		}
	})
	$('#msglist-box-1 dt').click(function () {
        $(this).next().toggle()
    })
    $('#msglist-box-1 dd a').click(function () {
        $(this).parent().parent().toggle()
    })
	
	$("li img").each(function(){
		$(this).click(function(){
			window.open($(this).attr("name"));
		});
	});
})
 
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
		url:'../message/getmessages',
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
								innerHtml += '<dt class="readed" class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组申请加入消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'<div class="btnbox" id="btnbox'+r['data'][i]['id']+'"><a href="javascript:;" style="background:none;"><span onclick="pushInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</span></a><a href="javascript:;" style="background:none;"> <span class="dis" onclick="refuseInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">拒绝</span></a></div></dd>';
							}
							else if (r['data'][i]['handleStatus'] == 1) {
								innerHtml += '<dt class="readed">[小组：'+r['data'][i]['groupName']+']小组申请加入消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已同意</dd>';
							}
							else if (r['data'][i]['handleStatus'] == 2) {
								innerHtml += '<dt class="readed">[小组：'+r['data'][i]['groupName']+']小组申请加入消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已拒绝</dd>';
							}
							// innerHtml += '<dt class="readed">['+r['data'][i]['groupName']+']'+r['data'][i]['fromUserName']+':申请加入小组</dt><dd>'+r['data'][i]['content']+'</dd>';
						}
						else if (r['data'][i]['type'] == 3) {
							//小组转让信息
							if (r['data'][i]['handleStatus'] == 3) {
								innerHtml += '<dt class="readed" class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']转让组消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'<div class="btnbox" id="btnbox'+r['data'][i]['id']+'"><a href="javascript:;" style="background:none;"><span onclick="transfer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</span></a> <a href="javascript:;" style="background:none;"><span class="dis" onclick="refuseTransfer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">拒绝</span></a></div></dd>';
							}
							else if (r['data'][i]['handleStatus'] == 4) {
								innerHtml += '<dt class="readed">[小组：'+r['data'][i]['groupName']+']转让组消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已同意</dd>';
							}
							else if (r['data'][i]['handleStatus'] == 5) {
								innerHtml += '<dt class="readed">[小组：'+r['data'][i]['groupName']+']转让组消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已拒绝</dd>';
							}
							// innerHtml += '<dt class="readed">['+r['data'][i]['groupName']+']'+r['data'][i]['fromUserName']+':申请加入小组</dt><dd>'+r['data'][i]['content']+'</dd>';
						}
                        else if (r['data'][i]['type'] == 4) {
                            //互动帖回复信息
                            innerHtml += '<dt class="readed">'+r['data'][i]['fromUserName']+'回复我的主题：'+r['data'][i]['groupName']+'</dt><dd>'+r['data'][i]['content']+'</dd>';
                            // innerHtml += '<dt class="readed">['+r['data'][i]['groupName']+']'+r['data'][i]['fromUserName']+':申请加入小组</dt><dd>'+r['data'][i]['content']+'</dd>';
                        }
                        else if (r['data'][i]['type'] == 5) {
                            //互动帖回复信息
                            innerHtml += '<dt class="readed">'+r['data'][i]['fromUserName']+'回复我的评论：'+r['data'][i]['groupName']+'</dt><dd>'+r['data'][i]['content']+'</dd>';
                            // innerHtml += '<dt class="readed">['+r['data'][i]['groupName']+']'+r['data'][i]['fromUserName']+':申请加入小组</dt><dd>'+r['data'][i]['content']+'</dd>';
                        }
                        else if (r['data'][i]['type'] == 6) {
                            //小组认证申请信息
                            if (r['data'][i]['handleStatus'] == 3) {
                                innerHtml += '<dt class="readed" class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组认证申请消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'<div class="btnbox" id="btnbox'+r['data'][i]['id']+'"><a href="javascript:;" style="background:none;"><span onclick="agreeGroupCer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</span></a><a href="javascript:;" style="background:none;"> <span class="dis" onclick="refuseGroupCer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">拒绝</span></a></div></dd>';
                            }
                            else if (r['data'][i]['handleStatus'] == 1) {
                                innerHtml += '<dt class="readed">[小组：'+r['data'][i]['groupName']+']小组认证申请消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已同意</dd>';
                            }
                            else if (r['data'][i]['handleStatus'] == 2) {
                                innerHtml += '<dt class="readed">[小组：'+r['data'][i]['groupName']+']小组认证申请消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已拒绝</dd>';
                            }
                            // innerHtml += '<dt class="readed">['+r['data'][i]['groupName']+']'+r['data'][i]['fromUserName']+':申请加入小组</dt><dd>'+r['data'][i]['content']+'</dd>';
                        }
						else if(r['data'][i]['state'] == 3){
							innerHtml += '<dt class="readed">管理员:很遗憾您的作品《'+r['data'][i]['title']+'》未通过审核'+'</dt><dd>'+r['data'][i]['content']+'</dd>';
						}
						else if(r['data'][i]['state'] == 4){
							innerHtml += '<dt class="readed">管理员:恭喜您的作品《'+r['data'][i]['title']+'》成为优秀作品'+'</dt><dd>'+r['data'][i]['content']+'</dd>';
						}
						else if(r['data'][i]['state'] == 2){
							innerHtml += '<dt class="readed">管理员:恭喜您的作品《'+r['data'][i]['title']+'》通过审核</dt><dd>'+r['data'][i]['content']+'</dd>';
						}
						else{
                            if (r['data'][i]['groupName']){
                                innerHtml += '<dt class="readed">管理员:'+r['data'][i]['content']+'</dt><dd>'+r['data'][i]['content']+'<br>审核描述：'+r['data'][i]['groupName']+'</dd>';
							}
							else {
                                innerHtml += '<dt class="readed">管理员:'+r['data'][i]['content']+'</dt><dd>'+r['data'][i]['content']+'</dd>';
							}
						}
					}
					else {
						//未查看
						if (r['data'][i]['type'] == 2) {
							if (r['data'][i]['handleStatus'] == 3) {
								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组申请加入消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'<div class="btnbox" id="btnbox'+r['data'][i]['id']+'"><span style="cursor:pointer" onclick="pushInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</span><span style="cursor:pointer" class="dis" onclick="refuseInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">拒绝</span></div></dd></a>';
							}
							else if (r['data'][i]['handleStatus'] == 1) {
								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组申请加入消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已同意</dd></a>';
							}
							else if (r['data'][i]['handleStatus'] == 2) {
								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组申请加入消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已拒绝</dd></a>';
							}
							// innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">['+r['data'][i]['groupName']+']'+r['data'][i]['fromUserName']+':申请加入小组</dt><dd>'+r['data'][i]['content']+'<span style="color: blue; cursor:pointer;" onclick="pushInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</span> <span style="color: blue; cursor:pointer;" onclick="refuseInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">拒绝</span></dd></a>';
						}
						else if (r['data'][i]['type'] == 3) {
							if (r['data'][i]['handleStatus'] == 3) {
								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']转让组消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'<div class="btnbox" id="btnbox'+r['data'][i]['id']+'"><span style="cursor:pointer" onclick="transfer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</span> <span style="cursor:pointer" class="dis" onclick="refuseTransfer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">拒绝</span></div></dd></a>';
							}
							else if (r['data'][i]['handleStatus'] == 4) {
								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']转让组消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已同意</dd></a>';
							}
							else if (r['data'][i]['handleStatus'] == 5) {
								innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']转让组消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已拒绝</dd></a>';
							}
						}
                        else if (r['data'][i]['type'] == 4) {
                            innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">'+r['data'][i]['fromUserName']+'回复我的主题：'+r['data'][i]['groupName']+'</dt><dd>'+r['data'][i]['content']+'</dd></a>';

                        }
                        else if (r['data'][i]['type'] == 5) {
                            innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">'+r['data'][i]['fromUserName']+'回复我的评论：'+r['data'][i]['groupName']+'</dt><dd>'+r['data'][i]['content']+'</dd></a>';
                        }
                        else if (r['data'][i]['type'] == 6) {
                            if (r['data'][i]['handleStatus'] == 3) {
                                innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组认证申请消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+'<div class="btnbox" id="btnbox'+r['data'][i]['id']+'"><span style="cursor:pointer" onclick="agreeGroupCer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</span><span style="cursor:pointer" class="dis" onclick="refuseGroupCer('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">拒绝</span></div></dd></a>';
                            }
                            else if (r['data'][i]['handleStatus'] == 1) {
                                innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组认证申请消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已同意</dd></a>';
                            }
                            else if (r['data'][i]['handleStatus'] == 2) {
                                innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">[小组：'+r['data'][i]['groupName']+']小组认证申请消息</dt><dd>'+r['data'][i]['fromUserName']+':'+r['data'][i]['content']+' <span></span> 已拒绝</dd></a>';
                            }
                            // innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">['+r['data'][i]['groupName']+']'+r['data'][i]['fromUserName']+':申请加入小组</dt><dd>'+r['data'][i]['content']+'<span style="color: blue; cursor:pointer;" onclick="pushInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">同意</span> <span style="color: blue; cursor:pointer;" onclick="refuseInGroup('+r['data'][i]['groupId']+','+r['data'][i]['fromUserId']+','+r['data'][i]['id']+')">拒绝</span></dd></a>';
                        }
						else if(r['data'][i]['state'] == 3) {
							innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">管理员:很遗憾您的作品《'+r['data'][i]['title']+'》未通过审核'+'</dt><dd>'+r['data'][i]['content']+'</dd></a>';
						}
						else if(r['data'][i]['state'] == 4) {
							innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">管理员:恭喜您的作品《'+r['data'][i]['title']+'》成为优秀作品'+'</dt><dd>'+r['data'][i]['content']+'</dd></a>';
						}
						else if(r['data'][i]['state'] == 2){
							innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">管理员:恭喜您的作品《'+r['data'][i]['title']+'》通过审核</dt><dd>'+r['data'][i]['content']+'</dd></a>';
						}
						else{
                            if (r['data'][i]['groupName']){
                                innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">管理员:'+r['data'][i]['content']+'</dt><dd>'+r['data'][i]['content']+'<br>审核描述：'+r['data'][i]['groupName']+'</dd></a>';
                            }
							else {
                                innerHtml += '<a onclick="read('+r['data'][i]['id']+')"><dt class="msg'+r['data'][i]['id']+'">管理员:'+r['data'][i]['content']+'</dt><dd>'+r['data'][i]['content']+'</dd></a>';
                            }
						}
					}
					
				}

				$('#msglist-box-3 dl').html(innerHtml);
				$('#msglist-box-3 dt').click(function () {
		            $(this).next().toggle()
		        })
		        $('#msglist-box-3 dd a').click(function () {
		            $(this).parent().parent().toggle()
		        })
				$app.pager('groupPage', 'getMessages', [], pageNum, r.total,nums);

		        $('#msglist-btn-1').click(function () {
		            $('#msglist-box-1').show();
		            $('#msgpl-box2,#msglist-box-3').hide();
		            $('#msglist-btn-2,#msglist-btn-3').removeClass("on")
		            $(this).addClass("on");
		        })
		        $('#msglist-btn-2').click(function () {
		            $('#msgpl-box2').show();
		            $('#msglist-box-1,#msglist-box-3').hide();
		            $('#msglist-btn-1,#msglist-btn-3').removeClass("on")
		            $(this).addClass("on");
		        })
		        $('#msglist-btn-3').click(function () {
		            $('#msglist-box-3').show();
		            $('#msglist-box-1,#msgpl-box2').hide();
		            $('#msglist-btn-1,#msglist-btn-2').removeClass("on")
		            $(this).addClass("on");
		        })
			} 
			else {
				$('#groupno').show();
			}
		}
	})
}

/*
 * type
 * 1：系统消息
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
					innerHtml += '<dt style="background:none;">系统公告: '+r['data'][i]['content']+'</dt><dd>'+r['data'][i]['content']+'<br>'+r['data'][i]['updated_at']+'</dd>';
				}

				$('#msglist-box-1 dl').html(innerHtml);
				setTimeout("$('#msglist-box-1 dt').click(function () {$(this).next().toggle()}); $('#msglist-box-1 dd a').click(function () { $(this).parent().parent().toggle()});",1000)
				$('#msglist-box-1 dt').click(function () {
		            $(this).next().toggle()
		        })
		        $('#msglist-box-1 dd a').click(function () {
		            $(this).parent().parent().toggle()
		        })
				$app.pager('page', 'getOfficialMsg', [], pageNum, r.total,nums);
				
		        $('#msglist-btn-1').click(function () {
		            $('#msglist-box-1').show();
		            $('#msgpl-box2,#msglist-box-3').hide();
		            $('#msglist-btn-2,#msglist-btn-3').removeClass("on")
		            $(this).addClass("on");
		        })
		        $('#msglist-btn-2').click(function () {
		            $('#msgpl-box2').show();
		            $('#msglist-box-1,#msglist-box-3').hide();
		            $('#msglist-btn-1,#msglist-btn-3').removeClass("on")
		            $(this).addClass("on");
		        })
		        $('#msglist-btn-3').click(function () {
		            $('#msglist-box-3').show();
		            $('#msglist-box-1,#msgpl-box2').hide();
		            $('#msglist-btn-1,#msglist-btn-2').removeClass("on")
		            $(this).addClass("on");
		        })
		        
		        if (pageNum == 1) {
					lastOfficialMsgId = r['data'][0]['id'];
					readOfficialMsg(lastOfficialMsgId);
					$('#msglist-box-1 dt').click(function () {
			            $(this).next().toggle()
			        })
			        $('#msglist-box-1 dd a').click(function () {
			            $(this).parent().parent().toggle()
			        })
				}
		        else {
		        	$('#msglist-box-1 dt').click(function () {
			            $(this).next().toggle()
			        })
			        $('#msglist-box-1 dd a').click(function () {
			            $(this).parent().parent().toggle()
			        })
		        }
		        
			} 
			else {
				$('#msgno').show();
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
				$('#officialMsg').css('height','10px');
				$('#officialMsg').css('width','10px');
				$('#officialMsg').css('padding',0);
				$('#officialMsg').show();
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
		url:'../message/readofficial',
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
		url:'../message/read',
		type:'post',
		data:{id:msgId},
		async:false,
		dataType:'json',
		success:function(r){
			
			if($('.msg'+msgId).hasClass('readed')){				
			}else{
			MSG_NUM--;
			GROUP_NUM--;
			$('.msg'+msgId).addClass('readed');
			}
		
			if (r.code == 0) {
				if(GROUP_NUM <= 0){
					$('#groupMsg').hide();
				}
				if (MSG_NUM <= 0) {
					$('.t-msg-link span').hide();
				}
				else {
					$('.t-msg-link span').show();
					$('.t-msg-link span').text(MSG_NUM);
					$('#groupMsg').text(GROUP_NUM);
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
		url:'../group/pushingroup',
		type:'post',
		data:{groupId:groupId,userId:userId,msgId:msgId},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
//				alert('操作成功');
				systemTip('操作成功');
				$('#btnbox'+msgId).html('已同意');
			}
			else {
//				alert(r.message);
				systemTip(r.message);
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
		url:'../group/refuseingroup',
		type:'post',
		data:{groupId:groupId,userId:userId,msgId:msgId},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
//				alert('操作成功');
				systemTip('操作成功');
				$('#btnbox'+msgId).html('已拒绝');
			}
		}
	})
}

//同意转让组
function transfer(groupId,userId,msgId)
{
	$.ajax({
		url:'../group/transfer',
		type:'post',
		data:{groupId:groupId,userId:userId,msgId:msgId},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
//				alert('操作成功');
				systemTip('操作成功');
				$('#btnbox'+msgId).html('已同意');
			}
			else {
//				alert(r.message);
				systemTip(r.message);
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
		url:'../group/refusetransfer',
		type:'post',
		data:{groupId:groupId,userId:userId,msgId:msgId},
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
//				alert('操作成功');
				systemTip('操作成功');
				$('#btnbox'+msgId).html('已拒绝');
			}
		}
	})
}



function getCommentMsg(pageNum){
	$.ajax({
		url:'../comment/getcomment',
		type:'get',
		data:{page:pageNum},
		dataType:'json',
		async:false,
		success:function(r){
			var htmlstr='<ul class="comment_list">';
		
			for(var i in r['list']){
				if(r['list'][i]['status']==2){
				htmlstr+='<li><img src="'+r['list'][i]['fromhead']+'" name="'+r['list'][i]['headlink']+'"><div class="pl-txt">'+r['list'][i]['fromname']+'<p>回复了你：'+r['list'][i]['content']+'</p>'+r['list'][i]['time_before']+'</div><a href="javascript:showzp('+r['list'][i]['workId']+','+r['list'][i]['id']+','+r['list'][i]['workType']+');">查看</a></li>';
				}
				else{
					htmlstr+='<li><img src="'+r['list'][i]['fromhead']+'" name="'+r['list'][i]['headlink']+'"><div class="pl-txt">'+r['list'][i]['fromname']+'<p>回复了你：'+r['list'][i]['content']+'</p>'+r['list'][i]['time_before']+'</div><a href="javascript:showzp_not('+r['list'][i]['workId']+','+r['list'][i]['id']+','+r['list'][i]['workType']+');" class="dis">查看</a></li>';
				}
			}
			htmlstr+="</ul>";
			$("#msgpl-box2").html(htmlstr);
			if(r.showcount>99){
			$("#showcount").html("99+");
			}
			else if (r.showcount==0){
			$("#showcount").hide();	
			}else{
			$("#showcount").show();
			$("#showcount").html(r.showcount);
			}
			$app.pager('page_pl','getCommentMsg','',pageNum,r.count,r.pagesize);	
		}
	});
}
function showzp(workid,id,type){
	$.ajax({
		url:'../comment/getbaseid',
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
		url:'../comment/getbaseid',
		type:'get',
		data:{workid:workid,type:type},
		dataType:'json',
		async:false,
		success:function(r){
		window.open(r);
		}
	});
	
}

function agreeGroupCer(groupId,toUserId,msgId)
{
	var data = {};
	data.groupId = groupId;
	data.toUserId = toUserId;
	data.msgId = msgId;
    $.ajax({
        url:'/group/agree-group-cer',
        type:'post',
        data:data,
        dataType:'json',
        async:false,
        success:function(r){
            if (r.code == 0) {
                systemTip('操作成功');
                $('#btnbox'+msgId).html('已同意');
            }
            else {
                systemTip(r.message);
            }
        }
    })
}

function refuseGroupCer(groupId,toUserId,msgId)
{
    var data = {};
    data.groupId = groupId;
    data.toUserId = toUserId;
    data.msgId = msgId;
    $.ajax({
        url:'/group/refuse-group-cer',
        type:'post',
        data:data,
        dataType:'json',
        async:false,
        success:function(r){
            if (r.code == 0) {
                systemTip('操作成功');
                $('#btnbox'+msgId).html('已拒绝');
            }
        }
    })
}

