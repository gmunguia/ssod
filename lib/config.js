'use strict'

const rc = require('rc')

const config = rc('ssod', {
  source: '.',
  ignore: ['node_modules', '.git'],
  confluence: {}
})

module.exports = config
