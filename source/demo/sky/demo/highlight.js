/*!
  *js,css,html,cs,sql,php,vbs,xml
*/
var HightLight={
   author:'showbo',
   rxs:{
     vbs:[{reg:/"([^"]*("")?[^"]*)*"/g,cls:'str'},{reg:/'[^\r\n]*/g,cls:'note'},{cls:'kw',reg:/\b(elseif|if|then|else|select|case|end|for|while|wend|do|loop|until|abs|sgn|hex|oct|sqr|int|fix|round|log|sin|cos|tan|len|mid|left|right|lcase|ucase|trim|ltrim|rtrim|replace|instr|instrrev|space|string|strreverse|split|cint|cstr|clng|cbool|cdate|csng|cdbl|date|time|now|dateadd|datediff|dateserial|datevalue|year|month|day|hour|minute|second|timer|timeserial|timevalue|weekday|monthname|array|asc|chr|filter|inputbox|join|msgbox|lbound|ubound|const|dim|erase|redim|randomize|rnd|isempty|mod|execute|not|and|or|xor)\b|\bclass(?!=)/gi}]
     ,js:[{cls:'str',reg:/"[^"]*"|'[^']*'/g},{cls:'note',reg:/\/\/[^\n\r]*|\/\*[\s\S]*?\*\//g},{cls:'phpVar',reg:/\b(Array|Function|Object|Boolean|String|Number|Error|Math|RegExp|Date|document)\b/g},{cls:'kw',reg:/\b(arguments|break|delete|function|return|typeof|case|do|if|switch|var|catch|else|in|this|void|continue|false|instanceof|throw|while|debugger|finally|new|true|with|default|for|null|try|abstract|double|goto|native|static|boolean|enum|implements|package|super|byte|export|import|private|synchronized|char|extends|int|protected|throws|final|interface|public|transient|const|float|long|short|volatile)\b|\bclass(?!=)/g}]
     ,sql:[{cls:'sqlstr',reg:/'([^']*('')?[^']*)*'/},{cls:'note',reg:/--[^\n\r]*|\/\*[\s\S]*?\*\//g},{cls:'sqlconnect',reg:/\b(all|and|between|cross|exists|in|join|like|not|null|outer|or)\b/ig},{cls:'sqlfunc',reg:/\b(avg|case|checksum|current_timestamp|day|left|month|replace|year)\b/ig},{cls:'kw',reg:/\b(action|add|alter|after|as|asc|bigint|bit|binary|by|cascade|char|character|check|column|columns|constraint|create|current_date|current_time|database|date|datetime|dec|decimal|default|delete|desc|distinct|double|drop|end|else|escape|file|first|float|foreign|from|for|full|function|global|grant|group|having|hour|ignore|index|inner|insert|int|integer|into|if|is|key|kill|load|local|max|minute|modify|numeric|no|on|option|order|partial|password|precision|primary|procedure|privileges|read|real|references|restrict|returns|revoke|rows|second|select|set|shutdown|smallint|table|temporary|text|then|time|timestamp|tinyint|to|use|unique|update|values|varchar|varying|varbinary|with|when|where)\b/ig}]
     /*php多行字符串耕严格的控制在C#中实现*/
     ,php:[{cls:'str',reg:/<<<([a-z0-9_]+)[\r\n]{1,2}[\s\S]*?[\r\n]{1,2}\1;[\r\n]{1,2}|"[^"]*"|'[^']*'/ig},{cls:'note',reg:/\/\/[^\n\r]*|\/\*[\s\S]*?\*\//g},{cls:'phpVar',reg:/\$[a-z_0-9]+/ig},{cls:'kw',reg:/\b(and|or|xor|__FILE__|exception|__LINE__|array|as|break|case|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|include|include_once|isset|list|new|print|require|require_once|return|static|switch|unset|use|var|while|__FUNCTION__|__CLASS__|__METHOD__|final|php_user_filter|interface|implements|extends|public|private|protected|abstract|clone|try|catch|throw|cfunction|old_function|this)\b/g}]
     /*Csharp的xml注释匹配在C#中实现，因为js不支持向前搜索 (?<=)和(?<!) */
     ,cs:[{cls:'str',reg:/"[^"]*"/g},{cls:'note',reg:/\/\/[^\n\r]*|\/\*[\s\S]*?\*\//g},{cls:'phpVar',reg:/\bclass\s+[a-z][_a-z0-9]*(?=\s*[\{:])|new\s+[a-z][a-z0-9_]*(?=\s*\()|[a-z][a-z0-9_]*\s+(?=[a-z_][a-z0-9_]*\s*=\s*new)/gi},{cls:'kw',reg:/\b(region|endregion|partial|abstract|event|get|set|value|new|struct|as|null|switch|base|object|this|bool|false|operator|throw|break|finally|out|byte|fixed|override|try|case|float|params|typeof|catch|for|private|uint|char|foreach|protected|ulong|checked|goto|public|unchecked|if|readonly|unsafe|const|implicit|ref|ushort|continue|in|return|using|decimal|int|sbyte|virtual|default|interface|sealed|volatile|delegate|internal|short|void|do|is|sizeof|while|double|lock|stackalloc|else|long|static|enum|string|namespace)\b|\bclass(?!=)/g}]
     ,css:[{cls:'note',reg:/\/\*[\s\S]*?\*\//g},{cls:'str',reg:/[\s\S]+/g},{cls:'kw',reg:/\{[^\}]+\}/g},{cls:'sqlstr',reg:/[a-z-]+(?=:)/ig},{cls:'black',reg:/[\{\}]/g}]
  },
  parseXML:function(v){
    var declare='',cdata=[],note=[],reg=/<!\[CDATA\[([\s\S]*?)\]\]>/g;
    v=v.replace(reg,function(){
      index=cdata.length;
      cdata.push('<span class="kw">&lt;![CDATA[<span class="gray">'
        +arguments[1].replace(/</g,'&lt;')+'</span>]]></span>');
      return '__CDATA'+index+'__';}
    );
    reg=/<!--([\s\S]*?)-->/g;
    v=v.replace(reg,function(){
      index=note.length;
      note.push('<span class="kw">&lt;--<span class="gray">'+arguments[1].replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span>--&gt;</span>');
      return '__注释'+index+'__';}
    );
    v=v.replace(/<\?xml[^>]*>/i,function(){declare=arguments[0];return '__申明__'});
    var tmp;
    v=v.replace(/<([^>]+)>/g,function(){
      tmp=arguments[1];
      if(tmp.indexOf('/')==0)return '<span class="kw">&lt;/<span class="str">'+tmp.substring(1)+'</span>&gt;</span>';
      else if(/^[_0-9a-z]+$/i.test(tmp))return '<span class="kw">&lt;<span class="str">'+tmp+'</span>&gt;</span>';
      else{
         tmp=tmp.replace(/([a-z_][a-z_0-9\.]*)\s*=\s*"([^"]*)"/gi
          ,'<span class="str">$1</span>="<span class="black">$2</span>"');
         tmp=tmp.replace(/([a-z_][a-z_0-9\.]*)\s*=\s*'([^']*)'/gi
          , '<span class="str">$1</span>=\'<span class="black">$2</span>\'');
        tmp=tmp.replace(/^([a-z_0-9\.]+)/i,'<span class="str">$1</span>');
        return '<span class="kw">&lt;'+tmp+'&gt;</span>';
      }
    });
    v=v.replace('__申明__','<span class="kw">'+declare.replace('<','&lt;')+'</span>');
    var i;
    for(i=0;i<note.length;i++)v=v.replace('__注释'+i+'__',note[i]);
    for(i=0;i<cdata.length;i++)v=v.replace('__CDATA'+i+'__',cdata[i]);
    return v;
  },
  analyze:function(language,v){
    if(language=='xml')return this.parseXML(v);
    var rx=this.rxs[language];
    v=language=='css'?v:v.replace(/\\('|")/g,function(){if(arguments[1]=='"')return "__转义双引号__";else return "__转义单引号__";});
    var string=[],note=[],arrIndex;
    if(language!='css') v=v.replace(rx[0].reg,function(){arrIndex=string.length;string.push('<span class="'+rx[0].cls+'">'+arguments[0].replace(/</g,'&lt;')+'</span>');return '__字符串'+arrIndex+'__';});
    
    var Index=/css|html/.test(language)?0:1;
    v=v.replace(rx[Index].reg,function(){arrIndex=note.length;note.push('<span class="'+rx[Index].cls+'">'+arguments[0]+'</span>');return '__注释'+arrIndex+'__';});
    Index=/css|html/.test(language)?1:2;
    for(var i=Index;i<rx.length;i++) v=v.replace(rx[i].reg,function(){return '<span class="'+rx[i].cls+'">'+arguments[0]+'</span>';}); 
    if(language!='css') for(var i=0;i<string.length;i++)v=v.replace(new RegExp('__字符串'+i+'__','g'),string[i]); 
    for(var i=0;i<note.length;i++)v=v.replace('__注释'+i+'__',note[i]);
    //下面防止注释中含有符合字符串的匹配
    if(v.indexOf('__字符串')!=-1)for(var i=0;i<string.length;i++)v=v.replace(new RegExp('__字符串'+i+'__','g'),string[i].replace(/<span class="[^"]+">(.*)<\/span>/ig,'$1'));
    //替换转义
    v=v.replace(/__转义双引号__/g,'\\"').replace(/__转义单引号__/g,"\\'");
    return v;
  },
  getHtml:function(language,v){
    if(language!='html')return this.analyze(language,v);
    v=v.replace(/\\'/g,'__转义单引号__').replace(/\\"/g,'__转义双引号__');    
    var reg=/<!--[\s\S]*?-->/g,m=/<%@\s*page[\s\S]*?language=['"](.*?)["']/i.exec(v);
    var note=[],vb=[],js=[],php=[],cs=[],css=[],index,lang=m?m[1].toUpperCase():'VB';
    v=v.replace(reg,function(){index=note.length;note.push('<span class="note">'+arguments[0].replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span>');return '__注释'+index+'__';});
    var rFun=function(){
      if(arguments[0].indexOf('<script')==0&&arguments[0].indexOf('runat')==-1){
        index=js.length;
        js.push(arguments[2]);
        return arguments[1]+'__JS'+index+'__'+arguments[3];
      }
      index=lang=='C#'?cs.length:vb.length;
      if(arguments[0].indexOf('<%')==0){
        lang=='C#'?cs.push(arguments[0]):vb.push(arguments[0]);
        return '__'+lang+index+'__';
      }
      else{
        lang=='C#'?cs.push(arguments[2]):vb.push(arguments[2]);
        return arguments[1]+'__'+lang+index+'__'+arguments[3];
      }
    }
    reg=/(<script[^>]*>)([\s\S]*?)(<\/script>)/gi;//注意这里，这句会导致js无法匹配script标签
    v=v.replace(reg,rFun);
    reg=/<%(?!@)[\s\S]*?%>/g;//asp,asp.net
    v=v.replace(reg,rFun);
    reg=/<\?php\b[\s\S]*?\?>/ig;//php
    v=v.replace(reg,function(){index=php.length;php.push(arguments[0]);return '__PHP'+index+'__';});
    reg=/(<style[^>]*>)([\s\S]*?)(<\/style>)/gi;//css  
    v=v.replace(reg,function(){index=css.length;css.push(arguments[2]);return arguments[1]+'__CSS'+index+'__'+arguments[3];});
    //html标签的着色
    v=v.replace(/'.*?'/g,function(){return arguments[0].replace(/</g,'&lt;').replace(/>/g,'&gt;');});
    v=v.replace(/"[^"]*?"/g,function(){return arguments[0].replace(/</g,'&lt;').replace(/>/g,'&gt;');});
    var tmp;
    v=v.replace(/<([^>]+)>/g,function(){
      tmp=arguments[1];
      if(tmp.indexOf('/')==0)return '<span class="kw">&lt;/<span class="str">'+tmp.substring(1)+'</span>&gt;</span>';//结束标签
      else if(/^([_0-9a-z]+)\s*\/$/i.test(tmp))return '<span class="kw">&lt;<span class="str">'+tmp.replace(/\/$/,'')+'</span>/&gt;</span>';
      else if(/^!doctype/i.test(tmp)){
           tmp=tmp.replace(/^!doctype/i,function(){return '<span class="str">'+arguments[0].substring(1)+'</span>'});
           tmp=tmp.replace(/\b(html|public)\b/gi,function(){return '<span class="sqlstr">'+arguments[0]+'</span>'});
           return '<span class="kw">&lt;!'+tmp+'&gt;</span>';
      }
      else{
         tmp=tmp.replace(/([a-z_][a-z_0-9]*)\s*=\s*"([^"]*)"/gi,function(){ 
            return '<span class="sqlstr">'+arguments[1]+'</span><span class="kw">="'+arguments[2]+'"</span>';
           }
         );
         tmp=tmp.replace(/([a-z_][a-z_0-9]*)\s*=\s*'([^']*)'/gi,function(){ 
            return '<span class="sqlstr">'+arguments[1]+'</span><span class="kw">=\''+arguments[2]+'\'</span>';
           }
         );
         tmp=tmp.replace(/([a-z_][a-z_0-9]*)\s*=\s*(?!['"])(\w+)/gi,function(){ 
            return '<span class="sqlstr">'+arguments[1]+'</span>=<span class="kw">'+arguments[2]+'</span>';
           }
         );
         tmp=tmp.replace(/^[a-z_0-9]+/i,function(){return '<span class="str">'+arguments[0]+'</span>'});
         if(/^%@/.test(tmp)) return '<span class="str"><span class="declare">&lt;%</span><span class="kw">@</span>'
              +tmp.substring(2, tmp.length - 1)+'<span class="declare">%&gt;</span></span>';
         else return '<span class="kw">&lt;'+tmp+'&gt;</span>';
      }
    }); 
    var i;
    //注释
    for(i=0;i<note.length;i++)v=v.replace('__注释'+i+'__',note[i]);
    //替换转义
    v=v.replace(/__转义双引号__/g,'\\"').replace(/__转义单引号__/g,"\\'");
    //样式表
    for(i=0;i<css.length;i++)v=v.replace('__CSS'+i+'__',this.analyze('css',css[i]));
    //CSharp
    for(i=0;i<cs.length;i++){
      if(cs[i].indexOf('<%')==0)  v=v.replace('__C#'+i+'__','<span class="declare">&lt;%</span>'+this.analyze('cs',cs[i].replace(/<%|%>/g,''))+'<span class="declare">%&gt;</span>');
      else v=v.replace('__C#'+i+'__',this.analyze('cs',cs[i]));
    }
    //VBScript或者vb
    for(i=0;i<vb.length;i++){
      if(vb[i].indexOf('<%')==0)  v=v.replace('__VB'+i+'__','<span class="declare">&lt;%</span>'+this.analyze('vbs',vb[i].replace(/<%|%>/g,''))+'<span class="declare">%&gt;</span>');
      else v=v.replace('__VB'+i+'__',this.analyze('vbs',vb[i]));
    }
    //PHP
    for(i=0;i<php.length;i++)v=v.replace('__PHP'+i+'__','<span class="declare">&lt;?php</span>'+this.analyze('php',php[i].replace(/<\?php|\?>/g,''))+'<span class="declare">?&gt;</span>');
    //JS
    for(i=0;i<js.length;i++)v=v.replace('__JS'+i+'__',this.analyze('js',js[i]));
    return v;
  }
};

/*modify:sohighthesky*/
(function() {
    var Style={
        ss:document.styleSheets[0],
        insertRule: function(selector,styles) {
            var n=(this.ss.cssRules || this.ss.rules || []).length;
            if (this.ss.insertRule)   // Try the W3C API first
                this.ss.insertRule(selector + "{" + styles + "}", n);
            else if (this.ss.addRule) // Otherwise use the IE API
                this.ss.addRule(selector, styles, n);
        },
        init:function() {
            this.insertRule(".code","font-size:12px;line-height:1.6");
            this.insertRule(".code pre","margin:0px;font-family:Courier New;");
            this.insertRule(".code .black","color:#000000;");
            this.insertRule(".code .kw","color:#0000FF;");
            this.insertRule(".code .note","color:#008000;font-style:italic;");
            this.insertRule(".code .gray","color:#808080;");
            this.insertRule(".code .str","color:#A31515;");
            this.insertRule(".code .sqlstr","color:#FF0000;");
            this.insertRule(".code .sqlconnect","color:#808080;");
            this.insertRule(".code .sqlfunc","color:#FF00FF;");
            this.insertRule(".code .codeSymbol","background:#FFEE62;");
            this.insertRule(".code .phpVar","color:#2B91AF;");
            this.insertRule(".code .declare","background:#FFFF00;color:#000000;");
            this.insertRule(".code .btn","margin:7px 5px 5px 0px;background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAMAAACd646MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASZQTFRFy+//8fv9xO7/1/P/5vf/z/H/ye//1vL/x+7/wO3/2/T/4vb/xu7/6/n+0vH/z/D/2vP/yO//0fH/1PL/y/D/7fr+0/L/4/b/6Pj/7vr93vX/3PT/5Pf/4fb/2fP/3/X/xOz+zvD/we3/yu7+xe7/9/3+0PH/ven9tub9zvH/2vT/w+3/v+n9w+7//P7/7/r/4PX/vOr++P7+tOT8/v//6vn+tOX85/j/+f3/x+z+vuv+6fn/7Pj+///+u+r+z/D+//3+zO389fz/vej9xOv9/f39+P3/2PL+/v/+wOz/2fP+4Pb/yu//yu38uuf97/n+1fL+ver+6fj+tub87Pn+vOj8tuf9zPD/9Pz/uun+suT8teX82PP/5ff/zfD/wu3/////////aPX6DQAAAGJ0Uk5T/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAQVpKqAAAB20lEQVR42tzWWVMaQRAH8Fn2AJcFREWQQ1yieOBBDkVzmaiJRnNo7mRmetjv/yUyLFR46jyw05sq/9tb1fvCr5qH6WFR9KTgbR3xhHn80N6IsLAoOt09vBomzsb1+QGKDCH8eliRhYJcqVZqtUp1Zcb+8w17iyE/w6Y0k4HfHSLIh8uBIUQ+u3iOIN2+YwqphXUEKVV9x/GbTiPvtNtOvuE0Z/7ui/cI8qCRt+38qt3y7Xrd9lv26uzfbQ9DfGEsO7v/Fdlx5xey2YV5Vywvi2R9MYcga93s0qLrLi5loViERP2P7U0MccFYwnIKSBqThME6hmxnSgFjQSkD5TIk7DFE9dicl8l4c0zlcipB7wVeJ0CQoLOeHFCso3Q6NoK8fqlMZe/7JwQ5+/jOlPHrBNsnL263emaQp5vH+I4v/r7bS070vnw7+MdFIpXbCn1ixBKKE0SJR1NEcGENzWff0j88QV4pkJZ+SApgjAiQhIHRLMzikjR8XyO0g0ip5OgUFlLonuwVSiNcaIXynSC04SkiQFrx3wUgKAv4GKGNSgNJYxI1mUSR1gjRmxOoavTECNAp44j4FFakiU9hvRdJjXifRG+AUOEw3fFEDP+741O6raRz77oXyB8BBgApiWd4O1/rUwAAAABJRU5ErkJggg==) no-repeat;border:none;width:78px;height:23px;");
        }
    };
    var run=function(div,text,h) {
        var edit=document.createElement("input"),run= document.createElement("input");
        edit.type="button";
        edit.value=(h?"编辑":"隐藏")+"代码";
        edit.className="btn";
        div.appendChild(edit);
        edit.onclick=function() {
            if(this.value.charAt(0)=="编"){this.value="隐藏编辑";text.style.display="block";text.focus();}
            else {this.value="编辑代码";text.style.display="none";}
        };
        run.type="button";
        run.value="运行代码";
        run.className="btn";
        run.onclick=function() {            
            var code=text.value.replace(/^\s+/,'');
            if(code.charAt(0)!='<')  eval(code);
            else {
                var win=window.open("");
                win.document.open();
                win.document.write(code);
                win.document.close();
            }
        }
        div.appendChild(run);
        div.appendChild(document.createTextNode("(提示：可以点编辑，修改部分代码后再运行！)"));
    }
    var tas=document.getElementsByTagName("textarea");
    var len=tas.length;
    for(var i=0;i<len;i++) {
        (function(cur){
            var lang=cur.getAttribute("code");
            if(lang) {
                lang=(lang+":").toLowerCase().split(":");
                var opt=lang[1],div,h;
                lang=lang[0];
                if(!HightLight.style) {HightLight.style=true;Style.init();}//添加样式
                div=document.createElement("div");
                div.className="code";
                cur.parentNode.insertBefore(div,cur);
                if(!/\bnorender\b/.test(opt))//norender不渲染
                    div.innerHTML="<pre>"+HightLight.getHtml(lang,cur.value)+"</pre>";
                h=!/\bnohide\b/.test(opt);
                if(h)//nohide不隐藏
                    cur.style.display="none";
                cur.cols=85;//set width & height for nohide & edit
                cur.rows=18;
                if(!/\bnorun\b/.test(opt) && (lang =="js" || (lang=="html" && !/MSIE 6.0/.test(navigator.userAgent)) )) run(div,cur,h);//norun不运行js和html，IE6 不运行html
            }
        })(tas[i]);
    }
})();
