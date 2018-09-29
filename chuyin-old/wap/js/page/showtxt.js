$(function(){
	var type =queryString('type');
	if(type!=1){
	$.ajax({
		url: "/workofficial/show_newhtml",
		type: "POST",
		dataType : 'json',
		data: {id:queryString('hId')},
		success: function (res){
		$(".showtxtbox").html(res.content);
		$(".main-head h1").html(res.title);
		$(document).attr("title","POPPRO | "+res.title);
		var width= $(".showtxtbox img").width();
		var height= $(".showtxtbox img").height();
		var bili=100*height/width;
		 $(".showtxtbox img").css("height",bili+"%");
		 $(".showtxtbox img").css("width","100%");
		}
	});	
	}else{
		$.ajax({
			url: "/workofficial/show_html",
			type: "POST",
			dataType : 'json',
			data: {id:queryString('hId')},
			success: function (res){
			$(".showtxtbox").html(res.content);
			var width= $(".showtxtbox img").width();
			var height= $(".showtxtbox img").height();
			var bili=100*height/width;
			$(".showtxtbox img").css("height",bili+"%");
			$(".showtxtbox img").css("width","100%");
			$(".main-head h1").html(res.title);
			$(document).attr("title","POPPRO | "+res.title);
			}
		});	
	}
})