var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://www.easy-mock.com/mock/5a0521f2034de12ca2038c5f/bonnie"',
  BASE_API: '"/api"',
})
