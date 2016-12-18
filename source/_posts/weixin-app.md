---
title: 微信小程序开发一周总结
date: 2016-11-12 15:21:13
tags: [weapp, weixin, es6]
---

## 编辑器
我直接用 vscode（其它编辑器同理，预览还是用的微信开发工具），语法高亮将 wxml 设置成 html, wxss 设置成 css
```json
"files.associations": {
  "*.wxss": "css",
  "*.wxml": "html"
}
```
也可以安装小程序相关插件

## 开始写代码
* 首先需要完整看完微信小程序文档（框架，组件和 API），方便后面用到时查找。
* view 组件对应 html 里的 div
* text 对应 span
* wxss 里选择器只支持 `element, #id, .className, ::after, ::before`

## 公用组件
项目目录里新建 components ，按类似 pages 目录结构，将每个组件的模板，样式和 js 文件放在同一个文件夹
![微信小程序组件目录结构](https://o8hio0x77.qnssl.com/blog/2016/i/2016-11-12-075312.jpg)
* 模板可以直接 `<include/>` 或者需要传值的使用 `<import/>` + `<template></template>`
* 样式使用 `@import` 导入
* js 使用 `require` 引入到页面，然后使用下面的 [mergePage](#mergePage) 来加载到页面对象中。
<!--more-->
## mergePage
* 组件的加载
```js
const ErrorMsg = require('../../../components/error-msg/error-msg');
Page(util.mergePage({
  // 页面 Page 方法...
  onLoad() {
    // 可以直接在页面方法中调用 showErrorMsg 方法
  }
}, ErrorMsg/* 更多组件也可以*/));
```
使用`mergePage`方法的优点是可以将所有**组件方法及页面事件注册到页面对象**

* 组件的编写方式
```js
var errorTimer;

module.exports = {
  showErrorMsg(msg, cb) {
    clearTimeout(errorTimer);
    this.setData({
      errorMsg: msg
    });
    errorTimer = setTimeout( () => {
      this.setData({
        errorMsg: false
      });
      cb && cb();
    }, 2000);
  }
  // 可以在这里注册 `onLoad`，`onShow`等页面事件
}
```
组件里使用可以 `this.setData` 来更新页面数据，或者注册 `onLoad`，`onShow`等页面事件，`mergePage` 的最后一个参数的事件会最先调用。

* mergePage 的源码
```js
/**
 * 合并 Page 对象所有的方法及事件
 * 子对象不能使用 data 属性，请在 onLoad 中使用 setData 方法设置
 */
function mergePage(dest, ...src) {
  let args = arguments;
  let eventsStack = {
    onLoad: [],
    onReady: [],
    onShow: [],
    onHide: [],
    onUnload: [],
    onPullDownRefresh: [],
    onReachBottom: [],
  };
  // 保存所有的事件，最后一个参数的事件会最先调用。
  for(let name in eventsStack) {
    for(let i = args.length - 1; i >= 0; i--) {
      args[i][name] && eventsStack[name].push(args[i][name])
    }
  }
  // Object.assign(...args);
  // Object.assign 需要添加 polyfill 兼容 Android（不支持数组参数展开）
  Object.assign.apply(null, args);
  for(let name in eventsStack) {
    dest[name] = function() {
      for(let i = 0; i < eventsStack[name].length; i++) {
        eventsStack[name][i].apply(this, arguments);
      }
    }
  }
  return dest;
}
```

## `Object.assign` Android 上兼容问题
小程序里在 Android 上没有 `Object.assign` 这个，除了上面的 mergePage，其它地方也会经常用到。
我们可以到 app.js 里检测是否支持，然后添加 polyfill

```js
// polyfill for Android before app starts
if(!Object.assign) {
  Object.assign = require('./utils/object-assign')
}
```

`utils/object-assign.js` 源码

```js
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
module.exports = function (target) {
  // We must check against these specific cases.
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index];
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
  }
  return output;
};
```

## es 6 应用
### 箭头函数，函数参数默认值及解析构
```js
wx.request({
  complete: ({data= {}}) => {
    // 1. 因为 wx.request 返回的接口数据是在 data 属性里，这里我们只要 data 属性就行了，所以直接参数解析构
    // 2. 如果 failed，无 data 时，data 将为默认值 {}
    if(data.code !== 0) {
      // do something if request failed
      return;
    }
    // 请求正常处理代码
    // 3. 因为用的箭头函数，回调里可以正常使用 this, 访问 Page 对象的方法
    // 比如 this.setData(...)
  }
})
```
一些函数参数也可以直接使用默认参数。

### 拓展运算符 和 对象属性简写
在给 template 传 data 参数时，可以使用对象属性简写，如
```html
<template is="..." data="{{...obj, id: otherIdVariable, name}}"></template>
```
这样 template 中可以使用变量为 `obj` 对象的所有 key，以及 `id` 和 `name`
### 模板字符串
小程序里可以直接方便的使用 es 6 模板字符串
```js
let url = `${app.globalData.API_PREFIX}/cart/add`;
```
### 更多 es 6 特性
请参考：https://uedsky.com/2016-06/es6/

## 其它注意
* `wx.showToast` 图标只支持"success"、"loading"，错误提示得自定义
* 如果 template 里面的变量没值，请看 data 传进来没有。
* 开发工具（v0.10.102800）可以用下面方法添加接口请求域名，遗憾的是微信里不行。
```js
// 放到 app.js 前面
 __wxConfig.projectConfig.Network.RequestDomain.push('https://weapp.juanpi.com');
```
* 所有页面的 JS 会在启动时立即执行，而不是打开页面才执行，所以一些写在全局的代码应该尽量放到　onLoad 之后，下面是从调试 source 里看到加载的代码：

```js
define("pages/index/index.js", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,XMLHttpRequest,WebSocket ){ 'use strict';

var app = getApp();

var util = require('../../../utils/util');
var ErrorMsg = require('../../../components/error-msg/error-msg');
var AddressPicker = require('../../../components/address-picker/address-picker');

Page(util.mergePage({
  // 页面代码省略
}, AddressPicker, ErrorMsg));
//# sourceMappingURL=data:application/json;...
});require("pages/index/index.js")
```


## 参考
* https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html
