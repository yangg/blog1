
var sass = require('node-sass');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');

hexo.extend.filter.register('after_post_render', function(data){
  var regStyleSCSS = /(<style[^>]+?)type="text\/scss"([^>]*>)([\s\S]+?)(<\/style>)/g;
  data.content = data.content.replace(regStyleSCSS, function($, tagStart, tagGt, code, tagEnd) {
    code = sass.renderSync({
      data: code,
      outputStyle: 'nested'
    }).css.toString();
    code = postcss([autoprefixer()]).process(code).css;
    return tagStart + tagGt + code + tagEnd;
  });
  return data;
});
