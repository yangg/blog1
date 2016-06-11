---
title: hexo 自动发布
date: 2016-06-09 16:15:36
tags:
- travis-ci
- deploy
- 博客
---

## 前言
本博客是用的hexo，deploy 是配置的 rsync，因为公司用的 windows 上没有 rsync， 所以想到 push 后通过 [travis-ci](https://travis-ci.org/) 来自动 deploy，接下来就开工了...

## travis-ci
使用 github 帐号登录 https://travis-ci.org/,  将博客项目（[yangg/blog](https://github.com/yangg/blog)）开启，然后在项目下新建 `.travis.yml` 配置文件，当 push 时 travis 自动读取这个配置文件来完成 hexo 的  generate 和 deploy，但是 deploy 需要服务器的 ssh 写权限，所以就需要将 ssh key 上传到项目中，但是因为 github 的项目是公开的，这样就没有安全可言了，好在 travis 有提供[加密功能](http://blog.acwong.org/2016/03/20/auto-deploy-hexo-with-travis-CI/)，只要将 ssh key 加密放到项目中，travis 运行时再解密生成 key，这样安全的问题就解决了。
<!-- more -->
## 为 travis 生成 ssh key
```bash
ssh-keygen -f travis                    # 生成 travis, travis.pub
travis.pub >> ~/.ssh/authorized_keys    # 将公钥添加到服务器
```

## 加密私钥
travis 加密命令是要通过 gem 安装的，请确保 ruby 已经安装。
gem 因为众所周知的原因，在国内不太好访问，建议在 vps 上博客的项目目录里（没有就 clone一个，因为下面的 --add 会修改 .travis.yml ）安装执行下面的命令
```bash
gem install travis
travis login                        # github 帐号和密码，token 我没登录上
travis encrypt-file travis  --add   # 加密 travis 私钥，--add 将解密命令添加到 .travis.yml
```
将 vps 上生成的 travis.enc 和 修改过的 .travis.yml 文件复制到本地的项目目录里。
`--add` 修改的内容
```yml
before_install:
- openssl aes-256-cbc -K $encrypted_6094e4f462c1_key -iv $encrypted_6094e4f462c1_iv -in .travis/travis.enc -out ~/.ssh/id_rsa -d
```
这样加密的问题就搞定了。

## ssh known_hosts
因为 travis-ci 默认只添加了 `github.com`, `gist.github.com` 和 `ssh.github.com` 为 known_hosts，rsync 执行时会提示是否添加，但是 travis-ci 里不能输入确认，所以需要将自动服务器的域名和商品添加到 known_hosts
```yml
addons:
  ssh_known_hosts: uedsky.com:1223
```

## 然后再配置 .travis.yml 的其它配置就可以了
[完整的.travis.yml 配置](https://github.com/yangg/blog/blob/master/.travis.yml)

## 参考
* https://docs.travis-ci.com/user/encrypting-files/
* http://blog.acwong.org/2016/03/20/auto-deploy-hexo-with-travis-CI/

