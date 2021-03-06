const _import = require('./_import_' + process.env.NODE_ENV)

export const userMap = [
  { path: '/dashboard', component: _import('dashboard') },
  { path: '/system/user', component: _import('system/user') },
  { path: '/system/role', component: _import('system/role') },
  { path: '/system/power', component: _import('system/power') },
  { path: '/system/page', component: _import('system/page') },

  { path: '/test/1', component: _import('test') },
  { path: '/test/2', component: _import('test') },
  { path: '/create/simple', component: _import('form/simple') },
  { path: '/create/crud', component: _import('form/crud') },
  { path: '/create/complex', component: _import('form/complex') },
  { path: '/create/tree', component: _import('form/tree') },
  { path: '/detail/simple', component: _import('detail/simple') }
]
