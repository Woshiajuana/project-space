$(function(){
	getUserInfo(queryString('uid'),userCallback);
})

function userCallback(r){
			console.dir(r);
	
			$("#username").val(r.username);
			$('#username').attr('disabled','true');
			$("#user_sex").val(r.sex);
			$(".touxiang img").attr("src",r.head);
			$('#user_sex').attr('disabled','true');
			$("#datapicker").val(r.birthday);
			$('#datapicker').attr('disabled','true');
			
	}