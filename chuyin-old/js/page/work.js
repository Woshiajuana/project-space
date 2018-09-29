/*
 *  post-music.html页面的js
 *  
 */

var useTagArr = [];//标签数组
var tagSelectedNum = $('.flagbox-2 ul li').length;//选择标签数量
var tagPersonal = '';//选择的人物标签,默认是空 
var tagPersonalArr = [];
var ac_id = queryString('aId');
var wId =  queryString('id');
var ac_type=queryString('type');
var mp3File = '';//mp3文件
var picSmall = '';//缩略图
var mp3Length = 0;//mp3音乐长度
var zipFile = '';//zip文件
var picBig = '';//缩略图

if(findInUrl('music') == true){
	workType = WORK_MUSIC;
}else if(findInUrl('image') == true){
	workType = WORK_PIC;
}else{
	workType = WORK_TXT;
}

$(function(){
	
	if(!checkLogin()){
		location.href = 'main.html';
	}
	//如果是修改操作
	if(queryString('opt') == 'edit'){
		getWorkInfo(ac_type,wId,getWorkInfoCallback);
		//我要投稿改成作品编辑
		$('.post-title span').text('作品编辑');
		document.title = 'POPPRO | 作品编辑';
	}else{
		$('.post-title span').text('我要投稿');
	}
	

	// a标签屏蔽
	if(ac_id){
		if(ac_type==6){
			$(".post-top li").eq(1).hide();
			$(".post-top li").eq(2).hide();
			$(".post-top li a").eq(0).attr("href","");
		}
		else if(ac_type==4){
			$(".post-top li").eq(0).hide();
			$(".post-top li").eq(1).hide();
			$(".post-top li a").eq(2).attr("href","");
		}
		else if(ac_type == 5){
			$(".post-top li").eq(2).hide(); 
			$(".post-top li").eq(0).hide();
			$(".post-top li a").eq(1).attr("href","");
		}
		//隐藏掉修改
		$('.sqbox ul li').eq(2).hide();
	}else if(queryString('opt') == 'edit'){
		if(workType==3){
			$(".post-top li").eq(1).hide();
			$(".post-top li").eq(2).hide();
			$(".post-top li a").eq(0).attr("href","");
		}
		else if(workType==1){
			$(".post-top li").eq(0).hide();
			$(".post-top li").eq(1).hide();
			$(".post-top li a").eq(2).attr("href","");
		}
		else if(workType == 2){
			$(".post-top li").eq(2).hide(); 
			$(".post-top li").eq(0).hide();
			$(".post-top li a").eq(1).attr("href","");
		}
	}
	//经常使用标签初始化
	$('.add-btn').css('cursor','pointer').click(function(){
		var tagName = $('.tagsbox .input-1').val();
		addTag(tagName);
	});
	
	//经常使用标签
	//人物标签
	tagList(workType,listTagCallback);
	personalHotTag(workType,postHotTagCallback);
	
	//标签选中事件
	$('.tagUse dd,.tagMan dd').css('cursor','pointer').click(function(){
		//获取已选择标签数量
		if(tagSelectedNum>=10){
			alert('最多选择十个标签哦');
			return ;
		}
		//判断是否已经选择过了
		var tid = parseInt($(this).children('span').attr('tid'));
		//如果是人物标签
		if($.inArray(tid,tagPersonalArr)!==-1){
			//人物标签只能选择一个
			if(tagPersonal!=''){
				alert('只能选择一个人物标签哦');
				return ;
			}
			tagPersonal = tid;
		}
		var tname = $(this).children('span').text();
		if($('.flagbox-2 ul li[tid="'+tid+'"]').length>=1){
			alert('您已经选择过这个标签了');
			return ;
		}
		//更新选择数量
		tagSelectedNum++;
		$('.flagbox-2 h3 span').text(tagSelectedNum+'/10');
		$('.flagbox-2 ul').append('<li tid="'+tid+'"><a class="del">删除</a>'+tname+'</li>');
		$('.flagbox-2 ul li .del').css('cursor','pointer');
		//标签删除
		$('.flagbox-2 ul li').unbind('click').click(function(){
			//如果是人物标签
			if($.inArray(tid,tagPersonalArr)!==-1){
				//人物标签只能选择一个
				tagPersonal = '';
			}
 			tagSelectedNum--;
			$(this).remove();
			$('.flagbox-2 h3 span').text(tagSelectedNum+'/10');
		});
	})
	
	//我要投稿链接切换
	$('.post-top li').each(function(){
		var strHref = window.location.href; 
		var intPos = strHref.indexOf("?");  // 参数开始位置
		if(intPos == -1){
			jumpUrl = $(this).children('a').attr('href');
		}else{
			var strRight = strHref.substr(intPos + 1);
			var jumpUrl = $(this).children('a').attr('href')+'?'+strRight;
		}
		$(this).children('a').attr('href',jumpUrl);
	})
})

