---
title: webp Upgrade
date: 2016-09-23 21:43:41
layout: post
---
## 怎样在项目中使用
* html 中 使用 `data-src` 来引用 图片时**直接引用** webp 的格式

```html
<div class="head-banner" data-src="__ACTSTATIC__/jpwebapp/oct10_16/_dist/head_banner.jpg.webp?{:C('APP_ACT_LOADSOURCE_VERSION')}"...
```
* css 中 使用 scss mixin `bg-webp` 来引用
```scss
@include bg-webp('img/filename.png', $bg-options: no-repeat, $bg-size: 100% 100%);
// 1. 第一个参数指定图片路径（不包含.webp）
// 2. bg-options, 默认值 'no-repeat'，指定 'no-repeat center'等背景选项
// 3. bg-size, 默认值 '100% 100%', 指定背景大小
```

## 原理相关
1. gulp 编译时会使用 imagemin-webp 生成图片对应的 .webp 图片
1. `jp.hasWebp()` 方法检测是否支持 webp 图片
2. 支持 webp 的会在 html 元素上添加 `class="has-webp"` 给 css 使用
3. lazyload 加载图片之前 会将支持的 webp 浏览器 图片地址添加 .webp 后缀

```js
$$.hasWebp = (function() {
    var hasWebp = 0;

    function checkWebp(callback) {
      // https://developers.google.com/speed/webp/faq
      var img = new Image();
      img.onload = function() {
        callback( this.width > 0 && this.height > 0 );
      };
      img.onerror = function () {
        callback( false );
      };
      // check lossless, same support as alpha
      img.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
    }

    function webpReady() {
      $$.log('has webp: true');
      $(document.documentElement).addClass('has-webp');
    }

    if('webp' in localStorage) { // 已经检测过
      hasWebp = ~~localStorage.webp; // covert to 0 or 1
      hasWebp && webpReady();
    } else {
      checkWebp(function(webp) {
        localStorage.webp = +webp;
        hasWebp = true;
        webp && webpReady();
      });
    }
    return function() {
      return hasWebp;
    };
  })();
```
```js
jp.hasWebp() && img.attr('data-src', img.attr('data-src').replace(/(.*?)(?=\?|$)/, '$1.webp'));
```

```scss
@mixin bg-webp($url, $bg-options: no-repeat, $bg-size: 100% 100%) {
  background: url($url) #{$bg-options};
  background-size: $bg-size;
  .has-webp & {
    background-image: url(#{$url}.webp);
  }
}
```

## 其它变动
1. 创建了 $actstatic/common/scss 文件夹，用来存放活动公用的组件样式
