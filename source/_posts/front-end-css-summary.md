---
title: 前端常用样式总结
date: 2016-05-15 12:10:00
tags:
- css
- css3
---

本文全部使用 scss + autoprefixer
Brower support: [flex box(IE 10+)](http://caniuse.com/#search=flex), [:before & :after IE 8+(IE8 only supports the single-colon)](http://caniuse.com/#search=generate)

## Sticky footer

内容高度不够时，footer 依然显示到最下面
大概有这样的 html 结构
<!-- more -->
```html
<div id="content">
</div>
<div id="footer">&copy; Brook.inc</div>
```

* flex 布局

  ```scss
  html {
    height: 100%;
  }
  $footer-height: 30px;
  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
  #content {
    flex: 1;
  }

  #footer {
    line-height: $footer-height;
    text-align: center;
  }
  ```
  [查看 demo](http://codepen.io/yangg/pen/dMLgbv)

* -margin & padding

  ```scss
  html, body {
    height: 100%;
  }
  $footer-height: 30px;
  #content {
    min-height: 100%;
    margin-bottom: -$footer-height;
    padding-bottom: $footer-height;
    // requires box-sizing: border-box;
    // 下面的不需要 border-box
    /*
    &::after {
      content: '';
      display: block;
      height: $footer-height; // footer height
    }
    */
  }

  #footer {
    line-height: $footer-height;
    text-align: center;
  }
  ```
[查看 demo](http://codepen.io/yangg/pen/GZLyQE)

## absolute center
不定宽高的垂直水平居中
* 首先 flex

  ```css
  .center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```


* transform

  ```scss
  .center-transform {
    img {
      position: relative; left: 50%; top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  ```

* table-cell

  ```css
  .center-tb-cell {
    display: table-cell;
    text-align: center; vertical-align: middle;
  }
  ```

* `:after`，兼容性也不错可以，不想用 table-cell 时可以用

  ```scss
  .center-ib {
    text-align: center;
    &::after {
      content: '';
      display: inline-block; vertical-align: middle;
      height: 100%;
    }
    img {
      vertical-align: middle;
    }
  }
  ```

[垂直水平居中 demo](http://codepen.io/yangg/pen/WvbbXd)

## Cenerting float
居中浮动元素
```scss
.center-float {
  // 父容器会产生滚动条
  float: left; position: relative; left: 50%;
  > ul {
    position: relative; left: -50%;
  }
}
```

[float 居中 demo](http://codepen.io/yangg/pen/WvMQqz)

## Autohiding scrollbars for IE
IE 自动隐藏滚动条 (works in Edge and IE10/11)
```css
html {
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
```

## 多行文字截取
[-webkit-line-clamp or linear-gradient](http://codepen.io/yangg/pen/mJEVPx)

---
以下是针对移动端 (mobile)的

## Tap highlight
点击时高亮背景

```scss
.item {
  -webkit-tap-highlight-color: rgba(0,0,0,0); // 隐藏系统自带的背景
  // add `ontouchstart` attribte on body
  // to allow :active work (if :active not work)
  &:active {
    background: #ECECEC
  }
}
```
只添加上面的样式，:active 在移动端不一定（已经引入 zepto 的已经包含下面的 js 了）生效，需要下面的js

```js
document.body.addEventListener('touchstart', function() {}, false);
// 也可以直接在body上添加 `ontouchstart` 属性，
```

## Half pixel border
移动端半像素的边框
* :after + scale(0.5) (可以是某一到两个边，或者全部边(支持圆角))
* svg background
* svg border-image
[查看 demo](http://codepen.io/yangg/pen/dMKmLr)

## Cells
移动端常用的 cells 布局

![](//ww3.sinaimg.cn/large/006tNbRwgw1f4b1tev5v8j30ci0m8ab3)

[查看微信我页面 demo (cell + tap highlight + half pixel border)](http://codepen.io/yangg/pen/bpJxyj)


## smooth scroll in webkit

平滑滚动
```css
-webkit-overflow-scrolling: touch;
```
