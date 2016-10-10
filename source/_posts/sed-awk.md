---
title: sed & awk
date: 2016-10-10 20:38:09
tags: [sed, awk]
---
## 九九乘法表
```bash
# print multiplication formulas
seq 9 | sed 'H;g' | awk -v RS='' '{for(i=1;i<=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'
```
<!--more-->
## [sed tutorial](http://coolshell.cn/articles/9104.html)
[stream editor](http://www.gnu.org/software/sed/manual/sed.html)

```bash
# s replace
sed 's/old/new/'
# replace all
sed 's/old/new/g'
# replace line
sed '3s/old/new/g'
# replace range of lines
sed '3,5s/old/new/g'
# replace 第n个
sed 's/old/new/3'
# replace 第n个及以后
sed 's/old/new/3g'
# multiple expression
sed '/^#/d;s/#.*$//'
sed -e '/^#/d' -e 's/#.*$//'
# N append the next line of input into the pattern space
sed 'N;s/\n/,/'      # join every two lines
# a append
# i insert
# c change
# d delete
sed '1 i This will insert before line 1'
sed '$ a append after the last line'
sed '/reg/a append after the matching line'
sed "2 c I'd like to change line 2"
sed '/reg/c change the matching line'
sed '/reg/d'
sed '2d'
sed '3,$d'
# p print, works like grep
sed -n '/grep/p'
sed -n '/start/,/end/p'
sed -n '3,/end/p'
# Match  every  step'th  line starting with line first
# odd
sed -n '1~2p'
# even
sed -n '2~2p'
sed -n '1~2!p'
#
sed '3,6 {/This/d}'
sed '3,6 {/This/{/fish/d}}'
# g G   Copy/append aptter space to hold space
# h H   Copy/append hold sapce to pattern space
# x     Exchange the contents of the hold and pattern spaces
```

### 单行脚本快速参考
[SED单行脚本快速参考（Unix 流编辑器）](http://sed.sourceforge.net/sed1line_zh-CN.html)
[USEFUL ONE-LINE SCRIPTS FOR SED (Unix stream editor)](http://sed.sourceforge.net/sed1line.txt)

### 快速学习
{% link_image https://o8hio0x77.qnssl.com/i/2016-10-10-183345_1216088706.png "sed 快速学习" %}

## [awk tutorial](http://coolshell.cn/articles/9070.html)
[The GNU Awk User's Guide](http://www.gnu.org/software/gawk/manual/gawk.html)

```bash
# Prepare
ps -ef > ps.txt
# 打印指定列
awk '{ print $1, $8 }' ps.txt
# 格式化 printf
awk '{ printf "%-8s %s\n", $1, $8 }' ps.txt
# 过滤， ==, !=, <, >, <=, >=
awk '$1 == "root" && $3 == 1' ps.txt
# print header
awk '$2 < 10 || NR == 1' ps.txt
```
### [内建变量](http://www.gnu.org/software/gawk/manual/gawk.html#Built_002din-Variables)

```bash
# $0    当前记录（这个变量中存放着整个行的内容）
# $1~$n 当前记录的第n个字段，字段间由FS分隔
# FS    输入字段分隔符 默认是空格或Tab
# NF    当前记录中的字段个数，就是有多少列
# NR    已经读出的记录数，就是行号，从1开始，如果有多个文件话，这个值也是不断累加中。
# FNR   当前记录数，与NR不同的是，这个值会是各个文件自己的行号
# RS    输入的记录分隔符， 默认为换行符
# OFS   输出字段分隔符， 默认也是空格
# ORS   输出的记录分隔符，默认为换行符
# FILENAME  当前输入文件的名字
```
```bash
# 指定分隔符
awk 'BEGIN{FS=":"} { print $1, $6 }' /etc/passwd
awk -F: '{ print $1, $6 }' /etc/passwd
# 指定多个分隔符
awk -F '[;:]'
# 指定输出分隔符
awk -F: '{ print $1, $6 }' OFS="\t" /etc/passw
# 正则匹配
awk '$6 ~ /pts|tty/ || NR == 1 {print NR, $1, $6, $8 }' ps.txt
awk '$6 !~ /\?/ { print $1, $6, $9}' ps.txt
# or like grep
awk '/grep/' ps.txt
awk '!/grep/' ps.txt
# redrect
awk 'NR!=1{ print $8 > $1 }' ps.txt
awk 'NR!=1{ print > $1 }' ps.txt
# if else
awk 'NR!=1{if($8 ~ /chrome/) print $8 > "ifchrome.txt";
else if($8 ~ /gnome/) print $8 > "elseifgnome.txt";
else print $8 > "else.txt" }' ps.txt
# sum
du -s ~/* | awk '{sum+=$1} END { print sum }'
# sum & array
ps aux | awk 'NR!=1{a[$1]+=$6;} END { for(user in a) print user ", " a[user] "KB"; }'
# Rank top 10 most frequently used commands
history | awk '{if ($2 == "sudo") a[$3]++; else a[$2]++}END{for(i in a){print a[i] " " i}}' | sort -rn | head
history | awk '{print $2}' | sort | uniq -c | sort -rn | head
```
### 单行脚本快速参考
[《SED 单行脚本快速参考》的 awk 实现](http://luy.li/2009/12/07/sed_awk/)

### 快速学习
{% link_image https://o8hio0x77.qnssl.com/i/2016-10-10-183345_1216088794.png "awk 快速学习" %}
