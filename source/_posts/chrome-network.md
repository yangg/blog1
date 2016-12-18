---
title: 我不知道的 Chrome Network 面板技巧
date: 2016-09-24 13:38:56
tags: [Chrome, 性能]
---
## 页面加载及渲染过程快照
点击网络面板左上角的第三个摄像机图标按钮，进入录制模式，刷新后就可以录制页面加载渲染过程了（网络加载过快也可以在 `No throttling` 那里选择限制网络为 3G）
![chrome network screenshot](https://o8hio0x77.qnssl.com/blog/2016/i/2016-09-24_chrome-network-screenshot.png)
录制完成结果如上图，每个快照上面有对应的时间，鼠标移动到每一个快照上时，相应的时间点也在下面的 Timeline 里显示。
双击即可打开查看快照时页面的渲染状况，按右方向键可以切换到下一张

我们可以利用此功能清楚的知道我们的页面上每部分的渲染顺序，优化首屏加载等。
<!--more-->

## 查看请求发起源等信息
* Initator 列显示哪个文件及位置加载的这个请求
* 列头可以点击排序，也可以右键添加更多列，如 `Protocol`

## 过滤请求
* 按住 Ctrl or Command (Mac) 可以点击选择多个过滤条件，见上面的图
* 过滤输入框支持支持条件查询：如 `domain:*.juancdn.com larger-than:10k`, 更多参考：[filter-requests](https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/resource-loading?hl=en#filter-requests)


## XHR 重放
在 ajax 请求上右键，选择 `Replay XHR`，可以将重新再发一遍，这在前端调试接口时比较好用。

## 相关参考
* https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/resource-loading?hl=en
* [Chrome 控制台不完全指南](http://www.cnblogs.com/Wayou/p/chrome-console-tips-and-tricks.html)
