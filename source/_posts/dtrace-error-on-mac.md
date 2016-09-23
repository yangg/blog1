---
title: Mac 上 "Building dtrace-provider failed with exit code 1 and signal 0"
date: 2016-09-23 08:55:49
tags: [npm, dtrace]
---
## 前言
在 Mac 上 npm install 安装 Node 信赖包时出现下面的错误
```
---------------
Building dtrace-provider failed with exit code 1 and signal 0
re-run install with environment variable V set to see the build output
---------------
```
<!--more-->
设置环境变量 V 之后就可以显示错误信息了
```
brook@Brooks-MacBook-Pro: ~/Public/docs $ export V=~/Public/docs/aa.log
brook@Brooks-MacBook-Pro: ~/Public/docs $ rm -r node_modules/dtrace-provider/
brook@Brooks-MacBook-Pro: ~/Public/docs $ npm install

> dtrace-provider@0.6.0 install /Users/brook/Public/docs/node_modules/dtrace-provider
> node scripts/install.js

gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR
gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR


Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.



gyp WARN download NVM_NODEJS_ORG_MIRROR is deprecated and will be removed in node-gyp v4, please use NODEJS_ORG_MIRROR


Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.

gyp ERR! build error
gyp ERR! stack Error: `make` failed with exit code: 69
gyp ERR! stack     at ChildProcess.onExit (/Users/brook/.nvm/versions/node/v6.2.1/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:276:23)
gyp ERR! stack     at emitTwo (events.js:106:13)
gyp ERR! stack     at ChildProcess.emit (events.js:191:7)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:204:12)
gyp ERR! System Darwin 15.6.0
gyp ERR! command "/Users/brook/.nvm/versions/node/v6.2.1/bin/node" "/Users/brook/.nvm/versions/node/v6.2.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/brook/Public/docs/node_modules/dtrace-provider
gyp ERR! node -v v6.2.1
gyp ERR! node-gyp -v v3.3.1
gyp ERR! not ok
```
注意上面的 `Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.`
## 解决方法
打开 Xcode 点同意，输入密码，执行安装完成后再重新执行 `rm -r node_modules/dtrace-provider/ && npm install` 就可以了

这样问题就解决了（这种错误我也是醉了），记录一下，供其它人参考

## 参考
https://github.com/trentm/node-bunyan/issues/216#issuecomment-71074784
