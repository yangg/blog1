---
title: 如何让 Git 忽略掉文件中的单/多行内容
date: 2016-09-25 13:54:52
tags: [git, filter, gitattrbiutes, smudge, yaowenjie.github.io]
link: http://yaowenjie.github.io/编程相关/gitignore-specific-line
---
Git 忽略仓库中修改的文件（如配置文件）不提交。
## Set attrbiutes to filter in `.git/info/attributes` or `.gitattributes`
```
Apps/Mjuanpi/Conf/config.php filter=nocache
```
<!--more-->
Check you gitattributes information, it should print like the following:
```
$ git check-attr -a Apps/Mjuanpi/Conf/config.php
Apps/Mjuanpi/Conf/config.php: filter: nocache
```

## Config filter in `.git/config` or `~/.gitconfig`
```
[filter "nocache"]
  smudge = sed -e \"s/HTML_CACHE_ON' => true/HTML_CACHE_ON' => false/g\"
  clean = sed -e \"s/HTML_CACHE_ON' => false/HTML_CACHE_ON' => true/g\"
```
The "smudge" filter is run on checkout:
![smudge filter](https://o8hio0x77.qnssl.com/blog/2016/i/smudge.png)
The "clean" filter is run when files are staged:
![clean filter](https://o8hio0x77.qnssl.com/blog/2016/i/clean.png)

## References
* https://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes
* https://git-scm.com/docs/gitattributes
