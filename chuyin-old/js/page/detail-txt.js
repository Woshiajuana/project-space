var workType = queryString('type');
$(function(){
	//拉取作品信息
	getWorkInfo(workType,queryString('id'),workInfoCallback);
	//拉取评论信息
	commentPage(1);
	//增加浏览量
	view(workType,queryString('id'));
	viewaddscore(queryString('type'),queryString('id'));
	if (queryString('groupId')) {
		$('.navbox li a').removeClass('on');
		$('.navbox li:eq(5) a').addClass('on');
		$('.position').html('<a href="group.html?id='+queryString('groupId')+'">小组创作</a><span>></span><span>作品详情</span>');
	}else if(queryString('type')==AC_TXT || queryString('type')==AC_PIC || queryString('type')==AC_MUSIC){
		$('.navbox li a').removeClass('on');
		$('.navbox li:eq(4) a').addClass('on');
		$('.position').html('<a href="./collection.html">专题活动</a><span>></span><span>作品详情</span>');
		$("#download").hide();
	}
})

/*
 * 拉去作品信息的回调
 */
function workInfoCallback(r){
	if(r.code == 0){
		var data = r['data'];
		//渲染数据
		//如果是我的作品，可以删除
		if(data['isMy'] == 1&&queryString('actId') == ''){
			$('.detail-box-l h2').html('<a href="javascript:delWork('+workType+',\''+data['id']+'\',delCallback);" class="link-1">删除</a><a href="javascript:editWork('+workType+',\''+data['id']+'\');" class="link-2">编辑</a>'+data['title']);
		}else{
			$('.detail-box-l h2').html(data['title']+'<a href="javascript:" id="jubao" style="text-indent:25px;" >举报此作品</a>');
		}
		if(data['show']==1){
			$(".detail-cancel li:eq(0)").hide();
		}else{
			$(".detail-cancel li:eq(0)").show();
		}
		var tagHtml = '';
		for(var i in data['tag']){
			tagHtml+='<a href="javascript:;">'+data['tag'][i]['name']+'</a>';
		}
		$('.biaoqianbox').html(tagHtml);
		//作品详情
		$('.detail-txt-info').html(data['content']);
		//作品缩略图
		//$('.bannerbox').css('background-image',"url(\""+data['urlMini']+"\")");
		//作品许可
		if(data['auth'] == 0){
			authTxt = '  作品版权归原作者所有，未经授权不得进行转载或使用，如有盗图等侵犯行为作者及POPPRO将追究责任';
		}else{
			authTxt = '  该作品不允许被用于任何营利用途；';
			if(data['authSignatureNeed'] == 1){
				authTxt+='转载需要注明作者:“'+data['authSignature']+'”；';
			}else{
				authTxt+='转载无需著名作者;';
			}
			if(data['authModify'] == 1){
				//展示下载button
				if(workType == 1){
					$('#download').show();
				}
				authTxt+='在符合著作权法的情况下，允许适当二次创作；';
			}else{
				authTxt+='严禁任何二次创作，后果自负；';
			}
			if(data['authRequireNeed'] == 1){
				authTxt+=data['authRequire'];
			}
			
			
		}
		$('.xuke').html('<span>作品许可</span>'+authTxt);
		//投票数量
		$('#voteNum').text(data['voteCount']);
		//收藏数量
		$('#collectNum').text(data['collectCount']);
		//拉取个人信息
		getUserInfo(data['userId'],DetailWorkUserInfoCallback);
	}else {
			systemTip('作品不存在');
		window.location.href = 'list-music.html';
	}
}

/*
 * 删除作品的回调
 */
function delCallback(r){
	if(r.code == 0){
		systemTip('删除成功');
		history.go(-1);
	}else{
		systemTip(r.msg);
	}
}