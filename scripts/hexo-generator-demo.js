
hexo.extend.generator.register('demo', function (locals) {
  var demos = locals.pages.filter((page) => page.layout === 'demo').sort('-date')
  // console.log(demos);
  return {
    path: 'demo/index.html',
    data: { archive: true, posts: demos },
    layout: ['archive']
  }
})

hexo.extend.generator.register('remark', function (locals) {
  var demos = locals.pages.filter((page) => page.layout === 'remark').sort('-date')
  // console.log(demos);
  return {
    path: 'remarks/index.html',
    data: { archive: true, posts: demos },
    layout: ['archive']
  }
})