/*
 * 添加标签
 */
function htmlAddTag(tid,tname){
	if($('.flagbox-2 ul li[tid="'+tid+'"]').length>=1){
		alert('您已经选择过这个标签了');
		return ;
	}
	if(tid == 0){
		return ;
	}
	tagSelectedNum++;
	$('.flagbox-2 h3 span').text(tagSelectedNum+'/10');
	$('.flagbox-2 ul').append('<li tid="'+tid+'"><a class="del">删除</a>'+tname+'</li>');
	$('.flagbox-2 ul li .del').css('cursor','pointer');
	if($.inArray(tid,tagPersonalArr)!==-1){
		//人物标签只能选择一个
		tagPersonal = tid;
	}
	//标签删除
	$('.flagbox-2 ul li').unbind('click').click(function(){
		//如果是人物标签
		var tid = parseInt($(this).attr('tid'));
		if($.inArray(tid,tagPersonalArr)!==-1){
			//人物标签只能选择一个
			tagPersonal = '';
		}
		tagSelectedNum--;
		$(this).remove();
		$('.flagbox-2 h3 span').text(tagSelectedNum+'/10');
	});
}




function addTag(name){

    if(tagSelectedNum>=10){
        alert('最多选择十个标签哦');
        return ;
    }
	var data = {};
	data.name = name;
	data.type = workType;
	$.ajax({
		url: "/tag/add",
		type: "POST",
		dataType : 'json',
		data: data,
		success: function (r){
			if(r.code == 0){
				htmlAddTag(r.tagId,name);
				$('.tagsbox .input-1').val('');
			}else{
				alert(r.msg);
			}
		}
	});
}

function postHotTagCallback(r){
	var useTagHtml = '<dt>经常使用标签</dt>';
	for(var i in r){
		useTagHtml  += '<dd><span tid='+r[i].id+'>'+r[i].name+'</span></dd>';
	}
	$('.tagUse').html(useTagHtml);
}


