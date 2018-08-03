---
title: Check if nodejs builtinModules
date: 2018-07-24 14:20:55
tags:
- nodejs
- builtinModules
---
前几天在[v2](https://www.v2ex.com/t/473300#reply11)看到的一个问题，总结一下4种方法：

```js
// Added in: v8.9.0
const isCoreModule = mod => require.resolve.paths(mod) === null

const isBuiltinModule = mod => {
  try {
    return require.resolve(mod) === mod
  } catch(e) {}
  return false
}
```
https://nodejs.org/api/modules.html#modules_require_resolve_paths_request
https://nodejs.org/api/modules.html#modules_require_resolve_request_options

```js
const builtin = require('module').builtinModules // Added in: v9.3.0

const builtinMods = Object.keys(process.binding('natives'))
  .filter(x => !/^_|^(internal|v8|node-inspect)/.test(x))
console.log(builtinMods.includes('fs'), builtinMods.includes('axios'))
```
https://nodejs.org/api/modules.html#modules_module_builtinmodules
