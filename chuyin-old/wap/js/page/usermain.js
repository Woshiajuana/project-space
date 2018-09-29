$(function(){
	if(!checkLogin()){
		location.href="./login.html";
	}
	$.ajax({
		url: "/user/userinfo",
		type: "POST",
		dataType : 'json',
		data: {},
		async:false,
		success: function (r){
				if(r.id){
							$(".touxiang img:eq(0)").attr("src",r.head);
							$(".touxiang img").click(function(){
								location.href="./user-edit.html";
							})
							$(".sexname").html('<span class="sex1"> '+r.username+'</span></p>');
							if(r.sex==1){
								var sex=2;
							}else{
								var sex=1;
							}
							$(".sexname .sex1").css("background-image","url('../images/sex-"+sex+"@1x.png')");
							
						
				}else{
					location.href="./login.html";
				}
		}
	});
})	