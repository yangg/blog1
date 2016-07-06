---
title: "移动端的友好的 text-overflow: ellipsis 样式"
date: 2016-07-06 21:43:52
tags:
- css
- text-overflow
---
## 前言
一般在PC 上我们使用 `text-overflow: ellipsis ` 来截掉过长的文字，显示成 `...`， 之后还可以加 title 之类的鼠标移上去显示完整的文字，但是移动端也这样的话，就没办法移上去显示了
今天在手机上打开 [reddit](https://www.reddit.com/) 发现每个 post 的标题栏是可以滚动的，感觉这种效果用在移动端做 text-overflow 效果比较好。
<!-- more -->
## 实现
实现起来也比较简单，代码如下
```scss
.text-scrollable {
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    &__scroller {
        overflow-x: auto;
        padding-right: 1.5em;
    }
}
```

## 增强
可是这样感觉效果并不完美，因为过长的文字直接不显示，手机上的滚动条也不会显示，这样用户完全不知道这里可以滚动，想到之后做[多行文字截取](https://codepen.io/yangg/pen/mJEVPx)时用的 `::after` 做的白色透明渐变效果加在这里应该也不错。

## 演示效果 + 完整代码
```html+
<div class="text-scrollable" style="max-width: 375px;"><!-- PC 屏幕太宽，我加个宽度限制，默认就是整行 -->
    <div class="text-scrollable__scroller">Enjoy when you can, and endure when you must. 用手机查看无滚动条，效果更佳。</div>
</div>
```
```css+
.text-scrollable {
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}
.text-scrollable__scroller {
  overflow-x: auto;
  padding-right: 2em;
}
.text-scrollable::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 2em;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), white);
}
```

[查看 Codepen demo](https://codepen.io/yangg/pen/QEgRxb)
