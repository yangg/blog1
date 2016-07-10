---
title: CSS scroll snap points 实现渐进增强的滚动
date: 2016-07-09 08:14:15
tags:
- css
- scroll-snap-points
---

## 前言
前几天在 [segmentfault](https://segmentfault.com/q/1010000005854859/a-1020000005854924) 上看到有人问下面这个效果（segmentfault app 中的）怎么实现，感觉这个效果体验还不错（在移动端没有滚动条的情况能够提示有更多内容可以滚动），就用 `overflow-x: auto + width: 80%` 在 codepen 上写了个 demo。

![segmentfault app 你可能感兴趣的文章](https://o8hio0x77.qnssl.com/i/2016-07-09_IMG_1783_02.png)

## 渐近增强
刚好最近看到这篇文章 [Introducing CSS Scroll Snap Points](https://css-tricks.com/introducing-css-scroll-snap-points/) ，如果结合 Scroll snap points 每次滚动的时候每个条目始终在中间这样效果就更好了。<!-- more -->

```scss
.snap-slider {
    overflow-x: auto;
    
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: mandatory;

  scroll-snap-destination: 50% 0;
    &__scroller {
        display: table;
        text-align: center;
    }
    &__item {
        scroll-snap-coordinate: 50% 0%;
        
        display: table-cell;
        line-height: 150px; font-size: 2em;
        
        &:not(:first-child) {
            border-left: 1px solid #ccc;
        }
    }
    &__width {
        width: 80vw;
    }
}
```
属性的具体介绍，参考本文最后的参考链接

效果如下：
![css scroll snap points](https://o8hio0x77.qnssl.com/i/2016-07-09_scroll-snap-points.gif)

[查看 Demo](/demo/css-scroll-snap-points.html)

## 浏览器支持情况
遗憾的是目前(7/9/2016)只有 Firefox 和 iOS 上的 Safari 和 Chrome 原生支持（需要前缀），好在这种可以当做渐进增强，即使浏览器不支持也不影响功能。
ps：这里有个 [polyfill](https://github.com/ckrack/scrollsnap-polyfill)，但是本例中加了似乎不起作用


## 参考
* https://css-tricks.com/introducing-css-scroll-snap-points/
* https://webkit.org/blog/4017/scroll-snapping-with-css-snap-points/
* http://codepen.io/collection/XjOwrq/
