---
title: git-shortcut 命令行下快捷操作多个项目
date: 2016-07-18 20:09:31
tags:
- git
- node
---
## 前言
因为工作的电脑是 Windows，使用的 [msysGit](https://github.com/msysgit/msysgit) 终端，但是这玩意不支持多 tab，经常要在多个项目中来回操作很麻烦，所以昨天在[v2ex](http://v2ex.com) 看到这个 [小黄鸡](https://github.com/chenminhua/chat_example) 的项目就想到能不能让他操作哪个项目就操作哪个项目呢，刚才周末有空，就写了这个玩意。

## Usage

#### 使用别名操作项目
```bash
g -s b ../blog  # 添加别名
g b status      # 使用别名
g b pull
```

#### 使用特殊别名`-`，用于经常切换于两个 repo 之间时，操作相对应的另一个项目
```bash
# cwd Main
g -s - ../static    # 添加-别名
g - status          #
cd ../static
g - st              # show status of Main
```

## Installation
```bash
npm install -g git-shortcut
```

项目地址：https://github.com/yangg/git-shortcut

![git-shortcut usage](https://o8hio0x77.qnssl.com/i/brook_git-shortcut.gif)
