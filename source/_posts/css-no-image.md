---
title: CSS 无图片技术总结
date: 2016-05-28 17:28:05
tags:
- css
- css3
---
## 锯齿边框 - background
![jagged border](http://ww1.sinaimg.cn/large/006tNbRwgw1f4bcew5hs4j31bk09adgv)
<!-- more -->
首先我们重复135度的透明背景，可以得到下面的
![](http://ww4.sinaimg.cn/large/006tNbRwgw1f4bd3pvjzlj31380f0wey)
```css
.jagged-border {
  background-image: linear-gradient(135deg, #fff 50%, transparent 50%);
  background-position: top left, top left;
  background-size: 80px 80px;
  background-repeat: repeat-x;
  
  background-color: yellowgreen;
  height: 300px;
}
```
再加一个反角度的秀景背景
```css
background-image: linear-gradient(135deg, #fff 50%, transparent 50%), linear-gradient(225deg, #fff 50%, transparent 50%);
```
![](http://ww3.sinaimg.cn/large/006tNbRwgw1f4bd6szfvqj311m0a4mxm)
完整的锯齿边框效果
<p data-height="265" data-theme-id="0" data-slug-hash="mJBWPG" data-default-tab="css,result" data-user="yangg" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yangg/pen/mJBWPG/">CSS saw-tooth borders</a> by Brook Yang (<a href="http://codepen.io/yangg">@yangg</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### [更多背景效果](http://codepen.io/yangg/pen/LVGmEe)

## CSS 三角形 - border
![](http://ww2.sinaimg.cn/large/006tNbRwgw1f4bbd0d1lxj309e06wmx7)

```css
.triangle-demo {
  border: 50px solid;
  border-color: tomato orange blue purple;
  height: 0;
  width: 0;
}
```
从上面的图可以看出 css 的各边框是三角形，
调整各边框的宽度可以得到[更多的形状](http://nicolasgallagher.com/pure-css-speech-bubbles/demo/)

## 小箭头 - transform
![](http://ww1.sinaimg.cn/large/006tNbRwgw1f4bg65s9x7j309q05w74e)
```scss
.more-link {
  &::after {
    content: '';
    display: inline-block;
    width: 8px; height: 8px;
    border: solid 1px #aaa;
    border-width: 1px 1px 0 0;
    transform: rotate(45deg);
  }
}
```

再加上 border-radius 也可以做出上面的[圆角箭头按钮](http://codepen.io/yangg/pen/VLwyeY)

## Image Placeholder - :before
见另一篇文章 [css-none-image-loading-error](http://uedsky.com/2016-05/css-none-image-loading-error/)

## 投影效果 - :before + box-shadow

[CSS drop-shadows without images](http://nicolasgallagher.com/css-drop-shadows-without-images/demo/)
