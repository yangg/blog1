---
title: 前端 JavaScript 错误收集
date: 2016-09-06 16:13:59
tags:
- onerror
- javascript
- trackjs
---

## 前言
最近有个页面写好后在 Chrome devtools 里运行正常，但是手机上运行时却出了问题，就想着在代码里添加下面的内容，到手机上显示错误消息
```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  alert('Error: ' + msg + ' Script: ' + url + '\nPosition: ' + lineNo + ' / ' + columnNo
   + '\nStackTrace: ' +  error);
  return false;
};
```
可是到手机上一看，错误信息并没有打印出来，而是 `Error: Script error `
只好放狗 (Google) 一查，原来是跨域问题
<!--more-->
## 解决跨域问题
* script 添加 crossorigin 属性
```js
<script crossorigin src="...">
```
* 然后为 js 文件添加跨域 header `Access-Control-Allow-Origin: *`（[怎样添加？](http://enable-cors.org/server.html)）

## 收集 JavaScript 错误
在工作中，我们经常遇到本地无法重现的错误，我们可以将 `onerror` 捕获的错误信息提交到服务器，这样我们就知道用户在访问我们的网页时的 js 错误，方便 BUG 定位等。
```js
window.onerror = function (msg, url, lineNo, columnNo, error) {
  var errorData = {
    msg: msg,
    url: url,
    lineNo: lineNo,
    columnNo: columnNo,
    error: error,
    ua: navigator.userAgent // 还可以添加更多调试所需信息，比如登录了的用户 id 等
  };
  $.post('/js-logger', errorData);
  return false;
};
```
### 参数解析
`msg, url, lineNo, columnNo`， 这4个参数看名字就能知道大概意思了。
`error`，[Error Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) (object) 表示当前错误对象，包含当前错误比较详细的堆栈等信息，需要比较新的浏览器才有这个参数。

## 总结
这样我们就可以利用 onerror 收集用户的 JavaScript 报错信息了

完整的 JavaScript 错误收集系统见下面的参考链接。

## 参考链接
* https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
* https://medium.com/javascript-scene/debugging-production-javascript-469668ba247b
* https://trackjs.com/blog/script-error-javascript-forensics/
* [BugHD for JavaScript 全面收集前端报错](http://bughd.com/doc/javascript)