function uploadMusic(){
	var data = {};
	data.wId = wId;
	data.title = $.trim($('input[name="title"]').val());//标题
	data.mp3File = mp3File;//mp3
	data.category = $('#selectbox-1').val();//种类
	data.picSmall = picSmall;//缩略图
    data.lyric = $.trim($('.lyric').val());//描述
	data.workDesc = $.trim($('.workDesc').val());//描述
	data.mp3Length = mp3Length;//音乐长度
	//标签
	var tagArr = [];
	$('.tagList ul li').each(function(){
		tagArr.push($(this).attr('tid'));
	})
	data.tag = tagArr.toString();
	//发布规则
	//授权许可
	data.auth = $('input[name="auth"]')[0].checked == true ? 0 : 1;
	if(data.auth == 1){
		//仅限非盈利使用
		data.authSignature = $('input[name="authSignature"]')[0].checked == true ? 1 : 0;
		//需要署名
		data.authSignatureNeed = $('input[name="authSignatureNeed"]')[0].checked == true ? 1 : 0;
		if(1 == data.authSignatureNeed){
			data.authSignature = $('input[name="authSignature"]').val();
			data.authSignature = $.trim(data.authSignature);
			if(data.authSignature == ''){
				alert('请填写署名');
				return ;
			}
		}
		//允许改动作品
		data.authModify = $('input[name="authModify"]')[0].checked == true ? 1 : 0;
		//其他要求
		data.authRequireNeed = $('input[name="authRequireNeed"]')[0].checked == true ? 1 : 0;
		if(1 == data.authRequireNeed){
			data.authRequire = $('input[name="authRequire"]').val();
			data.authRequire = $('input[name="authRequire"]').val();
			data.authRequire = $.trim(data.authRequire);
			if(data.authRequire == ''){
				alert('请填写其他要求');
				return ;
			}
		}
	}
	//人物标签
	data.tagPersonal = tagPersonal;
	if(data.title == ''){
		alert('请输入标题');
	}else if(data.workDesc == ''){
		alert('请输入作品描述');
	}else if(ac_type>3){
		data.actid=ac_id;
        data.typeId = queryString('typeId');
		$.ajax({
			url: "/workofficial/savemusic",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					if(queryString('opt') == 'edit'){
						alert("编辑成功，请等待重新审核");
					}else{
						alert("投稿成功，请等待审核");
					}
					window.location.href = './user-works.html';
				}else if(r.code == 101){
					alert('请先登录');
					location.href = 'https://www.poppro.cn/html/login.html';
				}else{
					alert(r.msg);
				}
			}
		});
	}else{
		//如果是小组上传
		if(queryString('groupId')!=null){
			data.groupId = queryString('groupId');
		}
		$.ajax({
			url: "/work/savemusic",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					if(queryString('opt') == 'edit'){
						alert("编辑成功，请等待重新审核");
					}else{
						alert("投稿成功，请等待审核");
					}
					window.location.href = './user-main.html';
				}else if(r.code == 101){
					alert('请先登录');
					location.href = 'https://www.poppro.cn/html/login.html';
				}else{
					alert(r.msg);
				}
			}
		});
	}
}




function uploadTxt(){
	var data = {};
	data.wId = wId;
	data.title = $.trim($('input[name="title"]').val());//标题
	data.category = $('input[name="upload-type"]:checked').attr('value');//种类
	data.content = $.trim($('.content').val());//描述
	//标签
	var tagArr = [];
	$('.tagList ul li').each(function(){
		tagArr.push($(this).attr('tid'));
	})
	data.tag = tagArr.toString();
	//发布规则
	//授权许可
	data.auth = $('input[name="auth"]')[0].checked == true ? 0 : 1;
	if(data.auth == 1){
		//仅限非盈利使用
		data.authSignature = $('input[name="authSignature"]')[0].checked == true ? 1 : 0;
		//需要署名
		data.authSignatureNeed = $('input[name="authSignatureNeed"]')[0].checked == true ? 1 : 0;
		if(1 == data.authSignatureNeed){
			data.authSignature = $('input[name="authSignature"]').val();
			data.authSignature = $.trim(data.authSignature);
			if(data.authSignature == ''){
				alert('请填写署名');
				return ;
			}
		}
		//允许改动作品
		data.authModify = $('input[name="authModify"]')[0].checked == true ? 1 : 0;
		//其他要求
		data.authRequireNeed = $('input[name="authRequireNeed"]')[0].checked == true ? 1 : 0;
		if(1 == data.authRequireNeed){
			data.authRequire = $('input[name="authRequire"]').val();
			data.authRequire = $('input[name="authRequire"]').val();
			data.authRequire = $.trim(data.authRequire);
			if(data.authRequire == ''){
				alert('请填写其他要求');
				return ;
			}
		}
	}
	//人物标签
	data.tagPersonal = tagPersonal;
	if(data.title == ''){
		alert('请输入标题');
	}else if(data.workDesc == ''){
		alert('请输入作品描述');
	}else if(ac_type>3){
		data.actid=ac_id;
        data.typeId = queryString('typeId');
		$.ajax({
			url: "/workofficial/savetxt",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					if(queryString('opt') == 'edit'){
						alert("编辑成功，请等待重新审核");
					}else{
						alert("投稿成功，请等待审核");
					}
					window.location.href = './user-works.html';
				}else if(r.code == 101){
					alert('请先登录');
					location.href = 'https://www.poppro.cn/html/login.html';
				}else{
					alert(r.msg);
				}
			}
		});
	}else{
		//如果是小组上传
		if(queryString('groupId')!=null){
			data.groupId = queryString('groupId');
		}
		$.ajax({
			url: "/work/savetxt",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					if(queryString('opt') == 'edit'){
						alert("编辑成功，请等待重新审核");
					}else{
						alert("投稿成功，请等待审核");
					}
					window.location.href = './user-main.html';
				}else if(r.code == 101){
					alert('请先登录');
					location.href = 'https://www.poppro.cn/html/login.html';
				}else{
					alert(r.msg);
				}
			}
		});
	}
}



