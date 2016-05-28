---
title: CSS 无图片显示加载(&失败)效果
date: 2016-05-12 13:55:34
tags:
- css
- lazyload
---
lazyload 时利用 iconfont 显示加载图片和加载失败效果
<!-- more -->
## 效果

![clipboard.png](http://ww1.sinaimg.cn/large/006tNbRwgw1f4b24oe6zej30iq06rglr)

[查看demo](http://codepen.io/yangg/pen/bpJayx/)

## 显示加载中或者品牌图
可以是文字或者 iconfont, 并将图标显示到正中间
HTML 结构如下：
```html
<a href="javascript:" class="img-wrap img-placeholder">
  <img data-src="http://ww2.sinaimg.cn/large/6eba2496gw1f3uya0kdfej20hs0b440w.jpg" />
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
* [直接使用 img:after，兼容性不好](https://bitsofco.de/styling-broken-images/) 
