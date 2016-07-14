
hexo.extend.generator.register('demo', function(locals){
  var demos = locals.pages.filter((page) => page.layout == 'demo');
  // console.log(demos);
  return {
    path: 'demo/index.html',
    data: { archive: true, posts: demos },
    layout: ['archive']
  }
});
