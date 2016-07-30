---
title: 怎样在 Hexo 博客里创建自定义 wiki 列表
date: 2016-07-22 09:26:50
tags:
---
## Create layout
在 theme 里新建一个layout，叫 wiki , 可以直接从 post copy 一个出来（这一步如果省略，下面的 layout 直接使用 post 大概也可以 ）

这是我新建的 https://github.com/yangg/hexo-theme-even/blob/master/layout/demo.jade

## Create generator
<!--more-->
在 blog 里 新建一个文件夹 scripts，里面新建文件 `hexo-generator-wiki.js`，内容大致如下

```js
hexo.extend.generator.register('wiki', function(locals){
  var wikis = locals.pages.filter((page) => page.layout == 'wiki').sort('-date');
  // 查找对应的 pages 里对应 layout 为 wiki的
  // console.log(wikis);
  return {
    path: 'wiki/index.html',
    data: { archive: true, posts: wikis },
    layout: ['archive'] // 这里我就直接使用archive 的 layout 了，反正只是需要一个列表
  }
});
```
源文件地址：https://github.com/yangg/blog/blob/master/scripts/hexo-generator-demo.js

这样就使用 archive layout 创建了一个 wiki/index.html，点击就可以直接对应用的 pages 页面了

PS：本文是为了回答 [V2EX 上的问题](http://www.v2ex.com/t/294046)，所以将我自己使用的 demo 页面，换成了 wiki。
[查看我的 DEMO 列表](/demo)

## 更多 hexo 拓展
* [live-edit](https://github.com/yangg/blog/blob/master/scripts/live-edit.js) 将 页面里插入的前端代码（JS, CSS, SCSS, HTML) 块，当作内容插入页面，可以用来 post 里直接显示演示效果
* [hexo-filter-scss](https://github.com/yangg/blog/blob/master/scripts/hexo-filter-scss.js) 解析页面里的 SCSS 代码，可以配合上面的插件使用，或者使用 `<style type="text/scss">`
