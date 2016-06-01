---
title: CSS 无图片技术总结
date: 2016-05-28 17:28:05
tags:
- css
- css3
---
## 预览
![jagged border](http://ww1.sinaimg.cn/large/006tNbRwgw1f4bcew5hs4j31bk09adgv)
动态移动边框
![动态移动边框](http://7xsffj.com1.z0.glb.clouddn.com/img%2Fborder.gif)
<!-- more -->
## 锯齿边框 - background
首先我们重复135度的白色背景，可以得到下面的
<div class="demo-jagged-border-half"></div>
```css+
.demo-jagged-border-half {
  background-image: linear-gradient(135deg, #fff 50%, transparent 50%);
  background-position: top left, top left;
  background-size: 80px 80px;
  background-repeat: repeat-x;
  
  background-color: yellowgreen;
  height: 300px;
}
```
再加一个反角度的白色背景
<div class="demo-jagged-border-half demo-jagged-border-half-2"></div>
```css+
.demo-jagged-border-half-2 {
  background-image: linear-gradient(135deg, #fff 50%, transparent 50%), linear-gradient(225deg, #fff 50%, transparent 50%);
}
```

完整的锯齿边框效果
<p data-height="265" data-theme-id="0" data-slug-hash="mJBWPG" data-default-tab="css,result" data-user="yangg" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/yangg/pen/mJBWPG/">CSS saw-tooth borders</a> by Brook Yang (<a href="http://codepen.io/yangg">@yangg</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### 更多背景效果
 * gingham
 * polka-dot
 * checkerboard
 * 动态移动边框
 [查看 demo](http://codepen.io/yangg/pen/LVGmEe)

## CSS 三角形 - border
<div class="demo-triangle"></div>
```css+
.demo-triangle {
  border: 50px solid;
  border-color: tomato orange blue purple;
  height: 0;
  width: 0;
}
```
从上面的图可以看出 css 的各边框是三角形，如果只设置下边框就可以得到三角形了。
<div class="demo-triangle-top"></div>
```css+
.demo-triangle-top {
  border-bottom: 50px solid purple;
  border-left: 50px solid transparent; /* 设置左右边框透明来撑开三角形的宽度 */
  border-right: 50px solid transparent;
  height: 0;
  width: 0;
}
```

调整各边框的宽度可以得到[更多下面这种形状](http://nicolasgallagher.com/pure-css-speech-bubbles/demo/)
![](http://ww1.sinaimg.cn/large/006tNbRwgw1f4bht8umajj30fw084dgg)


## 小箭头 - transform
在移动端（不需要兼容IE8）我们可以 rotate一个设置了上和右的边框（也可以设置其它两边或者旋转不同角度，来得到不同方向的箭头），来实现下面这种更多的箭头
<div>
<a href="javascript:" class="demo-more-link">查看更多 </a>
</div>
```css+
.demo-more-link::after {
  content: '';
  display: inline-block;
  width: 8px; height: 8px;
  border: solid 1px #aaa;
  border-width: 1px 1px 0 0;
  transform: rotate(45deg);
}
```

再加上 border-radius 也可以做出下面这种[圆角箭头按钮](http://codepen.io/yangg/pen/VLwyeY)
[![](http://ww3.sinaimg.cn/large/006tNbRwgw1f4fcgceewdj304w01kdfq)](http://codepen.io/yangg/pen/VLwyeY)

## Image Placeholder - :before
见另一篇文章 {% post_link "css-none-image-loading-error" %}

## 投影效果 - :before + box-shadow
![](http://ww1.sinaimg.cn/large/006tNbRwgw1f4bhw8966hj30ys0hegmo)
See [CSS drop-shadows without images](http://nicolasgallagher.com/css-drop-shadows-without-images/demo/)
