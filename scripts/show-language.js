'use strict';

function getLang(lang) {
    var langMaps = {
        js: "JavaScript",
        javascript: "JavaScript",
        css: "CSS",
        scss: "SCSS",
        html: "HTML",
        xml: "XML",
        svg: "SVG",
        mathml: "MathML",
        plain: "Text",
        php: "PHP",
        yaml: "YAML",
        yml: "YAML"
    };
    // to ucfirst
    return langMaps[lang] || (lang.substr(0, 1).toUpperCase() + lang.substr(1));
}
hexo.extend.filter.register('after_render:html', function (source) {
  // <figure class="highlight js">
  var regCode = /<figure class="highlight (\w+)"/g
  source = source.replace(regCode, function($0, lang) {
    var label = '<div class="highlight-show-language"><div class="highlight-show-language__label">' + getLang(lang) + '</div></div>';
    return label + $0;
  });

  // process.exit;
  return source;
});
