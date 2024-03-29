---
title: 开启 https
date: 2022-05-14 11:07:19
tags: [acme.sh, https, nginx, http2, check-cert]
---
## 申请证书 
### Install [acme.sh](https://github.com/acmesh-official/acme.sh)
```shell
curl https://get.acme.sh | sh -s email=my@example.com
```


```shell
export Ali_Key="XX"
export Ali_Secret="XX"

acme.sh --issue --dns dns_ali -d *.17ch.cn -d 17ch.cn --force
```

### 自动更新及检查
使用 [check-cert](https://github.com/yangg/check-cert)，再检查一遍，防止自动更新证书脚本失效
```shell
npm install -g check-cert
crontab -e # 添加下面内容
0 0 * * * "${HOME}/.acme.sh/acme.sh" --cron --home "${HOME}/.acme.sh" >> /tmp/acme.cron.log 2>&1
# 检查证书是否过期
0 8 * * * PATH=/usr/local/bin:$PATH check-cert 17ch.cn --days 29 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=<key>' -H 'Content-Type: application/json' -d '{"msgtype":"markdown","markdown":{"content":"请注意，$CHECK_CERT_HOST 的 HTTPS 证书将于 <font color=\"warning\">$CHECK_CERT_DAYS</font> 天后过期！"}}' >> /tmp/check-cert.log 2>&1
```

## Nginx 配置

```nginx
# include conf.d/17ch.ssl;
listen 443 ssl http2;

ssl_certificate conf.d/*.17ch.cn/fullchain.cer;
ssl_certificate_key conf.d/*.17ch.cn/*.17ch.cn.key;

ssl_session_timeout  1d;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;

ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
```

## 拓展
```nginx
location ^~ /bom/ {
  proxy_set_header  X-Real-IP $remote_addr;
  proxy_pass http://api/;
}
location / {
  return 301 https://www.$host$request_uri;
}
```
* `location ^~`，先查找带有 **`^~`** 的前缀匹配，带有 **`^~`** 的前缀匹配成功则立即停止其他类型匹配，普通前缀匹配（不带参数 **`^~`** ）成功则会暂存，继续查找正则匹配
* `proxy_pass` trailing slash，加了结尾 `/`之后会请求 `http://api/`，如果不加会请求 `http://api/bom`

## 参考
*  https://segmentfault.com/a/1190000022315733
* https://nginx.org/en/docs/http/ngx_http_core_module.html#location
* https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass