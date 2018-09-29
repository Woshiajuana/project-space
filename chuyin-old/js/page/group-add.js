/*
 *  小组部分js
 *  
 */
$(function(){
	check();
	//创建小组
	$('.group-add-btn a').click(function(){
		checkGroupInfo();
	})
})


/*
 * id: 要上传的form表单id
 */
function uploadImage()
{
	$('#uploadImg').uploadify({
		'swf'      : '/swf/uploadify.swf',
		'uploader' : '../group/upload',
		'color': 'blue',
		'buttonText':'选择文件',
		'fileTypeExts': '*.jpg,*.jpeg,*.png,*.gif',
		'height': 38,
     	'width': 116,
     	'buttonClass':'uploadbtn',
		'multi' : false,
		//'uploadLimit':1,
		'queueSizeLimit':1,
		'fileSizeLimit':'2000',
		'removeCompleted':false,
		'auto' : true,
		'onUploadSuccess': function (file, data, response) {
				
			     var dataObj = JSON.parse(data);
        		 if(dataObj.code == 0){
//                 	alert('上传成功');
                 	systemTip('上传成功');
                 	picSmall = dataObj.msg;
          		}else{
//          			alert(dataObj.msg);
          			systemTip(dataObj.msg);
          		}
		}
	});
	
	
//	var file = new FormData(document.getElementById(id));
//	if ($('#uploadImg').val() == '') {
//		alert('请选择文件上传');
//	}
//	else {
//		$.ajax({
//		      url:"../group/upload",
//		      type:"post",
//		      data:file,
//		      dataType:'json',
//		      processData:false,
//		      contentType:false,
//		      success:function(r){ 
//		      	if (r.code == 0) {
//		      		$('.imgbox').html('<img src='+r.message+'>');
//		      		$('#picname').val(r.message);
//		      	}
//		      	else {
//		      		alert(r.message);
//		      	}
//		      }
//		});   
//	}
}

/*
 * 创建小组前信息校验
 */
function checkGroupInfo()
{
      var groupName = $('#groupname').val();
      var groupPic = $('#picname').val();
      var recruit = new Array();
      // var fileType = new Array();
      var groupDes = $('#groupdes').val();
      var data = [];

      $("input[name='recruit']:checked").each(function(){ 
            recruit.push($(this).val()); 
      });
      recruit.join(','); 
      // $("input[name='filetype']:checked").each(function(){ 
      //       fileType.push($(this).val()); 
      // });
      // fileType.join(','); 

      if(groupName.length == 0 || groupName.replace(/\s/g, "")==""){
//            alert("请填写小组名称");
            systemTip('请填写小组名称');
            return false;   
      }
      else if (groupPic.length == 0 || groupPic.replace(/\s/g, "")=="") {
//            alert("请上传小组图标");
            systemTip("请上传小组图标");
            return false; 
      }
      else if (recruit.length == 0) {
//            alert("请选择募集人员");
            systemTip("请选择募集人员");
            return false; 
      }
      // else if (fileType.length == 0) {
      //       alert("请选择制作内容");
      //       return false; 
      // }
      else if (groupDes.length == 0 || groupDes.replace(/\s/g, "")=="") {
//            alert("请填写小组介绍");
            systemTip("请填写小组介绍");
            return false; 
      }

      // alert(groupName+' '+groupPic+' '+recruit+' '+fileType+' '+groupDes);
      data['groupName'] = groupName;
      data['groupPic'] = groupPic;
      data['recruit'] = recruit;
      // data['fileType'] = fileType;
      data['groupDes'] = groupDes;
      createGroup(data);

}

/*
 * 创建小组
 */
function createGroup(data)
{
      dataInfo = {
            'groupName':data['groupName'],
            'groupPic':data['groupPic'],
            'recruit':data['recruit'].join('/'),
            // 'fileType':data['fileType'].join('/'),
            'fileType':'画作/3D建模/文字/音乐',
            'groupDes':data['groupDes'],
      };
      $.ajax({
        url: '../group/create',
        type: 'POST',
        async : false,
        traditional: true,
        dataType: 'json',
        data: dataInfo,
        success: function (r) {
            //nothing to do...
            if (r.code == 0) {
                  $('#groupname').val('');
                  $('#uploadImg').val('');
                  $('#groupPic').val('');
                  $("[name=recruit]:checkbox").attr("checked", false);
                  $("[name=filetype]:checkbox").attr("checked", false);
                  $('#groupdes').val('');
//                  alert(r.message);
                  systemTip(r.message);
                  window.location.href = 'group.html?id='+r.data.id;
            }
            else {
//                  alert(r.message);
                  systemTip(r.message);
            }
        }
    })
}

//创建小组前身份校验
function check()
{
	$.ajax({
		url:'../group/checkcreate',
		data:{},
		type:'post',
		dataType:'json',
		async:false,
		success:function(r){
			if (r.code == 0) {
	
//				alert('是专业用户');
			}
			else {
//				alert(r.message);
				systemTip(r.message,'groups.html');
//				window.location = 'groups.html';
			}
		}
	})
}

