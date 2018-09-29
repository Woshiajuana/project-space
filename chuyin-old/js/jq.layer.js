/**
 * jquer�������е�����(��fuyun�Ļ����ϸĽ�)
 * @author fuyun, Mark
 * @version 1.0
 **/

//�ж�jquery�Ƿ���أ����û�м����Զ����� jquery.js

(function($){
    $.extend({
        LAYER:{
            openID:'',    
            position:'',
			mt:'',
            parentIsLoad:true,
            /**
             * ��body�������ɵ�����ĸ�����������ֲ���iframe��
             * @param ����
             * @returns null
             **/   
            init:function(pid){
                if(pid==undefined){pid='UED_box'};
                if(this.parentIsLoad){
                    $('<div id="'+ pid +'"></div>').appendTo("body");
                    $('<div class="UED_SHUCOVER_V1 UED_hide" id="UED_SHUCOVER_V1"><iframe class="UED_SHUCOVER_IFRAME_V1" id="UED_SHUCOVER_IFRAME_V1" src="about:blank"></iframe></div>').appendTo("body");                        
                    this.parentIsLoad = false;
                }                    
            },
            /**
             * ��ʾ������
             * @param json���� 
             * @returns null
             **/                
            show:function(json){                
                var def = {
                    overlay:{color:'#000',opacity:0.5}, //���ֲ���ɫ��͸����
					position:'fixed',
					mt:'200px',
                    layerContainer:'UED_LAYER_PARENT_FRAME_V1' //Ĭ�ϸ���id
                }
                def = $.extend(def,json);               
                
                //�Ų����
                if(!document.getElementById(def.id)){
                    alert('���������: ҳ����û�з���id='+def.id);
                    return false;
                }
				
                this.init(def.layerContainer);  
				this.position = def.position; //���ö�λģʽ
				this.mt = def.mt; //���ö�λģʽ
                this.openID = json.id;                    
                this.setpos($('#'+ this.openID));                    
                //�������ֲ�                        
                this.is6FIX('100%');
                //��ҳ��ĵĿ���Ƶ���body����ĸ��ڵ㡣��ֹ�ڿؼ���ʹ�õ����������ⲿ��ʽӰ��
                //��ʾ�����������ֲ���iframe��
                $('#'+this.openID).prependTo($('#'+def.layerContainer));
				$('#'+this.openID).show();
                $('#UED_SHUCOVER_V1').css({'background-color':def.overlay.color,'opacity':def.overlay.opacity}).show();
            },
            /**
             * ���õ��������м���ʾ
             * @param jQuery Object
             * @returns null
             **/
            setpos:function(obj){
                obj.addClass('UED_LAYER_PARENT_V1');
                var h = obj.height();
                var w = obj.width();
                var mr = (h/2*-1) + 'px';
                var ml = (w/2*-1) + 'px';   
                obj.css({'margin-left':ml,'margin-top':mr});
                
                //�����жϵ�������ĸ߶ȴ��ڿ�������ʱ�������㲻���̶���ҳ��
                var vH= document.body.clientHeight==0 ? document.body.clientHeight : document.documentElement.clientHeight;                
				
				if(h > vH || this.position === 'absolute'){
					//alert(this.mt);
                    obj.css({top:this.mt,position:'absolute',marginTop:'0'});
                } 
            },
            /**
             * �رյ�ǰ�򿪵ĵ�����
             * @returns null
             **/                
            close:function(){
                $('#'+this.openID).hide();
                $('#'+this.openID).removeClass('UED_LAYER_PARENT_V1');
                $('#UED_SHUCOVER_V1').hide();
                this.is6FIX('auto');
            },
            
            /**
             * IE6������Ҫ��html�� body�߶�����Ϊ100%ʱ������Ż���Ч.
             **/
            is6FIX:function(value){
                if($.browser.msie&&($.browser.version == "6.0")){
                    $('html').css({height:value});
                    $('body').css({height:value});
                }                
            }
        }
    });
})(jQuery);

