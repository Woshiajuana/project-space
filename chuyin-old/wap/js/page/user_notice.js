$(function(){
	// 官方活动展示
	$.ajax({
		url: "/work/shownotify",
		type: "POST",
		dataType : 'json',
		data: {},
		async: true,
		success:function(r){
		var htmlstr="<ul>";
		var type="";
		for(var i in r){
			if(r[i]['category']=='hd'){
				if(r[i]['type']=='txt'){
					type="文字";
				}else if(r[i]['type']=='img'){
					type="画作";
				}else{
					type="音乐";
				}
				htmlstr+= '<a href="'+r[i]['wapUrl']+'"><li><h3>'+r[i]['title']+'</h3>'+
	            '<p>'+type+'征稿：<span>'+r[i]['stoptime']+'截止！</p></a>'+
	            '<a href="'+r[i]['wapUrl']+'" target="_blank"><span class="arrw-r"></span></a></li>';	
			}
			else{
				htmlstr+= '<a href="'+r[i]['wapUrl']+'"><li><h3>'+r[i]['title']+'</h3>'+
				  '<p>官方活动：<span>'+r[i]['time']+'开始！</p></a>'+
	            '<a href="'+r[i]['wapUrl']+'" target="_blank"><span class="arrw-r"></span></a></li>';	
			}
		}
			htmlstr+="</ul>";
		$(".notice-list").append(htmlstr);
		}
	});
})