function uploadPic(){
	var data = {};
	data.wId = wId;
	data.title = $.trim($('#titlebox').val());//标题
	if($('#upload-type-btn1')[0].checked == true){
		data.picBig = picBig == 'null' ? '':picBig;//大图
		data.picSmall = picSmall;//缩略图
		data.zipFile = '';
	}else{
		data.picBig = '';
		data.zipFile = zipFile == 'null' ? '':zipFile;//mp3
		data.picSmall = picSmall;//缩略图
	}
	data.category = $('#selectbox-1').val();//种类
	data.workDesc = $.trim($('.workDesc').val());//描述
	//标签
	var tagArr = [];
	$('.tagList ul li').each(function(){
		tagArr.push($(this).attr('tid'));
	})
	data.tag = tagArr.toString();
	//发布规则
	//授权许可
	//人物标签
	data.tagPersonal = tagPersonal;
	data.auth = $('input[name="auth"]')[0].checked == true ? 0: 1;
	if(data.auth == 1){
		//仅限非盈利使用
		data.authSignature = $('input[name="authSignature"]')[0].checked == true ? 1 : 0;
		//需要署名
		data.authSignatureNeed = $('input[name="authSignatureNeed"]')[0].checked == true ? 1 : 0;
		if(1 == data.authSignatureNeed){
			data.authSignature = $('input[name="authSignature"]').val();
			data.authSignature = $.trim(data.authSignature);
			if(data.authSignature == ''){
				alert('请填写署名');
				return ;
			}
		}
		//允许改动作品
		data.authModify = $('input[name="authModify"]')[0].checked == true ? 1 : 0;
		//其他要求
		data.authRequireNeed = $('input[name="authRequireNeed"]')[0].checked == true ? 1 : 0;
		if(1 == data.authRequireNeed){
			data.authRequire = $('input[name="authRequire"]').val();
			data.authRequire = $('input[name="authRequire"]').val();
			data.authRequire = $.trim(data.authRequire);
			if(data.authRequire == ''){
				alert('请填写其他要求');
				return ;
			}
		}
	}
	if(data.title == ''){
		alert('请输入标题');
	}else if(zipFile == ''&&picBig == ''){
		alert("请上传图片或3d");
	}else if(data.workDesc == ''){
		alert('请输入作品描述');
	}else if(picSmall == ''){
		alert('请上传图片缩略图');
	}else if(ac_type>3){
		data.actid=ac_id;
        data.typeId = queryString('typeId');
		$.ajax({
			url: "/workofficial/savepic",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					if(queryString('opt') == 'edit'){
						alert("编辑成功，请等待重新审核");
					}else{
						alert("投稿成功，请等待审核");
					}
					window.location.href = './user-works.html';
				}else if(r.code == 101){
					alert('请先登录');
					location.href = 'https://www.poppro.cn/html/login.html';
				}else{
					alert(r.msg);
				}
			}
		});
	}
	else{
		//如果是小组上传
		if(queryString('groupId')!=null){
			data.groupId = queryString('groupId');
		}
		$.ajax({
			url: "/work/savepic",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					if(queryString('opt') == 'edit'){
						alert("编辑成功，请等待重新审核");
					}else{
						alert("投稿成功，请等待审核");
					}
					window.location.href = './user-main.html';
				}else if(r.code == 101){
					alert('请先登录');
					location.href = 'https://www.poppro.cn/html/login.html';
				}else{
					alert(r.msg);
				}
			}
		});
	}
}
/*
 * 拉取人物标签的回调
 */
