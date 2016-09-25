
hexo.extend.generator.register('demo', function(locals){
  var demos = locals.pages.filter((page) => page.layout == 'demo').sort('-date');
  // console.log(demos);
  return {
    path: 'demo/index.html',
    data: { archive: true, demo: true, posts: demos },
    layout: ['archive']
  }
});
hexo.extend.generator.register('note', function(locals){
  var notes = locals.pages.filter((page) => page.layout == 'post').sort('-date');
  // console.log(demos);
  return {
    path: 'note/index.html',
    data: { archive: true, note: true, posts: notes },
    layout: ['archive']
  }
});
