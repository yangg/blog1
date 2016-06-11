/*  
 *Author:sohighthesky  
 *From:http://blog.csdn.net/sohighthesky  
 *Date:2009-11-1  
 */  
/*  
 *target 要固定的元素对象，也可以是元素的id  
 *pos:object/string 指定固定到的位置，类型为object时，使用json方式如{right:200,bottom:50} ，为string时可选参数如下：  
 *cc,正中间,lc  左边,rc 右边  
 *lt  左上角,ct 上边,rt  右上角  
 *lb 左下角,cb 底部,rb 右下角  
 */ 
var fixPosition=function(target,pos) {
    this.target= this.g(target);
    this.pos=pos;
    this.init();//
};

fixPosition.prototype={
    isFixed:!window.ActiveXObject || (navigator.userAgent.indexOf("MSIE 6")==-1 &&  document.compatMode=="CSS1Compat"),
    ae:function(e,call) {
        if(window.addEventListener)window.addEventListener(e,call,false);
		else window.attachEvent("on"+e,call);
    },
    g:function(id) { return typeof(id)=="string"?document.getElementById(id):id;},
    setPos:function() {//设置位置
        var de=document.compatMode=="CSS1Compat"?document.documentElement:document.body;                
        if(typeof(this.pos)=="string") {//
            if(this.isFixed){
				switch(this.pos.charAt(0)) {
					case "l":
						this.target.style.left="0px";
						break;
					case "r":
						this.target.style.right="0px";
						break;
					default:
						this.target.style.left=(de.clientWidth-this.target.clientWidth)/2 +"px"; 
						break;
				}
				switch(this.pos.charAt(1)) {
					case "t":
						this.target.style.top="0px";
						break;
					case "b":
						this.target.style.bottom="0px";
						break;
					default:
						this.target.style.top=(de.clientHeight-this.target.clientHeight)/2 +"px"; 
						break;
				}
			}else {
				switch(this.pos.charAt(0)) {
					case "l":
						this.target.style.left=de.scrollLeft+"px";
						break;
					case "r":
						this.target.style.left=de.scrollLeft+de.clientWidth-this.target.clientWidth +"px";
						break;
					default:
						this.target.style.left=de.scrollLeft+((de.clientWidth-this.target.clientWidth)/2)+"px";
						break;
				}
				switch(this.pos.charAt(1)) {
					case "t":
						this.target.style.top=de.scrollTop+"px";
						break;
					case "b":
						this.target.style.top=de.scrollTop+de.clientHeight-this.target.clientHeight+"px";
						break;
					default:
						this.target.style.top=de.scrollTop+((de.clientHeight-this.target.clientHeight)/2)+"px";
						break;
				}
			}
        } else {
            if(this.isFixed) {
                for(var p in this.pos)
                    this.target.style[p]=this.pos[p]+"px";
            } else {
                for(var p in this.pos) {
                    switch(p.toLowerCase()) {
                        case "left":
                            this.target.style.left=de.scrollLeft+this.pos[p]+"px";
                            break;
                        case "right":
                            this.target.style.left=de.scrollLeft+de.clientWidth-this.target.clientWidth-this.pos[p]+"px";
                            break;
                        case "top":
                            this.target.style.top=de.scrollTop+this.pos[p]+ "px";
                            break;
                        case "bottom":
                            this.target.style.top=de.scrollTop+de.clientHeight-this.target.clientHeight-this.pos[p]+"px";
                            break;
                    }
                }
            }
        }
    },
    init:function() {
        if(!this.pos)
            throw Error("Invalid arguments [pos].");
		this.target.style.position=this.isFixed?"fixed":"absolute";
		
        var timer,o=this;
        this.ae("resize",function() {//支持fixed的浏览器窗体大小改变时也重置位置，防止中间无法居中
            clearTimeout(timer);
            timer=setTimeout(function() { o.setPos(); },30);
        });
        if(!this.isFixed) {//滚动
            this.ae("scroll",function() {                
                clearTimeout(timer);
                timer=setTimeout(function() { o.setPos(); },30);
            });
        }
        this.setPos();
    }
}
/*
 *强烈建议您的页面加上w3c的dtd
 */