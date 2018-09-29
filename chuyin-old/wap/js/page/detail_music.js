var workType = queryString('type');

$(function(){
	//拉取作品信息
	getWorkInfo(workType,queryString('id'),workInfoCallback);
	//增加浏览量
	view(workType,queryString('id'));
	$(".detail-msg-ico").attr("href","./detail-pl.html?type="+workType+"&id="+queryString('id'));
	commentPage(1);
})

function commentPage(page)
{
		wId = queryString('id');
		wType = queryString("type");
		$.ajax({
			url:'/comment/list',
			type:'post',
			data:{wId:wId,wType:wType,page:page},
			async:false,
			dataType:'json',
			success:function(r){
				 if(r.count<1){
						$(".detail-msg-ico").html("");
				 }else{
						$(".detail-msg-ico").html('<i>'+r.count+'</i>')	
				 }
			}
		})
	}
/*
 * 拉去作品信息的回调
 */
function workInfoCallback(r){
	console.dir(r);
	if(r.code == 0){
		var data = r['data'];
		$.ajax({
			url: "/work/getwork_user",
			type: "POST",
			dataType : 'json',
			data: {uid:data['userId'],webType:"wap"},
			success: function (r){
				$(".detail-top-l").html('<span><a href="'+r.uLink+'"><img src="'+r.head+'" ></a></span><h3><a style="color:#999;text-decoration:none;" href="'+r.uLink+'">'+r.username+'</a></h3><p>'+data.date+' 发布</p>')
			}
		});
		$(".ico-detail-top-1").html(data.voteCount);
		$(".ico-detail-top-2").html(data.collectCount);
		$(".main-head h1").html(data.title);
		$('#musicUrl').attr('src',data['url']);
		 $( 'audio' ).audioPlayer({
		        strPlay: '<span><img src=\'../images/ico-play.png \'></span>',
		        strPause: '<span><img src=\' ../images/ico-pause.png \'></span>',
		        strVolume:'<span class=\' volume\'></span>'
		   });
		$('.music-img img').attr('src',data['urlMini']);
		if(data['show']==1){
			$(".detail-top-r a:eq(2)").hide();
		}else{
			$(".detail-top-r a:eq(2)").show();
		}
		//播放增加播放数
		$('.audioplayer-playpause').click(function(){
			//增加浏览量
			view(workType,queryString('id'));
		})
		var tagHtml = '';
		for(var i in data['tag']){
			tagHtml+='<span>'+data['tag'][i]['name']+'</span>';
		}
		$('.detail-tag').html(tagHtml);
		//作品简介
		$('.detail-jianjie p').html(data['desc']);
		//作品缩略图
		//$('.bannerbox').css('background-image',"url(\""+data['urlMini']+"\")");
		//作品许可
		if(data['auth'] == 0){
			authTxt = ' 作品版权归原作者所有，未经授权不得进行转载或使用，如有盗图等侵犯行为作者及POPPRO将追究责任 ';
		}else{
			authTxt = '  该作品不允许被用于任何营利用途；';
			if(data['authSignatureNeed'] == 1){
				authTxt+='转载需要注明作者:“'+data['authSignature']+'”；';
			}else{
				authTxt+='转载无需署名作者;';
			}
			if(data['authModify'] == 1){
				//展示下载button
				if(workType == 2){
					$('#download').show();
				}
				authTxt+='在符合著作权法的情况下，允许适当二次创作；';
			}else{
				$('#download').hide();
				authTxt+='严禁任何二次创作，后果自负；';
			}
			if(data['authRequireNeed'] == 1){
				authTxt+=data['authRequire'];
			}
			
		}
		$('.detail-xuke p').html(authTxt);
		//拉取个人信息
		getUserInfo(data['userId'],DetailWorkUserInfoCallback);
	}else {
		systemTip('作品不存在');
		window.location.href = 'main.html';
	}
}