---
title: 博客升级到 https 和 http2
date: 2016-06-10 14:42:06
tags:
- http2
- https
- nginx
- 博客
- 性能
---

## 为什么升级到 HTTPS
* HTTP/2 必须基于 HTTPS 部署
* 一些 HTML5 API (Geolocation, .etc) 必须在[安全环境](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins)下使用
* 更加安全的数据传输，无广告插入
* 爱折腾
<!-- more -->

## nginx 添加 https 和 http2 模块支持

执行 `nginx -V` 查看 nginx 编译时是否包含 `--with-http_ssl_module` 和 `--with-http_v2_module` 两个参数，如果没有，copy `nginx -V` 里面的 `config arguments`，再加上这两个的模块重新编译安装

```bash
curl https://nginx.org/download/nginx-1.11.1.tar.gz |\
 tar xzf - && cd nginx-* # get latest nginx & extract it
./configure [old_config_arguments] --with-http_ssl_module --with-http_v2_module # 前面 [old_config_arguments] 可以从 nginx -V 里 copy
make
sudo make install
```

## 申请 HTTPS 证书
试了 startssl 家的，结果发现比较复杂，后面还是完全按照这个 [Let's Encrypt，免费好用的 HTTPS 证书][https] 方便，各种命令执行完就好了。

## nginx 配置
有了 https 证书，就可以开启 https 和 http2 了
```nginx
listen 443 ssl http2;

ssl_certificate      /home/brook/ssl/chained.pem;
ssl_certificate_key  /home/brook/ssl/domain.key;
ssl_dhparam          /home/brook/ssl/dhparams.pem;

ssl_ciphers                EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+ 3DES:!MD5;
ssl_prefer_server_ciphers  on;
ssl_protocols              TLSv1 TLSv1.1 TLSv1.2;
ssl_session_cache          shared:SSL:50m;
ssl_session_timeout        1d;
ssl_session_tickets        on;

add_header      Strict-Transport-Security max-age=31536000;
```
然后 `service reload nginx` 重新加载配置就可以了

![uedsky.com http2](https://o8hio0x77.qnssl.com/i/2016-06-11_10:42:38.jpg)

## 参考
* [免费好用的 HTTPS 证书][https]
* [Nginx 配置之完整篇][nginx]

[https]: https://imququ.com/post/letsencrypt-certificate.html
[nginx]: https://imququ.com/post/my-nginx-conf.html

