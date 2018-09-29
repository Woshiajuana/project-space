/**
 * wenbing.xu
 * @version v1.00
 * Modify-Date:2017-8-7 10:13:14
 */

$(function(){
	//kv
	$.ajax({
		url: "/work/showkv",
		type: "POST",
		dataType : 'json',
		data: {},
		async: false,
		success:function(r){
			console.dir(r);
			var htmlstr="";
		for(var i in r){
	
			if(r[i]['wapUrl'] && r[i]['wapUrl'] !="http://"){
				htmlstr+='<div class="swiper-slide">'+
                '<a href="'+r[i]['wapUrl']+'"><img src="'+r[i]['picMiniUrl']+'"></a></div>';
			}else{
				htmlstr+='<div class="swiper-slide">'+
                '<img src="'+r[i]['picMiniUrl']+'"></div>';
			}
		}

		$(".swiper-wrapper").html(htmlstr);
	    var mySwiper = new Swiper('.swiper-container', {
	        autoplay: 5000,//可选选项，自动滑动
	        loop:true,
	    })

	    var tab_num = 33.33;
		}
	});
		//小编推荐
		$.ajax({
			url: "/work/good",
			type: "POST",
			dataType : 'json',
			data: {webType:"wap"},
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
//						if(r[i]['cat'] == 'erji'){
//							html += '<li><p><span class="imgbox">'+d3Html+'<img width="150" src="'+r[i]['urlMini']+'"></span><a class="play" target="_blank" href="'+r[i]['wLink']+'"></a></p>'+
//	                        '<h4><a target="_blank" href="'+r[i]['wLink']+'" style="color:#333;">'+r[i]['title']+'</a></h4><div><a target="_blank" style="text-decoration:none;out-line: none;" href="'+r[i]['uLink']+'">'+r[i]['nick']+'</a><span class="'+r[i]['cat']+'">'+r[i]['count']+'</span></div></li>';
//						}else{
//							html += '<li><p><a target="_blank" href="'+r[i]['wLink']+'"><span class="imgbox">'+d3Html+'<img width="150" src="'+r[i]['urlMini']+'"></span></a></p>'+
//	                        '<h4><a target="_blank" href="'+r[i]['wLink']+'" style="color:#333;">'+r[i]['title']+'</a></h4><div><a target="_blank" style="text-decoration:none;out-line: none;" href="'+r[i]['uLink']+'">'+r[i]['nick']+'</a><span class="'+r[i]['cat']+'">'+r[i]['count']+'</span></div></li>';
//						} 
						if(r[i]['cat'] == 'erji'){
							var icoImg = '../images/ico-listion@1x.png';
						}else{
							var icoImg = '../images/ico-reader@1x.png';
						} 
						html += '<li><a href="'+r[i]['wLink']+'">'+d3Html+'<img src="'+r[i]['urlMini']+'" class="showimg"></a>' +
                    '<strong>'+r[i]['title']+'</strong><span class="main-reader"><img src="'+icoImg+'">'+r[i]['count']+'</span><span class="main-user"><a href="'+r[i]['uLink']+'" style="color:#999;">'+r[i]['nick']+'</a></span></li>';
					}
					$('.imglist:eq(0) ul').html(html);
				}
			}
		});
		
		
		
        
		//音乐列表
		var list = getWorkList(WORK_MUSIC,1,'','','',1,4);
		list = list['list'];
		var html = '';
		for(var i in list){
			var addHtml = '<li>'+
	            '<a href="'+list[i]['wLink']+'">'+
            '<span class="playbtn"></span>'+
            '<strong><span>'+list[i]['title']+'</span><i>'+list[i]['nick']+'</i></strong>'+
            '<span class="time">'+list[i]['mLength']+'</span>'+
            '<span class="reader">'+list[i]['viewCount']+'</span>'+
            '</a>'+
            '</li>';
			html+=addHtml;
		}
		$('.musiclist ul').append(html);
		
		//图片列表
		var list = getWorkList(WORK_PIC,1,'','','',1,6);
		list = list['list'];
		var html = '';
		for(var i in list){
			if(list[i]['workType'] == 2){
				var d3Html = '<span class="ico-3d"></span>';
			}else{
				var d3Html = '';
			}
			var addHtml = '<li><a href="'+list[i]['wLink']+'">'+
                        '<img src="'+list[i]['urlMini']+'" class="showimg"></a>'+
                    '<strong>'+list[i]['title']+'</strong>'+
                    '<span class="main-reader"><img src="'+list[i]['urlMini']+'">'+list[i]['viewCount']+'</span><span class="main-user"><a href="'+list[i]['uLink']+'" style="color:#999;">'+list[i]['nick']+'</a></span></li>';		
	
			html+=addHtml;
		}
		$('.imglist:eq(1) ul').html(html);
		
		
	})