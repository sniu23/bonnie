const _import = require('./_import_' + process.env.NODE_ENV)

export const userMap = [
  { path: '/dashboard', name: '主页', component: _import('dashboard'), father: '/', isLeaf: true, icon: 'a' },
  { path: '/test', name: '表格', component: _import('test'), father: '/', isLeaf: false, icon: 'b' },
  { path: '/test/1', name: '表格1', component: _import('test'), father: '/test', isLeaf: true, icon: 'b' },
  { path: '/test/2', name: '表格2', component: _import('test'), father: '/test', isLeaf: true, icon: 'b' },
  { path: '/404', name: '404', component: _import('404'), father: '/', isLeaf: true, icon: 'a' }
]
