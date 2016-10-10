---
title: 在nginx, apache 和 iis中实现反向代理
date: 2012-04-09 21:49:38
tags: [nginx, proxy]
---

最近频繁的用到反向代理（项目内部方便调试，dropbox的实时同步），就将反向代理在各种平台下的实现整理一下。

## reverse proxy in nginx
下面是我反向代理blogspot的实现

```nginx
server {
    server_name blog.uedksy.com
    location / {
        proxy_pass http://ghs.google.com
        proxy_redirect off;
        proxy_set_header Host $host
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwared-For $proxy_add_x_forwarded_for;
    }
}
```

## reverse proxy in apache
本地将代理notify8.dropbox.com到vps，实现实时同步（当然，vps再代理穿墙）

```apache
# Listen 80
NameVirtualHost *:80
<VirtualHost *:80>
    ServerName notify8.dropbox.com
    ServerAlias notify*.dropbox.com
    ProxyPass / http://file.uedsky.com/
    ProxyPassReverse / http://file.uedsky.com/
</VirtualHost>
```

**Note: The final slash is required.**

if you are running on ubuntu, you may need to run the following code to enable proxy modules

```bash
sudo ln -s /etc/apache2/mods-available/proxy.load /etc/apache2/mods-enabled
sudo ln -s /etc/apache2/mods-available/proxy_http.load /etc/apache2/mods-enabled
sudo service apache2 force-reload
```

or add this to your config file if you are running apache on windows

```bash
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

More about `ProxyPass` and `NameVirtualHost`, see [Apache Module mod_proxy][mod_proxy] and [Apache Core Features][apache_core]

## "reverse proxy" in IIS
这里之所以加了引号，是通过 rewrite来实现的，不能算真正的反向代理

首先需要安装 [ApplicationRequestRouting](http://www.iis.net/download/ApplicationRequestRouting),然后就是配置web.config中的项了

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="ReverseProxyInboundRule1" stopProcessing="true">
                    <match url="(.*)" />
                    <action type="Rewrite" url="http://blog.uedsky.com/{R:1}" />
                    <serverVariables>
                        <set name="HTTP_ACCEPT_ENCODING" value="" />
                    </serverVariables>
                </rule>
            </rules>
            <!-- Outbound Rewriting to fix the Links -->
            <outboundRules>
                <preConditions>
                    <preCondition name="ResponseIsHtml">
                        <add input="{RESPONSE_CONTENT_TYPE}" pattern="^text/html" />
                    </preCondition>
                </preConditions>
                <rule name="ReverseProxyOutboundRule1" preCondition="ResponseIsHtml">
                    <match filterByTags="Link, A, IFrame, Script" pattern="^http://www.blogger.com/(.*)" />
                    <action type="Rewrite" value="http://blog1.uedsky.com/{R:1}" />
                </rule>
            </outboundRules>
        </rewrite>
    </system.webServer>
</configuration>
```

这里添加了`outboundRules`，是为了修复源码中绝对链接地址的。

上面setVariables, 设置`HTTP_ACCEPT_ENCODING`为空，防止下面`outboundRules`在修复链接出错，[See enabling set server variables here](http://learn.iis.net/page.aspx/686/setting-http-request-headers-and-iis-server-variables/).

## References

* [Nginx HttpProxyModule](http://wiki.nginx.org/HttpProxyModule)
* [Setting up a Reverse Proxy using IIS, URL Rewrite and ARR](http://blogs.msdn.com/b/carlosag/archive/2010/04/02/setting-up-a-reverse-proxy-using-iis-url-rewrite-and-arr.aspx)

[apache_core]: http://httpd.apache.org/docs/current/mod/core.html
[mod_proxy]: http://httpd.apache.org/docs/current/mod/mod_proxy.html
