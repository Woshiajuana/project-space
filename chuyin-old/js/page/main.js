$(function(){

	
	
	// kv 展示
	$.ajax({
		url: "/work/showkv",
		type: "POST",
		dataType : 'json',
		data: {},
		async: true,
		success:function(r){
		var htmlstr=  '<ul class="slides">';
		for(var i in r){
		
			if(r[i]['url']){
			htmlstr+="<li name='"+r[i]['url']+"'style='background: url("+r[i]['picUrl']+") 50% 0 no-repeat;'></li>";
			}else{
			htmlstr+="<li style='background: url("+r[i]['picUrl']+") 50% 0 no-repeat;'></li>";
			}
		}
			htmlstr+="</ul>";
		$(".flexslider").html(htmlstr);
		
	    $('.flexslider').flexslider({
            directionNav: false,
            pauseOnAction: false,
			slideshowSpeed:5000
        });
	    $(".slides li").css('cursor','pointer').click(function(){
			var url=$(this).attr("name");
			window.open(url);
		});
		}
		
	});

    // 专题kv 展示
    $.ajax({
        url: "/work/showzhuantikv",
        type: "POST",
        dataType : 'json',
        data: {},
        async: true,
        success:function(r){
            var htmlstr=  '';
            for(var i in r){
                htmlstr+='<div class="swiper-slide">\n' +
                    '                    <img width="440" height="415"  name="'+r[i]['url']+'" src="'+r[i]['picUrl']+'">\n' +
                    '                </div>';
            }
            $(".swiper-container .swiper-wrapper").html(htmlstr);

            var mySwiper = new Swiper ('.swiper-container', {
                loop: true,

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            })
            $(".swiper-slide img").css('cursor','pointer').click(function(){
                var url=$(this).attr("name");
                window.open(url);
            });
        }

    });



	
	//小编推荐
	$.ajax({
		url: "/work/good",
		type: "POST",
		dataType : 'json',
		data: {},
		async: true,
		success: function (r){
			if(r.length<=0){
				$('.tuijian').html('<h1>暂无数据</h1>');
			}else{
				var html = '';
				for(var i in r){
					if(r[i]['workType'] == 2){
						var d3Html = '<span class="ico-3d"></span>';
					}else{
						var d3Html = '';
					}
					if(r[i]['count']>100000){
                        r[i]['count'] = '10万+';
					}

					if(r[i]['cat'] == 'erji'){
						//html += '<li><p><span class="imgbox">'+d3Html+'<img width="150" src="'+r[i]['urlMini']+'"></span><a class="play" target="_blank" href="'+r[i]['wLink']+'"></a></p>'+
                        //'<h4><a target="_blank" href="'+r[i]['wLink']+'" style="color:#333;">'+r[i]['title']+'</a></h4><div><a target="_blank" style="text-decoration:none;out-line: none;" href="'+r[i]['uLink']+'">'+r[i]['nick']+'</a><span class="'+r[i]['cat']+'">'+r[i]['count']+'</span></div></li>';
						html += '<li style="overflow: hidden">\n' +
                            '                    <p><img width="150" src="'+r[i]['urlMini']+'"></p>\n' +
                            '                    <h3 style="display: none;">'+r[i]['title']+'</h3>\n' +
                            '<div class="mask" style="display: none;"></div>'+
                            '                    <a  href="'+r[i]['wLink']+'" style="display: none;" class="main-play-ico"></a>\n' +
                            '                    <div style="display: none;" class="info">\n' +
                            '                        <label style="width:80px;">'+r[i]['nick']+'</label>\n' +
                            '                        <span class="ting">'+r[i]['count']+'</span>\n' +
                            '                    </div>\n' +
                            '                </li>';


					}else{
						//html += '<li><p><a target="_blank" href="'+r[i]['wLink']+'"><span class="imgbox">'+d3Html+'<img width="150" src="'+r[i]['urlMini']+'"></span></a></p>'+
                        //'<h4><a target="_blank" href="'+r[i]['wLink']+'" style="color:#333;">'+r[i]['title']+'</a></h4><div><a target="_blank" style="text-decoration:none;out-line: none;" href="'+r[i]['uLink']+'">'+r[i]['nick']+'</a><span class="'+r[i]['cat']+'">'+r[i]['count']+'</span></div></li>';
						html += '<li style="overflow: hidden">\n' +
                            '                    <p><img width="150" src="'+r[i]['urlMini']+'"></p>\n' +
                            '                    <h3 style="display: none;">'+r[i]['title']+'</h3>\n' +
                            '<div class="mask" style="display: none;"></div>'+
                            '                    <a  href="'+r[i]['wLink']+'"></a>\n' +
                            '                    <div style="display: none;" class="info">\n' +
                            '                        <label style="width:80px;">'+r[i]['nick']+'</label>\n' +
                            '                        <span class="kan">'+r[i]['count']+'</span>\n' +
                            '                    </div>\n' +
                            '                </li>';
					}
				}
				$('.tuijian').html(html);


			}$('.tuijian li').hover(function(){
                $(this).children('h3').show();
                $(this).children('.mask').show();
                $(this).children('.info').show();
                $(this).children('.main-play-ico').show();
            },function(){
                $(this).children('h3').hide();
                $(this).children('.mask').hide();
                $(this).children('.info').hide();
                $(this).children('.main-play-ico').hide();
            })
		}
	});
	
	//top10 列表
	$.ajax({
		url: "/work/top10",
		type: "POST",
		dataType : 'json',
		data: {},
		async: true,
		success: function (r){
			if(r.length<=0){
				$('#toplist').html('<h1>暂无数据</h1>');
			}else{
				var html = '';
				var index = 0;
				for(var i in r){
					index +=1;

                    if (r[i]['pic_w'] > r[i]['pic_h']) {
                        //html += '<li class="on"><i class="on">'+index+'</i><a target="_blank" href="'+r[i]['wLink']+'" style="color:#333;"><img width="100" src="'+r[i]['pic']+'"></a><p><a href="'+r[i]['wLink']+'" style="color:#333;">'+r[i]['title']+'</a></p><div><span><a href="'+r[i]['uLink']+'">'+r[i]['nick']+'</a></span><span class="num">'+r[i]['voteCount']+'</span></div></li>';
                        var field = 'height="100%"';
                        var marginInfo = 'margin-right:0px;';
                        // var suoHeight = parseInt(86/r[i]['pic_w']*r[i]['pic_h']);
                        // console.log(suoHeight);
                        // var marginTop = (100-suoHeight)/2;
                        // console.log(marginTop);
                        // var marginInfo = 'margin-top:'+marginTop+'px';
                        // console.log(marginInfo)
                    }else if (r[i]['pic_w'] < r[i]['pic_h']) {
                        var field = 'width="100%"';
                        //html += '<li class="on"><i class="on">'+index+'</i><a target="_blank" href="'+r[i]['wLink']+'" style="color:#333;"><img height="100" src="'+r[i]['pic']+'"></a><p><a href="'+r[i]['wLink']+'" style="color:#333;">'+r[i]['title']+'</a></p><div><span><a href="'+r[i]['uLink']+'">'+r[i]['nick']+'</a></span><span class="num">'+r[i]['voteCount']+'</span></div></li>';
                        // var suoWidth = parseInt(100/r[i]['pic_h']*r[i]['pic_w']);
                        // console.log(suoWidth);
                        // var marginLeft = (86-suoWidth)/2;
                        // console.log(marginLeft);
                        // var marginInfo = 'margin-left:'+marginLeft+'px';
                        // console.log(marginInfo)
                        var marginInfo = 'margin-right:0px;';
                    }else{
                        var field = 'height="100%" width="100%"';
					}

                    if(index<=1){
                        var classOn = 'on';
                        var strongColor = '#24a7ca';
                    }else{
                        var classOn = '';
                        var strongColor = '#b8c0cc';
                    }

                    // html += '<li class="topten-'+r[i]['topStatus']+' '+classOn+'">\n' +
                    //     '                    <strong style="background: '+strongColor+'">'+index+'</strong>\n' +
                    //     '                    <div class="imgbox" "><img '+field+'=100 src="'+r[i]['pic']+'"></div>\n' +
                    //     '                    <h3><a href="'+r[i]['wLink']+'" style="color:#333;text-decoration: none;">'+r[i]['title']+'</a></h3>\n' +
                    //     '                    <span class="name"><a href="'+r[i]['uLink']+'" style="color: #999;text-decoration: none;">'+r[i]['nick']+'</a></span>\n' +
                    //     '                    <span class="zan">'+r[i]['voteCount']+'</span>\n' +
                    //     '                </li>';
                    html += '<li class="topten-'+r[i]['topStatus']+' '+classOn+'">\n' +
                        '                    <strong style="background: '+strongColor+'">'+index+'</strong>\n' +
                        '                    <div class="imgbox" style="overflow: hidden" "><img '+field+' style="'+marginInfo+'"  src="'+r[i]['pic']+'"></div>\n' +
                        '                    <h3><a href="'+r[i]['wLink']+'" style="color:#333;text-decoration: none;">'+r[i]['title']+'</a></h3>\n' +
                        '                    <span class="name"><a href="'+r[i]['uLink']+'" style="color: #999;text-decoration: none;">'+r[i]['nick']+'</a></span>\n' +
                        '                    <span class="yuedu">'+r[i]['voteCount']+'</span>\n' +
                        '                </li>';

				}
				$('#toplist').html(html);



				// $('#toplist li').hover(function () {
				// 	clearTimeout(_topten)
				// 	_index =$(this).index();
				// 	console.log(_index)
				// 	$('#toplist li').removeClass('on');
				// 	$(this).addClass('on')
				// 	//setTimeout(function () {
				// 	// $('#toplist li').removeClass('on');
				// 	//$("#toplist li:eq("+_index+")").addClass('on')
				// 	// },10)
				// },function () {
				// 	//_topten = setTimeout("$('#toplist li').removeClass('on')",1000)
				// });
                //
				// $("#toplist").hover(function(){
                //
				// },function () {
				// 	$('#toplist li').removeClass('on')
				// })
			}
		}
	});

	var _topten ;
	var _index = 0;
	//音乐列表
	var list = getWorkList(WORK_MUSIC,1,'','','',1,5);
	list = list['list'];
	var html = '';
	for(var i in list){
		if(1 == i%2){
			var mClass='';
            var backgroundColor = '';
		}else{
			var mClass='eq';
            var backgroundColor = 'background-color:#f7f7f7;';
		}
		//允许下载
		if(list[i]['authModify'] == 1){
            var downloadHtml = '<a target="_blank" href="/work/download?type=3&wId='+window.btoa(list[i]['id'])+'" class="a1"></a>\n';

		}else{
			var downloadHtml = '';

		}


		var addHtml = '<li class="'+mClass+'" style='+backgroundColor+'>\n' +
            '                    <h4><a  style="cursor:pointer;color: black;text-decoration: none;" href="'+list[i]['wLink']+'">'+list[i]['title']+'</a></h4>\n' +
            '                    <span class="play-panel">\n' +
            downloadHtml +
            '                        <a href="javascript:;" class="a3" wId="'+list[i]['id']+'"></a>\n' +
            '                        <a href="javascript:;" class="a4" wId="'+list[i]['id']+'"></a>\n' +
            '                    </span>\n' +
            '                    <span class="clock">'+list[i]['mLength']+'</span>\n' +
            '                    <span class="time">'+list[i]['time']+'</span>\n' +
            '                    <span class="ting">'+list[i]['viewCount']+'</span>\n' +
            '                    <span class="name"><a style="cursor:pointer;color: black;text-decoration: none;" href="'+list[i]['uLink']+'">'+list[i]['nick']+'<a/></span>\n' +
            '                </li>';
		html+=addHtml;
	}
	$('.main-music ul').html(html);
	//图片列表
	var list = getWorkList(WORK_PIC,1,'','','',1,10);
	list = list['list'];
	var html = '';
	for(var i in list){
		var addHtml = '<li>\n' +
            '            <div  class="imgbox" style="overflow: hidden">\n' +
            '                <p><a target="_blank" href="'+list[i]['wLink']+'"><img width="236" src="'+list[i]['urlMini']+'"></a></p>\n' +
            '            </div>\n' +
            '            <h3><a target="_blank" href="'+list[i]['wLink']+'" style="color: black;text-decoration: none;">'+list[i]['title']+'</a></h3>\n' +
            '            <p>\n' +
            '                <span>'+list[i]['viewCount']+'</span><a style="color: #999;text-decoration: none;" target="_blank" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a>\n' +
            '            </p>\n' +
            '        </li>';
        html+=addHtml;
	}
	$('.paint-box .paint-list').html(html);


    //文字列表
    var list = getWorkList(WORK_TXT,1,'','','',1,5);
    list = list['list'];
    var html = '';
    for(var i in list){
        if(1 == i%2){
            var mClass='';
            var backgroundColor = '';
        }else{
            var mClass='eq';
            var backgroundColor = 'background-color:#f7f7f7;';
        }
        var addHtml = '<li class="'+mClass+'" style="'+backgroundColor+'">\n' +
            '            <h3><a target="_blank" href="'+list[i]['wLink']+'" style="color: black;text-decoration: none;">'+list[i]['title']+'</a></h3>\n' +
            '            <span class="name"><a style="color: #999;text-decoration: none;" target="_blank" href="'+list[i]['uLink']+'">'+list[i]['nick']+'</a></span>\n' +
            '            <span class="yuedu">'+list[i]['viewCount']+'</span>\n' +
            '            <span class="time">'+list[i]['time']+'</span>\n' +
            '            <span class="txt">'+list[i]['content']+'</span>\n' +
            '        </li>';
        html+=addHtml;
    }

    $('.arial-box ul').html(html);
	
	
	
	
	
	//banner展示
//	$.ajax({
//		url: "/work/showbanner",
//		type: "POST",
//		dataType : 'json',
//		data: {},
//		async: true,
//		success:function(r){
//		
//		var htmlstr="";
//		for(var i in r){
//		
//			if(r[i]['url']){
//			htmlstr+="<a href='"+r[i]['url']+"' target='_blank'><div><img src='"+r[i]['picUrl']+"' style='width:340px;height:150px'></div></a>";
//			}else{
//			htmlstr+="<div><img src='"+r[i]['picUrl']+"' style='width:340px;height:150px'></div>";
//			}
//		}
//		
//		$(".sub-advbox").html(htmlstr);
//
//		}
//	});
	// 官方通告展示
	$.ajax({
		url: "/work/shownotify",
		type: "POST",
		dataType : 'json',
		data: {},
		async: true,
		success:function(r){
		var htmlstr="";
		for(var i in r){
			if(i%2 == 1){
				htmlstr += '<a target="_blank" style="text-decoration:none;cursor: pointer;" href="'+r[i]['url']+'"><li class="eq" style="background: #f7f7f7;"><span>'+r[i]['time']+'</span>'+r[i]['title']+'</li></a>';
			}else{
				htmlstr += '<a target="_blank" style="text-decoration:none;cursor: pointer;"  href="'+r[i]['url']+'"><li ><span>'+r[i]['time']+'</span>'+r[i]['title']+'</li></a>';
			}
		}
		
		$(".main-notice ul").html(htmlstr);
				function AutoScroll(obj) {
					$(obj).find("ul:first").animate({
							marginTop: "-50px"
					}, 800,
				function() {
					$(this).css({
						marginTop: "0px"
						}).find("a:first").appendTo(this);
						});
					}
				$(document).ready(function() {
					setInterval(function () {
          	AutoScroll(".main-notice");
          }, 2000);
				});
		}
	});
	
	function getImgInfo(imgUrl,callback)
	{
		var img = new Image();
		img.src = imgUrl;
//		alert(imgUrl);
		img.onload = function(){
			//alert(img.width,img.height);
			callback(img.width,img.height);
		};
	}
	
	
	

	
})