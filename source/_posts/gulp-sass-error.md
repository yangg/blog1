---
title: gulp sass 出错后显示错误提示到页面，不退出进程
date: 2016-05-13 13:53:04
tags:
- sass
- scss
- gulp
---
## 错误显示

![clipboard.png](https://o8hio0x77.qnssl.com/blog/2016/i/2016-06-09_12_34_42.jpg)

## sass 或 less 编译出错后不退出
需要监听 sass 的`error`事件
<!-- more -->
```
...
.pipe(sass().on('error', notify))
...
function notify(err) {
  // prevent gulp process exit
  this.emit('end');
}
```
 
## 将编译的错误信息显示到页面
受到compass 启发，将出错信息利用 `body:before { content: }` 输出

完整的代码如下
```js
function notify(err) {
  // prevent gulp process exit
  this.emit('end');

  var title = err.plugin + ' ' + err.name;
  var msg = err.message;
  // print error to stderr
  process.stderr.write(title + '\n ' + err.messageFormatted);
  // system notification
  notifier.notify({
    title: title,
    message: msg,
    sound: 'Morse'
  });

  // show sass compile error on page
  // get dest file from error file
  var errFile = err.relativePath.replace(/\bscss\b/g, 'css');
  if(err.file != 'stdin') { // error occurred in a partial file (via @import)
    errFile = 'static/css/app.css'; // show error in a default file
  }
  var errContent = msg.replace(/\n/g, '\\A '); // replace to `\A`, `\n` is not allowed in css content
  // http://codepen.io/scottkellum/pen/YXbpeQ
  fs.writeFile(errFile, util.format('body:before { background: #fff; padding: 15px;' +
    'position: fixed; left: 0; right: 0; z-index: 99999;' +
    'overflow-y: auto; border-bottom: solid 1px #eee; color: #C93900;' +
    'white-space: pre; font-family: monospace;' +
    'content: \'%s\';}', errContent)
  );
}
// usage
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', notify))
    .pipe(gulp.dest('./css'));
});
```

## 参考
[Debug Sass in Codepen](http://codepen.io/scottkellum/pen/YXbpeQ)
