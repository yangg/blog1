---
title: Nginx expires map
date: 2018-07-23 14:27:33
tags:
- nginx
- expires
- sent_http_content_type
---

## 莫名其妙的过期时间

在nginx 里设置 expires 时，网上流传的代码都是通过 `$sent_http_content_type` 来 map，大概如下
```nginx
map $sent_http_content_type $expires {
    default             60d;
    ~image/             20d
    text/manifest       30s;
}
expires $expires;
```
最近遇到一个问题，cdn 里的 manfiest 文件设置的过期时间是30s，发现无法更新缓存，刷新缓存后前30s 看过期时间是30s，后面就变成 5184000，感觉莫名其妙。
实在想不到解决办法，提了阿里去的工单，过了几天终于反馈说 30s 过期后回源时加了 `if-modified-since` header 后，我们源站返回304的的过期时间有问题。
这时才发现这个 5184000 是上面的 default 的时间。
所以猜测**加了 `if-modified-since` header 请求时，nginx 直接返回 304，此时并没有读取文件，导致 `$sent_http_content_type` 为空，所以map 取了 default 的值**

## 改为通过 `$uri` 后缀来 map 问题解决
```nginx 
map $uri $expires {
    default             60d;
    ~\.html$            14d;
    ~\.manifest$        30s;
}
```