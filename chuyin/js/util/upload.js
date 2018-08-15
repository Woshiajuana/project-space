/**
 * @fileOverview app jslib 上传组件
 * @param {args} vid from元素或input元素数组，用于模仿异步提交
 * @param {Function} callback 上传回调函数 
 */
$app.upload = {
    array_in:function(arr,el){
        for(var i=0,len=arr.length;i<len;i++){
            var j=arr[i];
            if(j == el){
                return i;
            }
        }
        return -1;
    },
    init:function(el,func){
        this.el = document.getElementById(el.id) || el;
        this.callback = func || function(){};
    },
    uploadpic:function(el,func){
        this.init(el, func);
        if(el.value == ''){
            alert("请您选择要上传的图片！");
            return;
        }
        this._clearContext();
        if(typeof(args) == "string"){
            el = document.getElementById(el);
        }
        this.action = '/Material/upload?claName='+claName;
        //创建iframe与表单
        this._creatIfram();
        //创建form
        this._creatForm();
    },
    //创建iframe以及form
    _creatIfram:function(){
        if(document.getElementById("jslib_FormSubmit_iframe")){
            return;
        }
        var appUpload = $app.upload;
        //var iframe = document.createElement('iframe');
		
        var iframe;  
        try {  
            iframe = document.createElement('<iframe name="jslib_FormSubmit_iframe" id="jslib_FormSubmit_iframe" src="about:blank">');  
        } catch (ex) {  
            iframe = document.createElement('iframe');  
        }	
		
        iframe.id = 'jslib_FormSubmit_iframe';
        iframe.name = 'jslib_FormSubmit_iframe';
        iframe.src = 'about:blank';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    // var iframe =  '<iframe id="jslib_FormSubmit_iframe" name="jslib_FormSubmit_iframe" src="about:blank" style="display:none;" onload="javascript:setTimeout(\'asyn.complete()\',100)"></iframe>'
    },
    _creatForm:function(){
        /*if(document.getElementById("file_upload_form")){
            return;
        }*/
        var file_upload_from = document.getElementById("file_upload_form");
        if(file_upload_from){
            file_upload_from.parent().removeChild(file_upload_from);
            return;
        }
        var objForm = document.createElement("form");
        objForm.action = this.action;
        objForm.target = "jslib_FormSubmit_iframe";
        objForm.encoding = "multipart/form-data";
        objForm.method = "post";
        objForm.id = "file_upload_form";
        objForm.style.display = "none";  
        objForm.innerHTML = '<input id="callbackName" name="callbackName" type="hidden" value="$app.upload.callback"/>';
        //上传file加入form
        var elclone = this.el.cloneNode(true);
        
        this.el.parentNode.insertBefore(elclone, this.el);
        this.el.name = 'fileField';
        objForm.appendChild(this.el);
        document.body.appendChild(objForm);
        objForm.submit();
        setTimeout(function(){
        	var iframe = document.getElementById('jslib_FormSubmit_iframe');
            var jslib_form = document.getElementById("file_upload_form");
            if(iframe){
                document.body.removeChild(iframe);
            }
            if(jslib_form){
                document.body.removeChild(jslib_form);
            }
        },1000);
        
        
        //测试
    },
    _clearContext:function(){
        var iframe = document.getElementById('jslib_FormSubmit_iframe');
        var jslib_form = document.getElementById("file_upload_form");
        if(iframe){
            document.body.removeChild(iframe);
        }
        if(jslib_form){
            document.body.removeChild(jslib_form);
        }
    }
}