/*!
 *Author:sohighthesky
 *From:http://www.cnblogs.com/sohighthesky/
 *Date:2009-11-14
 */
/*
 *img 指定要放大的图片或者其id
 *options:参见代码中setOptions中的注释
 */
var imageZoom = function(img,options) {
	this.img=this.g(img);
	if(this.img.nodeName!="IMG") {
		if(this.img && this.img.children[0].nodeName=="IMG")this.img=this.img.children[0];
		else throw Error("Invalid argument [img] !");
	}
	this.setOptions(options);
	this.init();
}
imageZoom.prototype={
	g:function(id) {return typeof(id)=="string"?document.getElementById(id):id;},
	ae:function(el,type,call) {
        if(el.addEventListener)el.addEventListener(type,call,false);
		else el.attachEvent("on"+type,call);
    },
	getPos:function(o){//取元素坐标
		var x = 0, y = 0;
		do{x += o.offsetLeft; y += o.offsetTop;}
		while(o=o.offsetParent);
		return {'x':x,'y':y};
	},
	setOptions:function(options) {
	    this.options={
	        mul:0,//默认为不放大（显示图片的原来大小）
		    bigImg:null,//指定放大的图片路径（要跟小图成比例才好）
		    viewer:null, //指定显示的位置(可以为一个div或者其id)
		    viewerCla:"",//指定预览的div的类样式
		    viewerMul:1,//指定显示div的放大倍数，默认为原大小,设置viewer时此参数无效
		    viewerPos:{h:10,v:0},//自定义展示层位置,h水平文向，v垂直方向 ,假如水平方向，正数表示右边，负数表示左边
		    onShow:function(){},//自定义事件，显示时触发，当viewer不为空时无效
		    onHide:function(){}
	    };
		for(var o in options) {this.options[o]=options[o];}
		this.options.bigImg =this.options.bigImg ||this.img.src;
    },
    getSize:function(o) {
		return {w:o.offsetWidth,h:o.offsetHeight};
    },
	createView:function() {		
		var _is=this.getSize(this.img);
		var d=document;
		if(this.options.viewer){
			this.viewer=this.g(this.options.viewer);
			this.viewer.style.overflow="hidden";
			this.viewer.style.position="relative";
		} else {
			this.viewer=d.createElement("div");
			this.viewer.className=this.options.viewerCla;
			var pos=this.getPos(this.img);

			var t=pos.y+this.options.viewerPos.v;
			if(this.options.viewerPos.v<0) {t-=_is.h*this.options.viewerMul;}
			else if(this.options.viewerPos.v>0) {t+=_is.h;}
			else t=pos.y;
			
			var l=pos.x+this.options.viewerPos.h;
			if(this.options.viewerPos.h<0) {l-=_is.w*this.options.viewerMul;}
			else if(this.options.viewerPos.h>0) {l+=_is.w;}
			else l=pos.x+_is.w;
			
			this.viewer.style.cssText="display:none;overflow:hidden;position:absolute;top:"+(t)+"px;left:"+(l)+"px;height:"+_is.h*this.options.viewerMul+"px;width:"+_is.w*this.options.viewerMul+"px";
			d.body.appendChild(this.viewer);
		}		
		this.viewimg=d.createElement("img");
		this.viewimg.style.cssText="position:relative;left:-33%;top:-33%;";
		this.viewimg.src=this.options.bigImg;
		if(this.options.mul) {//设置放大倍数
			this.viewimg.style.width=_is.w*this.options.mul +"px";
			this.viewimg.style.height=_is.h*this.options.mul +"px";
		}
		this.viewer.appendChild(this.viewimg);
	},
	move:function(e) {
		if(!this.options.mul)
		    this.options.mul=this.viewimg.offsetHeight/this.img.offsetHeight;
		var pos=this.getPos(this.img);
		var l=e.clientX-pos.x+(document.documentElement.scrollLeft || document.body.scrollLeft);//鼠标位置相对于图片左上角的偏移
		var t=e.clientY-pos.y+(document.documentElement.scrollTop || document.body.scrollTop);
		var zs=this.getSize(this.viewer);
		var pl=-l*this.options.mul+zs.w/2;
		var pt=-t*this.options.mul+zs.h/2;
		pl=pl>0?0:pl;
		pt=pt>0?0:pt;

        var vs=this.getSize(this.viewimg);
        pl=Math.max(pl,zs.w-vs.w);
        pt=Math.max(pt,zs.h-vs.h);

		this.viewimg.style.left=pl+"px";
		this.viewimg.style.top=pt+"px";
	},
	init:function() {
	    var o=this;
	    var load=function(a) {//图片加载
	        o.createView.call(o);
	        o.img.setAttribute("alt","");
	        o.ae(o.img,"mousemove",function(event){o.move.call(o,event);});
		    if(!o.options.viewer) {
		        o.ae(o.img,"mouseover",function(){o.options.onShow();o.viewer.style.display=""});
		        o.ae(o.img,"mouseout",function(){o.options.onHide();o.viewer.style.display="none"});
		    }
	    };
	    if(typeof(document.readyState)=="undefined" || window.opera) {
			var de=document.documentElement || document.body;
			var h=de.scrollHeight;
			var t=setInterval(function() {
				if(h==de.scrollHeight){
					clearInterval(t);
					load();					
				} else h=de.scrollHeight;
			},500);
	    } else if(document.readyState=="complete")
	        load();
	    else
	        o.ae(window,"load",load);
	}
};