
var selectValue = 7;//默认的选择条件的值







$(function(){
    actPage(1);
	// kv 展示
	$.ajax({
		url: "/work/showcollectionkv",
		type: "POST",
		dataType : 'json',
		data: {},
		async: false,
		success:function(r){
		var htmlstr='';
		for(var i in r){
			if(r[i]['url']){
                htmlstr+="<div type='"+i+"' class=\"swiper-slide\"><img  name=\'"+r[i]['url']+"\' src="+r[i]['picUrl']+" width=\"1280px\" height=\"400px\" ></div>";
			}else{
                htmlstr+="<div class=\"swiper-slide\"><img   src="+r[i]['picUrl']+" width=\"1280px\" height=\"400px\" ></div>";
			}
		}
            $('.swiper-wrapper').html(htmlstr);
		if(r.length == 1){
            var mySwiper = new Swiper ('.swiper-container', {
                loop: false,
                autoplay:false,

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
        }else{
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                autoplay:true,

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
        }



		}
	});

	$(".swiper-slide").css('cursor','pointer').click(function(){
		var url=$(this).find('img').attr("name");
		if(url != undefined){
            window.open(url);
        }

	});

	//档checkbox被选择，重新调用分页方法。
	$('.activity-body input').click(function(){

		var selectValue1 = $('.activity-body input').eq(0)[0].checked == true ? 1 : 0;
        var selectValue2 = $('.activity-body input').eq(1)[0].checked == true ? 2 : 0;
        var selectValue3 = $('.activity-body input').eq(2)[0].checked == true ? 4 : 0;
        selectValue = selectValue1+selectValue2+selectValue3;
        actPage(1);

	});




})


function actPage(pageNum){
	$.ajax({
		url:'/work/actlist',
		type:'get',
        data:{page:pageNum,selectValue:selectValue},
		async:false,
		dataType:'json',
		success:function(r){
		var htmlstr="<ul>";
		for( var i in r.list){
		    htmlstr += '<li>\n' +
                '                <span class="state-2"><i></i>'+r['list'][i]['statusName']+'</span>\n' +
                '                <a href="'+r['list'][i]['wLink']+'"><img src="'+r['list'][i]['picMiniUrl']+'"></a>\n' +
                '                <h3><span>'+r['list'][i]['pxstartTime']+'-'+r['list'][i]['endTime']+'</span>'+r['list'][i]['title']+'</h3>\n' +
                '            </li>';
			}
			htmlstr+="</ul>";
			$(".activity-body-list").html(htmlstr);

			$app.pager('page','actPage','',pageNum,r.count,r.pagesize);
			if(r.count<=0){
				$(".activity-body-list").html('<center><h1>暂时还没有活动哦！</h1></center><br/><br/>');
				$("#page").hide();
			}else{
				$("#page").show();
				$("#zjhot").addClass("tabhot");
			}

		}
	});
}






// function acPage(pageNum){
// 	$.ajax({
// 		url:'/work/activityzjlist',
// 		type:'get',
// 		data:{page:pageNum},
// 		async:false,
// 		dataType:'json',
// 		success:function(r){
// 		var htmlstr="<ul>";
// 		for( var i in r.list){
//
//
// 				r['list'][i]['status']='征集中!';
//
// 			htmlstr+="<li><a href='"+r['list'][i]['wLink']+"' target='_blank'><img src='"+r['list'][i]['picMiniUrl']+"' style='width:300px;height:250px;'/></a><div><span class='status-1'>"+r['list'][i]['status']+"</span><h3><a href='"+r['list'][i]['wLink']+"' target='_blank'>"+r['list'][i]['title']+"</h3></a><p><img src='../images/collection-"+r['list'][i]['type']+".png'>"+r['list'][i]['desc']+"</p><p><strong>"+r['list'][i]['endTime']+"</strong>投稿截止</p></div></li>";
// 			}
// 			htmlstr+="</ul>";
// 			$(".collection-list").html(htmlstr);
//
// 			$app.pager('page','acPage','',pageNum,r.count,r.pagesize);
// 			if(r.count<=0){
// 				$(".collection-list").html('<center><h1>暂时还没有活动哦！</h1></center><br/><br/>');
// 				$("#page").hide();
// 			}else{
// 				$("#page").show();
// 				$("#zjhot").addClass("tabhot");
// 			}
//
// 		}
// 	});
// }
// function pxPage(pageNum){
// 	$.ajax({
// 		url:'/work/activitypxlist',
// 		type:'get',
// 		data:{page:pageNum},
// 		async:false,
// 		dataType:'json',
// 		success:function(r){
// 		var htmlstr="<ul>";
// 		for( var i in r.list){
// 			r['list'][i]['status']='评选中!';
// 			htmlstr+="<li><a href='"+r['list'][i]['wLink']+"' target='_blank'><img src='"+r['list'][i]['picMiniUrl']+"' style='width:300px;height:250px;'/></a><div><span class='status-2'>"+r['list'][i]['status']+"</span><h3><a href='"+r['list'][i]['wLink']+"' target='_blank'>"+r['list'][i]['title']+"</h3></a><p><img src='../images/collection-"+r['list'][i]['type']+".png'>"+r['list'][i]['desc']+"</p><p><strong>"+r['list'][i]['endTime']+"</strong>评选截止</p></div></li>";
// 			}
// 			htmlstr+="</ul>";
// 			$(".collection-list").html(htmlstr);
//
// 			$app.pager('page','pxPage','',pageNum,r.count,r.pagesize);
// 			if(r.count<=0){
// 				$(".collection-list").html('<center><h1>暂时还没有活动哦！</h1></center><br/><br/>');
// 				$("#page").hide();
// 			}else{
// 				$("#pxhot").addClass("tabhot");
// 				$("#page").show();
// 			}
//
// 		}
// 	});
// }
// function endPage(pageNum){
// 	$.ajax({
// 		url:'/work/activityendlist',
// 		type:'get',
// 		data:{page:pageNum},
// 		async:false,
// 		dataType:'json',
// 		success:function(r){
// 		var htmlstr="<ul>";
// 		for( var i in r.list){
// 			r['list'][i]['status']='已结束!';
// 			htmlstr+="<li><a href='"+r['list'][i]['wLink']+"' target='_blank'><img src='"+r['list'][i]['picMiniUrl']+"' style='width:300px;height:250px;'/></a><div><span class='status-2'>"+r['list'][i]['status']+"</span><h3><a href='"+r['list'][i]['wLink']+"' target='_blank'>"+r['list'][i]['title']+"</h3></a><p><img src='../images/collection-"+r['list'][i]['type']+".png'>"+r['list'][i]['desc']+"</p><p><strong>"+r['list'][i]['endTime']+"</strong>截止</p></div></li>";
// 			}
// 			htmlstr+="</ul>";
// 			$(".collection-list").html(htmlstr);
//
// 			$app.pager('page','endPage','',pageNum,r.count,r.pagesize);
// 			if(r.count<=0){
// 				$(".collection-list").html('<center><h1>暂时还没有活动哦！</h1></center><br/><br/>');
// 				$("#page").hide();
// 			}else{
// 				$("#page").show();
// 			}
//
// 		}
// 	});
// }