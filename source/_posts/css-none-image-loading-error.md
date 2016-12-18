---
title: CSS :after 显示加载&失败效果
date: 2016-05-12 13:55:34
tags:
- css
- lazyload
---
lazyload 时利用 :after 显示加载效果和加载失败效果
<!-- more -->
## 效果

![clipboard.png](https://o8hio0x77.qnssl.com/blog/2016/i/2016-06-09_12:38:05.jpg)

[查看demo](http://codepen.io/yangg/pen/bpJayx/)

## 显示加载效果（文字，iconfont 或背景图）到正中间
HTML 结构如下：
```html
<a href="javascript:" class="img-wrap img-placeholder">
  <img data-src="https://o8hio0x77.qnssl.com/blog/2016/i/2016-06-09_12:38:05.jpg" />
</a>
```
```scss
.img-placeholder {
  font-size: 6em; line-height: 1; color: #999 !important;
  position: relative;

  &::after {
    content: 'Loading';
    @include position(absolute, 50% 0 null);
    margin-top: -.5em;
    line-height: inherit;
    z-index: -1; // 使图片加载后能够后直接盖住图标
  }
}
```
## 利用 lazyload 加载图片
## 加载加粗文字失败后更改图标（或文字）
这里需要用 js 在图片 onerror 里添加 `class="img-error"`
```scss
&.img-error::after {
  content: 'Load failed';
  font-size: 20px;
}
&.img-error img {
  display: none; // 隐藏出错图片
}
```

效果和完整代码见上面 demo

## 参考
* SCSS 部分使用了 http://bourbon.io/
* [直接使用 img:after 显示加载错误错要（兼容性不好）](https://bitsofco.de/styling-broken-images/)
