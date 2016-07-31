'use strict';

function wrapTag(code, lang) {
    var wrapped = '\n<escape>';
    switch(lang) {
        case "css":
            wrapped += '<style>' + code + '</style>';
            break;
        case "scss":
            wrapped += '<style type="text/scss">' + code + '</style>';
            break;
        case "js":
        case "javascript":
            wrapped += '<script>' + code + '</script>';
            break;
        case "html":
            wrapped += '<div data-live-edit>' + code + '</div>';
            break;
    }
    return wrapped + '</escape>\n';
}

hexo.extend.filter.register('before_post_render', function (data) {
  if (data.layout !== 'post') {
    return data;
  }
  data.content = data.content.replace(/(`{3})(css|scss|js|javascript|html)\++(\s+[\s\S]+?)(`{3})/g, function(raw, start, lang, code, end) {
    var wrapped = wrapTag(code, lang);

    return wrapped + start + lang + code + end;
  });
}, 1);
