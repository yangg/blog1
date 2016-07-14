'use strict';

var config = hexo.config;

hexo.extend.filter.register('before_post_render', function (data) {
  if (!config.postscript || data.layout !== 'post') {
    return data;
  }

  var getPS = new Function('post', 'return `' + config.postscript + '`');
  var postscript = getPS(data);
  data.content += '\n\n' + postscript;
});