function listTagCallback(r){
	var html = '';
	for(var i in r){
		html += '<dd style="cursor: pointer;"><span tid="'+r[i]['id']+'">'+r[i]['name']+'</span></dd>';
		tagPersonalArr.push(r[i]['id']);
	}
	$('.tagMan').append(html);
}




/*
 * 拉取作品信息的回调
 */
function getWorkInfoCallback(r){
	if(r.code == 0){
		data = r.data;
		if(data.stateVerify == 1){
			$('.post-btn-box a').text('保存').attr('href','javascript:saveWork()');
			$('#titlebox').val(data.title).attr('readonly','readonly');
			words_deal($('#titlebox'),30,$('#titlebox-count'));//初始化title数
			//音乐作品
			if(workType == WORK_MUSIC){
				//类别
				setTimeout(function(){
					$('#dk0-combobox').text($('#dk0-'+data.category).attr('text'));
					$('#dk0-listbox').remove();
				},500);
				if(ac_type){
					var wordCount = 1000;
				}else{
					var wordCount = 500;
				}         
				words_deal($('#textarea-1'),wordCount,$('#descbox-count'));//初始化title数
				$('.imgbox').html('<img width="240" src="'+data.urlMini+'">');
				$('#textarea-1').val(data.desc);
                $('#textarea-2').val(data.lyric);

				words_deal($('#textarea-1'),500,$('#descbox-count'));//初始化title数
				$('.upload-music-box').hide();
//				setTimeout(function(){
//					$('#file_upload_pic').hide();
//					$('.flagbox-1-tip').hide();
//				},500);
				mp3File = data.url;//mp3
				picSmall = data.urlMini;//缩略图
			//图片作品	
			}else if(workType == WORK_PIC){
				//类别
				setTimeout(function(){
					$('#dk0-combobox').text($('#dk0-'+data.category).attr('text'));
					$('#dk0-listbox').remove();
				},500);
				//图片作品
				if(data.urlZip == ''){
					$('#upload-type-btn1')[0].checked = true;
				}else{
					$('#upload-type-btn2')[0].checked = true;
					$('#file_upload_pic1').show();
				}
				$('#upload-type-btn1').attr('disabled',true);
				$('#upload-type-btn2').attr('disabled',true);
				$('#upload-type-2').remove();
				$('#upload-type-1').remove();
				
				//放缩略图
				$('.imgbox').html('<img width="240" src="'+data.urlMini+'">');
				$('#textarea-1').val(data.desc);
				if(ac_type){
					var wordCount = 5000;
				}else{
					var wordCount = 500;
				}
		         
				words_deal($('#textarea-1'),wordCount,$('#descbox-count'));//初始化title数
				
				zipFile = data.zipFile;//mp3
				picSmall =data.urlMini;//缩略图
			//文字作品	
			}else{
				$('#textarea-1').val(data.content).attr('readonly',true);
				words_deal($('#textarea-1'),5000,$('#descbox-count'));//初始化文字作品内容数
				$('#upload-type-btn'+data.category)[0].checked = true;
			}
			//加标签
			setTimeout(function(){
				for(var i in data.tag){
					htmlAddTag(data.tag[i]['id'],data.tag[i]['name']);
				}
			},500)
			
			if(data.auth == 0){
				$('.authGuize').html('<p>没有授权许可条件</p>');
//				$('input[name="auth"]')[0].checked = true;
//				$('.sqbox').hide();
			}else{
				$('.authGuize p').eq(1).hide();
				$('input[name="auth"]').attr('disabled',true);
				$('input[name="authCondition"]')[0].checked = true;
				if(data.authSignatureNeed == 1){
					$('input[name="authSignatureNeed"]').eq(0)[0].checked = true;
					$('input[name="authSignature"]').val(data.authSignature).attr('disabled',true);
				}else{
					$('input[name="authSignatureNeed"]').eq(1)[0].checked = true;
					
				}
				if(data.authModify == 1){
					$('input[name="authModify"]').eq(0)[0].checked = true;
				}else{
					$('input[name="authModify"]').eq(1)[0].checked = true;
				}
				
				if(data.authRequireNeed == 1){
					$('input[name="authRequireNeed"]').eq(0)[0].checked = true;
					$('input[name="authRequire"]').val(data.authRequire).attr('disabled',true);
				}else{
					$('input[name="authRequireNeed"]').eq(1)[0].checked = true;
					
				}
			}
			
			$('input[type=radio]').attr('disabled',true);
		}else{
			$('#titlebox').val(data.title);
			$('.post-btn-box a').text('保存');
			words_deal($('#titlebox'),30,$('#titlebox-count'));//初始化title数
			//音乐作品
			if(workType == WORK_MUSIC){
				//类别
				setTimeout(function(){
					$('#dk0-combobox').text($('#dk0-'+data.category).attr('text'));
					$('#selectbox-1').val(data.category);
                    words_deal($('#textarea-1'),500,$('#descbox-count'));//初始化title数
                    words_deal($('#textarea-2'),500,$('#lyricbox-count'));//初始化歌词数
				},500);
				$('.imgbox').html('<img width="240" src="'+data.urlMini+'">');
				$('#textarea-1').val(data.desc);
                $('#textarea-2').val(data.lyric);

				mp3File = data.url;//mp3
				picBig = data.picBig;//大图
				picSmall = data.urlMini;//缩略图
				mp3Length = data.mLength;
				$('.upload-music-box').append('<div id="SWFUpload_10_0" class="uploadify-queue-item"><div class="cancel"><a href="javascript:cancelUpload();">X</a></div>	<span class="fileName">'+data.url+'</span><span class="data"></span>					<div class="uploadify-progress"><div class="uploadify-progress-bar" style="width: 100%;"><!--Progress Bar--></div>					</div>				</div>');
			//图片作品	
			}else if(workType == WORK_PIC){
				zipFile = data.urlZip;//mp3
				picBig = data.url;//mp3
				picSmall = data.urlMini;//缩略图
				//类别
				setTimeout(function(){
					$('#dk0-combobox').text($('#dk0-'+data.category).attr('text'));
					$('#selectbox-1').val(data.category);
				},500);
				//图片作品
				if(zipFile == ''||zipFile == null||zipFile == 'null'){
					$('#upload-type-btn1')[0].checked = true;
				}else{
					$('#upload-type-btn2')[0].checked = true;
					$('#file_upload_pic1').show();
				}
				//放缩略图
				$('.imgbox').html('<img width="240" src="'+data.urlMini+'">');
				$('#textarea-1').val(data.desc);
				if(ac_type){
					var wordCount = 5000;
				}else{
					var wordCount = 500;
				}
				words_deal($('#textarea-1'),wordCount,$('#descbox-count'));//初始化title数
				if(zipFile == ''||zipFile == null||zipFile == 'null'){
					$('#upload-type-1').append('<div id="SWFUpload_10_0" class="uploadify-queue-item"><div class="cancel"><a href="javascript:cancelUpload();">X</a></div>	<span class="fileName">'+data.url+'</span><span class="data"></span>					<div class="uploadify-progress"><div class="uploadify-progress-bar" style="width: 100%;"><!--Progress Bar--></div>					</div>				</div>');
					$('#upload-type-1').show();
					$('#upload-type-2').hide();
				}else{
					$('#upload-type-2').append('<div id="SWFUpload_10_0" class="uploadify-queue-item"><div class="cancel"><a href="javascript:cancelUpload();">X</a></div>	<span class="fileName">'+data.urlZip+'</span><span class="data"></span>					<div class="uploadify-progress"><div class="uploadify-progress-bar" style="width: 100%;"><!--Progress Bar--></div>					</div>				</div>');
					$('#upload-type-2').show();
					$('#upload-type-1').hide();
				}
			//文字作品	
			}else{
				$('#upload-type-btn'+data.category)[0].checked = true;
				$('#textarea-1').val(data.content);
				words_deal($('#textarea-1'),5000,$('#descbox-count'));//初始化文字作品内容数
			}
			//加标签
			setTimeout(function(){
				for(var i in data.tag){
					htmlAddTag(data.tag[i]['id'],data.tag[i]['name']);
				}
			},500)
			
			if(data.auth == 0){
				$('input[name="auth"]')[0].checked = true;
			}else{
				$('input[name="authCondition"]')[0].checked = true;
				if(data.authSignatureNeed == 1){
					$('input[name="authSignatureNeed"]').eq(0)[0].checked = true;
					$('input[name="authSignature"]').val(data.authSignature);
				}else{
					$('input[name="authSignatureNeed"]').eq(1)[0].checked = true;
					
				}
				if(data.authModify == 1){
					$('input[name="authModify"]').eq(0)[0].checked = true;
				}else{
					$('input[name="authModify"]').eq(1)[0].checked = true;
				}
				
				if(data.authRequireNeed == 1){
					$('input[name="authRequireNeed"]').eq(0)[0].checked = true;
					$('input[name="authRequire"]').val(data.authRequire);
				}else{
					$('input[name="authRequireNeed"]').eq(1)[0].checked = true;
				}
			}
			
		}
		
		
	}else{
		systemTip('请先登录','login.html');
		location.href = 'https://www.poppro.cn/html/login.html';
	}
	
}


