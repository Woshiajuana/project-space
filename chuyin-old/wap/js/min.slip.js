/**
 * wenbing.xu
 * @version v1.00
 * Modify-Date:2017-8-7 10:13:14
 */
!function(t,e){var i,n,r,o,s,h,u,c,a,d,p,l,f,g,y,v,x,m,S,T,E,b,w,C,_;return g=void 0,a=null,m="x",T="y",S="xy",s="left",p="right",y="up",n="down",u=10,h=40,i=["webkit","moz","ms","o",""],d=/\-?[0-9]+\.?[0-9]*/g,o="ontouchend"in t,l=o?"touchstart":"mousedown",c=o?"touchmove":"mousemove",r=o?"touchend":"mouseup",v=t.innerHeight,x=t.innerWidth,w=function(){},C=function(t,e){var n,r,o,s,h;for(h=[],o=0,s=i.length;o<s;o++)r=i[o],n=r?""+r+"Transition":"transition",h.push(t.style[n]=e);return h},_=function(t,e,n,r){var o,s,h,u,c;for(c=[],h=0,u=i.length;h<u;h++)s=i[h],o=s?""+s+"Transform":"transform",c.push(t.style[o]="translate3d("+(e||0)+"px, "+(n||0)+"px, "+(r||0)+"px)");return c},b=function(t){var e,n,r,o,s,h,u;for(s=[],n="",e="",h=0,u=i.length;h<u;h++)if(o=i[h],r=o?""+o+"Transform":"transform",n=t.style[r],n&&"string"==typeof n){e=n.match(/\((.*)\)/g)[0],s=e&&e.match(d);break}if(s.length)return{x:s[0]||0,y:s[1]||0,z:s[2]||0}},f=function(){function t(t,e){this.ele=t,this.direction=e,this._isPressed=!1,this.onStart=this.onMove=this.onEnd=w,this.coord=this.eventCoords=this.cacheCoords=this.finger=this.absFinger=a,this.orient=[],this.isSlider=!1,this.isWebapp=!1,this.duration="400"}var e,i;return i=[function(t){var e,i;return i=t.touches&&(t.touches.length?t.touches:[t]),e=t.changedTouches&&t.changedTouches[0]||t.originalEvent&&t.originalEvent.changedTouches&&t.originalEvent.changedTouches[0]||i[0].originalEvent||i[0],{x:e.clientX,y:e.clientY}},function(t){var e;return e=t,{x:e.clientX,y:e.clientY}}],e=o?i[0]:i[1],t.prototype.start=function(t){return(this.onStart=t)&&this},t.prototype.move=function(t){return(this.onMove=t)&&this},t.prototype.end=function(t){return(this.onEnd=t)&&this},t.prototype.setCoord=function(t){var e,i,n;i=this.coord={x:t[m]||0,y:t[T]||0},n=this.ele,_(n,i[m],i[T]);for(e in i)n.setAttribute(e,i[e]);return this},t.prototype.onTouchStart=function(t){var i;return this._isPressed=!0,this.eventCoords=e(t),this.cacheCoords=this.coord,this.finger=this.absFinger=a,this.isSlider&&this.onSliderStart(t),i=this.onStart.apply(this,[t])},t.prototype.onTouchMove=function(t){var i,r,o,c,a,d,l,f,g,v,x;if(t.preventDefault(),!this._isPressed)return!1;if(l=e(t),o=this.direction,d=this.finger={x:l.x-this.eventCoords.x,y:l.y-this.eventCoords.y},i=this.absFinger={x:Math.abs(d.x),y:Math.abs(d.y)},o!==S&&(f=o===m?T:m,i[o]<u||i[f]>h))return!1;if(g=[],i.x>u&&g.push(d.x<0?s:p),i.y>u&&g.push(d.y<0?y:n),this.orient=g,v=this.onMove.apply(this,[t]),v===!1)return!1;c=this.ele,a=this.coord={x:o.indexOf(m)<0?this.cacheCoords[m]:this.cacheCoords[m]-0+d.x,y:o.indexOf(T)<0?this.cacheCoords[T]:this.cacheCoords[T]-0+d.y},_(c,a[m],a[T]),x=[];for(r in a)x.push(c.setAttribute(r,a[r]));return x},t.prototype.onTouchEnd=function(t){var e,i,n;return this._isPressed=!1,e=this.ele,this.isSlider&&this.onSliderEnd(t),i=this.onEnd.apply(this,[t]),n=b(this.ele),n&&this.setCoord(n),this.orient=[]},t.prototype.onSliderStart=function(t){return C(this.ele,a)},t.prototype.onSliderEnd=function(t){var e,i,r,o,h,u,c,a,d,l,f,g,v;return l=this.orient.join(""),v=0,u=!1,f=this.page,g=this.pageNum,r=this.ele,i=this.duration,e=this.absFinger,a=l.indexOf(y)>-1,o=l.indexOf(n)>-1,h=l.indexOf(s)>-1,c=l.indexOf(p)>-1,d=this.direction===T,d?(a&&f++,o&&f--):(h&&f++,c&&f--),f===g&&(f=g-1,u=!0),f===-1&&(f=0,u=!0),u===!0&&(i*=d?e[T]/this.pageHeight:e[m]/this.pageWidth),C(r,"all "+i+"ms ease-in"),d?(v="-"+f*this.pageHeight,_(r,0,v,0)):(v="-"+f*this.pageWidth,_(r,v,0,0)),this.page=f},t.prototype.init=function(){var t,e,i,n,o,s,h;this.coord={x:0,y:0},h=this._onTouchStart=function(t){return function(e){return t.onTouchStart(e)}}(this),s=this._onTouchMove=function(t){return function(e){return t.onTouchMove(e)}}(this),o=this._onTouchEnd=function(t){return function(e){return t.onTouchEnd(e)}}(this),i=this.ele,i.addEventListener(l,h,!1),i.addEventListener(c,s,!1),i.addEventListener(r,o,!1),n=this.coord={x:0,y:0},e=this.direction,_(i,n[m],n[T]);for(t in n)i.setAttribute(t,n[t]);return this},t.prototype.destroy=function(){var t;return t=this.ele,t.removeEventListener(l,this._onTouchStart,!1),t.removeEventListener(c,this._onTouchMove,!1),t.removeEventListener(r,this._onTouchEnd,!1),this},t.prototype.slider=function(t){var e,i,n,r,o,h,u,c,a,d;if(o=this.ele,"string"==typeof t)t=o.querySelectorAll(t);else if(!t)for(t=[],i=o.childNodes,u=0,a=i.length;u<a;u++)e=i[u],1===e.nodeType&&t.push(e);if(this.isSlider=!0,this.page=0,this.elPages=t,r=t.length,h=this.pageNum=r?r:0,this.direction===m)for(c=0,d=t.length;c<d;c++)n=t[c],n.style.cssFloat=s;return this},t.prototype.webapp=function(t){var e,i;return this.isWebapp=!0,this.slider(t).fullscreen(),t=this.elPages,e=this.ele,i=this.pageNum,e.style.height=""+v*i+"px",this.height(v),this.direction===m&&this.width(x),this},t.prototype.height=function(t){var e,i,n,r,o,s;for(n=this.ele,i=this.elPages,r=this.pageNum,t=String(t).replace("px",""),"100%"===t&&(t=v),this.pageHeight=t,this.direction===m&&(n.style.height=""+t+"px"),o=0,s=i.length;o<s;o++)e=i[o],e.style.height=""+t+"px";return this},t.prototype.width=function(t){var e,i,n,r,o,s;for(n=this.ele,i=this.elPages,r=this.pageNum,t=String(t).replace("px",""),"100%"===t&&(t=x),this.pageWidth=t,this.direction===m&&(n.style.width=""+t*r+"px"),o=0,s=i.length;o<s;o++)e=i[o],e.style.width=""+t+"px";return this},t.prototype.fullscreen=function(){var t,e,i;for(e=this.ele,t=e;i=t.parentNode;)1===i.nodeType&&(i.style.height="100%",i.style.overflow="hidden"),t=i;return this},t.prototype.time=function(t){return this.duration=String(t).replace("ms",""),this},t}(),E=function(t,e){var i;return i=new f(t,e||m),i.init()},"function"==typeof define?define("binnng/slip.js",function(t,e,i){return E}):t.Slip=E}(window,document);