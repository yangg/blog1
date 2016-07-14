
hexo.extend.generator.register('demo', function(locals){
  return {
    path: 'demo/index.html',
    data: { archive: true, posts: locals.pages },
    layout: ['archive']
  }
});