/*
 * 保存修改的作品
 */
function saveWork(){
	var work_type=queryString('type');
	var data = {};
	data.id = queryString('id');
	data.tagPersonal = tagPersonal;
	var tagArr = [];
	$('.tagList ul li').each(function(){
		tagArr.push($(this).attr('tid'));
	})
	data.tag = tagArr.toString();
	//音乐作品
	if(workType == WORK_MUSIC){
		data.desc = $('.workDesc').val();
		data.picSmall = picSmall;
	//图片作品	
	}else if(workType == WORK_PIC){
		data.desc = $('.workDesc').val();
		data.picSmall = picSmall;
	}else{
		data.desc = $('.content').val();
	}
	data.type = ac_type;
	if(data.desc == ''){
		alert('请填写作品描述');
	}else{
		$.ajax({
			url: "/work/edit",
			type: "POST",
			dataType : 'json',
			data: data,
			success: function (r){
				if(r.code == 0){
					alert("修改成功,请等待重新审核");
					if(work_type == WORK_TXT || work_type == AC_TXT){
					location.href="./detail-txt.html?id="+queryString('id')+"&type="+work_type;
					}else if(work_type == WORK_PIC || work_type == AC_PIC){
						location.href="./detail-img.html?id="+queryString('id')+"&type="+work_type;
					}else{
						location.href="./detail-music.html?id="+queryString('id')+"&type="+work_type;
					}
				}else if(r.code == 101){
					alert('请先登录');
					location.href = 'https://www.poppro.cn/html/login.html';
				}else{
					alert(r.msg);
				}
			}
		});
	}
}


/*
 * 取消掉编辑作品默认的上传文件
 */
function cancelUpload(){
	$('#SWFUpload_10_0').remove();
	if(!(workType == 3 || workType == 6)){
    	$('.imgbox img').remove();
    }
	return ;
}
