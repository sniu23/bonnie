const _import = require('./_import_' + process.env.NODE_ENV)

export const userMap = [
  { path: '/dashboard', name: '主页', component: _import('dashboard'), father: '/', isLeaf: true, icon: 'a' },
  { path: '/test', name: '表格', component: _import('test'), father: '/', isLeaf: false, icon: 'b' },
  { path: '/test/1', name: '表格1', component: _import('test'), father: '/test', isLeaf: true, icon: 'b' },
  { path: '/test/2', name: '表格2', component: _import('test'), father: '/test', isLeaf: true, icon: 'b' },
  { path: '/create', name: '表单', component: _import('test'), father: '/', isLeaf: false, icon: 'b' },
  { path: '/create/simple', name: '表单-简单', component: _import('form/simple'), father: '/create', isLeaf: true, icon: 'b' },
  { path: '/create/crud', name: '表单-增删改查', component: _import('form/crud'), father: '/create', isLeaf: true, icon: 'b' },
  { path: '/create/complex', name: '表单-复杂', component: _import('form/complex'), father: '/create', isLeaf: true, icon: 'b' },
  { path: '/detail', name: '详情', component: _import('test'), father: '/', isLeaf: false, icon: 'b' },
  { path: '/detail/simple', name: '详情-简单', component: _import('detail/simple'), father: '/detail', isLeaf: true, icon: 'b' },
  { path: '/404', name: '404', component: _import('404'), father: '/', isLeaf: true, icon: 'a' }
]
