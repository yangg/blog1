---
title: Vertical 媒体查询案例
date: 2016-08-02 10:38:18
tags:
- css
- media-query
---
## 前言
今天看到一篇文章 [Use Cases For CSS Vertical Media Queries][1]，觉得不错，总结记录一下

## 做展示页时高屏幕内容不够也显示满屏
![](https://o8hio0x77.qnssl.com/blog/2016/i/2016-08-02_sectioning-content.jpg)
```scss
@media (min-height: 400px) {
    .section {
        height: 100vh;
    }
}
```

<!--more-->
## 固定头或脚只在屏幕够高的情况下固定
![](https://o8hio0x77.qnssl.com/blog/2016/i/2016-08-02_fixed-footer.jpg)

```scss
@media (min-height: 600px) {
    .site-header {
        position: fixed;
        /* bla bla bla */
    }
}
```


## 移动端的菜单在横屏（高度较小）时，显示两列
![](https://o8hio0x77.qnssl.com/blog/2016/i/2016-08-02_mobile-menu-solution.jpg)

更多详情见 References

## References
* [Use Cases For CSS Vertical Media Queries][1]

[1]: https://ishadeed.com/article/vertical-media-queries/
