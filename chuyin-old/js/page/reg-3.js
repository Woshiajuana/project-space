/*
 *  reg3.html页面的js
 *  
 */
$(function(){
	var timeHandle = setInterval(function(){
		var timeNum = parseInt($('.sec').text());
		if(timeNum <=1){
			clearInterval(timeHandle);
			location.href = './main.html';
		}else{
			$('.sec').text(--timeNum);
		}
	},1000);

})

	








